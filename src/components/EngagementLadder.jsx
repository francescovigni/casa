import React from "react";
import engagement from "../data/engagement";
import { pick } from "../utils/i18n";

const EngagementLadder = ({ locale, heading, intro }) => (
  <section id="engagement" className="py-12 border-t border-gray-100 scroll-mt-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
        {heading}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {engagement.map((step, i) => (
          <div
            key={step.key}
            className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col"
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xs font-bold text-primary-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-gray-900">
                {pick(step.name, locale)}
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {pick(step.summary, locale)}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1">
              {pick(step.youGet, locale)}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-3">
              {pick(step.suits, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EngagementLadder;
