import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio-data";
import * as SiIcons from "react-icons/si";
import { Database, Layout, Code, ShoppingBag, Server } from "lucide-react";

// Helper to render dynamic icons
const getIcon = (iconName: string | null) => {
  if (!iconName) return <Code className="w-6 h-6" />;
  
  // Check SiIcons first (Simple Icons)
  const IconComponent = (SiIcons as any)[iconName];
  if (IconComponent) return <IconComponent className="w-6 h-6" />;
  
  // Fallback to Lucide based on name
  if (iconName.toLowerCase().includes("database")) return <Database className="w-6 h-6" />;
  if (iconName.toLowerCase().includes("server")) return <Server className="w-6 h-6" />;
  if (iconName.toLowerCase().includes("shop")) return <ShoppingBag className="w-6 h-6" />;
  
  return <Layout className="w-6 h-6" />;
};

export function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <span className="text-primary">{getIcon(skill.icon)}</span>
          {skill.name}
        </div>
        <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
      </div>
      
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
      </div>
    </div>
  );
}
