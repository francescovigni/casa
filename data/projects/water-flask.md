---
title: "IoT Plant Watering System"
subtitle: DIY Raspberry Pi + Flask controller for automated house-plant care
date: 2020-09-17
skills: ["Flask", "Python", "RaspberryPi", "Prototyping"]
category: "IoT"
link: "https://github.com/francescovigni/water_flask"
---

## Overview

"Let’s water them" is a DIY project to keep plants safely watered while you’re away. A Raspberry Pi runs a Flask web app that controls a relay connected to a water pump. From any device on the local network, you can turn the pump on/off or water for a set duration.

Repository: https://github.com/francescovigni/water_flask

Originally published: https://francescovigni.com (Sept 17, 2020)

## Hardware

- Raspberry Pi (GPIO accessible via Python)
- Relay module driving a small water pump
- Simple filter built from a yogurt cup and fabric
- Electronics housed in a lightweight plastic box (kept indoors during winter)

The GPIO ports are controlled directly from Flask views, so web actions map to physical relay toggles.

## Software

- Flask web app exposes ON/OFF and timed watering controls
- Basic Bootstrap for a clean UI
- Simple startup via `.bashrc` so the app starts on boot

### Flask Snippet

```python
# pump specs
pin = 21

import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.OUT)

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return render_template('home.html')
    if request.method == 'POST':
        if 'on' in request.form:
            message = "Turn the pump ON"
            GPIO.output(pin, True)
        elif 'off' in request.form:
            message = "Turn the pump OFF"
            GPIO.output(pin, False)
        elif 'time' in request.form:
            seconds = float(request.form.get('seconds'))
            message = f"Turn the pump ON for {seconds} seconds"
            start = time.time()
            GPIO.output(pin, True)
            while (time.time() - start) < seconds:
                pass
            GPIO.output(pin, False)
        else:
            message = "No valid command"
        return render_template('home.html', message=message)
```

### Autostart on Raspberry Pi

Add to `~/.bashrc`:

```bash
export FLASK_APP=/water_flask/app.py
flask run -h 0.0.0.0
```

Optional: create a Python virtual environment (`venv`) for the project.

## TODO / Improvements

- Hardware: Add a multi‑plant sprinkler kit; consolidate power with a buck converter.
- Networking: Expose the app securely (port forward + auth) for remote control.
- Async control: Make "Water with duration" non‑blocking (queue/async task) so the UI responds immediately.

## Notes

- The timed watering loop is synchronous; a future version should acknowledge the request instantly and run the task in background.
- Keep electronics sheltered; lightweight boxes work for light rain but consider better sealing for storms.
