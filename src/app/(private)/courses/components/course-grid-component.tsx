'use client';
import { Icourse } from '~/services/courses/courses';
import { CourseCard } from '~/components/course-card';

interface CourseGridClientProps {
  courses: Icourse[];
}

export default function CourseGridClient({ courses }: CourseGridClientProps) {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course: Icourse) => (
          <CourseCard
            key={course.id}
            className="transform rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
            title={course.name}
            instructorName={course.instructor_name}
            date={course.published_at}
            thumbnailUrl={course.thumbnail_url}
            courseId={course.id} // Asegúrate de pasar el ID
          />
        ))}
      </div>
    </div>
  );
}
