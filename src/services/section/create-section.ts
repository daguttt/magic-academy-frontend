import { fetchApi } from '~/lib/fetch-api';

export interface CreateSectionDto {
  name: string;
}

export async function createSection(createSectionDto: CreateSectionDto) {
  return await fetchApi({
    path: '/course-section',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createSectionDto),
    },
    isAuth: true,
  });
}
