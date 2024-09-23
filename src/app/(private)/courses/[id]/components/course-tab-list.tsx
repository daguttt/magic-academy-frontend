'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

interface CourseTabListProps {
  tabSectionsComponent: React.ReactNode;
  tabForoComponent: React.ReactNode;
}

export function CourseTabList({
  tabForoComponent,
  tabSectionsComponent,
}: CourseTabListProps) {
  return (
    <Tabs defaultValue="sections" className="w-full">
      <TabsList>
        <TabsTrigger value="sections">Secciones</TabsTrigger>
        <TabsTrigger value="forum">Foro</TabsTrigger>
      </TabsList>
      <TabsContent value="sections">{tabSectionsComponent}</TabsContent>
      <TabsContent value="forum">{tabForoComponent}</TabsContent>
    </Tabs>
  );
}
