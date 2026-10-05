# Supuestos, decisiones iniciales y preguntas abiertas

## Supuestos de trabajo

| ID | Supuesto | Validación necesaria |
|---|---|---|
| S1 | La empresa opera más de un canal de venta y más de un punto de inventario. | Confirmar canales, ubicaciones y volúmenes. |
| S2 | Existe algún ERP/CRM y otros sistemas que deben seguir operando durante la integración. | Identificar productos, dueños y capacidades de integración. |
| S3 | La plataforma registra una cronología por pedido y necesita identificar el origen de cada evento. | Acordar estados, eventos y reglas de corrección. |
| S4 | El cliente puede recibir notificaciones y consultar información de seguimiento. | Confirmar canales, consentimiento y datos permitidos. |
| S5 | El repartidor puede actualizar estados desde un dispositivo móvil con conectividad variable. | Validar dispositivos, cobertura y flujo sin conexión. |
| S6 | La primera versión coordina la operación; no sustituye pagos ni ERP/CRM. | Validar con responsables de negocio y tecnología. |

## Decisiones iniciales

| ID | Decisión | Justificación | Estado |
|---|---|---|---|
| D1 | Enfocar la propuesta en una plataforma centralizada para registrar pedidos, validar inventario, asignar rutas, rastrear entregas y gestionar incidencias. | Responde al problema de fragmentación y mejora la trazabilidad a lo largo del ciclo. | Propuesta del enunciado; validar límites. |
| D2 | Tratar a pagos, geolocalización, notificaciones y ERP/CRM como sistemas externos en el contexto. | Sus responsabilidades son distintas y requieren integración explícita. | Inicial. |
| D3 | Mantener el diagnóstico en el nivel de contexto y no seleccionar tecnología todavía. | La actividad evalúa comprensión del problema antes de elegir tecnologías. | Aplicada a esta entrega. |
| D4 | Registrar los eventos y el actor/instante de cada cambio como necesidad del negocio, sin prescribir implementación. | Facilita trazabilidad y análisis de discrepancias. | Recomendación inicial. |
| D5 | Definir criterios de éxito contra una línea base antes de fijar metas numéricas. | Evita proponer objetivos arbitrarios sin datos. | Pendiente de datos. |

## Preguntas por confirmar

1. ¿Cuál es el volumen diario y el pico de pedidos, por canal y región?
2. ¿Qué sistema origina y cuál es fuente maestra de pedidos, productos, inventario y clientes?
3. ¿Los pedidos pueden dividirse entre almacenes o entregas parciales?
4. ¿Qué estados, reglas de cancelación, devolución y reintento existen hoy?
5. ¿Quién asigna rutas y con qué restricciones (ventanas, capacidad, zonas, prioridades)?
6. ¿Qué dispositivos y conectividad tienen repartidores y personal de almacén?
7. ¿Qué datos personales se manejan, quién puede verlos y cuánto tiempo se conservan?
8. ¿Qué disponibilidad, latencia y recuperación necesita la operación?
9. ¿Qué proveedores y mecanismos de integración están disponibles para los sistemas externos?
10. ¿Qué métricas actuales permitirían medir mejora y quién las valida?
