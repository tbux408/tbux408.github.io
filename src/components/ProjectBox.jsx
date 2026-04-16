import React from "react";
import CardCarousel from "./CardCarousel";
import { Star, Users, Wrench, Code2 } from "lucide-react";

function ProjectBox({ project }) {
  return (
    <div id={project.id} className="border-t border-line">
      {/* Project header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-2xl font-bold text-fg tracking-tight">{project.title}</h2>
        {project.link && (
          <div className="text-fg-dim hover:text-fg transition-colors">
            {project.link}
          </div>
        )}
      </div>

      {/* Screenshots carousel */}
      <CardCarousel cards={project.cards} gapS={false} />

      {/* Metadata badges */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetaGroup icon={<Star size={14} />} label="Type" items={project.role} />
          <MetaGroup icon={<Users size={14} />} label="Team" items={project.collab} />
          <MetaGroup icon={<Wrench size={14} />} label="Tools" items={project.tools} />
          <MetaGroup icon={<Code2 size={14} />} label="Languages" items={project.languages} />
        </div>
      </div>
    </div>
  );
}

function MetaGroup({ icon, label, items }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-fg-faint text-xs font-medium uppercase tracking-wide">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 rounded-full bg-raised border border-line text-fg-dim text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectBox;
