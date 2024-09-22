'use server';

import { login, type LoginDto } from '~/services/auth/login';
import { ProblemDetailsResponseDto } from '~/lib/types';
import { createSession, deleteSession } from '~/lib/session';
import { redirect } from 'next/navigation';

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

  createSession(loginResult.successRes.data.accessToken);

  return {
    success: true,
    data: loginResult.successRes.message,
  };
}

export async function logoutAction() {
  deleteSession();
  redirect('/auth/login');
}
