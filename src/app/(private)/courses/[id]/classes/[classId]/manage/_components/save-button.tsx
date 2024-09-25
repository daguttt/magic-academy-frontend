'use client'
import React from "react";

const SaveButton = ({ label }: { label: string }) => {
  return (
    <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors">
      {label}
    </button>
  );
};

export default SaveButton;
