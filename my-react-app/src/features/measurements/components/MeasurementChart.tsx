import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../../../components/ui/Card";
import type { Measurement } from "../types/measurement";
import { getDeviation } from "../utils/measurementStatus";

type MeasurementChartProps = {
  measurements: Measurement[];
};

/**
 * Component to display a bar chart of measurement deviations by component.
 * @param measurements An array of Measurement objects to visualize.
 * @returns A JSX element containing a card with a bar chart showing the deviation of each measurement from its target value.
 * The x-axis represents the component IDs (with "GT-" prefix removed), and the y-axis represents the deviation values.
 * Positive bars indicate measurements above the target, while negative bars indicate measurements below the target.
 * The chart includes a tooltip for detailed information on hover and is responsive to container size.
 */
export function MeasurementChart({ measurements }: MeasurementChartProps) {
  const chartData = measurements.map((measurement) => ({
    component: measurement.componentId.replace("GT-", ""),
    deviation: getDeviation(measurement),
  }));

  return (
    <Card>
      <div className="card-header">
        <h2>Deviation by component</h2>
        <p>Positive or negative deviation from the target value.</p>
      </div>

      {/* TODO: look into recharts docs */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="component" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="deviation" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
