import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Definición del esquema de respuesta
const topicsResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

// Inferencia de tipos basada en el esquema de respuesta
export type TopicsResponseDto = z.infer<typeof topicsResponseSchema>;

// Servicio para obtener los temas
export async function getTopics(): Promise<ApiResponseDto<Topic[]>> {
  const apiResponseDto = await fetchApi<TopicsResponseDto>({
    path: '/topics',
    init: {
      method: 'GET',
    },
    responseSchema: topicsResponseSchema,
  });

  // Devolver directamente si hay un error
  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transformar los datos si la respuesta es exitosa
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Definición de la interfaz Topics
interface Topic {
  id: number;
  name: string;
}

// Función para transformar los datos
function dataTransformerFn(responseDto: TopicsResponseDto): Topic[] {
  return responseDto.map(({ id, name }) => ({
    id,
    name,
  }));
}
