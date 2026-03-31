import React from "react";

// ─── Site-wide defaults ────────────────────────────────────────────────────
const SITE = {
  title:       "Francesco Vigni",
  url:         "https://francescovigni.com",
  description: "Robotics & AI Engineer (Ph.D.) — Applied AI, Human-Robot Interaction, Computer Vision.",
  keywords:    ["AI advisor", "robotics engineer", "ROS2", "computer vision", "edge AI"],
  twitterHandle: "@francescovigni", // update or remove if unused
  locale:      "en_US",
};

// ─── Component ────────────────────────────────────────────────────────────
/**
 * @param {string}   title       – Page title (joined with site title)
 * @param {string}   description – Page description; falls back to SITE.description
 * @param {string}   image       – Absolute or root-relative path to OG image
 * @param {string}   pathname    – Current path, e.g. "/projects/my-project/"
 * @param {string[]} keywords    – Extra keywords merged with site defaults
 * @param {"website"|"article"} type – OG type; defaults to "website"
 */
const Seo = ({ title, description, image, pathname, keywords, type = "website" }) => {
  const metaTitle       = title ? `${title} | ${SITE.title}` : SITE.title;
  const metaDescription = description || SITE.description;
  const metaKeywords    = [
    ...SITE.keywords,
    ...(Array.isArray(keywords) ? keywords : []),
  ].join(", ");

  // Normalise pathname: ensure leading slash, strip double slashes
  const canonicalPath = pathname
    ? `/${pathname.replace(/^\/+/, "")}`
    : "/";
  const canonicalUrl  = `${SITE.url}${canonicalPath}`;

  const metaImage = image
    ? image.startsWith("http") ? image : `${SITE.url}/${image.replace(/^\/+/, "")}`
    : null;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description"        content={metaDescription} />
      <meta name="keywords"           content={metaKeywords} />
      <meta name="viewport"           content="width=device-width, initial-scale=1" />
      <meta name="robots"             content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE.title} />
      <meta property="og:title"       content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:locale"      content={SITE.locale} />
      {metaImage && <meta property="og:image"       content={metaImage} />}
      {metaImage && <meta property="og:image:alt"   content={metaTitle} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content={metaImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:site"        content={SITE.twitterHandle} />
      <meta name="twitter:creator"     content={SITE.twitterHandle} />
      <meta name="twitter:title"       content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image"       content={metaImage} />}
      {metaImage && <meta name="twitter:image:alt"   content={metaTitle} />}

      {/* Favicons */}
      <link rel="icon"             href="/static/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
      <link rel="manifest"         href="/static/favicon/site.webmanifest" />
    </>
  );
};

export default Seo;