import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { verifySession } from '~/lib/session';
import { ApiResponseDto, ROLES } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';
// Importa verifySession

// Define el esquema para un curso
export const courseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  slug: z.string(),
  published_at: z.string().nullable(),
  instructor_name: z.string(),
});

// Define el esquema de respuesta que contiene cursos
const responseSchema = z.array(courseSchema);

export type CourseResponseDto = z.infer<typeof courseSchema>;
export type CoursesResponseDto = CourseResponseDto[];

// Servicio para obtener todos los cursos
export async function getAllCourses(): Promise<ApiResponseDto<CourseData[]>> {
  // Verifica la sesión y el rol del usuario
  const session = verifySession();
  const isInstructor = session.roleId === ROLES.INSTRUCTOR;

  // Cambia el endpoint basado en si el usuario es instructor o no
  const apiPath = isInstructor ? '/courses/instructor' : '/courses';

  const apiResponseDto = await fetchApi<CoursesResponseDto>({
    isAuth: true,
    path: apiPath, // Usa la ruta correcta
    init: {
      method: 'GET',
    },
    responseSchema,
  });

  if (apiResponseDto.failureRes) {
    console.error('API call failed:', apiResponseDto.failureRes);
    return apiResponseDto;
  }

  try {
    const transformedData = transformServiceSuccessResponseData(
      apiResponseDto.successRes,
      dataTransformerFn
    );
    return transformedData;
  } catch (error) {
    console.error('Error transforming data:', error);
    throw error;
  }
}

// Interface para el objeto curso
export interface CourseData {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  slug: string;
  publishedAt: string;
  instructorName: string; // Added instructor_name
}

// Función de transformación para mapear la respuesta de la API al formato interno
function dataTransformerFn(responseDtos: CoursesResponseDto): CourseData[] {
  return responseDtos.map(
    ({
      id,
      name,
      description,
      thumbnail_url,
      slug,
      published_at,
      instructor_name,
    }) => ({
      id,
      name,
      description: description ?? '',
      thumbnailUrl: thumbnail_url ?? '',
      slug: slug.toLowerCase(),
      publishedAt: published_at ? published_at : new Date().toISOString(),
      instructorName: instructor_name,
    })
  );
}
