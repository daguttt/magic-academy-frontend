'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Ingresa un correo valido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(100, { message: 'La contraseña debe tener menos de 100 caracteres' }),
});

export default function LoginForm() {
  const returnedPropsUseForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors } = returnedPropsUseForm.formState;

  const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Ingreso a la plataforma</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para entrar a Magic Academy
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 pb-0">
        <Form {...returnedPropsUseForm}>
          <form
            className="space-y-4"
            onSubmit={returnedPropsUseForm.handleSubmit(handleLogin)}
          >
            <FormField
              control={returnedPropsUseForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu-correo@gmail.com"
                      {...field}
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormDescription className={cn(errors.email && 'hidden')}>
                    El correo con el cual te registraste a la plataforma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={returnedPropsUseForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu contraseña..."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className={cn(errors.password && 'hidden')}>
                    Contraseña con la que te registraste a la plataforma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </form>
        </Form>
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
  );
}
