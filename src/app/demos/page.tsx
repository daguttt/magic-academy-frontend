import NavBar from '@/components/nav-bar/nav-bar';
import SideBar from '../../components/side-bar/side-bar';
import { Button } from '@/components/ui/button';


export default function Home() {
  return (
    <main>
      <header>
        <NavBar/>
      </header>
      <SideBar />
      <Button>Click me</Button>
      <h1 className='bg-red-100 float-end text-white'>Hello World</h1>
    </main>
  );
}
