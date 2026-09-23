import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-neutral-200 px-6 py-16 sm:px-12 md:px-24 max-w-5xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
            Creative Coding Lab
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-100">
          Experimentos Visuales & Algoritmos
        </h1>
        <p className="mt-2 text-sm text-neutral-400 max-w-xl">
          Exploraciones interactivas en Canvas 2D, matemáticas procedurales y dinámicas de partículas.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}
