import "./src/styles/global.css";

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
