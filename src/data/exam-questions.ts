import { type Subject } from "./subjects";

// ── Multiple Choice Question ────────────────────────────────────────────
export interface MCQuestion {
  id: string;
  type: "mcq";
  topic: string;
  subtopic: string;
  subject: Subject;
  question: string;
  options: [string, string, string, string]; // exactly 4 options
  correctIndex: number; // 0-3
  explanation: string;
  difficulty: 1 | 2 | 3;
  examTip?: string;
}

// ── Multi-mark Structured Question ──────────────────────────────────────
export interface StructuredQuestion {
  id: string;
  type: "structured";
  topic: string;
  subtopic: string;
  subject: Subject;
  question: string;
  totalMarks: number;
  markScheme: string[]; // each string = 1 mark point
  commandWord: string; // e.g. "Explain", "Describe", "Compare"
  difficulty: 1 | 2 | 3;
  examTip?: string;
}

export type ExamQuestion = MCQuestion | StructuredQuestion;

// ── Biology MCQs ────────────────────────────────────────────────────────
const biologyMCQs: MCQuestion[] = [
  {
    id: "bio-mcq-001",
    type: "mcq",
    topic: "cells",
    subtopic: "Cell Structure",
    subject: "biology",
    question: "Which organelle is the site of aerobic respiration?",
    options: ["Ribosome", "Mitochondria", "Nucleus", "Cell membrane"],
    correctIndex: 1,
    explanation: "Mitochondria are where aerobic respiration occurs, releasing energy (ATP) for the cell.",
    difficulty: 1,
  },
  {
    id: "bio-mcq-002",
    type: "mcq",
    topic: "cells",
    subtopic: "Cell Division",
    subject: "biology",
    question: "How many chromosomes are in a normal human body cell?",
    options: ["23", "44", "46", "92"],
    correctIndex: 2,
    explanation: "Human body cells contain 46 chromosomes (23 pairs). Gametes have 23.",
    difficulty: 1,
  },
  {
    id: "bio-mcq-003",
    type: "mcq",
    topic: "cells",
    subtopic: "Transport in Cells",
    subject: "biology",
    question: "Which process moves water across a partially permeable membrane from a dilute to a more concentrated solution?",
    options: ["Diffusion", "Active transport", "Osmosis", "Facilitated diffusion"],
    correctIndex: 2,
    explanation: "Osmosis is the net movement of water molecules across a partially permeable membrane from an area of high water concentration to an area of low water concentration.",
    difficulty: 1,
  },
  {
    id: "bio-mcq-004",
    type: "mcq",
    topic: "organisation",
    subtopic: "Digestive System",
    subject: "biology",
    question: "Where is bile produced?",
    options: ["Gallbladder", "Stomach", "Liver", "Pancreas"],
    correctIndex: 2,
    explanation: "Bile is produced in the liver and stored in the gallbladder. It emulsifies fats in the small intestine.",
    difficulty: 2,
  },
  {
    id: "bio-mcq-005",
    type: "mcq",
    topic: "organisation",
    subtopic: "Blood & Heart",
    subject: "biology",
    question: "Which type of blood vessel has valves to prevent backflow?",
    options: ["Arteries", "Veins", "Capillaries", "Aorta"],
    correctIndex: 1,
    explanation: "Veins have valves because blood flows at low pressure and needs to be prevented from flowing backwards.",
    difficulty: 1,
  },
  {
    id: "bio-mcq-006",
    type: "mcq",
    topic: "bioenergetics",
    subtopic: "Photosynthesis",
    subject: "biology",
    question: "What is the word equation for photosynthesis?",
    options: [
      "Glucose + Oxygen → Carbon dioxide + Water",
      "Carbon dioxide + Water → Glucose + Oxygen",
      "Glucose + Water → Carbon dioxide + Oxygen",
      "Carbon dioxide + Oxygen → Glucose + Water",
    ],
    correctIndex: 1,
    explanation: "Photosynthesis: carbon dioxide + water → glucose + oxygen (using light energy).",
    difficulty: 1,
  },
  {
    id: "bio-mcq-007",
    type: "mcq",
    topic: "bioenergetics",
    subtopic: "Respiration",
    subject: "biology",
    question: "Which type of respiration produces lactic acid in humans?",
    options: ["Aerobic respiration", "Anaerobic respiration", "Fermentation", "Decomposition"],
    correctIndex: 1,
    explanation: "Anaerobic respiration in animal cells produces lactic acid: glucose → lactic acid.",
    difficulty: 1,
  },
  {
    id: "bio-mcq-008",
    type: "mcq",
    topic: "infection",
    subtopic: "Pathogens & Disease",
    subject: "biology",
    question: "Which type of pathogen causes malaria?",
    options: ["Virus", "Bacterium", "Protist", "Fungus"],
    correctIndex: 2,
    explanation: "Malaria is caused by a protist (Plasmodium), spread by mosquito vectors.",
    difficulty: 2,
  },
  {
    id: "bio-mcq-009",
    type: "mcq",
    topic: "homeostasis",
    subtopic: "Nervous System",
    subject: "biology",
    question: "What is the correct order of a reflex arc?",
    options: [
      "Receptor → Motor neurone → Relay neurone → Sensory neurone → Effector",
      "Effector → Sensory neurone → Relay neurone → Motor neurone → Receptor",
      "Receptor → Sensory neurone → Relay neurone → Motor neurone → Effector",
      "Receptor → Relay neurone → Sensory neurone → Motor neurone → Effector",
    ],
    correctIndex: 2,
    explanation: "Reflex arc: receptor → sensory neurone → relay neurone (in spinal cord) → motor neurone → effector.",
    difficulty: 2,
  },
  {
    id: "bio-mcq-010",
    type: "mcq",
    topic: "genetics",
    subtopic: "DNA & Protein Synthesis",
    subject: "biology",
    question: "What are the complementary base pairs in DNA?",
    options: ["A-C and T-G", "A-T and C-G", "A-G and C-T", "A-U and C-G"],
    correctIndex: 1,
    explanation: "In DNA: adenine pairs with thymine (A-T), cytosine pairs with guanine (C-G).",
    difficulty: 1,
  },
  {
    id: "bio-mcq-011",
    type: "mcq",
    topic: "genetics",
    subtopic: "Inheritance",
    subject: "biology",
    question: "If both parents are carriers (Aa) of a recessive condition, what is the chance their child will be affected?",
    options: ["0%", "25%", "50%", "75%"],
    correctIndex: 1,
    explanation: "Aa × Aa gives AA, Aa, Aa, aa — so 1 in 4 (25%) chance of the recessive condition (aa).",
    difficulty: 2,
  },
  {
    id: "bio-mcq-012",
    type: "mcq",
    topic: "ecology",
    subtopic: "Ecosystems",
    subject: "biology",
    question: "What instrument is used to sample plants in an ecosystem?",
    options: ["Pitfall trap", "Pooter", "Quadrat", "Net"],
    correctIndex: 2,
    explanation: "Quadrats are used to sample plant populations. They are placed randomly and organisms inside are counted.",
    difficulty: 1,
  },
];

