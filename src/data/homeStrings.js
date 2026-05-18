// Homepage prose, per locale. Marketing copy intentionally differs between
// languages; structural data lives in experience.js / education.js /
// milestones.js.
const homeStrings = {
  en: {
    name: "Francesco Vigni, PhD",
    role: "Medical AI Consultant",
    pitch:
      "I help IRCCS hospitals and R&D teams build solutions that survive real deployment — foundation models, validation pipelines, EHDS-ready data governance.",
    current:
      "Currently: foundation models for gastroenterology endoscopy. PhD in ICT for Health · Ordine degli Ingegneri.",
    btnWork: "Work",
    btnTalk: "Let's Talk",
    btnResume: "Resume",
    calendlyAria: "Book a free 15-minute call on Calendly",
    headingAbout: "About",
    about:
      "I'm an engineer (Ordine degli Ingegneri, Forlì-Cesena) with a Ph.D. in ICT for Health and international experience across medical AI, human-centered design and robotics. Today I help healthcare institutions to validate, integrate, and maintain AI models for clinical imaging. My work spans foundation models trained on millions of endoscopic frames, EHDS-compliant data governance pipelines, and the engineering infrastructure that keeps them running. Whether you're a hospital deploying your first clinical AI or an engineering team building medical imaging tools, I deliver systems that are technically sound and ready for the real world.",
    headingCapabilities: "Core Capabilities",
    capabilities: [
      {
        title: "Medical AI & Computer Vision",
        words: [
          "Foundation models (ViTs)",
          "Endoscopic polyp detection",
          "Self-supervised learning (DINOv3)",
          "Medical imaging pipelines",
          "Classification & segmentation",
          "ONNX & TensorRT deployment",
        ],
      },
      {
        title: "Infrastructure & MLOps",
        words: [
          "FastAPI & gRPC services",
          "Docker & Kubernetes",
          "W&B & MLflow tracking",
          "S3 & data lakes",
          "Multi-GPU training",
          "CI/CD & GitHub Actions",
        ],
      },
      {
        title: "Healthcare Compliance & EHDS",
        words: [
          "GDPR / DPA compliance",
          "EHDS readiness assessment",
          "Data governance & anonymization",
          "Federated learning setups",
          "IRCCS / ASL procurement",
          "Clinical validation protocols",
        ],
      },
    ],
  },
  it: {
    name: "Francesco Vigni, PhD",
    role: "Consulente AI per la Sanità",
    pitch:
      "Aiuto IRCCS e team di R&S a costruire soluzioni che reggono alla messa in produzione reale — foundation model, pipeline di validazione, governance dei dati pronta per l'EHDS.",
    current:
      "Attualmente: foundation model per l'endoscopia gastroenterologica. Dottorato in ICT for Health · Ordine degli Ingegneri.",
    btnWork: "Lavoro",
    btnTalk: "Parliamone",
    btnResume: "Curriculum",
    calendlyAria: "Prenota una call gratuita di 15 minuti su Calendly",
    headingAbout: "Chi sono",
    about:
      "Sono un ingegnere (Ordine degli Ingegneri di Forlì-Cesena) con un dottorato in ICT for Health ed esperienza internazionale tra AI medica, progettazione centrata sull'utente e robotica. Oggi aiuto le strutture sanitarie a validare, integrare e mantenere modelli di AI per l'imaging clinico. Il mio lavoro spazia dai foundation model addestrati su milioni di frame endoscopici, alle pipeline di data governance conformi all'EHDS, fino all'infrastruttura ingegneristica che li tiene in funzione. Che tu sia un ospedale al primo sistema di AI clinica o un team di ingegneri che costruisce strumenti di medical imaging, fornisco sistemi tecnicamente solidi e pronti per il mondo reale.",
    headingCapabilities: "Competenze principali",
    capabilities: [
      {
        title: "AI Medica e Computer Vision",
        words: [
          "Foundation model (ViT)",
          "Rilevamento di polipi in endoscopia",
          "Apprendimento self-supervised (DINOv3)",
          "Pipeline di medical imaging",
          "Classificazione e segmentazione",
          "Deployment ONNX e TensorRT",
        ],
      },
      {
        title: "Infrastruttura e MLOps",
        words: [
          "Servizi FastAPI e gRPC",
          "Docker e Kubernetes",
          "Tracking con W&B e MLflow",
          "S3 e data lake",
          "Training multi-GPU",
          "CI/CD e GitHub Actions",
        ],
      },
      {
        title: "Compliance Sanitaria ed EHDS",
        words: [
          "Conformità GDPR / DPA",
          "Valutazione di readiness EHDS",
          "Data governance e anonimizzazione",
          "Configurazioni di federated learning",
          "Procurement IRCCS / ASL",
          "Protocolli di validazione clinica",
        ],
      },
    ],
  },
};

export default homeStrings;
