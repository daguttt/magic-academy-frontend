import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

const courseSectionsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    course: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      thumbnail_url: z.string().nullable(),
      slug: z.string(),
      published_at: z.string().nullable(),
      users: z.array(z.unknown()), // Still have no idea what this attribute brings
    }),
  })
);

export type CourseSectionsResponseDto = z.infer<typeof courseSectionsSchema>;

//Service to fetch all the sections of a class
export async function getCourseSections(
  courseId: number
): Promise<ApiResponseDto<CourseSectionData[]>> {
  const apiResponseDto = await fetchApi<CourseSectionsResponseDto>({
    isAuth: true,
    path: `/course-section/${courseId}`,
    init: {
      method: 'GET',
    },
    responseSchema: courseSectionsSchema, // Expect an array of sections
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transform the successful response
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer function to map API response to internal format
export interface CourseSectionData {
  sectionId: number;
  sectionName: string;
}

function dataTransformerFn(
  responseDto: CourseSectionsResponseDto
): CourseSectionData[] {
  return responseDto.map(({ id, name }) => ({
    sectionId: id,
    sectionName: name,
  }));
}
