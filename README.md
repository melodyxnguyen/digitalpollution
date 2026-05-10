# Digital Pollution: Understanding the Energy Costs of Large Language Models

<br>

> An interactive educational platform that makes AI's hidden energy footprint visible and actionable.

**Live site:** [digitalpollution.io](https://digitalpollution.io)  
**Thesis:** Pforzheimer Honors College, Pace University · May 2026  
**Author:** Melody Quynh Nguyen




<br><br/>
<img width="992" height="649" alt="landing" src="https://github.com/user-attachments/assets/c760d9c5-31d0-49af-82e6-bbcd6b36c143" />
<br><br/>


---

## Overview

Digital Pollution is an honors thesis research project and interactive web platform that quantifies and visualizes the environmental cost of AI systems. The platform translates empirical energy benchmarking data from the [ML.ENERGY Leaderboard](https://ml.energy/leaderboard) into accessible, interactive tools for developers, researchers, and everyday users.

The core argument: large language models are generically powerful but generically expensive. The most practical path to reducing AI's energy footprint is specificity — building and using small, task-specific models rather than defaulting to the largest available option.

---

## Features

### Model Energy Comparison Tool
Compare the energy cost per token across models using real hardware measurement data from the ML.ENERGY Leaderboard. Select between model sizes and watch the joules-per-token update in real time.

| Model | Energy per Token (J) |
|---|---|
| GPT OSS 20B | 0.0284 |
| GPT OSS 120B | 0.0397 |
| Qwen 3 8B | 0.1732 |
| DeepSeek V3.1 | 1.3351 |
| DeepSeek R1 | 2.3762 |

<img width="793" height="645" alt="interactive" src="https://github.com/user-attachments/assets/2d92635d-9bcc-4938-890a-55ae79dce321" />


---

### Personal Consumption Calculator
Input your daily AI usage — number of prompts, model used, session length — and receive an estimated energy footprint in watt-hours, equivalent lightbulb-minutes, and CO2 grams. Grounds abstract statistics in personal behavior.

---

### Live Energy Meter Widget
Animates the accumulating energy cost of a model call token by token as the user types. Built to demonstrate the forward-pass nature of LLM inference and address the TDP Myth — displays real measured values rather than theoretical GPU maximums.

<img width="794" height="611" alt="token2" src="https://github.com/user-attachments/assets/1cabdec7-5917-457c-a657-1255c12424a6" />

---

### Write to Congress Tool
Generates a pre-drafted letter to the user's congressional representative calling for AI energy transparency legislation, including the Data Center Transparency Act and the AI Environmental Impacts Act of 2024. Personalized by ZIP code.

<img width="552" height="586" alt="Screenshot 2026-05-10 at 2 46 43 PM" src="https://github.com/user-attachments/assets/2a5a947d-c2df-4d6f-9188-2eb1b19256c8" />
<img width="611" height="554" alt="Screenshot 2026-05-10 at 2 47 03 PM" src="https://github.com/user-attachments/assets/da2719da-9b48-437b-a261-6e1d1f93026a" />


---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Deployment | Cloudflare Workers |
| Domain | digitalpollution.io (Cloudflare DNS) |
| Energy Data | ML.ENERGY Leaderboard (direct hardware measurement) |
| Tokenizer | OpenAI Tokenizer API |
| Design Prototype | Figma |

---

## Energy Data Methodology

All energy figures are sourced from the [ML.ENERGY Leaderboard](https://ml.energy/leaderboard), which measures actual GPU power draw during LLM inference using hardware power sensors rather than Thermal Design Power (TDP) estimates.

TDP-based estimates — the most common informal method — can overstate actual energy consumption by up to a factor of four, since real inference typically runs at 25 to 75 percent of rated TDP depending on model architecture, batch size, and workload type.

This platform uses joules per output token as its primary unit of comparison, enabling standardized, reproducible measurement across model sizes and hardware configurations.

---

## Project Structure

```
digitalpollution/
├── index.html          # Landing page and main entry point
├── style.css           # Global styles
├── script.js           # Interactive feature logic
├── assets/
│   ├── images/         # Visual assets
│   └── data/           # Energy benchmark data (JSON)
├── tools/
│   ├── slider.js       # Model comparison slider
│   ├── calculator.js   # Personal consumption calculator
│   ├── meter.js        # Live energy meter widget
│   └── congress.js     # Letter generation tool
└── wrangler.toml       # Cloudflare Workers configuration
```

---

## Research Context

This platform is the prototype deliverable of an honors thesis investigating:

- Whether public understanding of LLM energy costs is sufficient
- Whether a brief educational intervention can shift behavioral intentions toward more sustainable AI use
- Whether developer ergonomics, specifically the adoption of small, task-specific models, represents the most practical path to reducing AI's energy footprint

**Interview subjects:** 8 professionals across energy economics (Stanford), developer tooling (Marimo), scientific computing (SLAC/NREL), healthcare AI (Healthfirst), biotech regulatory compliance, and machine learning education (Pace University).

**Key finding:** A large reasoning model such as DeepSeek R1 consumes approximately 2.37 joules per token, whereas a smaller model such as GPT OSS 20B uses only 0.028 joules per token — a difference of nearly two orders of magnitude driven entirely by model selection.

---

## Related Project

**Sentra** — a task-specific AI agent for biotech regulatory auditing, built as a working demonstration of the small models proposal.

GitHub: [melodyxnguyen/sentra](https://github.com/melodyxnguyen/sentra)  
Live API: [sentra-ebp0.onrender.com/docs](https://sentra-ebp0.onrender.com/docs)

---

## References

- ML.ENERGY Contributors, "ML.ENERGY Leaderboard: GPU power benchmarks for LLM inference," 2024. [ml.energy/leaderboard](https://ml.energy/leaderboard)
- B. Shao et al., "From words to watts: Benchmarking the energy costs of large language model inference," arXiv:2310.03003, 2023.
- S. Luccioni, "We're doing AI all wrong. Here's how to get it right," TED Talk, 2024.
- T. Gebru et al., "On the dangers of stochastic parrots," FAccT, 2021.

---

## Acknowledgements

Research supported by a grant from the Pforzheimer Honors College at Pace University.  
Energy benchmarking data drawn from the ML.ENERGY Leaderboard project.  
Developed with mentorship from researchers at SLAC National Accelerator Laboratory and Stanford University.

---

*Honors Thesis · Pforzheimer Honors College · Pace University · May 2026*
