import { Flashcard, Topic } from "./flashcards";

export const physicsTopics: Topic[] = [
  {
    id: "forces-motion",
    name: "Forces and Motion",
    icon: "🚀",
    color: "bg-blue-500",
    subtopics: [
      "Speed, Distance & Time",
      "Velocity & Acceleration",
      "Distance-Time & Velocity-Time Graphs",
      "Forces & Newton's Laws",
      "Stopping Distances",
      "Momentum",
    ],
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: "⚡",
    color: "bg-amber-500",
    subtopics: [
      "Charge, Current & Voltage",
      "Resistance & Ohm's Law",
      "Series & Parallel Circuits",
      "Electrical Power & Energy",
      "Static Electricity",
    ],
  },
  {
    id: "waves",
    name: "Waves",
    icon: "🌊",
    color: "bg-cyan-500",
    subtopics: [
      "Wave Properties",
      "Reflection & Refraction",
      "Electromagnetic Spectrum",
      "Sound Waves",
      "Lenses & Images",
    ],
  },
  {
    id: "energy-resources",
    name: "Energy Resources & Transfers",
    icon: "🔋",
    color: "bg-green-500",
    subtopics: [
      "Energy Stores & Transfers",
      "Conservation of Energy",
      "Efficiency",
      "Renewable & Non-Renewable Resources",
      "Specific Heat Capacity",
    ],
  },
  {
    id: "solids-liquids-gases",
    name: "Solids, Liquids & Gases",
    icon: "🌡️",
    color: "bg-orange-500",
    subtopics: [
      "Particle Model",
      "Density",
      "Pressure in Gases & Liquids",
      "Changes of State",
      "Specific & Latent Heat",
    ],
  },
  {
    id: "magnetism",
    name: "Magnetism & Electromagnetism",
    icon: "🧲",
    color: "bg-red-500",
    subtopics: [
      "Magnets & Magnetic Fields",
      "Electromagnets",
      "The Motor Effect",
      "Electromagnetic Induction",
      "Transformers",
    ],
  },
  {
    id: "radioactivity",
    name: "Radioactivity & Particles",
    icon: "☢️",
    color: "bg-purple-500",
    subtopics: [
      "Atomic Structure",
      "Types of Radiation",
      "Half-Life",
      "Uses & Hazards of Radiation",
      "Nuclear Fission & Fusion",
    ],
  },
  {
    id: "astrophysics",
    name: "Astrophysics",
    icon: "🔭",
    color: "bg-indigo-500",
    subtopics: [
      "The Solar System",
      "Stellar Evolution",
      "The Big Bang & Red Shift",
      "Orbits & Gravity",
    ],
  },
];

