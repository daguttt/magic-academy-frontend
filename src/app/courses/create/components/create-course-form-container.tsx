'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { CreateCourseForm } from './create-course-form';
import Link from 'next/link';

const queryClient = new QueryClient();

export function CreateCourseFormContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Crear un nuevo curso
          </CardTitle>
          <CardDescription>
            Completa el formulario para añadir un nuevo curso a Magic Academy
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pb-0">
          <CreateCourseForm />
        </CardContent>
        <CardFooter className="grid gap-2">
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes un curso?{' '}
            <Link href="/courses" className="underline">
              Ver cursos
            </Link>
          </div>
        </CardFooter>
      </Card>
    </QueryClientProvider>
  );
}
