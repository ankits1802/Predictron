import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { equipmentHealth, anomalyAlerts, failurePredictionData, maintenanceLogsData } from '@/lib/dummy-data';

// Zod Schemas for our data types to be used in tools
export const EquipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['Operational', 'Warning', 'Critical']),
  temperature: z.number(),
  vibration: z.number(),
  pressure: z.number(),
});

export const AlertSchema = z.object({
    id: z.string(),
    equipmentId: z.string(),
    equipmentName: z.string(),
    message: z.string(),
    severity: z.enum(['Low', 'Medium', 'High']),
    timestamp: z.string(),
});

export const FailurePredictionPointSchema = z.object({
  date: z.string(),
  probability: z.number(),
  trend: z.number(),
});

export const MaintenanceLogSchema = z.object({
    id: z.string(),
    date: z.string(),
    equipment: z.string(),
    action: z.string(),
    notes: z.string(),
});


// Tool definitions
export const getEquipmentHealthTool = ai.defineTool(
    {
        name: 'getEquipmentHealth',
        description: 'Get the current health status and sensor readings for all equipment.',
        inputSchema: z.object({}),
        outputSchema: z.array(EquipmentSchema),
    },
    async () => equipmentHealth
);

export const getAnomalyAlertsTool = ai.defineTool(
    {
        name: 'getAnomalyAlerts',
        description: 'Get a list of recent anomaly alerts from equipment.',
        inputSchema: z.object({}),
        outputSchema: z.array(AlertSchema),
    },
    async () => anomalyAlerts
);

export const getFailurePredictionsTool = ai.defineTool(
    {
        name: 'getFailurePredictions',
        description: 'Get the failure probability predictions for a specific piece of equipment.',
        inputSchema: z.object({}),
        outputSchema: z.array(FailurePredictionPointSchema),
    },
    async () => failurePredictionData
);

export const getMaintenanceLogsTool = ai.defineTool(
    {
        name: 'getMaintenanceLogs',
        description: 'Get a list of historical maintenance logs.',
        inputSchema: z.object({}),
        outputSchema: z.array(MaintenanceLogSchema),
    },
    async () => maintenanceLogsData
);

export const allTools = [
    getEquipmentHealthTool,
    getAnomalyAlertsTool,
    getFailurePredictionsTool,
    getMaintenanceLogsTool
];
