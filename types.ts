export interface CalculationResult {
  acres: number;
  sqFt: number;
  briquettes: number;
}

export interface TipRequest {
  acres: number;
  projectType: string;
}

export enum ProjectType {
  PATIO = 'Patio',
  WALKWAY = 'Walkway',
  DRIVEWAY = 'Driveway',
  GARDEN_PATH = 'Garden Path',
  OTHER = 'Other'
}