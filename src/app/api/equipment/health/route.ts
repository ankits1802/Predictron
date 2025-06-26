import { NextResponse } from 'next/server';
import { equipmentHealth } from '@/lib/dummy-data';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return NextResponse.json(equipmentHealth);
}
