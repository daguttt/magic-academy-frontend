export class HttpError extends Error {
  constructor(public response: Response) {
    super(`HTTP error ${response.status}`);
  }
}

interface FieldValidationError {
  field: string;
  error: string;
}

export interface ProblemDetailsResponseDto {
  status: number;
  title?: string;
  detail?: string;
  instance?: string;
  errors: FieldValidationError[];
}

export interface ApiSuccessResponseDto<TData> {
  code: number;
  data: TData;
  message: string;
}

// Discriminated union
export type ApiResponseDto<TData> =
  | {
      successRes: ApiSuccessResponseDto<TData>;
      failureRes: null;
    }
  | {
      successRes: null;
      failureRes: ProblemDetailsResponseDto;
    };

export type ActionResultDto<TData = unknown> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: ProblemDetailsResponseDto;
    };

export enum ROLES {
  STUDENT = 1,
  INSTRUCTOR = 2,
  ADMIN = 3,
}
