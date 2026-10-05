# Análisis del problema

## Situación actual

Los pedidos llegan por distintos canales y la operación combina inventarios distribuidos, almacenes, rutas y repartidores. No existe una vista centralizada del estado real de cada pedido. La información se duplica o queda desactualizada entre los participantes y sistemas.

## Problema

La empresa no puede coordinar y verificar de forma consistente el cumplimiento de un pedido desde su recepción hasta la entrega o resolución de una incidencia. La fragmentación de datos dificulta conocer qué se prometió al cliente, qué inventario está disponible, quién tiene el pedido y qué acción sigue.

## Por qué importa y consecuencias

- Pedidos duplicados o preparados más de una vez.
- Inventario comprometido de forma incorrecta y promesas que no se pueden cumplir.
- Entregas tardías o fallidas por asignación y coordinación deficientes.
- Cliente y soporte sin información confiable para responder consultas.
- Mayor costo por reprocesos, devoluciones, contactos de soporte y recorridos improductivos.
- Dificultad para reconstruir eventos y responsabilidades ante una incidencia.

## Variables que importan

1. Identificador único del pedido y canal de origen.
2. Estado y marcas de tiempo de cada etapa, con responsable del cambio.
3. Disponibilidad y ubicación del inventario al validar y reservar.
4. Capacidad de preparación por almacén y ventanas de entrega.
5. Asignación de repartidor/ruta y resultado de cada intento.
6. Calidad y oportunidad de eventos provenientes de sistemas externos.
7. Volumen de pedidos, picos estacionales y tasa de incidencias.
8. Protección de datos del cliente y control de acceso por rol.

## Usuarios y actores

| Actor | Necesidad/interacción principal |
|---|---|
| Cliente | Consultar estado estimado, recibir avisos y reportar problemas. |
| Operador de comercio o tienda | Revisar pedidos, disponibilidad y excepciones de venta. |
| Administrador de almacén | Confirmar existencias, preparar pedidos y registrar despacho. |
| Repartidor | Consultar entregas asignadas, actualizar estado y registrar resultado/incidencia. |
| Soporte al cliente | Consultar la cronología y gestionar consultas o reclamos. |
| Administrador de la plataforma | Gestionar usuarios, permisos, parámetros operativos y monitoreo. Rol propuesto para hacer explícita la operación. |
| Sistema de pagos | Informar autorización, rechazo o estado de pago asociado al pedido. |
| Servicio de geolocalización | Proveer ubicación, mapas o estimaciones de ruta, sujeto a capacidades contratadas. |
| Sistema de notificaciones | Enviar mensajes al cliente y devolver estado de envío cuando esté disponible. |
| ERP o CRM interno | Intercambiar datos comerciales, inventario, clientes u órdenes según integración acordada. |

## Alcance propuesto

### Incluye

- Ingreso y consulta de pedidos de diferentes canales.
- Identificación y seguimiento de estados logísticos desde la recepción hasta la entrega o cierre de incidencia.
- Consulta/validación de disponibilidad y coordinación con almacenes.
- Asignación operativa de entregas a rutas y repartidores.
- Registro de eventos, intentos de entrega e incidencias.
- Vista de seguimiento para operación y soporte; información de estado para el cliente.
- Integración conceptual con pagos, geolocalización, notificaciones y ERP/CRM.

### Fuera de alcance de esta actividad

- Selección de nube, lenguaje, framework, base de datos o estilo arquitectónico.
- Diseño detallado de componentes, APIs, despliegue o modelo físico de datos.
- Sustitución integral del ERP, CRM, canal de comercio o proveedor de pagos.
- Optimización matemática de rutas y promesa de tiempos sin datos operativos.
- Definición contractual de SLA, costos, políticas de devolución o jurisdicciones.

## Criterios iniciales de éxito

A validar con la empresa: una sola cronología auditable por pedido; reducción de pedidos duplicados y discrepancias de inventario; menos entregas fallidas y consultas de estado; actualización oportuna de eventos; y capacidad de identificar pedidos sin avance. No se fijan metas numéricas sin una línea base.

## Límites del sistema

La plataforma coordina y presenta el proceso logístico. Los sistemas externos conservan sus responsabilidades de origen: pagos autoriza transacciones; ERP/CRM mantiene los datos empresariales que se acuerden; geolocalización calcula posiciones/rutas; notificaciones transporta mensajes. El límite exacto y la fuente maestra de cada dato deben confirmarse.
