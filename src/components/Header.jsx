import React, { useState, useRef, useEffect } from "react";
import { Link } from "gatsby";
import { ui, getCounterpart } from "../utils/i18n";

// Nav entries. `en`/`it` are the link targets per locale.
const navLinks = [
  { key: "home", en: "/", it: "/it/" },
  { key: "work", en: "/work/", it: "/it/lavoro/" },
  { key: "contact", en: "/contact/", it: "/it/contatti/" },
];

// Language-neutral globe mark for the language toggle.
const GlobeIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
  </svg>
);

const Header = ({ locale = "en", path }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const t = ui[locale] || ui.en;
  const other = locale === "en" ? "it" : "en";
  const toggleTo = getCounterpart(path, other) || (other === "it" ? "/it/" : "/");
  const homeLink = locale === "it" ? "/it/" : "/";

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={homeLink}
            className="text-xl p-2 font-bold tracking-tight text-primary-700 hover:text-primary-500 transition-colors"
            style={{ display: "inline-block" }}
          >
            FV
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link[locale]}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                activeClassName="text-primary-600"
              >
                {t.nav[link.key]}
              </Link>
            ))}

            {/* Language toggle */}
            <Link
              to={toggleTo}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-primary-600 border border-gray-200 rounded px-2 py-1 transition-colors"
              aria-label={t.toggle.aria}
            >
              <GlobeIcon />
              {t.toggle.code}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={menuOpen ? t.menu.close : t.menu.open}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link[locale]}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition"
                activeClassName="text-primary-600 bg-primary-50"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              to={toggleTo}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition"
              aria-label={t.toggle.aria}
              onClick={() => setMenuOpen(false)}
            >
              <GlobeIcon />
              {t.toggle.code}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
