'use client';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { logoutAction } from '../_actions/logout';
import { useMutation } from '@tanstack/react-query';

interface NavbarUserAvatarMenuProps {
  userAvatarUrl: string;
  userName: string;
}

export function NavbarUserAvatarMenu({
  userAvatarUrl,
  userName,
}: NavbarUserAvatarMenuProps) {
  const mutation = useMutation({ mutationFn: logoutAction });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="overflow-hidden rounded-full">
          <AvatarImage src={userAvatarUrl} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => mutation.mutate()}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
