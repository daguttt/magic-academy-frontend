'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { CourseSectionData } from '~/services/section/get-course-sections';

interface CourseSectionItemsProps {
  children: React.ReactNode[];
}

export function CourseSectionItemsContainer({
  children,
}: CourseSectionItemsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {children}
    </Accordion>
  );
}

interface CourseSectionItemProps {
  children: React.ReactNode;
  section: CourseSectionData;
}

export function CourseSectionItem({
  section,
  children,
}: CourseSectionItemProps) {
  return (
    <AccordionItem key={section.sectionId} value={`item-${section.sectionId}`}>
      <AccordionTrigger>{section.sectionName}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
