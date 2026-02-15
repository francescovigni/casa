---
title: "Autonomous Navigation Stack for Industrial Cleaning Robot"
subtitle: Robust indoor SLAM & path-planning on a ride-on scrubber
date: 2019-01-06
skills: ["ROS2", "Nav2", "SLAM", "Localization", "Lidar", "IMU", "Docker", "CoppeliaSIM", "C++", "Python"]
category: "Robotics"
---

This case study outlines the development of an indoor navigation stack for a commercial ride‑on floor‑scrubber platform. It focuses on the engineering approach, algorithms, and validation methodology. Specific vendor or product affiliations are intentionally omitted.

## Goals

- Reliable autonomous navigation in large indoor facilities (warehouses, retail, airports).
- Repeatable routes (coverage paths) with human‑safe behavior and smooth motion.
- Robustness to floor sheen, reflective obstacles, and mixed lighting.
- Simple operator workflows: start/stop routes, pause/recover, docking.

## Constraints

- Indoor GNSS denial; reliance on onboard sensors and prior maps.
- Variable traction and floor conditions (wet, polished, anti‑slip).
- Safety requirements: speed limits, E‑stop integration, minimum stopping distance.
- Compute budget aligned to embedded x86/ARM; deterministic control loops.

## System Architecture

- Middleware: ROS 2 (Humble/Foxy), composition nodes for modularity.
- Navigation: Nav2 stack (global planner, local planner, recovery behaviors).
- Perception: 2D lidar (primary), wheel odometry, IMU fusion; optional depth camera.
- Mapping: Prior static map or online SLAM depending on site commissioning.
- Control: Differential/drive‑by‑wire interface with velocity and steering commands.
- Orchestration: Docker for deployment; health monitoring and logs.

## Localization

- Sensor fusion of wheel encoders + IMU via `robot_localization` (EKF/UKF).
- Lidar scan‑matching (AMCL or NDT) against a 2D occupancy map for global pose.
- Fail‑safes: pose continuity checks, covariance thresholds, relocalization triggers.

## Mapping Options

- Commissioned sites: Offline mapping pass with tuned lidar parameters; map cleaning and inflation for safety margins.
- Dynamic sites: Online SLAM (e.g., Cartographer or Slam Toolbox) during teaching runs; export stabilized map for production.

## Planning & Control

- Global Planner: A* or Theta* on 2D occupancy with configurable cost weights.
- Coverage Patterns: Lane‑based sweeping and serpentine paths for large halls.
- Local Planner: DWB or TEB with obstacle inflation, velocity/acceleration limits, and footprint modeling.
- Motion Quality: Jerk‑limited command smoothing; turn‑in‑place thresholds.

## Obstacle Handling

- Real‑time obstacle buffer around lidar detections with inflation for safety.
- Dynamic obstacle anticipation via velocity obstacles (VO) heuristics at low speeds.
- Recovery behaviors: clear costmap, rotate recovery, slow‑approach relocalization.

## Safety Integration

- Hardware E‑stop and safety PLC interfacing (read‑only status + command gating).
- Speed caps near people‑dense zones; configurable geofences.
- Minimum stopping distances based on friction estimates and payload.

## Operator Workflow

- Route selection from a curated list (pre‑taught or uploaded).
- Start/pause/resume with clear audible/visual cues; graceful stop on interruptions.
- Docking: approach path with slow final alignment; optional fiducials for precision.

## Simulation & Testing

- Digital twin in Gazebo/ignition with site‑like obstacles and friction maps.
- Unit tests for planners; integration tests for localization loss/recovery.
- KPIs: route completion rate, average lateral deviation, stop distance variance, relocalization count per hour.

## Deployment

- Containerized nodes with resource limits; log rotation; watchdogs for critical loops.
- Configuration profiles per site (sensor offsets, inflation radius, speed caps).
- Remote telemetry (optional): route summaries and fault codes (no PII).

## Lessons Learned

- Floor reflectivity impacts lidar; tune filtering and add redundancy where feasible.
- Smooth, predictable motion increases human acceptance more than raw speed.
- Clear operator UX (recover, resume, dock) reduces downtime significantly.

---

Note: This write‑up is an anonymized engineering overview. It does not imply affiliation with any specific manufacturer or model and excludes confidential details.
