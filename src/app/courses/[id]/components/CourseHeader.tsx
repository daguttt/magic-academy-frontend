// src/app/courses/[id]/components/CourseHeader.tsx
'use client';

export default function CourseHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Nombre Curso</h1>
        <p className="text-gray-600">Esta es la descripción del curso</p>
        <div className="flex items-center">
          {/* Estrellas o alguna otra info */}
          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
        </div>
      </div>
      <div>
        <img
          src="https://via.placeholder.com/150"
          alt="Miniatura"
          className="w-40 h-32 object-cover"
        />
      </div>
    </div>
  );
}
