'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';

interface CourseCardProps {
  className?: string;
  title: string;
  instructorName: string;
  date: string;
  thumbnailUrl: string | null;
  courseId: number;
}

export function CourseCard({
  className,
  title,
  instructorName,
  date,
  thumbnailUrl,
  courseId,
}: CourseCardProps) {
  const defaultImage = 'https://picsum.photos/200/150';
  const finalThumbnailUrl = thumbnailUrl || defaultImage;

  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'hsl(var(--background))' }} // Fondo basado en la variable CSS
    >
      {/* Imagen del curso con borde y opacidad en hover */}
      <img
        src={finalThumbnailUrl}
        alt={title}
        className={`h-40 w-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-50' : 'opacity-100'} 
        border-2 border-[hsl(var(--border))] rounded-lg`} // Borde agregado y bordes redondeados
      />

      {/* Información siempre visible debajo de la imagen */}
      <div className="mt-2">
        <h3 className="text-[hsl(var(--foreground))] text-lg font-semibold">{title}</h3>
        <p className="text-[hsl(var(--muted-foreground))]">Instructor: {instructorName}</p>
        <p className="text-[hsl(var(--muted-foreground))]">
          {date ? new Date(date).toLocaleDateString() : 'Fecha no disponible'}
        </p>
        <span className="text-[hsl(var(--destructive))] text-sm bg-[hsl(var(--destructive-foreground))] px-2 rounded">
          Gratis
        </span>
      </div>

      {/* Botón en el centro izquierdo de la imagen */}
      {hovered && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <Button
            className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))] flex items-center"
            onClick={handleClick}
          >
            Ir al curso 
            {/* Flecha minimalista */}
            <span className="ml-1 text-lg">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}
