import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/lab/${project.slug}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/70 hover:border-yellow-500/40 hover:bg-neutral-900/80 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-yellow-400/80 transition-colors">
            {project.date} • {project.status}
          </span>
          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        <h2 className="text-lg font-medium text-neutral-100 group-hover:text-yellow-300 transition-colors">
          {project.title}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono text-neutral-400 bg-neutral-800/50 border border-neutral-700/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
