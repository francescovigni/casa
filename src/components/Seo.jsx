import React from "react";

const SITE = {
  title:        "Francesco Vigni",
  url:          "https://francescovigni.com",
  description:  "Freelance medical AI consultant — IRCCS hospitals and medtech R&D teams. Imaging, endoscopy foundation models, EHDS data governance. PhD in ICT for Health.",
  twitterHandle: "@fra_cescovigni",
  locale:       "en_US",
  defaultImage: "/og-default.jpg",
};

const Seo = ({ title, description, image, pathname, type = "website" }) => {
  const metaTitle       = title ? `${title} | ${SITE.title}` : SITE.title;
  const metaDescription = description || SITE.description;

  const canonicalPath = pathname
    ? `/${pathname.replace(/^\/+/, "")}`
    : "/";
  const canonicalUrl  = `${SITE.url}${canonicalPath}`;

  const metaImage = image
    ? (image.startsWith("http") ? image : `${SITE.url}/${image.replace(/^\/+/, "")}`)
    : `${SITE.url}${SITE.defaultImage}`;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description"        content={metaDescription} />
      <meta name="viewport"           content="width=device-width, initial-scale=1" />
      <meta name="robots"             content="index, follow" />
      <meta name="author"             content="Francesco Vigni" />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE.title} />
      <meta property="og:title"       content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:locale"      content={SITE.locale} />
      <meta property="og:image"       content={metaImage} />
      <meta property="og:image:alt"   content={metaTitle} />

      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={SITE.twitterHandle} />
      <meta name="twitter:creator"     content={SITE.twitterHandle} />
      <meta name="twitter:title"       content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image"       content={metaImage} />
      <meta name="twitter:image:alt"   content={metaTitle} />

      <link rel="icon"             href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest"         href="/favicon/site.webmanifest" />
    </>
  );
};

export default Seo;
