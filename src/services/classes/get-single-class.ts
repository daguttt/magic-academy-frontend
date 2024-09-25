import { z } from 'zod';
import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';

// Schema for a single class response
const singleClassResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    sectionClass: z.object({
      id: z.number(),
      title: z.string(),
      content: z.string().nullable(),
      url: z.string().nullable(),
      created_at: z.string(),
      courseSection: z.object({
        id: z.number(),
        name: z.string(),
      }),
    }),
    courseId: z.number(),
  }),
});

// Infer the type of the response
export type SingleClassResponseDto = z.infer<typeof singleClassResponseSchema>;

// Interface for the internal format of class data
export interface SingleClassData {
  classId: number;
  title: string;
  content: string | null;
  url: string | null;
  createdAt: string;
  courseSectionId: number;
  courseSectionName: string;
}

// Function to get a single class
export async function getSingleClass(
  classId: number
): Promise<ApiResponseDto<SingleClassData>> {
  const apiResponseDto = await fetchApi<SingleClassResponseDto>({
    isAuth: true,
    path: `/section-class/${classId}`,
    init: {
      method: 'GET',
    },
    responseSchema: singleClassResponseSchema,
  });

  // Check for an error response
  if (apiResponseDto.failureRes) return apiResponseDto;

  // Return a successful response with transformed data
  return {
    successRes: {
      code: apiResponseDto.successRes.code,
      message: apiResponseDto.successRes.message,
      data: transformResponse(apiResponseDto.successRes.data),
    },
    failureRes: null,
  };
}

// Transformation function to map API response to internal format
function transformResponse(
  responseDto: SingleClassResponseDto
): SingleClassData {
  const { sectionClass } = responseDto.data;

  return {
    classId: sectionClass.id,
    title: sectionClass.title,
    content: sectionClass.content,
    url: sectionClass.url,
    createdAt: sectionClass.created_at,
    courseSectionId: sectionClass.courseSection.id,
    courseSectionName: sectionClass.courseSection.name,
  };
}
