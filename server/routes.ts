import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // No API routes needed - using static data
  // This file is kept for the dev server structure
  return httpServer;
}
