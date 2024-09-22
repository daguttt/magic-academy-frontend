// src/app/courses/[id]/CourseSectionsServer.tsx (Server component)
import { getCourseSections } from '~/services/section/get-course-sections';
import CourseSections from './CourseSections';

interface CourseSectionsServerProps {
  courseId: number;
}

export default async function GetCourseSectionsServer({
  courseId,
}: CourseSectionsServerProps) {
  // Fetch data on the server

  // Pass the fetched data to the client component
  return (
    <CourseSections>
      {successRes.data.map((section) => (
        <div key={section.id}>
          <h3>{section.name}</h3>
        </div>
      ))}
    </CourseSections>
  );
}
