// src/app/courses/[id]/components/CourseHeader.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ICourseData } from './Course';

export default function CourseHeader({ courseData }: ICourseData) {
  const {
    name,
    description,
    // thumbnail_url
  } = courseData;

  const [stars, setStars] = useState<string>('');

  useEffect(() => {
    // Generate stars only on the client side
    const generateStarRating = (): string => {
      const starsCount = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
      return '⭐'.repeat(starsCount);
    };
    setStars(generateStarRating());
  }, []);

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
            // thumbnail_url ||
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
