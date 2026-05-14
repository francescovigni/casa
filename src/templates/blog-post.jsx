import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ShareButtons from "../components/ShareButtons";

const BlogPostTemplate = ({ data, location }) => {
  const { frontmatter, html, timeToRead } = data.markdownRemark;
  const siteUrl = data.site.siteMetadata.siteUrl;

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

          <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/blog/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              &larr; All Posts
            </Link>
            <ShareButtons
              title={frontmatter.title}
              url={`${siteUrl}${location.pathname}`}
            />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;


export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const imagePath = frontmatter.img?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
  const fullImageUrl = imagePath ? `${siteUrl}${imagePath}` : null;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.subtitle || undefined,
    "datePublished": frontmatter.date,
    "image": fullImageUrl || undefined,
    "url": `${siteUrl}${location.pathname}`,
    "author": {
      "@type": "Person",
      "name": "Francesco Vigni",
      "url": siteUrl,
    },
  };

  return (
    <>
      <Seo
        title={frontmatter.title}
        description={frontmatter.subtitle}
        image={fullImageUrl}
        pathname={location.pathname}
        type="article"
      />
      <script type="application/ld+json">
        {JSON.stringify(blogPostingJsonLd)}
      </script>
    </>
  );
};

export const query = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      timeToRead
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM D, YYYY")
        category
        slug
        img {
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
    }
  }
`;
