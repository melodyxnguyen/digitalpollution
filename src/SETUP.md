# Digital Pollution — Setup Instructions

## 1. Install one dependency

In your Vite project root, run:

```bash
npm install react-router-dom
```

## 2. Replace your src/ folder

Copy everything from the `src/` folder provided into your project's `src/` directory,
replacing all existing files.

## 3. Start the dev server

```bash
npm run dev
```

## File structure

```
src/
├── App.jsx              ← Router setup
├── App.css              ← Resets Vite defaults
├── index.css            ← All global styles, design tokens, typography
├── main.jsx             ← Entry point (unchanged)
│
├── components/
│   ├── Navbar.jsx / .css
│   └── Footer.jsx / .css
│
├── data/
│   └── content.js       ← ML.ENERGY model data, quiz questions, best practices
│
└── pages/
    ├── Landing.jsx / .css
    ├── DigitalTech.jsx / .css
    ├── LLMs.jsx / .css
    ├── Interactive.jsx / .css
    ├── BestPractices.jsx / .css
    └── FunFacts.jsx / .css
```

## Pages

| Route | Page |
|---|---|
| `/` | Landing — hero, stats, site map |
| `/digital-technologies` | E-waste, data infrastructure, internet pollution |
| `/large-language-models` | Physical infra, training vs. inference, GPU bottleneck |
| `/interactive` | Model slider, email calculator, live energy meter |
| `/best-practices` | Tips, usage scenarios, Gebru quote |
| `/fun-facts` | 6-question quiz, research highlights, author timeline |

## To customize

- **Model data**: Edit `src/data/content.js` — add/remove models from `modelData[]`
- **Quiz**: Add questions to `funFacts[]` in `content.js`
- **Colors**: All design tokens are CSS variables in `index.css` under `:root`
- **Fonts**: Loaded from Google Fonts in `index.css` — swap `Playfair Display` / `Source Serif 4` as needed
