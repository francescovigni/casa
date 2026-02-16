import React from "react";

const Seo = ({ title, description }) => {
  const siteTitle = "Francesco Vigni";
  const defaultDescription =
    "Robotics & AI Engineer (Ph.D.) — Human-Robot Interaction, Applied AI, Computer Vision.";

  return (
    <>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Favicon and icons */}
      <link rel="icon" href="/static/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicon/site.webmanifest" />
    </>
  );
};

export default Seo;
