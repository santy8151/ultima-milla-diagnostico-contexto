# Estructura Onion del MVP

Ruta Clara organiza el código para que las reglas del dominio no dependan de Next.js, PostgreSQL ni la interfaz.

```text
src/
  core/
    domain/          Entidades, tipos, estados y reglas puras
    application/     Casos de uso y puertos (contratos de repositorio)
  infrastructure/
    persistence/     Adaptadores JSON local y PostgreSQL/Neon
    container.ts     Ensamblaje de dependencias para las rutas
  app/
    api/             Adaptadores HTTP de entrada
    page.tsx         UI del tablero
    globals.css      Presentación y estilos responsivos
db/
  schema.sql         Estructura PostgreSQL para el despliegue
```

## Regla de dependencias

- `core/domain` no depende de otras capas.
- `core/application` depende del dominio y define puertos.
- `infrastructure` implementa esos puertos y conoce proveedores concretos.
- `app` convierte solicitudes HTTP/acciones de usuario a llamadas de aplicación y representa resultados; no contiene reglas de negocio de estado.
- `infrastructure/container.ts` conecta los adaptadores en ejecución.

## Flujo de cambio de estado

`PATCH /api/orders/:id` → validación HTTP con Zod → `OrderService` → regla `canTransition` del dominio → `OrderRepository` → persistencia elegida → respuesta JSON → actualización del tablero.

## Adaptadores de persistencia

- **Local:** `JsonOrderRepository` persiste datos en `.data/orders.json` y crea pedidos de demostración en el primer arranque. Los datos locales sobreviven reinicios del servidor de desarrollo.
- **Vercel:** `NeonOrderRepository` usa `DATABASE_URL` y PostgreSQL administrado conectado desde el Marketplace. Las funciones serverless no utilizan el disco local como persistencia compartida.

## Alcance y seguridad

Este MVP sirve para demostración académica. No incluye autenticación, autorización por roles, CSRF reforzado para clientes autenticados, integración real con ERP/pagos/mapas/notificaciones, ni protección contra concurrencia a escala. No cargues datos personales reales ni expongas una instancia pública con información sensible. Antes de operación real se requiere identidad, permisos, límites de solicitudes, auditoría y revisión de privacidad.
