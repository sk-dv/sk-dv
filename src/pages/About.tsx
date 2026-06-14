export default function About() {
  return (
    <div className="min-h-full w-full flex justify-center px-6 pt-32 pb-20">
      <article className="max-w-xl w-full">
        <header className="mb-10">
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-3">about</p>
          <h1 className="font-serif text-4xl">pipe oz</h1>
          <p className="font-serif italic text-sm opacity-50 mt-2">memento mori</p>
        </header>

        <hr className="border-current opacity-10 mb-10" />

        <section className="space-y-6 font-serif text-lg leading-relaxed">
          <p>
            Soy desarrollador de software. Le tengo mucho interés porque considero que es una herramienta
            bastante útil en estos tiempos. Te permite construir cosas que pueden provenir de tu imaginación;
            casi cualquier cosa puede ser emulada, para bien o para mal.
          </p>
          <p>
            Tengo intereses por la música y la literatura. No me gusta encasillar mis gustos musicales en
            géneros; prefiero que fluya y después decidir. En literatura me agrada el pensamiento filosófico
            y cómo se relaciona con lo psicológico y lo social.
          </p>
        </section>

        <hr className="border-current opacity-10 mt-12 mb-10" />

        <section>
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-8">trabajos</p>
          <ul className="space-y-10">
            <li className="grid grid-cols-[4rem_1fr] gap-6 items-baseline">
              <span className="text-[11px] tracking-widest uppercase opacity-40">2026</span>
              <div>
                <h3 className="font-serif text-xl">Oído Armónico</h3>
                <p className="font-serif italic text-sm opacity-60 mt-1.5 leading-relaxed">
                  Entrenamiento auditivo. Acordes, grados, intervalos y dictado.
                </p>
                <div className="flex gap-5 mt-4 text-[11px] tracking-widest uppercase opacity-50">
                  <a href="https://entrenador-auditivo.web.app" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">sitio ↗</a>
                  <a href="https://github.com/sk-dv/entrenador-auditivo" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">código ↗</a>
                </div>
              </div>
            </li>
            <li className="grid grid-cols-[4rem_1fr] gap-6 items-baseline">
              <span className="text-[11px] tracking-widest uppercase opacity-40">2026</span>
              <div>
                <h3 className="font-serif text-xl">Portafolio · Arte &amp; Cultura</h3>
                <p className="font-serif italic text-sm opacity-60 mt-1.5 leading-relaxed">
                  Notas para EIA 4, INBAL. Cultura, estética, percepción e interpretación.
                </p>
                <div className="flex gap-5 mt-4 text-[11px] tracking-widest uppercase opacity-50">
                  <a href="https://sk-dv.github.io/portafolio-arte/" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">sitio ↗</a>
                  <a href="https://github.com/sk-dv/portafolio-arte" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">código ↗</a>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <hr className="border-current opacity-10 mt-12 mb-6" />

        <footer className="flex gap-6 text-[12px] tracking-widest uppercase opacity-50">
          <a href="https://github.com/sk-dv" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">github</a>
          <span>·</span>
          <a href="https://www.linkedin.com/in/felipeosornio/" target="_blank" rel="noreferrer" className="hover:opacity-100 transition">linkedin</a>
        </footer>
      </article>
    </div>
  )
}
