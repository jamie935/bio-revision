// Import AI-generated summaries (auto-populated by the upload pipeline)
import summariesGenerated from "./generated/summaries-generated.json";

export interface TopicSummary {
  topicId: string;
  subject: "biology" | "chemistry" | "physics";
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

const baseSummaries: TopicSummary[] = [
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
  {
    topicId: "states-matter",
    subject: "chemistry",
    title: "States of Matter & Separation",
    sections: [
      {
        heading: "States of Matter & Particle Theory",
        content:
          "All matter exists in one of three states: solid, liquid or gas. The kinetic theory explains the differences between these states in terms of the arrangement, movement and energy of particles.\n\nIn a solid, particles are held in fixed positions in a regular pattern (lattice). They vibrate about their fixed positions but cannot move freely. Solids have a definite shape and volume. The forces of attraction between particles are strong.\n\nIn a liquid, particles are close together but arranged randomly. They can move around each other and slide past one another, which is why liquids flow and take the shape of their container. Liquids have a fixed volume but no fixed shape. The forces between particles are weaker than in solids.\n\nIn a gas, particles are far apart and move randomly at high speeds in all directions. They collide with each other and the walls of the container. Gases have no fixed shape or volume and can be compressed. The forces between particles are very weak (almost negligible).\n\nTemperature is a measure of the average kinetic energy of the particles. As temperature increases, particles gain kinetic energy and move faster.",
        keyTerms: [
          { term: "Kinetic theory", definition: "The idea that all matter is made of tiny particles in constant motion, with energy that increases with temperature" },
          { term: "Solid", definition: "State with particles in fixed positions in a regular lattice, vibrating about fixed points" },
          { term: "Liquid", definition: "State with particles close together but free to move around each other, no fixed shape" },
          { term: "Gas", definition: "State with particles far apart moving randomly at high speed, no fixed shape or volume" },
        ],
        tables: [
          {
            title: "Comparison of the Three States of Matter",
            headers: ["Property", "Solid", "Liquid", "Gas"],
            rows: [
              ["Arrangement", "Regular pattern", "Random, close", "Random, far apart"],
              ["Movement", "Vibrate in place", "Move around each other", "Move fast, all directions"],
              ["Energy", "Lowest", "Moderate", "Highest"],
              ["Shape", "Fixed", "Takes container shape", "Fills container"],
              ["Volume", "Fixed", "Fixed", "Not fixed"],
              ["Compressible?", "No", "No", "Yes"],
            ],
          },
        ],
      },
      {
        heading: "Changes of State",
        content:
          "When a substance is heated or cooled, it can change state. These are physical changes — the substance is the same, just in a different state. They are reversible.\n\nMelting: solid to liquid (add energy). Freezing: liquid to solid (remove energy). Boiling/evaporation: liquid to gas (add energy). Condensation: gas to liquid (remove energy). Sublimation: solid directly to gas, skipping liquid.\n\nDuring a change of state, the temperature remains constant even though energy is being added. This is because the energy is being used to break or form intermolecular forces between particles, not to increase kinetic energy. On a heating curve, flat sections represent changes of state.\n\nBoiling occurs throughout the liquid at a fixed temperature and produces bubbles. Evaporation occurs only at the surface and can happen at any temperature below the boiling point.\n\nPure substances have sharp, fixed melting and boiling points. Impurities lower the melting point and raise the boiling point, and cause the substance to melt or boil over a range of temperatures.",
        keyTerms: [
          { term: "Melting point", definition: "The temperature at which a solid turns into a liquid" },
          { term: "Boiling point", definition: "The temperature at which a liquid turns into a gas throughout the liquid" },
          { term: "Sublimation", definition: "Changing directly from solid to gas without passing through the liquid state" },
          { term: "Evaporation", definition: "Liquid turning to gas at the surface at any temperature below the boiling point" },
        ],
      },
      {
        heading: "Diffusion",
        content:
          "Diffusion is the spreading out of particles from an area of higher concentration to an area of lower concentration, due to the random movement of particles. It can occur in liquids and gases but not in solids (solid particles are fixed in place).\n\nDiffusion is faster in gases than liquids because gas particles have more kinetic energy, move faster, and are further apart (fewer collisions to slow them down).\n\nFactors affecting rate of diffusion: higher temperature (particles move faster), lighter particles (move faster), greater concentration difference (bigger driving force).\n\nKey experiment: HCl and NH₃ in a glass tube. Cotton wool soaked in HCl at one end and NH₃ at the other. A white ring of ammonium chloride (NH₄Cl) forms closer to the HCl end because NH₃ molecules (Mr = 17) are lighter and diffuse faster than HCl molecules (Mr = 36.5).",
        keyTerms: [
          { term: "Diffusion", definition: "The net movement of particles from an area of higher concentration to lower concentration" },
          { term: "Concentration gradient", definition: "The difference in concentration between two areas that drives diffusion" },
        ],
      },
      {
        heading: "Solutions & Solubility",
        content:
          "A solution is formed when a solute dissolves in a solvent. The solute is the substance that dissolves (e.g. salt, sugar). The solvent is the liquid that does the dissolving (usually water). A saturated solution is one where no more solute can dissolve at that temperature.\n\nFor most solid solutes, solubility increases with temperature — higher temperature gives particles more energy to break apart and dissolve. A solubility curve shows the maximum mass of solute that dissolves in 100g of water at different temperatures.\n\nMiscible liquids mix completely to form one layer (e.g. ethanol and water). Immiscible liquids do not mix and form separate layers (e.g. oil and water). Immiscible liquids can be separated using a separating funnel.",
        keyTerms: [
          { term: "Solute", definition: "The substance that dissolves in a solvent" },
          { term: "Solvent", definition: "The liquid that dissolves the solute" },
          { term: "Saturated solution", definition: "A solution in which no more solute can dissolve at that temperature" },
          { term: "Miscible", definition: "Liquids that mix completely to form one layer" },
        ],
      },
      {
        heading: "Separation Techniques",
        content:
          "Different separation techniques are used depending on the type of mixture:\n\nFiltration separates an insoluble solid from a liquid. Pour through filter paper — solid stays (residue), liquid passes through (filtrate).\n\nEvaporation/crystallisation separates a dissolved solid from a solution. Heat gently, stop when crystals form at the edges, cool slowly to form crystals.\n\nSimple distillation separates a solvent from a solution (e.g. pure water from salt water). Heat the solution, collect and condense the vapour.\n\nFractional distillation separates two or more miscible liquids with different boiling points using a fractionating column.\n\nPaper chromatography separates dissolved substances (e.g. dyes) based on their different solubilities in the solvent. Use a pencil baseline (not pen). The Rf value = distance moved by substance ÷ distance moved by solvent front.\n\nSeparating funnel separates immiscible liquids (e.g. oil and water).",
        keyTerms: [
          { term: "Filtrate", definition: "The liquid that passes through the filter paper" },
          { term: "Residue", definition: "The solid left on the filter paper" },
          { term: "Chromatography", definition: "A technique for separating dissolved substances based on their movement through a medium" },
          { term: "Rf value", definition: "Retention factor = distance moved by substance ÷ distance moved by solvent front" },
        ],
        importantEquations: [
          "Rf = distance moved by substance ÷ distance moved by solvent front",
        ],
        tables: [
          {
            title: "Choosing a Separation Technique",
            headers: ["Mixture Type", "Technique"],
            rows: [
              ["Insoluble solid + liquid", "Filtration"],
              ["Dissolved solid from solution", "Evaporation / crystallisation"],
              ["Solvent from solution", "Simple distillation"],
              ["Two miscible liquids", "Fractional distillation"],
              ["Two immiscible liquids", "Separating funnel"],
              ["Dissolved coloured substances", "Chromatography"],
            ],
          },
        ],
      },
    ],
  },
  {
    topicId: "atomic-structure",
    subject: "chemistry",
    title: "Atomic Structure & the Periodic Table",
    sections: [
      {
        heading: "Atoms, Elements & Compounds",
        content:
          "An atom is the smallest particle of an element that can take part in chemical reactions. An element is a substance made of only one type of atom — there are about 118 known elements. A compound is a substance made of two or more different elements chemically bonded together in a fixed ratio. A mixture is two or more substances not chemically bonded, which can be separated by physical methods.\n\nCompounds have completely different properties from their constituent elements. For example, sodium is a reactive metal and chlorine is a toxic gas, but sodium chloride (table salt) is safe to eat.\n\nThe law of conservation of mass states that atoms cannot be created or destroyed in a chemical reaction — the total mass of reactants equals the total mass of products.\n\nPure substances have sharp, fixed melting and boiling points. Impurities lower the melting point and raise the boiling point.",
        keyTerms: [
          { term: "Atom", definition: "The smallest particle of an element that can take part in a chemical reaction" },
          { term: "Element", definition: "A substance made of only one type of atom" },
          { term: "Compound", definition: "A substance of two or more different elements chemically bonded in a fixed ratio" },
          { term: "Mixture", definition: "Two or more substances not chemically bonded, separable by physical methods" },
        ],
      },
      {
        heading: "Atomic Structure & Isotopes",
        content:
          "Atoms consist of a small, dense, positively charged nucleus (containing protons and neutrons) surrounded by negatively charged electrons in shells (energy levels).\n\nProtons have a relative mass of 1 and charge +1. Neutrons have relative mass 1 and charge 0. Electrons have negligible mass (1/1836) and charge -1. In a neutral atom, the number of protons equals the number of electrons.\n\nThe atomic number is the number of protons and defines which element an atom is. The mass number is the total of protons + neutrons. Number of neutrons = mass number − atomic number.\n\nIsotopes are atoms of the same element with the same number of protons but different numbers of neutrons. They have the same chemical properties but different physical properties (e.g. density). Relative atomic mass (Ar) is the weighted average mass of isotopes, calculated as: Ar = Σ(isotope mass × abundance) ÷ 100.\n\nThe atomic model developed over time: Dalton's solid spheres → Thomson's plum pudding model → Rutherford's nuclear model (from alpha scattering experiment) → Bohr's electron shells → Chadwick's discovery of the neutron.",
        keyTerms: [
          { term: "Atomic number", definition: "The number of protons in the nucleus — defines the element" },
          { term: "Mass number", definition: "The total number of protons and neutrons in the nucleus" },
          { term: "Isotopes", definition: "Atoms of the same element with different numbers of neutrons" },
          { term: "Relative atomic mass (Ar)", definition: "Weighted average mass of isotopes, taking into account natural abundance" },
        ],
        tables: [
          {
            title: "Subatomic Particles",
            headers: ["Particle", "Location", "Relative Mass", "Relative Charge"],
            rows: [
              ["Proton", "Nucleus", "1", "+1"],
              ["Neutron", "Nucleus", "1", "0"],
              ["Electron", "Shells/orbitals", "1/1836 (negligible)", "-1"],
            ],
          },
        ],
        importantEquations: [
          "Number of neutrons = mass number − atomic number",
          "Ar = Σ(isotope mass × % abundance) ÷ 100",
        ],
      },
      {
        heading: "Electronic Configuration",
        content:
          "Electrons are arranged in shells (energy levels) around the nucleus. The shells fill from the inside out: the first shell holds a maximum of 2 electrons, the second holds 8, and the third holds 8 (at IGCSE level).\n\nElectronic configuration is written as numbers separated by commas. For example, sodium (11 electrons) = 2, 8, 1. Chlorine (17 electrons) = 2, 8, 7.\n\nThe electronic configuration links directly to position in the periodic table: the number of shells = the period number, and the number of electrons in the outer shell = the group number. For example, 2,8,1 = Period 3, Group 1 (sodium).\n\nNoble gases (Group 0) have full outer shells (2 for He, 8 for Ne and Ar), making them very stable and unreactive. Other elements react to achieve a full outer shell by losing, gaining, or sharing electrons.",
        keyTerms: [
          { term: "Electronic configuration", definition: "The arrangement of electrons in shells, written as numbers (e.g. 2, 8, 1)" },
          { term: "Shell (energy level)", definition: "A region around the nucleus where electrons are found" },
          { term: "Full outer shell", definition: "A stable arrangement of electrons, like a noble gas" },
        ],
      },
      {
        heading: "The Periodic Table",
        content:
          "The periodic table arranges elements in order of increasing atomic number. Groups (vertical columns) contain elements with the same number of outer shell electrons and similar chemical properties. Periods (horizontal rows) contain elements with the same number of electron shells.\n\nMetals are found on the left and centre, non-metals on the right. A stepped line roughly separates them. Elements near this line (metalloids like silicon) have properties of both.\n\nMendeleev organised early periodic tables by atomic mass, grouping elements with similar properties. He left gaps for undiscovered elements and predicted their properties — when these elements were found (e.g. germanium), his predictions were confirmed.\n\nTransition metals (central block) are hard, dense, high melting point metals. They are good conductors, less reactive than Group 1, form coloured compounds, have variable oxidation states, and can act as catalysts.",
        keyTerms: [
          { term: "Group", definition: "A vertical column in the periodic table — elements have similar properties" },
          { term: "Period", definition: "A horizontal row in the periodic table — elements have the same number of shells" },
          { term: "Transition metals", definition: "Metals in the central block with high mp, coloured compounds, variable oxidation states" },
          { term: "Mendeleev", definition: "Arranged the first widely-accepted periodic table by atomic mass, leaving gaps for undiscovered elements" },
        ],
      },
      {
        heading: "Group 1, Group 7 & Group 0",
        content:
          "Group 1 (alkali metals): Li, Na, K, Rb, Cs. Soft, low density, low melting points. 1 outer electron — they lose it easily to form +1 ions. Reactivity INCREASES down the group (outer electron further from nucleus, more shielding, easier to lose). React with water: 2Na + 2H₂O → 2NaOH + H₂. Li fizzes gently, Na fizzes vigorously, K burns with lilac flame.\n\nGroup 7 (halogens): F, Cl, Br, I. Non-metals, diatomic molecules (F₂, Cl₂ etc.). 7 outer electrons — gain 1 to form -1 ions. Reactivity DECREASES down the group (incoming electron further from nucleus, harder to attract). Melting/boiling points increase down the group. A more reactive halogen displaces a less reactive one from its salt solution.\n\nGroup 0 (noble gases): He, Ne, Ar, Kr, Xe. Full outer shells — very unreactive. Colourless, odourless gases. Boiling point increases down the group. Uses include lighting (Ne), welding shield (Ar), balloons (He).",
        keyTerms: [
          { term: "Alkali metals", definition: "Group 1 elements — soft, reactive metals that form +1 ions" },
          { term: "Halogens", definition: "Group 7 elements — reactive non-metals that form -1 ions" },
          { term: "Noble gases", definition: "Group 0 elements — unreactive gases with full outer electron shells" },
          { term: "Displacement reaction", definition: "A more reactive halogen displaces a less reactive halogen from its compound" },
        ],
        tables: [
          {
            title: "Group 1 Reactions with Water",
            headers: ["Metal", "Observation", "Products"],
            rows: [
              ["Lithium", "Fizzes gently on surface", "LiOH + H₂"],
              ["Sodium", "Melts into ball, fizzes vigorously", "NaOH + H₂"],
              ["Potassium", "Fizzes violently, lilac flame", "KOH + H₂"],
            ],
          },
          {
            title: "Halogen Properties",
            headers: ["Halogen", "State at Room Temp", "Colour", "Formula"],
            rows: [
              ["Fluorine", "Gas", "Pale yellow", "F₂"],
              ["Chlorine", "Gas", "Yellow-green", "Cl₂"],
              ["Bromine", "Liquid", "Red-brown", "Br₂"],
              ["Iodine", "Solid", "Dark grey/purple vapour", "I₂"],
            ],
          },
        ],
      },
    ],
  },
  {
    topicId: "bonding-structure",
    subject: "chemistry",
    title: "Bonding & Structure",
    sections: [
      {
        heading: "Ionic Bonding",
        content:
          "Ionic bonding is the strong electrostatic attraction between oppositely charged ions. It occurs when metals transfer electrons to non-metals. The metal atom loses outer electrons to form a positive ion (cation), and the non-metal gains electrons to form a negative ion (anion). Both ions achieve a stable noble gas electronic configuration (full outer shell).\n\nIn sodium chloride: Na (2,8,1) loses 1 electron → Na⁺ (2,8). Cl (2,8,7) gains 1 electron → Cl⁻ (2,8,8). In magnesium oxide: Mg (2,8,2) loses 2 electrons → Mg²⁺. O (2,6) gains 2 electrons → O²⁻. MgO has higher melting point than NaCl because it has greater ionic charges (2+ and 2-), creating stronger electrostatic attraction.\n\nIonic compounds form giant ionic lattices — regular 3D structures where each ion is surrounded by oppositely charged ions, with strong forces in all directions.\n\nDot-and-cross diagrams show the outer electron transfer: use dots for one atom, crosses for the other. Put square brackets and charges around each ion.",
        keyTerms: [
          { term: "Ionic bonding", definition: "Electrostatic attraction between oppositely charged ions formed by electron transfer" },
          { term: "Cation", definition: "A positive ion formed when a metal atom loses electrons" },
          { term: "Anion", definition: "A negative ion formed when a non-metal atom gains electrons" },
          { term: "Giant ionic lattice", definition: "A regular 3D arrangement of positive and negative ions with strong forces in all directions" },
        ],
      },
      {
        heading: "Covalent Bonding",
        content:
          "Covalent bonding is the sharing of one or more pairs of electrons between non-metal atoms. Each shared pair of electrons is one covalent bond. The atoms are held together because the shared electrons are attracted to the nuclei of both atoms.\n\nSingle bond: 1 shared pair (e.g. H-H, H-Cl). Double bond: 2 shared pairs (e.g. O=O, C=O). Double bonds are stronger and shorter than single bonds.\n\nKey molecules: H₂ (single bond), H₂O (2 single bonds + 2 lone pairs on O), CH₄ (4 single bonds), NH₃ (3 single bonds + 1 lone pair on N), CO₂ (2 double bonds), HCl (single bond).\n\nSimple molecular structures consist of small molecules with strong covalent bonds within but weak intermolecular forces between molecules. They have low melting/boiling points because only the weak intermolecular forces need to be overcome (covalent bonds are NOT broken).\n\nGiant covalent structures are huge networks of atoms all bonded by strong covalent bonds. They have very high melting points. Examples: diamond (each C bonded to 4 others — very hard), graphite (layers of hexagons — soft, conducts electricity), silicon dioxide (SiO₂).",
        keyTerms: [
          { term: "Covalent bonding", definition: "Sharing of electron pairs between non-metal atoms" },
          { term: "Simple molecular structure", definition: "Small molecules with strong internal bonds but weak intermolecular forces" },
          { term: "Giant covalent structure", definition: "Huge network of atoms connected by strong covalent bonds throughout" },
          { term: "Intermolecular forces", definition: "Weak forces of attraction between molecules (not the covalent bonds within)" },
        ],
      },
      {
        heading: "Metallic Bonding",
        content:
          "Metallic bonding is the electrostatic attraction between positive metal ions (cations) arranged in a regular lattice and a 'sea' of delocalised electrons. The outer electrons from each metal atom become detached and free to move throughout the whole structure.\n\nMetals conduct electricity because the delocalised electrons are free to move and carry charge. Metals are malleable because layers of ions can slide over each other while the delocalised electrons adjust to hold them together. Metals generally have high melting points due to the strong attraction between ions and delocalised electrons.",
        keyTerms: [
          { term: "Metallic bonding", definition: "Attraction between positive metal ions and a sea of delocalised electrons" },
          { term: "Delocalised electrons", definition: "Outer electrons that are free to move throughout the metal structure" },
        ],
      },
      {
        heading: "Properties of Structures",
        content:
          "The properties of a substance depend on its type of bonding and structure:\n\nIonic compounds: high melting points (strong electrostatic forces in lattice). Conduct electricity when molten or dissolved (ions free to move and carry charge) but NOT when solid (ions fixed). Often soluble in water.\n\nSimple molecular substances: low melting/boiling points (weak intermolecular forces). Do not conduct electricity (no free ions or delocalised electrons). Often insoluble in water.\n\nGiant covalent structures: very high melting points (many strong covalent bonds). Most do not conduct electricity — EXCEPT graphite (has delocalised electrons that can move along layers). Insoluble in water.\n\nMetallic structures: generally high melting points (strong metallic bonds). Always conduct electricity (delocalised electrons). Malleable and ductile. Insoluble in water.\n\nTo identify structure type from properties: low mp + no conductivity = simple molecular. High mp + conducts when molten = ionic. Very high mp + no conductivity = giant covalent. High mp + conducts when solid = metallic.",
        keyTerms: [
          { term: "Conductor", definition: "A substance that allows electricity to pass through it (has free charge carriers)" },
          { term: "Malleable", definition: "Can be hammered or bent into shape without breaking" },
        ],
        tables: [
          {
            title: "Comparison of Structure Types",
            headers: ["Property", "Ionic", "Simple Molecular", "Giant Covalent", "Metallic"],
            rows: [
              ["Melting point", "High", "Low", "Very high", "High (usually)"],
              ["Conductivity (solid)", "No", "No", "No (graphite: yes)", "Yes"],
              ["Conductivity (molten)", "Yes", "No", "N/A", "Yes"],
              ["Solubility in water", "Often soluble", "Often insoluble", "Insoluble", "Insoluble"],
              ["Malleability", "Brittle", "Soft", "Very hard", "Malleable"],
            ],
          },
        ],
      },
      {
        heading: "Nanoparticles & Allotropes of Carbon",
        content:
          "Nanoparticles are particles with dimensions between 1-100 nm. They have a very large surface area to volume ratio, giving them unique properties different from bulk material. Uses include: silver nanoparticles (antibacterial), TiO₂ in sunscreen, catalysts, drug delivery, and electronics.\n\nCarbon has several allotropes (different structural forms of the same element):\n\nDiamond: each C bonded to 4 others in a tetrahedral 3D structure. Very hard, high mp, does not conduct electricity.\n\nGraphite: each C bonded to 3 others in hexagonal layers. Layers held by weak forces — soft and slippery. One delocalised electron per C allows it to conduct electricity.\n\nGraphene: a single layer of graphite, one atom thick. Incredibly strong, excellent conductor, nearly transparent.\n\nFullerenes: hollow carbon molecules. Buckminsterfullerene (C₆₀) is a sphere of 60 C atoms. Can trap molecules inside for drug delivery.\n\nCarbon nanotubes: rolled-up graphene. Strong, lightweight, conduct electricity. Used in composites and electronics.",
        keyTerms: [
          { term: "Nanoparticle", definition: "A particle 1-100 nm in size with a very large surface area to volume ratio" },
          { term: "Allotrope", definition: "Different structural forms of the same element" },
          { term: "Graphene", definition: "A single layer of graphite — one atom thick, incredibly strong, conducts electricity" },
          { term: "Fullerene", definition: "A hollow carbon molecule, e.g. C₆₀ (buckminsterfullerene)" },
        ],
      },
    ],
  },
  {
    topicId: "formulae-equations",
    subject: "chemistry",
    title: "Chemical Formulae & Equations",
    sections: [
      {
        heading: "Writing Formulae",
        content:
          "A chemical formula shows which elements are present and how many atoms of each. The subscript number shows the number of atoms (e.g. H₂O = 2 hydrogen, 1 oxygen).\n\nTo work out the formula of an ionic compound, balance the charges so the overall charge is zero. Use the cross-over method: swap the charge numbers to get subscripts. Example: Al³⁺ and O²⁻ → Al₂O₃.\n\nBrackets in formulae mean more than one of a group: Ca(OH)₂ = 1 Ca, 2 O, 2 H. Mg(NO₃)₂ = 1 Mg, 2 N, 6 O.\n\nCommon polyatomic ions: OH⁻ (hydroxide), NO₃⁻ (nitrate), CO₃²⁻ (carbonate), SO₄²⁻ (sulfate), NH₄⁺ (ammonium).\n\nThe empirical formula gives the simplest whole number ratio of atoms. The molecular formula gives the actual numbers. Example: glucose empirical = CH₂O, molecular = C₆H₁₂O₆. To find empirical formula: divide masses by Ar, then divide by the smallest result.",
        keyTerms: [
          { term: "Chemical formula", definition: "Shows which elements are present and the number of atoms of each" },
          { term: "Empirical formula", definition: "The simplest whole number ratio of atoms in a compound" },
          { term: "Molecular formula", definition: "The actual number of atoms of each element in one molecule" },
          { term: "Polyatomic ion", definition: "A group of atoms that carries a charge, e.g. OH⁻, NO₃⁻, SO₄²⁻" },
        ],
        tables: [
          {
            title: "Common Ion Charges",
            headers: ["Group/Type", "Charge", "Examples"],
            rows: [
              ["Group 1 metals", "+1", "Na⁺, K⁺, Li⁺"],
              ["Group 2 metals", "+2", "Mg²⁺, Ca²⁺, Ba²⁺"],
              ["Aluminium", "+3", "Al³⁺"],
              ["Group 7 non-metals", "-1", "Cl⁻, Br⁻, I⁻"],
              ["Group 6 non-metals", "-2", "O²⁻, S²⁻"],
              ["Transition metals", "Variable", "Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺"],
            ],
          },
        ],
      },
      {
        heading: "Balancing Equations",
        content:
          "Chemical equations must be balanced because of the law of conservation of mass — atoms cannot be created or destroyed. The same number and type of atoms must appear on both sides.\n\nTo balance: (1) Write correct formulae. (2) Count atoms on each side. (3) Add coefficients (big numbers in front) to balance, starting with metals or the most complex formula. (4) Never change subscripts. (5) Check all elements.\n\nState symbols: (s) = solid, (l) = liquid, (g) = gas, (aq) = aqueous (dissolved in water).\n\nIonic equations show only the ions that react, removing spectator ions. Example: OH⁻(aq) + H⁺(aq) → H₂O(l).\n\nHalf equations show oxidation and reduction separately. Oxidation half: Na → Na⁺ + e⁻. Reduction half: Cl₂ + 2e⁻ → 2Cl⁻. Electrons lost must equal electrons gained.",
        keyTerms: [
          { term: "Balanced equation", definition: "An equation with equal numbers of each type of atom on both sides" },
          { term: "Coefficient", definition: "The big number in front of a formula that shows how many molecules/formula units" },
          { term: "State symbols", definition: "(s) solid, (l) liquid, (g) gas, (aq) aqueous — show physical state of each substance" },
          { term: "Spectator ions", definition: "Ions present in solution that do not take part in the reaction" },
        ],
      },
      {
        heading: "Moles & Relative Formula Mass",
        content:
          "Relative formula mass (Mr) is the sum of all relative atomic masses (Ar) in a formula. Example: H₂O = (2 × 1) + 16 = 18. CaCO₃ = 40 + 12 + (3 × 16) = 100.\n\nA mole is the amount of substance containing 6.02 × 10²³ particles (Avogadro's number). One mole of any substance has a mass in grams equal to its Mr.\n\nKey formula: moles = mass (g) ÷ Mr. Rearranged: mass = moles × Mr.\n\nReacting mass calculations: (1) Write a balanced equation. (2) Find moles of the known substance. (3) Use the mole ratio from the equation. (4) Convert back to mass.\n\nAt room temperature and pressure (RTP), 1 mole of any gas occupies 24 dm³. Volume = moles × 24. Moles = volume ÷ 24.",
        keyTerms: [
          { term: "Relative formula mass (Mr)", definition: "The sum of the relative atomic masses of all atoms in a formula" },
          { term: "Mole", definition: "The amount of substance containing 6.02 × 10²³ particles" },
          { term: "Avogadro's number", definition: "6.02 × 10²³ — the number of particles in one mole" },
          { term: "Molar volume", definition: "The volume of 1 mole of gas at RTP = 24 dm³" },
        ],
        importantEquations: [
          "Moles = mass (g) ÷ Mr",
          "Mass = moles × Mr",
          "Volume of gas (dm³) = moles × 24 (at RTP)",
        ],
      },
      {
        heading: "Concentration & Volume Calculations",
        content:
          "Concentration can be measured in g/dm³ or mol/dm³. Remember: 1 dm³ = 1000 cm³.\n\nConcentration (g/dm³) = mass of solute (g) ÷ volume of solution (dm³).\nConcentration (mol/dm³) = moles of solute ÷ volume of solution (dm³).\nTo convert: g/dm³ to mol/dm³ divide by Mr. mol/dm³ to g/dm³ multiply by Mr.\n\nTitration calculations: (1) Calculate moles of the known substance (conc × volume). (2) Use the mole ratio. (3) Find the concentration or volume of the unknown.\n\nPercentage yield = (actual yield ÷ theoretical yield) × 100. Usually less than 100% due to reversible reactions, product loss, or side reactions.\n\nAtom economy = (Mr of desired product ÷ total Mr of all products) × 100. Addition reactions = 100% atom economy. High atom economy is better for sustainability.",
        keyTerms: [
          { term: "Concentration", definition: "The amount of solute dissolved per unit volume of solution" },
          { term: "Titration", definition: "A technique to find the exact volume needed for a reaction to complete" },
          { term: "Percentage yield", definition: "The actual yield as a percentage of the theoretical maximum yield" },
          { term: "Atom economy", definition: "The percentage of reactant atoms that form the desired product" },
        ],
        importantEquations: [
          "Concentration (g/dm³) = mass ÷ volume",
          "Concentration (mol/dm³) = moles ÷ volume",
          "Percentage yield = (actual yield ÷ theoretical yield) × 100",
          "Atom economy = (Mr desired product ÷ Mr all products) × 100",
        ],
      },
    ],
  },
  {
    topicId: "metals-reactivity",
    subject: "chemistry",
    title: "Metals, Reactivity & Extraction",
    sections: [
      {
        heading: "The Reactivity Series",
        content:
          "The reactivity series ranks metals from most reactive to least reactive: K, Na, Li, Ca, Mg, Al, (C), Zn, Fe, Sn, Pb, (H), Cu, Ag, Au, Pt. Carbon and hydrogen are included as reference points.\n\nMetals react differently depending on their reactivity: Very reactive metals (K, Na, Li, Ca) react vigorously with cold water to form a metal hydroxide and hydrogen. Moderately reactive metals (Mg, Zn, Fe) react with steam to form a metal oxide and hydrogen. Metals above hydrogen react with dilute acids to form a salt and hydrogen. Metals below hydrogen (Cu, Ag, Au) do not react with dilute acids.\n\nMore reactive metals lose electrons more easily because the outer electron is further from the nucleus with more shielding from inner electrons.",
        keyTerms: [
          { term: "Reactivity series", definition: "A ranking of metals in order of their reactivity (most to least reactive)" },
          { term: "Reactivity", definition: "How readily a metal loses its outer electrons to form positive ions" },
        ],
        tables: [
          {
            title: "Reactivity Series and Reactions",
            headers: ["Metal", "Reaction with Water", "Reaction with Dilute Acid", "Extraction Method"],
            rows: [
              ["K, Na, Li", "Vigorous with cold water", "Too dangerous", "Electrolysis"],
              ["Ca", "Reacts with cold water", "Vigorous", "Electrolysis"],
              ["Mg, Al", "Reacts with steam", "Vigorous", "Electrolysis"],
              ["Zn, Fe", "Reacts with steam", "Moderate", "Reduction with carbon"],
              ["Cu", "No reaction", "No reaction", "Reduction with carbon"],
              ["Ag, Au, Pt", "No reaction", "No reaction", "Found native / chemical"],
            ],
          },
        ],
      },
      {
        heading: "Displacement Reactions",
        content:
          "A displacement reaction occurs when a more reactive metal takes the place of a less reactive metal in a compound. The more reactive metal 'pushes out' the less reactive one.\n\nExample: Mg + CuSO₄ → MgSO₄ + Cu. Blue solution turns colourless, copper metal deposited. Fe + CuSO₄ → FeSO₄ + Cu. Blue solution turns pale green, copper deposited on iron.\n\nPredicting displacement: if the added metal is MORE reactive than the metal in the compound, a reaction occurs. If LESS reactive, no reaction.\n\nThe thermite reaction (2Al + Fe₂O₃ → Al₂O₃ + 2Fe) is a highly exothermic displacement reaction used to weld railway tracks. Aluminium displaces iron because it is more reactive.\n\nHalogens also undergo displacement reactions: a more reactive halogen displaces a less reactive one. Cl₂ displaces Br⁻ and I⁻. Br₂ displaces I⁻ only.",
        keyTerms: [
          { term: "Displacement reaction", definition: "A more reactive element takes the place of a less reactive element in a compound" },
          { term: "Thermite reaction", definition: "2Al + Fe₂O₃ → Al₂O₃ + 2Fe — a highly exothermic displacement reaction" },
        ],
      },
      {
        heading: "Extraction of Metals",
        content:
          "Most metals are found in the Earth's crust as ores (compounds), not as pure metal, because they are too reactive. Only very unreactive metals (Au, Pt) are found native.\n\nMetals below carbon in the reactivity series can be extracted by reduction with carbon or carbon monoxide. Carbon is cheaper than electrolysis. Example: Fe₂O₃ + 3CO → 2Fe + 3CO₂ (in a blast furnace).\n\nMetals above carbon (K, Na, Li, Ca, Mg, Al) must be extracted by electrolysis of their molten compounds, because they are too reactive for carbon to reduce. This is expensive due to high energy costs. Example: aluminium is extracted from Al₂O₃ dissolved in molten cryolite. Cryolite lowers the melting point.\n\nRecycling metals is important because it conserves finite ore resources, uses much less energy, reduces CO₂ emissions, reduces landfill, and reduces mining damage.",
        keyTerms: [
          { term: "Ore", definition: "A rock containing enough metal compound to make extraction worthwhile" },
          { term: "Reduction", definition: "Removal of oxygen from a compound (or gain of electrons)" },
          { term: "Electrolysis", definition: "Using electricity to decompose a molten or dissolved ionic compound" },
          { term: "Cryolite", definition: "Added to aluminium oxide to lower the melting point, reducing energy costs" },
        ],
        importantEquations: [
          "Fe₂O₃ + 3CO → 2Fe + 3CO₂ (blast furnace)",
          "Al³⁺ + 3e⁻ → Al (cathode in aluminium extraction)",
          "2O²⁻ → O₂ + 4e⁻ (anode in aluminium extraction)",
        ],
      },
      {
        heading: "Oxidation & Reduction (Redox)",
        content:
          "Oxidation and reduction always happen together — they are called redox reactions.\n\nIn terms of oxygen: Oxidation = gain of oxygen. Reduction = loss of oxygen.\n\nIn terms of electrons (OIL RIG): Oxidation Is Loss of electrons. Reduction Is Gain of electrons.\n\nExample: In CuO + C → Cu + CO: CuO is reduced (loses oxygen), C is oxidised (gains oxygen). In terms of electrons: Cu²⁺ + 2e⁻ → Cu (reduction). C → C²⁺ + 2e⁻ (oxidation).\n\nThe substance that is reduced is the oxidising agent (it causes oxidation of the other substance). The substance that is oxidised is the reducing agent.\n\nAll displacement reactions are redox reactions. In Zn + CuSO₄ → ZnSO₄ + Cu: Zn is oxidised (Zn → Zn²⁺ + 2e⁻), Cu²⁺ is reduced (Cu²⁺ + 2e⁻ → Cu).",
        keyTerms: [
          { term: "Oxidation", definition: "Loss of electrons (or gain of oxygen)" },
          { term: "Reduction", definition: "Gain of electrons (or loss of oxygen)" },
          { term: "Redox reaction", definition: "A reaction where both oxidation and reduction occur simultaneously" },
          { term: "OIL RIG", definition: "Oxidation Is Loss, Reduction Is Gain (of electrons)" },
        ],
      },
      {
        heading: "Tests for Ions & Gases",
        content:
          "Flame tests identify metal ions by the colour they produce in a Bunsen flame: Li⁺ = crimson red, Na⁺ = yellow, K⁺ = lilac, Ca²⁺ = orange-red, Cu²⁺ = blue-green, Ba²⁺ = pale green.\n\nNaOH precipitation tests: add NaOH solution to identify metal ions. Cu²⁺ = blue precipitate, Fe²⁺ = green precipitate, Fe³⁺ = brown precipitate, Al³⁺ = white precipitate (dissolves in excess NaOH), Ca²⁺ = white precipitate.\n\nHalide ion tests: add dilute HNO₃ then AgNO₃. Cl⁻ = white precipitate, Br⁻ = cream precipitate, I⁻ = yellow precipitate.\n\nSulfate test: add dilute HCl then BaCl₂. White precipitate (BaSO₄) = sulfate present.\n\nCarbonate test: add dilute HCl — fizzes, gas turns limewater milky.\n\nGas tests: H₂ = squeaky pop. O₂ = relights glowing splint. CO₂ = turns limewater milky. Cl₂ = bleaches damp litmus paper white.",
        keyTerms: [
          { term: "Flame test", definition: "Dipping a nichrome wire in HCl then the sample and holding in a Bunsen flame" },
          { term: "Precipitate", definition: "An insoluble solid formed when two solutions are mixed" },
        ],
        tables: [
          {
            title: "Flame Test Colours",
            headers: ["Ion", "Flame Colour"],
            rows: [
              ["Li⁺", "Crimson red"],
              ["Na⁺", "Yellow / orange"],
              ["K⁺", "Lilac / purple"],
              ["Ca²⁺", "Orange-red"],
              ["Cu²⁺", "Blue-green"],
              ["Ba²⁺", "Pale green"],
            ],
          },
          {
            title: "Gas Tests",
            headers: ["Gas", "Test", "Positive Result"],
            rows: [
              ["Hydrogen (H₂)", "Lit splint", "Squeaky pop"],
              ["Oxygen (O₂)", "Glowing splint", "Relights"],
              ["Carbon dioxide (CO₂)", "Limewater", "Turns milky/cloudy"],
              ["Chlorine (Cl₂)", "Damp litmus paper", "Bleaches white"],
            ],
          },
        ],
      },
    ],
  },
  {
    topicId: "rates-energy",
    subject: "chemistry",
    title: "Rates of Reaction & Energetics",
    sections: [
      {
        heading: "Rate of Reaction",
        content:
          "Rate of reaction is the speed at which reactants are converted into products. Mean rate = amount of product formed ÷ time taken (units: g/s or cm³/s).\n\nThree methods to measure rate: (1) Gas collection — measure volume of gas produced over time using a gas syringe or over water. (2) Mass loss — place reaction on a balance and record decreasing mass as gas escapes. (3) Disappearing cross — time how long until a cross beneath the flask disappears (sodium thiosulfate + HCl).\n\nOn a rate graph (amount vs time): steeper line = faster rate. Line levels off when reaction is complete. If comparing two curves, the steeper one has faster rate but both reach the same final amount if the same quantity of reactant is used.\n\nFive factors affect rate: temperature, concentration, surface area, catalysts, and pressure (for gases).",
        keyTerms: [
          { term: "Rate of reaction", definition: "The speed at which reactants are converted into products" },
          { term: "Mean rate", definition: "Total amount of product formed divided by total time taken" },
        ],
        importantEquations: [
          "Mean rate = amount of product ÷ time",
          "Rate at a point = gradient of tangent to the curve",
        ],
      },
      {
        heading: "Collision Theory",
        content:
          "Collision theory states that for a reaction to occur, particles must: (1) collide with each other, (2) with sufficient energy (≥ activation energy), and (3) with the correct orientation. Not all collisions are successful.\n\nActivation energy (Ea) is the minimum energy particles must have to react. It is the energy barrier that must be overcome.\n\nIncreasing temperature increases rate because: particles move faster (more frequent collisions) AND a greater proportion of collisions have energy ≥ Ea (more successful collisions). Both effects matter.\n\nIncreasing concentration increases rate because: more particles in the same volume → more frequent collisions → more successful collisions per unit time.\n\nEnergy profile diagrams show energy on the y-axis and progress of reaction on the x-axis. The 'hump' is the activation energy. For exothermic reactions, products are lower. For endothermic, products are higher.",
        keyTerms: [
          { term: "Collision theory", definition: "Particles must collide with sufficient energy and correct orientation for a reaction to occur" },
          { term: "Activation energy", definition: "The minimum energy that colliding particles must have in order to react" },
          { term: "Successful collision", definition: "A collision with enough energy and correct orientation to result in a reaction" },
        ],
      },
      {
        heading: "Catalysts & Surface Area",
        content:
          "Increasing surface area increases rate. Smaller pieces expose more surface for collisions. Powder reacts faster than a lump. More exposed particles = more frequent collisions.\n\nIncreasing pressure (gases only) pushes particles closer together — same as increasing concentration. More frequent collisions = faster rate.\n\nA catalyst speeds up a reaction without being used up. It provides an alternative reaction pathway with a lower activation energy, so more particles have enough energy to react. On an energy profile diagram, the catalysed pathway has a lower peak. The overall energy change stays the same.\n\nIndustrial catalysts: iron (Haber process for NH₃), vanadium(V) oxide (Contact process for H₂SO₄), MnO₂ (decomposition of H₂O₂), nickel (hydrogenation).",
        keyTerms: [
          { term: "Catalyst", definition: "A substance that speeds up a reaction by providing an alternative pathway with lower activation energy, without being used up" },
          { term: "Surface area", definition: "The total exposed area of a solid — larger surface area means more sites for collisions" },
        ],
      },
      {
        heading: "Exothermic & Endothermic Reactions",
        content:
          "Exothermic reactions transfer energy to the surroundings — temperature rises. Products have less energy than reactants. Examples: combustion, neutralisation, respiration, hand warmers.\n\nEndothermic reactions take in energy from the surroundings — temperature falls. Products have more energy than reactants. Examples: thermal decomposition, photosynthesis, cold packs, citric acid + NaHCO₃.\n\nOn energy profile diagrams: exothermic — products lower than reactants. Endothermic — products higher than reactants.\n\nBond energy calculations: breaking bonds is endothermic (requires energy), making bonds is exothermic (releases energy). Overall energy change = total energy to break bonds − total energy to make bonds. Negative result = exothermic. Positive result = endothermic.",
        keyTerms: [
          { term: "Exothermic", definition: "A reaction that transfers energy to the surroundings (temperature rises)" },
          { term: "Endothermic", definition: "A reaction that takes in energy from the surroundings (temperature falls)" },
          { term: "Bond energy", definition: "The energy needed to break one mole of a particular bond (or released when forming it)" },
        ],
        importantEquations: [
          "Overall energy change = energy to break bonds − energy to make bonds",
          "Negative value = exothermic, Positive value = endothermic",
        ],
      },
      {
        heading: "Equilibrium",
        content:
          "A reversible reaction can go forwards (reactants → products) and backwards (products → reactants). Shown with a double-headed arrow (⇌).\n\nDynamic equilibrium occurs in a closed system when the rate of the forward reaction equals the rate of the backward reaction. Concentrations remain constant but not necessarily equal. Both reactions continue — it's 'dynamic'.\n\nLe Chatelier's principle: if a system at equilibrium is subjected to a change, the position of equilibrium shifts to oppose the change.\n\nTemperature: increasing temperature shifts equilibrium in the endothermic direction. Decreasing shifts it in the exothermic direction.\n\nConcentration: increasing concentration of a reactant shifts equilibrium to the right (more products). Increasing product concentration shifts left.\n\nPressure (gases): increasing pressure shifts towards the side with fewer gas molecules. No effect if equal moles on both sides.\n\nA catalyst does NOT change the position of equilibrium — it speeds up both forward and backward reactions equally, reaching equilibrium faster.",
        keyTerms: [
          { term: "Reversible reaction", definition: "A reaction that can proceed in both the forward and backward directions" },
          { term: "Dynamic equilibrium", definition: "When forward and backward reaction rates are equal in a closed system" },
          { term: "Le Chatelier's principle", definition: "If a system at equilibrium is disturbed, it shifts to oppose the change" },
          { term: "Closed system", definition: "A system where no substances can enter or leave" },
        ],
      },
    ],
  },
  {
    topicId: "organic-chemistry",
    subject: "chemistry",
    title: "Organic Chemistry",
    sections: [
      {
        heading: "Crude Oil & Hydrocarbons",
        content:
          "Crude oil is a finite (non-renewable) fossil fuel formed over millions of years from the remains of ancient marine organisms buried under sediment. It is a complex mixture of hydrocarbons (compounds of hydrogen and carbon only).\n\nFractional distillation separates crude oil into fractions based on boiling point. The oil is heated and fed into a fractionating column — hot at the bottom, cool at the top. Small molecules (low bp) rise to the top; large molecules (high bp) condense near the bottom.\n\nAs chain length increases: boiling point increases, viscosity increases (thicker), flammability decreases. Short-chain hydrocarbons make the best fuels.\n\nEnvironmental concerns: burning produces CO₂ (climate change), SO₂ (acid rain from sulfur impurities), particulates (health problems). Crude oil is a finite resource — we need alternative energy sources.",
        keyTerms: [
          { term: "Hydrocarbon", definition: "A compound containing only hydrogen and carbon atoms" },
          { term: "Fraction", definition: "A group of hydrocarbons with similar boiling points collected from fractional distillation" },
          { term: "Fractional distillation", definition: "Separating crude oil into fractions using differences in boiling point" },
          { term: "Finite resource", definition: "A resource that will run out because it is used faster than it forms" },
        ],
        tables: [
          {
            title: "Crude Oil Fractions",
            headers: ["Fraction", "Molecules", "Boiling Point", "Use"],
            rows: [
              ["Gases (LPG)", "C₁-C₄", "< 25°C", "Heating, cooking"],
              ["Petrol", "C₅-C₁₀", "25-75°C", "Car fuel"],
              ["Naphtha", "C₈-C₁₂", "75-170°C", "Chemical feedstock"],
              ["Kerosene", "C₁₂-C₁₅", "170-250°C", "Jet fuel"],
              ["Diesel", "C₁₅-C₂₀", "250-350°C", "Lorry/bus fuel"],
              ["Fuel oil", "C₂₀-C₄₀", "350-500°C", "Ships, power stations"],
              ["Bitumen", "C₄₀+", "> 500°C", "Roads, roofing"],
            ],
          },
        ],
      },
      {
        heading: "Alkanes & Combustion",
        content:
          "Alkanes are saturated hydrocarbons with only single C-C bonds. General formula: CₙH₂ₙ₊₂. They form a homologous series (same general formula, similar properties, each member differs by CH₂).\n\nFirst four: methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀.\n\nComplete combustion (in excess oxygen) produces CO₂ + H₂O and releases lots of energy. CH₄ + 2O₂ → CO₂ + 2H₂O.\n\nIncomplete combustion (limited oxygen) produces carbon monoxide (CO) and/or carbon (soot) instead of CO₂. CO is toxic — colourless and odourless, binds to haemoglobin preventing oxygen transport.\n\nCracking breaks long-chain hydrocarbons into shorter, more useful molecules. Produces shorter alkanes (fuels) + alkenes (for making polymers). Thermal cracking uses high temperature/pressure. Catalytic cracking uses zeolite catalyst at lower temperature. Example: C₁₀H₂₂ → C₈H₁₈ + C₂H₄.",
        keyTerms: [
          { term: "Alkane", definition: "A saturated hydrocarbon with only single bonds, general formula CₙH₂ₙ₊₂" },
          { term: "Saturated", definition: "Contains only single covalent bonds (no double bonds)" },
          { term: "Complete combustion", definition: "Burning in excess oxygen, producing CO₂ and H₂O" },
          { term: "Cracking", definition: "Breaking long-chain hydrocarbons into shorter, more useful molecules" },
        ],
        importantEquations: [
          "General formula: CₙH₂ₙ₊₂",
          "CH₄ + 2O₂ → CO₂ + 2H₂O (complete combustion of methane)",
          "Example cracking: C₁₀H₂₂ → C₈H₁₈ + C₂H₄",
        ],
        tables: [
          {
            title: "First Four Alkanes",
            headers: ["Name", "Formula", "Structure"],
            rows: [
              ["Methane", "CH₄", "1 carbon, 4 hydrogens"],
              ["Ethane", "C₂H₆", "2 carbons, 6 hydrogens"],
              ["Propane", "C₃H₈", "3 carbons, 8 hydrogens"],
              ["Butane", "C₄H₁₀", "4 carbons, 10 hydrogens"],
            ],
          },
        ],
      },
      {
        heading: "Alkenes & Addition Reactions",
        content:
          "Alkenes are unsaturated hydrocarbons containing a C=C double bond. General formula: CₙH₂ₙ. More reactive than alkanes due to the double bond.\n\nFirst three: ethene C₂H₄, propene C₃H₆, butene C₄H₈.\n\nTest for unsaturation: add bromine water (orange). If it decolorises (turns colourless), a C=C bond is present (alkene). Alkanes leave bromine water orange.\n\nAddition reactions: a molecule adds across the C=C double bond, opening it to a single bond. Only one product is formed (100% atom economy).\n\nHydrogenation: alkene + H₂ (nickel catalyst, ~150°C) → alkane. Used to make margarine from vegetable oils.\n\nHydration: ethene + steam (phosphoric acid catalyst, high temp/pressure) → ethanol.\n\nHalogenation: alkene + halogen → dihalogenoalkane. E.g. C₂H₄ + Br₂ → C₂H₄Br₂.",
        keyTerms: [
          { term: "Alkene", definition: "An unsaturated hydrocarbon with a C=C double bond, general formula CₙH₂ₙ" },
          { term: "Unsaturated", definition: "Contains at least one C=C double bond" },
          { term: "Addition reaction", definition: "A molecule adds across a double bond, producing only one product" },
          { term: "Hydrogenation", definition: "Addition of hydrogen across a double bond, converting unsaturated to saturated" },
        ],
        importantEquations: [
          "General formula: CₙH₂ₙ",
          "C₂H₄ + H₂ → C₂H₆ (hydrogenation)",
          "C₂H₄ + H₂O → C₂H₅OH (hydration to make ethanol)",
          "C₂H₄ + Br₂ → C₂H₄Br₂ (bromine water test)",
        ],
      },
      {
        heading: "Alcohols, Carboxylic Acids & Esters",
        content:
          "Alcohols have the functional group -OH. General formula: CₙH₂ₙ₊₁OH. Ethanol (C₂H₅OH) is the most important — used as a solvent, fuel, and in alcoholic drinks.\n\nTwo methods to make ethanol: (1) Fermentation: glucose + yeast → ethanol + CO₂ at ~37°C. Renewable but slow and impure. (2) Hydration of ethene: ethene + steam with phosphoric acid catalyst. Fast and pure but uses fossil fuels.\n\nCarboxylic acids have the functional group -COOH. General formula: CₙH₂ₙ₊₁COOH. They are weak acids (partially dissociate). Ethanoic acid (CH₃COOH) is found in vinegar. They react with metals, carbonates, and alkalis like other acids, but more gently.\n\nEsters are made by reacting a carboxylic acid with an alcohol (with sulfuric acid catalyst). Acid + Alcohol → Ester + Water. They have fruity smells and are used as flavourings, perfumes, and solvents. Ester names: first part from alcohol (-yl), second from acid (-anoate). E.g. ethanol + ethanoic acid = ethyl ethanoate.",
        keyTerms: [
          { term: "Alcohol", definition: "An organic compound with the -OH functional group" },
          { term: "Fermentation", definition: "Converting glucose to ethanol using yeast enzymes at ~37°C" },
          { term: "Carboxylic acid", definition: "An organic compound with the -COOH functional group — a weak acid" },
          { term: "Ester", definition: "An organic compound made from a carboxylic acid + alcohol, with fruity smell" },
        ],
        importantEquations: [
          "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (fermentation)",
          "Carboxylic acid + Alcohol → Ester + Water (esterification)",
        ],
      },
      {
        heading: "Polymers & Plastics",
        content:
          "Addition polymerisation: many small alkene monomers join together by opening their C=C double bonds to form a long-chain polymer. Only one product. Example: ethene → poly(ethene). To draw: open the double bond, put the repeating unit in square brackets with 'n'.\n\nCondensation polymerisation: monomers with two functional groups join together, releasing a small molecule (usually water) each time. Two products: polymer + water. Examples: polyester (diol + dicarboxylic acid), nylon (diamine + dicarboxylic acid).\n\nNatural polymers: DNA (nucleotides), starch and cellulose (glucose), proteins (amino acids).\n\nProblems with plastic disposal: most plastics are non-biodegradable (persist for hundreds of years), burning releases toxic gases, ocean pollution harms wildlife. Solutions: recycling, biodegradable plastics from plant materials (e.g. corn starch), reducing use, incineration with energy recovery.",
        keyTerms: [
          { term: "Polymer", definition: "A long-chain molecule made by joining many small monomer molecules" },
          { term: "Monomer", definition: "A small molecule that joins with others to form a polymer" },
          { term: "Addition polymerisation", definition: "Alkene monomers join by opening C=C bonds — one product only" },
          { term: "Condensation polymerisation", definition: "Monomers join releasing a small molecule (usually water)" },
          { term: "Biodegradable", definition: "Can be broken down by microorganisms in the environment" },
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 1: FORCES AND MOTION
  // =====================================================================
  {
    topicId: "forces-motion",
    subject: "physics",
    title: "Forces and Motion",
    sections: [
      {
        heading: "Speed, Distance and Time",
        content:
          "Speed is a measure of how fast something is moving. It tells you the distance travelled per unit of time. The standard SI unit of speed is metres per second (m/s), but you may also see kilometres per hour (km/h).\n\nTo calculate speed, use the equation: speed = distance / time. This can be rearranged to find distance (distance = speed x time) or time (time = distance / speed).\n\nTypical speeds vary depending on the situation. Walking is about 1.5 m/s, running about 3 m/s, cycling about 6 m/s, and a car on a motorway about 30 m/s. Sound travels at roughly 340 m/s in air.\n\nAverage speed considers the total distance covered over the total time taken. An object may speed up, slow down, or stop during a journey, but the average speed smooths this out. Instantaneous speed is the speed at a particular moment in time.",
        keyTerms: [
          { term: "Speed", definition: "The distance travelled per unit time, measured in m/s" },
          { term: "Average speed", definition: "Total distance divided by total time for a whole journey" },
          { term: "Instantaneous speed", definition: "The speed of an object at a particular moment in time" },
        ],
        importantEquations: [
          "speed (m/s) = distance (m) / time (s)",
          "distance = speed × time",
          "time = distance / speed",
        ],
      },
      {
        heading: "Velocity and Acceleration",
        content:
          "Velocity is the speed of an object in a given direction. It is a vector quantity, meaning it has both magnitude and direction. Speed is a scalar quantity — it only has magnitude. Two objects moving at the same speed but in opposite directions have different velocities.\n\nAcceleration is the rate of change of velocity. If an object is speeding up, it has a positive acceleration. If it is slowing down, it has a negative acceleration (deceleration). Acceleration is measured in metres per second squared (m/s²).\n\nThe equation for acceleration is: acceleration = change in velocity / time taken, or a = (v − u) / t, where v is the final velocity, u is the initial velocity, and t is the time taken.\n\nUniform acceleration means the velocity changes by equal amounts in equal time intervals. Non-uniform acceleration means the rate of change of velocity itself varies over time. An object in free fall near the Earth's surface accelerates uniformly at approximately 9.8 m/s² (often rounded to 10 m/s² in calculations).",
        keyTerms: [
          { term: "Velocity", definition: "Speed in a given direction — a vector quantity (m/s)" },
          { term: "Acceleration", definition: "The rate of change of velocity, measured in m/s²" },
          { term: "Deceleration", definition: "Negative acceleration — the object is slowing down" },
          { term: "Vector quantity", definition: "A quantity that has both magnitude and direction (e.g. velocity, force)" },
          { term: "Scalar quantity", definition: "A quantity that has magnitude only (e.g. speed, mass, distance)" },
        ],
        importantEquations: [
          "a = (v − u) / t  where a = acceleration, v = final velocity, u = initial velocity, t = time",
          "v = u + at",
          "v² = u² + 2as  (where s = distance)",
        ],
      },
      {
        heading: "Distance–Time and Velocity–Time Graphs",
        content:
          "Distance–time (D–T) graphs show how far an object has travelled over time. The gradient (slope) of a D–T graph gives the speed. A straight diagonal line means constant speed. A steeper line means a faster speed. A horizontal line means the object is stationary (not moving). A curved line means the speed is changing — the object is accelerating or decelerating.\n\nVelocity–time (V–T) graphs show how the velocity of an object changes over time. The gradient of a V–T graph gives the acceleration. A positive gradient means the object is accelerating. A negative gradient means it is decelerating. A horizontal line means constant velocity. The area under a V–T graph gives the distance (displacement) travelled.\n\nTo calculate the area under a V–T graph, split it into rectangles and triangles. The area of a rectangle is base × height. The area of a triangle is ½ × base × height. Add these together to find the total distance.\n\nThese graphs are essential for analysing motion. In the exam, you may be asked to draw, interpret, or calculate values from them. Always label axes clearly and include units.",
        keyTerms: [
          { term: "D–T graph", definition: "A graph of distance (y-axis) against time (x-axis); gradient = speed" },
          { term: "V–T graph", definition: "A graph of velocity (y-axis) against time (x-axis); gradient = acceleration, area under graph = distance" },
          { term: "Gradient", definition: "The slope of a line on a graph, calculated as the change in y divided by the change in x" },
        ],
        importantEquations: [
          "Gradient of D–T graph = speed",
          "Gradient of V–T graph = acceleration",
          "Area under V–T graph = distance travelled",
        ],
      },
      {
        heading: "Forces and Newton's Laws",
        content:
          "A force is a push or pull that can change the shape, speed, or direction of an object. Forces are measured in newtons (N) and are vector quantities. Common forces include weight (gravitational force), friction, air resistance (drag), tension, normal contact force, and thrust.\n\nNewton's First Law: An object remains at rest or continues to move at a constant velocity unless acted on by a resultant (unbalanced) force. If the forces on an object are balanced (resultant force = 0), there is no change in motion.\n\nNewton's Second Law: The acceleration of an object is directly proportional to the resultant force acting on it and inversely proportional to its mass. This gives the equation F = ma. A larger force produces a greater acceleration. A larger mass requires a greater force to produce the same acceleration.\n\nNewton's Third Law: When two objects interact, they exert equal and opposite forces on each other. These forces act on different objects, are the same type, and are equal in magnitude but opposite in direction. For example, when you push a wall, the wall pushes back on you with an equal force.\n\nWeight is the force of gravity acting on an object's mass. Weight = mass × gravitational field strength (W = mg). On Earth, g ≈ 9.8 N/kg (often approximated as 10 N/kg). Mass is a measure of the amount of matter and does not change with location; weight does.",
        keyTerms: [
          { term: "Resultant force", definition: "The overall net force on an object when all forces are combined" },
          { term: "Newton's First Law", definition: "An object stays at rest or at constant velocity unless a resultant force acts on it" },
          { term: "Newton's Second Law", definition: "F = ma — force equals mass times acceleration" },
          { term: "Newton's Third Law", definition: "Every action has an equal and opposite reaction, acting on different objects" },
          { term: "Weight", definition: "The force of gravity acting on an object, measured in newtons (W = mg)" },
          { term: "Mass", definition: "The amount of matter in an object, measured in kilograms — does not change with location" },
        ],
        importantEquations: [
          "F = ma  (force = mass × acceleration)",
          "W = mg  (weight = mass × gravitational field strength)",
        ],
      },
      {
        heading: "Stopping Distances",
        content:
          "Stopping distance is the total distance a vehicle travels from when the driver first sees a hazard to when the vehicle comes to a complete stop. It is made up of two parts: thinking distance + braking distance.\n\nThinking distance is the distance the car travels during the driver's reaction time (the time between seeing the hazard and pressing the brake). Factors that increase thinking distance include tiredness, alcohol or drugs, distractions (e.g. mobile phone), higher speed, and illness.\n\nBraking distance is the distance the car travels after the brakes have been applied until it stops. Factors that increase braking distance include wet or icy roads, worn tyres, worn brakes, higher speed, and a heavier vehicle. At higher speeds, the braking force needed is much greater, and the kinetic energy that must be converted to heat by the brakes is much larger.\n\nStopping distances increase significantly with speed. If the speed doubles, the thinking distance doubles, but the braking distance roughly quadruples (because kinetic energy depends on velocity squared). This is why speed limits in urban areas are lower, to reduce stopping distances and the severity of collisions.",
        keyTerms: [
          { term: "Stopping distance", definition: "Total distance = thinking distance + braking distance" },
          { term: "Thinking distance", definition: "Distance travelled during the driver's reaction time before braking begins" },
          { term: "Braking distance", definition: "Distance travelled from when brakes are applied until the vehicle stops" },
          { term: "Reaction time", definition: "The time between a stimulus and the driver's response, typically 0.5–1.0 seconds" },
        ],
      },
      {
        heading: "Momentum",
        content:
          "Momentum is a property of a moving object. It depends on both the mass and the velocity of the object. Momentum is a vector quantity (it has direction) and is measured in kilogram metres per second (kg m/s).\n\nThe equation for momentum is: p = mv, where p is momentum, m is mass, and v is velocity.\n\nThe principle of conservation of momentum states that in a closed system, the total momentum before an event (such as a collision or explosion) equals the total momentum after the event, provided no external forces act.\n\nIn a collision between two objects: total momentum before = total momentum after. This applies to both elastic collisions (where kinetic energy is conserved) and inelastic collisions (where kinetic energy is not conserved, e.g. objects stick together).\n\nForce is related to the rate of change of momentum: F = (mv − mu) / t, or equivalently F = Δp / t. A longer impact time reduces the force. This principle is used in car safety features such as crumple zones, seatbelts, and airbags, which all increase the time over which the momentum changes, thereby reducing the force on the passengers.",
        keyTerms: [
          { term: "Momentum", definition: "The product of mass and velocity (p = mv), measured in kg m/s" },
          { term: "Conservation of momentum", definition: "Total momentum before an event = total momentum after, in a closed system with no external forces" },
          { term: "Elastic collision", definition: "A collision where kinetic energy is conserved (objects bounce apart)" },
          { term: "Inelastic collision", definition: "A collision where kinetic energy is not conserved (objects may stick together)" },
          { term: "Crumple zone", definition: "Part of a car designed to deform on impact, increasing collision time and reducing force" },
        ],
        importantEquations: [
          "p = mv  (momentum = mass × velocity)",
          "Total momentum before = Total momentum after (conservation of momentum)",
          "F = Δp / t  (force = change in momentum / time)",
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 2: ELECTRICITY
  // =====================================================================
  {
    topicId: "electricity",
    subject: "physics",
    title: "Electricity",
    sections: [
      {
        heading: "Charge, Current and Voltage",
        content:
          "Electric current is the rate of flow of electric charge. In metal conductors, the charge carriers are free electrons that move through the metal lattice. Current is measured in amperes (A) using an ammeter, which is connected in series in a circuit.\n\nCharge is measured in coulombs (C). The relationship between charge, current, and time is: Q = It, where Q is charge, I is current, and t is time in seconds. So 1 ampere is 1 coulomb of charge passing a point per second.\n\nPotential difference (voltage) is the energy transferred per unit of charge that passes between two points. It is measured in volts (V) using a voltmeter, which is connected in parallel across a component. One volt means one joule of energy is transferred per coulomb of charge.\n\nConventional current flows from positive to negative around a circuit. Electron flow is in the opposite direction — from negative to positive. This convention was established before the discovery of the electron.\n\nFor a circuit to work, there must be a complete loop with a source of potential difference (such as a cell or battery). A cell provides direct current (DC), which flows in one direction only. Mains electricity is alternating current (AC), where the direction of current reverses many times per second.",
        keyTerms: [
          { term: "Current", definition: "The rate of flow of electric charge, measured in amperes (A)" },
          { term: "Charge", definition: "A property of matter; charge carriers (electrons) flow to create current; measured in coulombs (C)" },
          { term: "Potential difference (voltage)", definition: "Energy transferred per coulomb of charge, measured in volts (V)" },
          { term: "Ammeter", definition: "Instrument used to measure current; connected in series" },
          { term: "Voltmeter", definition: "Instrument used to measure potential difference; connected in parallel" },
          { term: "Direct current (DC)", definition: "Current that flows in one direction only (e.g. from a battery)" },
          { term: "Alternating current (AC)", definition: "Current that repeatedly reverses direction (e.g. mains supply)" },
        ],
        importantEquations: [
          "Q = It  (charge = current × time)",
        ],
      },
      {
        heading: "Resistance and Ohm's Law",
        content:
          "Resistance is the opposition to the flow of current in a circuit. It is measured in ohms (Ω). A higher resistance means less current flows for a given potential difference.\n\nOhm's Law states that the current through a conductor is directly proportional to the potential difference across it, provided the temperature remains constant. This gives the equation V = IR, which can be rearranged to I = V/R or R = V/I.\n\nAn ohmic conductor (e.g. a resistor at constant temperature) obeys Ohm's Law — its I–V graph is a straight line through the origin. A filament lamp does not obey Ohm's Law because as the current increases the filament heats up, increasing resistance, so the I–V graph curves.\n\nA diode only allows current to flow in one direction (forward bias). In reverse bias it has very high resistance and no current flows. An LED (light-emitting diode) emits light when current flows through it in the forward direction.\n\nA thermistor is a resistor whose resistance decreases as temperature increases. It is used in temperature sensors and thermostats. An LDR (light-dependent resistor) has a resistance that decreases as light intensity increases. It is used in automatic lighting circuits and light meters.",
        keyTerms: [
          { term: "Resistance", definition: "Opposition to current flow, measured in ohms (Ω)" },
          { term: "Ohm's Law", definition: "V = IR; current is proportional to p.d. at constant temperature" },
          { term: "Ohmic conductor", definition: "A conductor that obeys Ohm's Law (constant resistance); straight-line I–V graph" },
          { term: "Diode", definition: "A component that allows current to flow in one direction only" },
          { term: "Thermistor", definition: "A resistor whose resistance decreases as temperature increases" },
          { term: "LDR", definition: "Light-dependent resistor — resistance decreases as light intensity increases" },
        ],
        importantEquations: [
          "V = IR  (potential difference = current × resistance)",
          "I = V / R",
          "R = V / I",
        ],
      },
      {
        heading: "Series and Parallel Circuits",
        content:
          "In a series circuit, components are connected end to end in a single loop. The current is the same through every component. The total potential difference of the supply is shared across all components. The total resistance is the sum of all individual resistances: R_total = R₁ + R₂ + R₃.\n\nIn a parallel circuit, components are connected on separate branches. The potential difference across each branch is the same (equal to the supply voltage). The total current from the supply is shared between the branches (the current splits). Adding more resistors in parallel decreases the total resistance because there are more paths for current to flow.\n\nFor resistors in parallel, the total resistance is found using: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃. The total resistance in parallel is always less than the smallest individual resistor.\n\nIn series: if one component breaks, the whole circuit stops because there is only one path. In parallel: if one branch breaks, current still flows through the other branches. This is why household circuits are wired in parallel — each appliance can be switched on and off independently, and they all receive the full mains voltage.",
        keyTerms: [
          { term: "Series circuit", definition: "Components connected in one loop; same current throughout; voltages shared" },
          { term: "Parallel circuit", definition: "Components on separate branches; same voltage across each branch; current shared" },
        ],
        importantEquations: [
          "Series: R_total = R₁ + R₂ + R₃",
          "Parallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃",
          "Series: V_total = V₁ + V₂ + V₃",
          "Parallel: I_total = I₁ + I₂ + I₃",
        ],
        tables: [
          {
            title: "Series vs Parallel Circuits",
            headers: ["Property", "Series", "Parallel"],
            rows: [
              ["Current", "Same through all components", "Splits between branches"],
              ["Voltage", "Shared across components", "Same across each branch"],
              ["Resistance", "R_total = R₁ + R₂ + ...", "1/R_total = 1/R₁ + 1/R₂ + ..."],
              ["If one component breaks", "Whole circuit stops", "Other branches still work"],
            ],
          },
        ],
      },
      {
        heading: "Electrical Power and Energy",
        content:
          "Electrical power is the rate at which energy is transferred by an electrical component. It is measured in watts (W). One watt equals one joule of energy transferred per second.\n\nThe key power equations are: P = IV (power = current × voltage), P = I²R (power = current squared × resistance), and P = V²/R (power = voltage squared / resistance). These can all be derived from combining P = IV with V = IR.\n\nEnergy transferred by an electrical device is calculated using: E = Pt (energy = power × time), where energy is in joules (J), power is in watts (W), and time is in seconds (s). This can also be written as E = IVt (energy = current × voltage × time).\n\nElectricity bills use the kilowatt-hour (kWh) as the unit of energy. One kWh is the energy used by a 1 kW appliance running for 1 hour. To calculate: Energy (kWh) = Power (kW) × Time (hours). Cost = Energy (kWh) × Price per kWh.\n\nHigh-power appliances (like kettles and heaters) transfer energy quickly and use more electricity. Energy efficiency in the home can be improved by using low-power appliances (e.g. LED bulbs instead of filament bulbs) and reducing usage time.",
        keyTerms: [
          { term: "Electrical power", definition: "The rate of energy transfer by an electrical component, measured in watts (W)" },
          { term: "Kilowatt-hour (kWh)", definition: "The energy used by a 1 kW device in 1 hour; the unit used on electricity bills" },
          { term: "Watt", definition: "The unit of power; 1 W = 1 J/s" },
        ],
        importantEquations: [
          "P = IV  (power = current × voltage)",
          "P = I²R  (power = current² × resistance)",
          "P = V²/R",
          "E = Pt  (energy = power × time)",
          "E = IVt  (energy = current × voltage × time)",
          "Energy (kWh) = Power (kW) × Time (hours)",
          "Cost = Energy (kWh) × Price per kWh",
        ],
      },
      {
        heading: "Static Electricity",
        content:
          "Static electricity is caused by the transfer of electrons between materials when they are rubbed together. When two insulating materials are rubbed, friction causes electrons to transfer from one surface to the other. The material that gains electrons becomes negatively charged; the material that loses electrons becomes positively charged.\n\nOnly electrons move — protons are fixed in the nucleus and cannot transfer. The charges are called static because they cannot flow away (insulators do not allow charge to move freely).\n\nLike charges repel each other (positive repels positive, negative repels negative). Opposite charges attract each other (positive attracts negative). A charged object can also attract a neutral (uncharged) object by inducing a charge on its surface.\n\nStatic electricity can be dangerous. Sparks from static discharge can cause explosions in fuel stations or when refuelling aircraft. Lightning is a massive natural static discharge. Anti-static measures include earthing (connecting a conductor to the ground to allow charge to flow away safely), using anti-static wrist straps when handling electronic components, and earthing straps on fuel tankers.\n\nStatic electricity has useful applications: electrostatic paint sprayers give objects an even coat by charging the paint droplets so they repel each other and are attracted to the grounded object. Photocopiers and laser printers use static charge to transfer toner onto paper. Electrostatic precipitators remove smoke particles from chimneys.",
        keyTerms: [
          { term: "Static electricity", definition: "A build-up of charge on an insulating surface caused by transfer of electrons" },
          { term: "Earthing", definition: "Connecting a charged object to the ground via a conductor so charge can flow away safely" },
          { term: "Electrostatic attraction", definition: "Opposite charges attract each other" },
          { term: "Electrostatic repulsion", definition: "Like charges repel each other" },
          { term: "Insulator", definition: "A material that does not allow charge to flow through it easily" },
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 3: WAVES
  // =====================================================================
  {
    topicId: "waves",
    subject: "physics",
    title: "Waves",
    sections: [
      {
        heading: "Wave Properties",
        content:
          "A wave is a disturbance that transfers energy from one place to another without transferring matter. The particles of the medium vibrate about their rest position but do not travel with the wave.\n\nTransverse waves have oscillations (vibrations) perpendicular to the direction of energy transfer. Examples include light, all electromagnetic waves, water waves, and waves on a string. Transverse waves can be shown on a displacement–distance or displacement–time graph.\n\nLongitudinal waves have oscillations parallel to the direction of energy transfer. Sound is the most important example. Longitudinal waves consist of compressions (where particles are pushed close together) and rarefactions (where particles are spread apart).\n\nKey wave properties: Wavelength (λ) is the distance between two consecutive identical points on a wave (e.g. crest to crest or compression to compression), measured in metres. Frequency (f) is the number of complete waves passing a point per second, measured in hertz (Hz). Amplitude is the maximum displacement of a particle from its rest position — a larger amplitude means more energy. Period (T) is the time for one complete wave to pass a point; T = 1/f.\n\nThe wave equation links speed, frequency, and wavelength: v = fλ. This applies to all types of waves.",
        keyTerms: [
          { term: "Transverse wave", definition: "Oscillations are perpendicular to the direction of energy transfer (e.g. light, water waves)" },
          { term: "Longitudinal wave", definition: "Oscillations are parallel to the direction of energy transfer (e.g. sound)" },
          { term: "Wavelength (λ)", definition: "The distance between two consecutive identical points on a wave, measured in metres" },
          { term: "Frequency (f)", definition: "The number of complete waves per second, measured in hertz (Hz)" },
          { term: "Amplitude", definition: "The maximum displacement from the rest position; determines the wave's energy" },
          { term: "Compression", definition: "A region in a longitudinal wave where particles are pushed close together" },
          { term: "Rarefaction", definition: "A region in a longitudinal wave where particles are spread apart" },
        ],
        importantEquations: [
          "v = fλ  (wave speed = frequency × wavelength)",
          "T = 1/f  (period = 1 / frequency)",
        ],
      },
      {
        heading: "Reflection and Refraction",
        content:
          "Reflection occurs when a wave bounces off a surface. The law of reflection states that the angle of incidence equals the angle of reflection. Both angles are measured from the normal (an imaginary line perpendicular to the surface at the point of incidence). Reflection from a smooth flat surface (like a mirror) produces a clear image; reflection from a rough surface scatters the light (diffuse reflection).\n\nRefraction is the change in direction of a wave when it passes from one medium to another and changes speed. When light travels from a less dense medium (e.g. air) into a more dense medium (e.g. glass), it slows down and bends towards the normal. When it passes from a more dense to a less dense medium, it speeds up and bends away from the normal.\n\nSnell's Law relates the angles and speeds: n₁ sin θ₁ = n₂ sin θ₂, where n is the refractive index and θ is the angle to the normal. The refractive index of a material is n = c / v, where c is the speed of light in a vacuum and v is the speed in the material.\n\nTotal internal reflection occurs when light travelling through a denser medium hits the boundary with a less dense medium at an angle greater than the critical angle. All the light is reflected back into the denser medium. This principle is used in optical fibres (for broadband and medical endoscopes) and in prisms (binoculars, periscopes).",
        keyTerms: [
          { term: "Reflection", definition: "A wave bouncing off a surface; angle of incidence = angle of reflection" },
          { term: "Refraction", definition: "A change in direction when a wave passes between media of different densities due to a change in speed" },
          { term: "Normal", definition: "An imaginary line perpendicular to a surface at the point where a ray hits it" },
          { term: "Refractive index", definition: "A measure of how much a material slows down light; n = c/v" },
          { term: "Total internal reflection", definition: "All light reflected back inside a denser medium when the angle of incidence exceeds the critical angle" },
          { term: "Critical angle", definition: "The angle of incidence above which total internal reflection occurs" },
        ],
        importantEquations: [
          "Angle of incidence = Angle of reflection (law of reflection)",
          "n = c / v  (refractive index = speed of light in vacuum / speed of light in material)",
          "n₁ sin θ₁ = n₂ sin θ₂  (Snell's Law)",
          "sin c = 1/n  (critical angle for a material-to-air boundary)",
        ],
      },
      {
        heading: "The Electromagnetic Spectrum",
        content:
          "The electromagnetic (EM) spectrum is a continuous range of transverse waves that all travel at the speed of light (3 × 10⁸ m/s) in a vacuum. They are produced by vibrating charges and do not need a medium to travel through.\n\nIn order of increasing frequency and decreasing wavelength, the EM spectrum is: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. All EM waves transfer energy.\n\nDifferent parts of the spectrum have different uses. Radio waves are used for TV and radio broadcasts. Microwaves are used for mobile phone signals, satellite communication, and cooking. Infrared is used in remote controls, thermal cameras, heaters, and optical fibre communication. Visible light is used for seeing, photography, and optical fibre communication. Ultraviolet is used in fluorescent lamps, security marking, and sterilising water. X-rays are used for medical imaging of bones and airport security scanners. Gamma rays are used to sterilise medical equipment, treat cancer (radiotherapy), and as a tracer in medical diagnosis.\n\nHigher frequency EM waves carry more energy and are generally more dangerous to living tissue. Ultraviolet can cause sunburn and skin cancer. X-rays and gamma rays can cause cell damage, mutations, and cancer. The danger increases with exposure time and intensity.",
        keyTerms: [
          { term: "Electromagnetic spectrum", definition: "The continuous range of EM waves, from radio waves to gamma rays" },
          { term: "EM wave", definition: "A transverse wave consisting of oscillating electric and magnetic fields; travels at 3 × 10⁸ m/s in a vacuum" },
          { term: "Ionising radiation", definition: "Radiation with enough energy to remove electrons from atoms (UV, X-rays, gamma rays)" },
        ],
        importantEquations: [
          "v = fλ  applies to all EM waves (v = 3 × 10⁸ m/s in a vacuum)",
        ],
        tables: [
          {
            title: "The Electromagnetic Spectrum",
            headers: ["Type", "Wavelength", "Typical Use", "Hazard"],
            rows: [
              ["Radio waves", "km to m", "TV & radio broadcasts", "Generally safe"],
              ["Microwaves", "cm", "Mobile phones, cooking, satellites", "Internal heating of body tissue"],
              ["Infrared", "μm to mm", "Remote controls, heaters, thermal cameras", "Skin burns"],
              ["Visible light", "400–700 nm", "Seeing, photography", "Eye damage at high intensity"],
              ["Ultraviolet", "nm", "Fluorescent lamps, sterilisation", "Sunburn, skin cancer"],
              ["X-rays", "< 1 nm", "Medical imaging, security", "Cell damage, mutations, cancer"],
              ["Gamma rays", "< 0.01 nm", "Sterilisation, cancer treatment", "Cell damage, mutations, cancer"],
            ],
          },
        ],
      },
      {
        heading: "Sound",
        content:
          "Sound is a longitudinal wave produced by vibrating objects. The vibrations create a series of compressions and rarefactions in the surrounding medium (usually air). Sound requires a medium to travel through — it cannot travel through a vacuum.\n\nThe speed of sound in air is approximately 340 m/s. Sound travels faster in solids (e.g. ~5000 m/s in steel) and liquids (e.g. ~1500 m/s in water) than in gases, because the particles are closer together and can pass on vibrations more quickly.\n\nPitch is determined by the frequency of a sound wave. A higher frequency produces a higher pitch. Volume (loudness) is determined by the amplitude. A larger amplitude means a louder sound.\n\nHumans can typically hear sounds in the frequency range of 20 Hz to 20,000 Hz (20 kHz). Sound below 20 Hz is called infrasound. Sound above 20 kHz is called ultrasound. Ultrasound has many uses including medical imaging (prenatal scans), sonar (measuring ocean depth), and industrial quality control (detecting flaws in materials).\n\nEchoes are reflections of sound waves off hard surfaces. The time delay between the original sound and the echo can be used to calculate distances using speed = distance / time.",
        keyTerms: [
          { term: "Sound", definition: "A longitudinal wave caused by vibrating objects; requires a medium to travel" },
          { term: "Pitch", definition: "How high or low a sound is; determined by the frequency of the wave" },
          { term: "Loudness", definition: "How loud a sound is; determined by the amplitude of the wave" },
          { term: "Ultrasound", definition: "Sound waves with frequencies above 20,000 Hz (above human hearing range)" },
          { term: "Infrasound", definition: "Sound waves with frequencies below 20 Hz (below human hearing range)" },
          { term: "Echo", definition: "A reflection of a sound wave off a surface" },
        ],
        importantEquations: [
          "v = fλ  (applies to sound waves)",
          "Speed of sound in air ≈ 340 m/s",
        ],
      },
      {
        heading: "Lenses and Images",
        content:
          "A lens is a shaped piece of transparent material (usually glass) that refracts light. There are two main types: converging (convex) lenses and diverging (concave) lenses.\n\nA converging lens is thicker in the middle and causes parallel rays of light to converge (come together) at a single point called the principal focus (or focal point). The focal length is the distance from the centre of the lens to the principal focus.\n\nA diverging lens is thinner in the middle and causes parallel rays of light to spread out (diverge). The rays appear to come from a virtual principal focus on the same side as the incoming light.\n\nImages formed by converging lenses depend on the position of the object relative to the focal point. When the object is beyond 2F: the image is real, inverted, smaller (diminished), and between F and 2F on the other side. When the object is between F and 2F: the image is real, inverted, and magnified (larger), beyond 2F. When the object is closer than F: the image is virtual, upright, and magnified — this is how a magnifying glass works.\n\nA real image is formed where light rays actually converge and can be projected onto a screen. A virtual image is formed where light rays appear to come from but do not actually meet — it cannot be projected onto a screen. Magnification = image height / object height.",
        keyTerms: [
          { term: "Converging (convex) lens", definition: "A lens that is thicker in the middle; brings parallel light rays together at the principal focus" },
          { term: "Diverging (concave) lens", definition: "A lens that is thinner in the middle; spreads parallel light rays apart" },
          { term: "Principal focus (focal point)", definition: "The point where parallel rays of light converge (or appear to diverge from) after passing through a lens" },
          { term: "Focal length", definition: "The distance from the centre of the lens to the principal focus" },
          { term: "Real image", definition: "An image formed where light rays actually converge; can be projected onto a screen" },
          { term: "Virtual image", definition: "An image formed where light rays appear to come from; cannot be projected onto a screen" },
        ],
        importantEquations: [
          "Magnification = image height / object height",
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 4: ENERGY RESOURCES AND TRANSFERS
  // =====================================================================
  {
    topicId: "energy-resources",
    subject: "physics",
    title: "Energy Resources & Transfers",
    sections: [
      {
        heading: "Energy Stores and Transfers",
        content:
          "Energy is measured in joules (J). Energy cannot be created or destroyed, only transferred from one store to another. There are eight main energy stores: kinetic (energy of a moving object), gravitational potential (energy of an object raised above the ground), elastic potential (energy stored in a stretched or compressed object), thermal (internal energy related to temperature), chemical (energy stored in chemical bonds, e.g. food, fuels, batteries), magnetic (energy stored in magnetic fields), electrostatic (energy stored in electric fields), and nuclear (energy stored in the nuclei of atoms).\n\nEnergy can be transferred between stores in four main ways: mechanically (by a force doing work), electrically (by a current flowing through a circuit), by heating (due to a temperature difference), and by radiation (by waves such as light or sound).\n\nWork done is the energy transferred when a force moves an object through a distance. Work done (J) = Force (N) × distance moved in the direction of the force (m). If no movement occurs, no work is done (even if a force is applied).\n\nKinetic energy is calculated using KE = ½mv², where m is mass and v is velocity. Gravitational potential energy is calculated using GPE = mgh, where m is mass, g is gravitational field strength, and h is height.",
        keyTerms: [
          { term: "Kinetic energy store", definition: "Energy stored in a moving object" },
          { term: "Gravitational potential energy store", definition: "Energy stored in an object raised above the ground" },
          { term: "Thermal energy store", definition: "Internal energy related to the temperature of an object" },
          { term: "Chemical energy store", definition: "Energy stored in chemical bonds (fuels, food, batteries)" },
          { term: "Nuclear energy store", definition: "Energy stored in the nuclei of atoms" },
          { term: "Work done", definition: "Energy transferred when a force moves an object; measured in joules" },
        ],
        importantEquations: [
          "Work done (J) = Force (N) × distance (m)    W = Fd",
          "KE = ½mv²  (kinetic energy = ½ × mass × velocity²)",
          "GPE = mgh  (gravitational potential energy = mass × g × height)",
        ],
      },
      {
        heading: "Conservation of Energy",
        content:
          "The principle of conservation of energy states that energy cannot be created or destroyed — it can only be transferred from one store to another. The total energy of a closed system always remains constant.\n\nIn any energy transfer, the total energy before equals the total energy after. For example, when a ball is dropped, gravitational potential energy is transferred to kinetic energy. At any point during the fall (ignoring air resistance): GPE lost = KE gained, so mgh = ½mv².\n\nIn reality, not all energy is usefully transferred. Some energy is always dissipated (wasted), usually to thermal energy stores of the surroundings through friction or air resistance. This wasted energy spreads out and becomes increasingly difficult to use. The energy has not been destroyed — it has just been spread out and is no longer useful.\n\nEnergy transfer diagrams (Sankey diagrams) show how energy is transferred. The width of each arrow is proportional to the amount of energy it represents. The useful energy output is usually shown going to the right, and the wasted energy is shown going downward. The total width of the output arrows must equal the width of the input arrow (conservation of energy).",
        keyTerms: [
          { term: "Conservation of energy", definition: "Energy cannot be created or destroyed, only transferred between stores" },
          { term: "Dissipated energy", definition: "Energy that has been transferred to useless thermal energy stores, spread out to the surroundings" },
          { term: "Sankey diagram", definition: "A diagram showing energy transfers; arrow widths are proportional to energy amounts" },
        ],
      },
      {
        heading: "Efficiency",
        content:
          "Efficiency is a measure of how much of the input energy is usefully transferred. No device is 100% efficient because some energy is always wasted (dissipated as heat due to friction, air resistance, or electrical resistance).\n\nEfficiency can be calculated using: Efficiency = (useful energy output / total energy input) × 100%. This gives efficiency as a percentage. Efficiency can also be calculated using power: Efficiency = (useful power output / total power input) × 100%.\n\nFor example, if a light bulb uses 60 J of electrical energy and produces 9 J of useful light energy, the efficiency is (9/60) × 100% = 15%. The remaining 51 J is wasted as thermal energy.\n\nWays to increase efficiency include: lubricating moving parts to reduce friction, streamlining shapes to reduce air resistance, using thermal insulation to reduce heat loss, and using more efficient components (e.g. LED bulbs instead of filament bulbs).\n\nEnergy efficiency is important for reducing fuel consumption, reducing energy costs, and reducing environmental impact. Higher efficiency means less wasted energy and fewer resources consumed for the same useful output.",
        keyTerms: [
          { term: "Efficiency", definition: "The proportion of input energy (or power) that is usefully transferred; always less than 100%" },
          { term: "Wasted energy", definition: "Energy that is not usefully transferred, usually dissipated as heat" },
        ],
        importantEquations: [
          "Efficiency = (useful energy output / total energy input) × 100%",
          "Efficiency = (useful power output / total power input) × 100%",
        ],
      },
      {
        heading: "Renewable and Non-Renewable Energy Resources",
        content:
          "Non-renewable energy resources will run out eventually because they are being used faster than they can be replaced. The main non-renewable resources are fossil fuels (coal, oil, natural gas) and nuclear fuel (uranium). Fossil fuels are burned to heat water, producing steam that drives turbines connected to generators. They are reliable and can meet high demand, but they produce carbon dioxide (contributing to climate change), sulfur dioxide (causing acid rain), and particulates (causing health problems).\n\nNuclear power uses the energy released by nuclear fission of uranium (or plutonium). It does not produce greenhouse gases during operation, but it generates radioactive waste that remains dangerous for thousands of years and is expensive to decommission.\n\nRenewable energy resources will not run out because they are naturally replenished. They include solar (photovoltaic cells convert sunlight to electricity), wind (turbines driven by wind), hydroelectric (water falling from a height drives turbines), tidal (tidal barrages use the movement of tides), wave (wave machines convert wave motion to electricity), geothermal (using heat from hot rocks underground), and biomass (burning or fermenting biological material).\n\nRenewable resources generally produce little or no greenhouse gases during operation, but they can be unreliable (dependent on weather or time of day), expensive to set up, and may have visual or environmental impacts. A mix of energy resources is needed for energy security.",
        keyTerms: [
          { term: "Non-renewable", definition: "An energy resource that will run out; it is used faster than it is formed" },
          { term: "Renewable", definition: "An energy resource that will not run out; it is naturally replenished" },
          { term: "Fossil fuel", definition: "A non-renewable fuel formed from ancient organisms (coal, oil, natural gas)" },
          { term: "Nuclear fission", definition: "Splitting a large atomic nucleus to release energy" },
          { term: "Biomass", definition: "Biological material used as fuel (e.g. wood, biogas)" },
        ],
        tables: [
          {
            title: "Renewable vs Non-Renewable Energy Resources",
            headers: ["Feature", "Non-Renewable (Fossil Fuels)", "Renewable"],
            rows: [
              ["Availability", "Will run out", "Will not run out"],
              ["Reliability", "Very reliable; can meet demand", "Often weather-dependent; can be unreliable"],
              ["CO₂ emissions", "High (contributes to climate change)", "Little or none during operation"],
              ["Set-up cost", "Moderate (power stations)", "Often high (e.g. wind farms, solar panels)"],
              ["Environmental impact", "Air pollution, habitat destruction", "Visual impact, habitat disruption, noise"],
              ["Examples", "Coal, oil, gas, nuclear", "Solar, wind, hydro, tidal, wave, geothermal, biomass"],
            ],
          },
        ],
      },
      {
        heading: "Specific Heat Capacity",
        content:
          "Specific heat capacity (SHC) is the amount of energy needed to raise the temperature of 1 kg of a substance by 1°C. It is measured in J/kg°C. Different materials have different specific heat capacities.\n\nThe equation linking energy, mass, specific heat capacity, and temperature change is: E = mcΔθ, where E is energy transferred (J), m is mass (kg), c is specific heat capacity (J/kg°C), and Δθ (delta theta) is the change in temperature (°C).\n\nWater has a high specific heat capacity (4200 J/kg°C), which means it takes a lot of energy to heat up and releases a lot of energy when cooling down. This makes water very useful as a coolant (in car engines and power stations) and for heating systems (radiators and hot water bottles). It also means that coastal areas have milder climates because the sea heats up and cools down slowly.\n\nMetals typically have lower specific heat capacities than water (e.g. aluminium is 900 J/kg°C, copper is 390 J/kg°C), so they heat up and cool down more quickly. This is why a metal spoon in a hot drink quickly feels hot.\n\nYou can measure specific heat capacity experimentally by heating a known mass of material with an electric heater, measuring the temperature rise, and calculating the energy supplied using E = Pt (energy = power × time).",
        keyTerms: [
          { term: "Specific heat capacity", definition: "The energy needed to raise the temperature of 1 kg of a substance by 1°C, measured in J/kg°C" },
          { term: "Thermal equilibrium", definition: "When two objects in contact reach the same temperature and no net energy is transferred between them" },
        ],
        importantEquations: [
          "E = mcΔθ  (energy = mass × specific heat capacity × temperature change)",
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 5: SOLIDS, LIQUIDS AND GASES
  // =====================================================================
  {
    topicId: "solids-liquids-gases",
    subject: "physics",
    title: "Solids, Liquids & Gases",
    sections: [
      {
        heading: "The Particle Model",
        content:
          "All matter is made up of tiny particles (atoms or molecules) that are constantly moving. The arrangement, spacing, and movement of these particles determine the state of matter: solid, liquid, or gas.\n\nIn solids, particles are closely packed in a regular arrangement. They vibrate about fixed positions but cannot move from place to place. Solids have a fixed shape and a fixed volume. The forces of attraction between particles are strong.\n\nIn liquids, particles are close together but arranged randomly. They can move around each other and slide past one another. Liquids have a fixed volume but take the shape of their container. The forces of attraction are weaker than in solids.\n\nIn gases, particles are far apart and move randomly at high speeds in all directions. They have very weak forces of attraction between them. Gases have no fixed shape and no fixed volume — they spread out to fill their container.\n\nAs temperature increases, the particles gain kinetic energy and move faster. This explains why solids expand when heated (particles vibrate more and push further apart) and why gases exert more pressure at higher temperatures (particles hit the container walls harder and more often).",
        keyTerms: [
          { term: "Particle model", definition: "A model describing how matter is made up of small particles whose arrangement determines the state" },
          { term: "Solid", definition: "Particles closely packed in a regular arrangement; fixed shape and volume" },
          { term: "Liquid", definition: "Particles close together but free to move past each other; fixed volume but no fixed shape" },
          { term: "Gas", definition: "Particles far apart and moving rapidly in random directions; no fixed shape or volume" },
          { term: "Kinetic energy of particles", definition: "Energy of particle motion; increases with temperature" },
        ],
        tables: [
          {
            title: "Properties of Solids, Liquids and Gases",
            headers: ["Property", "Solid", "Liquid", "Gas"],
            rows: [
              ["Particle arrangement", "Regular, closely packed", "Random, close together", "Random, far apart"],
              ["Particle movement", "Vibrate about fixed positions", "Move around each other", "Move rapidly in all directions"],
              ["Forces between particles", "Strong", "Moderate", "Very weak"],
              ["Shape", "Fixed", "Takes shape of container", "Fills container"],
              ["Volume", "Fixed", "Fixed", "No fixed volume"],
              ["Compressibility", "Cannot be compressed", "Cannot be compressed (easily)", "Easily compressed"],
            ],
          },
        ],
      },
      {
        heading: "Density",
        content:
          "Density is the mass per unit volume of a material. It tells you how much matter is packed into a given space. Density is measured in kilograms per cubic metre (kg/m³) or grams per cubic centimetre (g/cm³).\n\nThe equation for density is: ρ = m/V, where ρ (rho) is density, m is mass, and V is volume. This can be rearranged to m = ρV or V = m/ρ.\n\nSolids generally have the highest density because their particles are closely packed. Gases have the lowest density because their particles are very spread out. Liquids are in between. However, there are exceptions — for example, some metals like lithium and sodium are less dense than water.\n\nTo measure the density of a regular solid: measure the mass using a balance, calculate the volume using measurements and the appropriate formula (e.g. length × width × height for a cuboid), then use ρ = m/V.\n\nTo measure the density of an irregular solid: measure the mass using a balance, then find the volume by displacement — lower the object into a measuring cylinder of water and record the rise in water level (this equals the volume of the object).\n\nTo measure the density of a liquid: measure the mass of an empty measuring cylinder, pour in a known volume of liquid, measure the new mass, subtract to find the mass of the liquid, then use ρ = m/V.",
        keyTerms: [
          { term: "Density", definition: "Mass per unit volume of a material (ρ = m/V), measured in kg/m³ or g/cm³" },
          { term: "Displacement method", definition: "Finding the volume of an irregular object by measuring the rise in water level when it is submerged" },
        ],
        importantEquations: [
          "ρ = m / V  (density = mass / volume)",
          "m = ρV  (mass = density × volume)",
          "V = m / ρ  (volume = mass / density)",
        ],
      },
      {
        heading: "Pressure",
        content:
          "Pressure is the force per unit area. It is measured in pascals (Pa), where 1 Pa = 1 N/m². The equation is: p = F/A, where p is pressure, F is force, and A is area.\n\nA smaller area with the same force gives a higher pressure. This is why sharp objects (knives, nails) cut or pierce easily — the force is concentrated on a very small area. Conversely, a larger area with the same force gives a lower pressure — snowshoes spread your weight over a bigger area so you don't sink into the snow.\n\nPressure in a fluid (liquid or gas) acts in all directions. The pressure in a liquid increases with depth because of the weight of the liquid above. The equation for pressure in a column of liquid is: p = hρg, where h is the height (depth) of the liquid column, ρ is the density of the liquid, and g is the gravitational field strength.\n\nAtmospheric pressure is caused by the weight of the column of air above us. At sea level, atmospheric pressure is approximately 101,325 Pa (about 101 kPa). Atmospheric pressure decreases with altitude because there is less air above.\n\nGas pressure is caused by gas particles colliding with the walls of their container. Increasing the temperature increases the speed of the particles, so they hit the walls harder and more often, increasing the pressure (if the volume is constant). Decreasing the volume pushes particles closer together, increasing the frequency of collisions and therefore the pressure (at constant temperature).",
        keyTerms: [
          { term: "Pressure", definition: "Force per unit area, measured in pascals (Pa); p = F/A" },
          { term: "Atmospheric pressure", definition: "The pressure exerted by the weight of the air above; about 101 kPa at sea level" },
          { term: "Pascal (Pa)", definition: "The unit of pressure; 1 Pa = 1 N/m²" },
        ],
        importantEquations: [
          "p = F / A  (pressure = force / area)",
          "p = hρg  (pressure in a liquid = height × density × gravitational field strength)",
        ],
      },
      {
        heading: "Changes of State",
        content:
          "Changes of state occur when a substance changes between solid, liquid, and gas. These changes are physical changes — they are reversible and no new substance is formed.\n\nMelting is the change from solid to liquid. It occurs at the melting point. During melting, energy is absorbed by the particles to overcome the forces holding them in fixed positions. The temperature remains constant during melting because the energy is being used to break bonds between particles rather than to increase kinetic energy.\n\nBoiling (and evaporation) is the change from liquid to gas. Boiling occurs at the boiling point throughout the liquid. Evaporation can occur at any temperature from the surface of a liquid — faster-moving particles escape from the surface. Evaporation causes cooling because the most energetic particles leave, reducing the average kinetic energy (and therefore temperature) of the remaining liquid.\n\nCondensation is the change from gas to liquid (energy released). Freezing is the change from liquid to solid (energy released). Sublimation is the change directly from solid to gas without passing through the liquid state.\n\nDuring a change of state, the temperature remains constant even though energy is being supplied or removed. This is because the energy is being used to change the arrangement and separation of particles (breaking or forming bonds), not to change their kinetic energy.",
        keyTerms: [
          { term: "Melting", definition: "The change from solid to liquid at the melting point; energy is absorbed" },
          { term: "Boiling", definition: "The change from liquid to gas at the boiling point throughout the liquid; energy is absorbed" },
          { term: "Evaporation", definition: "The change from liquid to gas that occurs at any temperature from the surface of a liquid" },
          { term: "Condensation", definition: "The change from gas to liquid; energy is released" },
          { term: "Freezing", definition: "The change from liquid to solid; energy is released" },
          { term: "Sublimation", definition: "The change directly from solid to gas, without passing through the liquid state" },
        ],
      },
      {
        heading: "Specific and Latent Heat",
        content:
          "Specific latent heat is the energy needed to change the state of 1 kg of a substance without changing its temperature. It is measured in J/kg.\n\nThere are two types. Specific latent heat of fusion (Lf) is the energy needed to change 1 kg of a substance from solid to liquid (or released when changing from liquid to solid) at its melting point. Specific latent heat of vaporisation (Lv) is the energy needed to change 1 kg of a substance from liquid to gas (or released when changing from gas to liquid) at its boiling point.\n\nThe equation is: E = mL, where E is energy transferred (J), m is mass (kg), and L is specific latent heat (J/kg). The latent heat of vaporisation is always much larger than the latent heat of fusion for the same substance because more energy is needed to completely separate the particles (liquid to gas) than to loosen their arrangement (solid to liquid).\n\nFor water: Lf = 334,000 J/kg (334 kJ/kg) and Lv = 2,260,000 J/kg (2260 kJ/kg). This means it takes about 6.8 times more energy to boil water than to melt ice (for the same mass).\n\nOn a heating curve (temperature vs time graph for a substance being heated steadily), the flat sections represent changes of state where the temperature is constant despite energy being supplied. The sloped sections represent the substance warming up in a single state.",
        keyTerms: [
          { term: "Specific latent heat", definition: "The energy needed to change the state of 1 kg of a substance without changing its temperature (J/kg)" },
          { term: "Specific latent heat of fusion", definition: "The energy to change 1 kg of a substance from solid to liquid (or vice versa) at the melting point" },
          { term: "Specific latent heat of vaporisation", definition: "The energy to change 1 kg of a substance from liquid to gas (or vice versa) at the boiling point" },
          { term: "Heating curve", definition: "A graph of temperature against time for a substance being heated; flat sections show changes of state" },
        ],
        importantEquations: [
          "E = mL  (energy = mass × specific latent heat)",
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 6: MAGNETISM AND ELECTROMAGNETISM
  // =====================================================================
  {
    topicId: "magnetism",
    subject: "physics",
    title: "Magnetism & Electromagnetism",
    sections: [
      {
        heading: "Magnets and Magnetic Fields",
        content:
          "A magnet has two poles: a north pole and a south pole. Like poles repel (north-north or south-south), and unlike poles attract (north-south). This is the fundamental rule of magnetism.\n\nA magnetic field is the region around a magnet where a magnetic force is experienced. Magnetic field lines show the direction and strength of the field. They go from north to south outside the magnet. The field lines are closer together where the field is stronger (near the poles) and further apart where it is weaker.\n\nThe Earth has a magnetic field similar to that of a giant bar magnet. A compass needle is a small bar magnet that aligns with the Earth's magnetic field — the north-seeking pole of the compass points towards the Earth's magnetic north.\n\nMagnetic materials are attracted to magnets but are not themselves magnets. These include iron, steel, nickel, and cobalt. Non-magnetic materials (e.g. wood, plastic, copper, aluminium) are not attracted to magnets.\n\nThere are two types of magnets. Permanent magnets (e.g. bar magnets) produce their own magnetic field and always have magnetism. Induced magnets (temporary magnets) only become magnetic when placed in a magnetic field — when removed from the field, they lose most or all of their magnetism. Soft magnetic materials like iron are easy to magnetise and demagnetise (good for temporary magnets). Hard magnetic materials like steel are difficult to magnetise but retain magnetism well (good for permanent magnets).",
        keyTerms: [
          { term: "Magnetic field", definition: "The region around a magnet where a magnetic force is experienced" },
          { term: "Magnetic field lines", definition: "Lines showing the direction and strength of a magnetic field; run from north to south outside the magnet" },
          { term: "Permanent magnet", definition: "A magnet that produces its own persistent magnetic field" },
          { term: "Induced magnet", definition: "A material that becomes magnetic temporarily when placed in a magnetic field" },
          { term: "Magnetic material", definition: "A material that is attracted to magnets (iron, steel, nickel, cobalt)" },
        ],
      },
      {
        heading: "Electromagnets",
        content:
          "When an electric current flows through a wire, it produces a magnetic field around the wire. The field lines form concentric circles around the wire. The direction of the field can be found using the right-hand grip rule: grip the wire with your right hand so your thumb points in the direction of conventional current — your fingers curl in the direction of the magnetic field.\n\nA solenoid is a coil of wire. When current flows through a solenoid, it produces a magnetic field pattern similar to a bar magnet, with a north pole at one end and a south pole at the other. Inside the solenoid, the field is strong and uniform (field lines are parallel and evenly spaced).\n\nAn electromagnet is a solenoid with a soft iron core inside. The iron core becomes magnetised when current flows, greatly increasing the strength of the magnetic field. Electromagnets are very useful because they can be switched on and off by controlling the current.\n\nThe strength of an electromagnet can be increased by: increasing the current, increasing the number of turns (coils) of wire, and using a soft iron core. Electromagnets are used in electric bells, relay switches, magnetic locks, scrapyard cranes (for picking up and dropping magnetic materials), circuit breakers, and loudspeakers.",
        keyTerms: [
          { term: "Electromagnet", definition: "A solenoid with a soft iron core that produces a magnetic field when current flows; can be switched on and off" },
          { term: "Solenoid", definition: "A coil of wire that produces a magnetic field like a bar magnet when current flows through it" },
          { term: "Right-hand grip rule", definition: "A rule for finding the direction of the magnetic field around a current-carrying wire" },
          { term: "Soft iron core", definition: "An iron core inside a solenoid that greatly strengthens the magnetic field and is easily magnetised/demagnetised" },
        ],
      },
      {
        heading: "The Motor Effect",
        content:
          "When a current-carrying conductor is placed in a magnetic field, it experiences a force. This is called the motor effect. The force is at its maximum when the wire is perpendicular to the magnetic field and zero when the wire is parallel to the field.\n\nThe direction of the force can be determined using Fleming's left-hand rule: hold your left hand with the thumb, first finger, and second finger all at right angles to each other. The First finger points in the direction of the magnetic Field, the seCond finger points in the direction of the Current, and the thuMb points in the direction of the Motion (force).\n\nThe size of the force on a current-carrying conductor in a magnetic field is given by: F = BIl, where F is force (N), B is magnetic flux density (T, tesla), I is current (A), and l is the length of conductor in the field (m).\n\nThe force can be increased by increasing the current, increasing the magnetic field strength (flux density), or increasing the length of wire in the field.\n\nAn electric motor (DC motor) uses the motor effect. A coil of wire carrying a current is placed in a magnetic field. The forces on each side of the coil act in opposite directions, causing the coil to rotate. A split-ring commutator reverses the direction of current every half turn to keep the coil spinning in the same direction. Motors can spin faster by increasing the current, using a stronger magnet, or increasing the number of turns on the coil.",
        keyTerms: [
          { term: "Motor effect", definition: "The force experienced by a current-carrying conductor in a magnetic field" },
          { term: "Fleming's left-hand rule", definition: "First finger = Field, seCond finger = Current, thuMb = Motion (force)" },
          { term: "Magnetic flux density (B)", definition: "The strength of a magnetic field, measured in tesla (T)" },
          { term: "Split-ring commutator", definition: "A device in a DC motor that reverses the current direction every half turn to maintain rotation" },
        ],
        importantEquations: [
          "F = BIl  (force = magnetic flux density × current × length)",
        ],
      },
      {
        heading: "Electromagnetic Induction",
        content:
          "Electromagnetic induction is the process of generating a potential difference (voltage) across a conductor by changing the magnetic field around it. If the conductor is part of a complete circuit, a current will flow. This is the principle behind generators.\n\nA potential difference is induced when: a wire or coil moves through a magnetic field, or a magnet moves into or out of a coil, or the magnetic field through a coil changes. The key requirement is that there must be a change in the magnetic field experienced by the conductor — a stationary conductor in a constant magnetic field will not have an induced p.d.\n\nFaraday's law states that the magnitude of the induced p.d. is proportional to the rate of change of the magnetic flux through the circuit. The induced p.d. (and therefore the current) can be increased by: moving the magnet or wire faster, using a stronger magnet, increasing the number of turns on the coil, or increasing the area of the coil.\n\nLenz's law states that the direction of the induced current is always such that it opposes the change that produced it. This is a consequence of conservation of energy — energy must be supplied to maintain the changing magnetic field against the opposing effect of the induced current.\n\nA generator (dynamo) uses electromagnetic induction to convert kinetic energy into electrical energy. An AC generator rotates a coil in a magnetic field, producing an alternating current. Slip rings and brushes maintain the electrical connection as the coil rotates.",
        keyTerms: [
          { term: "Electromagnetic induction", definition: "Generating a p.d. (voltage) by changing the magnetic field around a conductor" },
          { term: "Faraday's law", definition: "The induced p.d. is proportional to the rate of change of magnetic flux" },
          { term: "Lenz's law", definition: "The induced current always opposes the change that produced it" },
          { term: "Generator (dynamo)", definition: "A device that converts kinetic energy to electrical energy using electromagnetic induction" },
          { term: "Alternating current (AC)", definition: "Current that repeatedly reverses direction" },
        ],
      },
      {
        heading: "Transformers",
        content:
          "A transformer is a device used to change the voltage of an alternating current (AC) supply. It consists of two coils of insulated wire (the primary coil and the secondary coil) wound on a soft iron core. Transformers only work with AC because a changing current is needed to produce a changing magnetic field, which is required for electromagnetic induction.\n\nWhen AC flows through the primary coil, it produces a changing magnetic field. The soft iron core carries this changing magnetic field to the secondary coil. The changing magnetic field induces an alternating p.d. across the secondary coil by electromagnetic induction.\n\nA step-up transformer increases the voltage. It has more turns on the secondary coil than the primary coil. A step-down transformer decreases the voltage. It has fewer turns on the secondary coil than the primary coil.\n\nThe transformer equation links the voltages and number of turns: Vs/Vp = Ns/Np, where Vs is the secondary voltage, Vp is the primary voltage, Ns is the number of secondary turns, and Np is the number of primary turns.\n\nFor an ideal (100% efficient) transformer, the power input equals the power output: VpIp = VsIs. This means that if a step-up transformer increases the voltage, the current must decrease by the same factor (and vice versa for step-down). In practice, energy is lost as heat in the coils (due to resistance) and in the core (due to eddy currents and magnetisation/demagnetisation).\n\nTransformers are essential in the National Grid. Step-up transformers increase voltage (and decrease current) for long-distance transmission, reducing energy losses in the cables (since power lost as heat = I²R). Step-down transformers then reduce the voltage to safe levels for use in homes and businesses.",
        keyTerms: [
          { term: "Transformer", definition: "A device that changes the voltage of an AC supply using electromagnetic induction; consists of primary and secondary coils on an iron core" },
          { term: "Step-up transformer", definition: "Increases voltage; more turns on the secondary coil than the primary" },
          { term: "Step-down transformer", definition: "Decreases voltage; fewer turns on the secondary coil than the primary" },
          { term: "National Grid", definition: "The network of cables and transformers that distributes electricity from power stations to consumers" },
        ],
        importantEquations: [
          "Vs / Vp = Ns / Np  (transformer equation)",
          "VpIp = VsIs  (for an ideal transformer, power in = power out)",
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 7: RADIOACTIVITY AND PARTICLES
  // =====================================================================
  {
    topicId: "radioactivity",
    subject: "physics",
    title: "Radioactivity & Particles",
    sections: [
      {
        heading: "Atomic Structure",
        content:
          "The atom consists of a small, dense, positively charged nucleus surrounded by negatively charged electrons in orbits (energy levels or shells). The nucleus contains protons (positive charge) and neutrons (no charge). Electrons orbit the nucleus and have a negative charge.\n\nThe atomic (proton) number is the number of protons in the nucleus. The mass (nucleon) number is the total number of protons and neutrons. The number of neutrons = mass number − atomic number. In a neutral atom, the number of electrons equals the number of protons.\n\nIsotopes are atoms of the same element with the same number of protons but different numbers of neutrons. They have identical chemical properties (because they have the same electron configuration) but different physical properties (because they have different masses). Some isotopes are unstable and radioactive.\n\nThe nuclear model of the atom was developed over time. Thomson's plum pudding model (1897) proposed that the atom was a sphere of positive charge with electrons embedded in it. Rutherford's alpha scattering experiment (1909) showed that most of the atom is empty space, with a tiny dense positive nucleus at the centre. This led to the nuclear model. Bohr later refined this model by proposing that electrons orbit in fixed energy levels (shells), not just anywhere.",
        keyTerms: [
          { term: "Proton", definition: "A positively charged particle in the nucleus; relative charge +1, relative mass 1" },
          { term: "Neutron", definition: "A neutral particle in the nucleus; relative charge 0, relative mass 1" },
          { term: "Electron", definition: "A negatively charged particle orbiting the nucleus; relative charge −1, relative mass negligible (1/1836)" },
          { term: "Atomic (proton) number", definition: "The number of protons in the nucleus of an atom" },
          { term: "Mass (nucleon) number", definition: "The total number of protons and neutrons in the nucleus" },
          { term: "Isotope", definition: "Atoms of the same element with the same number of protons but different numbers of neutrons" },
        ],
        importantEquations: [
          "Number of neutrons = Mass number − Atomic number",
        ],
      },
      {
        heading: "Types of Radiation",
        content:
          "Radioactive decay is a random process in which unstable nuclei emit radiation to become more stable. It is not affected by external conditions such as temperature, pressure, or chemical reactions.\n\nAlpha (α) radiation consists of particles made of 2 protons and 2 neutrons (a helium nucleus). Alpha particles have a relative charge of +2 and a relative mass of 4. They are strongly ionising (they knock electrons off atoms easily) but have a very short range (a few centimetres in air) and are stopped by a sheet of paper or skin. When a nucleus emits an alpha particle, its atomic number decreases by 2 and its mass number decreases by 4.\n\nBeta (β) radiation consists of high-speed electrons emitted from the nucleus when a neutron changes into a proton. Beta particles have a relative charge of −1 and negligible mass. They are moderately ionising, have a range of about 1 metre in air, and are stopped by a few millimetres of aluminium. When a nucleus emits a beta particle, its atomic number increases by 1 and its mass number stays the same.\n\nGamma (γ) radiation is a high-frequency electromagnetic wave emitted from the nucleus. It has no charge and no mass. Gamma rays are weakly ionising but very penetrating — they have a very long range and are only significantly reduced by several centimetres of lead or several metres of concrete. Gamma emission does not change the atomic number or mass number of the nucleus.",
        keyTerms: [
          { term: "Radioactive decay", definition: "The random process by which unstable nuclei emit radiation to become more stable" },
          { term: "Alpha (α) particle", definition: "2 protons + 2 neutrons (helium nucleus); strongly ionising, stopped by paper" },
          { term: "Beta (β) particle", definition: "A high-speed electron from the nucleus; moderately ionising, stopped by aluminium" },
          { term: "Gamma (γ) ray", definition: "A high-frequency EM wave from the nucleus; weakly ionising, reduced by thick lead or concrete" },
          { term: "Ionising", definition: "Able to remove electrons from atoms, creating ions" },
        ],
        tables: [
          {
            title: "Comparison of Alpha, Beta and Gamma Radiation",
            headers: ["Property", "Alpha (α)", "Beta (β)", "Gamma (γ)"],
            rows: [
              ["Nature", "2 protons + 2 neutrons (He nucleus)", "High-speed electron", "Electromagnetic wave"],
              ["Charge", "+2", "−1", "0"],
              ["Relative mass", "4", "Very small (~1/1836)", "0"],
              ["Ionising ability", "Strongly ionising", "Moderately ionising", "Weakly ionising"],
              ["Penetrating power", "Stopped by paper / few cm of air", "Stopped by few mm aluminium", "Reduced by thick lead / concrete"],
              ["Range in air", "A few centimetres", "About 1 metre", "Very long range"],
              ["Deflected by fields?", "Yes (deflected a lot)", "Yes (deflected opposite way to α)", "No"],
              ["Effect on nucleus", "A decreases by 2, Z decreases by 4", "A stays same, Z increases by 1", "No change to A or Z"],
            ],
          },
        ],
      },
      {
        heading: "Half-Life",
        content:
          "Half-life is the time taken for half of the radioactive nuclei in a sample to decay (or the time taken for the activity or count rate to halve). Each radioactive isotope has its own characteristic half-life, which cannot be changed.\n\nHalf-lives vary enormously between different isotopes — from fractions of a second to billions of years. For example, radon-220 has a half-life of about 56 seconds, while uranium-238 has a half-life of about 4.5 billion years.\n\nTo calculate how much of a radioactive substance remains after a given time, repeatedly halve the amount for each half-life that passes. For example, if you start with 800 Bq and the half-life is 3 hours: after 3 hours it is 400 Bq, after 6 hours it is 200 Bq, after 9 hours it is 100 Bq, and so on.\n\nActivity is the rate of decay (number of decays per second) and is measured in becquerels (Bq), where 1 Bq = 1 decay per second. Count rate is the number of decays detected per unit time by a detector (such as a Geiger-Muller tube), usually measured in counts per minute or counts per second.\n\nBackground radiation is the low-level radiation that exists all around us from natural and artificial sources. Natural sources include radon gas from rocks, cosmic rays from space, and radioactive elements in food and rocks. Artificial sources include medical X-rays and nuclear fallout. When measuring radioactivity, background radiation must be subtracted from the readings to find the corrected count rate from the source being tested.",
        keyTerms: [
          { term: "Half-life", definition: "The time taken for half of the radioactive nuclei in a sample to decay, or for the activity to halve" },
          { term: "Activity", definition: "The rate of radioactive decay, measured in becquerels (Bq); 1 Bq = 1 decay per second" },
          { term: "Count rate", definition: "The number of radioactive decays detected per unit time by a detector" },
          { term: "Background radiation", definition: "Low-level radiation present all around us from natural and artificial sources" },
          { term: "Geiger-Muller tube", definition: "A detector used to measure radioactive emissions (count rate)" },
        ],
      },
      {
        heading: "Uses and Hazards of Radiation",
        content:
          "Radioactive materials have many useful applications, but they also pose hazards because radiation can damage or kill living cells and cause mutations in DNA, potentially leading to cancer.\n\nMedical uses: Gamma rays are used in radiotherapy to kill cancer cells by directing a focused beam at the tumour. Radioactive tracers (gamma-emitting isotopes like technetium-99m, with a short half-life of 6 hours) are injected into the body and detected using a gamma camera to diagnose medical conditions. Beta radiation is used in thickness monitoring in paper and sheet metal production.\n\nOther uses: Smoke detectors use americium-241, an alpha emitter. The alpha particles ionise air molecules, creating a small current. Smoke disrupts this current, triggering the alarm. Gamma radiation is used to sterilise medical equipment and food by killing bacteria. Carbon-14 dating uses the known half-life of carbon-14 (5730 years) to determine the age of archaeological specimens.\n\nHazards: External exposure to radiation is most dangerous from gamma sources (most penetrating). Internal exposure (if a radioactive source is ingested or inhaled) is most dangerous from alpha emitters (most ionising, and all energy is absorbed by nearby cells). To reduce risk: minimise exposure time, maximise distance from the source, use appropriate shielding (lead, concrete), handle sources with long tongs, store sources in lead-lined containers, and never point sources at people.",
        keyTerms: [
          { term: "Radiotherapy", definition: "Using gamma rays to treat cancer by killing cancerous cells" },
          { term: "Radioactive tracer", definition: "A gamma-emitting isotope used in medical diagnosis (e.g. technetium-99m)" },
          { term: "Carbon-14 dating", definition: "Using the half-life of carbon-14 to determine the age of organic materials" },
          { term: "Irradiation", definition: "Exposure to radiation from a source outside the body; the object does not become radioactive" },
          { term: "Contamination", definition: "Radioactive material is deposited on or inside an object/person; the source is in direct contact" },
        ],
      },
      {
        heading: "Nuclear Fission and Fusion",
        content:
          "Nuclear fission is the splitting of a large, unstable nucleus into two smaller nuclei, releasing a large amount of energy, two or three neutrons, and gamma radiation. It is the process used in nuclear power stations and nuclear weapons.\n\nFission can be induced by a neutron being absorbed by a heavy nucleus such as uranium-235 or plutonium-239. The nucleus becomes unstable and splits. The neutrons released can go on to cause further fission reactions in other nuclei, creating a chain reaction. In a nuclear reactor, the chain reaction is controlled by using control rods (made of boron or cadmium) that absorb excess neutrons. A moderator (often water or graphite) slows down the neutrons to increase the chance of them being absorbed and causing fission.\n\nNuclear fusion is the joining of two small, light nuclei to form a single larger nucleus, releasing a huge amount of energy. It is the process that powers stars, including our Sun. In the Sun, hydrogen nuclei fuse to form helium, releasing enormous amounts of energy.\n\nFusion requires extremely high temperatures (millions of degrees) and pressures to overcome the electrostatic repulsion between the positively charged nuclei. This makes fusion very difficult to achieve and sustain on Earth. Fusion releases more energy per kilogram than fission and produces no radioactive waste, making it a highly desirable energy source, but the technical challenges of achieving the necessary conditions remain significant.",
        keyTerms: [
          { term: "Nuclear fission", definition: "The splitting of a large unstable nucleus into two smaller nuclei, releasing energy, neutrons, and gamma rays" },
          { term: "Nuclear fusion", definition: "The joining of two small light nuclei to form a single larger nucleus, releasing energy" },
          { term: "Chain reaction", definition: "A self-sustaining series of fission reactions where neutrons from one fission cause further fissions" },
          { term: "Control rods", definition: "Rods of boron or cadmium in a reactor that absorb neutrons to control the rate of fission" },
          { term: "Moderator", definition: "A material (water or graphite) that slows neutrons to increase the probability of fission" },
        ],
      },
    ],
  },

  // =====================================================================
  // PHYSICS TOPIC 8: ASTROPHYSICS
  // =====================================================================
  {
    topicId: "astrophysics",
    subject: "physics",
    title: "Astrophysics",
    sections: [
      {
        heading: "The Solar System",
        content:
          "Our solar system consists of the Sun (a star) at the centre, with eight planets orbiting it. In order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. The inner planets (Mercury, Venus, Earth, Mars) are small, rocky (terrestrial) planets. The outer planets (Jupiter, Saturn, Uranus, Neptune) are much larger gas giants (though Uranus and Neptune are sometimes classed as ice giants).\n\nThe solar system also contains dwarf planets (e.g. Pluto), natural satellites (moons) that orbit planets, asteroids (rocky bodies mostly found in the asteroid belt between Mars and Jupiter), and comets (bodies of ice and dust with highly elliptical orbits that develop a tail when close to the Sun).\n\nPlanets orbit the Sun due to gravitational attraction. The gravitational force provides the centripetal force needed for circular (or near-circular) orbits. Planets closer to the Sun orbit faster and have shorter orbital periods. Moons orbit planets in a similar way.\n\nOne astronomical unit (AU) is the average distance from the Earth to the Sun (about 150 million km). One light-year is the distance that light travels in one year (about 9.46 × 10¹² km). Light-years are used to measure distances to stars and galaxies. Our Sun is part of the Milky Way galaxy, which contains hundreds of billions of stars. The observable universe contains hundreds of billions of galaxies.",
        keyTerms: [
          { term: "Solar system", definition: "The Sun and all objects that orbit it, including planets, moons, asteroids, and comets" },
          { term: "Terrestrial planet", definition: "A small, rocky inner planet (Mercury, Venus, Earth, Mars)" },
          { term: "Gas giant", definition: "A large outer planet composed mainly of gas (Jupiter, Saturn)" },
          { term: "Asteroid", definition: "A small rocky body orbiting the Sun, mostly found in the belt between Mars and Jupiter" },
          { term: "Comet", definition: "A body of ice and dust with a highly elliptical orbit; develops a tail when near the Sun" },
          { term: "Light-year", definition: "The distance light travels in one year (about 9.46 × 10¹² km)" },
          { term: "Astronomical unit (AU)", definition: "The average distance from the Earth to the Sun (about 150 million km)" },
        ],
      },
      {
        heading: "Stellar Evolution (Life Cycle of Stars)",
        content:
          "All stars begin as a nebula — a huge cloud of dust and gas (mainly hydrogen). Gravity causes the nebula to collapse, and as it contracts it heats up. When the core temperature is high enough, hydrogen nuclei begin to fuse into helium — nuclear fusion begins and a protostar becomes a main sequence star.\n\nA main sequence star (like our Sun) is stable because the inward force of gravity is balanced by the outward pressure from the energy released by fusion. Stars spend most of their lives in this phase. The Sun has been a main sequence star for about 4.6 billion years.\n\nWhat happens next depends on the size of the star. For a star about the size of the Sun: it eventually runs low on hydrogen fuel. The outer layers expand and cool, forming a red giant. The outer layers are then ejected as a planetary nebula, leaving behind a hot, dense white dwarf, which gradually cools and fades over billions of years.\n\nFor a star much more massive than the Sun: it swells into a red supergiant. When fusion can no longer support the core, the star collapses and explodes in a supernova, scattering heavy elements into space. The remaining core may collapse into a neutron star (incredibly dense) or, if massive enough, a black hole (where gravity is so strong that not even light can escape).\n\nElements heavier than iron are formed during supernovae. The debris from supernovae forms new nebulae, which can collapse to form new stars and planets — so the elements in our bodies were forged in ancient stars.",
        keyTerms: [
          { term: "Nebula", definition: "A large cloud of dust and gas from which stars are born" },
          { term: "Protostar", definition: "A forming star that has not yet begun nuclear fusion" },
          { term: "Main sequence star", definition: "A stable star fusing hydrogen into helium; gravity is balanced by radiation pressure" },
          { term: "Red giant", definition: "An expanded, cooled star that has exhausted its core hydrogen supply (from Sun-sized stars)" },
          { term: "White dwarf", definition: "The small, hot, dense remnant core of a Sun-sized star after the red giant phase" },
          { term: "Red supergiant", definition: "A very large expanded star formed from a massive star that has run low on fuel" },
          { term: "Supernova", definition: "The explosive death of a massive star, scattering heavy elements into space" },
          { term: "Neutron star", definition: "An incredibly dense remnant of a massive star after a supernova" },
          { term: "Black hole", definition: "A remnant so dense that its gravity prevents even light from escaping" },
        ],
        tables: [
          {
            title: "Life Cycle of Stars",
            headers: ["Stage", "Sun-sized Star", "Massive Star"],
            rows: [
              ["Birth", "Nebula → Protostar", "Nebula → Protostar"],
              ["Stable phase", "Main sequence star", "Main sequence star (shorter)"],
              ["Expansion", "Red giant", "Red supergiant"],
              ["Death", "Planetary nebula → White dwarf", "Supernova → Neutron star or Black hole"],
            ],
          },
        ],
      },
      {
        heading: "The Big Bang and Red Shift",
        content:
          "Red shift is the observation that light from distant galaxies is shifted towards the red end of the spectrum (longer wavelength, lower frequency). This indicates that the galaxies are moving away from us. The further away a galaxy is, the greater its red shift, meaning it is moving away faster. This relationship was discovered by Edwin Hubble.\n\nRed shift is caused by the Doppler effect applied to light. Just as the pitch of a siren changes as it moves towards or away from you (sound waves are compressed or stretched), the wavelength of light from a moving source is shortened (blue shift) if approaching or lengthened (red shift) if receding.\n\nThe observation that almost all galaxies show red shift, and that more distant galaxies have greater red shift, provides strong evidence that the universe is expanding. If the universe is expanding, it must have been smaller in the past — tracing this expansion backwards leads to the conclusion that the universe began from a single, extremely hot, dense point. This is the Big Bang theory.\n\nCosmic microwave background radiation (CMBR) is another key piece of evidence for the Big Bang. It is low-energy microwave radiation that fills all of space uniformly. It is the remnant thermal radiation from the very early universe, which has cooled as the universe expanded. The Big Bang theory predicted this radiation before it was discovered in 1965 by Penzias and Wilson.\n\nThe Big Bang is the currently accepted scientific model for the origin of the universe, estimated to have occurred approximately 13.8 billion years ago. The universe has been expanding and cooling ever since.",
        keyTerms: [
          { term: "Red shift", definition: "The shift of light from distant galaxies to longer wavelengths (red end), indicating they are moving away" },
          { term: "Blue shift", definition: "The shift of light to shorter wavelengths, indicating an object is moving towards us" },
          { term: "Doppler effect", definition: "The change in wavelength and frequency of a wave caused by the relative motion of the source and observer" },
          { term: "Big Bang theory", definition: "The theory that the universe began from an extremely hot dense point about 13.8 billion years ago and has been expanding ever since" },
          { term: "Cosmic microwave background radiation (CMBR)", definition: "Low-energy microwave radiation filling all of space uniformly; remnant radiation from the early universe" },
          { term: "Hubble's observation", definition: "The further a galaxy is from us, the faster it is moving away (greater red shift)" },
        ],
      },
      {
        heading: "Orbits and Gravity",
        content:
          "Gravity is a force of attraction between any two objects with mass. The greater the masses, the greater the gravitational force. The greater the distance between the objects, the weaker the gravitational force. Gravity is the force responsible for keeping planets in orbit around the Sun and moons in orbit around planets.\n\nFor an object in a stable circular orbit, gravity provides the centripetal force needed to maintain the orbit. The object is constantly accelerating towards the centre (changing direction) but never gets closer because it is also moving forward at the right speed. If the speed were too low, the object would spiral inwards; if too high, it would fly off into space.\n\nOrbital speed and period depend on the distance from the central body. Closer orbits have higher speeds and shorter orbital periods. Mercury (closest to the Sun) orbits in 88 days; Neptune (furthest major planet) takes about 165 years.\n\nArtificial satellites orbit the Earth at different heights depending on their purpose. Low-orbit satellites (a few hundred kilometres up) orbit quickly (about 90 minutes) and are used for imaging, weather monitoring, and the International Space Station. Geostationary satellites orbit at about 36,000 km and take exactly 24 hours to orbit, so they stay above the same point on the Earth's surface — they are used for communications and weather monitoring.\n\nComets have highly elliptical orbits. They speed up as they approach the Sun (stronger gravity, less GPE, more KE) and slow down as they move away (weaker gravity, more GPE, less KE).",
        keyTerms: [
          { term: "Gravity", definition: "A force of attraction between any two objects with mass; increases with mass and decreases with distance" },
          { term: "Centripetal force", definition: "The resultant force directed towards the centre of a circular path that keeps an object moving in a circle" },
          { term: "Orbital period", definition: "The time taken for an object to complete one full orbit" },
          { term: "Geostationary orbit", definition: "An orbit at ~36,000 km above the equator with a period of 24 hours; satellite stays above one point" },
          { term: "Low-orbit satellite", definition: "A satellite a few hundred km above Earth with a short orbital period (~90 minutes)" },
          { term: "Elliptical orbit", definition: "An oval-shaped orbit (e.g. comets); speed varies — fastest when closest to the Sun" },
        ],
      },
    ],
  },
];

// Merge hand-crafted and AI-generated summaries
export const topicSummaries: TopicSummary[] = [
  ...baseSummaries,
  ...(summariesGenerated.summaries as unknown as TopicSummary[]),
];
