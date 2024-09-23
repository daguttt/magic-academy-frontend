import { cookies } from 'next/headers';
import { fetchApi } from '~/lib/fetch-api';

export interface CreateClassDto {
  title: string;
}

const authToken = cookies().get('AUTH_TOKEN')?.value;

export async function createClass(createClassDto: CreateClassDto) {
  return await fetchApi({
    path: '/section-class',
    init: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createClassDto),
    },
  });
}
