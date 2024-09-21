'use client';
import React from 'react';

const CourseHeader: React.FC = () => {
  return (
    <header className="bg-black py-6 text-center text-white">
      <h1 className="text-4xl font-bold uppercase tracking-wide">Cursos</h1>
      <p className="mt-2 text-lg">Explora nuestros últimos cursos</p>
    </header>
  );
};

export default CourseHeader;
