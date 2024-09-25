'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { SectionClassesData } from '~/services/classes/get-section-classes';

interface SectionClassItemsContainerProps {
  children: React.ReactNode[];
}
export function SectionClassItemsContainer({
  children,
}: SectionClassItemsContainerProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {children}
    </Accordion>
  );
}

interface SectionClassItemProps {
  classItem: SectionClassesData;
  classNumber: number;
}
export function SectionClassItem({
  classItem: { classId, classTitle, classContent, classUrl },
  classNumber,
}: SectionClassItemProps) {
  return (
    <AccordionItem value={`item-${classId}`}>
      <AccordionTrigger>
        Class {classNumber}: {classTitle}
      </AccordionTrigger>
      <AccordionContent className="p-8">
        <div className="flex gap-4">
          <p>Contiene:</p>
          <h1>{classTitle}</h1>
          <div className="flex gap-2">
            {classUrl ? <span>Video</span> : null}
            {classContent ? <span>Articulo</span> : null}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
