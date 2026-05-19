module.exports = {
  siteMetadata: {
    title: "Francesco Vigni",
    description:
      "Freelance medical AI consultant — IRCCS hospitals and medtech R&D teams. Imaging, endoscopy foundation models, EHDS data governance. PhD in ICT for Health.",
    author: "Francesco Vigni",
    siteUrl: "https://francescovigni.com",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        // /bc/ is a standalone digital card — kept out of the sitemap.
        excludes: ["/bc"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://francescovigni.com",
        sitemap: "https://francescovigni.com/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
