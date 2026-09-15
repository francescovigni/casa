// Projects, each told as a deployment story: context → constraints →
// whatIDid → outcome. Ported from the Gatsby site. Images re-added later.
import { type Locale } from "../i18n";

export interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  /** One scannable proof point: a verified number, or a truthful technical proxy. */
  proof: { value: Record<Locale, string>; label: Record<Locale, string> };
  link?: string;
  featured?: boolean;
  blurb: Record<Locale, string>;
  context: Record<Locale, string>;
  constraints: Record<Locale, string>;
  whatIDid: Record<Locale, string>;
  outcome: Record<Locale, string>;
}

export const projects: Project[] = [
  {
    slug: "medical-ai-consulting",
    title: "Foundation Model for Gastroenterology Imaging",
    category: "AI / ML Research",
    tags: ["Self-Supervised Learning", "PyTorch", "Medical Imaging", "Vision Transformers"],
    proof: {
      value: { en: "5M+ frames", it: "5M+ frame" },
      label: { en: "gastrointestinal video, self-supervised pretraining", it: "video gastrointestinali, pretraining self-supervised" },
    },
    featured: true,
    blurb: {
      en: "SSL pretraining strategy and cloud data pipeline for a ViT foundation model on 5M+ gastrointestinal video frames.",
      it: "Strategia di pretraining SSL e pipeline dati cloud per un foundation model ViT su oltre 5M di frame video gastrointestinali.",
    },
    context: {
      en: "An IRCCS hospital needed a foundation model for endoscopic polyp detection, trained on more than 5 million gastrointestinal video frames.",
      it: "Un IRCCS aveva bisogno di un foundation model per il rilevamento di polipi in endoscopia, addestrato su oltre 5 milioni di frame video gastrointestinali.",
    },
    constraints: {
      en: "Strict GDPR compliance and NDA boundaries, cloud-GPU cost ceilings, and a need for reproducible experiments across model architectures.",
      it: "Conformità GDPR rigorosa e vincoli di NDA, tetti di costo per le GPU cloud e la necessità di esperimenti riproducibili su diverse architetture.",
    },
    whatIDid: {
      en: "Designed the SSL pretraining strategy (masked image modelling with DINOv3-style self-distillation), built the cloud data ingestion pipeline, and set up experiment tracking and fine-tuning protocols for classification, segmentation, and detection.",
      it: "Ho progettato la strategia di pretraining SSL (masked image modelling con self-distillation in stile DINOv3), costruito la pipeline di ingestione dati cloud e impostato il tracking degli esperimenti e i protocolli di fine-tuning per classificazione, segmentazione e detection.",
    },
    outcome: {
      en: "A reproducible foundation-model pipeline over 5M+ frames, with data governance designed with future EHDS requirements in mind and a path toward clinical validation and edge inference.",
      it: "Una pipeline di foundation model riproducibile su oltre 5M di frame, con data governance progettata pensando ai futuri requisiti EHDS e un percorso verso la validazione clinica e l'inferenza edge.",
    },
  },
  {
    slug: "edge-ai-occupancy",
    title: "Edge AI Occupancy Monitoring System",
    category: "Robotics & Edge",
    tags: ["NVIDIA Jetson", "Computer Vision", "PyTorch", "YOLO"],
    proof: {
      value: { en: "Real-time on Jetson", it: "Tempo reale su Jetson" },
      label: { en: "on-device tracking and distance estimation, MQTT zone events", it: "tracking e stima distanze on-device, eventi di zona MQTT" },
    },
    blurb: {
      en: "Real-time people tracking and zone-based automation running on NVIDIA Jetson at the edge.",
      it: "Tracciamento delle persone in tempo reale e automazione a zone su NVIDIA Jetson, direttamente all'edge.",
    },
    context: {
      en: "A ceiling-mounted system to monitor occupancy and inter-person distance, driving lighting cues when distance violations occur.",
      it: "Un sistema a soffitto per monitorare l'occupazione e la distanza tra le persone, attivando segnali luminosi in caso di violazioni.",
    },
    constraints: {
      en: "Real-time inference on an NVIDIA Jetson, accurate distance estimation from a single top-view camera, minimal occlusions at 3-6 m mounting height.",
      it: "Inferenza in tempo reale su NVIDIA Jetson, stima accurata delle distanze da una singola telecamera dall'alto, occlusioni minime a 3-6 m di altezza.",
    },
    whatIDid: {
      en: "Built a compact detection-and-tracking pipeline, calibrated the camera and applied homography to project detections onto the floor plane, and published zone events over MQTT.",
      it: "Ho costruito una pipeline compatta di detection e tracking, calibrato la telecamera e applicato l'omografia per proiettare le rilevazioni sul piano del pavimento, pubblicando gli eventi di zona via MQTT.",
    },
    outcome: {
      en: "A working edge deployment performing real-time people tracking, distance estimation, and MQTT-driven lighting on constrained hardware.",
      it: "Un deployment edge funzionante che esegue tracciamento delle persone, stima delle distanze e illuminazione via MQTT su hardware vincolato.",
    },
  },
  {
    slug: "industrial-floor-scrubber-navigation",
    title: "Autonomous Navigation for an Industrial Cleaning Robot",
    category: "Robotics & Edge",
    tags: ["ROS2", "Nav2", "SLAM", "Lidar"],
    proof: {
      value: { en: "Production deployment", it: "Deployment in produzione" },
      label: { en: "ROS2 / Nav2 coverage navigation on a commercial ride-on scrubber", it: "navigazione a copertura ROS2 / Nav2 su una lavasciuga commerciale" },
    },
    blurb: {
      en: "An indoor autonomous navigation stack for a commercial ride-on floor scrubber.",
      it: "Uno stack di navigazione autonoma indoor per una lavasciuga industriale con operatore a bordo.",
    },
    context: {
      en: "A commercial ride-on floor scrubber needed an autonomous indoor navigation stack for large facilities such as warehouses, retail spaces, and airports.",
      it: "Una lavasciuga industriale con operatore a bordo aveva bisogno di uno stack di navigazione autonoma per grandi strutture come magazzini, spazi retail e aeroporti.",
    },
    constraints: {
      en: "Robustness to floor sheen, reflective obstacles and mixed lighting; human-safe behaviour; repeatable coverage routes; simple operator workflows.",
      it: "Robustezza a pavimenti riflettenti, ostacoli speculari e illuminazione mista; comportamento sicuro per le persone; percorsi di copertura ripetibili; flussi operativi semplici.",
    },
    whatIDid: {
      en: "Developed the ROS2/Nav2 navigation stack (SLAM, localization, and coverage path-planning) and validated it in simulation (CoppeliaSIM) and on the platform.",
      it: "Ho sviluppato lo stack di navigazione ROS2/Nav2 (SLAM, localizzazione e pianificazione dei percorsi di copertura) e l'ho validato in simulazione (CoppeliaSIM) e sulla piattaforma reale.",
    },
    outcome: {
      en: "Reliable autonomous navigation with repeatable coverage paths and smooth, human-safe motion in large indoor environments.",
      it: "Navigazione autonoma affidabile, con percorsi di copertura ripetibili e movimento fluido e sicuro in ampi ambienti interni.",
    },
  },
  {
    slug: "bin-picking-reliability",
    title: "Reliability Uplift in Industrial Bin-Picking",
    category: "Robotics & Edge",
    tags: ["Computer Vision", "Stereo Vision", "C++", "ROS2"],
    proof: {
      value: { en: "+9% grasp reliability", it: "+9% affidabilità di presa" },
      label: { en: "industrial bin-picking, shipped in rc_visard and rc_cube", it: "bin-picking industriale, nei prodotti rc_visard e rc_cube" },
    },
    link: "https://roboception.com/",
    blurb: {
      en: "Core perception and grasping software for Roboception's rc_visard and rc_cube industrial products.",
      it: "Software di percezione e grasping per i prodotti industriali rc_visard e rc_cube di Roboception.",
    },
    context: {
      en: "Roboception's stereo-based perception products power industrial pick-and-place. Grasping needed to be more reliable in real factory conditions.",
      it: "I prodotti di percezione stereo di Roboception alimentano il pick-and-place industriale. Il grasping doveva diventare più affidabile in condizioni reali di fabbrica.",
    },
    constraints: {
      en: "Challenging factory lighting and clutter, tight latency budgets, and deterministic production-ready behaviour for integration teams.",
      it: "Illuminazione e disordine difficili in fabbrica, budget di latenza stretti e comportamento deterministico e pronto alla produzione per i team di integrazione.",
    },
    whatIDid: {
      en: "Designed and implemented core C++/Python software for rc_visard and rc_cube, improved grasp generation and validation in the rc_reason component, and tightened the sensing-to-planning data flow.",
      it: "Ho progettato e implementato il software core in C++/Python per rc_visard e rc_cube, migliorato la generazione e la validazione delle prese nel componente rc_reason e ottimizzato il flusso dati dalla percezione alla pianificazione.",
    },
    outcome: {
      en: "Faster pick-and-place cycles and more stable grasp proposals under difficult lighting and clutter, improving grasp reliability by 9%.",
      it: "Cicli di pick-and-place più rapidi e proposte di presa più stabili con illuminazione e disordine difficili, migliorando l'affidabilità della presa del 9%.",
    },
  },
  {
    slug: "self-hosted-infra",
    title: "Self-Hosted Kubernetes Platform",
    category: "DevOps & Infrastructure",
    tags: ["Kubernetes (k3s)", "Helm", "Caddy", "CI/CD", "PostgreSQL"],
    proof: {
      value: { en: "12+ services on one k3s node", it: "12+ servizi su un nodo k3s" },
      label: { en: "health-gated, reversible Helm delivery with automatic rollback", it: "delivery Helm reversibile e health-gated con rollback automatico" },
    },
    blurb: {
      en: "A single-node k3s cluster running a dozen Dockerized services with health-gated, reversible delivery.",
      it: "Un cluster k3s single-node con una dozzina di servizi Dockerizzati e delivery reversibile e health-gated.",
    },
    context: {
      en: "A personal Linux VPS hosting over a dozen services (analytics, workflow automation, CRM, dashboards, custom web apps), migrated onto a single-node Kubernetes (k3s) cluster, each packaged as a Helm chart.",
      it: "Un VPS Linux personale che ospita oltre una dozzina di servizi (analytics, automazione, CRM, dashboard, web app), migrati su un cluster Kubernetes (k3s) single-node, ciascuno pacchettizzato come Helm chart.",
    },
    constraints: {
      en: "Zero-downtime, reversible cutovers; stateful databases with live data migration; automatic rollback; production incident recovery, all on one node.",
      it: "Cutover reversibili e senza downtime; database stateful con migrazione dati a caldo; rollback automatico; ripristino da incidenti in produzione, tutto su un singolo nodo.",
    },
    whatIDid: {
      en: "Authored Helm charts (Deployments, Services, ConfigMaps, Secrets, PersistentVolumes, init-containers, readiness/liveness/startup probes), built health-gated delivery with `helm upgrade --atomic` and digest-pinned images, and ran live credential rotation and incident debugging (OOM self-healing).",
      it: "Ho scritto Helm chart (Deployment, Service, ConfigMap, Secret, PersistentVolume, init-container, probe di readiness/liveness/startup), costruito delivery health-gated con `helm upgrade --atomic` e immagini pinnate per digest, e gestito rotazione credenziali a caldo e debugging di incidenti (self-healing OOM).",
    },
    outcome: {
      en: "A reversible, self-healing platform with Caddy as the retained TLS edge, Cloudflare zero-trust access, and backup-first attended upgrades for stateful data.",
      it: "Una piattaforma reversibile e auto-riparante con Caddy come edge TLS, accesso zero-trust Cloudflare e upgrade attended backup-first per i dati stateful.",
    },
  },
  {
    slug: "hri-interaction-engine",
    title: "Non-Verbal Human-Robot Interaction with TIAGo",
    category: "AI / ML Research",
    tags: ["HRI", "MoveIt", "ROS2", "Motion Planning"],
    proof: {
      value: { en: "Multi-machine ROS2 user study", it: "Studio utente ROS2 multi-macchina" },
      label: { en: "published in IEEE: bi-manual TIAGo with synchronised gaze", it: "pubblicato IEEE: TIAGo bi-manuale con sguardo sincronizzato" },
    },
    blurb: {
      en: "An interaction engine coordinating gaze and arm motion to make a robot's intentions legible to people.",
      it: "Un motore di interazione che coordina sguardo e movimento del braccio per rendere leggibili le intenzioni del robot.",
    },
    context: {
      en: "A TU Wien research study on whether a robot's non-verbal behaviour makes its intentions legible to people during a collaborative task.",
      it: "Uno studio di ricerca alla TU Wien su come il comportamento non verbale di un robot renda leggibili le sue intenzioni in un compito collaborativo.",
    },
    constraints: {
      en: "Safe, collision-free motion around people; precise temporal coordination of head and arm; a controlled within-subject experimental design.",
      it: "Movimento sicuro e privo di collisioni vicino alle persone; coordinazione temporale precisa di testa e braccio; un disegno sperimentale within-subject controllato.",
    },
    whatIDid: {
      en: "Built the interaction engine on the bi-manual TIAGo robot with MoveIt motion planning, synchronized gaze control, and ROS state machines, then ran the user study.",
      it: "Ho costruito il motore di interazione sul robot bi-manuale TIAGo con pianificazione MoveIt, controllo sincronizzato dello sguardo e macchine a stati ROS, e ho condotto lo studio con gli utenti.",
    },
    outcome: {
      en: "Coordinated gaze-and-arm behaviour measurably improved perceived intention clarity, engagement, and interaction fluency (published, IEEE).",
      it: "Il comportamento coordinato di sguardo e braccio ha migliorato in modo misurabile la chiarezza delle intenzioni, il coinvolgimento e la fluidità (pubblicato, IEEE).",
    },
  },
];
