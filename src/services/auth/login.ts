import { z } from 'zod';

import { fetchApi } from '~/lib/common/fetch-api';

const loginResponseSchema = z.object({
  access_token: z.string(),
});

export type LoginResponseDto = z.infer<typeof loginResponseSchema>;

export interface LoginDto {
  email: string;
  password: string;
}

export async function login(loginDto: LoginDto) {
  return await fetchApi<LoginResponseDto>({
    path: '/auth/login',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDto),
    },
    responseSchema: loginResponseSchema,
  });
}
