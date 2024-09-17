import Image from 'next/image';

import { Avatar, 
        AvatarFallback, 
        AvatarImage 
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"


export default function NavBar() {
  return (
    <nav className='bg-gray-800'>
        <div className='container flex justify-between flex-row'>
            <div>
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </div>

            <div className='flex align-middle bg-red-600'>
                <Input className='p-5 bg-white text-black' type='text' placeholder='¿Que quieres buscar?'/>
            </div>

            <div className='flex'>
                <p className=''>Name</p>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Hola</AvatarFallback>
                </Avatar>
            </div>
        </div>
    </nav>
  );
};
