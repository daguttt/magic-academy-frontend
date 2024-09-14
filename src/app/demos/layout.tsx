export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          {children}
          <footer>
            <h1 className="text-8xl">hola</h1>
          </footer>
        </body>
      </html>
    );
  }