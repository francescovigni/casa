---
title: "Autonomous Interaction Engine: Non-Verbal HRI with TIAGo"
subtitle: "Gaze and arm coordination in a collaborative bartending scenario"
date: "2024-06-01"
skills: ["HRI", "MoveIt", "ROS", "Pal Robotics TIAGo", "Motion Planning", "experimental design", "Python", "C++", "SQLite", "GroundingDINO"]
category: "Robotics"
img: ../images/publications/sample.jpg
---

Overview

During an abroad research experience at TU Wien (Vienna), I worked with the bi‑manual robot TIAGo to study how non‑verbal robot behaviors influence human perception during a collaborative task. We focused on coordinating gaze and arm movements to communicate the robot’s intentions in a bartending scenario (e.g., picking, pouring, handing over).

Goals
- Test whether synchronized gaze and arm motions improve intention clarity.
- Assess effects on user engagement, comfort, and perceived fluency.
- Identify interaction policies that generalize to everyday collaborative tasks.

Robot Behaviors
- Motion Planning: Leveraged TIAGo’s default collision avoidance and motion planning via MoveIt! to execute picking, pouring, and handover actions.
- Gaze Control: Orchestrated head orientation (pan/tilt) to indicate the next target (bottle, glass, or human) and synchronized it with arm trajectories.
- Temporal Coordination: Tuned timing so gaze slightly precedes or matches arm movement, creating a natural, legible intent signal.

Scenario Tasks
- Pick up the bottle from the bar counter.
- Pour a drink into the glass.
- Hand the glass to the participant.
- Reset to neutral posture and await the next instruction.

Study Design
- Participants interacted with TIAGo in the bartending scenario.
- Within‑subject conditions varied gaze/arm coordination (e.g., synchronized vs. desynchronized; gaze leading vs. lagging).
- Measures: Perceived intention clarity, engagement, enjoyment, comfort, and task fluency (Likert scales + qualitative feedback).

Results (Summary)
- Coordinated gaze and arm movements significantly improved perceived intention clarity.
- Participants reported higher engagement and enjoyment with synchronized behaviors.
- Interaction felt more natural when the robot’s gaze indicated the next action target before or during arm motion.

Implementation Notes
- MoveIt!: Used standard planners and safety constraints; verified collision‑free trajectories before execution.
- ROS / ROS2: Action orchestration, state machines for task phases, and synchronization signals for head/arm controllers.
- Timing & Safety: Introduced small delays and guard conditions to avoid abrupt head motion; ensured stable handovers and user comfort.

Skills & Tools
- HRI, Experimental Design
- MoveIt!, Motion Planning
- ROS / ROS2, Python
- Gaze Control, Behavior Synchronization

Future Work
- Extend to multi‑modal cues (voice, light signals) and richer social contexts.
- Investigate transfer to different manipulation tasks and environments.
- Explore adaptive policies that personalize gaze/arm timing to user preferences.
