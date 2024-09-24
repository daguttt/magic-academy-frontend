import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser as getUserService } from '~/services/auth/get-user';

import { extractJwtPayload } from './utils';
import { ROLES } from './types';

export const SESSION_KEY_NAME = 'session';

export async function createSession(accessToken: string) {
  cookies().set({
    name: SESSION_KEY_NAME,
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE ?? '3600'),
    sameSite: 'strict',
  });
}

export async function deleteSession() {
  cookies().delete(SESSION_KEY_NAME);
}

interface Session {
  userId: number;
  roleId: ROLES;
  iat: number;
  exp: number;
  accessToken: string;
}

// Verify session for role-based authorization
export function verifySession() {
  const accessToken = cookies().get(SESSION_KEY_NAME)?.value;
  if (!accessToken) redirect('/auth/login');

  const session: Session = extractJwtPayload(accessToken);
  if (!session) redirect('/auth/login');

  console.log('From verifySession() in session.ts', { session });

  session.accessToken = accessToken;

  return session as Session;
}

export async function getUser() {
  const apiResponseDto = await getUserService();

  if (apiResponseDto.successRes) return apiResponseDto.successRes.data;

  if (apiResponseDto.failureRes.status === 401) {
    redirect('/auth/logout');
  }
  throw new Error('User is not logged in');
}
