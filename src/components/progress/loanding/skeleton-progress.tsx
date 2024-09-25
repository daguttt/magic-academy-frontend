import { History } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';

export default function SkeletonProgress() {
  return (
    <Card className="m-5 rounded-lg p-1 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex text-2xl font-bold text-gray-400">
          <History className="m-auto mr-1" size={35} />
          <div className="m-auto h-6 w-1/2 rounded bg-gray-300"></div>
          <div className="ml-3 flex w-full justify-end">
            <Button className="rounded bg-gray-300 p-2" asChild />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-2">
        <Progress value={0} className="bg-gray-300 mb-3" />
        <p className="h-4 w-1/4 rounded bg-gray-300 pt-3"></p>
      </CardContent>
    </Card>
  );
}
