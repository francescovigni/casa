// Curated Q&A for the /ask page. Embedded at build by scripts/embed-qa.mjs —
// run `npm run embed` after editing, or the qa-embeddings sync test fails.
// Facts must stay within what the public site already states (NDA: the
// clinical partner is "an IRCCS research hospital", never named).
export interface QAEntry {
  id: string;
  question: string; // canonical phrasing — embedded, and shown in the noscript FAQ
  aliases: string[]; // paraphrases — also embedded
  answer: string; // plain text, first person, typed out in the chat
  links?: { label: string; href: string }[];
  chip?: string; // short label — renders as a suggested-question chip
}

export const qa: QAEntry[] = [
  // ---- Healthcare AI / research ----
  {
    id: "healthcare-ai",
    question: "What is your healthcare AI work?",
    aliases: [
      "Tell me about your medical imaging research",
      "What did you do with foundation models?",
      "Experience with clinical machine learning?",
    ],
    answer:
      "I lead the technical development of a self-supervised foundation model for medical imaging with an IRCCS research hospital — from the cloud data pipeline to distributed ViT pre-training and fine-tuning protocols for classification, segmentation, and detection. It's the work I most want to keep doing.",
    links: [{ label: "Work", href: "/work/" }],
    chip: "Healthcare AI work",
  },
  {
    id: "foundation-model-project",
    question: "What does the gastroenterology foundation model project involve?",
    aliases: [
      "How big was the endoscopy dataset?",
      "What is the polyp detection model trained on?",
      "Details of your medical foundation model project?",
    ],
    answer:
      "The goal is a foundation model for endoscopic polyp detection, pre-trained on more than 5 million gastrointestinal video frames. I designed the SSL pretraining strategy — masked image modelling with DINOv3-style self-distillation — built the cloud data ingestion pipeline, and set up experiment tracking and fine-tuning protocols, all under strict GDPR and NDA constraints.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "ssl-vit",
    question: "What is your experience with self-supervised learning and Vision Transformers?",
    aliases: [
      "Do you know SSL and ViTs?",
      "Have you done distributed training?",
      "What deep learning methods do you use?",
    ],
    answer:
      "My current research line is self-supervised ViT pre-training at scale: masked image modelling with self-distillation, distributed training under cloud-GPU cost ceilings, and reproducible evaluation across architectures. The emphasis is always a defined path from research to clinical validation.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "reproducibility",
    question: "How do you keep experiments reproducible?",
    aliases: [
      "What is your approach to experiment tracking?",
      "How do you manage ML experiments?",
    ],
    answer:
      "Reproducibility is a hard requirement in my current project: experiment tracking, versioned fine-tuning protocols per downstream task, and cost-conscious training runs that can be compared across model architectures. The same discipline shows up in my infrastructure work — digest-pinned images and reversible deploys.",
  },
  {
    id: "medical-data",
    question: "How do you handle sensitive medical data?",
    aliases: [
      "Experience with GDPR-compliant data pipelines?",
      "Can you work with patient data?",
    ],
    answer:
      "The foundation-model work runs under strict GDPR compliance and NDA boundaries, with EHDS-ready data governance built into the pipeline. I'm comfortable operating where data can't leave a controlled environment — this chat itself runs entirely in your browser for the same reason.",
  },
  // ---- Robotics ----
  {
    id: "robotics",
    question: "What is your robotics experience?",
    aliases: [
      "Have you worked with robots?",
      "Tell me about your robotics background",
      "Do you know ROS?",
    ],
    answer:
      "Years of it, mostly in Germany and Austria: autonomous mobile robots deployed across factories, core 3D-perception and grasping software at Roboception, ROS2/Nav2 navigation for an industrial cleaning robot, and human-robot interaction research on a bi-manual TIAGo. I like robots that have to work with real people in the real world.",
    links: [{ label: "Work", href: "/work/" }],
    chip: "Robotics",
  },
  {
    id: "ros2-navigation",
    question: "What did you build with ROS2 and Nav2?",
    aliases: [
      "Experience with SLAM and navigation?",
      "Autonomous navigation projects?",
    ],
    answer:
      "I developed the autonomous indoor navigation stack for a commercial ride-on floor scrubber — ROS2/Nav2 with SLAM, localization, and coverage path-planning — validated in CoppeliaSIM and on the real platform. The hard parts were reflective floors, mixed lighting, and human-safe motion in warehouses, retail spaces, and airports.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "jetson-edge",
    question: "Have you deployed AI on edge devices?",
    aliases: [
      "Experience with NVIDIA Jetson?",
      "Real-time inference on embedded hardware?",
    ],
    answer:
      "Yes — for example a ceiling-mounted occupancy system doing real-time people tracking on an NVIDIA Jetson: a compact detection-and-tracking pipeline, camera calibration with homography to project detections onto the floor plane, and zone events published over MQTT. Constrained hardware, real-time budgets.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "bin-picking",
    question: "What did you do at Roboception?",
    aliases: [
      "Experience with industrial computer vision?",
      "Tell me about your pick-and-place work",
      "Stereo vision experience?",
    ],
    answer:
      "I designed and implemented core C++/Python software for Roboception's rc_visard and rc_cube industrial products, improving grasp generation and validation in the rc_reason component. Under difficult factory lighting and clutter, that work improved grasp reliability by 9% and sped up pick-and-place cycles.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "hri-research",
    question: "What is your human-robot interaction research about?",
    aliases: [
      "What did you study in your PhD?",
      "Tell me about the TIAGo robot work",
    ],
    answer:
      "How robots make their intentions legible to people. At TU Wien I built an interaction engine on a bi-manual TIAGo — MoveIt motion planning, synchronized gaze control, ROS state machines — and ran a user study showing that coordinated gaze-and-arm behaviour measurably improves perceived intention clarity and interaction fluency. Published with IEEE.",
    links: [{ label: "Scholar", href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" }],
  },
  // ---- Infrastructure ----
  {
    id: "infrastructure",
    question: "What is your infrastructure and DevOps experience?",
    aliases: [
      "Do you know Kubernetes?",
      "Tell me about your DevOps skills",
      "Can you run production systems?",
    ],
    answer:
      "I run my own single-node Kubernetes (k3s) platform hosting over a dozen services — this site included. Helm charts, CI/CD, health-gated reversible delivery, live credential rotation, and real production incident debugging. I like owning the whole stack, from the model down to the metal.",
    links: [{ label: "Work", href: "/work/" }],
    chip: "Infrastructure",
  },
  {
    id: "k3s-platform",
    question: "How is your self-hosted platform built?",
    aliases: [
      "Details of your k3s cluster?",
      "What services do you self-host?",
    ],
    answer:
      "A dozen Dockerized services — analytics, workflow automation, a CRM, dashboards, custom web apps — each packaged as a Helm chart on single-node k3s, with Caddy as the TLS edge and Cloudflare zero-trust access. Stateful databases got live data migration, and upgrades are backup-first and reversible.",
  },
  {
    id: "cicd",
    question: "How do you approach CI/CD and deployments?",
    aliases: [
      "What is health-gated delivery?",
      "How do you avoid breaking production?",
    ],
    answer:
      "Health-gated and reversible: helm upgrade --atomic with digest-pinned images, readiness/liveness/startup probes deciding whether a rollout sticks, and automatic rollback when they fail. Zero-downtime cutovers even for stateful services, all on one node.",
  },
  {
    id: "incidents",
    question: "Have you handled production incidents?",
    aliases: [
      "Debugging experience in production?",
      "What happens when your systems break?",
    ],
    answer:
      "Yes — hands-on. Example: diagnosing an out-of-memory crash loop on my own cluster and turning it into self-healing behaviour, plus live credential rotation without downtime. Small platform, real stakes: it hosts everything I run, including this site.",
  },
  // ---- Background / story ----
  {
    id: "background",
    question: "Tell me about yourself",
    aliases: [
      "Who are you?",
      "What is your background?",
      "Give me a summary of your experience",
    ],
    answer:
      "I'm a PhD engineer and researcher. I build AI that has to work outside the lab — from medical-imaging foundation models to robots on the factory floor — and the infrastructure to run it in production. The through-line: machine learning that survives deployment.",
    links: [{ label: "My story", href: "/" }, { label: "Work", href: "/work/" }],
  },
  {
    id: "education",
    question: "Where did you study?",
    aliases: [
      "What degrees do you have?",
      "What is your academic background?",
    ],
    answer:
      "Engineering in Siena, Master's thesis at Disney Research Zurich, then a Marie Skłodowska-Curie PhD at the University of Naples Federico II with research stays at TU Wien. Along the way: TU Munich, Disney Research, and industry years in Germany.",
  },
  {
    id: "disney",
    question: "What did you do at Disney Research?",
    aliases: [
      "Tell me about the handshake robot",
      "What was your Master's thesis?",
    ],
    answer:
      "My Master's thesis at Disney Research Zurich: closed-loop control for a robot that shakes your hand. It became a paper in IEEE RA-L — and it set the tone for everything since, building things that work with real people.",
    links: [{ label: "Scholar", href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" }],
  },
  {
    id: "phd",
    question: "What was your PhD about?",
    aliases: [
      "Are you a Marie Curie fellow?",
      "Tell me about your doctorate",
    ],
    answer:
      "A Marie Skłodowska-Curie PhD in Naples on non-verbal human-robot interaction — how robots make their intentions legible to people — with secondments at TU Wien. It bridged my industry robotics years back into research.",
  },
  {
    id: "germany-industry",
    question: "What did you do in industry in Germany?",
    aliases: [
      "What companies have you worked for?",
      "Tell me about your industry experience",
    ],
    answer:
      "I spent years deploying autonomous mobile robots across factories, then built core 3D-perception and grasping software at Roboception in Munich for industrial pick-and-place. Commercial systems, deployed in multiple countries — not demos.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "pedigree",
    question: "Which institutions have you worked with?",
    aliases: [
      "What is your professional pedigree?",
      "Where have you done research?",
    ],
    answer:
      "University of Naples Federico II, TU Wien, TU Munich, Disney Research, and Roboception — plus a Marie Skłodowska-Curie fellowship and, today, a foundation-model collaboration with an IRCCS research hospital.",
  },
  {
    id: "publications",
    question: "Where can I find your publications?",
    aliases: [
      "Do you have published papers?",
      "What is your research output?",
    ],
    answer:
      "On Google Scholar. Highlights: the Disney handshake-robot work in IEEE RA-L and the human-robot interaction studies from my PhD, published with IEEE.",
    links: [{ label: "Google Scholar", href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" }],
  },
  {
    id: "current-work",
    question: "What are you working on right now?",
    aliases: [
      "What is your current project?",
      "What keeps you busy these days?",
    ],
    answer:
      "Leading the technical development of a self-supervised foundation model for medical imaging with an IRCCS research hospital, and running my self-hosted Kubernetes platform on the side. And looking for the right stable role to keep doing this kind of work.",
    links: [{ label: "Contact", href: "/contact/" }],
  },
  // ---- Hiring / roles ----
  {
    id: "open-to-roles",
    question: "Are you open to full-time roles?",
    aliases: [
      "Are you looking for a job?",
      "Would you join our team?",
      "Are you available for hire?",
    ],
    answer:
      "Yes — actively. I'm looking for a stable research, engineering, or infrastructure role where ML has to reach production, ideally in healthcare AI. I'm also open to research collaborations and a limited amount of consulting.",
    links: [{ label: "Contact", href: "/contact/" }],
    chip: "Open to roles?",
  },
  {
    id: "role-wanted",
    question: "What kind of role are you looking for?",
    aliases: [
      "What is your ideal job?",
      "What position would suit you?",
    ],
    answer:
      "Research, engineering, or infrastructure — the common thread is machine learning that has to survive deployment. Healthcare-AI research is the flagship interest, but I'm equally at home in robotics and platform work. What matters most is a good team and real production stakes.",
    links: [{ label: "Contact", href: "/contact/" }],
  },
  {
    id: "why-hire",
    question: "Why should we hire you?",
    aliases: [
      "What makes you different?",
      "What are your strengths?",
    ],
    answer:
      "Range with proof: I've taken ML from research papers to clinical data pipelines, robots from simulation to factory floors, and I operate the production infrastructure myself. You get one person who can speak researcher, engineer, and ops — because I've actually been all three.",
    links: [{ label: "Work", href: "/work/" }],
  },
  {
    id: "research-collaboration",
    question: "Do you take on research collaborations?",
    aliases: [
      "Can we write a paper together?",
      "Are you open to joint projects?",
    ],
    answer:
      "Yes — joint projects, co-authored papers, EU-funded research, and clinical-AI partnerships. If it advances the deployment-grade-ML line of work, I'm interested.",
    links: [{ label: "Contact", href: "/contact/" }],
  },
  {
    id: "consulting",
    question: "Are you available for consulting?",
    aliases: [
      "Can I hire you for a project?",
      "Do you freelance?",
    ],
    answer:
      "Selectively — a limited number of scoped technical engagements where I can genuinely move the needle. My primary focus right now is finding the right full-time role, so I keep consulting deliberately small.",
    links: [{ label: "Contact", href: "/contact/" }],
  },
  {
    id: "availability",
    question: "When could you start?",
    aliases: [
      "What is your availability?",
      "How soon can you join?",
    ],
    answer:
      "I'm actively looking, so realistically soon — but the honest answer depends on the role. Get in touch and I'll reply personally, usually within a day or two.",
    links: [{ label: "Contact", href: "/contact/" }],
  },
  {
    id: "location-remote",
    question: "Where are you based, and would you relocate?",
    aliases: [
      "Do you work remotely?",
      "Would you move for a job?",
      "Where do you live?",
    ],
    answer:
      "I'm based in Forlì, Italy, and I'm open to both relocation and remote work. I've lived and worked in Switzerland, Germany, and Austria before — moving for the right role isn't new to me.",
  },
  {
    id: "languages",
    question: "What languages do you speak?",
    aliases: [
      "Do you speak English?",
      "Can you work in German?",
    ],
    answer:
      "Italian natively, plus fluent English and Spanish, and some German from my industry years in Munich.",
  },
  {
    id: "cv-download",
    question: "Can I see your CV?",
    aliases: [
      "Where do I download your resume?",
      "Do you have a CV I can share?",
    ],
    answer:
      "Of course — there's a PDF you can download and pass around. For the story behind the bullet points, the Work page has each project told as a deployment story.",
    links: [
      { label: "Download CV", href: "/Francesco-Vigni-CV.pdf" },
      { label: "Work", href: "/work/" },
    ],
  },
  {
    id: "contact",
    question: "How can I contact you?",
    aliases: [
      "What is your email?",
      "How do I get in touch?",
    ],
    answer:
      "Email hello@francescovigni.com or use the contact form — I reply personally, usually within a day or two. I'm also on LinkedIn and GitHub.",
    links: [
      { label: "Contact", href: "/contact/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/francesco-vigni/" },
    ],
  },
  // ---- Trust / compliance ----
  {
    id: "gdpr-ehds",
    question: "Do you know GDPR and the EHDS?",
    aliases: [
      "Experience with EU data regulation?",
      "Is your work compliant with health data rules?",
    ],
    answer:
      "Yes — my current clinical-AI work runs under strict GDPR with EHDS-ready data governance, and my own stack is EU-based and self-hosted. For healthcare-data roles this isn't paperwork to me; it shapes how I design pipelines.",
  },
  {
    id: "nda",
    question: "Can you work under NDA?",
    aliases: [
      "How do you handle confidential projects?",
      "Why don't you name your clinical partner?",
    ],
    answer:
      "Comfortably — my current foundation-model engagement runs under one, which is why I describe the partner only as an IRCCS research hospital. What I publish here stays within what's public.",
  },
  {
    id: "engineer-registration",
    question: "Are you a registered engineer?",
    aliases: [
      "Are you chartered?",
      "Do you have a professional license?",
    ],
    answer:
      "Yes — I'm registered with the Italian Ordine degli Ingegneri (#2988), and I hold a PhD in engineering.",
  },
  // ---- Tech / meta ----
  {
    id: "tech-stack",
    question: "What technologies do you use?",
    aliases: [
      "What is your tech stack?",
      "Which programming languages do you know?",
    ],
    answer:
      "PyTorch for research, C++ and Python for robotics and vision (ROS2, Nav2, MoveIt, stereo perception), and Kubernetes, Helm, and CI/CD tooling for infrastructure. This site itself is Astro + TypeScript, deployed on my own k3s cluster.",
  },
  {
    id: "website",
    question: "Who built this website?",
    aliases: [
      "What is this site made with?",
      "How is this site hosted?",
    ],
    answer:
      "I did — Astro and TypeScript, containerized and deployed with a Helm chart onto my own single-node k3s cluster, behind Caddy and Cloudflare. The site is part of the portfolio: it runs on the same infrastructure practices I'd bring to your team.",
  },
  {
    id: "how-chat-works",
    question: "How does this chat work?",
    aliases: [
      "Is this a real AI?",
      "Are you a chatbot?",
      "Is this ChatGPT?",
    ],
    answer:
      "No live LLM — I wrote every answer myself. Your question is matched to them semantically, right here in your browser: a small sentence-embedding model (MiniLM, via transformers.js) runs client-side, so nothing you type ever leaves your device. If nothing matches, it tells you honestly and points you to me.",
    chip: "How does this chat work?",
  },
  {
    id: "working-style",
    question: "What is your working style?",
    aliases: [
      "How do you like to work?",
      "What are you like as a colleague?",
    ],
    answer:
      "End-to-end and hands-on: I like owning problems from the model down to the metal, making things reproducible and reversible, and building for the people who actually use them — clinicians, factory operators, or the next engineer. And I reply personally to everything.",
  },
];
