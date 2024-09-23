interface IconWithTooltipProps {
  icon: React.ReactNode;
  tooltipText: string;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  icon,
  tooltipText,
}) => {
  return (
    <>
      <span className="group relative flex items-center p-3">
        {icon}
        <div className="pointer-events-none absolute top-1/2 ml-2 w-max -translate-y-1/2 translate-x-8 transform rounded bg-black p-1 px-3 py-1.5 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-x-16 group-hover:opacity-100">
          {tooltipText}
        </div>
      </span>
    </>
  );
};

export default IconWithTooltip;
