import "./src/styles/global.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Self-hosted fonts — latin subset only, weights actually used by the site.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";

const COOKIE_NAME = "gatsby-gdpr-google-analytics";

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

export const onClientEntry = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const consent = getCookie(COOKIE_NAME);
  if (consent === "true") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
};

export const onRouteUpdate = () => {
  NProgress.done();
};

export const onPreRouteUpdate = () => {
  NProgress.start();
};
