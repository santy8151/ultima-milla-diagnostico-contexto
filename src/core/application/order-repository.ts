import type { Order, OrderStatus } from "@/core/domain/order";

export interface CreateOrderInput {
  customer: string;
  email: string;
  address: string;
  items: string[];
  priority: "Estándar" | "Prioritario";
  warehouse: string;
  courier: string | null;
  eta: string;
}

export interface OrderRepository {
  list(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(input: CreateOrderInput): Promise<Order>;
  updateStatus(id: string, status: OrderStatus, description?: string): Promise<Order | null>;
}
