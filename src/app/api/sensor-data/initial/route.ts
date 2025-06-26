import { NextResponse } from 'next/server';
import { initialSensorData } from '@/lib/dummy-data';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return NextResponse.json(initialSensorData);
}
