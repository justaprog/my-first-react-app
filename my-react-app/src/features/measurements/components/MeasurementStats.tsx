import { Card } from "../../../components/ui/Card";
import { formatPercent } from "../../../lib/formatters";
import type { Measurement } from "../types/measurement";
import { getMeasurementStatus, getPassRate } from "../utils/measurementStatus";

type MeasurementStatsProps = {
  measurements: Measurement[];
};

/**Component to display summary statistics about the measurements (Dashboard KPIs).
 * @param measurements An array of Measurement objects to analyze and summarize.
 * @returns A JSX element containing the summary statistics in a grid layout.
 * The stats include total measurements, pass rate, count of NOK results, and active cells.
 * Each stat is displayed in a card with a title, value, and description.
 * The "NOK results" card is highlighted with a warning style if there are any NOK measurements.
 * The pass rate is formatted as a percentage with one decimal place.
 * The component uses the getMeasurementStatus and getPassRate utility functions to calculate the stats.
 */
export function MeasurementStats({ measurements }: MeasurementStatsProps) {
  const totalCount = measurements.length;
  const nokCount = measurements.filter((measurement) => getMeasurementStatus(measurement) === "NOK").length;
  const okCount = totalCount - nokCount;
  const uniqueCells = new Set(measurements.map((measurement) => measurement.cellName)).size;
  const passRate = getPassRate(measurements);

  return (
    <section className="stats-grid" aria-label="Measurement summary">
      <StatCard title="Total measurements" value={totalCount.toString()} description="all loaded inspection results" />
      <StatCard title="Pass rate" value={formatPercent(passRate)} description={`${okCount} components within tolerance`} />
      <StatCard title="NOK results" value={nokCount.toString()} description="requires quality review" warning={nokCount > 0} />
      <StatCard title="Active cells" value={uniqueCells.toString()} description="automated measurement cells" />
    </section>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  warning?: boolean;
};

function StatCard({ title, value, description, warning = false }: StatCardProps) {
  return (
    <Card className={warning ? "card-warning" : ""}>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-description">{description}</p>
    </Card>
  );
}
