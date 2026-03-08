import { Flashcard, Topic } from "./flashcards";

export const chemistryTopics: Topic[] = [
  {
    id: "acids-alkalis",
    name: "Acids, Alkalis & Titrations",
    icon: "🧪",
    color: "bg-orange-500",
    subtopics: [
      "Indicators & pH Scale",
      "Acids, Bases & Neutralisation",
      "Solubility Rules",
      "Reactions of Acids",
      "Making Salts",
    ],
  },
];

export const chemistryFlashcards: Flashcard[] = [
  // ═══════════════════════════════════════════════
  // INDICATORS & pH SCALE (~10 cards)
  // ═══════════════════════════════════════════════
  {
    id: "chem-001",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What colour does litmus turn in acid?",
    answer: "Red.",
    keyPoints: [
      "Litmus: red in acid, blue in alkali",
      "Simple indicator with two colours",
      "Does not show exact pH",
    ],
    difficulty: 1,
  },
  {
    id: "chem-002",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What colour does litmus turn in alkali?",
    answer: "Blue.",
    keyPoints: [
      "Litmus: red in acid, blue in alkali",
      "Simple indicator with two colours",
      "Does not show exact pH",
    ],
    difficulty: 1,
  },
  {
    id: "chem-003",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What colour is phenolphthalein in acid?",
    answer: "Colourless.",
    keyPoints: [
      "Phenolphthalein: colourless in acid, pink in alkali",
      "Used in titrations",
      "Clear colour change at endpoint",
    ],
    difficulty: 1,
    examTip:
      "Say 'colourless' not 'clear' — examiners mark 'clear' wrong.",
  },
  {
    id: "chem-004",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What colour is phenolphthalein in alkali?",
    answer: "Pink.",
    keyPoints: [
      "Phenolphthalein: colourless in acid, pink in alkali",
      "Used in titrations",
      "Sharp colour change makes it useful",
    ],
    difficulty: 1,
  },
  {
    id: "chem-005",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What colour is methyl orange in acid?",
    answer: "Red.",
    keyPoints: [
      "Methyl orange: red in acid, yellow in alkali",
      "Remember 'MR' — Methyl = Red in acid",
      "Also used in titrations",
    ],
    difficulty: 1,
    examTip: "Remember 'MR' — Methyl orange = Red in acid.",
  },
  {
    id: "chem-006",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What colour is methyl orange in alkali?",
    answer: "Yellow.",
    keyPoints: [
      "Methyl orange: red in acid, yellow in alkali",
      "Orange at neutral / endpoint",
      "Used in titrations with strong acids",
    ],
    difficulty: 1,
  },
  {
    id: "chem-007",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What pH is neutral?",
    answer: "pH 7 (e.g. pure water).",
    keyPoints: [
      "pH 7 = neutral",
      "Pure water is pH 7",
      "Below 7 = acidic, above 7 = alkaline",
    ],
    difficulty: 1,
  },
  {
    id: "chem-008",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What pH range is strongly acidic?",
    answer: "pH 0–3.",
    keyPoints: [
      "pH 0–3 = strongly acidic",
      "pH 4–6 = weakly acidic",
      "Lower pH = more acidic",
    ],
    difficulty: 1,
  },
  {
    id: "chem-009",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What is universal indicator?",
    answer:
      "A mixture of indicators that produces a range of colours to show approximate pH.",
    keyPoints: [
      "Mixture of several indicators",
      "Compare colour to a pH chart",
      "Red → green → purple (acid → neutral → alkali)",
      "Only gives approximate pH",
    ],
    difficulty: 1,
    examTip:
      "Universal indicator gives APPROXIMATE pH. For a precise value, use a pH meter.",
  },
  {
    id: "chem-010",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question: "What is the difference between a strong acid and a weak acid?",
    answer:
      "A strong acid fully dissociates in water (e.g. HCl). A weak acid only partially dissociates (e.g. ethanoic acid).",
    keyPoints: [
      "Strong = fully dissociates (100% into ions)",
      "Weak = partially dissociates",
      "HCl, H₂SO₄, HNO₃ are strong acids",
      "Ethanoic acid, citric acid are weak",
    ],
    difficulty: 2,
    examTip:
      "Don't confuse strong/weak with concentrated/dilute. Strong/weak = dissociation. Concentrated/dilute = amount per dm³.",
  },
  {
    id: "chem-011",
    topic: "acids-alkalis",
    subtopic: "Indicators & pH Scale",
    question:
      "What is the difference between concentrated and dilute?",
    answer:
      "Concentrated = lots of solute per dm³ of solution. Dilute = little solute per dm³. This is separate from strong/weak.",
    keyPoints: [
      "Concentrated = high amount of solute per dm³",
      "Dilute = low amount of solute per dm³",
      "Different concept from strong/weak",
    ],
    difficulty: 2,
  },

  // ═══════════════════════════════════════════════
  // ACIDS, BASES & NEUTRALISATION (~12 cards)
  // ═══════════════════════════════════════════════
  {
    id: "chem-012",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What ions do acids produce in water?",
    answer: "H⁺(aq) ions (hydrogen ions).",
    keyPoints: [
      "Acids produce H⁺ in aqueous solution",
      "H⁺ ions give acidic properties",
      "More H⁺ = lower pH",
    ],
    difficulty: 1,
  },
  {
    id: "chem-013",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What ions do alkalis produce in water?",
    answer: "OH⁻(aq) ions (hydroxide ions).",
    keyPoints: [
      "Alkalis produce OH⁻ in aqueous solution",
      "OH⁻ ions give alkaline properties",
      "More OH⁻ = higher pH",
    ],
    difficulty: 1,
  },
  {
    id: "chem-014",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What is the ionic equation for neutralisation?",
    answer: "H⁺(aq) + OH⁻(aq) → H₂O(l).",
    keyPoints: [
      "H⁺ + OH⁻ → H₂O",
      "Applies to ALL acid-alkali neutralisations",
      "Hydrogen ions and hydroxide ions form water",
    ],
    difficulty: 1,
    examTip:
      "This ionic equation is KEY — learn it. It applies to ALL acid-alkali neutralisations.",
  },
  {
    id: "chem-015",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What is a base?",
    answer:
      "A substance that neutralises an acid. Examples: metal oxides, metal hydroxides.",
    keyPoints: [
      "Bases neutralise acids",
      "Metal oxides and hydroxides are bases",
      "Not all bases dissolve in water",
    ],
    difficulty: 1,
  },
  {
    id: "chem-016",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What is an alkali?",
    answer:
      "A base that dissolves in water to produce OH⁻ ions. E.g. NaOH, KOH.",
    keyPoints: [
      "Alkali = soluble base",
      "Produces OH⁻ ions in water",
      "All alkalis are bases, but not all bases are alkalis",
    ],
    difficulty: 1,
  },
  {
    id: "chem-017",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "Give an example of a base that is NOT an alkali.",
    answer: "Copper oxide (CuO) — it is a base but insoluble in water.",
    keyPoints: [
      "CuO neutralises acid but does not dissolve in water",
      "Insoluble bases are not alkalis",
      "Only soluble bases are alkalis",
    ],
    difficulty: 2,
  },
  {
    id: "chem-018",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What is a proton donor?",
    answer: "An acid — it donates H⁺ ions (protons) to a base.",
    keyPoints: [
      "Acid = proton (H⁺) donor",
      "Brønsted-Lowry definition",
      "H⁺ is just a proton (hydrogen with no electron)",
    ],
    difficulty: 2,
    examTip:
      "Higher tier: use 'proton donor/acceptor' language, not just 'produces H⁺/OH⁻'.",
  },
  {
    id: "chem-019",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What is a proton acceptor?",
    answer: "A base — it accepts H⁺ ions (protons) from an acid.",
    keyPoints: [
      "Base = proton (H⁺) acceptor",
      "Brønsted-Lowry definition",
      "Neutralisation = proton transfer from acid to base",
    ],
    difficulty: 2,
  },
  {
    id: "chem-020",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "How do indigestion tablets work?",
    answer:
      "They contain a base that neutralises excess stomach acid (HCl).",
    keyPoints: [
      "Stomach acid is HCl",
      "Tablet contains a base (e.g. CaCO₃ or Mg(OH)₂)",
      "Neutralisation reduces acidity",
    ],
    difficulty: 1,
  },
  {
    id: "chem-021",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "Why is toothpaste alkaline?",
    answer:
      "It neutralises acids produced by bacteria in the mouth, preventing tooth decay.",
    keyPoints: [
      "Bacteria produce acid from sugars",
      "Acid attacks tooth enamel",
      "Alkaline toothpaste neutralises this acid",
    ],
    difficulty: 1,
  },
  {
    id: "chem-022",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "Why do farmers add lime to soil?",
    answer:
      "Lime (calcium hydroxide) neutralises acidic soil so crops grow better.",
    keyPoints: [
      "Lime = Ca(OH)₂",
      "Neutralises acidic soil",
      "Improves crop growth",
    ],
    difficulty: 1,
  },
  {
    id: "chem-023",
    topic: "acids-alkalis",
    subtopic: "Acids, Bases & Neutralisation",
    question: "What is the general word equation for neutralisation?",
    answer: "Acid + alkali → salt + water.",
    keyPoints: [
      "Acid + alkali → salt + water",
      "pH moves towards 7",
      "Salt depends on acid and alkali used",
    ],
    difficulty: 1,
  },

  // ═══════════════════════════════════════════════
  // SOLUBILITY RULES (~10 cards)
  // ═══════════════════════════════════════════════
  {
    id: "chem-024",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are sodium compounds soluble or insoluble?",
    answer: "ALL sodium compounds are soluble. No exceptions.",
    keyPoints: [
      "Sodium = always soluble",
      "Part of the SPA-N rule",
      "Includes Na₂CO₃, NaOH, NaCl, etc.",
    ],
    difficulty: 2,
    examTip: "Remember 'SPA-N' — Sodium, Potassium, Ammonium, Nitrates = always soluble.",
  },
  {
    id: "chem-025",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are potassium compounds soluble or insoluble?",
    answer: "ALL potassium compounds are soluble. No exceptions.",
    keyPoints: [
      "Potassium = always soluble",
      "Part of the SPA-N rule",
      "Includes K₂CO₃, KOH, KCl, etc.",
    ],
    difficulty: 2,
  },
  {
    id: "chem-026",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are ammonium compounds soluble or insoluble?",
    answer: "ALL ammonium compounds are soluble. No exceptions.",
    keyPoints: [
      "Ammonium (NH₄⁺) = always soluble",
      "Part of the SPA-N rule",
      "Includes (NH₄)₂CO₃, (NH₄)₂SO₄, etc.",
    ],
    difficulty: 2,
  },
  {
    id: "chem-027",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are all nitrates soluble or insoluble?",
    answer: "ALL nitrates are soluble. No exceptions.",
    keyPoints: [
      "Every nitrate (NO₃⁻) compound is soluble",
      "Part of the SPA-N rule",
      "Includes Pb(NO₃)₂, AgNO₃, etc.",
    ],
    difficulty: 2,
  },
  {
    id: "chem-028",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are chlorides soluble? What are the exceptions?",
    answer:
      "Most chlorides are soluble EXCEPT silver chloride (AgCl) and lead(II) chloride (PbCl₂).",
    keyPoints: [
      "Chlorides = generally soluble",
      "AgCl = insoluble (white precipitate)",
      "PbCl₂ = insoluble (white precipitate)",
    ],
    difficulty: 2,
  },
  {
    id: "chem-029",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are sulfates soluble? What are the exceptions?",
    answer:
      "Most sulfates are soluble EXCEPT BaSO₄, CaSO₄, and PbSO₄.",
    keyPoints: [
      "Sulfates = generally soluble",
      "BaSO₄ = insoluble",
      "CaSO₄ = insoluble",
      "PbSO₄ = insoluble",
    ],
    difficulty: 2,
  },
  {
    id: "chem-030",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are most carbonates soluble or insoluble?",
    answer:
      "Most carbonates are INSOLUBLE, except sodium, potassium, and ammonium carbonates.",
    keyPoints: [
      "Carbonates = mostly insoluble",
      "Na₂CO₃, K₂CO₃, (NH₄)₂CO₃ are soluble",
      "SPA rule applies",
    ],
    difficulty: 2,
  },
  {
    id: "chem-031",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Are most hydroxides soluble or insoluble?",
    answer:
      "Most hydroxides are INSOLUBLE, except NaOH, KOH, and Ca(OH)₂ (slightly soluble).",
    keyPoints: [
      "Hydroxides = mostly insoluble",
      "NaOH and KOH are soluble",
      "Ca(OH)₂ is slightly soluble",
    ],
    difficulty: 2,
  },
  {
    id: "chem-032",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "Which metal appears in BOTH the chloride and sulfate exception lists?",
    answer: "Lead(II) — both PbCl₂ and PbSO₄ are insoluble.",
    keyPoints: [
      "Lead chloride = insoluble",
      "Lead sulfate = insoluble",
      "Lead appears in both exception lists",
    ],
    difficulty: 2,
    examTip:
      "Lead(II) appears in BOTH exceptions — PbCl₂ AND PbSO₄ are insoluble.",
  },
  {
    id: "chem-033",
    topic: "acids-alkalis",
    subtopic: "Solubility Rules",
    question: "What does SPA-N stand for in solubility rules?",
    answer:
      "Sodium, Potassium, Ammonium compounds and all Nitrates — these are always soluble.",
    keyPoints: [
      "S = Sodium",
      "P = Potassium",
      "A = Ammonium",
      "N = Nitrates",
    ],
    difficulty: 2,
  },

  // ═══════════════════════════════════════════════
  // REACTIONS OF ACIDS (~10 cards)
  // ═══════════════════════════════════════════════
  {
    id: "chem-034",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What are the products of acid + metal?",
    answer: "Salt + hydrogen gas.",
    keyPoints: [
      "Acid + metal → salt + hydrogen",
      "Not all metals react (e.g. copper is too unreactive)",
      "Hydrogen gas produced",
    ],
    difficulty: 1,
  },
  {
    id: "chem-035",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "How do you test for hydrogen gas?",
    answer: "Hold a burning splint near the gas — it gives a squeaky pop.",
    keyPoints: [
      "Burning splint → squeaky pop",
      "Hydrogen is flammable",
      "Common test in acid + metal reactions",
    ],
    difficulty: 1,
  },
  {
    id: "chem-036",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What are the products of acid + metal oxide?",
    answer: "Salt + water.",
    keyPoints: [
      "Acid + metal oxide → salt + water",
      "This is a neutralisation reaction",
      "Metal oxide is a base",
    ],
    difficulty: 1,
  },
  {
    id: "chem-037",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What are the products of acid + metal hydroxide?",
    answer: "Salt + water.",
    keyPoints: [
      "Acid + metal hydroxide → salt + water",
      "This is a neutralisation reaction",
      "Metal hydroxide is a base",
    ],
    difficulty: 1,
  },
  {
    id: "chem-038",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What are the products of acid + carbonate?",
    answer: "Salt + water + carbon dioxide. Three products!",
    keyPoints: [
      "Acid + carbonate → salt + water + CO₂",
      "THREE products (not two!)",
      "Fizzing/effervescence observed",
    ],
    difficulty: 1,
    examTip:
      "ALWAYS write 3 products for acid + carbonate. Forgetting CO₂ is a common mistake.",
  },
  {
    id: "chem-039",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "How do you test for carbon dioxide gas?",
    answer: "Bubble it through limewater — it turns milky (cloudy).",
    keyPoints: [
      "Limewater turns milky/cloudy",
      "Limewater = calcium hydroxide solution",
      "CO₂ produced in acid + carbonate reactions",
    ],
    difficulty: 1,
  },
  {
    id: "chem-040",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What type of salt does hydrochloric acid (HCl) produce?",
    answer: "Chloride salts.",
    keyPoints: [
      "HCl → chloride salts",
      "E.g. NaCl, MgCl₂, CuCl₂",
      "Chloride ending = hydrochloric acid",
    ],
    difficulty: 1,
    examTip:
      "You MUST predict the salt name from the acid + base combination. Practise this!",
  },
  {
    id: "chem-041",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What type of salt does sulfuric acid (H₂SO₄) produce?",
    answer: "Sulfate salts.",
    keyPoints: [
      "H₂SO₄ → sulfate salts",
      "E.g. Na₂SO₄, MgSO₄, CuSO₄",
      "Sulfate ending = sulfuric acid",
    ],
    difficulty: 1,
  },
  {
    id: "chem-042",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question: "What type of salt does nitric acid (HNO₃) produce?",
    answer: "Nitrate salts.",
    keyPoints: [
      "HNO₃ → nitrate salts",
      "E.g. NaNO₃, Mg(NO₃)₂, Cu(NO₃)₂",
      "Nitrate ending = nitric acid",
    ],
    difficulty: 1,
  },
  {
    id: "chem-043",
    topic: "acids-alkalis",
    subtopic: "Reactions of Acids",
    question:
      "Write the balanced equation: HCl + CaCO₃.",
    answer:
      "2HCl(aq) + CaCO₃(s) → CaCl₂(aq) + H₂O(l) + CO₂(g).",
    keyPoints: [
      "2 HCl needed to balance",
      "Three products: salt + water + CO₂",
      "Include state symbols for full marks",
    ],
    difficulty: 2,
    examTip:
      "Always check your equation is BALANCED and include STATE SYMBOLS (aq, s, l, g).",
  },

  // ═══════════════════════════════════════════════
  // MAKING SALTS (~12 cards)
  // ═══════════════════════════════════════════════
  {
    id: "chem-044",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question:
      "Name three methods for making salts.",
    answer:
      "1) Adding excess insoluble base to acid. 2) Titration (acid + alkali). 3) Precipitation (mixing two soluble solutions).",
    keyPoints: [
      "Excess base method → soluble salt from insoluble base",
      "Titration → soluble salt from alkali",
      "Precipitation → insoluble salt",
    ],
    difficulty: 2,
  },
  {
    id: "chem-045",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question:
      "In the excess base method, why do you add excess insoluble base?",
    answer:
      "To ensure all the acid has reacted. Unreacted solid at the bottom shows the acid is used up.",
    keyPoints: [
      "Excess ensures all acid is neutralised",
      "Solid stops dissolving when acid is used up",
      "Unreacted solid visible at bottom",
    ],
    difficulty: 2,
    examTip:
      "Key phrase for 6-mark answers: 'add excess to ensure all acid has reacted'.",
  },
  {
    id: "chem-046",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question:
      "How do you remove the excess solid after the base stops dissolving?",
    answer: "Filter the mixture — the filtrate contains the dissolved salt.",
    keyPoints: [
      "Filter to remove excess unreacted solid",
      "Filtrate = salt solution",
      "Residue = unreacted base",
    ],
    difficulty: 1,
  },
  {
    id: "chem-047",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "What is crystallisation?",
    answer:
      "Gently evaporating water from a salt solution, then cooling to form solid crystals.",
    keyPoints: [
      "Heat gently to evaporate some water",
      "Leave to cool slowly for crystals to form",
      "Slow cooling = larger, more regular crystals",
    ],
    difficulty: 2,
  },
  {
    id: "chem-048",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "How do you test if a solution is ready to crystallise?",
    answer:
      "Dip a glass rod in the solution, let it cool — if crystals form on the rod, it is saturated and ready.",
    keyPoints: [
      "Glass rod test for saturation",
      "Crystals form on cooled rod = ready",
      "Then leave the whole solution to cool and crystallise",
    ],
    difficulty: 2,
  },
  {
    id: "chem-049",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "How do you dry salt crystals?",
    answer: "Pat them dry between two sheets of filter paper.",
    keyPoints: [
      "Pat dry with filter paper",
      "Or dry in a warm oven (low temperature)",
      "Do not heat too strongly or crystals may decompose",
    ],
    difficulty: 1,
  },
  {
    id: "chem-050",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "What equation does the excess base method use for making CuSO₄?",
    answer: "CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l).",
    keyPoints: [
      "Copper oxide + sulfuric acid → copper sulfate + water",
      "CuO is the insoluble base",
      "CuSO₄ is a blue salt",
    ],
    difficulty: 2,
  },
  {
    id: "chem-051",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "In a titration, what measures the alkali and what delivers the acid?",
    answer: "A pipette measures the alkali. A burette delivers the acid.",
    keyPoints: [
      "Pipette = fixed volume of alkali",
      "Burette = variable volume of acid",
      "Indicator shows the endpoint",
    ],
    difficulty: 2,
  },
  {
    id: "chem-052",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question:
      "Why is the titration repeated without indicator to make a pure salt?",
    answer:
      "The indicator would contaminate the salt crystals. Use exact volumes from the first run instead.",
    keyPoints: [
      "Indicator = impurity in the salt",
      "First run finds the exact volume needed",
      "Repeat with same volumes, no indicator",
    ],
    difficulty: 3,
    examTip:
      "You repeat WITHOUT indicator because indicator would contaminate the salt crystals.",
  },
  {
    id: "chem-053",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "How do you make an insoluble salt by precipitation?",
    answer:
      "Mix two soluble solutions that react to form an insoluble product. Filter, wash with distilled water, and dry.",
    keyPoints: [
      "Both reactants must be soluble",
      "Product must be insoluble (forms precipitate)",
      "Filter, wash, dry",
    ],
    difficulty: 3,
  },
  {
    id: "chem-054",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question:
      "Give an example equation for making an insoluble salt by precipitation.",
    answer:
      "Pb(NO₃)₂(aq) + Na₂SO₄(aq) → PbSO₄(s) + 2NaNO₃(aq).",
    keyPoints: [
      "Both reactants are soluble",
      "PbSO₄ is the insoluble precipitate",
      "Use solubility rules to choose reactants",
    ],
    difficulty: 3,
    examTip:
      "Use solubility rules to pick reactants — both MUST be soluble, product MUST be insoluble.",
  },
  {
    id: "chem-055",
    topic: "acids-alkalis",
    subtopic: "Making Salts",
    question: "Why do you wash the precipitate with distilled water?",
    answer:
      "To remove any soluble impurities (e.g. leftover reactant ions) from the surface of the insoluble salt.",
    keyPoints: [
      "Removes soluble impurities",
      "Distilled water avoids adding new ions",
      "Gives a purer final product",
    ],
    difficulty: 2,
  },
];
