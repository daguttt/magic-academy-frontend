import type { Metadata } from 'next';
import { LoginFormContainer } from './components/login-form-container';

export const metadata: Metadata = {
  title: 'Ingreso',
};

export default function LoginPage() {
  return (
    <main className="sm-max-h:pt-28 sm-max-h:pb-6 container mx-auto flex min-h-[100svh] items-center justify-center px-4">
      <LoginFormContainer />
    </main>
  );
}
