import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gray-900 focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
