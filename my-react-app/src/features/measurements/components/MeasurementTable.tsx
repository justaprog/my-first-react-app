import { StatusBadge } from "../../../components/ui/StatusBadge";
import { formatNumber } from "../../../lib/formatters";
import type { Measurement } from "../types/measurement";
import { getDeviation, getMeasurementStatus } from "../utils/measurementStatus";

type MeasurementTableProps = {
  measurements: Measurement[];
};

/**Component to display a table of measurements with their details and status.
 * @param measurements An array of Measurement objects to display in the table.
 * @returns A JSX element containing a table with measurement details such as 
 * component ID, type, cell, dimension, measured value, target value, deviation, 
 * status, and measurement timestamp.
 * 
 * The table includes a header row with column titles and a body that maps over 
 * the measurements array to create a row for each measurement.
 * 
 * Each row displays the measurement details and uses the StatusBadge component
 *  to visually indicate the measurement status (OK or NOK).
 * 
 * If there are no measurements to display, an empty state message is shown 
 * instead of the table.
 */
export function MeasurementTable({ measurements }: MeasurementTableProps) {
  if (measurements.length === 0) {
    return <p className="empty-state">No measurements match the current filters.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="measurement-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Type</th>
            <th>Cell</th>
            <th>Dimension</th>
            <th>Measured</th>
            <th>Target</th>
            <th>Deviation</th>
            <th>Status</th>
            <th>Measured at</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((measurement) => {
            const status = getMeasurementStatus(measurement);
            const deviation = getDeviation(measurement);

            return (
              <tr key={measurement.id}>
                <td className="strong-cell">{measurement.componentId}</td>
                <td>{measurement.componentType}</td>
                <td>{measurement.cellName}</td>
                <td>{measurement.dimension}</td>
                <td>
                  {formatNumber(measurement.measuredValue, 3)} {measurement.unit}
                </td>
                <td>
                  {formatNumber(measurement.targetValue, 3)} ± {formatNumber(measurement.tolerance, 3)} {measurement.unit}
                </td>
                <td>
                  {formatNumber(deviation, 3)} {measurement.unit}
                </td>
                <td>
                  <StatusBadge status={status} />
                </td>
                <td>{new Date(measurement.measuredAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
