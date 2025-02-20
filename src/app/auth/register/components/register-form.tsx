'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Form } from '~/components/ui/form';
import { RegisterDto } from '~/services/auth/register';
import { registerAction } from '~/app/auth/_actions/register-actions';

import { TopicsStep } from './steps/topics-step';
import { PersonalInfoStep } from './steps/personal-info-step';
import { Button } from '~/components/ui/button';

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

export type RegisterFormUseFormReturn = UseFormReturn<
  z.infer<typeof registerFormSchema>
>;

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
  const topicIdsState = returnedPropsUseForm.getFieldState('topicIds');

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
    const isPersonalInfoValid = await returnedPropsUseForm.trigger([
      'name',
      'email',
      'password',
    ]);
    if (isPersonalInfoValid) setStep((prev) => prev + 1);
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
        {step === 1 && (
          <PersonalInfoStep
            control={returnedPropsUseForm.control}
            errors={errors}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <>
            <TopicsStep
              control={returnedPropsUseForm.control}
              handlePreviousStep={handlePreviousStep}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={!topicIdsState.isTouched || mutation.isPending}
            >
              {mutation.isPending
                ? 'Registrando usuario...'
                : 'Registrar usuario'}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
