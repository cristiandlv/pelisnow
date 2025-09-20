import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pelisnow",
  description: "Explora películas al instante",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">
        {/* Navbar */}
        <Navbar/>

        {/* Contenido principal */}
        <main className="px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
