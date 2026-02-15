---
title: "Emotion-Aware Mobile Robot: ROS2 Motion & SLAM"
subtitle: "Programming motion and audio cues with robust time synchronization"
date: "2024-08-01"
skills: ["ROS2", "SLAM", "Python", "NTP Sync"]
category: "Robotics"
---

During my research experience at Noosware VB (Einhoven), I implemented the robot behaviors for an emotion‑aware Roomba platform, combining ROS2 motion control, a SLAM stack for localization, and Bluetooth integration with a speaker for auditory cues. 

The system supported a study on how emotions and affective cues influence social distances and navigation comfort, presented in the publication [“Are Emotions Important? A Study on Social Distances for Path Planning based on Emotions”](/publications/roomba-emotion/).


Key Contributions
- Programmed motion behaviors in ROS2 with smooth velocity profiles and safe hand‑offs between modes (idle → explore → approach → retreat).
- Integrated a Bluetooth audio pipeline to trigger short, familiar cues aligned with motion phases (e.g., approach/retreat), improving legibility.
- Deployed a SLAM stack for consistent localization throughout trials and synchronized timestamps to prevent TF and sensor fusion issues at launch.

System Architecture
- ROS2 Nodes: motion controller, behavior orchestrator, audio player, SLAM/localization, and diagnostics.
- SLAM: Standard ROS2 SLAM stack configured with odometry and range data; TF maintained a stable tree (base → odom → map).
- Audio: Bluetooth link to an external speaker; a ROS2 action/service triggered play/stop events with non‑blocking behavior.

Time & Sync (Tricky Part)
- Clock Alignment: Ensured monotonic time across nodes (system clock discipline via NTP/chrony on dev and robot). Avoided mixed time sources.
- TF/Timestamps: Validated that messages (odom, scan, TF) used consistent headers; guarded against “Extrapolation Error” by aligning SLAM start with active streams.
- Launch Ordering: Sequenced bring‑up so clock/TF producers came online before SLAM, adding readiness checks (topics seen, TF frames available) and a short warm‑up.
- Backpressure Handling: Applied queue sizes and sensor throttling to prevent stale timestamps during startup bursts.

Bluetooth Audio Integration
- Connection Management: Paired and reconnected automatically at boot; health‑checked via keep‑alive pings.
- Playback API: Lightweight ROS2 service to play short cues with optional priority; non‑blocking so navigation stayed responsive.
- Latency Control: Cached audio files locally and pre‑opened the device to minimize first‑play lag.

Evaluation & Outcomes
- Reliable launch: Eliminated time drift issues causing SLAM resets or TF extrapolation errors.
- Coordinated cues: Motion phases and audio cues stayed in sync; participants perceived behavior as more legible and engaging.
- Study support: Robust runs across sessions with consistent localization and repeatable behaviors.

Lessons Learned
- Start simple: Bring up TF/odom first, then sensors, then SLAM, then behaviors.
- Watch the clocks: One disciplined time source; verify message headers and TF validity windows.
- Decouple audio: Treat it as an auxiliary channel with minimal dependencies.

Future Work
- Add emotion‑conditioned path planning parameters for finer proxemics control.
- Expand cue set (earcons) and map them to additional motion intents.
- Extend diagnostics with runtime “sync health” indicators surfaced to an operator UI.
