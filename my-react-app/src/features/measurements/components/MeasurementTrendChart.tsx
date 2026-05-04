import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../../../components/ui/Card";
import type { Measurement } from "../types/measurement";
import { getAbsoluteDeviation } from "../utils/measurementStatus";

type MeasurementTrendChartProps = {
  measurements: Measurement[];
};

/**
 * Component to display a line chart of absolute deviation trends over time.
 * @param measurements An array of Measurement objects to visualize.
 * @returns A JSX element containing a card with a line chart showing the absolute deviation of each measurement from its target value over time.
 * The x-axis represents the measurement times (formatted as "HH:MM"), and the y-axis represents the absolute deviation values.
 * The chart includes a tooltip for detailed information on hover and is responsive to container size.
 * This chart is useful for spotting drift in measurement results over time.
 */
export function MeasurementTrendChart({ measurements }: MeasurementTrendChartProps) {
  const chartData = [...measurements]
    // Sort measurements by time to ensure the trend line is accurate
    .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime())
    // Map measurements to chart data format with time and absolute deviation
    .map((measurement) => ({
      time: new Date(measurement.measuredAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      absoluteDeviation: getAbsoluteDeviation(measurement),
    }));

  return (
    <Card>
      <div className="card-header">
        <h2>Absolute deviation trend</h2>
        <p>Useful for spotting drift in measurement results over time.</p>
      </div>

      {/* TODO: look into recharts docs */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="absoluteDeviation" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
