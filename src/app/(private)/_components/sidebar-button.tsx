import { Menu } from 'lucide-react';

import { Button } from '~/components/ui/button';

export function SidebarButton() {
  return (
    <Button
      variant="outline"
      className="flex aspect-square h-full w-16 cursor-pointer items-center justify-center rounded-none border-b-0 border-l-0 border-r border-t-0 p-0"
    >
      <Menu size={32} />
    </Button>
  );
}
