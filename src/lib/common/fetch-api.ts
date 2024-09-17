import { ZodType } from 'zod';
import { ApiResponseDto, HttpError, ProblemDetailsResponseDto } from './types';

interface FetchApiProps<ResponseType = unknown> {
  path: string;
  init?: RequestInit;
  responseSchema: ZodType<ResponseType>;
}

export async function fetchApi<TResponse = unknown>({
  path,
  init,
  responseSchema,
}: FetchApiProps): Promise<ApiResponseDto<TResponse>> {
  const url = `${process.env.API_URL}${path}`;

  try {
    // Fetch api
    const response = await fetch(url, {
      signal: AbortSignal.timeout(3000),
      ...init,
    });
    if (!response.ok) {
      throw new HttpError(response);
    }
    const responseBody = await response.json();

    // Server response validation
    let parsedData: TResponse;
    if (process.env.NODE_ENV === 'development') {
      parsedData = responseSchema.parse(responseBody.data) as TResponse;
    } else {
      parsedData = responseSchema.safeParse(responseBody.data) as TResponse;
    }

    return {
      successRes: {
        code: responseBody.code,
        message: responseBody.message,
        data: parsedData,
      },
      failureRes: null,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        successRes: null,
        failureRes: {
          status: 500,
          title: 'No se pudo acceder al servidor',
          errors: [],
        },
      };
    }
    if (error instanceof HttpError) {
      return {
        successRes: null,
        failureRes: (await error.response.json()) as ProblemDetailsResponseDto,
      };
    }
    // TODO Send error to a monitoring service
    console.error({ error });
    throw new Error('Error no contemplado en fetchApi()');
  }
}
