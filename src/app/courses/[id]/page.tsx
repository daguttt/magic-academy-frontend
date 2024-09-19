// src/app/courses/[id]/page.tsx
'use client';

import { useState } from 'react';
import CourseHeader from './components/CourseHeader';
import CourseSections from './components/CourseSections';
import CourseForum from './components/CourseForum';
import CourseComments from './components/CourseComments';

interface CourseDetailProps {
  params: {
    id: string;
  };
}

export default function CourseDetail({ params }: CourseDetailProps) {
  const [showSections, setShowSections] = useState(false);
  const [showForum, setShowForum] = useState(false);

  return (
    <div className="container mx-auto px-4">
      {/* Course header */}
      <CourseHeader />

      {/* Button to continue the course */}
      <div className="my-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Continue Course
        </button>
      </div>

      {/* Toggle buttons for Sections and Forum */}
      <div className="my-8 space-x-4">
        {/* Sections Button */}
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg"
          onClick={() => setShowSections(!showSections)}
        >
          {showSections ? 'Hide Sections' : 'Show Sections'}
        </button>

        {/* Forum Button */}
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg"
          onClick={() => setShowForum(!showForum)}
        >
          {showForum ? 'Hide Forum' : 'Show Forum'}
        </button>
      </div>

      {/* Display Sections based on state */}
      {showSections && (
        <div className="my-8">
          <CourseSections />
        </div>
      )}

      {/* Display Forum based on state */}
      {showForum && (
        <div className="my-8">
          <CourseForum />
        </div>
      )}

      {/* Comments section */}
      <div className="my-8">
        <CourseComments />
      </div>
    </div>
  );
}
