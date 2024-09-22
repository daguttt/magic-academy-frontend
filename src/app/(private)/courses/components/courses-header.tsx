'use client';
import React from 'react';

const CourseHeader: React.FC = () => {
  return (
    <header
      className="relative bg-cover bg-center py-12 text-white"
      style={{
        backgroundImage:
          'url(https://www.criptonoticias.com/wp-content/uploads/2022/05/100-estudiantes-becados-aprender-programar-ethereum-1140x570.jpg)',
        height: '400px', // Ajusta la altura según lo necesites
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold uppercase tracking-wide shadow-lg">
          ¡Accede a cientos de cursos gratis!
        </h1>
        <p className="mt-2 text-lg shadow-md">
          Cursos ilimitados, certificados y material de estudio, ¡todo sin
          costo!
        </p>
      </div>
    </header>
  );
};

export default CourseHeader;
