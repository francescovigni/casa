import React, { useState } from "react";
import { Link } from "gatsby";
import projects from "../data/projects";
import experience from "../data/experience";
import education from "../data/education";
import talks from "../data/talks";
import milestones from "../data/milestones";
import workStrings from "../data/workStrings";
import { pick, localizeMonth, tagLabel, tagColors } from "../utils/i18n";

import publicationsData from "../../data/publications.json";
import miscpubsData from "../../data/miscpubs.json";
import personsData from "../../data/persons.json";

/* ---------- Publications ---------- */

const persons = personsData.reduce((acc, p) => {
  acc[p.slug] = { name: `${p.name} ${p.surname}`.trim(), web: p.web };
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
  video: raw.attach && typeof raw.attach === "object" ? raw.attach.video : "",
  award: raw.award,
  type: TYPE_LABEL[raw.type] || raw.type,
});

const byDateDesc = (a, b) => new Date(b.rawDate || 0) - new Date(a.rawDate || 0);
const publications = [...publicationsData].map(normalize).sort(byDateDesc);
const miscPubs = [...miscpubsData].map(normalize).sort(byDateDesc);

const AuthorList = ({ authorSlugs, coFirst }) => (
  <span className="text-sm text-gray-600">
    {authorSlugs.map((slug, i) => {
      const person = persons[slug];
      if (!person) return slug;
      const isMe = slug === "francesco-vigni";
      const showStar = coFirst && i <= 1;
      const el = isMe ? (
        <strong key={slug} className="text-gray-900">
          {person.name}
          {showStar ? "*" : ""}
        </strong>
      ) : person.web ? (
        <a
          key={slug}
          href={person.web}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 transition-colors"
        >
          {person.name}
          {showStar ? "*" : ""}
        </a>
      ) : (
        <span key={slug}>
          {person.name}
          {showStar ? "*" : ""}
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

/* ---------- Talks ---------- */

const YouTubeEmbed = ({ youtubeId, title }) => {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      aria-label={`Play: ${title}`}
      className="relative w-full block group focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      style={{ paddingBottom: "56.25%" }}
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={`Thumbnail for ${title}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
          <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
};

/* ---------- Milestones ---------- */

const INITIAL_SHOW = 8;

const MilestonesSection = ({ locale, s }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? milestones : milestones.slice(0, INITIAL_SHOW);

  return (
    <section className="py-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
          {s.headingMilestones}
        </h2>
        <div className="space-y-1">
          {visible.map((item, i, arr) => {
            const year = item.date.split(" ")[1];
            const prevYear = i > 0 ? arr[i - 1].date.split(" ")[1] : null;
            const isNewYear = year !== prevYear;
            return (
              <React.Fragment key={`${item.date}-${item.tag}-${i}`}>
                {isNewYear && (
                  <div className={`flex items-center gap-3 ${i > 0 ? "pt-4" : ""}`}>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                      {year}
                    </span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                )}
                <div className="flex gap-4 items-baseline py-1">
                  <span className="text-sm text-gray-400 whitespace-nowrap w-10">
                    {localizeMonth(item.date.split(" ")[0], locale)}
                  </span>
                  <p className="text-sm text-gray-600 flex-1">{pick(item.text, locale)}</p>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-block ${
                      tagColors[item.tag] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tagLabel(item.tag, locale)}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {milestones.length > INITIAL_SHOW && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {showAll ? s.showLess : s.showAll(milestones.length)}
          </button>
        )}
      </div>
    </section>
  );
};

/* ---------- Timeline (experience / education) ---------- */

const TimelineSection = ({ heading, items, locale }) => (
  <section className="py-12 border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
        {heading}
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={`${pick(item.title, locale)}-${i}`}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
          >
            <span className="text-sm text-gray-400 whitespace-nowrap min-w-[10rem]">
              {pick(item.period, locale)}
            </span>
            <div>
              <span className="text-sm font-medium text-gray-900">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 transition-colors"
                  >
                    {pick(item.title, locale)}
                  </a>
                ) : (
                  pick(item.title, locale)
                )}
              </span>
              <span className="text-sm text-gray-500"> · {pick(item.org, locale)}</span>
              {item.city && (
                <span className="text-sm text-gray-400"> · {pick(item.city, locale)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Work page ---------- */

const Work = ({ locale = "en" }) => {
  const s = workStrings[locale] || workStrings.en;
  const contactPath = locale === "it" ? "/it/contatti/" : "/contact/";

  return (
    <>
      {/* Intro */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {s.title}
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl">{s.intro}</p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
            {s.headingProjects}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white flex flex-col"
              >
                <img
                  src={project.img}
                  alt={`${project.title} preview`}
                  width={800}
                  height={500}
                  loading="lazy"
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <span className="self-start rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-[11px] font-medium text-primary-700 mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {pick(project.blurb, locale)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      View project →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection heading={s.headingExperience} items={experience} locale={locale} />
      <TimelineSection heading={s.headingEducation} items={education} locale={locale} />

      {/* Publications */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              {s.headingPublications}
            </h2>
            <a
              href="https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-primary-600 hover:bg-gray-100 rounded-full transition-colors self-start"
            >
              {s.scholar}
            </a>
          </div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            {s.pubsConference}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {publications.map((pub) => (
              <PubCard key={pub.slug} pub={pub} />
            ))}
          </div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            {s.pubsMisc}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miscPubs.map((pub) => (
              <PubCard key={pub.slug} pub={pub} showType />
            ))}
          </div>
        </div>
      </section>

      {/* Talks */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
            {s.headingTalks}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {talks.map((talk) => (
              <article
                key={talk.youtubeId}
                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <YouTubeEmbed youtubeId={talk.youtubeId} title={talk.title} />
                <div className="p-5">
                  <span className="text-xs text-gray-400">{talk.date}</span>
                  <h3 className="text-base font-semibold text-gray-900 mt-1 mb-1">
                    {talk.title}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium mb-2">
                    {talk.event}
                  </p>
                  {talk.description && (
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {talk.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MilestonesSection locale={locale} s={s} />

      {/* CTA */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-medium text-gray-900">{s.ctaText}</p>
          <Link
            to={contactPath}
            className="self-start px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {s.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Work;
