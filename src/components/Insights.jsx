import React from "react";
import { Link } from "gatsby";
import insights from "../data/insights";
import { pick } from "../utils/i18n";

const strings = {
  en: {
    title: "Insights",
    intro:
      "Practical notes on building clinical AI that survives validation, governance, and real deployment.",
    read: "Read article →",
  },
  it: {
    title: "Approfondimenti",
    intro:
      "Note pratiche su come costruire un'AI clinica che superi validazione, governance e deployment reale.",
    read: "Leggi l'articolo →",
  },
};

const formatDate = (iso, locale) =>
  new Date(iso).toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
    month: "long",
    year: "numeric",
  });

const Insights = ({ locale = "en" }) => {
  const s = strings[locale] || strings.en;
  const base = locale === "it" ? "/it/approfondimenti/" : "/insights/";

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {s.title}
        </h1>
        <p className="text-gray-600 leading-relaxed mb-10">{s.intro}</p>
        <div className="space-y-6">
          {insights.map((article) => (
            <article
              key={article.slug}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <p className="text-xs text-gray-400 mb-1">
                {formatDate(article.date, locale)}
              </p>
              <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
                <Link
                  to={`${base}${article.slug}/`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {pick(article.title, locale)}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {pick(article.summary, locale)}
              </p>
              <Link
                to={`${base}${article.slug}/`}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {s.read}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
