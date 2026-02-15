import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/projects/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 200)
          fileAbsolutePath
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
    }
  `);

  const projects = data.allMarkdownRemark.nodes.map((node) => {
    const filename = node.fileAbsolutePath.split("/").pop().replace(".md", "");
    return {
      title: node.frontmatter.title,
      subtitle: node.frontmatter.subtitle,
      date: node.frontmatter.date,
      skills: node.frontmatter.skills || [],
      category: node.frontmatter.category || "Other",
      description: node.excerpt,
      link: node.frontmatter.link,
      slug: filename,
    };
  });

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ];

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-500 mb-8">
            Research prototypes, production apps, and robotic systems.
          </p>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  filter === cat
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <Link
                key={i}
                to={`/projects/${project.slug}/`}
                className="group block bg-white border border-gray-150 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-md">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-400">{project.date}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.skills.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-gray-50 text-gray-500 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-gray-400">
                      +{project.skills.length - 4}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;

export const Head = () => (
  <Seo
    title="Projects"
    description="Portfolio of ML, robotics, and web development projects by Francesco Vigni."
  />
);
