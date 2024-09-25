'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';
import Image from 'next/image';

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
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <Image
        src={finalThumbnailUrl}
        alt={title}
        width={200}
        height={150}
        className={`h-40 w-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-50' : 'opacity-100'} rounded-lg border-2 border-[hsl(var(--border))]`}
      />

      <div className="mt-2">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h3>
        <p className="text-[hsl(var(--muted-foreground))]">
          Instructor: {instructorName}
        </p>
        <p className="text-[hsl(var(--muted-foreground))]">
          {date ? new Date(date).toLocaleDateString() : 'Fecha no disponible'}
        </p>
        <span className="rounded bg-[hsl(var(--destructive-foreground))] bg-cyan-500 px-2 text-sm text-[hsl(var(--destructive))] text-slate-950">
          Gratis
        </span>
      </div>

      {hovered && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 transform border-solid border-gray-800">
          <Button
            className="flex items-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
            onClick={handleClick}
          >
            Ir al curso
            <span className="ml-1 text-lg">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}
