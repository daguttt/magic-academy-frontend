'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { registerAction } from '~/app/auth/_actions/register-actions';
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
import { useRouter } from 'next/navigation';
import { RegisterDto } from '~/services/auth/register';
import { TopicsList } from '~/components/topics';

// Esquema de validación para el registro de usuario
const registerFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'El nombre debe tener al menos 5 caracteres.' })
    .max(100, { message: 'El nombre debe tener menos de 100 caracteres.' }),
  email: z
    .string()
    .email({ message: 'Ingresa un correo válido.' })
    .min(6, { message: 'El correo debe tener al menos 6 caracteres.' })
    .max(254, { message: 'El correo debe tener menos de 254 caracteres.' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    .max(100, { message: 'La contraseña debe tener menos de 100 caracteres.' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
    }),
  topicIds: z
    .array(z.number())
    .min(1, { message: 'Selecciona al menos un tema.' }),
});

export function RegisterForm() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // Obtener el token desde la URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const tokenParam = search ? search.substring(1) : null;
      setToken(tokenParam);
    }
  }, []);

  const [step, setStep] = useState(1);

  const returnedPropsUseForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      topicIds: [],
    },
  });
  const { errors } = returnedPropsUseForm.formState;

  const mutation = useMutation({
    mutationFn: (registerDto: RegisterDto) => registerAction(registerDto),
    onSuccess: (actionResult) => {
      if (!actionResult.success) {
        toast.error('Registro exit');
        toast.error(actionResult.error.detail);
        return;
      }
      toast.success('Usuario registrado con éxito');
      router.push('/auth/login');
    },
    onError: (unexpectedError) => {
      const errorMessage =
        unexpectedError?.message || 'Error inesperado al registrar el usuario';
      toast.error(errorMessage);
      console.error(errorMessage);
    },
  });

  const handleRegister = async (values: z.infer<typeof registerFormSchema>) => {
    if (token) {
      const registerDto: RegisterDto = {
        ...values,
        token: token || '',
      };
      return mutation.mutate(registerDto);
    }
    return mutation.mutate(values);
  };

  const handleNextStep = async () => {
    const isValid = await returnedPropsUseForm.trigger([
      'name',
      'email',
      'password',
    ]);
    // console.log('Errores:', returnedPropsUseForm.formState.errors);
    if (isValid) {
      setStep((prev) => prev + 1); // Solo avanza si es válido
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Form {...returnedPropsUseForm}>
      <form
        className="space-y-4"
        onSubmit={returnedPropsUseForm.handleSubmit(handleRegister)}
      >
        {/* Step 1: Nombre, Correo, Contraseña */}
        {step === 1 && (
          <div>
            <FormField
              control={returnedPropsUseForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre completo"
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

            <FormField
              control={returnedPropsUseForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu-correo@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage>{errors.email.message}</FormMessage>
                  )}
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
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button type="button" onClick={handleNextStep} className="mt-4">
              Siguiente
            </Button>
          </div>
        )}

        {/* Step 2: Temas */}
        {step === 2 && (
          <div>
            <FormField
              control={returnedPropsUseForm.control}
              name="topicIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temas</FormLabel>
                  <FormControl>
                    <TopicsList value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={handlePreviousStep}
              className="mb-2 mt-2"
            >
              Anterior
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? 'Registrando usuario...'
                : 'Registrar usuario'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
