'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { fetchUserCourses } from '~/services/classes/course-progress/course-progress-user';
import { Button } from '../ui/button';

interface Course {
  courseId: number;
  courseName: string;
  progress: number; // Este valor debería estar entre 0 y 1
}

interface ApiResponse {
  code: number;
  message: string;
  data: Course[];
}

export default function ProgressClass() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6MSwiaWF0IjoxNzI3MDQ5MDc1LCJleHAiOjE3MjcwNTI2NzV9.fQVn_Xfa10VUkLB1Vk4g_PTF7Wa9biTXPDCFLtQn-ZU';

    fetchUserCourses(token)
      .then((response: ApiResponse) => {
        if (response.code === 200) {
          setCourses(response.data || []);
        } else {
          throw new Error(response.message || 'Error inesperado');
        }
      })
      .catch((error: any) => {
        console.error('Error al obtener los cursos:', error);
        setError('No se pudo cargar la información de los cursos.');
      });
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.courseId} className="rounded-lg p-4 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-600">
                {course.courseName}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2 flex">
              <Progress
                value={course.progress * 100}
                aria-label=""
                className="flex-1"
              />
              <p>{(course.progress * 100).toFixed(0)}% completado</p>
              <Button asChild>
                <p>ir a clase</p>
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-red-500">No hay cursos disponibles.</p>
      )}
    </div>
  );
}
