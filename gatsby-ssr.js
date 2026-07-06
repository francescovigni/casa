import React from "react";

const GA_ID = "G-QHV4ZCMNJ9";

export const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV !== "production") return;

  setHeadComponents([
    <script
      key="umami"
      defer
      src="https://analytics.trenigarantiti.org/script.js"
      data-website-id="fdadd935-2c9c-42d1-aa44-6b32ed196fd9"
    />,
    <script
      key="umami-recorder"
      defer
      src="https://analytics.trenigarantiti.org/recorder.js"
      data-website-id="fdadd935-2c9c-42d1-aa44-6b32ed196fd9"
    />,
    <script
      key="gtag-src"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />,
    <script
      key="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
          });
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            allow_ad_personalization_signals: false,
          });
        `,
      }}
    />,
  ]);
};
