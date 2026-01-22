import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";
import { projects, skills, messages } from "../shared/schema";
import { eq } from "drizzle-orm";

const { Pool } = pg;

// Create database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

// Seed database if empty
async function ensureSeeded() {
  const existingProjects = await db.select().from(projects);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "E-Commerce Platform",
        description: "A full-featured Shopify store with custom theme development and app integration.",
        imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        tags: ["Shopify", "Liquid", "JavaScript"],
        category: "Shopify",
        liveLink: "https://example.com",
        featured: true,
      },
      {
        title: "Corporate Website",
        description: "Custom WordPress theme development for a corporate client with heavy traffic.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        tags: ["WordPress", "PHP", "MySQL"],
        category: "WordPress",
        featured: true,
      },
      {
        title: "SaaS Dashboard",
        description: "A Laravel-based dashboard for managing user subscriptions and analytics.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        tags: ["Laravel", "Vue.js", "Tailwind"],
        category: "Laravel",
        featured: true,
      },
      {
        title: "Portfolio v1",
        description: "My previous portfolio built with pure HTML/CSS and JavaScript.",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "Frontend",
        featured: false,
      },
    ]);

    await db.insert(skills).values([
      { name: "HTML/CSS", category: "Frontend", proficiency: 95 },
      { name: "JavaScript", category: "Frontend", proficiency: 90 },
      { name: "React", category: "Frontend", proficiency: 75, icon: "SiReact" },
      { name: "Next.js", category: "Frontend", proficiency: 70, icon: "SiNextdotjs" },
      { name: "PHP", category: "Backend", proficiency: 85, icon: "SiPhp" },
      { name: "Laravel", category: "Backend", proficiency: 80, icon: "SiLaravel" },
      { name: "Node.js", category: "Backend", proficiency: 60, icon: "SiNodedotjs" },
      { name: "WordPress", category: "CMS", proficiency: 95, icon: "SiWordpress" },
      { name: "Shopify", category: "E-commerce", proficiency: 85, icon: "SiShopify" },
    ]);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, method } = req;
  const path = url?.replace(/\?.*$/, "") || "";

  try {
    // Ensure database is seeded
    await ensureSeeded();

    // GET /api/projects
    if (path === "/api/projects" && method === "GET") {
      const allProjects = await db.select().from(projects);
      return res.json(allProjects);
    }

    // GET /api/projects/:id
    const projectMatch = path.match(/^\/api\/projects\/(\d+)$/);
    if (projectMatch && method === "GET") {
      const id = parseInt(projectMatch[1]);
      const [project] = await db.select().from(projects).where(eq(projects.id, id));
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.json(project);
    }

    // GET /api/skills
    if (path === "/api/skills" && method === "GET") {
      const allSkills = await db.select().from(skills);
      return res.json(allSkills);
    }

    // POST /api/contact
    if (path === "/api/contact" && method === "POST") {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const [newMessage] = await db.insert(messages).values({ name, email, message }).returning();
      return res.status(201).json(newMessage);
    }

    // 404 for unknown routes
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
