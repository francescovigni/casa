import React from "react";
import trust from "../data/trust";
import { pick } from "../utils/i18n";

const TrustBlock = ({ locale, heading, intro }) => (
  <section className="py-12 border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
        {heading}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{intro}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trust.map((point) => (
          <div
            key={pick(point.label, locale)}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {pick(point.label, locale)}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {pick(point.detail, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBlock;
