import { ZodError, type ZodIssue, ZodIssueCode, type ZodType } from 'zod';
import { ApiResponseDto, HttpError, ProblemDetailsResponseDto } from './types';
import { verifySession } from './session';

export interface FetchApiProps<ResponseType = unknown> {
  isAuth?: boolean;
  path: string;
  init: RequestInit;
  responseSchema?: ZodType<ResponseType>;
}

/**
 * Fetches the backend API.
 *
 * The `isAuth` parameter determines if the request should be authenticated.
 * By default is `false`. If it's `true`, it will add the `Authorization`
 * header with the access token extracted from the session (cookies).
 */
export async function fetchApi<TResponse = unknown>({
  isAuth = false,
  path,
  init,
  responseSchema,
}: FetchApiProps): Promise<ApiResponseDto<TResponse>> {
  if (isAuth) addAuthToRequestInit({ init });

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
    if (responseSchema) {
      validateServerResponseData({
        data: responseBody.data,
        schema: responseSchema,
      });
    }

    return {
      successRes: {
        code: responseBody.code,
        message: responseBody.message,
        data: responseBody.data,
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
          detail: 'No se pudo acceder al servidor',
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
    // Error thrown validating server response
    if (error instanceof ZodError) {
      handleZodErrorDev(error);
    }

    console.log('-*********************************************************-');
    console.error({ error });
    console.log('-*********************************************************-');
    throw new Error('Error no contemplado en fetchApi()');
  }
}

function addAuthToRequestInit({ init }: { init: RequestInit }) {
  const session = verifySession();
  init.headers = {
    ...init.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };
  return init;
}

function validateServerResponseData({
  data,
  schema,
}: {
  data: unknown;
  schema: ZodType<unknown>;
}) {
  if (process.env.NODE_ENV === 'development') {
    schema.parse(data);
  } else {
    const { success: isReponseDataValid, error } = schema.safeParse(data);
    if (!isReponseDataValid) {
      // TODO: Send error to a monitoring service
      logValidationZodIssues(error.issues);
    }
  }
}

/**
 * For development purposes.
 * Describes which data paths didn't match the schema.
 * Throws an error if the response data does not match the schema.
 */
function handleZodErrorDev(error: ZodError) {
  logValidationZodIssues(error.issues);
  throw new Error('Response data does not match the provided schema');
}

function logValidationZodIssues(issues: ZodIssue[]) {
  console.error('\nError: Response data does not match the provided schema');
  issues.forEach((issue) => {
    if (issue.code === ZodIssueCode.invalid_type) {
      console.error({
        property: issue.path.join('.'),
        message: `The expected path's type is '${issue.expected}', but received '${issue.received}'`,
        zodMessage: issue.message,
      });
      console.log('-*********************-');
    }
  });
}
