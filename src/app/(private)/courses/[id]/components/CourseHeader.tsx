import Image from 'next/image';
import { getCourse } from '~/services/courses/course/get-course-by-id';

interface CourseHeaderProps {
  courseId: number;
}

export default async function CourseHeader({ courseId }: CourseHeaderProps) {
  const { successRes, failureRes } = await getCourse(courseId);

  if (failureRes) return <p>{failureRes.detail}</p>;
  console.log('successRes.data: ', successRes.data);

  const { name, description, thumbnailUrl } = successRes.data;

  const starsCount = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  const stars = '⭐'.repeat(starsCount);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">{stars}</span>
        </div>
      </div>
      <div>
        <Image
          src={
            thumbnailUrl ??
            'https://gagadget.com/media/cache/d9/d3/d9d3c7ee6fceeaa3fcd883df795686ab.jpg'
          }
          alt="Miniatura"
          className="h-32 w-40 object-cover"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
