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
import Image from 'next/image';

const queryClient = new QueryClient();

export function CreateUserFormContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Card className="relative w-full max-w-sm pt-20">
      <div className="absolute left-1/2 top-0 mb-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent p-6">
          <div className="flex h-32 w-32 items-center justify-center">
            <picture>
              <source
                media="(prefers-color-scheme: light)"
                srcSet="/img/short-v-logo-default-no-bg.png"
              />
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="/img/short-v-logo-white-no-bg.png"
              />
              <Image
                src="/img/short-v-logo-default-bg.png"
                alt="Descripción de la imagen"
                layout="responsive"
                width={700}
                height={500}
              />
            </picture>
          </div>
        </div>
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
