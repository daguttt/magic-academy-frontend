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

import { RegisterForm } from './register-form'; // Asegúrate de que la ruta sea correcta
import Link from 'next/link';

const queryClient = new QueryClient();

export function CreateUserFormContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Registro en la plataforma</CardTitle>
          <CardDescription>
            Completa el formulario para crear una cuenta en Magic Academy
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pb-0">
          <RegisterForm />
        </CardContent>
        <CardFooter className="grid gap-2">
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="underline">
              Inicia sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </QueryClientProvider>
  );
}
