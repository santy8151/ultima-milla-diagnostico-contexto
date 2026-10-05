# Diagrama de contexto

Diagrama C4 de contexto (nivel 1). El sistema bajo análisis es Ruta Clara, una propuesta de plataforma centralizada de gestión logística. Las flechas representan intercambios conceptuales, no protocolos ni integraciones confirmadas.

```mermaid
flowchart LR
  Cliente[Persona: Cliente]
  Operador[Persona: Operador de comercio o tienda]
  Almacen[Persona: Administrador de almacén]
  Repartidor[Persona: Repartidor]
  Soporte[Persona: Soporte al cliente]
  Admin[Persona propuesta: Administrador de plataforma]
  Sistema[Software system: Ruta Clara\nGestión logística de última milla]
  Pagos[Software externo: Sistema de pagos]
  Geo[Software externo: Geolocalización]
  Notif[Software externo: Notificaciones]
  ERP[Software externo: ERP o CRM interno]

  Cliente -->|Pedido / consulta| Sistema
  Sistema -->|Estado / avisos| Cliente
  Operador -->|Pedidos / excepciones| Sistema
  Sistema -->|Estado operativo| Operador
  Almacen -->|Existencias / preparación / despacho| Sistema
  Sistema -->|Pedidos por preparar| Almacen
  Repartidor -->|Estado / intento / ubicación autorizada| Sistema
  Sistema -->|Asignaciones / instrucciones| Repartidor
  Soporte -->|Consulta / incidencia| Sistema
  Sistema -->|Cronología| Soporte
  Admin -->|Usuarios / parámetros| Sistema
  Sistema -->|Alertas operativas| Admin
  Sistema <-->|Autorización / estado| Pagos
  Sistema <-->|Rutas / estimaciones| Geo
  Sistema -->|Solicitudes de envío| Notif
  Notif -->|Resultado de envío| Sistema
  Sistema <-->|Datos empresariales acordados| ERP
```

Las integraciones se deben validar con la empresa. Para la propuesta técnica y el diagrama AWS, consulta [arquitectura-aws.md](arquitectura-aws.md).
