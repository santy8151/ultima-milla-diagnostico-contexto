import "server-only";
import { OrderService } from "@/core/application/order-service";
import { getOrderRepository } from "@/infrastructure/persistence/order-repository-provider";

export function getOrderService() {
  return new OrderService(getOrderRepository());
}
