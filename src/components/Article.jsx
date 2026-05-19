import React from "react";
import { Link } from "gatsby";
import { getArticle } from "../data/insights";
import { pick } from "../utils/i18n";

const formatDate = (iso, locale) =>
  new Date(iso).toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
    month: "long",
    year: "numeric",
  });

const Block = ({ block }) => {
  if (block.type === "h2") {
    return (
      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc pl-5 space-y-1.5 my-4 text-gray-600 leading-relaxed">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-gray-600 leading-relaxed my-4">{block.text}</p>;
};

const Article = ({ slug, locale = "en" }) => {
  const article = getArticle(slug);
  const indexPath = locale === "it" ? "/it/approfondimenti/" : "/insights/";
  const backLabel = locale === "it" ? "← Tutti gli approfondimenti" : "← All insights";

  if (!article) return null;

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={indexPath}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {backLabel}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2 leading-tight">
          {pick(article.title, locale)}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {formatDate(article.date, locale)}
        </p>
        <div className="text-[15px]">
          {pick(article.body, locale).map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default Article;
