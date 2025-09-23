import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Logo + Título */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/pelisnowlogo2.png"
          alt="Pelisnow Logo"
          width={180}   // lo agrandamos
          height={180}
          priority
          className="drop-shadow-lg"
        />
        <h2 className="text-3xl md:text-4xl font-bold text-purple-500">
          Sobre Pelisnow
        </h2>
      </div>

      {/* Texto descriptivo */}
      <p className="mt-6 max-w-2xl text-gray-400 leading-relaxed text-lg">
        Pelisnow es un proyecto desarrollado con <span className="text-purple-400 font-semibold">Next.js</span>, 
        <span className="text-purple-400 font-semibold"> Tailwind CSS</span> y consumo de APIs de películas.  
        Su objetivo es brindar una experiencia moderna, rápida y atractiva para explorar el mundo del cine online.
      </p>
    </div>
  );
}
