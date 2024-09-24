// ~/components/create-class/create-class.tsx
'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button'; // Asegúrate de que esta ruta sea correcta

interface CreateClassButtonProps {
  className?: string; // Aceptar className como prop
}

export const CreateClassButton: React.FC<CreateClassButtonProps> = ({
  className,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/courses/create');
  };

  return (
    <Button
      className={`bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground ${className} ml-8`} // Usa las variables CSS para el color
      onClick={handleClick}
    >
      Crear Clase
    </Button>
  );
};
