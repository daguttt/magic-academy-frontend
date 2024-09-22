import { z } from 'zod';

import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Define the schema for a single course
export const courseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  thumbnail_url: z.string().nullable(), // Can be null
  slug: z.string(),
  published_at: z.string(),
  instructor_name: z.string(), // Added instructor_name
});

// Define the schema for an array of courses
const coursesSchema = z.array(courseSchema);

export type courseResponseDto = z.infer<typeof courseSchema>;
export type coursesResponseDto = z.infer<typeof coursesSchema>;

// Interface for the course object
export interface CourseData {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  slug: string;
  publishedAt: string;
  instructorName: string; // Added instructor_name
}

// Service to fetch all classes (courses)
export async function getAllCourses(): Promise<ApiResponseDto<CourseData[]>> {
  // Fetch data from the API and expect an array of courses
  const apiResponseDto = await fetchApi<coursesResponseDto>({
    isAuth: true,
    path: '/courses',
    init: {
      method: 'GET',
    },
    responseSchema: coursesSchema, // Expect an array of courses
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transform the successful response
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer function to map API response to internal format
function dataTransformerFn(responseDtos: coursesResponseDto): CourseData[] {
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
      id, // Mapping `id`
      name, // Mapping `name`
      description, // Mapping `description`
      thumbnailUrl: thumbnail_url ?? '', // Default image if null
      slug: slug.toLowerCase(), // Slug in lowercase
      publishedAt: new Date(published_at).toLocaleDateString(), // Format the date
      instructorName: instructor_name, // Mapping `instructor_name`
    })
  );
}
