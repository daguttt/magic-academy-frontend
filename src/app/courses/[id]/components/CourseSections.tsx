// src/app/courses/[id]/components/CourseSections.tsx
'use client';

export default function CourseSections() {
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">Sección 1</h2>
      <ul>
        <li className="flex justify-between">
          <span>Título clase 1</span>
          <span>5:25min</span>
        </li>
        <li className="flex justify-between">
          <span>Título clase 2</span>
          <span>8:35min</span>
        </li>
        <li className="flex justify-between">
          <span>Título clase 3</span>
          <span>10:15min</span>
        </li>
      </ul>
    </div>
  );
}
