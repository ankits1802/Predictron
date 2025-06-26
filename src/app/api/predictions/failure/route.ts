import { NextResponse } from 'next/server';
import { failurePredictionData } from '@/lib/dummy-data';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  return NextResponse.json(failurePredictionData);
}
