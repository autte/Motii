# Sensitive Personal Information Report

## Overview
This repository contains explicit personal and medical information about a specific child and associated medical providers. The following files include highly sensitive content that should be handled carefully, redacted, or removed before sharing.

---

## High-Risk Sensitive Information

### 1. `CLAUDE.md`
- Child name: `牛晨宇 (Chengyu Niu)`
- Date of birth: `2017年10月5日`
- Age: `8岁`
- Diagnosis: `右侧痉挛型脑瘫 (Right Spastic Hemiparesis)`
- Medical history: perinatal left frontal stroke, MRI findings, right-side hemiparesis, visual and hearing conditions.
- Specific medical details: GMQ, FMQ, GMFM-66 scores; ankle dorsiflexion; spasticity grades; PRC; strabismus metrics.
- Medical providers and institutions: `LLMRC`, `Lethbridge-Layton-Mackay`, `Shriners Hospitals for Children`, `蒙特利尔大学视觉诊所`, `McGill`, `MCH`, `Matthieu Paquette`, `Monique Khoury`, `Dr. Yeung`, `Rita Yap-Ehrensperger`, `Dre. Lara Tchakmakian`, `Alexia Mitchell`, `Katerina Jirasek`, `Anna Nissen`.
- Device/medication: `LEFT-Phonak SKY B90-P`, `Patanol 0.1%`.

### 2. `index.html`
- Title contains the child name: `CP Growth OS · 晨宇`.
- Alerts and training text mention a specific hearing aid provider `Matthieu Paquette`.
- Embedded baseline timeline and medical history include:
  - birth and MRI history
  - diagnostic visits with dates and institutions
  - vision follow-ups, hearing follow-ups, strabismus and PRC metrics
  - medical evaluation scores and physical exam results
  - medication and training plan details
- Specific personal identifiers: name, age, diagnosis, medical conditions.

### 3. `indexbk.html`
- Contains a `医学基线档案` section with:
  - patient name `牛晨宇 (Chengyu Niu)`
  - birth date `2017年10月5日`
  - diagnosis and perinatal stroke history
  - evaluation data from LLMRC and Shriners
  - continuous training guidance and medical baseline details

### 4. `SKILL.md`
- Core user persona includes the explicit child name `牛晨宇 (Chengyu Niu)`.
- Includes diagnosis details, medical background, and user-specific baseline metrics.
- Mentions that the project is maintained by `晨宇的妈妈` and is intended for a specific family rehabilitation scenario.

### 5. `motii-vercel/motii/index.html`
- Duplicate of `index.html` content with the same sensitive details.
- Contains the same child name in the title and the same medical timelines, training plans, and provider references.

---

## Additional Sensitive Content

### Names and roles found in multiple files
- `牛晨宇` / `Chengyu Niu`
- `Matthieu Paquette`
- `Monique Khoury`
- `Dr. Yeung`
- `Dre. Lara Tchakmakian`
- `Rita Yap-Ehrensperger`
- `Alexia Mitchell`
- `Katerina Jirasek`
- `Anna Nissen`

### Medical and health-related information
- Diagnoses: cerebral palsy, exotropia, conductive hearing loss, allergic conjunctivitis.
- Medical devices: Phonak hearing aid.
- Medications: Patanol eye drops.
- Exam results: PRC distances, strabismus prism angles, PTA thresholds, speech recognition rates, GMQ/FMQ scores.

---

## Recommended Actions
1. Redact or remove the child name and birth date from files before sharing.
2. Remove full medical history and provider names if the repository is exposed publicly.
3. Keep any remaining health-related metrics only if necessary for functional testing, and anonymize them.
4. Consider deleting duplicate sensitive content in `motii-vercel/motii/index.html` if it is a deployment copy.

---

## Files with explicit sensitive content
- `CLAUDE.md`
- `index.html`
- `indexbk.html`
- `SKILL.md`
- `motii-vercel/motii/index.html`

