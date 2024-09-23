import { NextResponse } from 'next/server';
import { getAllCourses } from '~/services/courses/get-courses';

export async function GET() {
  const courses = await getAllCourses();
  return NextResponse.json(courses);
}
