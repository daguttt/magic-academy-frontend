import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import SideBarButton from '../side-bar/side-bar-button';
import SideBar from '../side-bar/side-bar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import { Search } from 'lucide-react';
  

interface NavBarProp{
    openBar: boolean;
    onMenuToggle: () => void;
}

export default function NavBar({openBar, onMenuToggle} : NavBarProp) {

    return (
        <>
            <div>
                <SideBar openBar={openBar} />
            </div>

            <nav className="fixed top-0 left-0 w-full content bg-gray-900 z-50">
                <div className="flex justify-between h-16 items-center">

                    <div className="absolute left-0 p-1.5  border border-b-gray-700 border-r-gray-700">
                        <SideBarButton openBar={openBar} onToggle={onMenuToggle} />
                    </div>

                    <div className="pl-20">
                        <div className='w-52 h-8 bg-white'/>
                        {/* <Image src="/logo.png" alt="Logo" width={100} height={100} /> */}
                    </div>

                    <div className="relative w-80">
                    <Search className="absolute left-1.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            className="p-3 pl-6 bg-gray-900 text-white rounded-sm border border-gray-500 shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                            type="search"
                            placeholder="¿Qué quieres buscar?"
                        />
                    </div>
        
                    <div className="flex justify-end items-center pr-20 relative">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='overflow-hidden rounded-full'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>Imagen</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
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
