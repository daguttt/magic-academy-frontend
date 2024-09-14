import LoginForm from './components/login-form';

type LoginPageProps = {
  searchParams: Record<string, string>;
};

export default function LoginPage({}: LoginPageProps) {
  return (
    <main className="container mx-auto flex min-h-[100svh] items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}
