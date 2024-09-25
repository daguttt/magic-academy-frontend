import { Button } from '~/components/ui/button';
import LastCourses from '~/components/last-course-seen/last-course-seen';

export default function Home() {
  return (
    <>
      <div>
        <section className="h-96 bg-gray-500">
          <h1 className="ml-5 text-2xl text-black">Hola</h1>
          <LastCourses />
        </section>
        <section className="h-96 bg-red-50">
          <div className="ml-5">
            <h1 className="bg-red-100 text-black">Hello World</h1>
            <Button>Click me</Button>
          </div>
        </section>
      </div>
    </>
  );
}
