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

import { LoginForm } from './login-form';
import Link from 'next/link';

const queryClient = new QueryClient();

export function LoginFormContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Ingreso a la plataforma</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para entrar a Magic Academy
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pb-0">
          <LoginForm />
        </CardContent>
        <CardFooter className="grid gap-2">
          <div className="mt-4 text-center text-sm">
            ¿No tienees cuenta aún?{' '}
            <Link href="/auth/register" className="underline">
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </QueryClientProvider>
  );
}
