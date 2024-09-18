import { z } from 'zod';

import { fetchApi } from '~/lib/fetch-api';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Response Schema
const loginResponseSchema = z.object({
  access_token: z.string(),
});

export type LoginResponseDto = z.infer<typeof loginResponseSchema>;

export interface LoginDto {
  email: string;
  password: string;
}

// Service
export async function login(loginDto: LoginDto) {
  const apiResponseDto = await fetchApi<LoginResponseDto>({
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

  if (apiResponseDto.failureRes) return apiResponseDto;

  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer
interface LoginData {
  access_token: string;
}
function dataTransformerFn({ access_token }: LoginResponseDto): LoginData {
  return {
    access_token,
  };
}
