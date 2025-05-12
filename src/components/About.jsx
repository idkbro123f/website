// components/About.jsx
import { useState } from 'react';
// states for the dropdowns
function About() {
  const [isExpanded, setIsExpanded] = useState({
    dataAnalysis: false,
    customization: false,
    collaboration: false
  });

  const toggleSection = (section) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Welcome to Glorp Analytics</h1>
        <p className="lead-text">
          Your comprehensive platform for data visualization and analysis
        </p>
      </div>
      
      <div className="about-grid">
        <div className="about-image-container">
            <div className="feature-image">
              <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXBudGVscGs2Z2YweTdlOTRmNW01bTk4cjJqczYxcHN2cnRsdDN1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pbTuNPIWWMfHxH5DBC/giphy.gif' className="feature-gif"></img>
            </div>
        </div>
        
        <div className="about-content">
          <h2>What You Can Do After Logging In</h2>
          
          <div className="feature-section">
            <div 
              className="feature-header" 
              onClick={() => toggleSection('dataAnalysis')}
            >
              <h3>Price data of an item from different date ranges</h3>
              <span className="toggle-icon">{isExpanded.dataAnalysis ? '−' : '+'}</span>
            </div>
            
            {isExpanded.dataAnalysis && (
              <div className="feature-details">
                <p>
                  This feature provides a visual reprensentation of the item's price from the selected range by the user. Hovering over the graph shows summarized info about it.
                </p>
                <div className="feature-image">
                    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXY0cTZhbnBnOXpqMWJ1ZmFyenM0aDJ0NG5oMGZtYm9kb3Z3bDBjNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NZEGA8796JnYkwyl8Z/giphy.gif" className="feature-gif"/>
                </div>
              </div>
            )}
          </div>
          
          <div className="feature-section">
            <div 
              className="feature-header" 
              onClick={() => toggleSection('customization')}
            >
              <h3>Compare different markets</h3>
              <span className="toggle-icon">{isExpanded.customization ? '−' : '+'}</span>
            </div>
            
            {isExpanded.customization && (
              <div className="feature-details">
                <p>
                  Have you ever thought how much the item costs on other markets? Now you can compare over 3 markets such as skinport, buff etc.
                </p>
                <div className="feature-image">
                    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnp0ZTE0OWQ2dWdmd2RleXZhZDI3dHFuZHpqN2VxNjAwMHV4anNucSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HipQEemiGAHVbtdoeU/giphy.gif" className="feature-gif"/>
                </div>
              </div>
            )}
          </div>
          
          <div className="feature-section">
            <div 
              className="feature-header" 
              onClick={() => toggleSection('collaboration')}
            >
              <h3>Price prediction</h3>
              <span className="toggle-icon">{isExpanded.collaboration ? '−' : '+'}</span>
            </div>
            
            {isExpanded.collaboration && (
              <div className="feature-details">
                <p>
                  With our fine-tuned price prediction algorithm you can look up an item's estimated price up to the next 30 days!
                </p>
                <div className="feature-image">
                    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHBtbmtvMWNjbXI1bWRwemc3azBqNHZrajUxZGNpMmE2ZndhZTlyOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3REZpU4j6oybj1AsKo/giphy.gif" className="feature-gif"/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Try our features now!</p>
        <div className="cta-buttons">
          <a href='#/'><button className="primary-btn">Back to home</button></a>
          <a href='#/dashboard'><button  className="secondary-btn">Try it now!</button></a>
        </div>
      </div>
      
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-image-placeholder" id='aboutimage1'>
              <div className="placeholder-text">User</div>
            </div>
            <p className="testimonial-text">
              "Having the ability to compare item prices between markets has truly helped me decide where I should buy my items from."
            </p>
            <p className="testimonial-author">- Sarah J., Casual player</p>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-image-placeholder" id='aboutimage2'>
              <div className="placeholder-text">User</div>
            </div>
            <p className="testimonial-text">
              "I wasn't sure about the price prediction algorithm's guess about an item price until I bought it. Now I'm up 200 Euros!!"
            </p>
            <p className="testimonial-author">- Michael T., NFT Investor</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;