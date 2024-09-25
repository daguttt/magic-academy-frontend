import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';

// Definición del tipo de respuesta de las clases de una sección
export interface SectionClassesData {
  classId: number;
  classTitle: string;
  classContent: string;
  classUrl: string | null;  // Permitir que sea nulo si no hay URL
  classCreatedAt: string;
}

// Servicio para obtener todas las clases de una sección
export async function getSectionClasses(
  sectionId: number
): Promise<ApiResponseDto<SectionClassesData[]>> {
  const apiResponseDto = await fetchApi<SectionClassesData[]>({
    isAuth: true,
    path: `/course-section/${sectionId}/classes`,
    init: {
      method: 'GET',
    },
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  console.log(JSON.stringify(apiResponseDto), 'aqui esta el api response');

  // Transformamos la respuesta exitosa
  return {
    successRes: {
      code: apiResponseDto.successRes.code,
      message: apiResponseDto.successRes.message,
      data: dataTransformerFn(apiResponseDto.successRes.data),
    },
    failureRes: null,
  };
}

// Función transformadora para mapear la respuesta de la API al formato interno
function dataTransformerFn(
  responseDto: any[]
): SectionClassesData[] {
  return responseDto.map(item => ({
    classId: item.id,
    classTitle: item.title,
    classContent: item.content,
    classUrl: item.url,
    classCreatedAt: item.created_at,
  }));
}
