// components/Charts.jsx
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Charts() {
  const [firstData, setFirstData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      setIsLoading(true);
      
      try {
        // Make both fetch calls in parallel
        const [firstResponse, secondResponse] = await Promise.all([
          fetch('https://www.steamwebapi.com/steam/api/history?key=OKA0AJU5OZN3Q2J3&market_hash_name=AK-47%20%7C%20Redline%20%28Field-Tested%29&origin=steamwebapi&type=median&source=steam&interval=1&start_date=2024-01-01&end_date=2024-01-31'),
          fetch('https://www.steamwebapi.com/steam/api/item?key=OKA0AJU5OZN3Q2J3&market_hash_name=AK-47%20%7C%20Redline%20%28Field-Tested%29&currency=EUR&with_groups=false')
        ]);
        
        const firstJsonData = await firstResponse.json();
        const secondJsonData = await secondResponse.json();
        
        const processedFirstData = firstJsonData.map(item => ({
          price: item.price,
          date: item.createdat.split('T')[0]
        })).sort((a, b) => {
          // Sort by date (earliest first)
          return new Date(a.date) - new Date(b.date);
        });
        
        const processedSecondData = secondJsonData.prices.map(item => ({
          price2: item.price,
          source: item.source
        }));
        
        const minPrice = Math.min(...processedFirstData.map(item => item.price));
        setLowestPrice(minPrice);
        const highestPrice = Math.max(...processedFirstData.map(item => item.price));
        setHighestPrice(highestPrice);

        setFirstData(processedFirstData);
        setSecondData(processedSecondData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    }
    
    fetchAllData();
  }, []);

  if (isLoading) return <div className="loading">Loading charts data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="charts-container">
      <h1>Data Charts</h1>
      <p>Log in to have access to these features!!</p>
    
      <div className="chart-grid">
        <div className="chart-card">
          <h2>Example data with Date and median price on that day</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={firstData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[]}/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price History" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="box-grid">
        <div className="grid-box" id="lowestmedian">{lowestPrice !== null ? `$${lowestPrice.toFixed(2)}` : 'Loading...'}</div>
        <div className="grid-box" id="highestmedian">{highestPrice !== null ? `$${highestPrice.toFixed(2)}` : 'Loading...'}</div>
        <div className="grid-box">Box 3</div>
        <div className="grid-box">Box 4</div>
      </div>
      
      <h1>Market Data</h1>
      <p>Visualizing current market prices from different sources</p>
    
      <div className="chart-grid">
        <div className="chart-card">
          <h2>Current Prices by Source</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={secondData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis  domain={[]}/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price2" stroke="#82ca9d" name="Current Price" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <h1>And much more!!</h1>
    </div>
  );
}

export default Charts;