import React from "react";

const Seo = ({ title, description, image, pathname }) => {
  const siteTitle = "Francesco Vigni";
  const siteUrl = "https://francescovigni.com";
  const defaultDescription =
    "Robotics & AI Engineer (Ph.D.) — Human-Robot Interaction, Applied AI, Computer Vision.";

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaUrl = pathname ? `${siteUrl}${pathname}` : siteUrl;
  const metaImage = image ? `${siteUrl}${image}` : null;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaUrl} />
      {metaImage && <meta property="og:image" content={metaImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={metaImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}

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
