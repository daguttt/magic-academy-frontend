import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Response Schema
const sectionClassesResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().nullable(),
    url: z.string().nullable(), // Permitir que sea nulo si no hay URL
    created_at: z.string(),
  })
);

export type SectionClasesResponseDto = z.infer<
  typeof sectionClassesResponseSchema
>;

// Servicio para obtener todas las clases de una sección
export async function getSectionClasses(
  sectionId: number
): Promise<ApiResponseDto<SectionClassData[]>> {
  const apiResponseDto = await fetchApi<SectionClasesResponseDto>({
    isAuth: true,
    path: `/course-section/${sectionId}/classes`,
    init: {
      method: 'GET',
    },
    responseSchema: sectionClassesResponseSchema,
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  console.log(JSON.stringify(apiResponseDto), 'aqui esta el api response');

  // Transformamos la respuesta exitosa
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer
export interface SectionClassData {
  classId: number;
  classTitle: string;
  classContent: string | null;
  classUrl: string | null; // Permitir que sea nulo si no hay URL
  classCreatedAt: string;
}

function dataTransformerFn(
  responseDto: SectionClasesResponseDto
): SectionClassData[] {
  return responseDto.map((item) => ({
    classId: item.id,
    classTitle: item.title,
    classContent: item.content,
    classUrl: item.url,
    classCreatedAt: item.created_at,
  }));
}
