import React, { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { StaticImage } from "gatsby-plugin-image";

const experience = [
  {
    title: "Robotics & AI Systems Consultant",
    org: "Freelance",
    period: "Sep 2025 – Present",
    city: "Forlì, Italy",
    url: "https://apps.francescovigni.com",
  },
  {
    title: "Visiting Researcher",
    org: "TU Wien – Autonomous Systems Lab",
    period: "Oct 2023 – Feb 2024",
    city: "Vienna, Austria",
    url: "https://www.tuwien.at/etit/ict/asl",
  },
  {
    title: "Visiting Researcher",
    org: "Noosware NV",
    period: "Jul 2023 – Aug 2023",
    city: "Eindhoven, Netherlands",
    url: "https://noosware.com/",
  },
  {
    title: "Robotics Engineer",
    org: "Roboception GmbH",
    period: "Jul 2021 – Dec 2021",
    city: "Munich, Germany",
    url: "https://roboception.com/",
  },
  {
    title: "Autonomous Systems Developer",
    org: "STtech GmbH",
    period: "Apr 2020 – Jun 2021",
    city: "Munich, Germany",
    url: "https://www.sttech.de/",
  },
  {
    title: "Research Assistant",
    org: "Technical University of Munich (MIRMI)",
    period: "Apr 2019 – Mar 2020",
    city: "Munich, Germany",
    url: "https://www.mirmi.tum.de/mirmi/startseite/",
  },
  {
    title: "Technical Consultant",
    org: "Daimler AG dealers",
    period: "Jan 2018 – Mar 2018",
    city: "Mid-North, Italy",
    url: "https://kadacon.com/",
  },
  {
    title: "Managing Partner",
    org: "Edilrevi SRL",
    period: "Ago 2018 – Dec 2023",
    city: "Forlì, Italy",
    url: "/",
  },
  {
    title: "Internship",
    org: "Disney Research Zurich",
    period: "Ago 2018 – Sep 2018",
    city: "Zurich, Switzerland",
    url: "https://studios.disneyresearch.com/",
  }
];

const education = [
  {
    title: "Ph.D. in ICT for Health - HRI - MSCA Fellow",
    org: "University of Naples Federico II",
    period: "2021 – 2025",
    city: "Naples, Italy",
    url: "https://www.perseo.eu/esr-12/"
  },
  {
    title: "M.Sc. Robotics & Automation",
    org: "University of Siena",
    period: "2015 – 2018",
    city: "Siena, Italy",
  },
  {
    title: "B.Sc. Management Engineering",
    org: "University of Siena",
    period: "2011 – 2015",
    city: "Siena, Italy",
  },
];

const milestones = [
  { date: "Dec 2025", text: "Won 1st prize at the 2nd Startup Creation Lab — Università di Bologna, hosted at Laboratorio Aperto Forlì.", tag: "Award" },
  { date: "Sep 2025", text: "Launched updated portfolio showcasing recent projects, ML demos, and interests.", tag: "Project" },
  {date: "Jul 2025", text: <a href="https://walk.francescovigni.com">Walked about 1000 km along north of Spain through the Camino del Norte. </a>, tag:"Project"},
  { date: "Mar 2025", text: "Joined the Ordine degli Ingegneri (Forlì-Cesena) — Sector A, Information Engineering.", tag: "Milestone" },
  { date: "Feb 2025", text: "Defended Ph.D. thesis \"The Unscripted Encounter: Social Cues for Spontaneous Human-Robot Interactions\" — Doctor Europæus label, University of Naples Federico II.", tag: "Education" },
  { date: "Feb 2025", text: "Joined the Young Leaders Committee of ICSR25+AI (Naples, Sep 2025).", tag: "Community" },
  { date: "Jan 2025", text: "Proceedings of the ALTRUIST, BAILAR, SCRITA, and WARN 2024 workshops published online.", tag: "Publication" },
  { date: "May 2024", text: "Paper accepted at IEEE RO-MAN 2024 (Pasadena): emotion-based social distances for robot path planning.", tag: "Publication" },
  { date: "May 2024", text: "Paper accepted at IEEE RO-MAN 2024 (Pasadena): emotion-adapted proxemics behaviours.", tag: "Publication" },
  { date: "Mar 2024", text: "Invited talk \"Datemi un bit e solleverò il mondo\" at Istituto Salesiano Sacro Cuore, Naples (~200 students).", tag: "Talk" },
  { date: "Mar 2024", text: "WARN workshop (2nd ed.) accepted at IEEE RO-MAN 2024, Pasadena.", tag: "Workshop" },
  { date: "Feb 2024", text: "Visiting researcher at Autonomous Systems Lab, TU Wien, Vienna (5 months).", tag: "Visit" },
  { date: "Jan 2024", text: "Late Breaking Report accepted at ACM/IEEE HRI 2024, Boulder CO — A Rosbag Tool to Improve Dataset Reliability.", tag: "Publication" },
  { date: "Oct 2023", text: "Presented work on robot communication style impact on user task performance at I-RIM 3D, Rome.", tag: "Publication" },
  { date: "Jul 2023", text: "Visiting researcher at Noosware NV, Eindhoven (2 months) — emotional-aware mobile robotics.", tag: "Visit" },
  { date: "Jun 2023", text: "Paper accepted at IEEE RO-MAN 2023 (Busan): cheerful robot boosts users' performance in a game scenario.", tag: "Publication" },
  { date: "Mar 2023", text: "WARN workshop accepted at IEEE RO-MAN 2023, Busan.", tag: "Workshop" },
  { date: "Mar 2023", text: "Presented interaction-centric metrics at CONCATENATE workshop, HRI 2023, Stockholm.", tag: "Talk" },
  { date: "Mar 2023", text: "Invited talk on AI and Robotics at Liceo Statale Gandhi, Casoria.", tag: "Talk" },
  { date: "Dec 2022", text: "Poster at ICSR 2022 (Florence): non-verbal strategies for initiating HRI.", tag: "Publication" },
  { date: "Dec 2022", text: "Poster at ICSR 2022 (Florence): emotional transparency of a non-humanoid social robot.", tag: "Publication" },
  { date: "Sep 2022", text: "Co-presented familiar acoustic cues for legible service robots at IEEE RO-MAN 2022, Naples.", tag: "Publication" },
  { date: "May 2021", text: "Interviewed by ForliToday on career path and insights in Robotics & AI.", tag: "Media" },
  { date: "May 2021", text: "Met (former) Chancellor Angela Merkel and PM Markus Söder during their visit to MIRMI, TUM.", tag: "Media" },
  { date: "May 2019", text: "Closed-loop human-robot handshake research featured in Corriere di Siena and il cittadino online.", tag: "Media" },
  { date: "May 2019", text: "Finalist for Best Paper Award in HRI at ICRA 2019.", tag: "Award" },
  { date: "May 2019", text: "Awarded academic grant from BCC Ravennate Forlivese e Imolese.", tag: "Award" },
  { date: "Dec 2018", text: "Career talk at former high school ITE Matteucci, Forlì.", tag: "Talk" },
];

const tagColors = {
  Award: "bg-amber-50 text-amber-700",
  Publication: "bg-blue-50 text-blue-700",
  Talk: "bg-green-50 text-green-700",
  Visit: "bg-purple-50 text-purple-700",
  Media: "bg-rose-50 text-rose-700",
  Workshop: "bg-orange-50 text-orange-700",
  Education: "bg-emerald-50 text-emerald-700",
  Community: "bg-teal-50 text-teal-700",
  Milestone: "bg-indigo-50 text-indigo-700",
  Project: "bg-gray-100 text-gray-600",
};

const INITIAL_SHOW = 8;

const MilestonesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? milestones : milestones.slice(0, INITIAL_SHOW);

  return (
    <section className="py-10 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Milestones
        </h2>
        <div className="space-y-1">
          {visible.map((item, i, arr) => {
            const year = item.date.split(" ")[1];
            const prevYear = i > 0 ? arr[i - 1].date.split(" ")[1] : null;
            const isNewYear = year !== prevYear;
            return (
              <React.Fragment key={i}>
                {isNewYear && (
                  <div className={`flex items-center gap-3 ${i > 0 ? "pt-4" : ""}`}>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                      {year}
                    </span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                )}
                <div className="flex gap-4 items-baseline py-1">
                  <span className="text-sm text-gray-400 whitespace-nowrap w-10">
                    {item.date.split(" ")[0]}
                  </span>
                  <p className="text-sm text-gray-600 flex-1">{item.text}</p>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-block ${
                      tagColors[item.tag] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {milestones.length > INITIAL_SHOW && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {showAll
              ? "Show less"
              : `Show all ${milestones.length} milestones ↓`}
          </button>
        )}
      </div>
    </section>
  );
};

const IndexPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="hidden md:block flex-shrink-0">
              <div className="w-40 h-40 rounded-full overflow-hidden transition-transform duration-300 group hover:scale-125 hover:rotate-2 hover:ring-4 hover:ring-primary-300 hover:shadow-2xl">
                <StaticImage
                  src="../images/EC9_8572.jpg"
                  alt="Francesco Vigni"
                  className="w-full h-full transition-transform duration-300"
                  placeholder="blurred"
                  layout="constrained"
                  width={160}
                  height={160}
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Francesco Vigni
              </h1>
              <p className="text-lg text-primary-600 font-medium mb-4">
                Robotics &amp; AI Engineer (Ph.D.)
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                I build reliable autonomous systems at the intersection of
                robotics, computer vision, and production-grade ML. Background
                in human-robot interaction, with experience from Disney Research,
                TU Munich, Roboception, and a Ph.D. from University of Naples.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Specializing in perception pipelines, ROS/ROS2, edge AI
                deployment, and full-stack engineering.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/projects/"
                  className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Projects
                </a>
                <a
                  href="/VIGNI_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills — compact */}
      <section className="py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Robotics & HRI",
                desc: "ROS/ROS2, SLAM, MoveIt, sensor fusion, social robots (Pepper, TIAGo, ARI).",
              },
              {
                title: "Machine Learning & CV",
                desc: "PyTorch, YOLO, object detection & tracking, neural style transfer, edge AI on NVIDIA Jetson.",
              },
              {
                title: "Software & DevOps",
                desc: "Python, C++, TypeScript, FastAPI, Docker, CI/CD. From prototyping to production.",
              },
            ].map((skill, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {skill.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="text-sm text-gray-400 whitespace-nowrap min-w-[10rem]">
                  {item.period}
                </span>
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-600 transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </span>
                  <span className="text-sm text-gray-500"> · {item.org}</span>
                  {item.city && <span className="text-sm text-gray-400"> · {item.city}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="text-sm text-gray-400 whitespace-nowrap min-w-[10rem]">
                  {item.period}
                </span>
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-600 transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </span>
                  <span className="text-sm text-gray-500"> · {item.org}</span>
                  {item.city && <span className="text-sm text-gray-400"> · {item.city}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <MilestonesSection />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo title="Home" />;
