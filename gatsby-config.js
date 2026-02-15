module.exports = {
  siteMetadata: {
    title: "Francesco Vigni",
    description:
      "ML Engineer & Robotics Researcher — Applied ML, Computer Vision, Human-Robot Interaction.",
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
    "gatsby-transformer-remark",
  ],
};
