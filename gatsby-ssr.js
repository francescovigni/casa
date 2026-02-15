import React from "react";

const GA_ID = "G-QHV4ZCMNJ9";

export const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV !== "production") return;

  setHeadComponents([
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
