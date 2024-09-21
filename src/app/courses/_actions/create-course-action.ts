'use server';

import { ActionResultDto } from '~/lib/types';
import { createCourse } from '~/services/courses/create-course/create-course';

export async function createCourseAction(
  createCourseFormData: FormData
): Promise<ActionResultDto> {
  const createResult = await createCourse(createCourseFormData);

  console.log(
    'Resultado de la creación:',
    JSON.stringify(createResult, null, 2)
  );
  createCourseFormData.forEach((value, key) => {
    console.log(`FormData [${key}]:`, value, typeof value);
  });

  if (createResult.failureRes) {
    return {
      success: false,
      error: createResult.failureRes,
    };
  }

  return {
    success: true,
    data: createResult.successRes.message,
  };
}
