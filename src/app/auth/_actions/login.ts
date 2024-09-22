'use server';

import { login, type LoginDto } from '~/services/auth/login';
import { ActionResultDto } from '~/lib/types';
import { createSession } from '~/lib/session';

export async function loginAction(
  loginDto: LoginDto
): Promise<ActionResultDto<string>> {
  const loginResult = await login(loginDto);

  if (loginResult.failureRes)
    return {
      success: false,
      error: loginResult.failureRes,
    };

  createSession(loginResult.successRes.data.accessToken);

  return {
    success: true,
    data: loginResult.successRes.message,
  };
}
