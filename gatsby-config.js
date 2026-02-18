module.exports = {
  siteMetadata: {
    title: "Francesco Vigni",
    description:
      "Robotics & AI Engineer (Ph.D.) —  Human-Robot Interaction, Applied AI, Computer Vision.",
    author: "Francesco Vigni",
    siteUrl: "https://francescovigni.com",
  },
  plugins: [
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: [
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
        ],
        web: [
          {
            name: 'Inter',
            file: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
          },
          {
            name: 'JetBrains Mono',
            file: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
          },
        ],
      },
    },
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
  ],
};