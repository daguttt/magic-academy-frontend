'use server';

import { z } from 'zod';

import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Response Schema
const lastSeenClassesResponseSchema = z.array(
  z.object({
    section_class_title: z.string(),
    section_class_id: z.number(),
    course_id: z.number(),
    numClassesInCourse: z.number(),
    numClassInCourse: z.number(),
  })
);

export type LastSeenClassesResponseDto = z.infer<
  typeof lastSeenClassesResponseSchema
>;

// Service
export async function getStudentLastSeenClasses(): Promise<
  ApiResponseDto<LastSeenClass[]>
> {
  const apiResponseDto = await fetchApi<LastSeenClassesResponseDto>({
    isAuth: true,
    path: '/users/user/classes/in-progress/latest',
    init: {
      method: 'GET',
    },
    responseSchema: lastSeenClassesResponseSchema,
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer
interface LastSeenClass {
  classId: number;
  title: string;
  classNumber: number;
  totalCourseClasses: number;
  courseId: number;
}

function dataTransformerFn(
  responseDto: LastSeenClassesResponseDto
): LastSeenClass[] {
  return responseDto.map(
    ({
      section_class_title,
      section_class_id,
      numClassInCourse,
      course_id,
      numClassesInCourse,
    }) => ({
      title: section_class_title,
      classId: section_class_id,
      classNumber: numClassInCourse,
      courseId: course_id,
      totalCourseClasses: numClassesInCourse,
    })
  );
}
