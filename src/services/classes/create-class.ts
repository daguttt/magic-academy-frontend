import { fetchApi } from '~/lib/fetch-api';

export interface CreateClassDto {
  title: string | null;
  courseSectionId: number | null;
}

export async function createClass(createClassDto: CreateClassDto) {
  // Validar que los valores no sean nulos antes de enviar
  if (!createClassDto.title || !createClassDto.courseSectionId) {
    throw new Error("El título y el ID de la sección del curso son obligatorios.");
  }

  return await fetchApi({
    path: '/section-class',
    init: {
      method: 'POST',
      body: JSON.stringify({
        title: createClassDto.title,
        courseSectionId: createClassDto.courseSectionId,
      }), // Asegúrate de que el cuerpo sea una cadena JSON
      headers: {
        'Content-Type': 'application/json', // Establecer el tipo de contenido
      },
    },
    isAuth: true,
  });
}
