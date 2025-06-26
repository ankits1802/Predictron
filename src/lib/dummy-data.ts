
import type { Equipment, Alert, SensorDataPoint, FailurePredictionPoint, MaintenanceLog } from '@/types';

export const equipmentHealth: Equipment[] = [
  { id: 'EQP-001', name: 'CNC Machine', status: 'Operational', temperature: 45, vibration: 0.2, pressure: 150 },
  { id: 'EQP-002', name: 'Welding Robot', status: 'Warning', temperature: 78, vibration: 1.5, pressure: 210 },
  { id: 'EQP-003', name: 'Assembly Line Motor', status: 'Critical', temperature: 95, vibration: 3.1, pressure: 120 },
  { id: 'EQP-004', name: 'Hydraulic Press', status: 'Operational', temperature: 52, vibration: 0.4, pressure: 300 },
];

export const anomalyAlerts: Alert[] = [
  { id: 'ALT-001', equipmentId: 'EQP-003', equipmentName: 'Assembly Line Motor', message: 'Vibration spike detected', severity: 'High', timestamp: '2023-09-15 10:30:00' },
  { id: 'ALT-002', equipmentId: 'EQP-002', equipmentName: 'Welding Robot', message: 'Temperature exceeding threshold', severity: 'Medium', timestamp: '2023-09-15 09:15:00' },
  { id: 'ALT-003', equipmentId: 'EQP-004', equipmentName: 'Hydraulic Press', message: 'Minor pressure fluctuation', severity: 'Low', timestamp: '2023-09-14 18:00:00' },
  { id: 'ALT-004', equipmentId: 'EQP-002', equipmentName: 'Welding Robot', message: 'Unusual vibration pattern', severity: 'Medium', timestamp: '2023-09-14 14:20:00' },
];

export const initialSensorData: SensorDataPoint[] = Array.from({ length: 10 }, (_, i) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() - (10 - i) * 5);
  return {
    time: time.toISOString(),
    temperature: 75 + Math.random() * 5,
    vibration: 1.2 + Math.random() * 0.5,
    pressure: 200 + Math.random() * 10,
  }
});

export const failurePredictionData: FailurePredictionPoint[] = [
  { date: 'Day -6', probability: 12, trend: 10 },
  { date: 'Day -5', probability: 15, trend: 12 },
  { date: 'Day -4', probability: 20, trend: 16 },
  { date: 'Day -3', probability: 28, trend: 25 },
  { date: 'Day -2', probability: 45, trend: 40 },
  { date: 'Day -1', probability: 60, trend: 58 },
  { date: 'Today', probability: 85, trend: 82 },
];

export const maintenanceLogsData: MaintenanceLog[] = [
    { id: 'LOG-001', date: '2023-08-01', equipment: 'EQP-001', action: 'Routine check', notes: 'All systems nominal.' },
    { id: 'LOG-002', date: '2023-08-05', equipment: 'EQP-003', action: 'Replaced bearing', notes: 'Excessive wear detected on bearing B-45.' },
    { id: 'LOG-003', date: '2023-08-12', equipment: 'EQP-002', action: 'Coolant flush', notes: 'Coolant levels were low.' },
    { id: 'LOG-004', date: '2023-08-20', equipment: 'EQP-004', action: 'Hydraulic fluid top-up', notes: 'Minor leak detected and patched at joint H-2.' },
    { id: 'LOG-005', date: '2023-09-01', equipment: 'EQP-001', action: 'Routine check', notes: 'All systems nominal.' },
];


export const dummyMaintenanceLogs = `
Log Date: 2023-08-01, Equipment: EQP-001, Action: Routine check, Notes: All systems nominal.
Log Date: 2023-08-05, Equipment: EQP-003, Action: Replaced bearing, Notes: Excessive wear detected on bearing B-45.
Log Date: 2023-08-12, Equipment: EQP-002, Action: Coolant flush, Notes: Coolant levels were low.
Log Date: 2023-08-20, Equipment: EQP-004, Action: Hydraulic fluid top-up, Notes: Minor leak detected and patched at joint H-2.
Log Date: 2023-09-01, Equipment: EQP-001, Action: Routine check, Notes: All systems nominal.
`;

export const dummyFailurePredictions = `
Prediction for EQP-002 (Welding Robot): High probability of overheating within 5 days due to sustained high-temperature readings.
Prediction for EQP-003 (Assembly Line Motor): 85% probability of motor failure within 7 days based on increasing vibration patterns.
Prediction for EQP-001 (CNC Machine): Low failure probability. Current operational parameters are stable.
`;
