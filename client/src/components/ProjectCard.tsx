import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewMore: (project: Project) => void;
}

export function ProjectCard({ project, index, onViewMore }: ProjectCardProps) {
  const hasDetailedContent = project.detailedDescription || project.keyFeatures?.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Quick Links Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-primary text-white hover:text-primary-foreground backdrop-blur-md transition-all transform hover:scale-110"
              title="View Live"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-background text-white hover:text-foreground backdrop-blur-md transition-all transform hover:scale-110"
              title="View Code"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-black/50 backdrop-blur-md text-white border-0 text-xs">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          {project.featured && (
            <Badge variant="secondary" className="bg-primary/20 text-primary border-0 text-xs shrink-0 ml-2">
              Featured
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground border border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* View More Button */}
        {hasDetailedContent && (
          <Button
            variant="ghost"
            onClick={() => onViewMore(project)}
            className="w-full mt-auto group/btn bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            View Details
            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
