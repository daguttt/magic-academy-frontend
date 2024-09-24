import { getAllCourses } from '~/services/courses/get-courses';
import CourseGridClient from '../../courses/components/course-grid-component';
import { CreateClassButton } from '~/components/create-class/create-class';
import Banner from '~/components/banner/banner';

export default async function InstructorHome() {
  const apiResponse = await getAllCourses();

  return (
    <div className="flex flex-col">
      <Banner className="mb-4" />{' '}
      {
        <div className="mb-4 flex items-center justify-between p-8">
          <h1 className="mb-4 text-2xl">Bienvenido Instructor</h1>
          <CreateClassButton />
        </div>
      }
      <CourseGridClient courses={apiResponse.successRes?.data || []} />
    </div>
  );
}
