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
import { CreateClassButton } from '~/app/section-class/components/message';
import { CreateSectionButton } from '~/app/section-class/components/create-section';

interface CourseSectionsProps {
  courseId: number;
  manageable?: boolean;
}

export default async function CourseSections({
  courseId,
  manageable = false,
}: CourseSectionsProps) {
  const { successRes, failureRes } = await getCourseSections(courseId);

  if (failureRes)
    return (
      <div className="grid gap-6">
        <p>Error: {failureRes.detail}</p>
        {manageable && <CreateSectionButton courseId={courseId} />}
      </div>
    );

  const sections = successRes.data;

  return (
    <div className="grid gap-6">
      {manageable && <CreateSectionButton courseId={courseId} />}
      <CourseSectionItemsContainer>
        {sections.map((section) => (
          <CourseSectionItem key={section.sectionId} section={section}>
            <Suspense
              fallback={<p>Cargando clases de {section.sectionName}...</p>}
            >
              <SectionClasses sectionId={section.sectionId} />
              <CreateClassButton sectionId={section.sectionId} />
            </Suspense>
          </CourseSectionItem>
        ))}
      </CourseSectionItemsContainer>
    </div>
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
      {classes.map((classItem, index) => {
        console.log(classItem); // Registra todo el contenido de classItem en la consola

        return (
          <SectionClassItem
            key={classItem.classId}
            classItem={classItem}
            classNumber={index + 1}
          />
        );
      })}
    </SectionClassItemsContainer>
  );
}
