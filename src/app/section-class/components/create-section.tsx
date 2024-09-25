'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

import { createSectionAction } from '../_actions/create-section-action';

// Esquema de validación para el formulario de crear sección
const createSectionSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre de la sección debe tener al menos 3 caracteres.',
    })
    .max(100, { message: 'El nombre debe tener menos de 100 caracteres.' }),
});


interface CreateSectionButtonProps {
  courseId: number; // Acepta courseId como prop
}

export function CreateSectionButton({ courseId }: CreateSectionButtonProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const methods = useForm<z.infer<typeof createSectionSchema>>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      name: '',
    },
  });

  const { errors } = methods.formState;

  const mutation = useMutation({
    mutationFn: createSectionAction,
    onSuccess: (actionResult) => {
      console.log(actionResult);
      if (!actionResult.success) {
        toast.error('Error al crear la sección');
        toast.error(actionResult.error.detail);
        return;
      }
      toast.success('Sección creada con éxito');
      setIsFormVisible(false); // Oculta el formulario al crear la sección
    },
    onError: (unexpectedError) => {
      const errorMessage =
        unexpectedError?.message || 'Error inesperado al crear la sección';
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

  const handleCreateSection = (values: z.infer<typeof createSectionSchema>) => {
    const createSectionDto = {
      name: values.name,
      course: courseId, // Usar courseId de las props
    };
    mutation.mutate(createSectionDto);
  };

  return (
    <div>
      {/* Botón para mostrar el formulario */}
      <Button onClick={() => setIsFormVisible(true)}>Crear Sección</Button>

      {/* Mostrar formulario si el botón fue presionado */}
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Contenedor del formulario */}
          <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            {/* Botón para cerrar el formulario */}
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </button>
            <Form {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(handleCreateSection)}
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
                  {mutation.isPending ? 'Creando sección...' : 'Crear sección'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
