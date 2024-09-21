import { fetchApi } from '~/lib/fetch-api';
import { cookies } from 'next/headers';


export async function createCourse(
  createCourseFormData: FormData
) {
  const authToken = cookies().get('AUTH_TOKEN')?.value;
  return await fetchApi({
    path: '/courses',
    init: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: createCourseFormData,
    }
  });
}
