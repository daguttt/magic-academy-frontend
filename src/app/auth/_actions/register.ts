'use server';

import { register, type RegisterDto } from '~/services/auth/register';
import { ProblemDetailsResponseDto } from '~/lib/types';

type ActionResultDto<TData = unknown> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: ProblemDetailsResponseDto;
    };

export async function registerAction(
  registerDto: RegisterDto
): Promise<ActionResultDto> {
  const registerResult = await register(registerDto);

  if (registerResult.failureRes)
    return {
      success: false,
      error: registerResult.failureRes,
    };

  return {
    success: true,
    data: registerResult.successRes.message,
  };
}
