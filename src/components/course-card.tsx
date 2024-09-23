'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'; // Cambia aquí

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

  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <Card
      className={cn('min-w-56', className)}
      style={{ backgroundColor: '#05445e' }}
    >
      <CardHeader className="relative p-0">
        <picture className="overflow-hidden rounded-t-lg rounded-tl-lg">
          <img
            src={finalThumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 p-2 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Button className="mx-auto w-3/4" onClick={handleClick}>
              Ir al curso <span className="ml-2">➡️</span>
            </Button>
          </div>
        </picture>
      </CardHeader>
      <CardContent className="pt-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{instructorName}</CardDescription>
        <CardDescription>{new Date(date).toLocaleDateString()}</CardDescription>
      </CardContent>
    </Card>
  );
}
