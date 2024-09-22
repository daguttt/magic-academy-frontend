'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { CourseSectionData } from '~/services/section/get-course-sections';

interface CourseSectionItemsProps {
  sections: CourseSectionData[];
}

export function CourseSectionItems({ sections }: CourseSectionItemsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section) => (
        <AccordionItem
          key={section.sectionId}
          value={`item-${section.sectionId}`}
        >
          <AccordionTrigger>{section.sectionName}</AccordionTrigger>
          <AccordionContent>Here goes the classes</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
