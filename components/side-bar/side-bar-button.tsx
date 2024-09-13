import React from 'react';

interface SideBarButtonProps {
  openBar: boolean;
  onToggle: () => void;
}

export default function SideBarButton({ openBar, onToggle }: SideBarButtonProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center  w-12 h-12 cursor-pointer ${openBar ? 'bg-gray-200' : 'bg-white'} transition-colors duration-300`}
      onClick={onToggle}>
        <div
          className={`w-8 h-0.5 bg-gray-800 transition-transform duration-300 ${openBar ? 'rotate-45 translate-y-1' : ''} m-1`}/>

        <div
          className={`w-8 h-0.5 bg-gray-800 transition-all duration-300 ${openBar ? 'opacity-0 hidden' : 'opacity-100 block'}m-1`}/>

        <div
          className={`w-8 h-0.5 bg-gray-800 transition-transform duration-300 ${openBar ? '-rotate-45 -translate-y-2' : ''} m-1`}/>
    </div>
  );
}

