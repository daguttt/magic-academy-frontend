'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { CirclePlay } from 'lucide-react';
import { getStudentLastSeenClasses } from '~/services/classes/last-seen-classes';

interface LastSeenClass {
  classId: number;
  title: string;
  classNumber: number;
  totalCourseClasses: number;
  courseId: number;
}

export default function LastCourse() {
  const [lastSeenClasses, setLastSeenClasses] = useState<LastSeenClass[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getStudentLastSeenClasses();
        console.log('API Response:', response);

        if (response.successRes && Array.isArray(response.successRes.data)) {
          setLastSeenClasses(response.successRes.data);
        } else {
          console.error("Error en la respuesta:", response);
          setLastSeenClasses([]); // Restablece a un arreglo vacío si la respuesta es incorrecta
        }
      } catch (error) {
        console.error("Error al obtener las clases vistas:", error);
        setLastSeenClasses([]); // Muestra un mensaje de error o renderiza contenido alternativo
      }
    }

    fetchData();
  }, []);

  console.log('Last Seen Classes:', lastSeenClasses); // Verifica si el estado cambia

  return (
    <div>
      {lastSeenClasses.length > 0 ? (
        lastSeenClasses.map((lastClass) => (
          <Card key={lastClass.classId} className="group w-52 overflow-hidden rounded-b-lg border border-gray-200 shadow-lg">
            <CardHeader className="p-0">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMNMx79cUuHHE-VQnycTJN5MfR7xaZ7hj6g&s"
                  alt="Class Thumbnail"
                  className="h-full w-full object-cover"
                />
                <CirclePlay className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <p className="text-xs text-gray-600">
                Class {lastClass.classNumber} of {lastClass.totalCourseClasses}
              </p>
              <CardTitle className="text-lg font-semibold">{lastClass.title}</CardTitle>
              <p className="text-sm text-gray-500">Course ID: {lastClass.courseId}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No hay clases vistas disponibles.</p>
      )}
    </div>
  );
}