// ── Biology Structured Questions ────────────────────────────────────────
const biologyStructured: StructuredQuestion[] = [
  {
    id: "bio-str-001",
    type: "structured",
    topic: "cells",
    subtopic: "Transport in Cells",
    subject: "biology",
    question: "Explain why placing red blood cells in pure water causes them to burst. [3 marks]",
    totalMarks: 3,
    markScheme: [
      "Pure water has a higher water concentration than inside the red blood cell",
      "Water moves into the cell by osmosis (through the partially permeable membrane)",
      "The cell swells and bursts (lyses) because animal cells have no cell wall to resist the pressure",
    ],
    commandWord: "Explain",
    difficulty: 2,
    examTip: "For 'explain' questions, always give a reason for each statement — link cause to effect.",
  },
  {
    id: "bio-str-002",
    type: "structured",
    topic: "organisation",
    subtopic: "Blood & Heart",
    subject: "biology",
    question: "Describe the journey of blood through the heart, starting from the vena cava. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "Deoxygenated blood enters the right atrium via the vena cava",
      "Blood passes through the tricuspid valve into the right ventricle",
      "Right ventricle pumps blood to the lungs via the pulmonary artery",
      "Oxygenated blood returns via the pulmonary vein to the left atrium, through the bicuspid valve to the left ventricle, and out through the aorta",
    ],
    commandWord: "Describe",
    difficulty: 2,
  },
  {
    id: "bio-str-003",
    type: "structured",
    topic: "bioenergetics",
    subtopic: "Photosynthesis",
    subject: "biology",
    question: "Explain how three factors limit the rate of photosynthesis. [6 marks]",
    totalMarks: 6,
    markScheme: [
      "Light intensity — increasing light increases the rate as more energy is available for photosynthesis",
      "At high light intensity, light is no longer the limiting factor",
      "Carbon dioxide concentration — more CO₂ means more raw material for photosynthesis",
      "At high CO₂ levels, another factor becomes limiting",
      "Temperature — enzymes work faster at higher temperatures (up to optimum)",
      "Above the optimum temperature, enzymes denature and the rate decreases sharply",
    ],
    commandWord: "Explain",
    difficulty: 3,
    examTip: "For 6-mark questions, structure your answer clearly. Cover each factor with a point and an explanation.",
  },
  {
    id: "bio-str-004",
    type: "structured",
    topic: "infection",
    subtopic: "Human Defence",
    subject: "biology",
    question: "Describe three ways white blood cells defend the body against pathogens. [3 marks]",
    totalMarks: 3,
    markScheme: [
      "Phagocytes engulf and digest pathogens (phagocytosis)",
      "Lymphocytes produce antibodies that are specific to the antigens on the pathogen",
      "Lymphocytes produce antitoxins to neutralise toxins released by pathogens",
    ],
    commandWord: "Describe",
    difficulty: 2,
  },
  {
    id: "bio-str-005",
    type: "structured",
    topic: "homeostasis",
    subtopic: "Blood Glucose",
    subject: "biology",
    question: "Explain how the body responds when blood glucose levels rise after a meal. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "The pancreas detects the rise in blood glucose concentration",
      "The pancreas releases insulin into the blood",
      "Insulin causes glucose to move from the blood into liver and muscle cells",
      "Glucose is converted to glycogen for storage, lowering blood glucose levels back to normal",
    ],
    commandWord: "Explain",
    difficulty: 2,
    examTip: "Name the organ (pancreas), the hormone (insulin), and describe the mechanism clearly.",
  },
  {
    id: "bio-str-006",
    type: "structured",
    topic: "genetics",
    subtopic: "Evolution & Natural Selection",
    subject: "biology",
    question: "Explain the process of natural selection using an example. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "There is variation within a population (e.g. some bacteria are resistant to antibiotics)",
      "Individuals with advantageous traits are more likely to survive (survival of the fittest)",
      "These individuals reproduce and pass on their alleles to offspring",
      "Over many generations, the frequency of the advantageous allele increases in the population",
    ],
    commandWord: "Explain",
    difficulty: 2,
  },
  {
    id: "bio-str-007",
    type: "structured",
    topic: "ecology",
    subtopic: "Human Impact",
    subject: "biology",
    question: "Evaluate the advantages and disadvantages of using biological control instead of pesticides. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "Advantage: biological control does not pollute the environment / no chemical residues",
      "Advantage: the control organism can reproduce and provide long-term control",
      "Disadvantage: biological control organisms may not eat only the pest / could become invasive",
      "Disadvantage: biological control is slower to take effect than chemical pesticides",
    ],
    commandWord: "Evaluate",
    difficulty: 3,
    examTip: "For 'evaluate' questions, give both sides and finish with a conclusion if asked.",
  },
  {
    id: "bio-str-008",
    type: "structured",
    topic: "cells",
    subtopic: "Cell Division",
    subject: "biology",
    question: "Compare mitosis and meiosis. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "Mitosis produces 2 identical daughter cells; meiosis produces 4 genetically different cells",
      "Mitosis results in diploid cells (46 chromosomes); meiosis results in haploid cells (23 chromosomes)",
      "Mitosis is used for growth and repair; meiosis is used to produce gametes",
      "Meiosis involves two divisions; mitosis involves one division",
    ],
    commandWord: "Compare",
    difficulty: 2,
    examTip: "'Compare' means state similarities AND differences. Use comparative language like 'whereas' or 'however'.",
  },
];

