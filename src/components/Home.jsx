import React from "react";
import { Link } from "gatsby";
import homeStrings from "../data/homeStrings";
import meSquare from "../images/me_square.webp";

const Home = ({ locale = "en" }) => {
  const s = homeStrings[locale] || homeStrings.en;
  const workPath = locale === "it" ? "/it/lavoro/" : "/work/";

  return (
    <>
      {/* Hero */}
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {s.name}
              </h1>
              <p className="text-lg text-primary-600 font-medium mb-4">{s.role}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{s.pitch}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.current}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={workPath}
                  className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {s.btnWork}
                </Link>
                <a
                  href={`https://calendly.com/francescovigni/15min?utm_source=francescovigni.com&utm_medium=homepage&utm_campaign=free_15min_call&lang=${locale}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  aria-label={s.calendlyAria}
                >
                  {s.btnTalk}
                </a>
                <a
                  href="/VIGNI_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {s.btnResume}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-4">
            {s.headingAbout}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">{s.about}</p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
            {s.headingCapabilities}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.capabilities.map((cap) => (
              <div key={cap.title}>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{cap.title}</h3>
                <ul className="space-y-1">
                  {cap.words.map((word) => (
                    <li key={word} className="text-sm text-gray-500 leading-relaxed">
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
