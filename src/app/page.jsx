// src/app/page.jsx
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#07090e]">
      <main className="w-full max-w-6xl mx-auto px-6 py-16 sm:px-12 md:py-24">
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              Laboratorio Creativo • Amaru
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-100">
            Proyectos
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Un rincón personal donde voy recopilando proyectos visuales, pruebas y algoritmos que se me van ocurriendo con el tiempo, con el fin de seguir aprendiendo y explorando la creatividad.          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      </main>
    </div>
  );
}