# Análisis del problema

## Situación actual y problema

La empresa de retail digital recibe pedidos desde varios canales, maneja inventario distribuido y coordina entregas con diferentes rutas y repartidores. No dispone de una vista centralizada del estado real de cada pedido. La información se duplica o queda desactualizada entre personas, almacenes y sistemas.

El problema de negocio es la falta de coordinación y trazabilidad confiable del pedido desde la recepción hasta la entrega o resolución de una incidencia. No basta con “crear una app”: hacen falta datos coherentes, responsabilidades definidas y visibilidad del proceso completo.

## Consecuencias

- Pedidos duplicados o procesados más de una vez.
- Inventario comprometido de forma incorrecta y promesas que no se pueden cumplir.
- Entregas tardías o fallidas por coordinación deficiente.
- Cliente y soporte sin información confiable.
- Reprocesos, devoluciones, contactos de soporte y recorridos improductivos.
- Dificultad para reconstruir los eventos ante una incidencia.
- Crecimiento del trabajo manual al aumentar volumen o cobertura.

## Variables críticas para el negocio

1. Identificador único del pedido a través de los canales.
2. Fuente maestra y frescura del inventario; reservas y ajustes.
3. Estados y marcas de tiempo, incluyendo autor/origen del cambio.
4. Capacidad de preparación por almacén, zonas y ventanas de entrega.
5. Asignación de repartidor/ruta y resultado de cada intento.
6. Volumen normal y picos, retrasos y calidad de los eventos externos.
7. Conectividad y uso de dispositivos de almacén/reparto.
8. Protección de datos de cliente y ubicación.
9. Disponibilidad, costos y soporte operativo de las integraciones.

## Cómo ayuda una plataforma centralizada

Puede mantener una vista compartida del estado logístico, registrar una cronología, exponer excepciones a las personas responsables e intercambiar actualizaciones con sistemas externos. Eso permite localizar pedidos detenidos y responder al cliente con datos comunes. El resultado depende de acordar cuál sistema es dueño de cada dato y asegurar integración, idempotencia y adopción; centralizar una vista no corrige automáticamente datos erróneos.

## Usuarios y alcance

Los actores, sistemas externos y flujos se describen en [diagrama-contexto.md](diagrama-contexto.md). Se propone incluir recepción y consulta de pedidos, validación/coordinación de inventario, preparación y despacho, asignación operativa, seguimiento y gestión de incidencias.

Quedan fuera de esta actividad: selección final de tecnologías, diseño detallado de bases de datos y APIs, reemplazo de ERP/CRM, optimización avanzada de rutas, metas de SLA/RTO/RPO, estimación de costos definitiva e implementación.

## Indicadores a medir después de levantar línea base

- Porcentaje de entregas a tiempo y entregas fallidas.
- Pedidos duplicados y discrepancias de inventario.
- Tiempo desde recepción hasta preparación, despacho y entrega.
- Pedidos sin actualización y tiempo para resolver incidencias.
- Volumen de consultas de estado a soporte.

No se fijan objetivos numéricos sin datos históricos y acuerdo de negocio. La propuesta tecnológica condicionada está en [arquitectura-aws.md](arquitectura-aws.md).
