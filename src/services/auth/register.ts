import { fetchApi } from '~/lib/fetch-api';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  topicIds: number[];
  token?: string;
}

export async function register(registerDto: RegisterDto) {
  let path = '/users/register';

  if (registerDto.token) {
    const queryParams = `?token=${encodeURIComponent(registerDto.token)}`;
    path += queryParams;
  }
  return await fetchApi({
    path,
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: registerDto.name,
        email: registerDto.email,
        password: registerDto.password,
        topicIds: registerDto.topicIds,
      }),
    },
  });
}