// ── Chemistry MCQs ──────────────────────────────────────────────────────
const chemistryMCQs: MCQuestion[] = [
  {
    id: "chem-mcq-001",
    type: "mcq",
    topic: "atomic-structure",
    subtopic: "Atomic Structure",
    subject: "chemistry",
    question: "What is the relative charge of a proton?",
    options: ["-1", "0", "+1", "+2"],
    correctIndex: 2,
    explanation: "Protons have a relative charge of +1 and are found in the nucleus.",
    difficulty: 1,
  },
  {
    id: "chem-mcq-002",
    type: "mcq",
    topic: "bonding",
    subtopic: "Ionic Bonding",
    subject: "chemistry",
    question: "What type of bonding is found in sodium chloride?",
    options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
    correctIndex: 1,
    explanation: "Sodium chloride (NaCl) has ionic bonding — sodium transfers an electron to chlorine.",
    difficulty: 1,
  },
  {
    id: "chem-mcq-003",
    type: "mcq",
    topic: "acids",
    subtopic: "Acids & Alkalis",
    subject: "chemistry",
    question: "What is the pH of a neutral solution?",
    options: ["0", "1", "7", "14"],
    correctIndex: 2,
    explanation: "pH 7 is neutral. Below 7 is acidic, above 7 is alkaline.",
    difficulty: 1,
  },
  {
    id: "chem-mcq-004",
    type: "mcq",
    topic: "rates",
    subtopic: "Rates of Reaction",
    subject: "chemistry",
    question: "Which of the following does NOT increase the rate of reaction?",
    options: ["Increasing temperature", "Using a catalyst", "Decreasing concentration", "Increasing surface area"],
    correctIndex: 2,
    explanation: "Decreasing concentration means fewer particles per unit volume, so fewer successful collisions.",
    difficulty: 2,
  },
  {
    id: "chem-mcq-005",
    type: "mcq",
    topic: "organic",
    subtopic: "Crude Oil & Hydrocarbons",
    subject: "chemistry",
    question: "What is the general formula for alkanes?",
    options: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙHₙ"],
    correctIndex: 1,
    explanation: "Alkanes have the general formula CₙH₂ₙ₊₂. They are saturated hydrocarbons with single bonds only.",
    difficulty: 1,
  },
  {
    id: "chem-mcq-006",
    type: "mcq",
    topic: "metals",
    subtopic: "Metals & Reactivity",
    subject: "chemistry",
    question: "Which metal is extracted from its ore by electrolysis?",
    options: ["Iron", "Copper", "Aluminium", "Gold"],
    correctIndex: 2,
    explanation: "Aluminium is too reactive to be extracted by reduction with carbon, so electrolysis of molten aluminium oxide is used.",
    difficulty: 2,
  },
];

