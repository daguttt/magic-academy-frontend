import { NextResponse } from 'next/server';
import { getTopics } from '~/services/auth/topics';

export async function GET() {
  const topics = await getTopics();
  console.log();
  console.log({ message: 'Getting topics', apiResponseDtoTopics: topics });
  console.log();
  return NextResponse.json(topics);
}
