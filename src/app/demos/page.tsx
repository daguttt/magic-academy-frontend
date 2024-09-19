import LastCourseLetter from '~/components/last-courses-letter/last-course-letter';
import { Button } from '../../components/ui/button';

export default function Home() {
  return (
    <>
      <div>
        <section className="h-96 bg-white">
          <h1 className="ml-5 text-2xl text-black">Hola</h1>
          <LastCourseLetter />
        </section>

        <section className="h-96 bg-red-50">
          <div className="ml-5">
            <h1 className="bg-red-100 text-black">Hello World</h1>
            <Button>Click me</Button>
          </div>
        </section>

        {/* <section className='h-96 bg-blue-100'></section>

        <section className='h-96 bg-gray-100'></section>

        <section className='h-96 bg-purple-600'>
          <h1>Hola buenos dias</h1>
        </section> */}
      </div>
    </>
  );
}
