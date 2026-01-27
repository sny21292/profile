import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Zap, Code2 } from "lucide-react";
import type { Project } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] overflow-hidden"
          >
            <div className="relative h-full bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 z-[102] p-3 rounded-full bg-black/70 hover:bg-red-500 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-primary/90 text-primary-foreground border-0 px-4 py-1">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 -mt-10 relative z-20">
                  {/* Title & Links */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-primary hover:bg-primary/90">
                            <ExternalLink size={18} className="mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="border-white/10 hover:bg-white/5">
                            <Github size={18} className="mr-2" />
                            Source Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.detailedDescription || project.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Key Technical Implementations</h3>
                      </div>
                      <ul className="grid gap-3">
                        {project.keyFeatures.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5"
                          >
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                          <Code2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Technologies Used</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 text-foreground font-medium border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impact */}
                  {project.impact && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <Zap className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Impact & Results</h3>
                      </div>
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-primary/10 border border-emerald-500/20">
                        <p className="text-muted-foreground leading-relaxed">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
