import type { MeasurementStatus } from "../../features/measurements/types/measurement";

type StatusBadgeProps = {
  status: MeasurementStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}
