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
import { CreateClassAction } from '../_actions/create-class-actions';

// Esquema de validación para el formulario de crear clase
const createClassSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'El título de la clase es requerido.' })
    .max(100, { message: 'El título debe tener menos de 100 caracteres.' }),
});

export function CreateClassButton() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const returnedPropsUseForm = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      title: '',
    },
  });

  const { errors } = returnedPropsUseForm.formState;

  const mutation = useMutation({
    mutationFn: CreateClassAction,
    onSuccess: (actionResult) => {
      console.log(actionResult);
      if (!actionResult.success) {
        toast.error('Error al crear la clase');
        toast.error(actionResult.error.detail);
        return;
      }
      toast.success('Clase creada con éxito');
      setIsFormVisible(false); // Oculta el formulario al crear la clase
    },
    onError: (unexpectedError) => {
      const errorMessage =
        unexpectedError?.message || 'Error inesperado al crear la clase';
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

  const handleCreateClass = (values: z.infer<typeof createClassSchema>) => {
    const createClassDto = {
      title: values.title,
      courseSectionId: 3, //Cambiar seccion quemado por el prop que se requiere en cada cart
    };
    mutation.mutate(createClassDto);
  };

  return (
    <div>
      {/* Botón para mostrar el formulario */}
      <Button onClick={() => setIsFormVisible(true)}>Crear Clase</Button>

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
            <Form {...returnedPropsUseForm}>
              <form
                className="space-y-4"
                onSubmit={returnedPropsUseForm.handleSubmit(handleCreateClass)}
              >
                <FormField
                  control={returnedPropsUseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Clase</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Título de la clase"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      {errors.title && (
                        <FormMessage>{errors.title.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Creando clase...' : 'Crear clase'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
