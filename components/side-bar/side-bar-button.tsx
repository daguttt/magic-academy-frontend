import React from 'react';

interface SideBarButtonProps {
  openBar: boolean;
  onToggle: () => void;
}

export default function SideBarButton({ openBar, onToggle }: SideBarButtonProps) {
  return (
    <div
      className={`flex items-center justify-center w-16 h-16 cursor-pointer border border-gray-600 ${openBar ? 'bg-gray-300' : 'bg-white'} transition-colors duration-300`}
      onClick={onToggle}
    >
      <div
        className={`relative w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${openBar ? 'rotate-45 translate-y-2' : ''}`}
      />
      <div
        className={`relative w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${openBar ? 'opacity-0' : 'opacity-100'}`}
      />
      <div
        className={`relative w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${openBar ? '-rotate-45 -translate-y-2' : ''}`}
      />
    </div>
  );
}

