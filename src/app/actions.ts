'use server';

import { login, type LoginDto } from '~/services/auth/login';
import { cookies } from 'next/headers';
import { ProblemDetailsResponseDto } from '~/lib/common/types';

type ActionResultDto<TData = unknown> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: ProblemDetailsResponseDto;
    };

export async function loginAction(
  loginDto: LoginDto
): Promise<ActionResultDto> {
  const loginResult = await login(loginDto);

  if (loginResult.failureRes)
    return {
      success: false,
      error: loginResult.failureRes,
    };

  const cookiesStore = cookies();
  cookiesStore.set({
    name: 'AUTH_TOKEN',
    value: loginResult.successRes.data.access_token,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE ?? '3600'),
  });

  return {
    success: true,
    data: loginResult.successRes.message,
  };
}
