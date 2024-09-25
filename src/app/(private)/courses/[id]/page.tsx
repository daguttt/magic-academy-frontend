// src/app/courses/[id]/page.tsx

import { Button } from '~/components/ui/button';
import CourseHeader from './components/CourseHeader';
import { CourseTabList } from './components/course-tab-list';
import CourseForum from './components/CourseForum';
import CourseSections from './components/CourseSections';
import { verifySession } from '~/lib/session';
import { ROLES } from '~/lib/types';

interface SingleCoursePageProps {
  params: { id: string };
  searchParams: unknown;
}

export default function SingleCoursePage(props: SingleCoursePageProps) {
  const session = verifySession();
  const manageable = session.roleId === ROLES.INSTRUCTOR;

  const courseId = Number(props.params.id);

  return (
    <div className="container mx-auto px-4">
      <CourseHeader courseId={courseId} />

      <div className="my-4">
        {/* TODO: Show 'Iniciar curso' if the student is not enrolled. If they are, show 'Continuar curso' */}
        {/* TODO: Navigate to the last seen class of the course if the studen is enrolled */}
        <Button>Continuar curso</Button>
      </div>

      <CourseTabList
        tabForoComponent={
          <div className="my-8">
            <CourseForum />
          </div>
        }
        tabSectionsComponent={
          <div className="my-8">
            <CourseSections courseId={courseId} manageable={manageable} />
          </div>
        }
      />
    </div>
  );
}
