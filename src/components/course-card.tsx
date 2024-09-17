import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '~/components/ui/card';
import { cn } from '~/lib/utils';

interface CourseCardProps {
  className?: string;
}

export function CourseCard({ className }: CourseCardProps) {
  return (
    <Card className={cn('min-w-56', className)}>
      <CardHeader className="p-0">
        <picture className="overflow-hidden rounded-t-lg rounded-tl-lg">
          <img
            src="https://picsum.photos/200/150"
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </picture>
      </CardHeader>
      <CardContent className="pt-6">
        <CardTitle>Course Title</CardTitle>
        <CardDescription>Instructor Name</CardDescription>
      </CardContent>
    </Card>
  );
}
