'use client'

import { useEffect, useState } from 'react';
import { getStudentLastSeenClasses } from '~/services/classes/last-seen-classes'; // Asegúrate de que la ruta sea correcta

interface LastSeenClass {
  classId: number;
  title: string;
  classNumber: number;
  totalCourseClasses: number;
  courseId: number;
}

export default function YourComponent() {
  const [lastSeenClasses, setLastSeenClasses] = useState<LastSeenClass[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      const response = await getStudentLastSeenClasses();
      console.log(response); // Verifica la respuesta aquí

      // Manejo de errores
      if (response.failureRes) {
        console.error("Error de la API:", response.failureRes);
      } else if (response.successRes) {
        // Verifica que sea un array
        if (Array.isArray(response.successRes)) {
          setLastSeenClasses(response.successRes);
        } else {
          console.error("La respuesta no es un array:", response.successRes);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Últimas Clases Vistas</h1>
      <ul>
        {lastSeenClasses.map(cls => (
          <li key={cls.classId}>
            {cls.title} (Clase {cls.classNumber} de {cls.totalCourseClasses})
          </li>
        ))}
      </ul>
    </div>
  );
}
