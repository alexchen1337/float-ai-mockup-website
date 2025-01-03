import { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="#" className="logo">
            <span className="logo-text">Float.GG</span>
          </a>
        </div>
        <div className="navbar-center">
          <a href="#features">Features</a>
          <a href="#technical">Technical</a>
          <a href="#contact">Contact</a>
          <a href="/riot.txt" target="_blank">riot.txt</a>
        </div>
        <div className="navbar-right">
          <button className="download-btn">Download</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 