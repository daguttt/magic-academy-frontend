import { Suspense } from 'react';
import ProgressClass from '../_components/progress/progress-class';
import SkeletonProgress from '../_components/progress/loanding/skeleton-progress';

export default function ProgressPage() {
  return (
    <div className="container p-5">
      <h1 className="mb-4 text-2xl font-bold">Progreso del Curso</h1>
      <Suspense fallback={<SkeletonProgress />}>
        <ProgressClass />
      </Suspense>
    </div>
  );
}
