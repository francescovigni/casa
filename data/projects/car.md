---
title: "Autonomous Parking: Rule-Based Planning in CARLA"
subtitle: Simulation-driven parking behavior with ROS integration
date: 2023-01-02
skills: ["Carla Simulator", "ROS", "Prototyping", "Python", "Simulation", "Computer Vision"]
category: "Robotics"
link: "https://github.com/francescovigni/carla_parking"
---

## Exploring Rule-Based Parking with Carla and ROS

[ProjectRepo](https://github.com/francescovigni/carla_parking)

<video width="50%" controls>
   <source src="/videos/carla.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

[Carla](http://carla.org/) is a renowned open-source simulator for autonomous driving research, offering a realistic environment for testing and developing autonomous vehicles. In this project, we present an implementation of a rule-based parking motion using Carla and ROS (Robot Operating System). The parking motion follows an open-loop approach, meaning it relies on predefined rules without information retrieval from sensors, potentially leading to crashes.

### Installation

To get started with the rule-based parking implementation, follow these installation steps:

1. Navigate to your catkin workspace:

   ```bash
   cd ~/<catkin_ws>/src
   ```

2. Clone the Carla parking repository:

   ```bash
   git clone https://github.com/francescovigni/carla_parking.git
   ```

3. Move to the root of the catkin workspace and build the project:
   ```bash
   cd ..
   catkin_make
   ```

### Environment Setup

Before running the rule-based parking, make sure to set up the environment properly:

1. Run Carla using the command:

   ```bash
   ./CarlaUE4.sh
   ```

   For more detailed instructions, refer to the [official Carla documentation](https://carla.readthedocs.io/en/latest/start_quickstart/).

2. Launch the Carla ROS bridge:
   ```bash
   roslaunch carla_ros_bridge carla_ros_bridge.launch
   ```

### Running the Rule-Based Parking

To execute the rule-based parking scenario:

1. Source the setup file:

   ```bash
   source devel/setup.bash
   ```

2. Run the parking script:
   ```bash
   rosrun carla_park park.py
   ```

### Example

The implemented routine can be visualized in the provided GIF, showcasing the rule-based parking motion with a time scale of x5.

### Specifications

The `park.py` script implements a basic parking policy for autonomous cars based on geometric information. The script spawns the following entities:

- One ego vehicle at coordinates (x=61.4, y=-7.62, z=0.05).
- Two vehicles inside the parking location adjacent to the ego vehicle at coordinates (x=60.4, y=-10.62, z=0.05) and (x=47.0, y=-10.62, z=0.05).
- A camera attached to the ego vehicle for potential sensor-based parking policies.
- Carla world set to Town 03 carla_maps.
- All vehicles are rotated 180 degrees to align correctly with the street.

### Tested Environment

The rule-based parking has been tested successfully in the following environment:

- Ubuntu 18.04.3 LTS
- Unreal Engine 4.22
- ROS Melodic
- Carla 0.9.7

Feel free to explore and integrate this rule-based parking implementation into your autonomous driving research using Carla and ROS.
