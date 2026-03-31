---
title: "AI Advisor for Medical Imaging"
subtitle: "Foundation-model pipeline for gastroenterology imaging with cloud-scale experimentation"
date: "2026-02-14"
skills: ["Self-Supervised Learning", "PyTorch", "Medical Imaging", "S3", "Weights & Biases", "Cloud GPU"]
category: "ML"
link: "https://github.com/francescovigni"
img: ../images/projects/polip.png
---

End-to-end guidance for the effort to bring a medical imaging workflow from raw endoscopy data to reproducible, production-oriented model development while respecting strict confidentiality constraints.

### Scope (NDA-safe)

- Built a data ingestion pipeline from cloud object storage to training-ready datasets.
- Set up experiment tracking and reproducibility workflows for model development.
- Adapted self-supervised and transfer-learning strategies for domain-specific imagery.
- Managed cloud GPU resources to optimize training throughput and cost-efficiency.
- Planned deployment pathways for edge-oriented inference environments.

### Stack

- Python, PyTorch, and foundation-model workflows.
- Weights & Biases for tracking and experiment management.
- S3-backed datasets and cloud GPU compute.


### Engineering Challenges

- Handling high-volume, heterogeneous video data under medical data governance requirements.
- Reducing bottlenecks between storage, preprocessing, and GPU training jobs.
- Keeping experiments reproducible across rapid model iterations and changing dataset versions.

### Outcome

- Faster experimentation cycles with stronger observability and version traceability.
- Reusable training setup that can scale across future medical imaging tasks.
- Foundation for real-time, clinically relevant inference pipelines.
