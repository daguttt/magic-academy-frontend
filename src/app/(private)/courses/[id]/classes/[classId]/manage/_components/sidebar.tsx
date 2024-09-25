'use client';
import React from 'react';

interface SidebarProps {
  setView: (view: string) => void;
  view: string;
}

export const Sidebar = ({ setView, view }: SidebarProps) => {
  return (
    <aside className="h-screen w-64 bg-secondary p-4 text-secondary-foreground">
      <ul className="space-y-4">
        <li
          onClick={() => setView('video')}
          className={`cursor-pointer rounded-lg p-2 ${
            view === 'video'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          Videos
        </li>
        <li
          onClick={() => setView('article')}
          className={`cursor-pointer rounded-lg p-2 ${
            view === 'article'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          Artículos
        </li>
      </ul>
    </aside>
  );
};
