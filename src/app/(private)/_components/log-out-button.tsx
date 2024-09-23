'use client';

import { useMutation } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';
import { logoutAction } from '../_actions/logout';

export function LogoutButton() {
  const mutation = useMutation({ mutationFn: logoutAction });
  return (
    <Button disabled={mutation.isPending} onClick={() => mutation.mutate()}>
      Cerrar sesión
    </Button>
  );
}
