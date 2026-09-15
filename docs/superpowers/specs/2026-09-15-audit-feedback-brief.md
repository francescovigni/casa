# francescovigni.com — Website Audit & Improvement Brief

## Purpose

This document is an implementation brief for improving `francescovigni.com`.

The goal is **not** to redesign the site from scratch. The current visual identity, architecture, and core positioning are already strong. The goal is to make the existing site:

- more commercially clear
- more coherent across pages
- more evidence-driven
- easier to scan
- stronger for SEO
- more consistent between English and Italian
- better aligned with Francesco's current professional positioning

The target positioning is:

> **Applied AI / ML Engineer + AI Consultant, with particular depth in medical imaging, computer vision, edge AI, robotics, and ML infrastructure.**

The overarching brand idea is already strong:

> **"I find out when the model is wrong."**

That idea should remain central.

---

# 1. Executive assessment

## Overall score

| Area | Score | Assessment |
|---|---:|---|
| Positioning | 9/10 | Distinctive and credible |
| Hero | 9.5/10 | Strong, memorable, differentiated |
| Technical credibility | 9.5/10 | Excellent evidence base |
| Portfolio / Work | 9/10 | Strong material; needs harder outcomes |
| Research | 9.5/10 | Major differentiator |
| Commercial clarity | 7.5/10 | Still too clinically narrow in places |
| UX / hierarchy | 8/10 | Good, but some pages are overloaded |
| Bilingual experience | 6.5/10 | English/Italian content is asymmetric |
| SEO content | 8/10 | Good raw material, under-exploited |
| Trust / professionalism | 9/10 | Strong |
| Cross-site consistency | 7/10 | Main site, CV, and secondary portfolio differ somewhat |
| Overall | 8.2/10 | Strong site with clear room for refinement |

## Core diagnosis

The website is no longer suffering from a lack of identity.

The new positioning is good:

> **"I find out when the model is wrong."**

The problem is now **hierarchy**.

The site is simultaneously:

- a freelance consultancy site
- an applied ML portfolio
- an academic/research profile
- a personal archive
- a technical notebook

All of these are valid, but the visitor should understand the primary proposition within seconds.

The desired hierarchy is:

1. **Applied AI / ML engineering**
2. **Medical AI / computer vision / edge AI / robotics as areas of expertise**
3. **Research depth as credibility**
4. **PhD and academic background as supporting evidence**
5. **Personal/archival content as secondary**

---

# 2. What must NOT be changed

Do not redesign the site unnecessarily.

## Keep

### Hero concept

Keep:

> **Hi, I'm Francesco 👋 · High-Tech Artisan**

and especially:

> **I find out when the model is wrong.**

This is distinctive and should become the conceptual throughline of the site.

### Main positioning narrative

Keep the idea:

> “PhD engineer and researcher. I work on medical-imaging foundation models, robots on factory floors, and the infrastructure that keeps both running in production.”

This is a good summary of breadth + depth.

### Core navigation

Keep the simple top-level navigation:

- Home
- Work
- Research
- Contact

Do not add unnecessary top-level items such as Services, Portfolio, About, Blog, Case Studies, etc.

### Research philosophy

Preserve the current style of the Research pages:

- technical question
- experiment
- surprising result
- failure mode
- limitations
- reproducibility

The willingness to publish negative findings is a major differentiator.

---

# 3. Positioning changes

## Main change

Do not position the homepage as though Francesco is primarily a clinical-AI consultant.

Current messaging over-emphasizes:

- hospitals
- IRCCS
- clinical AI
- procurement
- EHDS

Clinical AI is an important specialization, but the broader professional identity is:

> **Applied AI / ML engineer who can take difficult models from research to real-world systems.**

Medical AI should remain a major vertical, not the entire brand.

## Replace the final CTA

Current direction:

> “Have a clinical-AI problem worth solving?”

Preferred:

> **Have a difficult AI problem worth solving?**

Supporting line:

