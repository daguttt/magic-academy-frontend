import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateSectionAction } from './_actions/create-section';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const createSectionSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre de la sección debe tener al menos 3 caracteres.',
  }),
});

export function CreateSectionSchema() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const methods = useForm<z.infer<typeof createSectionSchema>>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      name: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: CreateSectionAction,
    onSuccess: (actionResult) => {
      if (!actionResult.success) {
        toast.error(actionResult.error.detail);
        return;
      }
      toast.success('Sección creada con éxito');
      setIsFormVisible(false);
    },
    onError: (unexpectedError) => {
      const errorMessage =
        unexpectedError?.message || 'Error inesperado al crear la sección';
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

  const handlerCreateSection = (
    values: z.infer<typeof createSectionSchema>
  ) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Button onClick={() => setIsFormVisible(true)}>Crear Sección</Button>
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </button>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handlerCreateSection)}
              >
                <FormField
                  control={methods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Sección</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre de la Sección"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      {errors.name && (
                        <FormMessage>{errors.name.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation ? 'Creando sección...' : 'Crear sección'}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
}
