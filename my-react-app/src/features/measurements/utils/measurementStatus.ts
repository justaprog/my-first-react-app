/**
 * Utility functions for calculating measurement status and deviation.
 */
import type { Measurement, MeasurementStatus } from "../types/measurement";

/**
 * Calculates the deviation of a measurement from its target value.
 * @param measurement The measurement to calculate deviation for.
 * @returns The deviation value, rounded to 3 decimal places.
 */
export function getDeviation(measurement: Measurement): number {
  return Number((measurement.measuredValue - measurement.targetValue).toFixed(3));
}

/**
 * Calculates the absolute deviation of a measurement from its target value.
 * @param measurement The measurement to calculate absolute deviation for.
 * @returns The absolute deviation value, rounded to 3 decimal places.
 */
export function getAbsoluteDeviation(measurement: Measurement): number {
  return Math.abs(getDeviation(measurement));
}

/**
 * Determines the status of a measurement based on its deviation.
 * @param measurement The measurement to evaluate.
 * @returns The status of the measurement ("OK" or "NOK").
 */
export function getMeasurementStatus(measurement: Measurement): MeasurementStatus {
  return getAbsoluteDeviation(measurement) <= measurement.tolerance ? "OK" : "NOK";
}

/**
 * Calculates the pass rate of a set of measurements.
 * @param measurements The array of measurements to evaluate.
 * @returns The pass rate as a percentage (0-100).
 */
export function getPassRate(measurements: Measurement[]): number {
  if (measurements.length === 0) return 0;

  const okCount = measurements.filter((measurement) => getMeasurementStatus(measurement) === "OK").length;
  return (okCount / measurements.length) * 100;
}
