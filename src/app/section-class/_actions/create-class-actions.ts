'use server';

import { ActionResultDto } from '~/lib/types';
import { createClass, CreateClassDto } from '~/services/classes/create-class';

export async function CreateClassAction(
  createClassDto: CreateClassDto
): Promise<ActionResultDto<string>> {
  const createClassResult = await createClass(createClassDto);
  console.log(createClassResult);
  if (createClassResult.failureRes)
    return {
      success: false,
      error: createClassResult.failureRes,
    };

  return {
    success: true,
    data: createClassResult.successRes.message,
  };
}
