import { NextResponse } from 'next/server';
import { anomalyAlerts } from '@/lib/dummy-data';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return NextResponse.json(anomalyAlerts);
}
