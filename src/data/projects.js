// Projects shown on the Work page, each told as a deployment story:
// context, constraints, whatIDid, outcome. Flat data, no detail pages.
// `img` is a pre-optimized WebP imported directly; optional (TIAGo has none).
import polip from "../images/projects/polip.webp";
import edgeAi from "../images/projects/edge_ai.webp";
import scrubber from "../images/projects/scrubber.webp";
import binpicking from "../images/projects/binpicking.webp";
import emotionRobot from "../images/projects/emotion-robot.webp";

const projects = [
  {
    slug: "medical-ai-consulting",
    title: "Foundation Model for Gastroenterology Imaging",
    category: "Medical AI",
    img: '',
    tags: ["Self-Supervised Learning", "PyTorch", "Medical Imaging", "Vision Transformers"],
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
      en: "A reproducible foundation-model pipeline with EHDS-ready data governance and a defined path to clinical validation and edge inference.",
      it: "Una pipeline di foundation model riproducibile, con data governance pronta per l'EHDS e un percorso definito verso validazione clinica e inferenza edge.",
    },
  },
  {
    slug: "edge-ai-occupancy",
    title: "Edge AI Occupancy Monitoring System",
    category: "Edge AI",
    img: '',
    tags: ["NVIDIA Jetson", "Computer Vision", "PyTorch", "YOLO"],
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
    category: "Robotics",
    img: '',
    tags: ["ROS2", "Nav2", "SLAM", "Lidar"],
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
    category: "Robotics",
    img: '',
    tags: ["Computer Vision", "Stereo Vision", "C++", "ROS2"],
    link: "https://roboception.com/",
    blurb: {
      en: "Core perception and grasping software for Roboception's rc_visard and rc_cube industrial products.",
      it: "Software di percezione e grasping per i prodotti industriali rc_visard e rc_cube di Roboception.",
    },
    context: {
      en: "Roboception's stereo-based perception products, the rc_visard smart sensor and the rc_cube edge-compute platform, power industrial pick-and-place. Grasping needed to be more reliable in real factory conditions.",
      it: "I prodotti di percezione stereo di Roboception, il sensore rc_visard e la piattaforma di calcolo edge rc_cube, alimentano il pick-and-place industriale. Il grasping doveva diventare più affidabile in condizioni reali di fabbrica.",
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
      en: "Faster pick-and-place cycles and more stable grasp proposals under difficult lighting and clutter, with cleaner software boundaries for predictable field updates.",
      it: "Cicli di pick-and-place più rapidi e proposte di presa più stabili con illuminazione e disordine difficili, con confini software più netti per aggiornamenti prevedibili sul campo.",
    },
  },
  {
    slug: "hri-interaction-engine",
    title: "Non-Verbal Human-Robot Interaction with TIAGo",
    category: "Robotics",
    tags: ["HRI", "MoveIt", "ROS2", "Motion Planning"],
    blurb: {
      en: "An interaction engine coordinating gaze and arm motion to make a robot's intentions legible to people.",
      it: "Un motore di interazione che coordina sguardo e movimento del braccio per rendere leggibili le intenzioni del robot.",
    },
    context: {
      en: "A TU Wien research study on whether a robot's non-verbal behaviour, coordinated gaze and arm motion, makes its intentions legible to people during a collaborative task.",
      it: "Uno studio di ricerca alla TU Wien su come il comportamento non verbale di un robot, con sguardo e braccio coordinati, renda leggibili le sue intenzioni in un compito collaborativo.",
    },
    constraints: {
      en: "Safe, collision-free motion around people; precise temporal coordination of head and arm; a controlled within-subject experimental design.",
      it: "Movimento sicuro e privo di collisioni vicino alle persone; coordinazione temporale precisa di testa e braccio; un disegno sperimentale within-subject controllato.",
    },
    whatIDid: {
      en: "Built the interaction engine on the bi-manual TIAGo robot, using MoveIt motion planning, synchronized gaze control, and ROS state machines, then ran the user study.",
      it: "Ho costruito il motore di interazione sul robot bi-manuale TIAGo, con pianificazione del movimento MoveIt, controllo sincronizzato dello sguardo e macchine a stati ROS, e ho condotto lo studio con gli utenti.",
    },
    outcome: {
      en: "Coordinated gaze-and-arm behaviour measurably improved perceived intention clarity, engagement, and interaction fluency.",
      it: "Il comportamento coordinato di sguardo e braccio ha migliorato in modo misurabile la chiarezza percepita delle intenzioni, il coinvolgimento e la fluidità dell'interazione.",
    },
  },
  {
    slug: "emotion-aware-robot",
    title: "Emotion-Aware Mobile Robot: Motion & SLAM",
    category: "Robotics",
    img: '',
    tags: ["ROS2", "SLAM", "Python", "Sensor Sync"],
    blurb: {
      en: "ROS2 motion behaviours, SLAM, and synchronized affective audio cues on a mobile research robot.",
      it: "Comportamenti di movimento ROS2, SLAM e segnali audio affettivi sincronizzati su un robot mobile di ricerca.",
    },
    context: {
      en: "A Noosware research platform, an emotion-aware mobile robot, supporting a study on how affective cues shape social distance and navigation comfort.",
      it: "Una piattaforma di ricerca Noosware, un robot mobile emotion-aware, a supporto di uno studio su come i segnali affettivi influenzino la distanza sociale e il comfort di navigazione.",
    },
    constraints: {
      en: "Consistent localization across trials; eliminating clock-drift and TF extrapolation errors; non-blocking audio so navigation stayed responsive.",
      it: "Localizzazione coerente tra le prove; eliminazione del clock-drift e degli errori di estrapolazione TF; audio non bloccante per mantenere reattiva la navigazione.",
    },
    whatIDid: {
      en: "Implemented ROS2 motion behaviours and a SLAM stack, disciplined time synchronization (NTP, launch ordering, TF validation), and a Bluetooth audio pipeline for affective cues.",
      it: "Ho implementato i comportamenti di movimento ROS2 e uno stack SLAM, una sincronizzazione temporale rigorosa (NTP, ordine di avvio, validazione TF) e una pipeline audio Bluetooth per i segnali affettivi.",
    },
    outcome: {
      en: "Robust, repeatable runs with consistent localization and no SLAM resets from time drift, with motion and audio cues that participants found legible and engaging.",
      it: "Esecuzioni robuste e ripetibili con localizzazione coerente e senza reset di SLAM dovuti al time drift, con segnali di movimento e audio percepiti come leggibili e coinvolgenti.",
    },
  },
];

export default projects;
