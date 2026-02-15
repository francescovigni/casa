---
title: "Industrial Vision: Reliability Uplift in Bin-Picking"
subtitle: Core perception & grasping software for rc_visard/rc_cube
date: 2021-09-01
skills: ["Computer Vision", "ROS2", "Stereo Vision", "C++", "Python", "YOLO"]
category: "Robotics"
---

Roboception GmbH builds stereo‑based perception solutions for industrial robotics. During my time there, I designed and implemented core software for the flagship products `rc_visard` (smart stereo sensor) and `rc_cube` (edge compute platform), and improved grasping strategies within the proprietary component `rc_reason`.

## Focus areas

- Core product software: Components and services powering `rc_visard` and `rc_cube`.
- Grasping strategies: Design and improvements for object detection and grasp planning in `rc_reason`.

## Highlights

- Perception pipelines: image processing, stereo geometry, and 3D reconstruction optimized for factory environments.
- Interfaces and data flow: tighter coordination between sensing (`rc_visard`) and computation (`rc_cube`) to reduce latency and simplify deployment.
- Grasp generation and validation: heuristics and scoring to improve successful picks on varied objects and bins.
- Production‑readiness: deterministic behavior, robust error handling, and diagnostics for integration teams.

## Impact

- Faster end‑to‑end cycles in pick‑and‑place setups by tightening the sensing → perception → planning loop.
- More stable grasp proposals under challenging lighting and clutter, reducing failed attempts.
- Cleaner software boundaries between devices and services for predictable updates and maintenance.

## Tech and practices

- Languages: C++ (performance‑critical modules), Python (orchestration, tooling).
- Domains: stereo vision, pose estimation, point cloud processing, grasp planning.
- Practices: testable components, metrics‑driven tuning, CI, containerized builds.

## Learnings

- Real‑world perception succeeds when algorithms meet solid systems engineering: memory layout, threading, and I/O patterns matter.
- Grasping success blends geometry, priors, and pragmatic validation steps tailored to the setup.
- Clear contracts between sensing devices and compute services speed up iteration and field support.

## References

- rc_visard — Smart 3D camera: https://roboception.com/products/rc_visard/
- rc_cube — Edge computing platform: https://roboception.com/products/rc_cube/
- rc_reason — Perception/grasping components: https://roboception.com/products/rc_reason/