> Medical imaging, computer vision, edge AI and intelligent systems.

Alternative:

> **Have an AI system that needs to work outside the lab?**

---

# 4. Homepage recommendations

## Hero

Keep the current hero.

Optional micro-adjustment:

Current:

> PhD engineer and researcher.

Preferred:

> **PhD engineer and applied AI researcher.**

This keeps the research credibility while reinforcing the applied positioning.

Keep “High-Tech Artisan” as personality/branding, but ensure a professional title appears close enough to the hero:

> **Applied ML Engineer · AI Consultant**

or:

> **Applied AI Engineer · Technical Consultant**

Do not replace “High-Tech Artisan”; use it as the memorable personal label.

---

## Three areas section

Current conceptual structure:

- AI / ML Research
- Robotics & Edge
- DevOps & Infrastructure

Recommended:

### Applied AI / ML

Foundation models, computer vision, self-supervised learning, model evaluation.

### Robotics & Edge AI

ROS2, perception, real-time inference, embedded deployment.

### ML Infrastructure

Training infrastructure, MLOps, Kubernetes, reproducibility, deployment.

### Rationale

“DevOps” is supporting expertise, not the main product.

The visitor should understand:

> Francesco can get AI models working.

not:

> Francesco is a DevOps engineer.

---

## Homepage proof section

Make the page more evidence-driven.

Each selected project should show:

- short problem statement
- technology
- one outcome metric / proof point
- CTA to full case study

Example format:

### Foundation Model for Gastroenterology Imaging

Self-supervised pretraining + cloud data pipeline + ViT

**5M+ gastrointestinal video frames**

[Read case study →]

---

### Edge AI Occupancy Monitoring

Real-time people tracking and distance estimation

**NVIDIA Jetson · MQTT · on-device inference**

[Read case study →]

---

### Fetal Cardiac Orientation

Landmark-based orientation estimation

**0.28° mean orientation error**

[Read research →]

---

### Industrial Bin Picking

3D perception and grasping

**+9% grasp reliability**

[Read case study →]

Use actual verified metrics only. Never invent or estimate values.

---

# 5. Work page

## Strength

The existing editorial framing is good:

> **Evidence, not slideware.**

And the structure:

- Context
- Constraints
- What I did
- Outcome

should remain.

## Main improvement

Every major case study should have at least one concrete proof point.

Examples of useful proof:

- accuracy
- error
- latency
- FPS
- number of frames
- number of devices
- deployment duration
- reliability improvement
- dataset size
- reduction in manual work
- throughput
- validation result

If a commercial metric is confidential, use a truthful qualitative or technical proxy.

Examples:

- “real-time on Jetson”
- “5M+ frames”
- “cross-dataset evaluation”
- “production deployment”
- “multi-machine ROS2 system”

Do not invent business outcomes.

---

## Reduce lower-priority content

The Work page currently mixes:

- projects
- professional history
- education
- publications
- talks
- awards
- milestones
- personal story

Keep the page focused on **professional work and proof**.

Move or compact:

- long talk lists
- personal milestones
- lower-value timeline items

Possible treatment:

> **Career & milestones**  
> [collapsed / secondary section]

or move them to the About/story area if needed.

---

# 6. Research section

## This is a strategic asset

The Research section is one of the strongest parts of the site.

The key differentiator is not just “I trained models.”

It is:

> **I investigate whether the model is actually learning what we think it is learning.**

That should become a recurring theme.

Examples from the current research:

- acquisition/site leakage in endoscopy
- failed standardization mitigation
- geometric shortcut outperforming a trained model
- external-data degradation
- invariant testing without labels

This is much more memorable than a generic deep-learning portfolio.

## Keep the current article style

Each research article should ideally preserve this structure:

1. Question
2. Why it matters
3. Dataset / setup
4. Method
5. Result
6. What failed
7. What the result actually means
8. Limitations
9. Reproducibility / code
10. References

---

