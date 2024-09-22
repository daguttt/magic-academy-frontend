'use client';

import { useMutation } from '@tanstack/react-query';
import { logoutAction } from '~/app/actions';
import { Button } from '~/components/ui/button';

export function LogoutButton() {
  const mutation = useMutation({ mutationFn: logoutAction });
  return (
    <Button disabled={mutation.isPending} onClick={() => mutation.mutate()}>
      Cerrar sesión
    </Button>
  );
}
