import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrderService } from "@/infrastructure/container";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const updateSchema = z.object({
  status: z.enum(["RECIBIDO", "PREPARANDO", "EN_RUTA", "ENTREGADO", "INCIDENCIA"]),
  description: z.string().trim().max(240).optional(),
});

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const order = await getOrderService().get(id);
    return order
      ? NextResponse.json({ data: order })
      : NextResponse.json({ error: "No encontramos ese pedido." }, { status: 404 });
  } catch (error) {
    console.error("orders.get failed", error);
    return NextResponse.json({ error: "No se pudo consultar el pedido." }, { status: 503 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "El estado enviado no es válido." }, { status: 400 });
  }
  try {
    const order = await getOrderService().updateStatus(id, parsed.data.status, parsed.data.description);
    return order
      ? NextResponse.json({ data: order })
      : NextResponse.json({ error: "No encontramos ese pedido." }, { status: 404 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo actualizar el pedido.";
    const status = message.startsWith("Transición no permitida") ? 409 : 503;
    return NextResponse.json({ error: message }, { status });
  }
}