# 7. Promote the fetal-heart project

This is one of the strongest portfolio pieces because it demonstrates engineering judgment.

Core story:

> A simple geometric method can outperform a trained landmark model by a large margin.

Recommended presentation:

### Can a simple geometric model beat a neural network?

**0.28° vs 7.04° orientation error**

Then explain:

- why the shortcut exists
- what the neural model was doing
- where the geometric approach fails
- what this does NOT prove
- external validation

Use this as a homepage featured research project.

---

# 8. Endoscopy research should be a flagship case study

This is also a high-value piece because it demonstrates:

- self-supervised representation learning
- confound analysis
- dataset bias
- cross-domain generalization
- honest negative results

Make the outcome visually scannable.

Example:

> **0.961 site-identification accuracy from acquisition geometry**
>
> Standardization did not eliminate the shortcut.

This kind of statement is compelling to both technical and research audiences.

---

# 9. Contact page

The current Contact page contains some of the clearest commercial language on the whole site.

Use that strength more prominently.

## Recommended engagement model

### Technical audit — 1–2 weeks

For:

- feasibility questions
- existing ML pipelines
- model failure investigation
- architecture review
- evaluation design

### Proof of concept — 3–8 weeks

For:

- model prototyping
- computer vision
- medical imaging
- edge AI
- research-to-product validation

### Ongoing technical support

For:

- fractional senior ML expertise
- architecture guidance
- research/engineering support
- production transition

These labels are more concrete than generic “Pilot / Support / Transition.”

Do not promise fixed durations if actual commercial engagements do not use them. Adjust the wording to match real offers.

---

# 10. Final CTA

The site should end with one obvious action.

Recommended:

## Have a difficult AI problem?

Tell me what you are trying to build, what is not working, and what constraints you are dealing with.

**Start a conversation →**

Supporting metadata:

> Freelance · Consulting · R&D · Remote

Keep the interactive “What are you looking for?” selector if desired, but it should support rather than replace the main CTA.

---

# 11. Trust & compliance

The site currently gives strong visibility to:

- GDPR / DPA
- EHDS
- NDA
- registered engineer
- EU / self-hosted stack

These are valuable, but they should support the engineering proposition rather than dominate it.

Recommended compact homepage line:

> **EU-based · GDPR-aware · NDA-friendly · Self-hosted capable · Registered Engineer**

Move deeper discussion of:

- clinical governance
- EHDS implications
- procurement
- data handling

into the medical AI case studies / dedicated sections.

## Important wording check

Avoid making claims that sound like formal certification or completed clinical readiness unless they are formally supported.

Prefer:

> “designed with future EHDS requirements in mind”

over:

> “EHDS-ready”

unless there is a documented basis for the stronger wording.

Prefer:

> “designed with a path toward clinical validation”

over:

> “ready for clinical validation”

unless formally demonstrated.

---

# 12. Language / bilingual consistency

## Current issue

English and Italian are not fully symmetrical.

Problems include:

- Italian navigation missing Research
- research case studies primarily available in English
- some trust/compliance content differs between languages
- different information density between language versions

## Recommended approach

Do NOT force full translation of everything unless there is a clear need.

Preferred strategy:

### Italian

- localized homepage
- work
- contact
- essential legal content

### English

- complete professional site
- complete research section
- technical articles
- full case studies

This is acceptable and strategically coherent for an internationally oriented engineer.

However, whichever approach is chosen, make the language switch explicit and predictable.

---

# 13. Legacy content / information architecture

The domain still exposes older content such as:

- `/blog/phd/`
- `/publications/...`
- older PDF/CV assets

This is not necessarily bad for SEO or history.

But avoid letting old content communicate a materially different professional identity.

## Recommended approach

Keep valuable historical pages available.

Do not delete URLs solely because they are old.

Instead:

- preserve useful URLs
- improve metadata
- add navigation back to the current site
- avoid prominent links to obsolete content
- consider a clearly labeled archive for legacy blog material

