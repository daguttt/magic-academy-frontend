'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { getStudentCourseProgresses } from '~/services/classes/course-progress/course-progress-user';
import { Button } from '../ui/button';
import { ApiResponseDto } from '~/lib/types';
import { History } from 'lucide-react';
import { capitalizeFirstLetter } from '~/lib/utils';
import SkeletonProgress from './loanding/skeleton-progress';

interface Course {
  courseId: number;
  courseName: string;
  progress: number;
}

export default function ProgressClass() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getStudentCourseProgresses()
      .then((response: ApiResponseDto<Course[]>) => {
        if (response.successRes) {
          setCourses(response.successRes.data);
        } else {
          throw new Error(response.failureRes?.detail || 'Error inesperado');
        }
      })
      .catch(() => {
        setError('No se pudo cargar la información de los cursos.');
      });
  }, []);

  const handleGoToClass = (courseId: number) => {
    router.push(`/api/courses/${courseId}`); // Redirige a la ruta correspondiente
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.courseId} className="m-5 rounded-lg p-1 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex text-2xl font-bold text-blue-600">
                <History className="m-auto mr-1" size={35} />
                <div className="m-auto">
                  {capitalizeFirstLetter(course.courseName)}
                </div>
                <div className="ml-3 flex w-full justify-end">
                  <Button className="" onClick={() => handleGoToClass(course.courseId)}>
                    <p>ir a clase</p>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <Progress
                value={course.progress * 100}
                aria-label=""
                className=""
              />
              <p className="pt-3">
                {(course.progress * 100).toFixed(0)}% completado
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <SkeletonProgress />
      )}
    </div>
  );
}
