import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        style={{
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`,
        }}
      >
        {/* Glow orb that follows mouse */}
        <div className="navbar__glow" />

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="4.5" stroke="url(#lg1)" strokeWidth="1.5" />
              <path d="M4 19c0-3.866 3.134-7 7-7h0c3.866 0 7 3.134 7 7" stroke="url(#lg1)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 12v3M9 14h4" stroke="url(#lg2)" strokeWidth="1.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="lg1" x1="4" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a855f7" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="lg2" x1="9" y1="12" x2="13" y2="17" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f472b6" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="navbar__logo-text">
            She<span className="navbar__logo-accent">Can</span>
          </span>
          <span className="navbar__logo-tag">Foundation</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          <li>
            <Link
              to="/signup"
              className={`navbar__link ${isActive("/signup") ? "navbar__link--active" : ""}`}
            >
              <span className="navbar__link-text">Sign Up</span>
              <span className="navbar__link-underline" />
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`navbar__link ${isActive("/login") ? "navbar__link--active" : ""}`}
            >
              <span className="navbar__link-text">Login</span>
              <span className="navbar__link-underline" />
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/form"
                  className={`navbar__link ${isActive("/form") ? "navbar__link--active" : ""}`}
                >
                  <span className="navbar__link-text">Apply Now</span>
                  <span className="navbar__link-underline" />
                </Link>
              </li>
              <li>
                <button className="navbar__logout" onClick={handleLogout}>
                  <span className="navbar__logout-text">Logout</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li>
              <Link to="/signup" className="navbar__cta">
                <span className="navbar__cta-bg" />
                <span className="navbar__cta-text">Get Started</span>
              </Link>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}>
        <div className="navbar__drawer-inner">
          <Link to="/signup" className="navbar__drawer-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link to="/login" className="navbar__drawer-link" onClick={() => setMenuOpen(false)}>Login</Link>
          {isLoggedIn && (
            <>
              <Link to="/form" className="navbar__drawer-link" onClick={() => setMenuOpen(false)}>Apply Now</Link>
              <button className="navbar__drawer-logout" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/signup" className="navbar__drawer-cta" onClick={() => setMenuOpen(false)}>Get Started →</Link>
          )}
        </div>
      </div>

      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

export default Navbar;