import { cn } from '~/lib/utils';

interface SideBarButtonProps {
  openBar: boolean;
  onToggle: () => void;
}

export default function SideBarButton({
  openBar,
  onToggle,
}: SideBarButtonProps) {
  return (
    <div
      className={`relative flex h-12 w-12 cursor-pointer flex-col items-center justify-center transition-colors duration-300`}
      onClick={onToggle}
    >
      <div
        // className={`w-8 h-0.5 bg-gray-800 transition-transform duration-300 ${openBar ? 'rotate-45 translate-y-1' : ''} `}/>
        className={cn(
          'm-1 h-0.5 w-6 bg-foreground transition-transform duration-300',
          openBar && 'translate-y-1 rotate-45'
        )}
      />

      <div
        className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${openBar ? 'hidden opacity-0' : 'block opacity-100'}m-1`}
      />

      <div
        className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${openBar ? '-translate-y-2 -rotate-45' : ''} m-1`}
      />
    </div>
  );
}
