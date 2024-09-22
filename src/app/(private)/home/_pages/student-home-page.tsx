import { getStudentLastSeenClasses } from '~/services/classes/last-seen-classes';

export async function StudentHome() {
  const { successRes, failureRes } = await getStudentLastSeenClasses();
  if (failureRes) return <p>{failureRes.detail}</p>;

  return (
    <main className="container mx-auto grid min-h-[100svh] content-center justify-items-center px-4">
      <pre>Últimas clases vistas: {JSON.stringify(successRes.data)}</pre>
      <h1>Bienvenido Estudiante</h1>
    </main>
  );
}
