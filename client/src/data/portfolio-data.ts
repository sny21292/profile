// Static portfolio data - edit this file to update your projects and skills

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveLink?: string | null;
  githubLink?: string | null;
  tags: string[];
  category: string;
  featured?: boolean | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string | null;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured Shopify store with custom theme development and app integration.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["Shopify", "Liquid", "JavaScript"],
    category: "Shopify",
    liveLink: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Corporate Website",
    description: "Custom WordPress theme development for a corporate client with heavy traffic.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["WordPress", "PHP", "MySQL"],
    category: "WordPress",
    featured: true,
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description: "A Laravel-based dashboard for managing user subscriptions and analytics.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Laravel", "Vue.js", "Tailwind"],
    category: "Laravel",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio v1",
    description: "My previous portfolio built with pure HTML/CSS and JavaScript.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    featured: false,
  },
];

export const skills: Skill[] = [
  { id: 1, name: "HTML/CSS", category: "Frontend", proficiency: 95 },
  { id: 2, name: "JavaScript", category: "Frontend", proficiency: 90 },
  { id: 3, name: "React", category: "Frontend", proficiency: 75, icon: "SiReact" },
  { id: 4, name: "Next.js", category: "Frontend", proficiency: 70, icon: "SiNextdotjs" },
  { id: 5, name: "PHP", category: "Backend", proficiency: 85, icon: "SiPhp" },
  { id: 6, name: "Laravel", category: "Backend", proficiency: 80, icon: "SiLaravel" },
  { id: 7, name: "Node.js", category: "Backend", proficiency: 60, icon: "SiNodedotjs" },
  { id: 8, name: "WordPress", category: "CMS", proficiency: 95, icon: "SiWordpress" },
  { id: 9, name: "Shopify", category: "E-commerce", proficiency: 85, icon: "SiShopify" },
];
