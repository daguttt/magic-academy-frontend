import { CourseCard } from '~/components/course-card';

export default function Demo() {
  return (
    <section className="container mx-auto grid grid-cols-2 gap-6 p-4">
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </section>
  );
}
