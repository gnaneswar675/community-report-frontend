import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getToken, logout, getUserRole } from '../utils/auth';
import { useState } from 'react';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = getToken();
  const role = getUserRole();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { 
    logout();
    navigate('/', { replace: true });
    window.location.reload();
  };

  const navigateToSection = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/', {
        state: { scrollTo: sectionId },
        replace: true
      });
    }
  };

  return (
    <header className="header">
      <Link to={role === 'head' ? '/head' : '/'} className="header-title">
        Civic Solver
      </Link>
      <button
        className="header-hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="hamburger-icon"></span>
      </button>
      <nav className={`header-nav${menuOpen ? ' open' : ''}`}>
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigateToSection('problems')} className="header-link">Problems</button>
            <button onClick={() => navigateToSection('features')} className="header-link">Features</button>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/register" className="header-link">Register</Link>
          </>
        ) : role === 'head' ? (
          <>
            <Link to="/head" className="header-link">Head Dashboard</Link>
            <Link to="/head/problems" className="header-link">Community Problems</Link>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="header-link">All Problems</Link>
            <Link to="/report" className="header-link">Report Problem</Link>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
