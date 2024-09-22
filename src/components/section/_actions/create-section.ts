import { ProblemDetailsResponseDto } from '~/lib/types';
import {
  createSection,
  CreateSectionDto,
} from '~/services/section/create-section';

type ActionResultDto<TData = unknown> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: ProblemDetailsResponseDto;
    };

export async function CreateSectionAction(
  createSectionDto: CreateSectionDto
): Promise<ActionResultDto> {
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
