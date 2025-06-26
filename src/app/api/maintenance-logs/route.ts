
import { NextResponse } from 'next/server';
import { maintenanceLogsData } from '@/lib/dummy-data';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(maintenanceLogsData);
}
