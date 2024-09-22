// src/app/courses/[id]/page.tsx
'use client';

import { useState } from 'react';
import CourseHeader from './components/CourseHeader';
import CourseSections from './components/CourseSections';
import CourseForum from './components/CourseForum';
import CourseComments from './components/CourseComments';

export default function CourseDetail() {
  const [showSections, setShowSections] = useState(false);
  const [showForum, setShowForum] = useState(false);

  return (
    <div className="container mx-auto px-4">
      {/* Course header */}
      <CourseHeader />

      {/* Button to continue the course */}
      <div className="my-4">
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
          Continue Course
        </button>
      </div>

      {/* Toggle buttons for Sections and Forum */}
      <div className="my-8 space-x-4">
        {/* Sections Button */}
        <button
          className="rounded-lg bg-gray-700 px-4 py-2 text-white"
          onClick={() => setShowSections(!showSections)}
        >
          {showSections ? 'Hide Sections' : 'Show Sections'}
        </button>

        {/* Forum Button */}
        <button
          className="rounded-lg bg-gray-700 px-4 py-2 text-white"
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
