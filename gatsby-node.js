const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/projects/" } }
      ) {
        nodes {
          id
          fileAbsolutePath
        }
      }
      blog: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/blog/" } }
      ) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Individual project pages — slug derived from filename
  const projectTemplate = path.resolve("src/templates/project.jsx");
  result.data.projects.nodes.forEach((node) => {
    const filename = path.basename(node.fileAbsolutePath, ".md");
    createPage({
      path: `/projects/${filename}/`,
      component: projectTemplate,
      context: { id: node.id },
    });
  });

  // Individual blog post pages
  const blogTemplate = path.resolve("src/templates/blog-post.jsx");
  result.data.blog.nodes.forEach((node) => {
    const slug = node.frontmatter.slug;
    createPage({
      path: `/blog/${slug}/`,
      component: blogTemplate,
      context: { id: node.id },
    });
  });
};
