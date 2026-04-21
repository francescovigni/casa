import React, { useState, useEffect, useCallback } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const Typewriter = ({ words, typingSpeed = 120, deletingSpeed = 60, pauseDuration = 2200, delay = 0 }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(delay === 0);
    
  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      setText(currentWord.slice(0, text.length + 1));
      if (text.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setText(currentWord.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, isDeleting, wordIndex, words, pauseDuration]);

  useEffect(() => {
    if (!started) return;
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed, started]);

  return (
    <span>
      {text}
      <span className="animate-pulse text-primary-600">|</span>
    </span>
  );    
};

const experience = [
  {
    title: "Applied Research Scientist",
    org: "Private Hospital",
    period: "Jan 2026 – Present",
    city: "Milan, Italy (Remote)",
    url: "/",
  },
  {
    title: "Member, Commission for Information Engineering",
    org: "Ordine degli Ingegneri di Forlì-Cesena",
    period: "Mar 2026 – Present",
    city: "Forlì, Italy",
    url: "/",
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
  { date: "Mar 2026", text: "Joined the Commission for Information and Electronics Engineering, Ordine degli Ingegneri della provincia di Forlì-Cesena.", tag: "Community" },
  { date: "Mar 2026", text: "Attended MECSPE 2026, the international trade fair for the manufacturing industry, held in Bologna, Italy.", tag: "Event" },
  { date: "Feb 2026", text: "Kicked off a new consultancy project applying computer vision and AI to medical imaging.", tag: "Project" },
  { date: "Dec 2025", text: "Won 1st prize at the 2nd Startup Creation Lab — Università di Bologna, hosted at Laboratorio Aperto Forlì.", tag: "Award" },
  { date: "Sep 2025", text: "Launched updated portfolio showcasing recent projects, ML demos, and interests.", tag: "Project" },
  { date: "Jul 2025", text: <a href="https://walk.francescovigni.com">Walked about 1000 km along north of Spain through the Camino del Norte. </a>, tag:"Project"},
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
  Event: "bg-purple-50 text-purple-700",
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
    <section className="py-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
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
  const data = useStaticQuery(graphql`
    query HomeFeaturedProjects {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/projects/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 3
      ) {
        nodes {
          fileAbsolutePath
          frontmatter {
            title
            subtitle
            date(formatString: "MMM YYYY")
            category
            skills
            link
            img {
              childImageSharp {
               gatsbyImageData(
                  width: 900
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  layout: CONSTRAINED
                  quality: 85
                )
              }
            }
          }
        }
      }
    }
  `);

  const featuredProjects = data.allMarkdownRemark.nodes.map((node) => {
    const slug = node.fileAbsolutePath.split("/").pop().replace(".md", "");
    return {
      slug,
      title: node.frontmatter.title,
      subtitle: node.frontmatter.subtitle,
      date: node.frontmatter.date,
      category: node.frontmatter.category || "Other",
      skills: node.frontmatter.skills || [],
      link: node.frontmatter.link,
      img: getImage(node.frontmatter.img) ?? null,
    };
  });

  const flagshipProject =
    featuredProjects.find((project) => project.slug === "medical-ai-consulting") ||
    featuredProjects[0];

  return (
    <Layout>
        {/* Hero */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="hidden md:block flex-shrink-0">
                <div className="w-40 h-40 rounded-full overflow-hidden transition-transform duration-300 group hover:scale-[1.3] hover:-rotate-[0.1rad] hover:ring-4 hover:ring-primary-400 hover:shadow-2xl">
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
                  Francesco Vigni, PhD
                </h1>
                <p className="text-lg text-primary-600 font-medium mb-4">
                  Applied Research Scientist · Medical AI
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  I design and deploy intelligent systems that bridge the gap between cutting-edge research and real-world impact.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  From medical imaging pipelines to autonomous robot perception, I help teams ship production-ready AI—fast.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/portfolio/"
                    className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Portfolio
                  </Link>
                  <a
                    href="https://calendly.com/francescovigni/15min?utm_source=francescovigni.com&utm_medium=homepage&utm_campaign=free_15min_call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    aria-label="Book a free 15-minute call on Calendly"
                  >
                    Let's Talk
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

        {/* About */}
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-4">
              About
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-4xl">
              I'm an engineer (Ordine degli Ingegneri, Forlì-Cesena) with a Ph.D. in ICT for Health and international experience across medical AI,  human-centered design and robotics.
              Today I help healthcare institutions to validate, integrate, and maintain AI models for clinical imaging.
              My work spans foundation models trained on millions of endoscopic frames, EHDS-compliant data governance pipelines, and the engineering infrastructure that keeps them running.
              Whether you're a hospital deploying your first clinical AI or an engineering team building medical imaging tools, I deliver systems that are technically sound and ready for the real world.
            </p>
          </div>
        </section>

        {/* Featured Project */}
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
              Featured Projects
            </h2>
            {flagshipProject && (
              <article className="rounded-xl border border-gray-200 bg-gray-50 p-6 md:p-7">

                {/* Image + title/subtitle side by side */}
                <div className="flex flex-col sm:flex-row gap-5 mb-5">
                 
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-[11px] font-medium text-primary-700">
                          {flagshipProject.category}
                        </span>
                        {flagshipProject.date && (
                          <span className="text-xs text-gray-400">{flagshipProject.date}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{flagshipProject.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{flagshipProject.subtitle}</p>
                    </div>
                  
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {flagshipProject.img && (
                    <div className="overflow-hidden rounded-lg">
                      <GatsbyImage
                        image={flagshipProject.img}
                        alt={`${flagshipProject.title} preview`}
                        className="rounded-lg w-full h-full"
                        imgStyle={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 flex-1">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Challenges &amp; Impact</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Processing high-volume clinical datasets at scale</li>
                        <li>Building reproducible training pipelines under strict privacy constraints</li>
                        <li>Optimizing for cost-efficiency without sacrificing performance</li>
                        <li>Delivering production-ready foundation models within NDA and data governance boundaries</li>
                      </ul>
                    </div>
                    <Link
                      to={`/projects/${flagshipProject.slug}/`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Read case study →
                    </Link>
                  </div>
                </div>

              </article>
            )}
          </div>
        </section>
        {/* Core Capabilities */}
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
              Core Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Medical AI &amp; Computer Vision
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed h-5">
                  <Typewriter
                    words={["Foundation models (ViTs)", "Endoscopic polyp detection", "Self-supervised learning (DINOv3)", "Medical imaging pipelines", "Classification & segmentation", "ONNX & TensorRT deployment"]}
                    delay={0}
                  />
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Infrastructure &amp; MLOps
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed h-5">
                  <Typewriter
                    words={["FastAPI & gRPC services", "Docker & Kubernetes", "W&B & MLflow tracking", "S3 & data lakes", "Multi-GPU training", "CI/CD & GitHub Actions"]}
                    delay={4000}
                  />
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Healthcare Compliance &amp; EHDS
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed h-5">
                  <Typewriter
                    words={["GDPR / DPA compliance", "EHDS readiness assessment", "Data governance & anonymization", "Federated learning setups", "IRCCS / ASL procurement", "Clinical validation protocols"]}
                    delay={8000}
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
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
                    {item.highlights?.map((highlight) => (
                      <p key={highlight} className="text-sm text-gray-500 mt-0.5">{highlight}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-6">
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