---

# 14. CV consistency

The website now communicates a more current positioning than older CV PDFs.

The CV should be aligned with:

> Applied ML Engineer / Applied AI Engineer

and the story:

- medical AI
- computer vision
- edge AI
- robotics
- ML infrastructure
- research-to-production

The website and CV should not make the visitor infer two different professional identities.

The first third of the CV should match the website's current proposition.

---

# 15. Secondary portfolio / apps site

There is a separate apps/portfolio site.

It currently mixes:

- ML demos
- robotics projects
- web utilities
- QR generation
- general software tools

This should not compete with the main site.

Recommended role:

> **Experiments & Live Demos**

Possible identity:

> **Francesco Vigni — Experiments & Live Systems**

The purpose is to show things users can interact with.

The main site should remain:

> identity → expertise → proof → contact

The demos site should remain:

> experiments → repositories → interactive systems

---

# 16. GitHub alignment

The public GitHub profile is useful evidence of technical breadth but does not fully reflect the current positioning.

Recommended pinned repositories should reinforce:

1. medical imaging
2. fetal orientation / research
3. endoscopy confound analysis
4. edge AI / computer vision
5. one strong infrastructure / systems project

Generic utilities can remain public but should not dominate the pinned area.

---

# 17. SEO recommendations

## Do not turn the site into a generic SEO blog.

The strongest SEO asset is the existing original technical research.

Target semantic associations around:

- Applied Machine Learning Engineer
- AI Consultant
- Computer Vision Engineer
- Medical AI
- Medical Imaging
- Edge AI
- Robotics Perception
- Self-Supervised Learning
- ML Infrastructure
- AI Consultant Italy / Europe

Use these naturally in:

- page titles
- H1 / H2 headings
- case-study descriptions
- metadata
- research articles
- internal links

Do not keyword-stuff.

---

## Suggested page-title direction

Examples:

### Homepage

> Francesco Vigni, PhD — Applied AI / ML Engineer & Consultant

### Work

> Applied AI & Computer Vision Projects — Francesco Vigni

### Research

> AI / ML Research — Medical Imaging, Evaluation & Failure Analysis

### Endoscopy research

> Endoscopy Domain Shift & Dataset Bias — AI Research

### Fetal heart research

> Fetal Cardiac Orientation with Computer Vision — AI Research

Exact titles can be refined to match the current implementation and SEO strategy.

---

# 18. SEO content strategy

Create more research articles in the same style as the existing ones.

Good format:

> **Technical question → controlled experiment → unexpected result → failure analysis → practical implication**

This is much more valuable than generic content such as:

- “What is deep learning?”
- “What is computer vision?”
- “Top 10 AI trends”

The research can serve both:

- technical credibility
- long-tail organic search

Every research article should link back to:

- Work
- Contact
- relevant GitHub code
- relevant project/case study

---

# 19. Accessibility and performance

The site already has good fundamentals:

- semantic headings
- skip-to-content support
- image alt text
- deferred YouTube loading / similar performance-conscious choices

Do not sacrifice these during visual refinement.

Recommended checks for implementation:

- keyboard navigation
- visible focus states
- accessible buttons
- color contrast
- reduced-motion support
- heading hierarchy
- image dimensions / responsive sizing
- Core Web Vitals in real browser testing
- mobile viewport testing

Do not claim performance improvements unless measured.

---

# 20. Recommended homepage information hierarchy

Use this order:

## 1. Hero

> Hi, I'm Francesco 👋 · High-Tech Artisan  
> **I find out when the model is wrong.**

Professional title + concise value proposition.

CTA:

> View selected work  
> Discuss a project

---

## 2. Areas

### Applied AI / ML
### Robotics & Edge AI
### ML Infrastructure

One sentence each.

---

## 3. Selected work

Show 3–4 strongest projects.

Each card includes:

- problem
- technology
- one proof point
- case-study link

---

