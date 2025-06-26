
export interface Equipment {
  id: string;
  name: string;
  status: 'Operational' | 'Warning' | 'Critical';
  temperature: number;
  vibration: number;
  pressure: number;
}

export interface Alert {
  id: string;
  equipmentId: string;
  equipmentName: string;
  message: string;
  severity: 'Low' | 'Medium' | 'High';
  timestamp: string;
}

export interface SensorDataPoint {
  time: string;
  temperature: number;
  vibration: number;
  pressure: number;
}

export interface FailurePredictionPoint {
  date: string;
  probability: number;
  trend: number;
}

export interface MaintenanceLog {
  id: string;
  date: string;
  equipment: string;
  action: string;
  notes: string;
}
