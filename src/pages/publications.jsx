import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

import publicationsData from "../../data/publications.json";
import miscpubsData from "../../data/miscpubs.json";
import personsData from "../../data/persons.json";

const persons = personsData.reduce((acc, p) => {
  acc[p.slug] = {
    name: `${p.name} ${p.surname}`.trim(),
    web: p.web,
  };
  return acc;
}, {});

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
};

const TYPE_LABEL = {
  "Master Thesis": "M.Sc. Thesis",
  "Bachelor Thesis": "B.Sc. Thesis",
  "Workshop paper": "Workshop",
};

const normalize = (raw) => ({
  slug: raw.slug,
  title: raw.title,
  rawDate: raw.date,
  date: formatDate(raw.date),
  venue: raw.venue,
  location: raw.location,
  authors: raw.authors || [],
  coFirst: !!raw.coFirstAuthors,
  url: raw.url || raw.alternate_link,
  video:
    raw.attach && typeof raw.attach === "object" ? raw.attach.video : "",
  award: raw.award,
  type: TYPE_LABEL[raw.type] || raw.type,
});

const byDateDesc = (a, b) =>
  new Date(b.rawDate || 0) - new Date(a.rawDate || 0);

const publications = [...publicationsData].map(normalize).sort(byDateDesc);
const miscPubs = [...miscpubsData].map(normalize).sort(byDateDesc);

const AuthorList = ({ authorSlugs, coFirst }) => (
  <span className="text-sm text-gray-600">
    {authorSlugs.map((slug, i) => {
      const person = persons[slug];
      if (!person) return slug;
      const isMe = slug === "francesco-vigni";
      const name = person.name;
      const showStar = coFirst && i <= 1;
      const el = isMe ? (
        <strong key={slug} className="text-gray-900">
          {name}{showStar ? "*" : ""}
        </strong>
      ) : person.web ? (
        <a
          key={slug}
          href={person.web}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 transition-colors"
        >
          {name}{showStar ? "*" : ""}
        </a>
      ) : (
        <span key={slug}>
          {name}{showStar ? "*" : ""}
        </span>
      );
      return (
        <span key={slug}>
          {i > 0 && ", "}
          {el}
        </span>
      );
    })}
    {coFirst && (
      <span className="text-xs text-gray-400 ml-1">(*equal contribution)</span>
    )}
  </span>
);

const PubCard = ({ pub, showType }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200">
    <div className="flex flex-wrap items-center gap-2 mb-2">
      {showType && pub.type && (
        <span className="px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-md">
          {pub.type}
        </span>
      )}
      <span className="text-xs text-gray-400">{pub.date}</span>
      {pub.award && (
        <span className="px-2 py-0.5 text-xs font-medium bg-yellow-50 text-yellow-700 rounded-md">
          {pub.award}
        </span>
      )}
    </div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">
      {pub.url ? (
        <a
          href={pub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 transition-colors"
        >
          {pub.title}
        </a>
      ) : (
        pub.title
      )}
    </h3>
    <p className="text-xs text-gray-500 mb-2">
      {pub.venue}
      {pub.location && <span> · {pub.location}</span>}
    </p>
    <div className="text-xs">
      <AuthorList authorSlugs={pub.authors} coFirst={pub.coFirst} />
    </div>
    {pub.video && (
      <a
        href={pub.video}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
      >
        Watch video &rarr;
      </a>
    )}
  </div>
);

const PublicationsPage = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Publications
              </h1>
              <p className="text-gray-500">
                Peer-reviewed research in Human-Robot Interaction, social robotics,
                and robot perception.
              </p>
            </div>
            <a
              href="https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              Google Scholar &rarr;
            </a>
          </div>

          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Conference &amp; Journal Papers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {publications.map((pub) => (
              <PubCard key={pub.slug} pub={pub} />
            ))}
          </div>

          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Workshops, Theses &amp; Other
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miscPubs.map((pub) => (
              <PubCard key={pub.slug} pub={pub} showType />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PublicationsPage;

export const Head = () => (
  <Seo
    title="Publications"
    description="Research publications by Francesco Vigni in HRI, social robotics, and computer vision."
  />
);
