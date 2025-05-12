import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, 
         XAxis, YAxis, CartesianGrid, 
         Tooltip, Legend, ResponsiveContainer 
        } from 'recharts';
        
function DataDashboard() {
  // states for the fetched or made up data
  const [firstData, setFirstData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const [predictionData, setPredictionData] = useState([]); 

  // state for the item details
  const [itemDetails, setItemDetails] = useState(null); 
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // states for the search bar
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  
  // state for time period
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('month');
  
  // custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
  // check if we have data
  if (active && payload && payload.length) {
  // each time tooltip renders it gets localstorage data so it updates
    const currentTheme = localStorage.getItem('theme');
    const tooltipClass = currentTheme === 'dark' ? 'custom-tooltip-dark' : 'custom-tooltip';
    
    return (
      <div className={tooltipClass}>
        <p className="label">{`${(label)}`}</p>
        <p className="intro">{`${(payload[0].value).toFixed(2)}$`}</p>
      </div>
    );
  }
  
  // null if no data
  return null;
};

  // clicking outside of the bar handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // suggestion fetch with debouceing
  useEffect(() => {
    // clear if its empty
    if (searchInput.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    // debounce for the api call
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); // 300ms debounce delay
    
    // clean up the timeout
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

    // function for suggestion fetching
    const fetchSuggestions = async () => {
    if (searchInput.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    setIsFetchingSuggestions(true);
    
    try {
      const response = await fetch(`https://www.steamwebapi.com/steam/api/items?key=OKA0AJU5OZN3Q2J3&page=1&max=10000&sort_by=name&search=${encodeURIComponent(searchInput)}&price_min=0&price_max=50000&price_real_min=0&price_real_max=50000&select=marketname`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      
      const data = await response.json();
      
      // we're returning an array with the marketname property

      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      // if api fails for some reason
      setSuggestions([]);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  // input change handler
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
  };

  // selection handler
  const handleSelectSuggestion = (suggestion) => {
  // get the marketname property from the suggestion object
    const value = suggestion.marketname;
    setSearchInput(value);
    setShowSuggestions(false);
  };

  // time period change handler
  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period);
  };

  // market hash name encoder (needed cus of the api call)
  const encodeMarketHashName = (name) => {
    return encodeURIComponent(name);
  };

  // date range calculator function
  const getDateRange = () => {
    const today = new Date();
    let startDate = new Date();
  
    switch (selectedTimePeriod) {
      case '7days':
        startDate.setDate(today.getDate() - 7);
        break;
      case '14days':
        startDate.setDate(today.getDate() - 14);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'yearStart':
        startDate = new Date(today.getFullYear(), 0, 1); // From this year jan 1st
        break;
      default:
        startDate.setMonth(today.getMonth() - 1); // default value is a month
    }
    
    // dateformatter
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(today)
    };
  };

  // 'prediction' data
  const generatePredictions = (historicalData) => {
    const today = new Date();
    const predictionItems = [];
    
    // last known price of the item which it will base the 'prediction' of
    let lastPrice = 0;
    if (historicalData && historicalData.length > 0) {
      lastPrice = historicalData[historicalData.length - 1].price;
    }
    
    // 30 days
    for (let i = 0; i < 30; i++) {
      // making up the future dates
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      
      // calculate the price
      let predictedPrice;
      if (i === 0) {
        // first day uses the same price
        predictedPrice = lastPrice;
      } else {
        
        const randomFactor = 0.95 + (Math.random() * 0.1);
        predictedPrice = predictionItems[i-1].price * randomFactor;
      }
      
      predictionItems.push({
        date: formattedDate,
        price: predictedPrice
      });
    }
    
    return predictionItems;
  };

  // fetching data of the selected item
  const fetchItemData = async () => {
    if (!searchInput.trim()) {
      setError('Please enter an item name');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const encodedItemName = encodeMarketHashName(searchInput);
    const { startDate, endDate } = getDateRange();
    
    try {
      // promise both calls
      const [firstResponse, secondResponse] = await Promise.all([
        fetch(`https://www.steamwebapi.com/steam/api/history?key=OKA0AJU5OZN3Q2J3&market_hash_name=${encodedItemName}&origin=steamwebapi&type=median&source=steam&interval=1&start_date=${startDate}&end_date=${endDate}`),
        fetch(`https://www.steamwebapi.com/steam/api/item?key=OKA0AJU5OZN3Q2J3&market_hash_name=${encodedItemName}&currency=EUR&with_groups=false`)
      ]);
      
      const firstJsonData = await firstResponse.json();
      const secondJsonData = await secondResponse.json();
      
      // first data
      const processedFirstData = firstJsonData.map(item => ({
        price: item.price,
        date: item.createdat.split('T')[0],
      })).sort((a, b) => {
        // sorting (because it's backwards)
        return new Date(a.date) - new Date(b.date);
      });
      
      // second data
      const processedSecondData = secondJsonData.prices.map(item => ({
        price2: item.price,
        source: item.source,
        last10SellInfo: item.latest10steamsales
      }));

      const last10SellData = secondJsonData.latest10steamsales.map(item =>({
        sellDate : item[0],
        price3 : item[1]
      })).sort((a,b )=> {
        return new Date(a.sellDate) - new Date(b.sellDate)
      });
      
      // prediction based on data
      const predictions = generatePredictions(processedFirstData);

      // store item details
      setItemDetails(secondJsonData);
      setFirstData(processedFirstData);
      setSecondData(processedSecondData);
      setThirdData(last10SellData);
      setPredictionData(predictions);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
      setIsLoading(false);
    }
  };
  
  // render suggestions
  const renderSuggestions = () => {
    if (!showSuggestions) {
      return null;
    }

    return (
      <div className="suggestions-dropdown" ref={suggestionsRef}>
        {isFetchingSuggestions ? (
          <div className="suggestions-loading">Loading suggestions...</div>
        ) : suggestions.length === 0 ? (
          <div className="no-suggestions">No items found</div>
        ) : (
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li 
                key={index} 
                className="suggestion-item"
                onClick={() => handleSelectSuggestion(item)}
              >
                {item.marketname}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Time period button styling
  const getButtonClass = (period) => {
    return `time-button ${selectedTimePeriod === period ? 'active' : ''}`;
  };
  
  const getItemDescription = () => {
  if (!itemDetails || !itemDetails.descriptions || !Array.isArray(itemDetails.descriptions)) {
    return null;
  }
  
  // Because the description is in a weird format we need to map through
  let mainDescription = null;
  
  // First pass: Look for entries that match the typical weapon description pattern
  for (const desc of itemDetails.descriptions) {
    // Skip if not HTML type
    if (desc.type !== "html") continue;
    
    // Skip empty values or just spaces
    if (!desc.value || desc.value.trim() === "") continue;
    
    // Skip short values
    if (desc.value.length < 30) continue;
    
    // Skip sticker info(thats definitely not the desc)
    if (desc.value.includes("sticker_info")) continue;
    
    // Skip the ones where there is a color property
    if (!desc.color) {
      // Surely its the main desc
      mainDescription = desc.value;
      break;
    }
  }
    return mainDescription
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <div className="search-container">
          <div className="search-input-wrapper">
            <input 
              placeholder='Search for an item (e.g., "AK-47 | Redline")' 
              className='dashboardinput'
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
            />
            {renderSuggestions()}
          </div>
          <button 
            className='dashboardbutton'
            onClick={fetchItemData}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
        <p className="dashboard-subtitle">Interactive data visualization with multiple metrics</p>
        
        {/* Time period selection buttons */}
        <div className="time-period-buttons">
          <span className="time-label">Time Period:</span>
          <button 
            className={getButtonClass('7days')}
            onClick={() => handleTimePeriodChange('7days')}
          >
            7 Days
          </button>
          <button 
            className={getButtonClass('14days')}
            onClick={() => handleTimePeriodChange('14days')}
          >
            14 Days
          </button>
          <button 
            className={getButtonClass('month')}
            onClick={() => handleTimePeriodChange('month')}
          >
            1 Month
          </button>
          <button 
            className={getButtonClass('yearStart')}
            onClick={() => handleTimePeriodChange('yearStart')}
          >
            Since Jan 1
          </button>
        </div>
      </header>
      
      {isLoading ? (
        <div className="loading">Loading charts data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <><div className="dashboard-grid">
          {/*Price history graph*/}
          <div className="grid-item">
            <div className="chart-header">
              <h2>Price History</h2>
              <p>Daily price changes over time</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={firstData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[]} tickFormatter={(price) => `$${price}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line name='Price' type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/*Compared markets*/}
          <div className="grid-item">
            <div className="chart-header">
              <h2>Market Sources</h2>
              <p>Price distribution across different sources</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={secondData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis tickFormatter={(price2) => `$${price2}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar name='Price' dataKey="price2" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/*Item details div*/}
          <div className="item-details-container">
            <h3>Item Details</h3>
            {itemDetails ? (
              <div className="item-details-content">
                <div className="item-image-container">
                  {itemDetails.image && (
                    <img 
                      src={itemDetails.image} 
                      alt={itemDetails.marketname} 
                      className="item-image"
                    />
                  )}
                </div>
                <div className="item-info">
                  <h4>{itemDetails.marketname}</h4>
                  {getItemDescription() && (
                    <div 
                      className="item-description"
                      dangerouslySetInnerHTML={{ __html: getItemDescription() }}
                    />
                  )}
                  <ul className="item-stats">
                    <li><strong>Rarity:</strong> {itemDetails.rarity}</li>
                    <li><strong>Collection:</strong> {itemDetails.tags?.find(tag => tag.category === "ItemSet")?.localized_tag_name || "N/A"}</li>
                    <li><strong>Sold Today:</strong> {itemDetails.soldtoday} units</li>
                    <li><strong>Current Price:</strong> ${itemDetails.pricelatest?.toFixed(2)}</li>
                    <li><a href={itemDetails.steamurl} target='_blank' ><strong>Check it on steam</strong></a></li>
                  </ul>
                </div>
              </div>
            ) : (
              <p>Search for an item to see its details</p>
            )}
          </div>
          {/*Last 10 sale median*/}
          <div className="grid-item">
            <div className="chart-header">
              <h2>Last 10 Sales</h2>
              <p>Average median sell price of the last 10 days (on the Steam market)</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={thirdData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sellDate" />
                  <YAxis tickFormatter={(price3) => `$${price3}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar name='Price' dataKey="price3" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/*'Price Prediction'*/}
        <div className="chart-grid" id='pricepred'>
          <div className="chart-card" id='pricepredcard'>
            <h2>Price Prediction (Next 30 Days)</h2>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[]} tickFormatter={(price) => `$${price.toFixed(2)}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#8884d8"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div></>
      )}
    </div>
  );
}

export default DataDashboard;