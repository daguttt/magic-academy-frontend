'use server';

import { ActionResultDto } from '~/lib/types';
import { createCourse } from '~/services/courses/create-course/create-course';

export async function createCourseAction(
  createCourseFormData: FormData
): Promise<ActionResultDto> {
  const createResult = await createCourse(createCourseFormData);

  if (createResult.failureRes) {
    return {
      success: false,
      error: createResult.failureRes,
    };
  }

  console.log(JSON.stringify(createResult.successRes, null, 2), "******");

  return {
    success: true,
    data: createResult.successRes.data,
  };
}
