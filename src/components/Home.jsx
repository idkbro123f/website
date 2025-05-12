
function Home() {
  return (
    <div className="home">
      <h1>Welcome to My Website</h1>
      <div className="hero-section">
        <div className="hero-content">
          <h2>Look around!</h2>
          <div className="cta-buttons">
            <a href="#/charts" className="btn primary">View Charts</a>
            <a href="#/about" className="btn secondary">About</a>
          </div>
        </div>
      </div>
      
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Interactive Charts</h3>
            <p>Visualize data with beautiful and responsive charts powered by API data.</p>
          </div>
          <div className="feature-card">
            <h3>Responsive Design</h3>
            <p>Our website looks great on all devices, from mobile phones to desktop computers.</p>
          </div>
          <div className="feature-card">
            <h3>Modern Technologies</h3>
            <p>Built with React, JavaScript, and CSS for a smooth and interactive experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;




