import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleTag = () => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Tag script dynamically
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-16841253217";
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16841253217');
    `;
    document.head.appendChild(script2);
  }, []);

  useEffect(() => {
    // Track page views
    if (window.gtag) {
      window.gtag("config", "AW-16841253217", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null; // No UI, just tracking
};

export default GoogleTag;
