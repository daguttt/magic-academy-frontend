'use client';
import { CourseData } from '~/services/courses/get-courses';
import { CourseCard } from '~/components/course-card';

interface CourseGridClientProps {
  courses: CourseData[];
}

export default function CourseGridClient({ courses }: CourseGridClientProps) {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course: CourseData) => (
          <CourseCard
            key={course.id}
            className="transform rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
            title={course.name}
            instructorName={course.instructorName}
            date={course.publishedAt}
            thumbnailUrl={course.thumbnailUrl}
            courseId={course.id} // Asegúrate de pasar el ID
          />
        ))}
      </div>
    </div>
  );
}
