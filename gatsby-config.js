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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog-images",
        path: `${__dirname}/src/images/blogs`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data-images",
        path: `${__dirname}/data/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/data/projects`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/data/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        // Exclude the /projects redirect page; individual /projects/<slug>/
        // case studies should still be indexed.
        excludes: ["/projects"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://francescovigni.com",
        sitemap: "https://francescovigni.com/sitemap-index.xml",
        // No disallow here — the /projects redirect page already has a
        // <meta name="robots" content="noindex"> in its Head.
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
