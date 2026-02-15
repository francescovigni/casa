---
title: "Edge AI Occupancy Monitoring System"
subtitle: "Top-view ML tracking and zone-based automation on NVIDIA Jetson"
date: "2020-01-12"
skills: ["NVIDIA Jetson", "OpenCV", "PyTorch", "MQTT", "Python", "Computer Vision", "Docker", "C++", "YOLO", "SQLite", "Prototyping"]
category: "ML"
---

This project delivers a ceiling-mounted occupancy monitoring system that detects and tracks people, estimates inter-person distances, and controls bulblights via MQTT when distance violation events occur.

- Installed on the ceiling for a clear top-view of the monitored area.
- Uses a high-quality global-shutter camera for accurate motion capture with minimal blur.
- Runs a compact deep learning pipeline on an NVIDIA Jetson (Nano/Xavier NX) for real-time inference at the edge.
- Converts detections to the floor plane using camera calibration and homography for accurate distance estimation.
- Publishes zone events to an MQTT broker to drive bulblights (on/off, brightness, color) based on crowd density and violations.

Overview
- Goal: Encourage and enforce social-distance policy by highlighting areas with violations using bulblight cues.
- Placement: Ceiling mount at 3–6 meters height, looking downwards with minimal occlusions.
- Output: Per-person tracks, zone occupancy, and violation events (pairwise distances below threshold).

Hardware
- NVIDIA Jetson Nano or Xavier NX (depending on performance needs).
- PoE high-quality camera (global shutter preferred) with fixed lens, calibrated focal length.
- Secure mounting bracket for stable top-view geometry.
- Bulblights connected to an MQTT-enabled controller (e.g., ESP32, Zigbee bridge, or smart bulb gateway).

Software & ML Pipeline
- Detector: Lightweight person detector (e.g., YOLOv5n/YOLOv8n) tuned for overhead perspective.
- Tracker: SORT/DeepSORT for smooth identity tracking and trajectory consistency.
- Projection: Camera calibration (intrinsics) + homography (extrinsics) to map image coordinates to the ground plane.
- Distance: Pairwise distances computed in meters after projection; violations flagged when < `min_distance`.
- Zones: Floor divided into logical zones (grid or polygons); per-zone occupancy and violations tracked.

Top-View Projection & Calibration
- Calibrate intrinsics (fx, fy, cx, cy) using a checkerboard.
- Compute homography from known floor points (at least 4) to image points.
- Apply homography to convert detections from pixels to floor coordinates.
- Validate by measuring known distances on the floor and comparing against projected estimates.

MQTT Integration (Bulblight Control)
- Broker topics:
	- `building/area/zoneX/violations` → integer count per zone
	- `building/area/zoneX/occupancy` → number of tracked people per zone
	- `building/area/zoneX/cmd` → bulb commands (e.g., `{state:on, brightness:70, color:red}`)
- Policy examples:
	- If `violations > 0`: set zone bulbs to red; pulse brightness to draw attention.
	- If `occupancy` high but `violations == 0`: set bulbs warm white at medium brightness.
	- If zone empty: turn bulbs off or very dim.

Distance Violation Logic
- Input: Set `min_distance` (e.g., 1.5 m). Compute distances among tracked persons within the same zone.
- Event: If any pair is below threshold for a sustained duration (e.g., >1.5 s), publish violation event.
- Hysteresis: Use grace windows and cooldown timers to avoid flickering lights.

Performance & Safety
- Edge compute avoids streaming sensitive video off-site; process frames locally.
- Blur or mask faces if required; only publish aggregate events and zone counts.
- Optimize inference via TensorRT for Jetson deployments.
- Use Docker containers for reproducible builds and easy updates.

Results
- Robust tracking in typical indoor lighting at 15–30 FPS depending on model size.
- Accurate distance estimation after calibration; reliable zone-level automation via MQTT.
- Bulblight control provides immediate visual feedback to improve spacing behaviors.

Skills & Tools
- NVIDIA Jetson, TensorRT
- OpenCV, Camera Calibration, Homography
- Deep Learning (YOLO), SORT/DeepSORT
- Python, Docker
- MQTT, IoT lighting control

Future Work
- Multi-camera fusion for larger areas and occlusion handling.
- Adaptive policies based on time of day and occupancy trends.
- Web dashboard for live zone status and manual overrides.
