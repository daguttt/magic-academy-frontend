// src/app/courses/[id]/components/CourseHeader.tsx
'use client';

import Image from 'next/image';

export default function CourseHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Nombre Curso</h1>
        <p className="text-gray-600">Esta es la descripción del curso</p>
        <div className="flex items-center">
          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
        </div>
      </div>
      <div>
        <Image
          src="https://via.placeholder.com/150"
          alt="Miniatura"
          className="h-32 w-40 object-cover"
        />
      </div>
    </div>
  );
}
