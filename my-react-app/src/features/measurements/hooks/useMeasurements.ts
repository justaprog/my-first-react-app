import { useEffect, useState } from "react";
import { createSimulatedMeasurement, fetchMeasurements } from "../api/measurementsApi";
import type { Measurement } from "../types/measurement";

/**
 * Custom hook to manage measurement data and related operations.
 * @returns An object containing measurements, loading states, error message, 
 * and a function to add a new measurement.
 */
export function useMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load measurements when the component mounts
  useEffect(() => {
    async function loadMeasurements() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMeasurements();
        setMeasurements(data);
      } catch {
        setError("Could not load measurement data.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadMeasurements();
  }, []); // Empty dependency array means this runs once on mount

  // Function to add a new simulated measurement
  async function addMeasurement() {
    try {
      setIsCreating(true);
      setError(null);
      const newMeasurement = await createSimulatedMeasurement();
      setMeasurements((currentMeasurements) => [newMeasurement, ...currentMeasurements]);
    } catch {
      setError("Could not create a simulated measurement.");
    } finally {
      setIsCreating(false);
    }
  }

  return {
    measurements,
    isLoading,
    isCreating,
    error,
    addMeasurement,
  };
}
