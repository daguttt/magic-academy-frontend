import { useFormState } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { RegisterFormUseFormReturn } from '../register-form';

export function PersonalInfoStep({
  control,
}: {
  control: RegisterFormUseFormReturn['control'];
}) {
  const { errors } = useFormState({ control });
  return (
    <div>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre Completo</FormLabel>
            <FormControl>
              <Input placeholder="Nombre completo" {...field} type="text" />
            </FormControl>
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </FormItem>
        )}
      />

      <FormField
        control={control}
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
            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
          </FormItem>
        )}
      />

      <FormField
        control={control}
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
    </div>
  );
}
