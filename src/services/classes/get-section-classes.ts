import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

const sectionClassesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    url: z.string(),
    created_at: z.string(),
    courseSection: z.object({
      id: z.number(),
      name: z.string(),
    }),
  })
);

export type SectionClassesResponseDto = z.infer<typeof sectionClassesSchema>;

//Service to fetch all the classes of a section
export async function getSectionClasses(
  sectionId: number
): Promise<ApiResponseDto<SectionClassesData[]>> {
  const apiResponseDto = await fetchApi<SectionClassesResponseDto>({
    isAuth: true,
    path: `/course-section/${sectionId}/classes`,
    init: {
      method: 'GET',
    },
    responseSchema: sectionClassesSchema, // Expect an array of classes
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transform the successful response
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer function to map API response to internal format
export interface SectionClassesData {
  classId: number;
  classTitle: string;
  classContent: string;
  classUrl: string;
  classCreatedAt: string;
}

function dataTransformerFn(
  responseDto: SectionClassesResponseDto
): SectionClassesData[] {
  return responseDto.map(({ id, title, content, url, created_at }) => ({
    classId: id,
    classTitle: title,
    classContent: content,
    classUrl: url,
    classCreatedAt: created_at,
  }));
}
