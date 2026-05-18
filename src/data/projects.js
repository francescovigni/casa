// Curated projects shown on the Work page. Flat data — no detail pages.
// `img` is a pre-optimized WebP imported directly (no gatsby-plugin-image).
import polip from "../images/projects/polip.webp";
import edgeAi from "../images/projects/edge_ai.webp";
import scrubber from "../images/projects/scrubber.webp";

const projects = [
  {
    slug: "medical-ai-consulting",
    title: "Applied Research Scientist: Medical AI Consulting",
    category: "ML",
    img: polip,
    tags: ["Self-Supervised Learning", "PyTorch", "Medical Imaging", "Vision Transformers"],
    link: "https://github.com/francescovigni",
    blurb: {
      en: "SSL pretraining strategy and cloud data pipeline for a ViT foundation model on 5M+ gastrointestinal video frames — endoscopic polyp detection, built under strict GDPR compliance.",
      it: "Strategia di pretraining SSL e pipeline dati cloud per un foundation model ViT su oltre 5M di frame video gastrointestinali — rilevamento di polipi in endoscopia, sviluppato in piena conformità GDPR.",
    },
  },
  {
    slug: "jetson-covid",
    title: "Edge AI Occupancy Monitoring System",
    category: "ML",
    img: edgeAi,
    tags: ["NVIDIA Jetson", "Computer Vision", "PyTorch", "YOLO"],
    blurb: {
      en: "A ceiling-mounted occupancy monitoring system running a compact deep-learning pipeline on NVIDIA Jetson — real-time people tracking, distance estimation, and MQTT-driven lighting.",
      it: "Un sistema di monitoraggio dell'occupazione a soffitto con una pipeline di deep learning compatta su NVIDIA Jetson — tracciamento delle persone in tempo reale, stima delle distanze e illuminazione via MQTT.",
    },
  },
  {
    slug: "industrial-floor-scrubber-navigation",
    title: "Autonomous Navigation Stack for Industrial Cleaning Robot",
    category: "Robotics",
    img: scrubber,
    tags: ["ROS2", "Nav2", "SLAM", "Lidar"],
    blurb: {
      en: "An indoor autonomous navigation stack for a commercial ride-on floor scrubber — ROS2/Nav2, robust SLAM and repeatable coverage path-planning for large facilities.",
      it: "Uno stack di navigazione autonoma indoor per una lavasciuga industriale con operatore a bordo — ROS2/Nav2, SLAM robusto e pianificazione di percorsi di copertura ripetibili per grandi strutture.",
    },
  },
];

export default projects;
