import React, { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

// Copy to clipboard button for email
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@francescovigni.com";
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      setCopied(false);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
      aria-label="Copy email to clipboard"
      title={copied ? "Copied!" : "Copy email"}
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
          <p className="text-gray-500 mb-10">
            Questions, collaborations, or just saying hi. I'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {/* Email: spans 3/5 on large screens */}
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
                <CopyEmailButton />
              </div>
            </div>

            {/* Stack Location and Availability vertically in the right 2/5 */}
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

          {/* PGP Key */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <div>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  OpenPGP Public Key
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Encrypt your message or verify my identity.
                </p>
              </div>
              <a
                href="/hello@francescovigni.pub"
                download
                className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                Download .pub &darr;
              </a>
            </div>
            <div className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg p-4 overflow-x-auto leading-relaxed">
              <p className="mb-1">Fingerprint:</p>
              <p className="text-gray-600 select-all">3F66 B4C7 1664 997D 6A7E B4B2 8DB8 1F5A 4676 A86B</p>
              <p className="mt-3 mb-1">Key ID: <span className="text-gray-600">4676A86B</span></p>
              <p>Algorithm: <span className="text-gray-600">RSA 4096-bit</span></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => (
  <Seo title="Contact" description="Get in touch with Francesco Vigni." />
);