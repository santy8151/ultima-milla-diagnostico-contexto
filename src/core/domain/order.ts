export const ORDER_STATUSES = [
  "RECIBIDO",
  "PREPARANDO",
  "EN_RUTA",
  "ENTREGADO",
  "INCIDENCIA",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type OrderPriority = "Estándar" | "Prioritario";

export interface OrderEvent {
  id: string;
  status: OrderStatus;
  description: string;
  occurredAt: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  address: string;
  items: string[];
  status: OrderStatus;
  priority: OrderPriority;
  warehouse: string;
  courier: string | null;
  eta: string;
  createdAt: string;
  updatedAt: string;
  events: OrderEvent[];
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  RECIBIDO: "Recibido",
  PREPARANDO: "Preparando",
  EN_RUTA: "En ruta",
  ENTREGADO: "Entregado",
  INCIDENCIA: "Incidencia",
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  if (from === to) return true;
  const allowed: Record<OrderStatus, OrderStatus[]> = {
    RECIBIDO: ["PREPARANDO", "INCIDENCIA"],
    PREPARANDO: ["EN_RUTA", "INCIDENCIA"],
    EN_RUTA: ["ENTREGADO", "INCIDENCIA"],
    ENTREGADO: [],
    INCIDENCIA: ["PREPARANDO", "EN_RUTA", "ENTREGADO"],
  };
  return allowed[from].includes(to);
}
