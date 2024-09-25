'use server';

import { type ActionResultDto } from '~/lib/types';
import {
  createSection,
  CreateSectionDto,
} from '~/services/section/create-section';

export async function createSectionAction(
  createSectionDto: CreateSectionDto
): Promise<ActionResultDto<string>> {
  const createSectionResult = await createSection(createSectionDto);
  if (createSectionResult.failureRes)
    return {
      success: false,
      error: createSectionResult.failureRes,
    };
  return {
    success: true,
    data: createSectionResult.successRes.message,
  };
}
