import React from "react";

// Institutions Francesco has worked with — credibility signal. Proper nouns,
// not localized.
const institutions = [
  "Technical University of Munich",
  "Disney Research",
  "TU Wien",
  "Roboception",
  "Università di Napoli Federico II",
];

const PedigreeStrip = ({ heading }) => (
  <section className="py-10 border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
        {heading}
      </p>
      <div className="flex flex-wrap gap-2">
        {institutions.map((name) => (
          <span
            key={name}
            className="text-sm font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default PedigreeStrip;
