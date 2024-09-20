import { fetchApi } from '~/lib/fetch-api';

// DTO para el registro
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  topicIds: number[]; // Lista de IDs de temas asociados
}

// Servicio de registro
export async function register(registerDto: RegisterDto) {
  return await fetchApi({
    path: '/users/register', // Ruta de tu API para registrar un usuario
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDto),
    },
  });
}
