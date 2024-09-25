import Link from 'next/link';

import { History } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Button } from '~/components/ui/button';
import { getStudentCourseProgresses } from '~/services/classes/course-progress/course-progress-user';
import { capitalizeFirstLetter } from '~/lib/utils';

export default async function ProgressClass() {
  const { successRes, failureRes } = await getStudentCourseProgresses();

  if (failureRes) return <p className="text-red-500">{failureRes.detail}</p>;

  const courses = successRes.data;

  if (courses.length === 0) return <p>Todavía no te has inscrito a ningún curso</p>;

  return (
    <div className="grid gap-6">
      {courses.map((course) => (
        <Card key={course.courseId} className="rounded-lg p-1 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex text-2xl font-bold text-blue-600">
              <History className="m-auto mr-1" size={35} />
              <div className="m-auto">
                {capitalizeFirstLetter(course.courseName)}
              </div>
              <div className="ml-3 flex w-full justify-end">
                <Button asChild>
                  <Link href={`/courses/${course.courseId}`}>ir a clase</Link>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <Progress
              value={course.progress * 100}
              aria-label=""
              className=""
            />
            <p className="pt-3">
              {(course.progress * 100).toFixed(0)}% completado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
