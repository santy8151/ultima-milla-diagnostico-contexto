import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CreateOrderInput, OrderRepository } from "@/core/application/order-repository";
import type { Order, OrderStatus } from "@/core/domain/order";
import { demoOrders } from "@/infrastructure/persistence/demo-orders";

const dataFile = path.join(process.cwd(), ".data", "orders.json");
let writeQueue: Promise<void> = Promise.resolve();
let mutationQueue: Promise<void> = Promise.resolve();

async function readOrders(): Promise<Order[]> {
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as Order[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    await mkdir(path.dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(demoOrders, null, 2), "utf8");
    return structuredClone(demoOrders);
  }
}

async function saveOrders(orders: Order[]) {
  writeQueue = writeQueue.catch(() => undefined).then(async () => {
    await mkdir(path.dirname(dataFile), { recursive: true });
    const temporaryFile = `${dataFile}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(orders, null, 2), "utf8");
    await rename(temporaryFile, dataFile);
  });
  await writeQueue;
}

function mutate<T>(operation: () => Promise<T>): Promise<T> {
  const result = mutationQueue.then(operation);
  mutationQueue = result.then(() => undefined, () => undefined);
  return result;
}

export class JsonOrderRepository implements OrderRepository {
  async list() {
    return (await readOrders()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async findById(id: string) {
    return (await readOrders()).find((order) => order.id === id) ?? null;
  }

  async create(input: CreateOrderInput) {
    return mutate(async () => {
      const orders = await readOrders();
      const now = new Date().toISOString();
      const order: Order = {
        ...input,
        id: `RC-${randomUUID().slice(0, 8).toUpperCase()}`,
        status: "RECIBIDO",
        createdAt: now,
        updatedAt: now,
        events: [{ id: randomUUID(), status: "RECIBIDO", description: "Pedido registrado en Ruta Clara", occurredAt: now }],
      };
      orders.unshift(order);
      await saveOrders(orders);
      return order;
    });
  }

  async updateStatus(id: string, status: OrderStatus, description?: string) {
    return mutate(async () => {
      const orders = await readOrders();
      const index = orders.findIndex((order) => order.id === id);
      if (index < 0) return null;
      const now = new Date().toISOString();
      const order = {
        ...orders[index],
        status,
        updatedAt: now,
        events: [...orders[index].events, { id: randomUUID(), status, description: description || `Estado actualizado a ${status}`, occurredAt: now }],
      };
      orders[index] = order;
      await saveOrders(orders);
      return order;
    });
  }
}
