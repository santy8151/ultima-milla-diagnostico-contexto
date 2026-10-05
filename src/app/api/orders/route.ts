import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrderService } from "@/infrastructure/container";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createOrderSchema = z.object({
  customer: z.string().trim().min(2).max(120),
  email: z.email().max(180),
  address: z.string().trim().min(5).max(240),
  items: z.array(z.string().trim().min(1).max(120)).min(1).max(20),
  priority: z.enum(["Estándar", "Prioritario"]),
  warehouse: z.string().trim().min(2).max(100),
  courier: z.string().trim().max(120).nullable(),
  eta: z.string().trim().min(2).max(100),
});

export async function GET() {
  try {
    return NextResponse.json({ data: await getOrderService().list() });
  } catch (error) {
    console.error("orders.list failed", error);
    return NextResponse.json({ error: "No se pudo cargar la operación logística." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos del pedido.", details: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const order = await getOrderService().create(parsed.data);
    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error) {
    console.error("orders.create failed", error);
    return NextResponse.json({ error: "No se pudo registrar el pedido." }, { status: 503 });
  }
}
