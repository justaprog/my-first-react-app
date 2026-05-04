import { mockMeasurements } from "../data/mockMeasurements";
import type { Measurement } from "../types/measurement";


/**
 * Fetches the list of measurements from the API.
 * @returns A promise resolving to the array of measurements.
 */
export async function fetchMeasurements(): Promise<Measurement[]> {
  // This simulates a real REST API.
  // Later you can replace this with fetch("/api/measurements").
  await delay(400);
  return mockMeasurements;
}

/**
 * Simulates creating a new measurement by generating random data.
 * @returns A promise resolving to the newly created measurement.
 */
export async function createSimulatedMeasurement(): Promise<Measurement> {
  await delay(250);

  const templates = [
    {
      componentType: "Blade" as const,
      componentIdPrefix: "GT-BLADE",
      cellName: "Measurement Cell A",
      dimension: "Blade root width",
      targetValue: 50.0,
      tolerance: 0.15,
      unit: "mm",
    },
    {
      componentType: "Vane" as const,
      componentIdPrefix: "GT-VANE",
      cellName: "Measurement Cell B",
      dimension: "Cooling hole diameter",
      targetValue: 2.3,
      tolerance: 0.05,
      unit: "mm",
    },
    {
      componentType: "Casing" as const,
      componentIdPrefix: "GT-CASING",
      cellName: "Measurement Cell C",
      dimension: "Roundness deviation",
      targetValue: 0.1,
      tolerance: 0.1,
      unit: "mm",
    },
  ];

  // randomly select a measurement template
  const template = templates[Math.floor(Math.random() * templates.length)];
  // generate a random component number
  const randomComponentNumber = String(Math.floor(Math.random() * 900) + 100).padStart(3, "0");
  // generate a random deviation within ±3 times the tolerance
  const randomDeviation = (Math.random() - 0.5) * template.tolerance * 3;

  return {
    id: Date.now(),
    componentId: `${template.componentIdPrefix}-${randomComponentNumber}`,
    componentType: template.componentType,
    cellName: template.cellName,
    dimension: template.dimension,
    measuredValue: Number((template.targetValue + randomDeviation).toFixed(3)),
    targetValue: template.targetValue,
    tolerance: template.tolerance,
    unit: template.unit,
    measuredAt: new Date().toISOString(),
  };
}

/**
 * Utility function to create a delay.
 * @param milliseconds The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
function delay(milliseconds: number): Promise<void> {
  // return resolved promise after specified milliseconds
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