// ── Chemistry Structured Questions ──────────────────────────────────────
const chemistryStructured: StructuredQuestion[] = [
  {
    id: "chem-str-001",
    type: "structured",
    topic: "bonding",
    subtopic: "Ionic Bonding",
    subject: "chemistry",
    question: "Explain how an ionic bond forms between sodium and chlorine. [3 marks]",
    totalMarks: 3,
    markScheme: [
      "Sodium loses one electron from its outer shell to form a Na⁺ ion",
      "Chlorine gains one electron into its outer shell to form a Cl⁻ ion",
      "The oppositely charged ions are held together by strong electrostatic attraction (ionic bond)",
    ],
    commandWord: "Explain",
    difficulty: 2,
  },
  {
    id: "chem-str-002",
    type: "structured",
    topic: "rates",
    subtopic: "Rates of Reaction",
    subject: "chemistry",
    question: "Explain, using collision theory, why increasing temperature increases the rate of reaction. [3 marks]",
    totalMarks: 3,
    markScheme: [
      "Higher temperature gives particles more kinetic energy",
      "Particles move faster and collide more frequently",
      "A greater proportion of collisions have energy equal to or greater than the activation energy, so more successful collisions occur",
    ],
    commandWord: "Explain",
    difficulty: 2,
    examTip: "Always mention 'activation energy' and 'successful collisions' for full marks.",
  },
  {
    id: "chem-str-003",
    type: "structured",
    topic: "acids",
    subtopic: "Acids & Alkalis",
    subject: "chemistry",
    question: "Describe how you would carry out a titration to find the volume of hydrochloric acid needed to neutralise a known volume of sodium hydroxide. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "Measure a known volume of sodium hydroxide using a pipette and place in a conical flask",
      "Add a few drops of indicator (e.g. phenolphthalein) to the flask",
      "Fill a burette with hydrochloric acid and record the initial reading",
      "Add acid slowly from the burette, swirling the flask, until the indicator changes colour at the endpoint, then record the final burette reading",
    ],
    commandWord: "Describe",
    difficulty: 2,
  },
];

