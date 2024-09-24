'use client';

import { useMutation } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';
import { logoutAction } from '../_actions/logout';

interface LogoutButtonProps {
  children: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const mutation = useMutation({ mutationFn: logoutAction });
  return (
    <Button disabled={mutation.isPending} onClick={() => mutation.mutate()}>
      {children}
    </Button>
  );
}
