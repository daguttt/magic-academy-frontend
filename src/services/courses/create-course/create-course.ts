import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Definición de la interfaz CourseResponseDto
export interface CourseResponseDto {
  id: number;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  slug: string;
  published_at: string | null;
  instructor_name: string;
}

// Servicio para crear un curso
export async function createCourse(
  createCourseFormData: FormData
): Promise<ApiResponseDto<CourseResponseDto>> {
  const apiResponseDto = await fetchApi<CourseResponseDto>({
    path: '/courses',
    init: {
      method: 'POST',
      body: createCourseFormData,
    },
    isAuth: true,
  });

  // Devolver directamente si hay un error
  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transformar los datos si la respuesta es exitosa
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Función para transformar los datos
function dataTransformerFn(responseDto: CourseResponseDto): CourseResponseDto {
  return responseDto; // Aquí puedes aplicar transformaciones si es necesario
}
