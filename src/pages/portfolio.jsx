import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const PortfolioPage = () => {
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
            img {
              childImageSharp {
                gatsbyImageData(
                  width: 640
                  height: 360
                  placeholder: BLURRED
                  transformOptions: { fit: COVER }
                )
              }
            }
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
      image: getImage(node.frontmatter.img),
      slug: filename,
    };
  });

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
          <p className="text-gray-500 mb-8">
            I help teams design and apply AI systems in legacy processes.
            Most work here sits in the gap between R&amp;D and production: turning promising ideas into robust
            prototypes and small production systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">When I am a good fit</h2>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                <li>You have in mind the result you expect.</li>
                <li>You need a technical partner for execution and feedbacks.</li>
                <li>You are ready to go beyond proof of concept.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">When I am not the best fit</h2>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                <li>You need only no-code AI tooling with no engineering workflow.</li>
                <li>You expect full production rollout without scoped validation phases.</li>
                <li>You cannot allocate a technical counterpart for decisions and feedback.</li>
              </ul>
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project, i) => (
              <Link
                key={i}
                to={`/projects/${project.slug}/`}
                className="group block overflow-hidden bg-white border border-gray-150 rounded-xl hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="aspect-[16/9] border-b border-gray-100 bg-gray-100">
                  {project.image ? (
                    <GatsbyImage
                      image={project.image}
                      alt={`${project.title} thumbnail`}
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-primary-50 text-center px-4">
                      <p className="text-[11px] uppercase tracking-widest text-primary-600 font-semibold mb-1">
                        {project.category}
                      </p>
                      <p className="text-sm font-medium text-gray-700 line-clamp-2">{project.title}</p>
                    </div>
                  )}
                </div>
                <div className="p-5">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;

export const Head = () => (
  <Seo
    title="Portfolio"
    description="Portfolio of ML, robotics, and web development projects by Francesco Vigni."
  />
);
