'use server';

import { ProblemDetailsResponseDto } from '~/lib/types';
import { createClass, CreateClassDto } from '~/services/classes/create-class';

type ActionResultDto<TData = unknown> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: ProblemDetailsResponseDto;
    };

export async function CreateClassAction(
  createClassDto: CreateClassDto
): Promise<ActionResultDto> {
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
