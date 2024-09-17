'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { cn } from '~/lib/utils';
import { type LoginDto } from '~/services/auth/login';
import { loginAction } from '~/app/actions';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Ingresa un correo valido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(100, { message: 'La contraseña debe tener menos de 100 caracteres' }),
});

export function LoginForm() {
  const returnedPropsUseForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { errors } = returnedPropsUseForm.formState;

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (loginDto: LoginDto) => loginAction(loginDto),
    onSuccess: (actionResult) => {
      if (!actionResult.success) {
        toast.error(actionResult.error.detail);
        return;
      }
      router.push('/home');
    },
    onError: (unexpectedError) => {
      console.error(unexpectedError.message);
    },
  });

  const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    return mutation.mutate(values);
  };

  return (
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
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  );
}
