import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ApiResponseDto, ApiSuccessResponseDto } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformServiceSuccessResponseData<TRawData, TTransformedData>(
  apiSuccessResponseDto: ApiSuccessResponseDto<TRawData>,
  transformFn: (data: TRawData) => TTransformedData
): ApiResponseDto<TTransformedData> {
  const transformData = transformFn(apiSuccessResponseDto.data);
  const apiResponseDtoToReturn: ApiResponseDto<TTransformedData> = {
    failureRes: null,
    successRes: {
      ...apiSuccessResponseDto,
      data: transformData,
    },
  };

  return apiResponseDtoToReturn;
}
