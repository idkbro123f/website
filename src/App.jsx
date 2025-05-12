// App.jsx
import { useState, useEffect } from 'react';
import {Routes, Route, Link, HashRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Charts from './components/Charts';
import About from './components/About';
import Logo from '/glorp1.png';
import DataDashboard from './components/DataDashboard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user previously set dark mode preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.body.classList.add('darkmode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('darkmode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <HashRouter>
      <div className="app">
        <header className="navbar">
          <div className="navbar-container">
            <Link to="/" className="logo-link">
              <img src={Logo} alt="Logo" className="logo" />
              <span>Glorp Analytics</span>
            </Link>

            {/* Desktop navigation */}
            {windowWidth > 768 && (
              <nav className="desktop-nav">
                <ul className="nav-menu">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/charts" className="nav-link">Charts</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item theme-switch-item">
                    {/* Theme toggle button */}
                    <button 
                      onClick={toggleTheme} 
                      className="theme-switch-button"
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? (
                        <svg className="theme-switch" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>
                        </svg>
                      ) : (
                        <svg className="theme-switch" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
                        </svg>
                      )}
                    </button>
                  </li>
                </ul>
              </nav>
            )}

            {/* Mobile view: Menu button and theme switch */}
            {windowWidth <= 768 && (
              <div className="mobile-controls">
                {/* Theme toggle button */}
                <button 
                  onClick={toggleTheme} 
                  className="theme-switch-button"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg className="theme-switch" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                  ) : (
                    <svg className="theme-switch" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
                    </svg>
                  )}
                </button>
                
                {/* Mobile menu button */}
                <div 
                  className={`menu-icon ${isMenuOpen ? 'active' : ''}`} 
                  onClick={toggleMenu}
                >
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          {isMenuOpen && windowWidth <= 768 && (
            <nav>
              <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                <li className="nav-item">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/charts" onClick={() => setIsMenuOpen(false)} className="nav-link">
                    Charts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="nav-link">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>
          {/*Routing for the other pages */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<DataDashboard />} />
          </Routes>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} Glorp Analytics. All rights reserved.
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;