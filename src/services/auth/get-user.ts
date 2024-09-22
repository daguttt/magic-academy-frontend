import { z } from 'zod';

import { fetchApi } from '~/lib/fetch-api';
import { ApiResponseDto } from '~/lib/types';
import { transformServiceSuccessResponseData } from '~/lib/utils';

// Reponse Schema
const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatarUrl: z.string(),
});

export type UserResponseDto = z.infer<typeof userResponseSchema>;

// Service
export async function getUser(): Promise<ApiResponseDto<UserData>> {
  const apiResponseDto = await fetchApi<UserResponseDto>({
    isAuth: true,
    path: '/users/profile',
    init: {
      method: 'GET',
    },
    responseSchema: userResponseSchema,
  });

  if (apiResponseDto.failureRes) return apiResponseDto;

  return transformServiceSuccessResponseData(
    apiResponseDto.successRes,
    dataTransformerFn
  );
}

// Transformer
interface UserData {
  id: number;
  name: string;
  avatarUrl: string;
}

function dataTransformerFn({ id, name, avatarUrl }: UserResponseDto): UserData {
  return {
    id: id,
    name: name,
    avatarUrl: avatarUrl,
  };
}
