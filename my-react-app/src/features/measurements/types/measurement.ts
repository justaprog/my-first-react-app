export type MeasurementStatus = "OK" | "NOK";

export type Measurement = {
  id: number;
  componentId: string;
  componentType: "Blade" | "Vane" | "Casing";
  cellName: string;
  dimension: string;
  measuredValue: number;
  targetValue: number;
  tolerance: number;
  unit: string;
  measuredAt: string;
};

export type MeasurementFilterStatus = "ALL" | MeasurementStatus;
