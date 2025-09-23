export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-400 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} Pelisnow. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="mailto:dlv.cristian@gmail.com" className="hover:text-purple-400">Contacto</a>
          <a href="https://github.com/cristiandlv" className="hover:text-purple-400">GitHub</a>
          <a href="https://www.linkedin.com/in/cristian-de-la-vega/" className="hover:text-purple-400">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
