import React, { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

// Copy to clipboard button (reusable)
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
      aria-label={label}
      title={copied ? "Copied!" : label}
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};

const ContactPage = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact</h1>

          {/* Introduction cards */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-10">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Good reasons to contact me
            </h2>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
              <li>You need a feasibility assessment for a new ML project.</li>
              <li>You own valuable data but are not sure how to use it.</li>
              <li>Your competitors are already using ML.</li>
              <li>You want an audit of an existing ML pipeline before scaling investment.</li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Typical engagements: 1-2 week technical audits, 3-8 week POCs, ongoing part-time consulting,
              and remote collaboration with distributed teams.
            </p>
          </div>

            <div className="text-center mb-10">
                 <a
                    href="https://calendly.com/francescovigni/15min?utm_source=francescovigni.com&utm_medium=homepage&utm_campaign=free_15min_call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    aria-label="Book a free 15-minute call on Calendly"
                  >
                    Book a free 15-min call
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              </a>      
          </div>

          {/* Contact info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {/* Email card (spans 3 columns) */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 lg:col-span-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email
              </span>
              <div className="flex items-center mt-2 gap-2">
                <a
                  href="mailto:hello@francescovigni.com"
                  className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
                >
                  hello@francescovigni.com
                </a>
                <CopyButton text="hello@francescovigni.com" label="Copy email" />
              </div>

              {/* OpenPGP details – now with copyable fingerprint */}
              <details className="mt-5 group">
                <summary className="flex items-center justify-between cursor-pointer select-none outline-none focus:ring-2 focus:ring-primary-300 rounded">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    Fancy encrypted email?
                  </span>
                  <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-xs text-gray-400 font-mono bg-gray-50 rounded-lg p-4 overflow-x-auto leading-relaxed">
                  <div className="flex items-center justify-between mb-2">
                    <span>Fingerprint:</span>
                    <CopyButton
                      text="3F66 B4C7 1664 997D 6A7E B4B2 8DB8 1F5A 4676 A86B"
                      label="Copy fingerprint"
                    />
                  </div>
                  <p className="text-gray-600 select-all">3F66 B4C7 1664 997D 6A7E B4B2 8DB8 1F5A 4676 A86B</p>
                  <p className="mt-3 mb-1">Key ID: <span className="text-gray-600">4676A86B</span></p>
                  <p>Algorithm: <span className="text-gray-600">RSA 4096-bit</span></p>
                  <a
                    href="/hello@francescovigni.pub"
                    download
                    className="inline-flex items-center mt-4 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Download public key ↓
                  </a>
                </div>
              </details>
            </div>

            {/* Location & Availability (stacked) */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Location
                </span>
                <a
                  href="https://www.openstreetmap.org/?mlat=44.2227&mlon=12.0407#map=8/44.2227/12.0407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Forlì, Italy &rarr;
                </a>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Availability
                </span>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Open to freelance &amp; consulting
                </p>
                <p className="text-xs text-gray-500 mt-1">Usually respond within 24h</p>
              </div>
            </div>
          </div>

          

          {/* Elsewhere */}
          <div className="mb-10">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Elsewhere
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: "https://github.com/francescovigni" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/francesco-vigni/" },
                { label: "Scholar", href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" },
                { label: "X", href: "https://x.com/fra_cescovigni" },
                { label: "Orcid", href: "https://orcid.org/0000-0001-9918-8485" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>         
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => (
  <Seo
    title="Contact"
    description="Contact Francesco Vigni for ROS2 medical AI consulting, edge ML endoscopy projects, and freelance robotics engineering collaborations."
    keywords={[
      "ROS2 medical AI consultant",
      "edge ML endoscopy",
      "freelance robotics engineer Italy",
      "medical computer vision consulting",
    ]}
  />
);