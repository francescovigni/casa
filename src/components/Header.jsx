import React, { useState } from "react";
import { Link } from "gatsby";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects/", label: "Projects" },
  { to: "/talks/", label: "Talks" },
];
const contactLink = { to: "/contact/", label: "Contact" };
const insightsLinks = [
  { to: "/publications/", label: "Publications" },
  { to: "/blog/", label: "Blog" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  let dropdownTimeout;
  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout = setTimeout(() => setDropdownOpen(false), 100);
  };
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl p-2 font-bold tracking-tight text-primary-700 hover:text-primary-500 transition-colors transform-gpu transition-transform duration-300 hover:scale-150 hover:-rotate-3"
            style={{ display: 'inline-block' }}
          >
            FV
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                activeClassName="text-primary-600"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Insights dropdown - improved UX */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              role="presentation"
            >
              <button
                className={`text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1 focus:outline-none ${dropdownOpen ? 'text-primary-600' : ''}`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDropdownOpen((open) => !open);
                  }
                  if (e.key === 'Escape') {
                    setDropdownOpen(false);
                  }
                }}
              >
                Insights
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-20" role="menu" aria-label="Insights submenu">
                  {insightsLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors"
                      role="menuitem"
                      tabIndex={0}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              key={contactLink.to}
              to={contactLink.to}
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              activeClassName="text-primary-600"
            >
              {contactLink.label}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {[...navLinks, ...insightsLinks, contactLink].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition"
                activeClassName="text-primary-600 bg-primary-50"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
