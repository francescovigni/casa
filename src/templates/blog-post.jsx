import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const BlogPostTemplate = ({ data }) => {
  const { frontmatter, html, timeToRead } = data.markdownRemark;

  return (
    <Layout>
      <article className="py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog/"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            &larr; Blog
          </Link>

          <header className="mt-6 mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3">
              {frontmatter.category && <span>{frontmatter.category}</span>}
              <span>&middot;</span>
              <span>{frontmatter.date}</span>
              {timeToRead && (
                <>
                  <span>&middot;</span>
                  <span>{timeToRead} min</span>
                </>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {frontmatter.title}
            </h1>
            {frontmatter.subtitle && (
              <p className="text-gray-500">{frontmatter.subtitle}</p>
            )}
          </header>

          <div
            className="prose prose-gray max-w-none
              prose-headings:font-semibold
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
              prose-pre:my-6 prose-pre:rounded-xl
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-12 pt-6 border-t border-gray-100">
            <Link
              to="/blog/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              &larr; All Posts
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ data }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.subtitle}
  />
);

export const query = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      timeToRead
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM D, YYYY")
        category
        slug
      }
    }
  }
`;
