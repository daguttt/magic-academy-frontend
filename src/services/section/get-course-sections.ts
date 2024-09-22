import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

export const courseSectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  course: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    thumbnail_url: z.string().nullable(),
    slug: z.string(),
    published_at: z.string(),
    users: z.array(z.unknown()), // Still have no idea what this attribute brings
  }),
});

const courseSectionsSchema = z.array(courseSectionSchema);

export type courseSectionResponseDto = z.infer<typeof courseSectionSchema>;
export type courseSectionsResponseDto = z.infer<typeof courseSectionsSchema>;

export interface IcourseSection {
  id: number;
  name: string;
  course: {
    id: number;
    name: string;
    description: string;
    thumbnail_url: string;
    slug: string;
    published_at: string;
    users: unknown[]; // Still have no idea what this attribute brings
  };
}

//Service to fetch all the sections of a class
export async function getCourseSections(
  course: number
): Promise<ApiResponseDto<IcourseSection[]>> {
  const apiResponseDto = await fetchApi<courseSectionsResponseDto>({
    isAuth: true,
    path: '/course-section',
    init: {
      method: 'GET',
      body: JSON.stringify({ course }),
    },
    responseSchema: courseSectionsSchema, // Expect an array of courses
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transform the successful response
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer function to map API response to internal format
function dataTransformerFn(
  responseDtos: courseSectionsResponseDto
): IcourseSection[] {
  return responseDtos.map(({ id, name, course }) => ({
    id,
    name,
    course: {
      id: course.id,
      name: course.name,
      description: course.description,
      thumbnail_url: course.thumbnail_url ?? '',
      slug: course.slug.toLowerCase(),
      published_at: new Date(course.published_at).toLocaleDateString(),
      users: course.users,
    },
  }));
}
