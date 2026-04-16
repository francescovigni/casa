import React, { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const talks = [
  {
    title: "Datemi un bit e solleverò il mondo",
    event: "Istituto Salesiano Sacro Cuore, Naples",
    date: "Mar 2024",
    description:
      "A talk on the implications of Robotics and AI in the future of our societies, presented to ~200 high-school students at the Teatro Auditorium Salesiano Salvo D'Acquisto.",
    youtubeId: "ZL8goQI_irs",
  },
  {
    title: "Too Close to You? A Study on Emotion-Adapted Proxemics Behaviours",
    event: "33rd IEEE RO-MAN 2024, Pasadena, California",
    date: "Aug 2024",
    description:
      "A study on emotion-adapted proxemics behaviours.",
    youtubeId: "gLyVn9eg0EA",
  },
  {
    title: "A Rosbag Tool to Improve Dataset Reliability",
    event: "ACM/IEEE HRI 2024, Boulder, Colorado",
    date: "Mar 2024",
    description:
      "Late Breaking Report presentation on a tool for improving the reliability of ROS bag datasets in human-robot interaction research.",
    youtubeId: "A2P3OobA_tc",
  },
  {
    title: "Sweet Robot O'Mine — How a Cheerful Robot Boosts Users' Performance",
    event: "IEEE RO-MAN 2023, Busan, South Korea",
    date: "Aug 2023",
    description:
      "Presentation of the paper exploring how a robot's cheerful communication style impacts user task performance in a game scenario.",
    youtubeId: "VgfcLbxTpK4",
  },
  {
    title: "The Role of Closed-Loop Hand Control in Handshaking Interactions",
    event: "IEEE ICRA 2019, Montreal, Canada",
    date: "May 2019",
    description:
      "Presentation of the paper on the role of closed-loop hand control in handshaking interactions.",
    youtubeId: "81vSuxVPW4o",
  }
];

const YouTubeEmbed = ({ youtubeId, title }) => {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  if (active) {
    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      aria-label={`Play: ${title}`}
      className="relative w-full block group focus:outline-none"
      style={{ paddingBottom: "56.25%" }}
    >
      <img
        src={thumb}
        alt={`Thumbnail for ${title}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* dark overlay */}
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      {/* play button */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
          <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
};

const TalksPage = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talks</h1>
          <p className="text-gray-500 mb-10">
            Invited talks, conference presentations, and public appearances.
          </p>

          <div className="space-y-10">
            {talks.map((talk, i) => (
              <article
                key={i}
                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {talk.youtubeId && (
                  <YouTubeEmbed youtubeId={talk.youtubeId} title={talk.title} />
                )}

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                      Talk
                    </span>
                    <span className="text-xs text-gray-400">{talk.date}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {talk.title}
                  </h2>
                  <p className="text-sm text-primary-600 font-medium mb-2">
                    {talk.event}
                  </p>
                  {talk.description && (
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {talk.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TalksPage;

export const Head = () => <Seo title="Talks" />;
