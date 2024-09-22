// src/app/courses/[id]/page.tsx

import { getCourse } from '~/services/courses/course/get-course-by-id';
import { Course } from './components/Course';

interface Iparams {
  params: { id: string };
  searchParams: unknown;
}

export default async function CourseDetail(params: Iparams) {
  const { successRes, failureRes } = await getCourse(+params.params.id);

  if (failureRes) return <p>{failureRes.detail}</p>;
  console.log('successRes.data: ', successRes.data);
  return <Course courseData={successRes.data} />;
}
