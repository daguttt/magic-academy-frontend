import React, { Suspense } from 'react';
import { getCourseSections } from '~/services/section/get-course-sections';
import {
  CourseSectionItemsContainer,
  CourseSectionItem,
} from './course-section-items';
import {
  SectionClassItemsContainer,
  SectionClassItem,
} from './section-class-items';
import { getSectionClasses } from '~/services/classes/get-section-classes';

interface CourseSectionsProps {
  courseId: number;
}

export default async function CourseSections({
  courseId,
}: CourseSectionsProps) {
  const { successRes, failureRes } = await getCourseSections(courseId);

  if (failureRes) return <p>Error: {failureRes.detail}</p>;

  const sections = successRes.data;
  // Pass fetched sections as prop to CourseSectionItems (client component)
  // If seccion is added revalidate the /courses/[id] page
  return (
    <CourseSectionItemsContainer>
      {sections.map((section) => (
        <CourseSectionItem key={section.sectionId} section={section}>
          <Suspense
            fallback={<p>Cargando clasess de {section.sectionName}...</p>}
          >
            <SectionClasses sectionId={section.sectionId} />{' '}
          </Suspense>
        </CourseSectionItem>
      ))}
    </CourseSectionItemsContainer>
  );
}

interface SectionClassesProps {
  sectionId: number;
}

async function SectionClasses({ sectionId }: SectionClassesProps) {
  const { successRes, failureRes } = await getSectionClasses(sectionId);

  if (failureRes) return <p>Error: {failureRes.detail}</p>;

  const classes = successRes.data;

  return (
    <SectionClassItemsContainer>
      {classes.map((classItem, index) => (
        <SectionClassItem
          key={classItem.classId}
          classItem={classItem}
          classNumber={index}
        />
      ))}
    </SectionClassItemsContainer>
  );
}
