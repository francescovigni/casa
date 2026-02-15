import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const ProjectTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  const skills = frontmatter.skills || [];

  return (
    <Layout>
      <article className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects/"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            &larr; Projects
          </Link>

          <header className="mt-6 mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3">
              {frontmatter.category && <span>{frontmatter.category}</span>}
              <span>&middot;</span>
              <span>{frontmatter.date}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {frontmatter.title}
            </h1>
            {frontmatter.subtitle && (
              <p className="text-gray-500">{frontmatter.subtitle}</p>
            )}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {frontmatter.link && (
              <a
                href={frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                View Repository &rarr;
              </a>
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
              to="/projects/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              &larr; All Projects
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectTemplate;

export const Head = ({ data }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.subtitle}
  />
);

export const query = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMM YYYY")
        skills
        category
        link
      }
    }
  }
`;
