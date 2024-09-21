// src/app/courses/[id]/components/CourseComments.tsx
'use client';

export default function CourseComments() {
  return (
    <div className="my-4">
      <button className="text-blue-500">Ocultar comentarios</button>
      <div className="mt-2">
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="Escribe un comentario..."
        ></textarea>
        <p className="mt-4">Comentarios anteriores...</p>
      </div>
    </div>
  );
}