## 4. Why this background matters

Compact credibility section:

- PhD
- Marie Skłodowska-Curie / EU research
- Disney Research
- Roboception
- industrial / healthcare work
- selected publications / awards

Do not make it a giant résumé.

---

## 5. Research

Feature:

- endoscopy confound analysis
- fetal cardiac orientation

Headline:

> **I don't just train models. I test what they're actually learning.**

---

## 6. Story

> **From a robotics thesis at Disney to AI in the clinic.**

Keep this concise.

---

## 7. Engagement

Audit → POC → ongoing support.

---

## 8. Final CTA

> **Have a difficult AI problem?**

---

# 21. Copy style

Continue using:

- concise technical language
- concrete claims
- understated confidence
- evidence over hype
- first-person voice where appropriate
- slightly dry / intelligent humor

Avoid:

- buzzword-heavy “AI transformation” language
- exaggerated claims
- generic consultancy clichés
- excessive use of “innovative”
- broad claims like “revolutionize”
- corporate filler

The existing personality is a strength.

---

# 22. Things to remove or reduce

Reduce:

- long milestone sections
- exhaustive talk lists on Work
- repeated explanations of credentials
- compliance text on the homepage
- generic service descriptions
- overly long paragraphs

Do not remove:

- strong research findings
- negative results
- measurable engineering outcomes
- personal story
- core credentials

---

# 23. Implementation priority

## P0 — highest priority

### 1. Homepage positioning
Broaden from “clinical AI” to “difficult AI / applied ML” while keeping medical AI as a core specialization.

### 2. Homepage final CTA
Change to a broader AI-focused CTA.

### 3. Three areas terminology
Change:

> AI / ML Research  
> Robotics & Edge  
> DevOps & Infrastructure

To:

> Applied AI / ML  
> Robotics & Edge AI  
> ML Infrastructure

### 4. Work cards
Add verified proof points to major projects.

### 5. Research promotion
Feature the fetal-heart and endoscopy studies more prominently.

---

## P1 — high priority

### 6. Contact page
Present concrete engagement formats:

- technical audit
- proof of concept
- ongoing consulting

### 7. Bilingual consistency
Decide intentionally what is translated and what stays English.

### 8. CV alignment
Update the top third of the CV to match current website positioning.

### 9. Legacy architecture
Keep useful historical pages but reduce their prominence and improve navigation back to the current site.

---

## P2 — medium priority

### 10. GitHub alignment
Update pinned repositories to match the current story.

### 11. Secondary portfolio
Reposition as an experiments / live demos site.

### 12. Metadata / SEO
Improve page titles, descriptions, internal links and research article discoverability.

### 13. Accessibility / performance audit
Run actual Lighthouse/PageSpeed/real-device checks.

---

# 24. Acceptance criteria

The implementation should be considered successful when:

- A first-time visitor can describe Francesco's professional role after reading only the hero.
- The site does not imply that Francesco only works in healthcare.
- Medical AI remains a clearly visible specialization.
- The homepage contains 3–4 strong proof points with measurable evidence.
- Work pages prioritize outcomes over generic technology lists.
- Research remains a clear differentiator.
- Contact makes it immediately obvious how an organization can engage Francesco.
- English and Italian navigation are intentionally consistent.
- CV positioning matches the website.
- The secondary portfolio does not compete with the main brand.
- Research pages are internally linked to Work and Contact.
- No unsupported claims such as “EHDS-ready” or “clinical-ready” are introduced.
- Existing accessibility and performance fundamentals are preserved.

---

# 25. Final strategic principle

The site should communicate this idea consistently:

> **Francesco is the engineer you bring in when an AI system is technically difficult, the obvious answer is not enough, and you need someone who can figure out what is actually happening — then make it work in the real world.**

The brand should be built around:

**technical depth + skepticism + experimentation + deployment**

rather than around a single technology or industry.

The strongest current phrase remains:

> **I find out when the model is wrong.**
