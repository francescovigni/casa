import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/blog/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 220)
          timeToRead
          frontmatter {
            title
            subtitle
            slug
            date(formatString: "MMMM D, YYYY")
            category
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-500 mb-10">
            Thoughts on robotics, ML, web development, and life as a researcher.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.frontmatter.slug}/`}
                className="group block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  {post.frontmatter.category && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-md">
                      {post.frontmatter.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {post.frontmatter.date}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors leading-snug">
                  {post.frontmatter.title}
                </h2>
                {post.frontmatter.subtitle && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {post.frontmatter.subtitle}
                  </p>
                )}
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {post.timeToRead && `${post.timeToRead} min read`}
                  </span>
                  <span className="text-xs font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;

export const Head = () => (
  <Seo
    title="Blog"
    description="Blog posts by Francesco Vigni on robotics, ML, web development, and more."
  />
);
