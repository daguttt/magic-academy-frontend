// src/app/courses/[id]/components/CourseSectionsClient.tsx (Client component)
'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

interface CourseSectionsProps {
  courseId: number;
}

const courseSectionsData = [
  {
    id: 1,
    name: 'Css grid',
    course: {
      id: 1,
      name: 'Aprende css desde cero',
      description: 'Esto es una descripción de CSS',
      thumbnail_url: 'Oelo',
      slug: 'Oelo',
      published_at: '2024-09-15T04:19:44.000Z',
      users: [],
    },
  },
  {
    id: 2,
    name: 'Css flex',
    course: {
      id: 1,
      name: 'Aprende css desde cero',
      description: 'Esto es una descripción de CSS',
      thumbnail_url: 'Oelo',
      slug: 'Oelo',
      published_at: '2024-09-15T04:19:44.000Z',
      users: [],
    },
  },
];

export default function CourseSections({ courseId }: CourseSectionsProps) {
  // const { successRes, failureRes } = await getCourseSections(courseId);

  // if (failureRes) return <p>{failureRes.detail}</p>;
  console.log('courseId: ', courseId);
  return (
    <Accordion type="single" collapsible className="w-full">
      {courseSectionsData.map((courseSectionData) => (
        <AccordionItem
          key={courseSectionData.id}
          value={`item-${courseSectionData.id}`}
        >
          <AccordionTrigger>{courseSectionData.name}</AccordionTrigger>
          <AccordionContent>Here goes the classes</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
