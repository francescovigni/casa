import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const persons = {
  "francesco-vigni": { name: "Francesco Vigni", web: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" },
  "antonio-andriella": { name: "Antonio Andriella", web: "https://antonioandriella.com" },
  "espen-knopp": { name: "Espen Knoop" },
  "domenico-prattichizzo": { name: "Domenico Prattichizzo", web: "https://scholar.google.com/citations?hl=en&user=mMjWcPAAAAAJ" },
  "monica-malvezzi": { name: "Monica Malvezzi", web: "https://scholar.google.com/citations?user=M0NWWgcAAAAJ&hl=en" },
  "linda-miccio": { name: "Linda Miccio" },
  "silvia-rossi": { name: "Silvia Rossi", web: "https://scholar.google.com/citations?user=Q_F1-QIAAAAJ&hl=en&oi=ao" },
  "alessandra-rossi": { name: "Alessandra Rossi", web: "https://scholar.google.com/citations?hl=en&user=ETBNEJ0AAAAJ" },
  "georgios-angelopoulos": { name: "Georgios Angelopoulos", web: "https://scholar.google.com/citations?hl=en&user=C2jDeBkAAAAJ" },
  "giuseppina-russo": { name: "Giuseppina Russo" },
  "mario-turco": { name: "Mario Turco" },
  "dimitri-maglietta": { name: "Dimitri Maglietta" },
  "vasilis-mizaridis": { name: "Vasilis Mizaridis" },
  "stratos-arampatzis": { name: "Stratos Arampatzis" },
  "antonio-vicino": { name: "Antonio Vicino", web: "https://scholar.google.com/citations?user=Z1Mf9KwAAAAJ&hl=en" },
};

const publications = [
  {
    title: "Are Emotions Important? A Study on Social Distances for Path Planning based on Emotions",
    date: "Aug 2024",
    venue: "33rd IEEE RO-MAN 2024",
    location: "Pasadena, California",
    authors: ["vasilis-mizaridis", "francesco-vigni", "stratos-arampatzis", "silvia-rossi"],
    coFirst: true,
    url: "https://doi.org/10.1109/RO-MAN60168.2024.10731180",
    type: "conference",
  },
  {
    title: "Too Close to You? A Study on Emotion-Adapted Proxemics Behaviours",
    date: "Aug 2024",
    venue: "33rd IEEE RO-MAN 2024",
    location: "Pasadena, California",
    authors: ["francesco-vigni", "dimitri-maglietta", "silvia-rossi"],
    url: "https://doi.org/10.1109/RO-MAN60168.2024.10731458",
    type: "conference",
  },
  {
    title: "A Rosbag Tool to Improve Dataset Reliability",
    date: "Jan 2024",
    venue: "19th ACM/IEEE HRI 2024",
    location: "Boulder, Colorado",
    authors: ["francesco-vigni", "antonio-andriella", "silvia-rossi"],
    url: "https://doi.org/10.1145/3610978.3640556",
    video: "https://www.youtube.com/watch?v=A2P3OobA_tc",
    type: "conference",
  },
  {
    title: "Sweet Robot O'Mine — How a Cheerful Robot Boosts Users' Performance in a Game Scenario",
    date: "Aug 2023",
    venue: "32nd IEEE RO-MAN 2023",
    location: "Busan, Korea",
    authors: ["francesco-vigni", "antonio-andriella", "silvia-rossi"],
    url: "https://doi.org/10.1109/RO-MAN57019.2023.10309378",
    video: "https://www.youtube.com/watch?v=VgfcLbxTpK4",
    type: "conference",
  },
  {
    title: "Exploring Non-Verbal Strategies for Initiating an HRI",
    date: "Feb 2023",
    venue: "14th ICSR 2022",
    location: "Florence, Italy",
    authors: ["francesco-vigni", "silvia-rossi"],
    url: "https://doi.org/10.1007/978-3-031-24667-8_25",
    type: "conference",
  },
  {
    title: "On The Emotional Transparency of a Non-Humanoid Social Robot",
    date: "Feb 2023",
    venue: "14th ICSR 2022",
    location: "Florence, Italy",
    authors: ["francesco-vigni", "alessandra-rossi", "linda-miccio", "silvia-rossi"],
    url: "https://doi.org/10.1007/978-3-031-24667-8_26",
    type: "conference",
  },
  {
    title: "Familiar Acoustic Cues for Legible Service Robots",
    date: "Aug 2022",
    venue: "31st IEEE RO-MAN 2022",
    location: "Naples, Italy",
    authors: ["georgios-angelopoulos", "francesco-vigni", "alessandra-rossi", "giuseppina-russo", "mario-turco", "silvia-rossi"],
    coFirst: true,
    url: "https://doi.org/10.1109/RO-MAN53752.2022.9900699",
    type: "conference",
  },
  {
    title: "The Role of Closed-Loop Hand Control in Handshaking Interactions",
    date: "Jan 2019",
    venue: "IEEE ICRA 2019",
    location: "Montreal, Canada",
    authors: ["francesco-vigni", "espen-knopp", "domenico-prattichizzo", "monica-malvezzi"],
    url: "https://doi.org/10.1109/LRA.2019.2893402",
    video: "https://www.youtube.com/watch?v=81vSuxVPW4o",
    award: "Best Paper Finalist Award — HRI Track",
    type: "conference",
  },
];

const miscPubs = [
  {
    title: "The impact of robot communication style on user task performance",
    date: "Oct 2023",
    venue: "5th I-RIM 3D Conference",
    authors: ["francesco-vigni", "antonio-andriella", "silvia-rossi"],
    url: "https://i-rim.it/en/",
    type: "I-RIM 3D",
  },
  {
    title: "An Interaction-centric Approach to Metrics in Social HRI",
    date: "Mar 2023",
    venue: "CONCATENATE Workshop @ ACM/IEEE HRI 2023",
    authors: ["francesco-vigni", "silvia-rossi"],
    url: "https://sites.google.com/view/concatenate-hri/home",
    type: "Workshop",
  },
  {
    title: "The Unscripted Encounter: Social Cues for Spontaneous Human-Robot Interactions",
    date: "Feb 2025",
    venue: "Ph.D. Thesis, University of Naples Federico II",
    authors: ["francesco-vigni"],
    url: "https://drive.google.com/file/d/1_kec847ygcR6kId2rmPujNkQSnkms1Dv/view",
    type: "Ph.D. Thesis",
  },
  {
    title: "A Closed Loop Approach to Human-Robot Handshake",
    date: "Oct 2018",
    venue: "Università degli Studi di Siena",
    authors: ["francesco-vigni", "domenico-prattichizzo", "monica-malvezzi", "espen-knopp"],
    type: "M.Sc. Thesis",
  },
  {
    title: "Analisi e confronti di strategie di trading basate sul trend following",
    date: "Oct 2015",
    venue: "Università degli Studi di Siena",
    authors: ["francesco-vigni", "antonio-vicino"],
    type: "B.Sc. Thesis",
  },
];

const AuthorList = ({ authorSlugs, coFirst }) => (
  <span className="text-sm text-gray-600">
    {authorSlugs.map((slug, i) => {
      const person = persons[slug];
      if (!person) return slug;
      const isMe = slug === "francesco-vigni";
      const name = person.name;
      const showStar = coFirst && i <= 1;
      const el = isMe ? (
        <strong key={slug} className="text-gray-900">
          {name}{showStar ? "*" : ""}
        </strong>
      ) : person.web ? (
        <a
          key={slug}
          href={person.web}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 transition-colors"
        >
          {name}{showStar ? "*" : ""}
        </a>
      ) : (
        <span key={slug}>
          {name}{showStar ? "*" : ""}
        </span>
      );
      return (
        <span key={slug}>
          {i > 0 && ", "}
          {el}
        </span>
      );
    })}
    {coFirst && (
      <span className="text-xs text-gray-400 ml-1">(*equal contribution)</span>
    )}
  </span>
);

const PubCard = ({ pub, showType }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200">
    <div className="flex flex-wrap items-center gap-2 mb-2">
      {showType && (
        <span className="px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-md">
          {pub.type}
        </span>
      )}
      <span className="text-xs text-gray-400">{pub.date}</span>
      {pub.award && (
        <span className="px-2 py-0.5 text-xs font-medium bg-yellow-50 text-yellow-700 rounded-md">
          {pub.award}
        </span>
      )}
    </div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">
      {pub.url ? (
        <a
          href={pub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 transition-colors"
        >
          {pub.title}
        </a>
      ) : (
        pub.title
      )}
    </h3>
    <p className="text-xs text-gray-500 mb-2">
      {pub.venue}
      {pub.location && <span> · {pub.location}</span>}
    </p>
    <div className="text-xs">
      <AuthorList authorSlugs={pub.authors} coFirst={pub.coFirst} />
    </div>
    {pub.video && (
      <a
        href={pub.video}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
      >
        Watch video &rarr;
      </a>
    )}
  </div>
);

const PublicationsPage = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Publications
              </h1>
              <p className="text-gray-500">
                Peer-reviewed research in Human-Robot Interaction, social robotics,
                and robot perception.
              </p>
            </div>
            <a
              href="https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-primary-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              Google Scholar &rarr;
            </a>
          </div>

          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Conference &amp; Journal Papers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {publications.map((pub, i) => (
              <PubCard key={i} pub={pub} />
            ))}
          </div>

          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Workshops, Theses &amp; Other
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miscPubs.map((pub, i) => (
              <PubCard key={i} pub={pub} showType />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PublicationsPage;

export const Head = () => (
  <Seo
    title="Publications"
    description="Research publications by Francesco Vigni in HRI, social robotics, and computer vision."
  />
);
