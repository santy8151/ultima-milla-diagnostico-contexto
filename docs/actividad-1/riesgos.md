# Riesgos iniciales

Probabilidad e impacto son cualitativos y provisionales; deben recalibrarse con datos reales. Mitigaciones describen controles a evaluar, no implementaciones ya realizadas.

| Riesgo | Impacto | Probabilidad | Mitigación inicial |
|---|---|---|---|
| Duplicación de pedidos | Doble preparación, cobro o confusión operativa. | Media | Identificador/idempotency key entre canales, escrituras condicionales, conciliación y alertas. |
| Inconsistencia de inventario | Promesa imposible, cancelación y pérdida de confianza. | Alta | Acordar sistema dueño, reglas de reserva y conciliación; manejar concurrencia y fallos de integración. |
| Pérdida o duplicación de eventos | Estado incompleto o acciones repetidas. | Media | Consumidores idempotentes, reintentos acotados, cola de fallidos y estrategia para la doble escritura estado-evento. |
| Falla de servicio o proveedor externo | Pedidos bloqueados y acumulación de trabajo. | Media | Timeouts, reintentos controlados, estado pendiente, alarmas y procedimiento manual de contingencia. |
| Retrasos y entregas fallidas | Incumplimiento de promesa, devoluciones y más contactos a soporte. | Media | Medir retraso por etapa, registrar causas y validar reglas de reasignación. |
| Pérdida de trazabilidad | No se puede explicar el estado ni resolver reclamos. | Media | Cronología auditable con autor, origen y tiempo; detectar pedidos sin avance. |
| Acceso indebido o fuga de datos | Daño a clientes, reputación y obligaciones de cumplimiento. | Media | IAM mínimo, permisos por rol, cifrado, datos mínimos en logs y retención aprobada. |
| Crecimiento operativo sin control | Latencia, costos y aumento de tareas manuales. | Media | Medir picos/colas, definir indicadores, cuotas y capacidad según evidencia. |
| MSK/AMP innecesarios para la fase | Complejidad, costo y carga de operación sin beneficio demostrado. | Media | Condicionar adopción a volumen, necesidad Kafka/Prometheus y equipo operativo; comparar alternativas gestionadas simples. |
| Persistencia elegida no encaja en las consultas | Reprocesos de diseño o errores al reservar inventario. | Media | Validar patrones, relaciones, consistencia y propiedad de datos antes de fijar DynamoDB u otro almacén. |

Ver las señales de monitoreo propuestas en [arquitectura-aws.md](arquitectura-aws.md#8-logs-métricas-y-observabilidad).
