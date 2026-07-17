import React from "react";
import fit from "../data/fit";
import { pick } from "../utils/i18n";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FitColumn = ({ label, items, icon: Icon }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{label}</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
          <Icon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FitQualifier = ({ locale, heading, goodLabel, notLabel }) => (
  <section className="py-12 border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FitColumn label={goodLabel} items={pick(fit.good, locale)} icon={CheckIcon} />
        <FitColumn label={notLabel} items={pick(fit.notFit, locale)} icon={CrossIcon} />
      </div>
    </div>
  </section>
);

export default FitQualifier;
