import React, { useState } from "react";
import { Link } from "gatsby";
import projects from "../data/projects";
import experience from "../data/experience";
import education from "../data/education";
import talks from "../data/talks";
import milestones from "../data/milestones";
import workStrings from "../data/workStrings";
import { pick, localizeMonth, tagLabel, tagColors } from "../utils/i18n";

const SCHOLAR_URL =
  "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en";

/* ---------- Projects (deployment stories) ---------- */

const Field = ({ label, children }) => (
  <div>
    <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
      {label}
    </dt>
    <dd className="text-sm text-gray-600 leading-relaxed mt-0.5">{children}</dd>
  </div>
);

const ProjectStory = ({ project, locale, labels }) => (
  <article className="rounded-xl border border-gray-200 bg-white overflow-hidden md:flex">
    {project.img && (
      <div className="md:w-64 md:flex-shrink-0">
        <img
          src={project.img}
          alt={`${project.title} preview`}
          width={800}
          height={500}
          loading="lazy"
          className="w-full h-48 md:h-full object-cover"
        />
      </div>
    )}
    <div className="p-5 md:p-6 flex-1">
      <span className="inline-block rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-[11px] font-medium text-primary-700 mb-2">
        {project.category}
      </span>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{project.title}</h3>
      <dl className="space-y-3">
        <Field label={labels.lblContext}>{pick(project.context, locale)}</Field>
        <Field label={labels.lblConstraints}>{pick(project.constraints, locale)}</Field>
        <Field label={labels.lblApproach}>{pick(project.whatIDid, locale)}</Field>
        <Field label={labels.lblOutcome}>{pick(project.outcome, locale)}</Field>
      </dl>
      <div className="flex flex-wrap gap-1.5 mt-4">
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
          className="inline-block mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          View project →
        </a>
      )}
    </div>
  </article>
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

const TimelineSection = ({ heading, items, locale, children }) => (
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
              {item.org && (
                <span className="text-sm text-gray-500"> · {pick(item.org, locale)}</span>
              )}
              {item.city && (
                <span className="text-sm text-gray-400"> · {pick(item.city, locale)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  </section>
);

/* ---------- Work page ---------- */

const Work = ({ locale = "en" }) => {
  const s = workStrings[locale] || workStrings.en;
  const contactPath = locale === "it" ? "/it/contatti/" : "/contact/";

  return (
    <>
      {/* Intro + career arc */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {s.title}
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-5">{s.intro}</p>
          {s.careerArc && (
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl border-l-2 border-primary-200 pl-4">
              {s.careerArc}
            </p>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
            {s.headingProjects}
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectStory
                key={project.slug}
                project={project}
                locale={locale}
                labels={s}
              />
            ))}
          </div>
        </div>
      </section>

      <TimelineSection heading={s.headingExperience} items={experience} locale={locale} />

      <TimelineSection heading={s.headingEducation} items={education} locale={locale}>
        <a
          href="/VIGNI_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {s.cvText} →
        </a>
      </TimelineSection>

      {/* Research background */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            {s.researchHeading}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mb-3">
            {s.researchText}
          </p>
          <a
            href={SCHOLAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            {s.researchLink}
          </a>
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
