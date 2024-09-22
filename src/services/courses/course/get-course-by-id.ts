import { z } from 'zod';

import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';
import { courseSchema, Icourse } from '../get-courses';

export type courseResponseDto = z.infer<typeof courseSchema>;

// Service to fetch a single course by courseId
export async function getCourse(
  courseId: number
): Promise<ApiResponseDto<Icourse>> {
  // Fetch data from the API, expecting a single course
  const apiResponseDto = await fetchApi<courseResponseDto>({
    isAuth: true,
    path: `/courses/${courseId}`, // Changed to fetch one course by ID
    init: {
      method: 'GET',
    },
    responseSchema: courseSchema, // Expect a single course in response
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  // Transform the successful response
  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Interface for the course object

// Transformer function to map API response to internal format
function dataTransformerFn(responseDto: courseResponseDto): Icourse {
  return {
    id: responseDto.id, // Map `id`
    name: responseDto.name, // Map `name`
    description: responseDto.description, // Map `description`
    thumbnail_url: responseDto.thumbnail_url ?? '', // Provide a default value if null
    slug: responseDto.slug.toLowerCase(), // Convert slug to lowercase
    published_at: new Date(responseDto.published_at).toLocaleDateString(), // Format the date
    instructor_name: responseDto.instructor_name, // Map `instructor_name`
  };
}
