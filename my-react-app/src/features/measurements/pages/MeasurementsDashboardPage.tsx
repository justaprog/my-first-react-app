import { useMemo, useState } from "react";

import { useMeasurements } from "../hooks/useMeasurements";
import { MeasurementStats } from "../components/MeasurementStats";
import { MeasurementFilters } from "../components/MeasurementFilters";
import { MeasurementTable } from "../components/MeasurementTable";
import { MeasurementChart } from "../components/MeasurementChart";
import { MeasurementTrendChart } from "../components/MeasurementTrendChart";
import { getMeasurementStatus } from "../utils/measurementStatus";

/**
 * Main dashboard page for displaying measurement data, statistics, filters, and visualizations.
 * This component uses the useMeasurements hook to load and manage measurement data,
 * and renders various child components to display summary stats, filters, charts, and a data table.
 * It also handles filtering the measurements based on user input for search and status.
 * The dashboard provides an overview of quality assurance metrics and allows users to explore the measurement data in detail.
 */
export function MeasurementsDashboardPage() {
  const { measurements, isLoading, error } = useMeasurements();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OK" | "NOK">("ALL");

  const filteredMeasurements = useMemo(() => {
    return measurements.filter((measurement) => {
      const matchesSearch =
        measurement.componentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        measurement.cellName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        measurement.dimension
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const measurementStatus = getMeasurementStatus(measurement);

      const matchesStatus =
        statusFilter === "ALL" || measurementStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [measurements, searchTerm, statusFilter]); // Recompute filtered 
  // measurements when measurements, searchTerm, or statusFilter change

  if (isLoading) return <p>Loading measurements...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Quality Assurance Dashboard</h1>

      <MeasurementStats measurements={filteredMeasurements} />

      <MeasurementFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchTermChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />

      <MeasurementChart measurements={filteredMeasurements} />
      <MeasurementTrendChart measurements={filteredMeasurements} />
      <MeasurementTable measurements={filteredMeasurements} />

    </main>
  );
}