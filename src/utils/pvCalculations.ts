// PV Estimation Calculations

export interface PVEstimation {
  totalArea: number;
  usableArea: number;
  installedCapacity: number;
  annualYield: number;
  co2Savings: number;
  potential: 'low' | 'medium' | 'high';
}

// Constants
const USABILITY_FACTOR = 0.7; // 70% of area is usable
const PV_DENSITY = 0.18; // kWp/m² - typical solar panel density
const AVG_SOLAR_IRRADIANCE = 1500; // kWh/m²/year - average (location dependent)
const PERFORMANCE_RATIO = 0.75; // System performance ratio
const CO2_PER_KWH = 0.5; // kg CO2 saved per kWh

export const calculatePVEstimation = (areaInSquareMeters: number): PVEstimation => {
  // Calculate usable area (excluding unusable sections)
  const usableArea = areaInSquareMeters * USABILITY_FACTOR;
  
  // Calculate installed capacity (kWp)
  const installedCapacity = usableArea * PV_DENSITY;
  
  // Calculate annual energy yield (kWh/year)
  // Formula: Installed Capacity × Solar Irradiance × Performance Ratio
  const annualYield = installedCapacity * AVG_SOLAR_IRRADIANCE * PERFORMANCE_RATIO;
  
  // Calculate CO2 savings (kg/year)
  const co2Savings = annualYield * CO2_PER_KWH;
  
  // Determine potential level
  let potential: 'low' | 'medium' | 'high';
  if (installedCapacity >= 50) {
    potential = 'high';
  } else if (installedCapacity >= 20) {
    potential = 'medium';
  } else {
    potential = 'low';
  }
  
  return {
    totalArea: areaInSquareMeters,
    usableArea,
    installedCapacity,
    annualYield,
    co2Savings,
    potential,
  };
};

export const getPotentialColor = (potential: 'low' | 'medium' | 'high'): string => {
  switch (potential) {
    case 'high':
      return '#22c55e'; // green
    case 'medium':
      return '#eab308'; // yellow
    case 'low':
      return '#ef4444'; // red
  }
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const formatCapacity = (kWp: number): string => {
  if (kWp >= 1000) {
    return `${formatNumber(kWp / 1000)} MWp`;
  }
  return `${formatNumber(kWp)} kWp`;
};

export const formatEnergy = (kWh: number): string => {
  if (kWh >= 1000000) {
    return `${formatNumber(kWh / 1000000)} GWh`;
  }
  if (kWh >= 1000) {
    return `${formatNumber(kWh / 1000)} MWh`;
  }
  return `${formatNumber(kWh)} kWh`;
};

export const formatCO2 = (kg: number): string => {
  if (kg >= 1000) {
    return `${formatNumber(kg / 1000)} tonnes`;
  }
  return `${formatNumber(kg)} kg`;
};
