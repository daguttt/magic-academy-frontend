import React from 'react';
import { getCourseSections } from '~/services/section/get-course-sections';
import { CourseSectionItems } from './course-section-items';

// const courseSectionsData = [
//   {
//     id: 1,
//     name: 'Css grid',
//     course: {
//       id: 1,
//       name: 'Aprende css desde cero',
//       description: 'Esto es una descripción de CSS',
//       thumbnail_url: 'Oelo',
//       slug: 'Oelo',
//       published_at: '2024-09-15T04:19:44.000Z',
//       users: [],
//     },
//   },
//   {
//     id: 2,
//     name: 'Css flex',
//     course: {
//       id: 1,
//       name: 'Aprende css desde cero',
//       description: 'Esto es una descripción de CSS',
//       thumbnail_url: 'Oelo',
//       slug: 'Oelo',
//       published_at: '2024-09-15T04:19:44.000Z',
//       users: [],
//     },
//   },
// ];

interface CourseSectionsProps {
  courseId: number;
}

export default async function CourseSections({
  courseId,
}: CourseSectionsProps) {
  const { successRes, failureRes } = await getCourseSections(courseId);

  if (failureRes) return <p>Error: {failureRes.detail}</p>;

  // Pass fetched sections as prop to CourseSectionItems (client component)
  // If seccion is added revalidate the /courses/[id] page
  return <CourseSectionItems sections={successRes.data} />;
}
