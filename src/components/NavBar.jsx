import { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-text">Float.GG</span>
          </div>
        </div>

        <div className="navbar-center">
          <a href="#demos" onClick={(e) => handleNavClick(e, 'demos')}>DEMOS</a>
          <a href="#stats" onClick={(e) => handleNavClick(e, 'stats')}>STATS</a>
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>FEATURES</a>
          <a href="#technical" onClick={(e) => handleNavClick(e, 'technical')}>TECHNICAL</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>CONTACT</a>
        </div>

        <div className="navbar-right">
          <button className="download-btn">DOWNLOAD</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 