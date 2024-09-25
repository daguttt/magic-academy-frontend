'use client';
import { useParams } from 'next/navigation'; // Cambia el import
import React from 'react';
import Editor from './_components/editor';

const ClassPage = () => {
  // Usa useParams para obtener los parámetros de la URL
  const { id, classId } = useParams();

  return (
    <div>
      <h1>Course ID: {id}</h1>
      <h2>Class ID: {classId}</h2>
      {/* Tu componente Editor o cualquier otra lógica */}
      <Editor />
    </div>
  );
};

export default ClassPage;
