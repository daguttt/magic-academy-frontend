import { fetchApi } from '~/lib/fetch-api';

export async function createCourse(createCourseFormData: FormData) {
  return await fetchApi({
    path: '/courses',
    init: {
      method: 'POST',
      body: createCourseFormData,
    },
    isAuth: true,
  });
}
