import React from 'react';

interface IconWithTooltipProps {
  icon: React.ReactNode;
  tooltipText: string;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({ icon, tooltipText }) => {
  return (
    <>
    <span className="relative flex items-center group p-3">
      {icon}
      <div className="absolute ml-2 top-1/2 transform -translate-y-1/2 translate-x-8 w-max p-1 text-sm text-white bg-black rounded opacity-0 group-hover:translate-x-16 group-hover:opacity-100 transition-all duration-300 pointer-events-none px-3 py-1.5">
        {tooltipText}
      </div>
    </span>
    </>
  );
};

export default IconWithTooltip;
