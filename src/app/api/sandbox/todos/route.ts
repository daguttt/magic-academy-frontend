import { db } from '~/server/db';
import { todosTable } from '~/server/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  const todos = await db.select().from(todosTable);
  return NextResponse.json(todos);
}
