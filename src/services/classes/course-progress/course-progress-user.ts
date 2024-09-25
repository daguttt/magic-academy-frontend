'use server';

import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Response Schema
interface Course {
  courseId: number;
  courseName: string;
  progress: number;
}

const courseProgressesResponseSchema = z.array(
  z.object({
    courseId: z.number(),
    courseName: z.string(),
    progress: z.number().min(0).max(100),
  })
);

export type CourseProgressesResponseDto = z.infer<
  typeof courseProgressesResponseSchema
>;

// Servicio
export async function getStudentCourseProgresses(): Promise<
  ApiResponseDto<Course[]>
> {
  // Realiza la llamada a la API utilizando la función fetchApi
  const apiResponseDto = await fetchApi<CourseProgressesResponseDto>({
    isAuth: true,
    path: '/users/user/enrolled-courses',
    init: {
      method: 'GET',
    },
    responseSchema: courseProgressesResponseSchema, // Esquema para validar la respuesta
  });

  // Verifica si hubo un error en la respuesta
  if (apiResponseDto.failureRes) return apiResponseDto;

  // Devuelve la respuesta exitosa
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer
interface CourseProgressData {
  courseId: number;
  courseName: string;
  progress: number;
}

function dataTransformerFn(
  courseProgresses: CourseProgressesResponseDto
): CourseProgressData[] {
  return courseProgresses.map((courseProgress) => ({
    courseId: courseProgress.courseId,
    courseName: courseProgress.courseName,
    progress: courseProgress.progress
  }));
}
