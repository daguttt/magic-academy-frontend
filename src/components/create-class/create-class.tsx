'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface CreateClassButtonProps {
  className?: string;
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
      Crear Curso
    </Button>
  );
};
