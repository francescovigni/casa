---
title: "Applied Research Scientist @ Humanitas Research Hospital"
subtitle: "Foundation-model pipeline for gastroenterology imaging with cloud-scale experimentation"
date: "2026-01-14"
skills: ["Self-Supervised Learning", "PyTorch", "Medical Imaging", "S3", "Weights & Biases", "Cloud GPU", "DINOv3", "Vision Transformers"]
category: "ML"
link: "https://github.com/francescovigni"
img: ../images/projects/polip.png
---

Architecture design and SSL pretraining strategy for a ViT-based foundation model on 5M+ gastrointestinal video frames for endoscopic polyp detection — in collaboration with IRCCS Humanitas Research Hospital.

### Scope (NDA-safe)

- Designed SSL pretraining strategy combining masked image modelling with DINOv3-style self-distillation.
- Built data ingestion pipeline from cloud object storage to training-ready datasets under strict GDPR compliance.
- Set up experiment tracking and reproducibility workflows across multiple model architectures.
- Defined fine-tuning protocols for classification, segmentation, detection, and severity scoring tasks.
- Managed cloud GPU resources to optimize training throughput and cost-efficiency.
- Planned deployment pathways for clinical validation and edge-oriented inference environments.

### Stack

- Python, PyTorch, Vision Transformers (ViT), DINOv3-style self-distillation.
- Weights & Biases for tracking and experiment management.
- S3-backed datasets and cloud GPU compute.

### Engineering Challenges

- Processing high-volume, heterogeneous endoscopic video under medical data governance constraints.
- Designing multi-objective pretraining that balances feature self-distillation with masked image modelling.
- Reducing bottlenecks between storage, preprocessing, and multi-GPU training jobs.
- Keeping experiments reproducible across rapid model iterations and changing dataset versions.

### Outcome

- Foundation model architecture capable of self-supervised learning on millions of unlabeled clinical frames.
- Benchmarking framework comparing performance against state-of-the-art medical foundation models.
- Reusable training pipeline scalable across future medical imaging tasks and institutions.
- Foundation for real-time, clinically relevant inference pipelines under GDPR and EHDS compliant data governance.
