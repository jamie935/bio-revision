export interface Equation {
  name: string;
  formula: string;
  variables: string;
  category: string;
  higherOnly?: boolean;
}

export interface EquationCategory {
  id: string;
  name: string;
  color: string;
  equations: Equation[];
}

export const equationCategories: EquationCategory[] = [
  {
    id: "forces",
    name: "Forces & Motion",
    color: "blue",
    equations: [
      {
        name: "Average Speed",
        formula: "v = d / t",
        variables: "v = speed (m/s), d = distance (m), t = time (s)",
        category: "forces",
      },
      {
        name: "Acceleration",
        formula: "a = (v − u) / t",
        variables: "a = acceleration (m/s²), v = final velocity (m/s), u = initial velocity (m/s), t = time (s)",
        category: "forces",
      },
      {
        name: "SUVAT (no time)",
        formula: "v² = u² + 2as",
        variables: "v = final speed (m/s), u = initial speed (m/s), a = acceleration (m/s²), s = distance (m)",
        category: "forces",
      },
      {
        name: "Force",
        formula: "F = m × a",
        variables: "F = force (N), m = mass (kg), a = acceleration (m/s²)",
        category: "forces",
      },
      {
        name: "Weight",
        formula: "W = m × g",
        variables: "W = weight (N), m = mass (kg), g = gravitational field strength (N/kg)",
        category: "forces",
      },
      {
        name: "Momentum",
        formula: "p = m × v",
        variables: "p = momentum (kg m/s), m = mass (kg), v = velocity (m/s)",
        category: "forces",
        higherOnly: true,
      },
      {
        name: "Force (momentum)",
        formula: "F = (mv − mu) / t",
        variables: "F = force (N), m = mass (kg), v = final velocity, u = initial velocity, t = time (s)",
        category: "forces",
        higherOnly: true,
      },
      {
        name: "Moment",
        formula: "M = F × d",
        variables: "M = moment (Nm), F = force (N), d = perpendicular distance from pivot (m)",
        category: "forces",
        higherOnly: true,
      },
    ],
  },
  {
    id: "electricity",
    name: "Electricity",
    color: "yellow",
    equations: [
      {
        name: "Power",
        formula: "P = I × V",
        variables: "P = power (W), I = current (A), V = voltage (V)",
        category: "electricity",
      },
      {
        name: "Energy Transferred",
        formula: "E = I × V × t",
        variables: "E = energy (J), I = current (A), V = voltage (V), t = time (s)",
        category: "electricity",
      },
      {
        name: "Ohm's Law",
        formula: "V = I × R",
        variables: "V = voltage (V), I = current (A), R = resistance (Ω)",
        category: "electricity",
      },
      {
        name: "Charge",
        formula: "Q = I × t",
        variables: "Q = charge (C), I = current (A), t = time (s)",
        category: "electricity",
      },
      {
        name: "Energy (charge)",
        formula: "E = Q × V",
        variables: "E = energy (J), Q = charge (C), V = voltage (V)",
        category: "electricity",
      },
    ],
  },
  {
    id: "waves",
    name: "Waves",
    color: "purple",
    equations: [
      {
        name: "Wave Speed",
        formula: "v = f × λ",
        variables: "v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m)",
        category: "waves",
      },
      {
        name: "Frequency",
        formula: "f = 1 / T",
        variables: "f = frequency (Hz), T = time period (s)",
        category: "waves",
      },
      {
        name: "Refractive Index",
        formula: "n = sin i / sin r",
        variables: "n = refractive index, i = angle of incidence (°), r = angle of refraction (°)",
        category: "waves",
      },
      {
        name: "Critical Angle",
        formula: "sin c = 1 / n",
        variables: "c = critical angle (°), n = refractive index",
        category: "waves",
      },
    ],
  },
  {
    id: "energy",
    name: "Energy & Transfers",
    color: "green",
    equations: [
      {
        name: "Efficiency",
        formula: "efficiency = (useful output / total input) × 100%",
        variables: "Input and output can be energy (J) or power (W)",
        category: "energy",
      },
      {
        name: "Work Done",
        formula: "W = F × d",
        variables: "W = work done (J), F = force (N), d = distance (m)",
        category: "energy",
      },
      {
        name: "GPE",
        formula: "GPE = m × g × h",
        variables: "GPE = gravitational PE (J), m = mass (kg), g = g-field strength (N/kg), h = height (m)",
        category: "energy",
      },
      {
        name: "Kinetic Energy",
        formula: "KE = ½ × m × v²",
        variables: "KE = kinetic energy (J), m = mass (kg), v = speed (m/s)",
        category: "energy",
      },
      {
        name: "Power",
        formula: "P = W / t",
        variables: "P = power (W), W = work done (J), t = time (s)",
        category: "energy",
      },
    ],
  },
  {
    id: "solids-liquids-gases",
    name: "Solids, Liquids & Gases",
    color: "red",
    equations: [
      {
        name: "Density",
        formula: "ρ = m / V",
        variables: "ρ = density (kg/m³), m = mass (kg), V = volume (m³)",
        category: "solids-liquids-gases",
      },
      {
        name: "Pressure",
        formula: "p = F / A",
        variables: "p = pressure (Pa), F = force (N), A = area (m²)",
        category: "solids-liquids-gases",
      },
      {
        name: "Pressure in a Column",
        formula: "p = h × ρ × g",
        variables: "p = pressure (Pa), h = height (m), ρ = density (kg/m³), g = g-field strength (N/kg)",
        category: "solids-liquids-gases",
      },
      {
        name: "Pressure–Temperature Law",
        formula: "p₁ / T₁ = p₂ / T₂",
        variables: "p = pressure (Pa), T = temperature (K)",
        category: "solids-liquids-gases",
      },
      {
        name: "Boyle's Law",
        formula: "p₁ × V₁ = p₂ × V₂",
        variables: "p = pressure (Pa), V = volume (m³)",
        category: "solids-liquids-gases",
      },
      {
        name: "Specific Heat Capacity",
        formula: "ΔQ = m × c × ΔT",
        variables: "ΔQ = thermal energy change (J), m = mass (kg), c = specific heat capacity (J/kg°C), ΔT = temp change (°C)",
        category: "solids-liquids-gases",
        higherOnly: true,
      },
    ],
  },
  {
    id: "magnetism",
    name: "Magnetism & EM",
    color: "indigo",
    equations: [
      {
        name: "Transformer Voltage",
        formula: "Vp / Vs = Np / Ns",
        variables: "Vp = primary voltage (V), Vs = secondary voltage (V), Np = primary turns, Ns = secondary turns",
        category: "magnetism",
        higherOnly: true,
      },
      {
        name: "Transformer Power",
        formula: "Vp × Ip = Vs × Is",
        variables: "V = voltage (V), I = current (A), p = primary, s = secondary (100% efficiency)",
        category: "magnetism",
        higherOnly: true,
      },
    ],
  },
  {
    id: "astrophysics",
    name: "Astrophysics",
    color: "gray",
    equations: [
      {
        name: "Orbital Speed",
        formula: "v = 2πr / T",
        variables: "v = orbital speed (m/s), r = orbital radius (m), T = time period (s)",
        category: "astrophysics",
      },
      {
        name: "Red-Shift",
        formula: "Δλ / λ₀ = v / c",
        variables: "Δλ = change in wavelength (m), λ₀ = reference wavelength (m), v = galaxy velocity (m/s), c = speed of light (m/s)",
        category: "astrophysics",
        higherOnly: true,
      },
    ],
  },
];
