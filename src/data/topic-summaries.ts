export interface TopicSummary {
  topicId: string;
  subject: "biology" | "chemistry";
  title: string;
  sections: SummarySection[];
}

export interface SummarySection {
  heading: string;
  content: string;
  keyTerms?: { term: string; definition: string }[];
  importantEquations?: string[];
  tables?: { title: string; headers: string[]; rows: string[][] }[];
}

export const topicSummaries: TopicSummary[] = [
  // =====================================================================
  // TOPIC 1: CELL BIOLOGY
  // =====================================================================
  {
    topicId: "cells",
    subject: "biology",
    title: "Cell Biology",
    sections: [
      {
        heading: "Cell Structure",
        content:
          "All living things are made of cells. There are two main types of cell: eukaryotic cells (animal and plant cells) and prokaryotic cells (bacteria).\n\nAnimal cells contain a nucleus (holds DNA and controls the cell), cytoplasm (where chemical reactions happen), a cell membrane (controls what enters and leaves), mitochondria (where aerobic respiration occurs to release energy), and ribosomes (where proteins are made).\n\nPlant cells have all of the above plus a cell wall (made of cellulose for support and strength), a permanent vacuole (filled with cell sap to keep the cell firm), and chloroplasts (containing chlorophyll for photosynthesis).\n\nBacterial cells are much smaller and simpler. They have a cell membrane, cell wall, cytoplasm, ribosomes, and a single loop of DNA that floats freely in the cytoplasm (there is no nucleus). Some bacteria also have small rings of DNA called plasmids and a flagellum (tail) for movement.\n\nThe key difference between eukaryotic and prokaryotic cells is that eukaryotic cells have a nucleus containing their DNA, while prokaryotic cells do not. Prokaryotic cells are also generally much smaller, typically around 1-5 micrometres compared to 10-100 micrometres for eukaryotic cells.",
        keyTerms: [
          { term: "Eukaryotic cell", definition: "A cell with a nucleus (e.g. animal, plant, fungal cells)" },
          { term: "Prokaryotic cell", definition: "A cell without a nucleus (e.g. bacteria)" },
          { term: "Nucleus", definition: "Contains DNA and controls cell activities" },
          { term: "Mitochondria", definition: "Where aerobic respiration takes place to release energy" },
          { term: "Ribosome", definition: "Where protein synthesis (making proteins) occurs" },
          { term: "Chloroplast", definition: "Contains chlorophyll and is the site of photosynthesis in plant cells" },
          { term: "Plasmid", definition: "Small ring of extra DNA found in bacterial cells" },
        ],
      },
      {
        heading: "Microscopes & Magnification",
        content:
          "Microscopes allow us to see things too small for the naked eye. There are two main types: light microscopes and electron microscopes.\n\nLight microscopes use light and glass lenses. They can magnify up to about x1500 and have a maximum resolution of about 200 nm. They are cheaper, smaller, and can be used to view living specimens. You can see cells, nuclei, and chloroplasts.\n\nElectron microscopes use beams of electrons instead of light. They can magnify up to x2,000,000 and have a much better resolution (around 0.2 nm). This means they can reveal much finer detail, including ribosomes, mitochondria internal structure, and cell membranes. However, they are very expensive, very large, and samples must be dead (placed in a vacuum).\n\nResolution is the ability to distinguish between two points that are very close together. Higher resolution means more detail. Electron microscopes have much higher resolution than light microscopes.\n\nThe magnification formula is: Magnification = Image size / Actual size (M = I / A). You can rearrange this using the triangle: Image size = Magnification x Actual size, and Actual size = Image size / Magnification.\n\nWhen using this formula, make sure both measurements are in the same units. To convert: 1 mm = 1000 micrometres (um). Always show your working and include units in your answer.",
        keyTerms: [
          { term: "Magnification", definition: "How many times larger the image is compared to the real object" },
          { term: "Resolution", definition: "The ability to distinguish between two points close together; the smallest distance apart two objects can be and still be seen as separate" },
        ],
        importantEquations: [
          "Magnification = Image size / Actual size (M = I / A)",
          "Image size = Magnification x Actual size",
          "Actual size = Image size / Magnification",
          "1 mm = 1000 um (micrometres)",
        ],
      },
      {
        heading: "Cell Division",
        content:
          "Cells divide for growth, repair, and reproduction. Before a cell divides, it goes through the cell cycle.\n\nThe cell cycle has three main stages. First, the cell grows and increases the number of organelles (like mitochondria and ribosomes). The DNA is also replicated (copied) so there are two copies of every chromosome. Second, during mitosis, the cell divides its nucleus into two identical nuclei. Third, the cytoplasm and cell membrane divide to produce two identical daughter cells.\n\nMitosis produces two genetically identical diploid cells (cells with the full number of chromosomes). It is used for growth, repair of damaged tissue, and asexual reproduction.\n\nThe stages of mitosis can be remembered as PMAT: Prophase (chromosomes condense and become visible, nuclear membrane breaks down), Metaphase (chromosomes line up along the middle of the cell), Anaphase (chromosomes are pulled apart to opposite ends of the cell), Telophase (nuclear membranes form around each set of chromosomes, cytoplasm divides).\n\nMeiosis is different from mitosis. It produces four genetically different haploid cells (cells with half the number of chromosomes). Meiosis involves two divisions. It is used to make gametes (sex cells: sperm and eggs). Meiosis introduces genetic variation because chromosomes are shuffled and sections of DNA can be swapped between chromosome pairs (crossing over).",
        keyTerms: [
          { term: "Mitosis", definition: "Cell division that produces two genetically identical diploid cells" },
          { term: "Meiosis", definition: "Cell division that produces four genetically different haploid cells (gametes)" },
          { term: "Diploid", definition: "A cell with the full set of chromosomes (46 in humans)" },
          { term: "Haploid", definition: "A cell with half the number of chromosomes (23 in humans)" },
          { term: "Gamete", definition: "A sex cell (sperm or egg) — haploid" },
        ],
      },
      {
        heading: "Transport in Cells",
        content:
          "Substances move in and out of cells by three main methods: diffusion, osmosis, and active transport.\n\nDiffusion is the net movement of particles from an area of higher concentration to an area of lower concentration (down a concentration gradient). It is a passive process, meaning it does not require energy. Examples include oxygen and carbon dioxide moving in and out of cells, and the absorption of digested food in the small intestine. Fick's Law states that the rate of diffusion is proportional to: (surface area x concentration difference) / thickness of membrane. So diffusion is faster when: the surface area is larger, the concentration gradient is steeper, and the distance is shorter.\n\nOsmosis is the movement of water molecules from a dilute solution (high water concentration) to a concentrated solution (low water concentration) through a partially permeable membrane. It is also passive. If a plant cell loses too much water it becomes plasmolysed (membrane pulls away from wall). If an animal cell gains too much water it can burst (lyse).\n\nActive transport moves substances from a lower concentration to a higher concentration (against the concentration gradient). It requires energy from respiration. Examples include root hair cells absorbing mineral ions from the soil and glucose being absorbed from the gut into the blood.",
        keyTerms: [
          { term: "Diffusion", definition: "Net movement of particles from high to low concentration; passive, no energy needed" },
          { term: "Osmosis", definition: "Movement of water molecules from dilute to concentrated solution through a partially permeable membrane" },
          { term: "Active transport", definition: "Movement of substances from low to high concentration, against the gradient; requires energy from respiration" },
          { term: "Concentration gradient", definition: "The difference in concentration between two areas" },
          { term: "Partially permeable membrane", definition: "A membrane that only allows certain molecules through" },
        ],
        importantEquations: [
          "Rate of diffusion is proportional to (surface area x concentration difference) / thickness of membrane (Fick's Law)",
        ],
      },
      {
        heading: "Cell Specialisation",
        content:
          "Most cells in the body are specialised, meaning they have a specific structure adapted for a particular function. Cells become specialised through differentiation, where they develop particular features.\n\nRed blood cells (RBCs) carry oxygen around the body. They have a biconcave disc shape to give a large surface area for absorbing oxygen. They contain haemoglobin which binds to oxygen. They have no nucleus so there is more room for haemoglobin.\n\nRoot hair cells absorb water and mineral ions from the soil. They have a long hair-like extension that increases the surface area for absorption. They have lots of mitochondria to provide energy for active transport of minerals.\n\nSperm cells are designed to reach and fertilise an egg. They have a streamlined head to swim efficiently, a tail (flagellum) for movement, lots of mitochondria in the middle section to provide energy for swimming, and an acrosome at the tip containing enzymes to digest the egg membrane.\n\nNerve cells (neurones) carry electrical impulses around the body. They are very long to cover large distances, have branched endings (dendrites) to connect to other neurones, and have a myelin sheath (fatty covering) that insulates the cell and speeds up the impulse.\n\nMuscle cells contract to cause movement. They contain lots of mitochondria to release energy for contraction and are packed with protein fibres that can slide over each other to shorten the cell.",
        keyTerms: [
          { term: "Differentiation", definition: "The process by which a cell becomes specialised for a particular function" },
          { term: "Haemoglobin", definition: "The protein in red blood cells that binds to oxygen" },
          { term: "Myelin sheath", definition: "Fatty insulating layer around nerve cells that speeds up electrical impulses" },
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 2: ORGANISATION
  // =====================================================================
  {
    topicId: "organisation",
    subject: "biology",
    title: "Organisation",
    sections: [
      {
        heading: "Levels of Organisation",
        content:
          "Living organisms are organised into a hierarchy of structures, from the simplest to the most complex.\n\nCells are the basic building blocks of life. A group of similar cells working together form a tissue. For example, muscle cells group together to form muscle tissue. A group of different tissues working together form an organ. For example, the stomach is an organ made of muscle tissue, glandular tissue (which makes enzymes and acid), and epithelial tissue (which covers the surface).\n\nA group of organs working together form an organ system. For example, the digestive system is made up of the mouth, oesophagus, stomach, small intestine, large intestine, liver, and pancreas, all working together to digest food. A group of organ systems working together make up an organism.\n\nSo the order is: Cells -> Tissues -> Organs -> Organ Systems -> Organism.\n\nIn plants, the organisation is similar. Plant organs include leaves, stems, and roots. Leaf tissues include epidermal tissue (upper and lower surface), palisade mesophyll (where most photosynthesis happens), spongy mesophyll (with air spaces for gas exchange), xylem (transports water up), and phloem (transports sugars around the plant).",
        keyTerms: [
          { term: "Tissue", definition: "A group of similar cells working together to carry out a function" },
          { term: "Organ", definition: "A group of different tissues working together to carry out a function" },
          { term: "Organ system", definition: "A group of organs working together to carry out a major function" },
        ],
      },
      {
        heading: "Digestive System",
        content:
          "The digestive system breaks down large, insoluble food molecules into small, soluble ones that can be absorbed into the blood.\n\nEnzymes are biological catalysts — they speed up chemical reactions without being used up. They work by the lock and key model: the substrate (the molecule being broken down) fits into the enzyme's active site like a key fits a lock. Each enzyme is specific to one substrate. Enzymes have an optimum temperature (around 37 degrees C for human enzymes) and optimum pH. If conditions are too extreme, the enzyme denatures — its active site changes shape so the substrate can no longer fit.\n\nThe main digestive enzymes are: Amylase (breaks down starch into sugars, made in salivary glands, pancreas, and small intestine), Protease (breaks down proteins into amino acids, made in the stomach as pepsin, pancreas, and small intestine), and Lipase (breaks down fats/lipids into fatty acids and glycerol, made in the pancreas and small intestine).\n\nThe stomach produces hydrochloric acid (HCl) which kills bacteria and provides a low pH (acidic) environment for pepsin to work. The pancreas makes all three enzymes and releases them into the small intestine. Bile is made in the liver, stored in the gall bladder, and released into the small intestine. Bile is alkaline to neutralise stomach acid and it emulsifies fats (breaks large fat droplets into smaller ones) to increase surface area for lipase.\n\nThe small intestine is where most absorption happens. It is adapted with villi (tiny finger-like projections) that give a large surface area, a thin wall (one cell thick) for short diffusion distance, a good blood supply to maintain the concentration gradient, and lacteals to absorb fatty acids and glycerol.",
        keyTerms: [
          { term: "Enzyme", definition: "A biological catalyst that speeds up reactions; has a specific active site for its substrate" },
          { term: "Active site", definition: "The part of the enzyme where the substrate fits and the reaction happens" },
          { term: "Denature", definition: "When an enzyme's active site changes shape (due to high temp or wrong pH) so the substrate no longer fits" },
          { term: "Bile", definition: "Made in the liver, stored in the gall bladder; neutralises acid and emulsifies fats" },
          { term: "Villi", definition: "Tiny finger-like projections in the small intestine that increase surface area for absorption" },
        ],
        importantEquations: [
          "Starch --(amylase)--> Sugars (maltose)",
          "Protein --(protease)--> Amino acids",
          "Lipids --(lipase)--> Fatty acids + Glycerol",
        ],
      },
      {
        heading: "Blood & Heart",
        content:
          "Blood is a tissue made of four components. Red blood cells carry oxygen using haemoglobin. White blood cells fight infection (by phagocytosis, producing antibodies, and making antitoxins). Platelets are cell fragments that help blood clot at wound sites to prevent blood loss and entry of pathogens. Plasma is the liquid part that carries everything else: dissolved glucose, amino acids, carbon dioxide, urea, hormones, antibodies, and heat.\n\nThe heart is a double pump. The right side pumps deoxygenated blood to the lungs (pulmonary circulation). The left side pumps oxygenated blood to the rest of the body (systemic circulation). Blood flow path: body -> vena cava -> right atrium -> right ventricle -> pulmonary artery -> lungs -> pulmonary vein -> left atrium -> left ventricle -> aorta -> body. The left ventricle has a thicker muscular wall because it needs to pump blood at higher pressure all around the body. Valves prevent blood flowing backwards.\n\nThere are three types of blood vessel. Arteries carry blood away from the heart at high pressure — they have thick, muscular, elastic walls and a small lumen (central hole). Veins carry blood back to the heart at low pressure — they have thinner walls, a larger lumen, and valves to prevent backflow. Capillaries connect arteries to veins at the tissues — they have walls only one cell thick to allow substances to diffuse in and out easily.\n\nCoronary heart disease (CHD) occurs when the coronary arteries (which supply blood to the heart muscle) get blocked by fatty deposits. This reduces blood flow and oxygen supply to the heart muscle. Treatments include stents (wire mesh tubes inserted to hold the artery open) and statins (drugs that lower cholesterol to reduce fatty build-up).",
        keyTerms: [
          { term: "Plasma", definition: "The liquid part of blood; carries dissolved substances, blood cells, and heat" },
          { term: "Coronary arteries", definition: "Blood vessels that supply the heart muscle itself with oxygenated blood" },
          { term: "Stent", definition: "A wire mesh tube inserted into a blocked artery to hold it open" },
          { term: "Statin", definition: "A drug that lowers blood cholesterol levels" },
        ],
      },
      {
        heading: "Lungs & Gas Exchange",
        content:
          "The lungs are the organs of gas exchange. When you breathe in, oxygen moves from the air in the alveoli into the blood, and carbon dioxide moves from the blood into the air in the alveoli to be breathed out.\n\nThe alveoli (tiny air sacs) are specially adapted for efficient gas exchange. They have a huge surface area (about 70 m squared in total). Their walls are only one cell thick, giving a very short diffusion distance. They have a rich blood supply — a network of capillaries surrounds each alveolus to maintain a steep concentration gradient. The walls are also moist, which helps gases dissolve and diffuse across.\n\nThe breathing mechanism works by changing the volume and pressure inside the chest. When you breathe in (inhale): the intercostal muscles contract and the ribs move up and out, the diaphragm contracts and flattens, the volume of the chest cavity increases, the pressure inside decreases, and air rushes into the lungs. When you breathe out (exhale): the intercostal muscles relax and the ribs move down and in, the diaphragm relaxes and domes upwards, the volume decreases, the pressure increases, and air is pushed out.\n\nGas exchange in the alveoli happens by diffusion. Oxygen diffuses from the alveolar air (high concentration) into the blood (low concentration). Carbon dioxide diffuses from the blood (high concentration) into the alveolar air (low concentration). The blood arriving at the alveoli is deoxygenated and the blood leaving is oxygenated.",
        keyTerms: [
          { term: "Alveoli", definition: "Tiny air sacs in the lungs where gas exchange takes place (singular: alveolus)" },
          { term: "Diaphragm", definition: "A sheet of muscle below the lungs that helps with breathing" },
          { term: "Intercostal muscles", definition: "Muscles between the ribs that help with breathing" },
        ],
      },
      {
        heading: "Non-Communicable Diseases",
        content:
          "Non-communicable diseases (NCDs) are diseases that cannot be passed from person to person. They are often caused by lifestyle or genetic factors. The main NCDs you need to know about are cardiovascular disease (CVD) and cancer.\n\nRisk factors for cardiovascular disease include: smoking (damages blood vessel walls and increases blood pressure), high-fat diet (leads to fatty deposits in arteries), lack of exercise (increases blood pressure and cholesterol), obesity (puts extra strain on the heart), excessive alcohol consumption (increases blood pressure), and genetics/family history. These risk factors often interact — for example, a high-fat diet combined with lack of exercise is more dangerous than either alone.\n\nCancer occurs when cells divide uncontrollably, forming a tumour. There are two types of tumour. Benign tumours grow slowly, are contained in one area (often by a membrane), do not invade other tissues, and are not usually dangerous unless they press on something vital. Malignant tumours grow rapidly, invade neighbouring tissues, and can spread to other parts of the body through the blood or lymph system. This spreading is called metastasis, and it makes the cancer much harder to treat.\n\nRisk factors for cancer include: smoking (lung cancer), UV radiation and sunburn (skin cancer), obesity (bowel, liver, and kidney cancers), excessive alcohol (liver cancer), and viral infections (e.g. HPV can cause cervical cancer). Not all risk factors are within a person's control — genetics can also play a role.",
        keyTerms: [
          { term: "Non-communicable disease", definition: "A disease that cannot spread between people; caused by lifestyle or genetic factors" },
          { term: "Benign tumour", definition: "A growth of cells that stays in one place and does not spread" },
          { term: "Malignant tumour", definition: "A cancerous growth that can invade other tissues and spread around the body (metastasis)" },
          { term: "Risk factor", definition: "Something that increases the likelihood of developing a disease" },
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 3: BIOENERGETICS
  // =====================================================================
  {
    topicId: "bioenergetics",
    subject: "biology",
    title: "Bioenergetics",
    sections: [
      {
        heading: "Photosynthesis",
        content:
          "Photosynthesis is the process by which plants (and algae) use light energy to convert carbon dioxide and water into glucose and oxygen. It is an endothermic reaction (takes in energy). Photosynthesis happens in the chloroplasts, which contain the green pigment chlorophyll that absorbs light energy.\n\nThe word equation is: carbon dioxide + water --(light energy)--> glucose + oxygen. The balanced symbol equation is: 6CO2 + 6H2O --(light)--> C6H12O6 + 6O2.\n\nPlants use the glucose they make in several ways: for respiration (to release energy), to make cellulose (for cell walls), to make amino acids (combined with nitrate ions from soil) for protein synthesis, to make lipids/fats (for energy storage and cell membranes), and to make starch (for energy storage — starch is insoluble so it does not affect osmosis). You can test for starch using iodine solution, which turns from orange-brown to blue-black if starch is present.\n\nThe rate of photosynthesis can be limited by three main factors: light intensity, carbon dioxide concentration, and temperature. Increasing light or CO2 increases the rate up to a point, after which another factor becomes limiting. Temperature affects enzyme activity — too cold means slow reactions, too hot and enzymes denature.\n\nGreenhouses can be used to control these limiting factors. Artificial lighting extends photosynthesis, heaters maintain optimal temperature, and adding CO2 (e.g. from paraffin heaters) increases CO2 concentration. This maximises crop growth.\n\nThe inverse square law tells us that light intensity is inversely proportional to the square of the distance from the light source. So if you double the distance, light intensity drops to a quarter.",
        keyTerms: [
          { term: "Photosynthesis", definition: "The process plants use to convert CO2 and water into glucose and oxygen using light energy" },
          { term: "Chlorophyll", definition: "Green pigment in chloroplasts that absorbs light energy for photosynthesis" },
          { term: "Limiting factor", definition: "A factor that limits the rate of a reaction when it is in short supply" },
          { term: "Endothermic", definition: "A reaction that takes in (absorbs) energy from the surroundings" },
        ],
        importantEquations: [
          "Carbon dioxide + Water --(light energy)--> Glucose + Oxygen",
          "6CO2 + 6H2O --(light)--> C6H12O6 + 6O2",
          "Light intensity is inversely proportional to distance squared: Light intensity = 1/d^2",
          "Iodine test: orange-brown iodine turns blue-black in the presence of starch",
        ],
      },
      {
        heading: "Respiration",
        content:
          "Respiration is the chemical process that releases energy from glucose in every living cell. It happens continuously in all living organisms. The energy released is used for: muscle contraction (movement), maintaining body temperature, building larger molecules from smaller ones (e.g. proteins from amino acids), active transport of substances across cell membranes, and sending nerve impulses.\n\nAerobic respiration uses oxygen. It takes place in the mitochondria and releases a large amount of energy. The word equation is: glucose + oxygen --> carbon dioxide + water (+ energy). The symbol equation is: C6H12O6 + 6O2 --> 6CO2 + 6H2O. It is an exothermic reaction (releases energy).\n\nAnaerobic respiration happens when there is not enough oxygen available, such as during vigorous exercise. In animals, the equation is: glucose --> lactic acid (+ some energy). It releases much less energy than aerobic respiration. The build-up of lactic acid in muscles causes pain and fatigue. After exercise, you continue to breathe heavily to take in extra oxygen — this is called the oxygen debt. The extra oxygen is used to break down the lactic acid, which is transported to the liver to be converted back to glucose.\n\nIn yeast and plant cells, anaerobic respiration is called fermentation. The equation is: glucose --> ethanol + carbon dioxide (+ some energy). This process is used in brewing (to make alcohol) and baking (the CO2 makes bread rise).\n\nAerobic respiration is much more efficient than anaerobic respiration because it fully breaks down glucose and releases more energy per molecule of glucose.",
        keyTerms: [
          { term: "Aerobic respiration", definition: "Respiration using oxygen; releases a lot of energy; occurs in mitochondria" },
          { term: "Anaerobic respiration", definition: "Respiration without oxygen; releases less energy; produces lactic acid (animals) or ethanol + CO2 (yeast)" },
          { term: "Oxygen debt", definition: "The extra oxygen needed after exercise to break down lactic acid" },
          { term: "Fermentation", definition: "Anaerobic respiration in yeast/plants; produces ethanol and carbon dioxide" },
          { term: "Exothermic", definition: "A reaction that releases energy to the surroundings" },
        ],
        importantEquations: [
          "Aerobic: Glucose + Oxygen --> Carbon dioxide + Water (+ energy)",
          "Aerobic: C6H12O6 + 6O2 --> 6CO2 + 6H2O",
          "Anaerobic (animals): Glucose --> Lactic acid (+ some energy)",
          "Anaerobic (yeast/fermentation): Glucose --> Ethanol + Carbon dioxide (+ some energy)",
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 4: INFECTION & RESPONSE
  // =====================================================================
  {
    topicId: "infection",
    subject: "biology",
    title: "Infection & Response",
    sections: [
      {
        heading: "Pathogens & Disease",
        content:
          "Pathogens are microorganisms that cause infectious disease. There are four types of pathogen: bacteria, viruses, fungi, and protists.\n\nBacteria are very small prokaryotic cells that reproduce rapidly inside the body. They produce toxins (poisons) that damage cells and make you feel ill. Examples: Salmonella (food poisoning — causes fever, vomiting, diarrhoea), E. coli (food poisoning), Gonorrhoea (STI — causes discharge and pain), and Tuberculosis (TB — affects the lungs).\n\nViruses are even smaller than bacteria and are not truly alive. They invade cells, take over the cell's machinery to replicate (copy) themselves, and then burst out of the cell, destroying it. This cell damage makes you feel ill. Examples: HIV (attacks immune cells, can lead to AIDS), Measles (fever and rash, spread by droplets), Tobacco Mosaic Virus (TMV — affects plant leaves causing discolouration), and Influenza (flu).\n\nFungi can be single-celled or multi-celled. Example: Athlete's foot (causes itchy, flaky skin on feet), and Rose black spot (fungus affecting plant leaves, spread by wind/water).\n\nProtists are single-celled eukaryotic organisms. Example: Plasmodium (causes malaria — spread by mosquito vectors, the mosquito carries the protist between humans).\n\nPathogens spread by: direct contact (touching), droplets in the air (coughing/sneezing), contaminated water or food, and by vectors (organisms that carry pathogens, like mosquitoes). To reduce the spread of disease: practise good hygiene (hand washing), use condoms (STIs), isolate infected people, kill or control vectors, vaccinate, cook food properly, and treat drinking water.",
        keyTerms: [
          { term: "Pathogen", definition: "A microorganism that causes disease (bacteria, virus, fungus, or protist)" },
          { term: "Toxin", definition: "A poison produced by bacteria that causes damage and illness" },
          { term: "Vector", definition: "An organism that carries and spreads a pathogen without getting the disease itself (e.g. mosquitoes)" },
          { term: "Communicable disease", definition: "A disease that can be spread from person to person (infectious disease)" },
        ],
      },
      {
        heading: "Human Defence Systems",
        content:
          "The body has several lines of defence to stop pathogens entering and to destroy them if they get in.\n\nNon-specific defences stop pathogens from getting into the body in the first place. The skin acts as a physical barrier — it is tough and waterproof and blocks most pathogens. If the skin is cut, blood clots quickly to seal the wound. The nose has hairs and sticky mucus to trap particles and pathogens. The trachea and bronchi are lined with mucus and cilia (tiny hairs) — mucus traps pathogens and cilia sweep them up to the throat to be swallowed. The stomach produces hydrochloric acid which kills most pathogens that are swallowed. Tears and saliva contain lysozyme, an enzyme that destroys bacteria.\n\nIf pathogens do get through these defences, white blood cells (WBCs) of the immune system attack them. White blood cells defend the body in three main ways:\n\n1. Phagocytosis — phagocytes surround, engulf, and digest (eat) the pathogen. This is a non-specific response.\n\n2. Antibody production — lymphocytes recognise the antigens (unique marker proteins) on the surface of a pathogen. They produce specific antibodies that lock onto these antigens and destroy the pathogen. Each pathogen has a unique antigen, so a specific antibody is needed for each one.\n\n3. Antitoxin production — some white blood cells produce antitoxins that neutralise the toxins produced by bacteria.\n\nAfter fighting an infection, some lymphocytes remain in the blood as memory cells, so the body can respond faster if the same pathogen enters again.",
        keyTerms: [
          { term: "Phagocytosis", definition: "When a white blood cell surrounds and engulfs (eats) a pathogen" },
          { term: "Antibody", definition: "A specific protein produced by lymphocytes that locks onto antigens on a pathogen" },
          { term: "Antigen", definition: "A unique protein on the surface of a pathogen that triggers an immune response" },
          { term: "Antitoxin", definition: "A substance produced by white blood cells that neutralises toxins from bacteria" },
          { term: "Memory cell", definition: "A lymphocyte that remains after infection and allows a faster response if the same pathogen returns" },
        ],
      },
      {
        heading: "Vaccination & Drugs",
        content:
          "Vaccination involves injecting a small amount of dead or weakened (inactive) pathogen into the body. The pathogen's antigens stimulate the white blood cells to produce specific antibodies. Memory cells are created. If the real pathogen enters later, memory cells recognise the antigen and produce the correct antibodies much faster and in larger quantities, preventing illness. The person is now immune.\n\nVaccination does not make you ill because the pathogen is dead or weakened. It protects both the individual and the population — if enough people are vaccinated, herd immunity occurs, meaning the disease cannot spread easily, which protects those who cannot be vaccinated (e.g. very young babies or those with immune conditions).\n\nAntibiotics are drugs that kill or stop the growth of bacteria inside the body. They work by interfering with bacterial cell processes (like cell wall formation) without damaging human cells. Antibiotics do NOT work against viruses because viruses live inside your own cells and do not have their own cell machinery.\n\nPainkillers treat the symptoms of disease (e.g. reduce pain and fever) but do not kill pathogens. They make you feel better but do not cure the disease.\n\nAntibiotic resistance is a major concern. When antibiotics are overused or courses are not completed, random mutations can produce bacteria that are resistant to the antibiotic. These resistant bacteria survive and reproduce (natural selection), passing on the resistance gene. Over time, the whole population becomes resistant. MRSA is an example of an antibiotic-resistant bacterium. To slow resistance: only prescribe antibiotics when necessary, always finish the full course, and develop new antibiotics.",
        keyTerms: [
          { term: "Vaccination", definition: "Injecting dead/weakened pathogens to stimulate the immune system and create memory cells" },
          { term: "Herd immunity", definition: "When enough people are vaccinated that a disease cannot spread, protecting unvaccinated individuals" },
          { term: "Antibiotic", definition: "A drug that kills or stops the growth of bacteria (does NOT work on viruses)" },
          { term: "Antibiotic resistance", definition: "When bacteria evolve through natural selection to survive antibiotic treatment" },
        ],
      },
      {
        heading: "Monoclonal Antibodies",
        content:
          "Monoclonal antibodies are identical copies of a single type of antibody. They are produced in the laboratory and can be designed to target specific molecules or cells.\n\nTo produce monoclonal antibodies: First, a mouse is injected with the target antigen, and the mouse's immune system produces lymphocytes that make the desired antibody. These lymphocytes are removed from the mouse and fused with tumour cells (which divide rapidly and indefinitely) to create hybrid cells called hybridoma cells. The hybridoma cells divide quickly to produce large quantities of the same antibody — these are the monoclonal antibodies. The cells are then cloned (copied) and the antibodies are collected and purified.\n\nMonoclonal antibodies have several important uses:\n\nPregnancy tests — monoclonal antibodies in the test strip bind to the hormone HCG (human chorionic gonadotrophin) in urine. If HCG is present (woman is pregnant), the antibody-HCG complex causes a colour change on the test strip.\n\nDiagnosing diseases — monoclonal antibodies can be used to locate specific molecules on cells. For example, they can bind to cancer cell antigens to help diagnose the type and location of cancer.\n\nTreating diseases — monoclonal antibodies can be designed to target cancer cells specifically. They can carry drugs, radioactive substances, or chemicals directly to cancer cells to destroy them while causing less damage to normal cells than traditional chemotherapy.\n\nMonoclonal antibodies can cause side effects because they create more side effects than expected during clinical trials, which has limited their use so far.",
        keyTerms: [
          { term: "Monoclonal antibodies", definition: "Identical antibodies produced from a single clone of cells, designed to target one specific protein/antigen" },
          { term: "Hybridoma cell", definition: "A cell made by fusing a lymphocyte with a tumour cell; divides rapidly and produces antibodies" },
          { term: "HCG", definition: "Human chorionic gonadotrophin; the hormone detected by pregnancy tests" },
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 5: HOMEOSTASIS
  // =====================================================================
  {
    topicId: "homeostasis",
    subject: "biology",
    title: "Homeostasis",
    sections: [
      {
        heading: "Nervous System",
        content:
          "Homeostasis is the regulation of internal conditions of a cell or organism to maintain optimum conditions for function, in response to internal and external changes. The body must control its internal environment to keep conditions like temperature, blood glucose, and water levels within narrow limits. This ensures enzymes can work at their optimum.\n\nThe nervous system allows the body to respond quickly to changes in the environment. It works using electrical impulses. The pathway is: Stimulus -> Receptor -> Sensory neurone -> CNS (brain/spinal cord) -> Motor neurone -> Effector -> Response. Receptors detect stimuli (changes in the environment). The CNS (Central Nervous System) consists of the brain and spinal cord and processes the information. Effectors carry out a response — they are either muscles (which contract) or glands (which secrete hormones/chemicals).\n\nReflex actions are automatic, rapid, involuntary responses designed to protect the body. They do not involve conscious thought. The reflex arc pathway is: Receptor -> Sensory neurone -> Relay neurone (in the spinal cord) -> Motor neurone -> Effector. For example, touching a hot plate: pain receptors detect heat, impulse travels along sensory neurone to spinal cord, relay neurone passes impulse to motor neurone, motor neurone sends impulse to muscle (effector), muscle contracts to pull hand away.\n\nAt the junctions between neurones there are tiny gaps called synapses. Electrical impulses cannot cross synapses directly. Instead, the impulse triggers the release of chemical neurotransmitters that diffuse across the gap and trigger a new electrical impulse in the next neurone.",
        keyTerms: [
          { term: "Homeostasis", definition: "Maintaining a constant internal environment at optimal conditions for cell function" },
          { term: "Receptor", definition: "A cell or structure that detects a stimulus (change in environment)" },
          { term: "Effector", definition: "A muscle or gland that carries out a response" },
          { term: "Synapse", definition: "A tiny gap between two neurones; chemicals (neurotransmitters) carry the signal across" },
          { term: "Reflex arc", definition: "The nerve pathway of a reflex action: receptor -> sensory neurone -> relay neurone -> motor neurone -> effector" },
          { term: "CNS", definition: "Central Nervous System — the brain and spinal cord" },
        ],
      },
      {
        heading: "Hormonal Control",
        content:
          "The endocrine (hormonal) system uses chemical messengers called hormones to control body functions. Hormones are produced in glands, secreted into the blood, and travel to target organs where they have an effect.\n\nThe nervous system and endocrine system both help coordinate responses, but they work differently. The nervous system uses electrical impulses, is very fast, acts on a specific part of the body, and the effect is short-lived. The endocrine system uses hormones in the blood, is slower, can act on widespread areas of the body, and effects are longer-lasting.\n\nKey endocrine glands include: the pituitary gland (the \"master gland\" in the brain — controls other glands), the thyroid (controls metabolic rate), the adrenal glands (produce adrenaline for fight or flight), the pancreas (produces insulin and glucagon), the ovaries (produce oestrogen and progesterone in females), and the testes (produce testosterone in males).\n\nThe menstrual cycle is controlled by four hormones. FSH (Follicle Stimulating Hormone) is released from the pituitary gland — it causes an egg to mature in the ovary and stimulates oestrogen production. Oestrogen is produced by the ovaries — it causes the uterus lining to thicken and stimulates LH release while inhibiting FSH. LH (Luteinising Hormone) is released from the pituitary gland — it triggers ovulation (release of the egg) around day 14. Progesterone is produced by the empty follicle (corpus luteum) after ovulation — it maintains the thick uterus lining. If no fertilisation occurs, progesterone drops, the lining breaks down (menstruation), and the cycle restarts.\n\nContraception prevents pregnancy. Hormonal methods include the pill (contains oestrogen and progesterone to prevent egg release and thicken cervical mucus), the implant or injection (slow release of progesterone), and the IUS. Non-hormonal methods include condoms (also prevent STIs), the diaphragm, the IUD (copper coil), spermicidal agents, abstinence, and surgical sterilisation.",
        keyTerms: [
          { term: "Hormone", definition: "A chemical messenger produced by a gland, carried in the blood to a target organ" },
          { term: "FSH", definition: "Follicle Stimulating Hormone — causes eggs to mature and stimulates oestrogen production" },
          { term: "Oestrogen", definition: "Hormone from ovaries — thickens uterus lining, stimulates LH, inhibits FSH" },
          { term: "LH", definition: "Luteinising Hormone — triggers ovulation (release of the mature egg)" },
          { term: "Progesterone", definition: "Maintains the uterus lining after ovulation; produced by the corpus luteum" },
          { term: "Pituitary gland", definition: "The master gland in the brain that controls many other endocrine glands" },
        ],
      },
      {
        heading: "Blood Glucose Control",
        content:
          "The concentration of glucose in the blood must be kept within a narrow range. If it gets too high or too low, cells cannot function properly. Blood glucose is monitored and controlled by the pancreas using two hormones: insulin and glucagon. This is an example of negative feedback — when a level changes, the body responds to bring it back to normal.\n\nWhen blood glucose is too HIGH (e.g. after eating a meal): the pancreas detects the rise and releases insulin. Insulin causes glucose to move from the blood into cells (especially liver and muscle cells). In the liver, glucose is converted to glycogen for storage. This brings blood glucose back down to normal.\n\nWhen blood glucose is too LOW (e.g. during exercise or between meals): the pancreas detects the drop and releases glucagon. Glucagon causes the liver to convert stored glycogen back into glucose and release it into the blood. This brings blood glucose back up to normal.\n\nInsulin and glucagon have opposite effects — they work together in a negative feedback loop to keep blood glucose stable.\n\nDiabetes is a condition where the body cannot control blood glucose properly. Type 1 diabetes is where the pancreas produces little or no insulin. It usually develops in young people and is thought to be caused by an autoimmune response (the immune system destroys the insulin-producing cells). It is treated with insulin injections and monitoring diet and exercise.\n\nType 2 diabetes is where the body's cells stop responding to insulin (insulin resistance), or the pancreas does not produce enough insulin. It is linked to obesity, lack of exercise, age, and genetics. It is much more common than Type 1. It is treated by controlling diet (reducing sugar and carbohydrate intake), exercising regularly, and sometimes medication. In severe cases, insulin injections may be needed.",
        keyTerms: [
          { term: "Insulin", definition: "Hormone from the pancreas that lowers blood glucose by causing cells to take up glucose and the liver to store glycogen" },
          { term: "Glucagon", definition: "Hormone from the pancreas that raises blood glucose by causing the liver to convert glycogen back to glucose" },
          { term: "Glycogen", definition: "The storage form of glucose in the liver and muscles" },
          { term: "Negative feedback", definition: "A control mechanism where a change triggers a response that reverses the change, bringing conditions back to normal" },
          { term: "Type 1 diabetes", definition: "The pancreas makes no insulin; treated with insulin injections; often develops in young people" },
          { term: "Type 2 diabetes", definition: "Body cells become resistant to insulin; linked to obesity and lifestyle; treated with diet and exercise" },
        ],
      },
      {
        heading: "Kidney & Water Balance",
        content:
          "The kidneys have three main functions: filtration, selective reabsorption, and excretion of urea and excess water/ions.\n\nFirst, ultrafiltration takes place in the glomerulus (a knot of capillaries inside the Bowman's capsule). Blood is filtered under high pressure. Small molecules like glucose, water, ions, and urea are squeezed out of the blood into the Bowman's capsule. Large molecules like proteins and blood cells are too big to pass through and stay in the blood.\n\nSecond, selective reabsorption takes place in the kidney tubules. Useful substances are reabsorbed back into the blood. All glucose is reabsorbed (by active transport). The right amount of water and ions are reabsorbed depending on what the body needs. Urea and excess water and ions are not reabsorbed — they continue through the tubule and form urine.\n\nThird, the urine (containing urea, excess water, and excess ions) passes to the bladder and is eventually excreted from the body.\n\nWater balance in the body is controlled by the hormone ADH (Anti-Diuretic Hormone), produced by the pituitary gland. When you are dehydrated (blood is too concentrated): more ADH is released, the kidney tubules become more permeable to water, more water is reabsorbed back into the blood, and a small volume of concentrated urine is produced. When you have too much water (blood is too dilute): less ADH is released, the kidney tubules are less permeable to water, less water is reabsorbed, and a large volume of dilute urine is produced.\n\nIf the kidneys fail, patients can be treated with dialysis (a machine filters the blood artificially using partially permeable membranes) or a kidney transplant.",
        keyTerms: [
          { term: "Ultrafiltration", definition: "High-pressure filtration of blood in the glomerulus; small molecules pass into the Bowman's capsule" },
          { term: "Selective reabsorption", definition: "Useful substances (glucose, some water and ions) are reabsorbed from the tubule back into the blood" },
          { term: "ADH", definition: "Anti-Diuretic Hormone — controls how much water the kidneys reabsorb; more ADH = more water reabsorbed" },
          { term: "Urea", definition: "A waste product made in the liver from the breakdown of excess amino acids; excreted by kidneys" },
          { term: "Dialysis", definition: "A treatment for kidney failure where a machine filters waste from the blood" },
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 6: GENETICS & EVOLUTION
  // =====================================================================
  {
    topicId: "genetics",
    subject: "biology",
    title: "Genetics & Evolution",
    sections: [
      {
        heading: "DNA & Protein Synthesis",
        content:
          "DNA (deoxyribonucleic acid) is the molecule that carries the genetic code in all living organisms. It is found in the nucleus of eukaryotic cells.\n\nDNA has a double helix structure — like a twisted ladder. The two strands are made of a sugar-phosphate backbone. Connecting the two strands are pairs of complementary bases. There are four bases: Adenine (A) always pairs with Thymine (T), and Cytosine (C) always pairs with Guanine (G). The bases are held together by weak hydrogen bonds. This complementary base pairing rule means that if you know the sequence on one strand, you can work out the other.\n\nA gene is a small section of DNA on a chromosome. Each gene codes for (contains the instructions to make) a particular protein by specifying the order of amino acids. The sequence of bases in a gene determines the sequence of amino acids, which determines the protein made. Proteins include enzymes, hormones, structural proteins (like collagen), and antibodies.\n\nThe genome is the entire set of genetic material (all the DNA) in an organism. The Human Genome Project was a huge international effort to map the entire human genome — identifying the sequence of all 3 billion base pairs and the location of all genes. Understanding the genome has benefits: it helps scientists identify genes linked to diseases, develop new medicines and treatments, trace human migration and evolution, and develop personalised medicine.\n\nEach human cell contains 23 pairs of chromosomes (46 total). One chromosome from each pair comes from each parent. A gene may have different forms called alleles. Having two copies of each chromosome means you have two alleles for each gene.",
        keyTerms: [
          { term: "DNA", definition: "Deoxyribonucleic acid — the molecule that carries genetic information as a sequence of bases" },
          { term: "Gene", definition: "A small section of DNA on a chromosome that codes for a particular protein" },
          { term: "Genome", definition: "The entire set of genetic material (all DNA) in an organism" },
          { term: "Complementary base pairing", definition: "A pairs with T, and C pairs with G in DNA" },
          { term: "Chromosome", definition: "A long, coiled molecule of DNA; humans have 23 pairs (46 total)" },
        ],
      },
      {
        heading: "Inheritance",
        content:
          "To understand genetics, you need to know the key terms. A gene is a section of DNA that codes for a protein. An allele is a version (form) of a gene — you inherit one from each parent. Your genotype is the combination of alleles you have (e.g. Bb). Your phenotype is the physical characteristic that is expressed (e.g. brown eyes). If you have two identical alleles, you are homozygous (BB or bb). If you have two different alleles, you are heterozygous (Bb). A dominant allele is always expressed when present (shown with a capital letter, e.g. B). A recessive allele is only expressed when two copies are present — it is masked by the dominant allele (shown with a lowercase letter, e.g. b).\n\nPunnett squares are used to predict the probability of offspring having particular genotypes and phenotypes. You place the parent alleles along the top and side, then fill in the grid to show all possible combinations. For example, if both parents are Bb, the offspring will be: 1 BB : 2 Bb : 1 bb — meaning a 3 in 4 (75%) chance of the dominant phenotype and 1 in 4 (25%) chance of the recessive phenotype.\n\nSex determination: In humans, biological sex is determined by the sex chromosomes. Females have XX and males have XY. A Punnett square shows there is always a 50:50 chance of a child being male or female.\n\nGenetic disorders are inherited conditions. Cystic fibrosis is caused by a recessive allele (ff) — both parents must be carriers (Ff) or affected. It causes thick, sticky mucus in the lungs and digestive system. Polydactyly (extra fingers/toes) is caused by a dominant allele (Dd or DD) — only one copy is needed.",
        keyTerms: [
          { term: "Allele", definition: "A version/form of a gene (e.g. B or b)" },
          { term: "Genotype", definition: "The combination of alleles an organism has (e.g. Bb)" },
          { term: "Phenotype", definition: "The physical characteristic expressed (e.g. brown eyes)" },
          { term: "Homozygous", definition: "Having two identical alleles for a gene (BB or bb)" },
          { term: "Heterozygous", definition: "Having two different alleles for a gene (Bb)" },
          { term: "Dominant allele", definition: "An allele that is always expressed when present (capital letter)" },
          { term: "Recessive allele", definition: "An allele only expressed when two copies are present; masked by dominant (lowercase letter)" },
          { term: "Carrier", definition: "A person who is heterozygous for a recessive condition — they carry the allele but do not show symptoms" },
        ],
      },
      {
        heading: "Variation",
        content:
          "Variation means the differences between individuals of the same species. There are two main causes of variation: genetic and environmental.\n\nGenetic variation is caused by differences in DNA/genes. It is inherited from parents. Sources of genetic variation include: sexual reproduction (combining DNA from two parents), meiosis (which shuffles chromosomes and involves crossing over), and mutations. Examples of characteristics affected by genetics include eye colour, blood group, and natural hair colour.\n\nEnvironmental variation is caused by the conditions an organism lives in. Examples include scars, spoken language, and the effects of diet and exercise on body mass. These cannot be inherited.\n\nMost characteristics are actually affected by both genes and the environment. For example, height is influenced by your genes (tall parents tend to have tall children) but also by nutrition during childhood. Skin colour is genetically determined but also affected by sun exposure.\n\nMutations are random changes to the DNA sequence. Most mutations have no effect on the phenotype because they occur in non-coding regions of DNA, or the change still codes for the same amino acid. Some mutations can change the protein produced, which can be harmful (e.g. causing genetic disorders or cancer if cell growth is affected) or, very rarely, beneficial (e.g. giving an advantage in a particular environment).\n\nContinuous variation shows a range of values with no distinct categories (e.g. height, weight, hand span). Discontinuous variation falls into distinct categories with no in-between values (e.g. blood group, eye colour, whether you can roll your tongue).",
        keyTerms: [
          { term: "Genetic variation", definition: "Differences caused by genes/DNA; inherited from parents" },
          { term: "Environmental variation", definition: "Differences caused by conditions an organism lives in; not inherited" },
          { term: "Mutation", definition: "A random change in the DNA base sequence; most have no effect" },
          { term: "Continuous variation", definition: "Variation that shows a range of values (e.g. height)" },
          { term: "Discontinuous variation", definition: "Variation that falls into distinct categories (e.g. blood group)" },
        ],
      },
      {
        heading: "Evolution & Natural Selection",
        content:
          "Evolution is the gradual change in the inherited characteristics of a population over many generations, which may result in the formation of new species. Charles Darwin proposed the theory of evolution by natural selection.\n\nNatural selection works like this: Within a population, there is genetic variation (individuals have different alleles due to mutations and sexual reproduction). Some individuals have characteristics that make them better adapted to their environment. These individuals are more likely to survive and reproduce (survival of the fittest). They pass on the alleles for these advantageous characteristics to their offspring. Over many generations, the proportion of individuals with the advantageous characteristic increases.\n\nEvidence for evolution includes: fossils (show how organisms have changed over time), antibiotic-resistant bacteria (shows natural selection happening today), comparative anatomy (similar bone structures in different species suggest a common ancestor), and DNA analysis (species with similar DNA sequences are more closely related).\n\nSelective breeding (artificial selection) is when humans choose organisms with desirable characteristics and breed them together. Over several generations, the desired characteristics become more common. Examples include: breeding cows for higher milk yield, breeding crops for disease resistance or higher yield, and breeding dogs for specific traits. A risk of selective breeding is reduced genetic variation (inbreeding), which makes the population vulnerable to disease.\n\nGenetic engineering involves cutting out a gene from one organism's DNA and inserting it into the DNA of another organism. This creates a genetically modified organism (GMO). For example, inserting the human insulin gene into bacteria so they produce human insulin for treating diabetes. Benefits include: crops resistant to disease, herbicides, or drought. Concerns include: unknown long-term effects on health, cross-pollination spreading modified genes to wild plants, and ethical worries about changing organisms' DNA.",
        keyTerms: [
          { term: "Natural selection", definition: "The process where organisms with advantageous characteristics are more likely to survive and reproduce, passing on their alleles" },
          { term: "Evolution", definition: "Gradual change in inherited characteristics of a population over many generations" },
          { term: "Selective breeding", definition: "Humans choosing organisms with desirable traits and breeding them together over generations" },
          { term: "Genetic engineering", definition: "Cutting a gene from one organism and inserting it into another to produce a desired characteristic" },
          { term: "GMO", definition: "Genetically Modified Organism — an organism whose DNA has been altered by genetic engineering" },
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 7: ECOLOGY
  // =====================================================================
  {
    topicId: "ecology",
    subject: "biology",
    title: "Ecology",
    sections: [
      {
        heading: "Ecosystems",
        content:
          "An ecosystem is the interaction of a community of living organisms (biotic) with the non-living (abiotic) parts of their environment. Ecology is the study of ecosystems.\n\nA habitat is the place where an organism lives. A population is all the organisms of one species living in a habitat. A community is all the different species living in a habitat. An ecosystem includes both the community and the abiotic (non-living) factors.\n\nAbiotic factors are non-living conditions that affect organisms. They include: light intensity, temperature, moisture/water availability, soil pH and mineral content, wind speed, carbon dioxide concentration, and oxygen levels in water. Changes in abiotic factors affect the distribution and abundance of organisms.\n\nBiotic factors are living factors that affect organisms. They include: competition (for food, water, space, mates, light), predation (predators affect prey populations and vice versa), disease, and availability of food.\n\nTo study the distribution and abundance of organisms, scientists use sampling techniques. A quadrat is a square frame (usually 0.25 m squared or 1 m squared) placed on the ground to count organisms inside it. To get reliable results, quadrats should be placed randomly (using random number generators for coordinates) and enough samples should be taken. You can calculate the population size of an area by using: mean number of organisms per quadrat x total area / area of one quadrat.\n\nTransects are used to study changes in distribution across an area (e.g. from a pond edge to a forest). A tape measure is laid across the area and quadrats are placed at regular intervals along it.",
        keyTerms: [
          { term: "Ecosystem", definition: "The interaction of a community of living organisms with the non-living parts of their environment" },
          { term: "Habitat", definition: "The place where an organism lives" },
          { term: "Population", definition: "All the organisms of one species in a habitat" },
          { term: "Community", definition: "All the populations of different species living in a habitat" },
          { term: "Abiotic factor", definition: "A non-living condition that affects organisms (e.g. temperature, light, water)" },
          { term: "Biotic factor", definition: "A living factor that affects organisms (e.g. competition, predation, disease)" },
          { term: "Quadrat", definition: "A square frame used for sampling organisms in a habitat" },
        ],
        importantEquations: [
          "Estimated population = (mean number per quadrat x total area) / area of one quadrat",
        ],
      },
      {
        heading: "Food Chains & Cycles",
        content:
          "A food chain shows what eats what in a habitat. Energy flows from one organism to the next. It always starts with a producer (a green plant or algae that makes its own food by photosynthesis). Arrows show the direction of energy transfer: producer -> primary consumer -> secondary consumer -> tertiary consumer.\n\nA food web shows many interconnected food chains in an ecosystem. Changes in one population affect others. For example, if a predator decreases, its prey increases, which may cause the prey's food source to decrease.\n\nOnly about 10% of the energy at each trophic level is passed to the next level. The rest is lost through: respiration (released as heat for life processes), movement, excretion (urine and faeces), and parts not being eaten (bones, roots). This is why food chains rarely have more than 4 or 5 levels — there is not enough energy left to support more.\n\nDecomposers (bacteria and fungi) break down dead organisms and waste material. They are essential for recycling nutrients back into the ecosystem. They feed on dead matter, breaking it down and releasing minerals back into the soil for plants to absorb.\n\nThe carbon cycle describes how carbon is recycled through the ecosystem. Carbon enters the atmosphere as CO2 from: respiration (by all living organisms), combustion (burning fossil fuels and wood), and decomposition. Carbon is removed from the atmosphere by photosynthesis (plants absorb CO2 and convert it to glucose/organic compounds). Carbon is passed through food chains when animals eat plants. Over millions of years, dead organisms that do not decompose may form fossil fuels (coal, oil, natural gas), locking carbon away underground until combustion releases it again.",
        keyTerms: [
          { term: "Producer", definition: "An organism (plant/algae) that makes its own food by photosynthesis; the start of a food chain" },
          { term: "Consumer", definition: "An organism that eats other organisms for energy" },
          { term: "Trophic level", definition: "A feeding level in a food chain (producer, primary consumer, etc.)" },
          { term: "Decomposer", definition: "An organism (bacterium or fungus) that breaks down dead matter and returns nutrients to the soil" },
          { term: "Carbon cycle", definition: "The process by which carbon is recycled between the atmosphere, living organisms, and the Earth" },
        ],
      },
      {
        heading: "Biodiversity",
        content:
          "Biodiversity is the variety of different species of organisms on Earth, or within an ecosystem. High biodiversity is important because it makes ecosystems more stable and resilient — if one species is lost, others can still fulfil its role. It also provides resources for humans such as food, medicines, building materials, and raw materials for industry.\n\nBiodiversity is under threat from human activities including habitat destruction, pollution, climate change, overexploitation (hunting, fishing, harvesting), and the introduction of invasive species. When a species becomes extinct, it is lost forever and the biodiversity decreases.\n\nTo maintain biodiversity, scientists and governments use several strategies. Conservation programmes protect endangered species through breeding programmes in zoos, seed banks to store plant seeds, wildlife reserves and national parks, and legal protection (making it illegal to hunt endangered species).\n\nProtecting habitats is crucial. This includes establishing nature reserves, reducing deforestation, creating hedgerows and wildlife corridors, and managing land sustainably. Reforestation (replanting trees) can help restore lost habitats.\n\nSustainable development means meeting the needs of the current population without damaging the environment for future generations. This includes sustainable fishing (using quotas and net size regulations), sustainable forestry (replanting trees as they are cut), and reducing waste and pollution.\n\nScientists monitor biodiversity by recording the number and types of species in an area over time. If biodiversity is declining, action can be taken to protect the ecosystem before it is too late.",
        keyTerms: [
          { term: "Biodiversity", definition: "The variety of different species in an ecosystem or on Earth" },
          { term: "Extinction", definition: "When there are no more living individuals of a species" },
          { term: "Conservation", definition: "Protecting species and habitats to maintain biodiversity" },
          { term: "Sustainable development", definition: "Meeting current needs without compromising the ability of future generations to meet theirs" },
        ],
      },
      {
        heading: "Human Impact on the Environment",
        content:
          "As the human population grows and living standards increase, we use more resources and produce more waste and pollution, putting pressure on the environment.\n\nDeforestation is the large-scale cutting down of forests. It happens to clear land for farming (cattle and crops like soy and palm oil), obtain timber for building and fuel, and make space for roads and settlements. Deforestation reduces biodiversity (destroys habitats), increases carbon dioxide in the atmosphere (trees that absorbed CO2 are removed, and burning them releases CO2), and reduces the rate of photosynthesis overall.\n\nGlobal warming is the gradual increase in Earth's average temperature. It is caused by the enhanced greenhouse effect — burning fossil fuels releases extra CO2, and farming produces methane (from cattle and rice paddies), which trap more heat in the atmosphere. Consequences include: rising sea levels (melting ice caps), more extreme weather events, changes in species distribution, loss of habitats (e.g. coral bleaching), and reduced crop yields in some areas.\n\nPollution comes in several forms. Air pollution from burning fossil fuels produces sulfur dioxide and nitrogen oxides, which cause acid rain that damages trees, lakes, and buildings. Water pollution includes sewage, fertilisers, and toxic chemicals. Land pollution includes landfill waste, pesticides, and herbicides.\n\nEutrophication is a specific type of water pollution. It occurs when excess fertilisers are washed from farmland into rivers and lakes. The fertilisers cause algae to grow rapidly (algal bloom). The algae block light to underwater plants, which die. Bacteria decompose the dead plants, using up oxygen in the water. Fish and other aquatic organisms die due to lack of oxygen. This process turns a healthy waterway into a dead zone.",
        keyTerms: [
          { term: "Deforestation", definition: "Large-scale cutting down of forests for farming, timber, or development" },
          { term: "Global warming", definition: "Gradual increase in Earth's temperature caused by extra greenhouse gases trapping heat" },
          { term: "Greenhouse effect", definition: "Greenhouse gases (CO2, methane) in the atmosphere trap heat from the Sun, warming the Earth" },
          { term: "Eutrophication", definition: "Excess fertilisers cause algal blooms, blocking light, killing plants, and depleting oxygen in water" },
          { term: "Acid rain", definition: "Rain made acidic by sulfur dioxide and nitrogen oxides from burning fossil fuels" },
        ],
      },
    ],
  },

  // =====================================================================
  // TOPIC 8: ACIDS, ALKALIS & TITRATIONS (CHEMISTRY)
  // =====================================================================
  {
    topicId: "acids-alkalis",
    subject: "chemistry",
    title: "Acids, Alkalis & Titrations",
    sections: [
      {
        heading: "Indicators & pH Scale",
        content:
          "The pH scale measures how acidic or alkaline a solution is. It runs from 0 to 14. A pH of 7 is neutral (e.g. pure water). Below 7 is acidic (the lower the number, the stronger the acid). Above 7 is alkaline (the higher the number, the stronger the alkali).\n\nIndicators are substances that change colour depending on whether they are in an acid or an alkali. Litmus paper turns red in acid and blue in alkali. Phenolphthalein is colourless in acid and pink in alkali. Methyl orange turns red in acid and yellow in alkali. Universal indicator is a mixture of indicators that produces a range of colours corresponding to different pH values — it goes from red (strongly acidic) through orange, yellow, green (neutral), blue to purple (strongly alkaline).\n\nStrong acids fully dissociate (split up) in water. This means every molecule of the acid releases H+ ions. Examples include hydrochloric acid (HCl), sulfuric acid (H2SO4), and nitric acid (HNO3). They have a low pH (0-2).\n\nWeak acids only partially dissociate in water. Only a small proportion of the molecules release H+ ions at any one time. The dissociation is reversible (an equilibrium). Examples include citric acid, ethanoic acid (vinegar), and carbonic acid. They have a higher pH than strong acids of the same concentration (typically pH 3-6).\n\nThe same distinction applies to alkalis: strong alkalis (like NaOH, KOH) fully dissociate to release OH- ions, while weak alkalis only partially dissociate. Concentration and strength are different — concentration is how many moles of acid/alkali are dissolved per unit volume, while strength is about how much the acid/alkali dissociates.",
        keyTerms: [
          { term: "pH scale", definition: "A scale from 0-14 measuring acidity/alkalinity; 7 is neutral, below 7 is acidic, above 7 is alkaline" },
          { term: "Indicator", definition: "A substance that changes colour to show whether a solution is acidic or alkaline" },
          { term: "Strong acid", definition: "An acid that fully dissociates (ionises) in water, releasing all its H+ ions" },
          { term: "Weak acid", definition: "An acid that only partially dissociates in water; the reaction is reversible" },
          { term: "Dissociate", definition: "To split apart into ions when dissolved in water" },
        ],
        tables: [
          {
            title: "Indicator Colour Changes",
            headers: ["Indicator", "Colour in Acid", "Colour in Alkali"],
            rows: [
              ["Litmus", "Red", "Blue"],
              ["Phenolphthalein", "Colourless", "Pink"],
              ["Methyl orange", "Red", "Yellow"],
              ["Universal indicator", "Red/Orange", "Blue/Purple"],
            ],
          },
        ],
      },
      {
        heading: "Acids, Bases & Neutralisation",
        content:
          "Acids are substances that produce hydrogen ions (H+) when dissolved in water. It is the H+ ions that make a solution acidic. Alkalis are substances that produce hydroxide ions (OH-) when dissolved in water. It is the OH- ions that make a solution alkaline.\n\nA base is any substance that can neutralise an acid. Bases include metal oxides (e.g. CuO, MgO) and metal hydroxides (e.g. NaOH, Ca(OH)2). An alkali is a special type of base — it is a base that dissolves in water. So all alkalis are bases, but not all bases are alkalis (some bases are insoluble in water).\n\nNeutralisation is the reaction between an acid and a base (or alkali) to produce a salt and water. The general word equation is: Acid + Base -> Salt + Water. The ionic equation for neutralisation is: H+(aq) + OH-(aq) -> H2O(l). This shows that the H+ ions from the acid react with the OH- ions from the base to form water, and the pH moves towards 7.\n\nThe Bronsted-Lowry theory defines acids and bases in terms of proton transfer. An acid is a proton (H+) donor — it gives away H+ ions. A base is a proton (H+) acceptor — it accepts H+ ions. In neutralisation, the acid donates a proton to the base.\n\nEveryday examples of neutralisation include: antacid tablets (a base) neutralising excess stomach acid, toothpaste (alkaline) neutralising acids produced by bacteria in the mouth, farmers adding lime (calcium hydroxide, a base) to acidic soil, and treating wasp stings (alkaline) with vinegar (acid) or bee stings (acidic) with bicarbonate of soda (a base).",
        keyTerms: [
          { term: "Acid", definition: "A substance that produces H+ ions in water; a proton donor (Bronsted-Lowry)" },
          { term: "Base", definition: "A substance that neutralises an acid; a proton acceptor (Bronsted-Lowry)" },
          { term: "Alkali", definition: "A base that dissolves in water, producing OH- ions" },
          { term: "Neutralisation", definition: "The reaction of an acid with a base to produce a salt and water" },
          { term: "Bronsted-Lowry theory", definition: "An acid is a proton (H+) donor; a base is a proton (H+) acceptor" },
        ],
        importantEquations: [
          "Acid + Base --> Salt + Water",
          "H+(aq) + OH-(aq) --> H2O(l) (ionic equation for neutralisation)",
        ],
      },
      {
        heading: "Solubility Rules",
        content:
          "To predict whether a salt is soluble or insoluble, you need to know the solubility rules. These rules tell you which combinations of ions form salts that dissolve in water and which form insoluble precipitates.\n\nA soluble substance dissolves in water to form a solution. An insoluble substance does not dissolve and forms a solid precipitate if produced in a reaction. These rules are essential for predicting the products of reactions and for choosing the correct method to make a salt.\n\nAll sodium, potassium, and ammonium compounds are soluble — there are no common exceptions. All nitrates are soluble — no exceptions. Most chlorides are soluble, but silver chloride and lead chloride are insoluble. Most sulfates are soluble, but barium sulfate, calcium sulfate, and lead sulfate are insoluble. Most carbonates are insoluble, except sodium carbonate, potassium carbonate, and ammonium carbonate. Most hydroxides are insoluble, except sodium hydroxide, potassium hydroxide, and calcium hydroxide (slightly soluble).\n\nThese rules are useful for making insoluble salts by precipitation — you mix two soluble solutions together and the insoluble salt forms as a solid precipitate. For example, to make barium sulfate (insoluble), you can mix barium chloride solution (soluble) with sodium sulfate solution (soluble).",
        keyTerms: [
          { term: "Soluble", definition: "A substance that dissolves in water to form a solution" },
          { term: "Insoluble", definition: "A substance that does not dissolve in water" },
          { term: "Precipitate", definition: "An insoluble solid formed when two solutions are mixed" },
        ],
        tables: [
          {
            title: "Solubility Rules",
            headers: ["Compound Type", "Soluble?", "Exceptions"],
            rows: [
              ["Sodium / Potassium / Ammonium compounds", "All soluble", "No exceptions"],
              ["Nitrates", "All soluble", "No exceptions"],
              ["Chlorides", "Soluble", "Except silver chloride, lead chloride"],
              ["Sulfates", "Soluble", "Except barium sulfate, calcium sulfate, lead sulfate"],
              ["Carbonates", "Insoluble", "Except sodium carbonate, potassium carbonate, ammonium carbonate"],
              ["Hydroxides", "Insoluble", "Except sodium hydroxide, potassium hydroxide, calcium hydroxide (slightly)"],
            ],
          },
        ],
      },
      {
        heading: "Reactions of Acids",
        content:
          "Acids react with different substances to produce salts. The type of salt produced depends on which acid is used. Hydrochloric acid (HCl) produces chloride salts. Sulfuric acid (H2SO4) produces sulfate salts. Nitric acid (HNO3) produces nitrate salts.\n\nAcid + Metal -> Salt + Hydrogen. For example: magnesium + hydrochloric acid -> magnesium chloride + hydrogen. The hydrogen gas can be tested by holding a lit splint near it — it will make a squeaky pop. Not all metals react with acids. Very reactive metals (like sodium) react too violently and are dangerous. Unreactive metals (like gold and platinum) do not react at all. Copper also does not react with dilute acids.\n\nAcid + Metal Oxide (base) -> Salt + Water. For example: hydrochloric acid + copper oxide -> copper chloride + water. This is a neutralisation reaction.\n\nAcid + Metal Hydroxide (base/alkali) -> Salt + Water. For example: sulfuric acid + sodium hydroxide -> sodium sulfate + water. This is also a neutralisation reaction.\n\nAcid + Metal Carbonate -> Salt + Water + Carbon Dioxide. For example: nitric acid + calcium carbonate -> calcium nitrate + water + carbon dioxide. The carbon dioxide gas can be tested by bubbling it through limewater — it turns limewater milky (cloudy).\n\nTo work out the name of the salt: the first part comes from the metal or metal in the base/carbonate, the second part comes from the acid (HCl -> chloride, H2SO4 -> sulfate, HNO3 -> nitrate). For example: zinc + sulfuric acid -> zinc sulfate + hydrogen.",
        keyTerms: [
          { term: "Salt", definition: "A compound formed when the H+ ion of an acid is replaced by a metal ion or ammonium ion" },
          { term: "Chloride salt", definition: "A salt formed from hydrochloric acid (HCl)" },
          { term: "Sulfate salt", definition: "A salt formed from sulfuric acid (H2SO4)" },
          { term: "Nitrate salt", definition: "A salt formed from nitric acid (HNO3)" },
        ],
        importantEquations: [
          "Acid + Metal --> Salt + Hydrogen",
          "Acid + Metal oxide --> Salt + Water",
          "Acid + Metal hydroxide --> Salt + Water",
          "Acid + Metal carbonate --> Salt + Water + Carbon dioxide",
          "HCl --> chloride salts; H2SO4 --> sulfate salts; HNO3 --> nitrate salts",
        ],
        tables: [
          {
            title: "Which Acid Makes Which Salt?",
            headers: ["Acid", "Formula", "Salt Type Produced"],
            rows: [
              ["Hydrochloric acid", "HCl", "Chloride (e.g. sodium chloride, magnesium chloride)"],
              ["Sulfuric acid", "H2SO4", "Sulfate (e.g. sodium sulfate, magnesium sulfate)"],
              ["Nitric acid", "HNO3", "Nitrate (e.g. sodium nitrate, magnesium nitrate)"],
            ],
          },
        ],
      },
      {
        heading: "Making Salts",
        content:
          "There are three main methods for making salts, depending on whether the salt you want is soluble or insoluble.\n\nMethod 1: Making a soluble salt from an insoluble base (or insoluble carbonate). Add excess insoluble base (e.g. copper oxide) to warm dilute acid. The base reacts with the acid until all the acid is used up. You add excess base so you can be sure all the acid has reacted — if there is unreacted acid left, the salt would be impure. Filter the mixture to remove the excess (unreacted) solid base. You now have a pure salt solution (filtrate). Heat the solution gently to evaporate some water, then leave to cool and crystallise. Filter to collect the crystals and pat dry with filter paper.\n\nMethod 2: Making a soluble salt by titration (used when both the acid and alkali are soluble, e.g. acid + soluble alkali like NaOH). Use a titration to find the exact volume of acid needed to neutralise a known volume of alkali. Add an indicator (like phenolphthalein) to the alkali in a conical flask. Add acid from a burette until the indicator changes colour (the end point). Record the volume of acid used. Repeat the titration without the indicator, using the exact volumes found, to produce a pure salt solution (without indicator contamination). Evaporate and crystallise as above.\n\nMethod 3: Making an insoluble salt by precipitation. Mix two soluble solutions that contain the ions needed. The insoluble salt forms as a solid precipitate. For example: lead nitrate solution + sodium chloride solution -> lead chloride (precipitate) + sodium nitrate. Filter the mixture to collect the insoluble precipitate. Wash the precipitate with distilled water to remove impurities. Dry the precipitate in an oven or by leaving it in a warm place.\n\nCrystallisation involves heating the salt solution to evaporate most of the water, then leaving it to cool so that salt crystals form as the solution becomes saturated.",
        keyTerms: [
          { term: "Excess", definition: "Adding more than enough reactant so the other reactant is completely used up" },
          { term: "Filtrate", definition: "The liquid that passes through the filter paper (the salt solution)" },
          { term: "Residue", definition: "The solid left on the filter paper (the excess base or precipitate)" },
          { term: "Crystallisation", definition: "Heating a solution to evaporate water, then cooling to form crystals" },
          { term: "Titration", definition: "A technique to find the exact volume of acid/alkali needed for neutralisation" },
          { term: "End point", definition: "The point in a titration where the indicator changes colour, showing neutralisation is complete" },
          { term: "Precipitation", definition: "Forming an insoluble solid by mixing two soluble solutions" },
        ],
      },
    ],
  },
];
