import React from "react";
import { Link } from "gatsby";
import homeStrings from "../data/homeStrings";
import projects from "../data/projects";
import { pick } from "../utils/i18n";
import meSquare from "../images/me_square.webp";
import PedigreeStrip from "./PedigreeStrip";
import EngagementLadder from "./EngagementLadder";
import FitQualifier from "./FitQualifier";
import TrustBlock from "./TrustBlock";

const Home = ({ locale = "en" }) => {
  const s = homeStrings[locale] || homeStrings.en;
  const workPath = locale === "it" ? "/it/lavoro/" : "/work/";
  const calendly = `https://calendly.com/francescovigni/15min?utm_source=francescovigni.com&utm_medium=homepage&utm_campaign=free_15min_call&lang=${locale}`;
  const proofProjects = projects.slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="hidden md:block flex-shrink-0">
              <div className="w-40 h-40 rounded-full overflow-hidden">
                <img
                  src={meSquare}
                  alt="Francesco Vigni, Medical AI Consultant"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
                {s.name} · {s.role}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {s.headline}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">
                {s.convergence}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  aria-label={s.calendlyAria}
                >
                  {s.btnTalk}
                </a>
                <a
                  href="#engagement"
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {s.btnHow}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who I work with */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
            {s.whoForHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {s.audiences.map((a) => (
              <div key={a.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{a.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pedigree */}
      <PedigreeStrip heading={s.pedigreeHeading} />

      {/* 4. Engagement ladder */}
      <EngagementLadder
        locale={locale}
        heading={s.engagementHeading}
        intro={s.engagementIntro}
      />

      {/* 5. Fit qualifier */}
      <FitQualifier
        locale={locale}
        heading={s.fitHeading}
        goodLabel={s.fitGood}
        notLabel={s.fitNot}
      />

      {/* 6. Proof */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
            {s.proofHeading}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{s.proofIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {proofProjects.map((project) => (
              <article
                key={project.slug}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white flex flex-col"
              >
                {project.img && (
                  <img
                    src={project.img}
                    alt={`${project.title} preview`}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-5 flex flex-col flex-1">
                  <span className="self-start rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-[11px] font-medium text-primary-700 mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {pick(project.blurb, locale)}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <Link
            to={workPath}
            className="inline-block mt-6 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            {s.proofViewAll}
          </Link>
        </div>
      </section>

      {/* 7. Trust & compliance */}
      <TrustBlock locale={locale} heading={s.trustHeading} intro={s.trustIntro} />

      {/* 8. Closing CTA */}
      <section className="py-14 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{s.ctaHeading}</h2>
          <p className="text-sm text-gray-500 mb-6">{s.ctaText}</p>
          <a
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            aria-label={s.calendlyAria}
          >
            {s.ctaButton}
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
