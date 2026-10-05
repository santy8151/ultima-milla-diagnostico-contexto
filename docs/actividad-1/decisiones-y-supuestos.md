# Supuestos, decisiones iniciales y preguntas abiertas

El detalle técnico está en [arquitectura-aws.md](arquitectura-aws.md#11-decisiones-iniciales-tomadas-y-por-validar). Este registro separa hechos del caso de hipótesis para validar.

## Supuestos de trabajo

| ID | Supuesto | Validación necesaria |
|---|---|---|
| S1 | Hay más de un canal de venta y más de un punto de inventario. | Canales, ubicaciones y volúmenes. |
| S2 | Existe ERP/CRM u otro sistema empresarial que continuará operando. | Sistemas, dueños de datos y contratos de integración. |
| S3 | Se requiere una cronología del pedido con origen e instante de cada evento. | Estados, reglas de corrección y retención. |
| S4 | Cliente puede consultar estado y recibir notificaciones. | Canales, consentimiento y datos permitidos. |
| S5 | Repartidores usan dispositivos móviles con conectividad variable. | Dispositivos, cobertura y operación sin conexión. |
| S6 | La plataforma coordina el proceso, no reemplaza pagos ni ERP/CRM. | Validación con negocio y tecnología. |
| S7 | AWS es una nube candidata para la propuesta técnica. | Confirmar restricciones académicas/empresariales, residencia de datos y región. |
| S8 | El estado operativo necesita almacenamiento estructurado; DynamoDB se evalúa como candidato. | Patrones de acceso, relaciones, transacciones y fuente maestra. |
| S9 | S3 se usa para objetos/evidencias, no como base transaccional de pedidos. | Tipo de archivos y política de retención. |
| S10 | Kafka/MSK puede ser útil para eventos si lo requieren volumen, consumidores y replay. | Volumen, retención, experiencia operativa y costo. |

## Preguntas abiertas

1. ¿Cuál es el volumen diario y el pico de pedidos por canal/región?
2. ¿Qué sistema es fuente maestra de pedidos, productos, inventario y clientes?
3. ¿Se permiten entregas parciales o pedidos surtidos de varios almacenes?
4. ¿Qué estados, cancelaciones, devoluciones y reintentos existen hoy?
5. ¿Quién asigna rutas y con qué restricciones operativas?
6. ¿Qué dispositivos/conectividad tienen almacén y reparto?
7. ¿Qué datos personales se necesitan, quién accede y cuánto se conservan?
8. ¿Qué disponibilidad, latencia, RTO y RPO espera el negocio?
9. ¿Qué contratos, límites y autenticación ofrecen los sistemas externos?
10. ¿Qué objetivos de servicio y métricas actuales se usarán como línea base?
11. ¿Existe capacidad interna para operar Kafka/MSK y Prometheus?
12. ¿Qué presupuestos, región y requisitos regulatorios aplican?
