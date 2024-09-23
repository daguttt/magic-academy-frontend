'use client';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { LogoutButton } from './log-out-button';

interface NavbarUserAvatarMenuProps {
  userAvatarUrl: string;
  userName: string;
}

export function NavbarUserAvatarMenu({
  userAvatarUrl,
  userName,
}: NavbarUserAvatarMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="overflow-hidden rounded-full">
          <AvatarImage src={userAvatarUrl} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LogoutButton>Cerrar sesión</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
