import { getAllCourses } from '~/services/courses/get-courses';
import CourseGridClient from '../../courses/components/course-grid-component';
import { CreateClassButton } from '~/components/create-class/create-class';

export default async function InstructorHome() {
  const apiResponse = await getAllCourses();

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
      <h1 className="mb-4">Bienvenido Instructor</h1>
        <div></div>
        <CreateClassButton />
      </div>
      <CourseGridClient courses={apiResponse.successRes?.data || []} />
    </div>
  );
}
