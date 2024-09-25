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

export function extractJwtPayload(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const jsonPayload = Buffer.from(base64Payload, 'base64').toString();
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log();
    console.error('Error parsing JWT payload');
    console.log();
    return null;
  }
}

export function capitalizeFirstLetter(text:string) : string {
  if(!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1)
}
