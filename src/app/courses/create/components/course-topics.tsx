'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiResponseDto } from '~/lib/types';

interface Topic {
  id: number;
  name: string;
}

interface TopicsListProps {
  onChange: (selected: number[]) => void;
  value: number[];
}

// Definición del componente
export function TopicsListCourse({ onChange, value }: TopicsListProps) {
  const {
    data: apiResponseDto,
    error,
    isLoading,
  } = useQuery<ApiResponseDto<Topic[]>, Error>({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await fetch('/api/topics');
      return await response.json();
    },
  });

  if (isLoading) return <div>Cargando temas...</div>;
  if (error) return <div>Error al cargar los temas</div>;

  if (apiResponseDto && apiResponseDto.failureRes)
    return <div>Error: {apiResponseDto.failureRes.detail}</div>;

  const topics = apiResponseDto?.successRes.data || [];

  const handleChipClick = (id: number) => {
    const newSelected = value.includes(id)
      ? value.filter((topicId) => topicId !== id)
      : [...value, id];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <div
          key={topic.id}
          onClick={() => handleChipClick(topic.id)}
          className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm font-medium ${value.includes(topic.id) ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
}
