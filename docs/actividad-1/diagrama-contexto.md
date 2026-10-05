# Diagrama de contexto

El rectángulo principal representa la plataforma bajo análisis. Las flechas indican intercambios de información a nivel de contexto; no definen protocolos ni APIs.

```mermaid
flowchart LR
  Cliente[Cliente]
  Operador[Operador de comercio o tienda]
  Almacen[Administrador de almacén]
  Repartidor[Repartidor]
  Soporte[Soporte al cliente]
  Admin[Administrador de plataforma]

  subgraph Sistema[Plataforma centralizada de gestión logística de última milla]
    Gestion[Pedidos · inventario · asignación · seguimiento · incidencias]
  end

  Pagos[Sistema de pagos]
  Geo[Servicio de geolocalización]
  Notif[Sistema de notificaciones]
  ERP[ERP o CRM interno]

  Cliente -->|Pedido y consulta de estado| Gestion
  Gestion -->|Estado y avisos| Cliente
  Operador -->|Pedidos y excepciones| Gestion
  Gestion -->|Estado y alertas operativas| Operador
  Almacen -->|Existencias, preparación y despacho| Gestion
  Gestion -->|Pedidos por preparar| Almacen
  Repartidor -->|Ubicación, estados e intentos| Gestion
  Gestion -->|Entregas asignadas e instrucciones| Repartidor
  Soporte -->|Consulta y registro de incidencia| Gestion
  Gestion -->|Cronología y resultado| Soporte
  Admin -->|Usuarios, permisos y parámetros| Gestion
  Gestion -->|Métricas y alertas| Admin
  Gestion <-->|Estado/autorización de pago| Pagos
  Gestion <-->|Posición, mapas y estimaciones| Geo
  Gestion -->|Solicitudes de envío| Notif
  Notif -->|Resultado de envío| Gestion
  Gestion <-->|Pedidos, inventario y datos acordados| ERP
```

## Lectura del diagrama

- Los participantes humanos usan la plataforma para registrar, ejecutar o consultar el flujo.
- Las flechas bidireccionales representan intercambio en ambos sentidos; las flechas simples muestran el flujo principal propuesto.
- Pagos, geolocalización, notificaciones y ERP/CRM son externos y su disponibilidad/contrato no se da por garantizado.
- Aún debe acordarse qué sistema es fuente maestra para pedido, inventario y datos de cliente.
