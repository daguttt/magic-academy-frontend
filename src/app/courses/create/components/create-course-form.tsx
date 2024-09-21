'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { TopicsListCourse } from './course-topics';
import { useState } from 'react';
import { createCourseAction } from '../../_actions/create-course-action';
import { useMutation } from '@tanstack/react-query';

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const createCourseFormSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre del curso debe tener al menos 2 caracteres.',
  }),
  description: z.string().max(1000).optional(),
  thumbnail: z.instanceof(File).optional(),
  slug: z.string().min(2).max(1000),
  published_at: z.string().optional(),
  topic: z
    .array(z.number())
    .min(1, { message: 'Debes proporcionar al menos un tema.' }),
});

type CreateCourseFormSchema = z.infer<typeof createCourseFormSchema>;

export function CreateCourseForm() {
  const form = useForm<CreateCourseFormSchema>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: '',
      description: '',
      thumbnail: undefined,
      slug: '',
      published_at: getCurrentDate(),
      topic: [],
    },
  });

  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await createCourseAction(formData);
    },
    onMutate: () => {
      setLoading(true); // Muestra el mensaje de carga al iniciar la mutación
    },
    onSuccess: () => {
      setSuccessMessage('Curso creado exitosamente!');
      form.reset(); // Opcional: Resetea el formulario después de crear el curso
    },
    onSettled: () => {
      setLoading(false); // Oculta el mensaje de carga cuando la mutación se completa
    },
    onError: (error) => {
      console.error('Error al crear el curso:', error);
      setLoading(false); // Asegúrate de ocultar el loader si hay un error
    },
  });

  const onCreateCourse = async (values: CreateCourseFormSchema) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description || '');
    formData.append('slug', values.slug);
    formData.append('published_at', values.published_at || '');
    selectedTopics.forEach((topic) => {
      formData.append('topic', topic.toString());
    });
    if (values.thumbnail) {
      formData.append('thumbnail', values.thumbnail);
    }
    mutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onCreateCourse)}
        className="mx-auto max-w-xl space-y-8 p-4"
      >
        {/* Campo Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del curso</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Descripción */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe el curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Thumbnail */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subir Miniatura</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    field.onChange(files && files.length > 0 ? files[0] : null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug para el curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Fecha de Publicación */}
        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de publicación (Opcional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} min={getCurrentDate()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Temas */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema(s)</FormLabel>
              <TopicsListCourse
                onChange={(selected) => {
                  setSelectedTopics(selected);
                  field.onChange(selected);
                }}
                value={selectedTopics}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de Envío */}
        <Button type="submit" className="w-full bg-blue-500 text-white">
          Crear
        </Button>

        {/* Mensaje de carga */}
        {loading && (
          <div className="mt-4 text-blue-500">Creando curso...</div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mt-4 text-green-500">{successMessage}</div>
        )}
      </form>
    </Form>
  );
}