// ── Physics MCQs ────────────────────────────────────────────────────────
const physicsMCQs: MCQuestion[] = [
  {
    id: "phys-mcq-001",
    type: "mcq",
    topic: "forces",
    subtopic: "Forces & Motion",
    subject: "physics",
    question: "What is the unit of force?",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctIndex: 2,
    explanation: "Force is measured in newtons (N). F = m × a.",
    difficulty: 1,
  },
  {
    id: "phys-mcq-002",
    type: "mcq",
    topic: "forces",
    subtopic: "Forces & Motion",
    subject: "physics",
    question: "A car travels 100 metres in 20 seconds. What is its average speed?",
    options: ["2 m/s", "5 m/s", "20 m/s", "2000 m/s"],
    correctIndex: 1,
    explanation: "Speed = distance ÷ time = 100 ÷ 20 = 5 m/s.",
    difficulty: 1,
  },
  {
    id: "phys-mcq-003",
    type: "mcq",
    topic: "electricity",
    subtopic: "Circuits",
    subject: "physics",
    question: "In a series circuit, what happens to the current at each component?",
    options: [
      "It decreases at each component",
      "It stays the same throughout",
      "It increases at each component",
      "It splits equally between components",
    ],
    correctIndex: 1,
    explanation: "In a series circuit, the current is the same at all points because there is only one path for the current to flow.",
    difficulty: 1,
  },
  {
    id: "phys-mcq-004",
    type: "mcq",
    topic: "waves",
    subtopic: "Waves",
    subject: "physics",
    question: "Which of the following is a transverse wave?",
    options: ["Sound wave", "Ultrasound", "Light wave", "Seismic P-wave"],
    correctIndex: 2,
    explanation: "Light is a transverse wave — oscillations are perpendicular to the direction of travel. Sound is longitudinal.",
    difficulty: 1,
  },
  {
    id: "phys-mcq-005",
    type: "mcq",
    topic: "energy",
    subtopic: "Energy Transfers",
    subject: "physics",
    question: "What is the equation for kinetic energy?",
    options: ["KE = mgh", "KE = ½mv²", "KE = Fd", "KE = mv"],
    correctIndex: 1,
    explanation: "Kinetic energy = ½ × mass × velocity². KE = ½mv².",
    difficulty: 1,
  },
  {
    id: "phys-mcq-006",
    type: "mcq",
    topic: "radioactivity",
    subtopic: "Radioactivity",
    subject: "physics",
    question: "Which type of radiation is stopped by a sheet of paper?",
    options: ["Alpha", "Beta", "Gamma", "Neutron"],
    correctIndex: 0,
    explanation: "Alpha particles are the largest and least penetrating — stopped by paper or a few cm of air.",
    difficulty: 1,
  },
];

