'use client';
import React from 'react';

const SaveButton = ({ label }: { label: string }) => {
  return (
    <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary">
      {label}
    </button>
  );
};

export default SaveButton;
