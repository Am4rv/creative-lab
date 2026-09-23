// src/app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Amaru | Creative Lab",
  description: "Laboratorio de experimentos visuales, Canvas 2D y matemáticas procedurales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark bg-[#07090e]">
      <body className="min-h-screen w-full bg-[#07090e] text-neutral-200 antialiased overflow-x-hidden selection:bg-yellow-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}