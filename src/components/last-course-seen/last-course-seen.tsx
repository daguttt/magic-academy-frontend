import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import { CirclePlay } from 'lucide-react';

export default function LastCourseLetter() {
  return (
    <Card className="group w-52 overflow-hidden rounded-b-lg border border-gray-200 shadow-lg">
      <CardHeader className="relative p-0">
        {/* TODO: Change this for a Link */}
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMNMx79cUuHHE-VQnycTJN5MfR7xaZ7hj6g&s"
            alt="Profile Pic"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 group-hover:bg-primary/30"></div>
          <CirclePlay className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-80"/>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-xs text-gray-600">Class 1 of 20</p>
        <CardTitle className="text-lg font-semibold">Title class</CardTitle>
        <p className="text-sm text-gray-500">Title course</p>
      </CardContent>
    </Card>
  );
}