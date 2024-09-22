import { fetchApi } from '~/lib/fetch-api';

export interface CreateClassDto {
  title: string;
}

export async function createClass(createClassDto: CreateClassDto) {
  return await fetchApi({
    path: '/section-class',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createClassDto),
    },
    isAuth: true,
  });
}
