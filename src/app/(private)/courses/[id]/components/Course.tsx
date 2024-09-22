'use client';
import React, { Suspense, useState } from 'react';
import CourseHeader from './CourseHeader';
import CourseSections from './CourseSections';
import CourseForum from './CourseForum';
import CourseComments from './CourseComments';
import { Icourse } from '~/services/courses/get-courses';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
// import GetCourseSectionsServer from './CourseSectionsServer';

export interface ICourseData {
  courseData: Icourse;
}

export const Course = ({ courseData }: ICourseData) => {
  const [showSections, setShowSections] = useState(false);
  const [showForum, setShowForum] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<h1>Cargando...</h1>}>
        <CourseHeader courseData={courseData} />
      </Suspense>

      <div className="my-4">
        <Button>Continuar curso</Button>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger
            value="secciones"
            onClick={() => {
              setShowForum(false);
              setShowSections(!showSections);
            }}
          >
            {showSections ? 'Ocultar secciones' : 'Mostrar secciones'}
          </TabsTrigger>
          <TabsTrigger
            value="foro"
            onClick={() => {
              setShowForum(!showForum);
              setShowSections(false);
            }}
          >
            {showForum ? 'Ocultar foro' : 'Mostrar foro'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="secciones">
          {showSections && (
            <div className="my-8">
              {/* <CourseSections>
                <GetCourseSectionsServer courseId={courseData.id} />
              </CourseSections> */}
              <CourseSections courseId={courseData.id} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="foro">
          {showForum && (
            <div className="my-8">
              <CourseForum />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Comments section */}
      <div className="my-8">
        <CourseComments />
      </div>
    </div>
  );
};
