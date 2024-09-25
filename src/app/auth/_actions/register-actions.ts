'use server';

import { type ActionResultDto } from '~/lib/types';
import { register, type RegisterDto } from '~/services/auth/register';

export async function registerAction(
  registerDto: RegisterDto
): Promise<ActionResultDto<string>> {
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
