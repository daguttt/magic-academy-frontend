import { Suspense } from 'react';
import { verifySession } from '~/lib/session';
import { ROLES } from '~/lib/types';
import { StudentHome } from './_pages/student-home-page';
import { InstructorHome } from './_pages/instructor-home-page';
import { AdminHome } from './_pages/admin-home-page';

export default function HomePage() {
  const session = verifySession();

  switch (session.roleId) {
    case ROLES.STUDENT: {
      return (
        <Suspense fallback={<h1>Cargando...</h1>}>
          <StudentHome />
        </Suspense>
      );
    }
    case ROLES.INSTRUCTOR: {
      return <InstructorHome />;
    }
    case ROLES.ADMIN: {
      return <AdminHome />;
    }
    default: {
      throw new Error(`Home for role ${session.roleId} not implemented`);
    }
  }
}
