import "server-only";
import type { OrderRepository } from "@/core/application/order-repository";
import { JsonOrderRepository } from "@/infrastructure/persistence/json-order-repository";
import { NeonOrderRepository } from "@/infrastructure/persistence/neon-order-repository";

let repository: OrderRepository | undefined;

export function getOrderRepository(): OrderRepository {
  if (repository) return repository;
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    repository = new NeonOrderRepository(databaseUrl);
    return repository;
  }
  if (process.env.VERCEL) {
    throw new Error("Falta DATABASE_URL. Conecta una base PostgreSQL del Marketplace de Vercel y ejecuta npm run db:schema.");
  }
  repository = new JsonOrderRepository();
  return repository;
}
