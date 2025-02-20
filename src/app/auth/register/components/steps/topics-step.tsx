'use client';

import { RegisterFormUseFormReturn } from '../register-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { TopicsList } from '~/components/topics';
import { Button } from '~/components/ui/button';

export function TopicsStep({
  control,
  handlePreviousStep,
}: {
  control: RegisterFormUseFormReturn['control'];
  handlePreviousStep: () => void;
}) {
  return (
    <div>
      <FormField
        control={control}
        name="topicIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Temas</FormLabel>
            <FormControl>
              <TopicsList value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" onClick={handlePreviousStep} className="mb-2 mt-2">
        Anterior
      </Button>
    </div>
  );
}
