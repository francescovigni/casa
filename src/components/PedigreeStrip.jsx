import React from "react";

// Institutions Francesco has worked with — credibility signal. Proper nouns,
// not localized.
const institutions = [
  { name: "Disney Research", url: "https://studios.disneyresearch.com/" },
  { name: "Università degli Studi di Siena", url: "https://www.unisi.it/" },
  { name: "TU Munich", url: "https://www.tum.de/" },
  { name: "Roboception", url: "https://roboception.com/" },
  { name: "TU Wien", url: "https://www.tuwien.at/" },
  { name: "Università di Napoli Federico II", url: "https://www.unina.it/" },

];

const PedigreeStrip = ({ heading }) => (
  <section className="py-10 border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
        {heading}
      </p>
      <div className="flex flex-wrap gap-2">
        {institutions.map((institution) => (
          <a
            key={institution.name}
            href={institution.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:border-primary-300 hover:text-primary-600 transition-colors"
          >
            {institution.name}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PedigreeStrip;
