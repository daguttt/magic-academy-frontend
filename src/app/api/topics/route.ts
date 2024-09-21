import { NextResponse } from 'next/server';
import { getTopics } from '~/services/auth/topics';

export async function GET() {
  const topics = await getTopics();
  console.log({ message: 'Getting topics' });
  return NextResponse.json(topics);
}