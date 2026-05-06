// ML.ENERGY Leaderboard data (joules per token)
export const modelData = [
  { name: "DeepSeek R1", params: "671B", type: "Reasoning", joulesPerToken: 2.37, color: "#8B1A1A" },
  { name: "Llama 3.1 405B", params: "405B", type: "Chat", joulesPerToken: 0.85, color: "#6B4C1E" },
  { name: "Llama 3.3 70B", params: "70B", type: "Chat", joulesPerToken: 0.18, color: "#4A6535" },
  { name: "Mistral 7B", params: "7B", type: "Chat", joulesPerToken: 0.052, color: "#2E5C9E" },
  { name: "GPT OSS 20B", params: "20B", type: "Chat", joulesPerToken: 0.028, color: "#6B8F4E" },
]

// Quiz questions — conceptual & accessible for all audiences
export const funFacts = [
  {
    question: "What does 'developer ergonomics' mean in the context of AI?",
    options: [
      "Making keyboards more comfortable for programmers",
      "Building small, task-specific AI models instead of defaulting to large general-purpose ones",
      "Organizing code so it is easy to read",
      "Using voice commands instead of typing",
    ],
    answer: 1,
    highlight: "Build small, task-specific models, not the biggest one available.",
    explanation: "Developer ergonomics means choosing the right-sized tool for the job. Instead of always reaching for the most powerful AI, developers build small models trained on a specific task. They use far less energy, cost less, and can be just as accurate for bounded problems.",
    source: "[Agrawal, personal communication 2026]"
  },
  {
    question: "What is the main difference between a small AI model and a large one like ChatGPT?",
    options: [
      "Small models can only answer yes or no",
      "Large models are always more accurate for every task",
      "Small models use far less energy and can match large models on specific, well-defined tasks",
      "Small models do not need internet to run",
    ],
    answer: 2,
    highlight: "DeepSeek R1 uses 85× more energy per response than a small open-source model.",
    explanation: "For specific tasks, such as auditing documents, answering FAQs, and detecting patterns, a small model trained on relevant data can match a frontier LLM at a fraction of the energy cost. A Stanford team once tied for first in a competition using a tiny model trained on a laptop, against teams running 8 GPUs on AWS.",
    source: "[ML.ENERGY Leaderboard]"
  },
  {
    question: "What is 'digital pollution'?",
    options: [
      "Viruses and malware spreading online",
      "Too many ads and pop-ups on websites",
      "The environmental cost of our digital habits; energy use, e-waste, and carbon emissions from data centers",
      "Slow internet speeds caused by too many users",
    ],
    answer: 2,
    highlight: "Digital pollution is real and physical, even though you can't see it.",
    explanation: "Digital pollution covers the full environmental lifecycle of technology: manufacturing hardware, cooling data centers, transmitting data across networks, and disposing of old devices. Most of it is invisible to us, but very real at the server level.",
    source: "[Greenly]"
  },
  {
    question: "A Google search uses roughly the same energy as running a 60-watt lightbulb for how long?",
    options: ["1 hour", "5 minutes", "17 seconds", "1 second"],
    answer: 2,
    highlight: "A Google search ≈ 17 seconds of a 60W bulb. AI queries cost substantially more.",
    explanation: "A single Google search consumes roughly the energy equivalent of a 60-watt bulb for 17 seconds. Generative AI responses require much more computation, especially with large reasoning models, so the energy cost per interaction is meaningfully higher.",
    source: "[MIT Technology Review]"
  },
  {
    question: "Compared to that Google search, how much more energy does a response from a large AI model typically use?",
    options: [
      "About the same; AI is just a smarter search",
      "2× more",
      "Around 10× more",
      "Less; AI doesn't load web pages",
    ],
    answer: 2,
    highlight: "A large AI query uses ~10× more energy than a Google search. Reasoning models cost even more.",
    explanation: "A Google search uses roughly 0.0003 kWh. A large AI model response uses around 0.003 kWh, about 10 times more. And that's just the average. Reasoning models that 'think' before answering generate thousands of hidden tokens first, pushing energy use far higher. Smaller models can close this gap significantly.",
    source: "[MIT Technology Review · ML.ENERGY]"
  },
  {
    question: "What is the most effective first step to reduce your email's carbon footprint?",
    options: [
      "Switch to a different email app",
      "Print emails so servers don't have to store them",
      "Delete old emails and unsubscribe from newsletters you never read",
      "Send shorter replies",
    ],
    answer: 2,
    highlight: "Delete old emails. Unsubscribe. It takes minutes and reduces server load.",
    explanation: "Every stored email sits on a server drawing power continuously. With 2.3 billion cloud storage users worldwide, digital clutter adds up fast. Unsubscribing from unused newsletters and bulk-deleting old threads is one of the easiest individual actions you can take.",
    source: "[Greenly]"
  },
  {
    question: "When an AI model is running and answering your question, what is that process called?",
    options: [
      "Training",
      "Inference",
      "Rendering",
      "Uploading",
    ],
    answer: 1,
    highlight: "Inference; every message you send triggers it. It accounts for 80–90% of AI's lifetime energy.",
    explanation: "Training is the one-time process of building a model on massive datasets. Inference is what happens every single time you send a prompt; the model processes your input and generates a response. Because inference happens billions of times a day globally, it drives the majority of AI's ongoing energy use.",
    source: "[Shao et al.]"
  },
  {
    question: "Which of these is NOT an effective way to reduce your digital footprint?",
    options: [
      "Using Wi-Fi instead of 4G or 5G for heavy tasks",
      "Disabling autoplay on Netflix or YouTube",
      "Keeping your phone or laptop longer instead of upgrading every year",
      "Streaming video in the highest resolution available",
    ],
    answer: 3,
    highlight: "Higher resolution = more bandwidth = more server energy. Lower quality when you don't need it.",
    explanation: "Wi-Fi is more energy-efficient per bit than mobile networks. Disabling autoplay stops servers from loading content you are not watching. Keeping devices longer avoids the large carbon cost of manufacturing new hardware. Streaming in 4K when you are watching on a small screen wastes both bandwidth and energy.",
    source: "[Greenly]"
  },
  {
    question: "Why might using a very powerful AI for a simple task actually be a problem?",
    options: [
      "Powerful AI models are slower than small ones",
      "It wastes energy, like using a freight truck to deliver one letter",
      "Powerful models give worse answers to simple questions",
      "Simple tasks confuse large AI models",
    ],
    answer: 1,
    highlight: "Match the model to the task. Overkill wastes energy with no added benefit.",
    explanation: "A full LLM inference pass to count the words in a paragraph, or say thank you, burns energy for something a two-line script handles instantly. Researchers at Amazon found this exact pattern inside real production systems. The fix is task decomposition: identify what the system actually needs to do, and use the smallest appropriate tool.",
    source: "[Boudaie, personal communication 2026]"
  },
  {
    question: "Melody Nguyen, the researcher behind this website, grew up in Arizona and California watching droughts and wildfires. What unexpected career move is she making right after graduation?",
    options: [
      "Relocating to Reykjavik to join a geothermal energy research lab, studying how Iceland powers its data centers on 100% renewable energy",
      "Joining Anthropic's responsible scaling team as a policy researcher, focusing on mandatory energy disclosure standards for frontier AI models",
      "Joining Healthfirst as a Business Analyst, teaching AI and Python at Stanford's iD Tech, and starting a Master's in CS at Georgia Tech, all at once",
      "Taking a gap year to write a creative memoir tracing her family's journey from Hanoi to Saigon, and what home means across generations",
    ],
    answer: 2,
    highlight: "From thesis to industry to grad school, and teaching the next generation of builders.",
    explanation: "Melody is joining Healthfirst's Provider Data Management team as a Business Analyst and Product Owner, where she'll apply the ideas from this thesis to real healthcare AI. She's also teaching Artificial Intelligence, Machine Learning, and Python at iD Tech at Stanford, and starting Georgia Tech's MSCS program in Fall 2026. The through-line: build responsibly, build small, build with purpose.",
    source: "[Nguyen, Thesis Conclusion 2026]"
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
      "Share what you learn; awareness is the first step to change",
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