export const physicsFlashcards: Flashcard[] = [
  // ═══════════════════════════════════════════════
  // FORCES AND MOTION
  // ═══════════════════════════════════════════════

  // --- Speed, Distance & Time ---
  { id: "phys-001", topic: "forces-motion", subtopic: "Speed, Distance & Time", question: "What is the equation for speed?", answer: "Speed = distance ÷ time (v = s / t).", keyPoints: ["v = s / t", "Speed measured in m/s", "Distance in metres, time in seconds"], difficulty: 1 },
  { id: "phys-002", topic: "forces-motion", subtopic: "Speed, Distance & Time", question: "What is the typical walking speed of a person?", answer: "About 1.5 m/s.", keyPoints: ["Walking ≈ 1.5 m/s", "Running ≈ 3 m/s", "Cycling ≈ 6 m/s"], difficulty: 1 },
  { id: "phys-003", topic: "forces-motion", subtopic: "Speed, Distance & Time", question: "What is the difference between speed and velocity?", answer: "Speed is a scalar (magnitude only). Velocity is a vector (magnitude AND direction).", keyPoints: ["Speed = scalar, velocity = vector", "Velocity includes direction", "Same speed but different direction = different velocity"], difficulty: 2, examTip: "Always state 'velocity is speed in a given direction' for full marks." },
  { id: "phys-004", topic: "forces-motion", subtopic: "Speed, Distance & Time", question: "How do you rearrange v = s / t to find distance?", answer: "s = v × t.", keyPoints: ["Multiply both sides by t", "s = v × t", "Use the formula triangle: s on top, v × t on bottom"], difficulty: 1 },

  // --- Velocity & Acceleration ---
  { id: "phys-005", topic: "forces-motion", subtopic: "Velocity & Acceleration", question: "What is the equation for acceleration?", answer: "Acceleration = change in velocity ÷ time, a = (v − u) / t.", keyPoints: ["a = (v − u) / t", "v = final velocity, u = initial velocity", "Measured in m/s²"], difficulty: 1, examTip: "Remember: v = final, u = initial. A common mistake is swapping them." },
  { id: "phys-006", topic: "forces-motion", subtopic: "Velocity & Acceleration", question: "What does a negative acceleration mean?", answer: "The object is decelerating (slowing down).", keyPoints: ["Negative acceleration = deceleration", "Velocity is decreasing", "Resultant force opposes motion"], difficulty: 1 },
  { id: "phys-007", topic: "forces-motion", subtopic: "Velocity & Acceleration", question: "What is uniform acceleration?", answer: "Acceleration that is constant — the velocity changes by the same amount each second.", keyPoints: ["Constant rate of change of velocity", "Straight line on a v-t graph", "e.g. free fall (ignoring air resistance)"], difficulty: 2 },

  // --- Distance-Time & Velocity-Time Graphs ---
  { id: "phys-008", topic: "forces-motion", subtopic: "Distance-Time & Velocity-Time Graphs", question: "What does a straight line on a distance-time graph show?", answer: "Constant speed.", keyPoints: ["Steeper line = faster speed", "Horizontal line = stationary", "Gradient = speed"], difficulty: 1 },
  { id: "phys-009", topic: "forces-motion", subtopic: "Distance-Time & Velocity-Time Graphs", question: "What does the gradient of a velocity-time graph represent?", answer: "Acceleration.", keyPoints: ["Gradient = acceleration", "Steeper = greater acceleration", "Negative gradient = deceleration"], difficulty: 2, examTip: "The AREA under a v-t graph = distance travelled. This is a very common exam question." },
  { id: "phys-010", topic: "forces-motion", subtopic: "Distance-Time & Velocity-Time Graphs", question: "How do you find distance from a velocity-time graph?", answer: "Calculate the area under the graph.", keyPoints: ["Area under graph = distance", "Use triangles and rectangles", "Count squares if the shape is irregular"], difficulty: 2 },
  { id: "phys-011", topic: "forces-motion", subtopic: "Distance-Time & Velocity-Time Graphs", question: "What does a curved line on a distance-time graph indicate?", answer: "Changing speed (acceleration or deceleration).", keyPoints: ["Curve getting steeper = accelerating", "Curve flattening = decelerating", "Tangent at a point gives instantaneous speed"], difficulty: 2 },

  // --- Forces & Newton's Laws ---
  { id: "phys-012", topic: "forces-motion", subtopic: "Forces & Newton's Laws", question: "State Newton's First Law of Motion.", answer: "An object remains at rest or at constant velocity unless acted on by a resultant force.", keyPoints: ["No resultant force = no change in motion", "Balanced forces = constant velocity or stationary", "A resultant force causes acceleration"], difficulty: 1 },
  { id: "phys-013", topic: "forces-motion", subtopic: "Forces & Newton's Laws", question: "State Newton's Second Law and its equation.", answer: "Force = mass × acceleration (F = ma).", keyPoints: ["F = ma", "Force in Newtons (N)", "Greater force = greater acceleration for same mass"], difficulty: 1, examTip: "F = ma is one of the most important equations in GCSE physics. Practise rearranging it." },
  { id: "phys-014", topic: "forces-motion", subtopic: "Forces & Newton's Laws", question: "State Newton's Third Law.", answer: "For every action there is an equal and opposite reaction. The two forces act on different objects.", keyPoints: ["Equal in magnitude, opposite in direction", "Act on DIFFERENT objects", "Same type of force (e.g. both gravitational)"], difficulty: 2, examTip: "The key phrase is 'act on different objects'. Many students forget this." },
  { id: "phys-015", topic: "forces-motion", subtopic: "Forces & Newton's Laws", question: "What is the resultant force?", answer: "The single force that has the same effect as all the forces acting on an object combined.", keyPoints: ["Add forces in same direction", "Subtract forces in opposite directions", "Zero resultant = balanced"], difficulty: 1 },
  { id: "phys-016", topic: "forces-motion", subtopic: "Forces & Newton's Laws", question: "What happens when an object reaches terminal velocity?", answer: "The drag force equals the driving force (or weight), so the resultant force is zero and acceleration is zero.", keyPoints: ["Drag = weight (for falling objects)", "Resultant force = 0", "Constant velocity, no acceleration"], difficulty: 2 },

  // --- Stopping Distances ---
  { id: "phys-017", topic: "forces-motion", subtopic: "Stopping Distances", question: "What is stopping distance?", answer: "Stopping distance = thinking distance + braking distance.", keyPoints: ["Two components added together", "Thinking = reaction time × speed", "Braking = distance while brakes applied"], difficulty: 1, examTip: "Learn the formula: stopping distance = thinking distance + braking distance." },
  { id: "phys-018", topic: "forces-motion", subtopic: "Stopping Distances", question: "Name three factors that increase thinking distance.", answer: "Tiredness, alcohol/drugs, distractions (e.g. using a phone).", keyPoints: ["All affect reaction time", "Speed also increases thinking distance", "Age and illness can also affect it"], difficulty: 1 },
  { id: "phys-019", topic: "forces-motion", subtopic: "Stopping Distances", question: "Name three factors that increase braking distance.", answer: "Wet/icy roads, worn brakes, worn tyres.", keyPoints: ["Reduced friction increases braking distance", "Higher speed greatly increases braking distance", "Braking distance ∝ speed²"], difficulty: 2 },

  // --- Momentum ---
  { id: "phys-020", topic: "forces-motion", subtopic: "Momentum", question: "What is the equation for momentum?", answer: "Momentum = mass × velocity (p = mv).", keyPoints: ["p = mv", "Measured in kg m/s", "Momentum is a vector quantity"], difficulty: 1 },
  { id: "phys-021", topic: "forces-motion", subtopic: "Momentum", question: "State the law of conservation of momentum.", answer: "In a closed system, the total momentum before an event equals the total momentum after.", keyPoints: ["Total momentum before = total momentum after", "Applies to collisions and explosions", "Closed system = no external forces"], difficulty: 2, examTip: "Always state 'in a closed system' or 'when no external forces act' for full marks." },
  { id: "phys-022", topic: "forces-motion", subtopic: "Momentum", question: "How is force related to momentum?", answer: "Force = rate of change of momentum. F = (mv − mu) / t.", keyPoints: ["F = change in momentum / time", "Larger force = faster change in momentum", "This is another form of Newton's Second Law"], difficulty: 3 },
  { id: "phys-023", topic: "forces-motion", subtopic: "Momentum", question: "Why do car crumple zones reduce injury?", answer: "They increase the time over which momentum changes, reducing the force on passengers.", keyPoints: ["Longer collision time", "Same change in momentum", "Smaller force = less injury"], difficulty: 2 },

  // ═══════════════════════════════════════════════
  // ELECTRICITY
  // ═══════════════════════════════════════════════

  // --- Charge, Current & Voltage ---
  { id: "phys-024", topic: "electricity", subtopic: "Charge, Current & Voltage", question: "What is electric current?", answer: "The rate of flow of electric charge. I = Q / t.", keyPoints: ["Current = charge / time", "Measured in Amperes (A)", "Charge measured in Coulombs (C)"], difficulty: 1 },
  { id: "phys-025", topic: "electricity", subtopic: "Charge, Current & Voltage", question: "What is potential difference (voltage)?", answer: "The energy transferred per unit charge. V = E / Q.", keyPoints: ["V = E / Q", "Measured in Volts (V)", "1 V = 1 J per coulomb"], difficulty: 1, examTip: "Voltage is the 'push' that drives current around a circuit." },
  { id: "phys-026", topic: "electricity", subtopic: "Charge, Current & Voltage", question: "In which direction does conventional current flow?", answer: "From positive to negative (opposite to electron flow).", keyPoints: ["Conventional: positive → negative", "Electron flow: negative → positive", "Electrons are the actual charge carriers in metals"], difficulty: 2 },

  // --- Resistance & Ohm's Law ---
  { id: "phys-027", topic: "electricity", subtopic: "Resistance & Ohm's Law", question: "State Ohm's Law.", answer: "V = I × R. The current through a conductor is proportional to the voltage, provided temperature is constant.", keyPoints: ["V = IR", "R = V / I", "Only applies at constant temperature"], difficulty: 1, examTip: "V = IR is essential. Practise rearranging it for I and R." },
  { id: "phys-028", topic: "electricity", subtopic: "Resistance & Ohm's Law", question: "What is resistance measured in?", answer: "Ohms (Ω).", keyPoints: ["Symbol: Ω", "R = V / I", "Higher resistance = less current for same voltage"], difficulty: 1 },
  { id: "phys-029", topic: "electricity", subtopic: "Resistance & Ohm's Law", question: "How does the resistance of a filament lamp change as it gets hotter?", answer: "Resistance increases as temperature increases.", keyPoints: ["Hotter = more resistance", "Ions vibrate more, impeding electron flow", "I-V graph is a curve (not a straight line)"], difficulty: 2 },
  { id: "phys-030", topic: "electricity", subtopic: "Resistance & Ohm's Law", question: "What is an LDR and how does its resistance change?", answer: "Light Dependent Resistor. Resistance DECREASES as light intensity INCREASES.", keyPoints: ["More light = less resistance", "Used in automatic lights", "In the dark, resistance is very high"], difficulty: 2 },
  { id: "phys-031", topic: "electricity", subtopic: "Resistance & Ohm's Law", question: "What is a thermistor and how does its resistance change?", answer: "A resistor whose resistance DECREASES as temperature INCREASES.", keyPoints: ["Hotter = less resistance (for NTC type)", "Used in temperature sensors", "Opposite to a filament lamp behaviour"], difficulty: 2, examTip: "Don't confuse thermistors with filament lamps — thermistors decrease in resistance when heated." },

  // --- Series & Parallel Circuits ---
  { id: "phys-032", topic: "electricity", subtopic: "Series & Parallel Circuits", question: "How does current behave in a series circuit?", answer: "Current is the SAME at all points in a series circuit.", keyPoints: ["Same current throughout", "Only one path for current", "Adding components increases total resistance"], difficulty: 1 },
  { id: "phys-033", topic: "electricity", subtopic: "Series & Parallel Circuits", question: "How is voltage shared in a series circuit?", answer: "Voltage is shared between components. V_total = V₁ + V₂ + ...", keyPoints: ["Voltages add up to supply voltage", "Larger resistance gets larger share", "V is divided proportionally"], difficulty: 1 },
  { id: "phys-034", topic: "electricity", subtopic: "Series & Parallel Circuits", question: "How does current behave in a parallel circuit?", answer: "Current splits at junctions. Total current = sum of branch currents.", keyPoints: ["Current splits at junctions", "More current flows through lower resistance branch", "Total current from supply = sum of all branches"], difficulty: 2 },
  { id: "phys-035", topic: "electricity", subtopic: "Series & Parallel Circuits", question: "How is voltage shared in a parallel circuit?", answer: "Voltage is the SAME across each branch.", keyPoints: ["Same voltage across all parallel branches", "Each branch gets the full supply voltage", "This is why household circuits are wired in parallel"], difficulty: 1 },
  { id: "phys-036", topic: "electricity", subtopic: "Series & Parallel Circuits", question: "How do you calculate total resistance in series?", answer: "R_total = R₁ + R₂ + R₃ ...", keyPoints: ["Just add them up", "Total resistance increases", "More resistors = harder for current to flow"], difficulty: 1 },

  // --- Electrical Power & Energy ---
  { id: "phys-037", topic: "electricity", subtopic: "Electrical Power & Energy", question: "What are the two equations for electrical power?", answer: "P = IV and P = I²R.", keyPoints: ["P = IV (power = current × voltage)", "P = I²R (power = current² × resistance)", "Power measured in Watts (W)"], difficulty: 2, examTip: "Learn both power equations — P = IV is used most, but P = I²R is needed when V isn't given." },
  { id: "phys-038", topic: "electricity", subtopic: "Electrical Power & Energy", question: "What is the equation for electrical energy transferred?", answer: "E = Pt (energy = power × time). Also E = QV.", keyPoints: ["E = Pt", "E = QV (energy = charge × voltage)", "Energy measured in Joules (J)"], difficulty: 2 },
  { id: "phys-039", topic: "electricity", subtopic: "Electrical Power & Energy", question: "What is the national grid?", answer: "A system of cables and transformers linking power stations to consumers across the country.", keyPoints: ["Transmits electricity at high voltage", "High voltage reduces current and energy loss", "Step-up and step-down transformers used"], difficulty: 1 },
  { id: "phys-040", topic: "electricity", subtopic: "Electrical Power & Energy", question: "Why is electricity transmitted at high voltage?", answer: "To reduce current, which reduces energy lost as heat in the cables (P = I²R).", keyPoints: ["High voltage → low current", "P = I²R → less heat loss", "Step-up transformer increases voltage for transmission"], difficulty: 2, examTip: "Use P = I²R to explain why reducing current reduces power loss." },

  // --- Static Electricity ---
  { id: "phys-041", topic: "electricity", subtopic: "Static Electricity", question: "How is static charge produced?", answer: "By friction — electrons transfer from one material to another.", keyPoints: ["Rubbing transfers electrons", "Material gaining electrons becomes negative", "Material losing electrons becomes positive"], difficulty: 1 },
  { id: "phys-042", topic: "electricity", subtopic: "Static Electricity", question: "What is an electric field?", answer: "The region around a charged object where another charged object experiences a force.", keyPoints: ["Exists around all charged objects", "Field lines go from + to −", "Stronger closer to the charge"], difficulty: 2 },
  { id: "phys-043", topic: "electricity", subtopic: "Static Electricity", question: "What happens when a charged object is brought near an uncharged conductor?", answer: "Charge is induced — electrons in the conductor redistribute, causing attraction.", keyPoints: ["Electrons move towards or away from charged object", "Near side gets opposite charge", "This causes attraction"], difficulty: 3 },

  // ═══════════════════════════════════════════════
  // WAVES
  // ═══════════════════════════════════════════════

  // --- Wave Properties ---
  { id: "phys-044", topic: "waves", subtopic: "Wave Properties", question: "What is the equation linking wave speed, frequency and wavelength?", answer: "v = f × λ (wave speed = frequency × wavelength).", keyPoints: ["v = fλ", "v in m/s, f in Hz, λ in metres", "Applies to all waves"], difficulty: 1, examTip: "This is one of the key wave equations — practise rearranging it." },
  { id: "phys-045", topic: "waves", subtopic: "Wave Properties", question: "What is the difference between transverse and longitudinal waves?", answer: "Transverse: oscillation perpendicular to direction of travel. Longitudinal: oscillation parallel to direction of travel.", keyPoints: ["Transverse: e.g. light, water waves, S-waves", "Longitudinal: e.g. sound, P-waves", "Both transfer energy without transferring matter"], difficulty: 1 },
  { id: "phys-046", topic: "waves", subtopic: "Wave Properties", question: "Define wavelength, frequency, amplitude and period.", answer: "Wavelength (λ): distance of one complete wave. Frequency (f): waves per second. Amplitude: max displacement. Period (T): time for one wave, T = 1/f.", keyPoints: ["λ = length of one complete cycle", "f = number of waves per second (Hz)", "Amplitude = maximum displacement from rest", "T = 1/f"], difficulty: 2 },

  // --- Reflection & Refraction ---
  { id: "phys-047", topic: "waves", subtopic: "Reflection & Refraction", question: "State the law of reflection.", answer: "Angle of incidence = angle of reflection. Both measured from the normal.", keyPoints: ["i = r", "Angles measured from the normal", "Normal is perpendicular to the surface"], difficulty: 1 },
  { id: "phys-048", topic: "waves", subtopic: "Reflection & Refraction", question: "What is refraction?", answer: "The change in direction of a wave when it passes from one medium to another, caused by a change in speed.", keyPoints: ["Change in speed causes change in direction", "Towards normal when slowing down", "Away from normal when speeding up"], difficulty: 2, examTip: "Remember: light bends TOWARDS the normal when entering a denser medium (slowing down)." },
  { id: "phys-049", topic: "waves", subtopic: "Reflection & Refraction", question: "What is total internal reflection?", answer: "When light hits a boundary at an angle greater than the critical angle, it is completely reflected back.", keyPoints: ["Occurs above the critical angle", "Light must go from denser to less dense medium", "Used in optical fibres and prisms"], difficulty: 2 },

  // --- Electromagnetic Spectrum ---
  { id: "phys-050", topic: "waves", subtopic: "Electromagnetic Spectrum", question: "List the EM spectrum in order of increasing frequency.", answer: "Radio, Microwave, Infrared, Visible, Ultraviolet, X-ray, Gamma.", keyPoints: ["Mnemonic: 'Raging Martians Invaded Venus Using X-ray Guns'", "All travel at speed of light (3 × 10⁸ m/s)", "All are transverse waves"], difficulty: 1, examTip: "Learn a mnemonic. You MUST know the order for the exam." },
  { id: "phys-051", topic: "waves", subtopic: "Electromagnetic Spectrum", question: "What are two uses of infrared radiation?", answer: "Thermal imaging cameras and TV remote controls.", keyPoints: ["All warm objects emit IR", "Used in heating, cooking, communications", "Detected by skin as warmth"], difficulty: 1 },
  { id: "phys-052", topic: "waves", subtopic: "Electromagnetic Spectrum", question: "What are the dangers of UV, X-rays and gamma rays?", answer: "UV: skin cancer, eye damage. X-rays/Gamma: cell damage, cancer, mutations.", keyPoints: ["Higher frequency = more energy = more dangerous", "UV causes sunburn and skin cancer", "X-rays and gamma can cause mutations in DNA"], difficulty: 2 },

  // --- Sound Waves ---
  { id: "phys-053", topic: "waves", subtopic: "Sound Waves", question: "What type of wave is sound?", answer: "A longitudinal wave.", keyPoints: ["Compressions and rarefactions", "Cannot travel through a vacuum", "Needs a medium (solid, liquid or gas)"], difficulty: 1 },
  { id: "phys-054", topic: "waves", subtopic: "Sound Waves", question: "What is the approximate range of human hearing?", answer: "20 Hz to 20,000 Hz (20 kHz).", keyPoints: ["Below 20 Hz = infrasound", "Above 20 kHz = ultrasound", "Range decreases with age"], difficulty: 1 },

  // --- Lenses & Images ---
  { id: "phys-055", topic: "waves", subtopic: "Lenses & Images", question: "What is the difference between a converging and diverging lens?", answer: "Converging (convex): brings light to a focus. Diverging (concave): spreads light out.", keyPoints: ["Convex = converging, thicker in middle", "Concave = diverging, thinner in middle", "Convex used in magnifying glasses"], difficulty: 2 },
  { id: "phys-056", topic: "waves", subtopic: "Lenses & Images", question: "What is the focal length of a lens?", answer: "The distance from the centre of the lens to the focal point (where parallel rays converge).", keyPoints: ["Shorter focal length = more powerful lens", "Power = 1 / focal length (in metres)", "Power measured in dioptres (D)"], difficulty: 2 },

  // ═══════════════════════════════════════════════
  // ENERGY RESOURCES & TRANSFERS
  // ═══════════════════════════════════════════════

  // --- Energy Stores & Transfers ---
  { id: "phys-057", topic: "energy-resources", subtopic: "Energy Stores & Transfers", question: "Name the eight energy stores.", answer: "Kinetic, thermal, chemical, gravitational potential, elastic potential, nuclear, magnetic, electrostatic.", keyPoints: ["KE = ½mv²", "GPE = mgh", "Chemical: food, fuel, batteries"], difficulty: 1 },
  { id: "phys-058", topic: "energy-resources", subtopic: "Energy Stores & Transfers", question: "What is the equation for kinetic energy?", answer: "KE = ½mv².", keyPoints: ["m = mass in kg", "v = speed in m/s", "Doubling speed quadruples KE"], difficulty: 1, examTip: "KE depends on v² — so doubling speed gives 4× the kinetic energy. This is a common exam calculation." },
  { id: "phys-059", topic: "energy-resources", subtopic: "Energy Stores & Transfers", question: "What is the equation for gravitational potential energy?", answer: "GPE = mgh (mass × gravitational field strength × height).", keyPoints: ["m in kg, g = 9.8 N/kg, h in metres", "Energy stored due to position", "Increases with height and mass"], difficulty: 1 },
  { id: "phys-060", topic: "energy-resources", subtopic: "Energy Stores & Transfers", question: "Name the four energy transfer pathways.", answer: "Mechanical (by forces), electrical (by current), heating, and radiation.", keyPoints: ["Energy moves between stores via pathways", "Heating = conduction, convection, radiation", "Radiation includes light, sound, EM waves"], difficulty: 2 },

  // --- Conservation of Energy ---
  { id: "phys-061", topic: "energy-resources", subtopic: "Conservation of Energy", question: "State the law of conservation of energy.", answer: "Energy cannot be created or destroyed, only transferred from one store to another.", keyPoints: ["Total energy in a closed system is constant", "Energy is always conserved", "Some energy is always 'wasted' (usually as heat)"], difficulty: 1 },
  { id: "phys-062", topic: "energy-resources", subtopic: "Conservation of Energy", question: "What happens to energy that is 'wasted'?", answer: "It is transferred to less useful stores (usually thermal energy in the surroundings) and dissipated.", keyPoints: ["Wasted energy heats surroundings", "Energy becomes more spread out", "Cannot be easily recovered"], difficulty: 2 },

  // --- Efficiency ---
  { id: "phys-063", topic: "energy-resources", subtopic: "Efficiency", question: "What is the equation for efficiency?", answer: "Efficiency = useful output energy ÷ total input energy × 100%.", keyPoints: ["Can use energy or power in the equation", "Always less than 100% (except ideal cases)", "Higher efficiency = less wasted energy"], difficulty: 1, examTip: "Efficiency can be calculated using either energy or power — the formula is the same." },
  { id: "phys-064", topic: "energy-resources", subtopic: "Efficiency", question: "Why can no device be 100% efficient?", answer: "Some energy is always dissipated as waste heat to the surroundings.", keyPoints: ["Friction, air resistance, sound all waste energy", "Energy spreads out and becomes less useful", "Only theoretical ideal devices could be 100%"], difficulty: 2 },

  // --- Renewable & Non-Renewable Resources ---
  { id: "phys-065", topic: "energy-resources", subtopic: "Renewable & Non-Renewable Resources", question: "What is the difference between renewable and non-renewable energy resources?", answer: "Renewable: replenished naturally and won't run out (e.g. solar, wind). Non-renewable: finite, will run out (e.g. fossil fuels, nuclear).", keyPoints: ["Renewable: solar, wind, hydro, tidal, geothermal, biomass", "Non-renewable: coal, oil, gas, nuclear", "Fossil fuels produce CO₂"], difficulty: 1 },
  { id: "phys-066", topic: "energy-resources", subtopic: "Renewable & Non-Renewable Resources", question: "Give two advantages and two disadvantages of wind energy.", answer: "Advantages: no fuel costs, no CO₂ in operation. Disadvantages: unreliable (depends on wind), visual impact.", keyPoints: ["Free energy source, no pollution during use", "Intermittent — no wind = no power", "Need many turbines to match one power station", "Can affect wildlife and landscapes"], difficulty: 2 },

  // --- Specific Heat Capacity ---
  { id: "phys-067", topic: "energy-resources", subtopic: "Specific Heat Capacity", question: "What is specific heat capacity?", answer: "The energy needed to raise the temperature of 1 kg of a substance by 1°C. E = mcΔθ.", keyPoints: ["E = mcΔθ", "c = specific heat capacity (J/kg°C)", "Water has a high SHC (4200 J/kg°C)"], difficulty: 2, examTip: "Δθ means 'change in temperature'. Always use the CHANGE, not just the final temperature." },
  { id: "phys-068", topic: "energy-resources", subtopic: "Specific Heat Capacity", question: "Why is water used in central heating systems?", answer: "Because water has a high specific heat capacity, so it can store and transfer a lot of thermal energy.", keyPoints: ["High SHC = stores lots of energy per kg", "Releases energy slowly as it cools", "Efficient for distributing heat around buildings"], difficulty: 2 },

  // ═══════════════════════════════════════════════
  // SOLIDS, LIQUIDS & GASES
  // ═══════════════════════════════════════════════

  // --- Particle Model ---
  { id: "phys-069", topic: "solids-liquids-gases", subtopic: "Particle Model", question: "Describe the arrangement and movement of particles in a solid.", answer: "Particles are closely packed in a regular pattern. They vibrate about fixed positions.", keyPoints: ["Fixed positions, regular arrangement", "Strong forces of attraction", "Vibrate but don't move freely"], difficulty: 1 },
  { id: "phys-070", topic: "solids-liquids-gases", subtopic: "Particle Model", question: "How does the particle model explain gas pressure?", answer: "Gas particles move randomly and collide with the walls of the container, exerting a force.", keyPoints: ["Random motion of particles", "Collisions with walls create pressure", "More collisions or faster particles = higher pressure"], difficulty: 2 },
  { id: "phys-071", topic: "solids-liquids-gases", subtopic: "Particle Model", question: "What happens to gas pressure when temperature increases (at constant volume)?", answer: "Pressure increases. Particles move faster, collide more frequently and with more force.", keyPoints: ["Higher temperature = faster particles", "More frequent and harder collisions", "p ∝ T (for constant volume)"], difficulty: 2 },

  // --- Density ---
  { id: "phys-072", topic: "solids-liquids-gases", subtopic: "Density", question: "What is the equation for density?", answer: "Density = mass ÷ volume (ρ = m / V).", keyPoints: ["ρ = m / V", "Measured in kg/m³ or g/cm³", "Solids generally denser than liquids, liquids denser than gases"], difficulty: 1, examTip: "Know how to measure density practically: use a balance for mass and a measuring cylinder for volume." },
  { id: "phys-073", topic: "solids-liquids-gases", subtopic: "Density", question: "How do you measure the density of an irregular solid?", answer: "Measure mass with a balance. Find volume by displacement — submerge in water in a measuring cylinder and read the volume change.", keyPoints: ["Mass: use a balance", "Volume: displacement method", "Density = mass / volume"], difficulty: 2 },

  // --- Pressure in Gases & Liquids ---
  { id: "phys-074", topic: "solids-liquids-gases", subtopic: "Pressure in Gases & Liquids", question: "What is the equation for pressure?", answer: "Pressure = force ÷ area (p = F / A).", keyPoints: ["p = F / A", "Measured in Pascals (Pa)", "1 Pa = 1 N/m²"], difficulty: 1 },
  { id: "phys-075", topic: "solids-liquids-gases", subtopic: "Pressure in Gases & Liquids", question: "What is the equation for pressure in a column of liquid?", answer: "p = hρg (pressure = height × density × gravitational field strength).", keyPoints: ["p = hρg", "Pressure increases with depth", "Depends on density of the liquid"], difficulty: 2 },
  { id: "phys-076", topic: "solids-liquids-gases", subtopic: "Pressure in Gases & Liquids", question: "State Boyle's Law.", answer: "For a fixed mass of gas at constant temperature: pressure × volume = constant (pV = constant).", keyPoints: ["p₁V₁ = p₂V₂", "Increase pressure → decrease volume", "Only at constant temperature"], difficulty: 2, examTip: "Use p₁V₁ = p₂V₂ in calculations. Make sure temperature is constant." },

  // --- Changes of State ---
  { id: "phys-077", topic: "solids-liquids-gases", subtopic: "Changes of State", question: "Name the changes of state.", answer: "Melting (solid→liquid), freezing (liquid→solid), boiling/evaporation (liquid→gas), condensation (gas→liquid), sublimation (solid→gas).", keyPoints: ["Melting and freezing occur at the melting point", "Boiling occurs at the boiling point", "Temperature stays constant during a change of state"], difficulty: 1 },
  { id: "phys-078", topic: "solids-liquids-gases", subtopic: "Changes of State", question: "Why does temperature stay constant during a change of state?", answer: "Energy is used to break or form bonds between particles, not to change their kinetic energy.", keyPoints: ["Energy goes into breaking intermolecular bonds", "No change in kinetic energy = no temperature change", "Called latent heat"], difficulty: 2, examTip: "This is a very common 'explain' question. Say energy is used to overcome forces between particles." },

  // --- Specific & Latent Heat ---
  { id: "phys-079", topic: "solids-liquids-gases", subtopic: "Specific & Latent Heat", question: "What is specific latent heat?", answer: "The energy needed to change the state of 1 kg of a substance without changing its temperature. E = mL.", keyPoints: ["E = mL", "Latent heat of fusion: solid ↔ liquid", "Latent heat of vaporisation: liquid ↔ gas"], difficulty: 2 },
  { id: "phys-080", topic: "solids-liquids-gases", subtopic: "Specific & Latent Heat", question: "What is the difference between specific latent heat of fusion and vaporisation?", answer: "Fusion: energy for solid ↔ liquid change. Vaporisation: energy for liquid ↔ gas change. Vaporisation is always larger.", keyPoints: ["Fusion = melting/freezing", "Vaporisation = boiling/condensing", "Lv > Lf because more bonds broken"], difficulty: 2 },

  // ═══════════════════════════════════════════════
  // MAGNETISM & ELECTROMAGNETISM
  // ═══════════════════════════════════════════════

  // --- Magnets & Magnetic Fields ---
  { id: "phys-081", topic: "magnetism", subtopic: "Magnets & Magnetic Fields", question: "What are the two types of magnetic pole?", answer: "North (N) and South (S).", keyPoints: ["Like poles repel (N-N, S-S)", "Unlike poles attract (N-S)", "All magnets have both poles"], difficulty: 1 },
  { id: "phys-082", topic: "magnetism", subtopic: "Magnets & Magnetic Fields", question: "What is a magnetic field?", answer: "The region around a magnet where a magnetic material or another magnet experiences a force.", keyPoints: ["Field lines go from N to S", "Closer lines = stronger field", "Shown using iron filings or plotting compass"], difficulty: 1 },
  { id: "phys-083", topic: "magnetism", subtopic: "Magnets & Magnetic Fields", question: "Name three magnetic materials.", answer: "Iron, steel (and nickel, cobalt).", keyPoints: ["Iron, nickel, cobalt are magnetic", "Steel is an alloy of iron — also magnetic", "Most other metals (copper, aluminium) are NOT magnetic"], difficulty: 1 },
  { id: "phys-084", topic: "magnetism", subtopic: "Magnets & Magnetic Fields", question: "What is the difference between a permanent and an induced magnet?", answer: "Permanent: always magnetic. Induced: becomes magnetic temporarily when in a magnetic field.", keyPoints: ["Permanent magnets produce their own field", "Induced magnets lose magnetism when removed from field", "Iron is easily magnetised but also easily demagnetised"], difficulty: 2 },

  // --- Electromagnets ---
  { id: "phys-085", topic: "magnetism", subtopic: "Electromagnets", question: "How do you make an electromagnet?", answer: "Wrap a coil of wire around an iron core and pass a current through the wire.", keyPoints: ["Current through wire creates magnetic field", "Iron core strengthens the field", "Can be switched on and off"], difficulty: 1 },
  { id: "phys-086", topic: "magnetism", subtopic: "Electromagnets", question: "How can you increase the strength of an electromagnet?", answer: "Increase the current, increase the number of coils, or use a soft iron core.", keyPoints: ["More current = stronger field", "More turns = stronger field", "Iron core concentrates field lines"], difficulty: 1 },
  { id: "phys-087", topic: "magnetism", subtopic: "Electromagnets", question: "What is the shape of the magnetic field around a solenoid?", answer: "Similar to a bar magnet — with a N pole at one end and S pole at the other.", keyPoints: ["Field lines emerge from one end (N)", "Enter the other end (S)", "Inside the solenoid, field is strong and uniform"], difficulty: 2 },

  // --- The Motor Effect ---
  { id: "phys-088", topic: "magnetism", subtopic: "The Motor Effect", question: "What is the motor effect?", answer: "A current-carrying wire in a magnetic field experiences a force.", keyPoints: ["Force is perpendicular to both current and field", "F = BIl (force = magnetic flux density × current × length)", "Used in electric motors and loudspeakers"], difficulty: 2, examTip: "Use Fleming's Left-Hand Rule: thuMb = Motion, First finger = Field, seCond finger = Current." },
  { id: "phys-089", topic: "magnetism", subtopic: "The Motor Effect", question: "What is Fleming's Left-Hand Rule?", answer: "First finger = Field (N→S), Second finger = Current (conventional), Thumb = Motion (force).", keyPoints: ["Left hand for motors", "All three perpendicular", "Thumb = force on conductor"], difficulty: 2 },

  // --- Electromagnetic Induction ---
  { id: "phys-090", topic: "magnetism", subtopic: "Electromagnetic Induction", question: "What is electromagnetic induction?", answer: "A voltage (and current in a complete circuit) is induced when a conductor moves through a magnetic field or a magnetic field changes.", keyPoints: ["Relative motion between magnet and conductor", "Changing magnetic field through a coil", "This is how generators produce electricity"], difficulty: 2 },
  { id: "phys-091", topic: "magnetism", subtopic: "Electromagnetic Induction", question: "How can you increase the induced voltage?", answer: "Move faster, use a stronger magnet, or increase the number of turns on the coil.", keyPoints: ["Faster movement = larger voltage", "Stronger magnet = larger voltage", "More turns = larger voltage"], difficulty: 2 },

  // --- Transformers ---
  { id: "phys-092", topic: "magnetism", subtopic: "Transformers", question: "What is a transformer?", answer: "A device that changes the voltage of an AC supply using electromagnetic induction.", keyPoints: ["Two coils (primary and secondary) on an iron core", "Only works with AC (alternating current)", "Step-up increases voltage, step-down decreases it"], difficulty: 2 },
  { id: "phys-093", topic: "magnetism", subtopic: "Transformers", question: "What is the transformer equation?", answer: "Vp / Vs = Np / Ns (primary voltage / secondary voltage = primary turns / secondary turns).", keyPoints: ["Vp/Vs = Np/Ns", "More turns on secondary = step-up", "Fewer turns on secondary = step-down"], difficulty: 2, examTip: "For a 100% efficient transformer: VpIp = VsIs. Use this if asked about current." },
  { id: "phys-094", topic: "magnetism", subtopic: "Transformers", question: "Why do transformers only work with AC?", answer: "AC creates a continuously changing magnetic field in the iron core, which is needed to induce a voltage in the secondary coil.", keyPoints: ["DC would create a constant field", "No change in field = no induced voltage", "Changing current → changing field → induced EMF"], difficulty: 3 },

  // ═══════════════════════════════════════════════
  // RADIOACTIVITY & PARTICLES
  // ═══════════════════════════════════════════════

  // --- Atomic Structure ---
  { id: "phys-095", topic: "radioactivity", subtopic: "Atomic Structure", question: "Describe the structure of an atom.", answer: "A small, dense, positive nucleus (protons + neutrons) surrounded by orbiting negative electrons.", keyPoints: ["Nucleus: protons (+1) and neutrons (0)", "Electrons orbit in shells", "Most of the atom is empty space"], difficulty: 1 },
  { id: "phys-096", topic: "radioactivity", subtopic: "Atomic Structure", question: "What is the atomic number and mass number?", answer: "Atomic number = number of protons. Mass number = protons + neutrons.", keyPoints: ["Atomic number (Z) = protons", "Mass number (A) = protons + neutrons", "Number of electrons = protons (in neutral atom)"], difficulty: 1 },
  { id: "phys-097", topic: "radioactivity", subtopic: "Atomic Structure", question: "What is an isotope?", answer: "Atoms of the same element with the same number of protons but different numbers of neutrons.", keyPoints: ["Same element, different mass", "Same atomic number, different mass number", "Some isotopes are radioactive (radioisotopes)"], difficulty: 2 },
  { id: "phys-098", topic: "radioactivity", subtopic: "Atomic Structure", question: "Describe the Rutherford scattering experiment and what it showed.", answer: "Alpha particles fired at gold foil. Most passed through (atom is mostly empty space). Some deflected (positive nucleus). Very few bounced back (nucleus is small and dense).", keyPoints: ["Most alphas went straight through", "Some deflected at large angles", "Proved the nuclear model of the atom"], difficulty: 3, examTip: "Know the three key observations and what each one proves about atomic structure." },

  // --- Types of Radiation ---
  { id: "phys-099", topic: "radioactivity", subtopic: "Types of Radiation", question: "What is alpha (α) radiation?", answer: "A helium nucleus (2 protons + 2 neutrons). Highly ionising, low penetrating power. Stopped by paper or skin.", keyPoints: ["Symbol: ⁴₂He or α", "Charge: +2", "Stopped by paper / few cm of air"], difficulty: 1 },
  { id: "phys-100", topic: "radioactivity", subtopic: "Types of Radiation", question: "What is beta (β) radiation?", answer: "A high-speed electron emitted from the nucleus when a neutron turns into a proton. Moderate ionising power. Stopped by aluminium.", keyPoints: ["Symbol: ⁰₋₁e or β", "Charge: −1", "Stopped by a few mm of aluminium"], difficulty: 1 },
  { id: "phys-101", topic: "radioactivity", subtopic: "Types of Radiation", question: "What is gamma (γ) radiation?", answer: "An electromagnetic wave from the nucleus. Weakly ionising. Very penetrating — only reduced by thick lead or concrete.", keyPoints: ["No mass, no charge", "Travels at speed of light", "Reduced by thick lead or metres of concrete"], difficulty: 1 },
  { id: "phys-102", topic: "radioactivity", subtopic: "Types of Radiation", question: "How do alpha, beta and gamma compare in ionising ability?", answer: "Alpha is most ionising, gamma is least ionising. Beta is in between.", keyPoints: ["α: most ionising, least penetrating", "γ: least ionising, most penetrating", "Ionising power ∝ 1/penetrating power"], difficulty: 2, examTip: "Remember: more ionising = less penetrating. Alpha is large and charged so ionises heavily but is stopped quickly." },

  // --- Half-Life ---
  { id: "phys-103", topic: "radioactivity", subtopic: "Half-Life", question: "What is half-life?", answer: "The time taken for the number of radioactive nuclei (or activity) to halve.", keyPoints: ["Activity halves every half-life", "Radioactive decay is random", "Half-life is constant for a given isotope"], difficulty: 2, examTip: "In calculations, keep halving the activity: after 1 half-life = ½, after 2 = ¼, after 3 = ⅛." },
  { id: "phys-104", topic: "radioactivity", subtopic: "Half-Life", question: "A sample has an activity of 800 Bq and a half-life of 2 hours. What is the activity after 6 hours?", answer: "100 Bq. (6 hours = 3 half-lives: 800 → 400 → 200 → 100).", keyPoints: ["6 ÷ 2 = 3 half-lives", "800 → 400 → 200 → 100", "Activity halves each time"], difficulty: 2 },
  { id: "phys-105", topic: "radioactivity", subtopic: "Half-Life", question: "What is background radiation?", answer: "Low-level radiation that is always present from natural and man-made sources.", keyPoints: ["Natural: radon gas, cosmic rays, rocks, food", "Man-made: medical X-rays, nuclear testing", "Must subtract background from readings"], difficulty: 1 },

  // --- Uses & Hazards of Radiation ---
  { id: "phys-106", topic: "radioactivity", subtopic: "Uses & Hazards of Radiation", question: "Give two uses of radioactive isotopes.", answer: "Medical tracers (gamma), cancer treatment (gamma), smoke detectors (alpha), sterilising equipment (gamma).", keyPoints: ["Medical: tracers and radiotherapy", "Industrial: thickness gauges, sterilisation", "Choice of source depends on type and half-life"], difficulty: 2 },
  { id: "phys-107", topic: "radioactivity", subtopic: "Uses & Hazards of Radiation", question: "Why is alpha radiation used in smoke detectors?", answer: "Alpha ionises the air, creating a current. Smoke absorbs the alpha particles, reducing the current and triggering the alarm.", keyPoints: ["Alpha has short range — absorbed by smoke", "Ionises air between plates", "Drop in current sets off alarm"], difficulty: 3 },
  { id: "phys-108", topic: "radioactivity", subtopic: "Uses & Hazards of Radiation", question: "How should radioactive sources be handled safely?", answer: "Use tongs (not hands), keep at a distance, limit exposure time, store in lead-lined containers.", keyPoints: ["Minimise time, maximise distance", "Use shielding (lead)", "Never point source at people", "Wear protective equipment"], difficulty: 1 },

  // --- Nuclear Fission & Fusion ---
  { id: "phys-109", topic: "radioactivity", subtopic: "Nuclear Fission & Fusion", question: "What is nuclear fission?", answer: "The splitting of a large, unstable nucleus into two smaller nuclei, releasing energy and neutrons.", keyPoints: ["Used in nuclear power stations", "Uranium-235 or Plutonium-239", "Neutrons cause a chain reaction"], difficulty: 2 },
  { id: "phys-110", topic: "radioactivity", subtopic: "Nuclear Fission & Fusion", question: "What is a chain reaction?", answer: "Neutrons released by fission hit other nuclei causing more fission, releasing more neutrons.", keyPoints: ["Each fission releases 2-3 neutrons", "These neutrons cause further fissions", "Control rods absorb neutrons to control the rate"], difficulty: 2, examTip: "In a nuclear reactor, control rods (boron) absorb neutrons to prevent an uncontrolled chain reaction." },
  { id: "phys-111", topic: "radioactivity", subtopic: "Nuclear Fission & Fusion", question: "What is nuclear fusion?", answer: "The joining of two small nuclei to form a larger nucleus, releasing enormous energy.", keyPoints: ["Powers the Sun and stars", "Hydrogen nuclei fuse to form helium", "Requires extremely high temperatures and pressures"], difficulty: 2 },
  { id: "phys-112", topic: "radioactivity", subtopic: "Nuclear Fission & Fusion", question: "Why is fusion difficult to achieve on Earth?", answer: "It requires extremely high temperatures (millions of °C) and pressures to overcome the repulsion between positive nuclei.", keyPoints: ["Nuclei repel each other (both positive)", "Need enormous energy to bring them close enough", "Plasma must be contained — very challenging"], difficulty: 3 },

  // ═══════════════════════════════════════════════
  // ASTROPHYSICS
  // ═══════════════════════════════════════════════

  // --- The Solar System ---
  { id: "phys-113", topic: "astrophysics", subtopic: "The Solar System", question: "List the planets in order from the Sun.", answer: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.", keyPoints: ["Inner rocky planets: Mercury, Venus, Earth, Mars", "Outer gas giants: Jupiter, Saturn, Uranus, Neptune", "Pluto is a dwarf planet"], difficulty: 1 },
  { id: "phys-114", topic: "astrophysics", subtopic: "The Solar System", question: "What keeps the planets in orbit around the Sun?", answer: "Gravity. The gravitational attraction between the Sun and each planet provides the centripetal force.", keyPoints: ["Gravity acts as centripetal force", "Greater mass = stronger gravitational pull", "Closer planets orbit faster"], difficulty: 2 },
  { id: "phys-115", topic: "astrophysics", subtopic: "The Solar System", question: "What is the difference between a star, a planet and a moon?", answer: "Star: produces light by nuclear fusion. Planet: orbits a star, reflects light. Moon: natural satellite orbiting a planet.", keyPoints: ["Stars are luminous (produce own light)", "Planets are non-luminous (reflect light)", "Moons orbit planets"], difficulty: 1 },

  // --- Stellar Evolution ---
  { id: "phys-116", topic: "astrophysics", subtopic: "Stellar Evolution", question: "Describe the life cycle of a star like our Sun.", answer: "Nebula → protostar → main sequence star → red giant → white dwarf → (cools to black dwarf).", keyPoints: ["Formed from clouds of gas and dust (nebula)", "Main sequence: stable, fusion of H to He", "Red giant when hydrogen runs out", "Outer layers shed → planetary nebula + white dwarf"], difficulty: 2, examTip: "Know both pathways: Sun-sized stars → white dwarf. Massive stars → supernova → neutron star or black hole." },
  { id: "phys-117", topic: "astrophysics", subtopic: "Stellar Evolution", question: "What happens to a star much more massive than the Sun?", answer: "Nebula → protostar → main sequence → red supergiant → supernova → neutron star or black hole.", keyPoints: ["Massive stars explode as supernovae", "Core collapses into neutron star or black hole", "Heavy elements are created and scattered"], difficulty: 2 },
  { id: "phys-118", topic: "astrophysics", subtopic: "Stellar Evolution", question: "What is a supernova?", answer: "A massive explosion at the end of a large star's life, where outer layers are thrown off into space.", keyPoints: ["Occurs when a massive star runs out of fuel", "Core collapses rapidly", "Creates and distributes heavy elements"], difficulty: 2 },

  // --- The Big Bang & Red Shift ---
  { id: "phys-119", topic: "astrophysics", subtopic: "The Big Bang & Red Shift", question: "What is red shift?", answer: "The increase in wavelength (shift towards red) of light from galaxies moving away from us.", keyPoints: ["Light stretched as source moves away", "Greater red shift = faster recession", "Evidence that the universe is expanding"], difficulty: 2, examTip: "Red shift supports the Big Bang theory because it shows all galaxies are moving apart." },
  { id: "phys-120", topic: "astrophysics", subtopic: "The Big Bang & Red Shift", question: "What is the Big Bang theory?", answer: "The universe began from a very small, extremely hot and dense point about 13.8 billion years ago and has been expanding ever since.", keyPoints: ["All matter and energy originated from one point", "Universe has been expanding and cooling since", "Supported by red shift and CMBR"], difficulty: 1 },
  { id: "phys-121", topic: "astrophysics", subtopic: "The Big Bang & Red Shift", question: "What is the Cosmic Microwave Background Radiation (CMBR)?", answer: "Low-frequency microwave radiation detected from all directions in space — the 'afterglow' of the Big Bang.", keyPoints: ["Discovered in 1965 by Penzias and Wilson", "Uniform in all directions", "Key evidence for the Big Bang theory"], difficulty: 2 },

  // --- Orbits & Gravity ---
  { id: "phys-122", topic: "astrophysics", subtopic: "Orbits & Gravity", question: "What determines the speed of an orbiting object?", answer: "Its distance from the body it orbits. Closer objects orbit faster.", keyPoints: ["Closer to central body = faster orbit", "Inner planets orbit faster than outer planets", "Gravity provides the centripetal force"], difficulty: 2 },
  { id: "phys-123", topic: "astrophysics", subtopic: "Orbits & Gravity", question: "What is a geostationary orbit?", answer: "An orbit directly above the equator with a period of exactly 24 hours, so the satellite stays above the same point on Earth.", keyPoints: ["Period = 24 hours", "Above the equator", "Used for communications and weather satellites"], difficulty: 2 },
  { id: "phys-124", topic: "astrophysics", subtopic: "Orbits & Gravity", question: "What is a polar orbit?", answer: "A low orbit passing over both poles. The satellite sees different parts of Earth as it rotates underneath.", keyPoints: ["Low altitude, fast orbit", "Passes over poles", "Used for mapping and monitoring"], difficulty: 2 },
];
