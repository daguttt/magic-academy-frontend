import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Input } from '~/components/ui/input';
import SideBarButton from '~/components/side-bar/side-bar-button';
import SideBar from '~/components/side-bar/side-bar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Search } from 'lucide-react';

interface NavBarProp {
  openBar: boolean;
  onMenuToggle: () => void;
}

export default function NavBar({ openBar, onMenuToggle }: NavBarProp) {
  return (
    <>
      <div>
        <SideBar openBar={openBar} />
      </div>

      <nav className="content fixed left-0 top-0 z-50 w-full border border-b-foreground bg-background">
        <div className="flex h-16 items-center justify-between">
          <div className="absolute left-0 border border-r-foreground p-1.5 pl-1.5">
            <SideBarButton openBar={openBar} onToggle={onMenuToggle} />
          </div>

          <div className="pl-20">
            <div className="h-8 w-52 bg-white" />
            {/* <Image src="/logo.png" alt="Logo" width={100} height={100} /> */}
          </div>

          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              type="search"
              placeholder="¿Qué quieres buscar?"
            />
          </div>

          <div className="relative flex items-center justify-end pr-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="overflow-hidden rounded-full">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Imagen</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>LogOut</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
