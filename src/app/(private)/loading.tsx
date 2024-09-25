export default function PrivateLoading() {
  return (
    <main className="container mx-auto grid min-h-[100svh] content-center justify-items-center px-4">
      <div className="text-center">
        <h1>Cargando cursos...</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-full w-full animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>
    </main>
  );
}
