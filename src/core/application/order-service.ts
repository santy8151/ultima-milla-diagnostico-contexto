import type { CreateOrderInput, OrderRepository } from "@/core/application/order-repository";
import { canTransition, type Order, type OrderStatus } from "@/core/domain/order";

export class OrderService {
  constructor(private readonly orders: OrderRepository) {}

  list() {
    return this.orders.list();
  }

  get(id: string) {
    return this.orders.findById(id);
  }

  async create(input: CreateOrderInput): Promise<Order> {
    return this.orders.create({ ...input, items: input.items.filter(Boolean) });
  }

  async updateStatus(id: string, status: OrderStatus, description?: string) {
    const current = await this.orders.findById(id);
    if (!current) return null;
    if (!canTransition(current.status, status)) {
      throw new Error(`Transición no permitida: ${current.status} → ${status}`);
    }
    return this.orders.updateStatus(id, status, description);
  }
}
