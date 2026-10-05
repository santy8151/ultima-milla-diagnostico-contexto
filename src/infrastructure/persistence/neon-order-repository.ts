import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import type { CreateOrderInput, OrderRepository } from "@/core/application/order-repository";
import type { Order, OrderStatus } from "@/core/domain/order";

export class NeonOrderRepository implements OrderRepository {
  private readonly sql;

  constructor(databaseUrl: string) {
    this.sql = neon(databaseUrl);
  }

  async list(): Promise<Order[]> {
    const rows = await this.sql`SELECT payload FROM orders ORDER BY created_at DESC`;
    return rows.map((row) => row.payload as Order);
  }

  async findById(id: string): Promise<Order | null> {
    const rows = await this.sql`SELECT payload FROM orders WHERE id = ${id} LIMIT 1`;
    return (rows[0]?.payload as Order | undefined) ?? null;
  }

  async create(input: CreateOrderInput): Promise<Order> {
    const now = new Date().toISOString();
    const id = `RC-${randomUUID().slice(0, 8).toUpperCase()}`;
    const order: Order = {
      ...input,
      id,
      status: "RECIBIDO",
      createdAt: now,
      updatedAt: now,
      events: [{ id: randomUUID(), status: "RECIBIDO", description: "Pedido registrado en Ruta Clara", occurredAt: now }],
    };
    await this.sql`INSERT INTO orders (id, created_at, updated_at, payload) VALUES (${id}, ${now}, ${now}, ${JSON.stringify(order)}::jsonb)`;
    return order;
  }

  async updateStatus(id: string, status: OrderStatus, description?: string): Promise<Order | null> {
    const current = await this.findById(id);
    if (!current) return null;
    const now = new Date().toISOString();
    const order: Order = {
      ...current,
      status,
      updatedAt: now,
      events: [...current.events, { id: randomUUID(), status, description: description || `Estado actualizado a ${status}`, occurredAt: now }],
    };
    const rows = await this.sql`UPDATE orders SET updated_at = ${now}, payload = ${JSON.stringify(order)}::jsonb WHERE id = ${id} RETURNING id`;
    return rows.length ? order : null;
  }
}