// ── Physics Structured Questions ────────────────────────────────────────
const physicsStructured: StructuredQuestion[] = [
  {
    id: "phys-str-001",
    type: "structured",
    topic: "forces",
    subtopic: "Forces & Motion",
    subject: "physics",
    question: "A car of mass 1200 kg accelerates from rest to 15 m/s in 10 seconds. Calculate the resultant force acting on the car. Show your working. [3 marks]",
    totalMarks: 3,
    markScheme: [
      "Acceleration = (v - u) / t = (15 - 0) / 10 = 1.5 m/s²",
      "Force = mass × acceleration",
      "F = 1200 × 1.5 = 1800 N",
    ],
    commandWord: "Calculate",
    difficulty: 2,
    examTip: "Always show your working and include units in your final answer.",
  },
  {
    id: "phys-str-002",
    type: "structured",
    topic: "energy",
    subtopic: "Energy Transfers",
    subject: "physics",
    question: "Explain how energy is transferred when a ball is thrown upwards and then falls back down. [4 marks]",
    totalMarks: 4,
    markScheme: [
      "When thrown, kinetic energy is converted to gravitational potential energy as the ball rises",
      "At the highest point, the ball has maximum GPE and zero KE",
      "As the ball falls, GPE is converted back to KE",
      "Some energy is transferred to the surroundings as heat due to air resistance (energy dissipated)",
    ],
    commandWord: "Explain",
    difficulty: 2,
  },
  {
    id: "phys-str-003",
    type: "structured",
    topic: "electricity",
    subtopic: "Circuits",
    subject: "physics",
    question: "Compare series and parallel circuits in terms of current, voltage, and resistance. [6 marks]",
    totalMarks: 6,
    markScheme: [
      "In series circuits, current is the same throughout; in parallel circuits, current splits at junctions",
      "In series circuits, voltage is shared between components; in parallel circuits, voltage is the same across each branch",
      "In series circuits, total resistance = R₁ + R₂; adding resistors increases total resistance",
      "In parallel circuits, total resistance is less than the smallest individual resistance",
      "If one component fails in series, the whole circuit breaks; in parallel, other branches still work",
      "Parallel circuits are used in household wiring so devices can be controlled independently",
    ],
    commandWord: "Compare",
    difficulty: 3,
  },
];

// ── Aggregated by subject ───────────────────────────────────────────────
export const examQuestions: Record<Subject, ExamQuestion[]> = {
  biology: [...biologyMCQs, ...biologyStructured],
  chemistry: [...chemistryMCQs, ...chemistryStructured],
  physics: [...physicsMCQs, ...physicsStructured],
};

export function getExamQuestions(subject: Subject, topic?: string): ExamQuestion[] {
  let questions = examQuestions[subject];
  if (topic) {
    questions = questions.filter((q) => q.topic === topic);
  }
  return questions;
}

export function getMCQs(subject: Subject, topic?: string): MCQuestion[] {
  return getExamQuestions(subject, topic).filter((q): q is MCQuestion => q.type === "mcq");
}

export function getStructuredQuestions(subject: Subject, topic?: string): StructuredQuestion[] {
  return getExamQuestions(subject, topic).filter((q): q is StructuredQuestion => q.type === "structured");
}
