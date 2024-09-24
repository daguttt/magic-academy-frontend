import ProgressClass from '~/components/progress/progress-class';
import { Progress } from '~/components/ui/progress';

export default function ProgressPage() {
  return (
    <div className='p-5 container'>
      <h1 className="text-2xl font-bold mb-4">Progreso del Curso</h1>
      <ProgressClass/>
    </div>
  );
}
