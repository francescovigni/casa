import React from "react";
import { localePairs } from "../utils/i18n";

const SITE = {
  title:        "Francesco Vigni",
  url:          "https://francescovigni.com",
  description:  "Freelance medical AI consultant — IRCCS hospitals and medtech R&D teams. Imaging, endoscopy foundation models, EHDS data governance. PhD in ICT for Health.",
  twitterHandle: "@fra_cescovigni",
  defaultImage: "/og-default.jpg",
};

const OG_LOCALE = { en: "en_US", it: "it_IT" };

const Seo = ({ title, description, image, pathname, type = "website", locale = "en", noindex = false }) => {
  const metaTitle       = title ? `${title} | ${SITE.title}` : SITE.title;
  const metaDescription = description || SITE.description;

  // Normalize to a single leading and trailing slash so path matching against
  // localePairs is consistent regardless of how the caller passes `pathname`.
  const canonicalPath = (() => {
    if (!pathname) return "/";
    const trimmed = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    return trimmed === "" ? "/" : `/${trimmed}/`;
  })();
  const canonicalUrl  = `${SITE.url}${canonicalPath}`;

  const metaImage = image
    ? (image.startsWith("http") ? image : `${SITE.url}/${image.replace(/^\/+/, "")}`)
    : `${SITE.url}${SITE.defaultImage}`;

  // hreflang alternates — only for pages that explicitly declare their path
  // AND have both an EN and an IT version.
  const pair = pathname
    ? localePairs.find((p) => p.en === canonicalPath || p.it === canonicalPath)
    : null;

  const ogLocale = OG_LOCALE[locale] || OG_LOCALE.en;
  const ogLocaleAlt = locale === "it" ? OG_LOCALE.en : OG_LOCALE.it;

  return (
    <>
      <html lang={locale} />
      <title>{metaTitle}</title>
      <meta name="description"        content={metaDescription} />
      <meta name="viewport"           content="width=device-width, initial-scale=1" />
      <meta name="robots"             content={noindex ? "noindex, follow" : "index, follow"} />
      <meta name="author"             content="Francesco Vigni" />

      <link rel="canonical" href={canonicalUrl} />

      {pair && (
        <>
          <link rel="alternate" hrefLang="en" href={`${SITE.url}${pair.en}`} />
          <link rel="alternate" hrefLang="it" href={`${SITE.url}${pair.it}`} />
          <link rel="alternate" hrefLang="x-default" href={`${SITE.url}${pair.en}`} />
        </>
      )}

      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE.title} />
      <meta property="og:title"       content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:locale"      content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta property="og:image"       content={metaImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
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
