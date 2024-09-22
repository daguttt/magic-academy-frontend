'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

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

// TODO: Replace this by the service interface
interface SectionClassData {
  id: number;
  classNumber: number;
  name: string;
}

// 'use client'
interface SectionClassItemProps {
  sectionClass: SectionClassData;
}
export function SectionClassItem({ sectionClass }: SectionClassItemProps) {
  return (
    <AccordionItem key={sectionClass.id} value={`item-${sectionClass.id}`}>
      <AccordionTrigger>
        Class {sectionClass.classNumber}: {sectionClass.name}
      </AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  );
}
