import SideBar from '@/components/side-bar/side-bar';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
      <main>
        <div className="grid justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1>Hello World</h1>
          <Button>Click me</Button>
        </div>
        <SideBar/>
        <h1>Hola</h1>
      </main>
  );
}
