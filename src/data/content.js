// ML.ENERGY Leaderboard data (joules per token)
export const modelData = [
  { name: "DeepSeek R1", params: "671B", type: "Reasoning", joulesPerToken: 2.37, color: "#8B1A1A" },
  { name: "Llama 3.1 405B", params: "405B", type: "Chat", joulesPerToken: 0.85, color: "#6B4C1E" },
  { name: "Llama 3.3 70B", params: "70B", type: "Chat", joulesPerToken: 0.18, color: "#4A6535" },
  { name: "Mistral 7B", params: "7B", type: "Chat", joulesPerToken: 0.052, color: "#2E5C9E" },
  { name: "GPT OSS 20B", params: "20B", type: "Chat", joulesPerToken: 0.028, color: "#6B8F4E" },
]

// Fun facts for the quiz
export const funFacts = [
  {
    question: "How much energy does a single Google search use, compared to a lightbulb?",
    options: [
      "Same as a 60W bulb for 1 minute",
      "Same as a 60W bulb for 17 seconds",
      "Same as a 60W bulb for 5 seconds",
      "No measurable energy",
    ],
    answer: 1,
    explanation: "A single Google search consumes roughly the equivalent energy of running a 60-watt lightbulb for 17 seconds. A generative AI response can consume significantly more depending on model size and response length.",
    source: "[MIT Technology Review]"
  },
  {
    question: "What percentage of an LLM's total lifecycle energy is used during inference (not training)?",
    options: ["20–30%", "40–50%", "60–70%", "80–90%"],
    answer: 3,
    explanation: "While training is energy-intensive, inference accounts for an estimated 80–90% of total lifecycle energy because it happens billions of times daily across all deployed models.",
    source: "[Shao et al.]"
  },
  {
    question: "How many people currently use cloud storage services?",
    options: ["500 million", "1.2 billion", "2.3 billion", "4 billion"],
    answer: 2,
    explanation: "Approximately 2.3 billion people use cloud storage services, creating continuous strain on data centers worldwide. Local storage alternatives like hard drives can help reduce this demand.",
    source: "[Greenly]"
  },
  {
    question: "By how much can TDP-based energy estimates overstate actual GPU power use?",
    options: ["Up to 2×", "Up to 4×", "Up to 10×", "They are usually accurate"],
    answer: 1,
    explanation: "Real-world benchmarks from the ML.ENERGY Leaderboard show actual GPU power consumption ranges from 25–75% of rated TDP. TDP-based estimates can overstate actual energy use by up to a factor of four.",
    source: "[ML.ENERGY]"
  },
  {
    question: "What share of Gen Z has more than 1,000 unread emails?",
    options: ["12%", "22%", "36%", "51%"],
    answer: 2,
    explanation: "36% of Gen Z has over 1,000 unread emails sitting in their inbox. Each stored email has a small but non-zero carbon cost — multiplied across billions of accounts, email clutter becomes a meaningful source of emissions.",
    source: "[Greenly]"
  },
  {
    question: "What is the Jevons paradox as it applies to AI hardware?",
    options: [
      "Newer GPUs always reduce total energy use",
      "More efficient hardware leads to more complex models, often increasing total energy per request",
      "Training energy always exceeds inference energy",
      "Smaller models are always more accurate",
    ],
    answer: 1,
    explanation: "Even though newer GPUs like the H100 are more efficient per operation than the A100, they enable more complex reasoning models — so total energy per user request often increases even as the underlying hardware improves.",
    source: "[ML.ENERGY]"
  },
]

// Best practice tips
export const bestPractices = [
  {
    category: "Prompt Design",
    icon: "✎",
    tips: [
      "Write concise, specific prompts instead of open-ended ones",
      "Batch related questions into a single query",
      "Avoid repeating context the model already has",
      "Use clear constraints to limit response length",
    ]
  },
  {
    category: "Model Selection",
    icon: "✦",
    tips: [
      "Choose smaller models for simple tasks (summarization, formatting)",
      "Reserve large reasoning models for genuinely complex problems",
      "Prefer standard chat models over 'Thinking' models when depth isn't needed",
      "Check the ML.ENERGY Leaderboard for energy benchmarks by model",
    ]
  },
  {
    category: "Digital Habits",
    icon: "✿",
    tips: [
      "Delete old emails and clear unused cloud storage regularly",
      "Use Wi-Fi instead of 4G/5G for data-intensive tasks",
      "Disable autoplay on streaming platforms",
      "Keep devices longer to reduce manufacturing e-waste",
    ]
  },
  {
    category: "Awareness",
    icon: "❤︎",
    tips: [
      "Recognize that every AI interaction has a physical energy cost",
      "Understand that verbose responses consume more energy than concise ones",
      "Support companies that disclose their AI energy and water use",
      "Share what you learn — awareness is the first step to change",
    ]
  },
]

// Energy constants
export const ENERGY = {
  emailStoredPerYear_kWh: 0.000004,
  aiQuerySmall_kWh: 0.0003,
  aiQueryLarge_kWh: 0.003,
  googleSearch_kWh: 0.0003,
  joulePerTokenSmall: 0.028,
  joulePerTokenLarge: 2.37,
}