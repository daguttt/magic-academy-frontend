import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="grid min-h-screen justify-items-center gap-2 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
