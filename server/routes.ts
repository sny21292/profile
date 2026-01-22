import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { projects, skills } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API ROUTES ===

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const allSkills = await storage.getSkills();
    res.json(allSkills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Seed data on startup
  await seedDatabase();

  return httpServer;
}

// === SEED DATA ===
export async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Seed Projects
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

    // Seed Skills
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
