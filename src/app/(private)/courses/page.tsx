// Server Component - se encarga del fetching
import { getAllCourses } from '~/services/courses/courses';
import CourseGridClient from './components/course-grid-component';
import SingleCourseHeader from './components/courses-header';
export default async function CoursePage() {
  const apiResponse = await getAllCourses();

  return (
    <div>
      <SingleCourseHeader />
      <CourseGridClient courses={apiResponse.successRes?.data || []} />
    </div>
  );
}
