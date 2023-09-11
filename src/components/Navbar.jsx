import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Update isMobile state when window size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <nav className={isOpen ? 'open' : ''}>
      <h1 className='nav-title'>TITLE</h1>
      <Link className='nav-logo' to="/">
      <img className='nav-logo' src="../images/home/logo.png" alt="logo"/>
    </Link>
      {
        isMobile
        ? (
          <div className='hamburger' onClick={handleHamburgerClick}>
            {/* A simple "hamburger" icon */}
            <div className={isHamburgerOpen ? 'toggle' : ''}></div>
            <div className={isHamburgerOpen ? 'toggle' : ''}></div>
            <div className={isHamburgerOpen ? 'toggle' : ''}></div>

            {/* The dropdown menu */}

            {/* The dropdown menu */}
            {isHamburgerOpen && (
              <ul className='nav-links'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/info">Info</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            )}
          </div>
        )
        : (
          <ul className='nav-links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/info">Info</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        )
      }
    </nav>
  );
}

export default Navbar;
