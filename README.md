# Plataforma de gestión logística de última milla

## Resumen ejecutivo

**Ruta Clara** es una propuesta de plataforma centralizada para un retail digital que recibe pedidos por varios canales, maneja inventario distribuido y coordina entregas sin una vista confiable del estado de cada pedido. Esto genera duplicados, discrepancias, retrasos, errores y baja trazabilidad.

La propuesta conecta clientes, operadores, almacén, repartidores y soporte con pagos, geolocalización, notificaciones y ERP/CRM. El alcance inicial cubre registro y consulta de pedidos, coordinación del inventario, seguimiento de preparación y entrega, y gestión de incidencias.

La perspectiva AWS es inicial, no un diseño de producción. Considera API Gateway y Lambda para entrada/procesamiento; S3 para objetos y contenido web estático; DynamoDB como candidato a persistencia operacional estructurada; CloudFront para distribuir una interfaz web; VPC y Security Groups para recursos privados; IAM para permisos mínimos; CloudWatch como base de monitoreo. Amazon MSK y Managed Prometheus quedan condicionados a necesidades confirmadas para evitar complejidad prematura.

## Entregables

- [Análisis del problema](docs/actividad-1/analisis.md)
- [Diagrama de contexto C4 nivel 1](docs/actividad-1/diagrama-contexto.md)
- [Propuesta AWS, flujo, seguridad, observabilidad y diagramas](docs/actividad-1/arquitectura-aws.md)
- [Supuestos y decisiones](docs/actividad-1/decisiones-y-supuestos.md)
- [Riesgos](docs/actividad-1/riesgos.md)
- [Guion de sustentación](docs/actividad-1/guion-sustentacion.md)
- [Estructura Onion del MVP](docs/arquitectura-onion.md)

## Ejecutar el MVP

Requiere Node.js 20.9 o posterior.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. En local se usa `.data/orders.json`, creado con pedidos de demostración al primer inicio; no hace falta una cuenta AWS ni base de datos para probar el tablero.

La interfaz permite buscar/filtrar pedidos, crear pedidos, abrir su ficha, consultar la cronología y actualizar estados con validación de transiciones. API: `GET/POST /api/orders`, `GET/PATCH /api/orders/:id` y `GET /api/health`.

### Persistencia para Vercel

Vercel no comparte un disco local persistente entre ejecuciones serverless. Conecta una base [Neon](https://vercel.com/docs/marketplace-storage) desde el Marketplace y asigna su `DATABASE_URL` al proyecto para Preview y Production. El adaptador de persistencia usa el protocolo serverless de Neon; otros proveedores PostgreSQL requieren un adaptador distinto. Luego inicializa una vez la tabla con `npm run db:schema` usando la variable localmente. El esquema está en `db/schema.sql`. La app no cae silenciosamente a datos en memoria en Vercel: si falta `DATABASE_URL`, la API responde como no disponible. El disco JSON local solo es para desarrollo.

Importa el repositorio en Vercel desde GitHub; detectará Next.js y leerá [`vercel.json`](vercel.json). El preset Framework es Next.js, el build predeterminado es `next build` y el comando local es `npm run dev`. La configuración de Next.js se detecta automáticamente; el archivo solo fija el preset. No requiere rewrites manuales.

Al terminar, comprueba `/api/health`; informa `local-json` en local y `postgresql` con la variable configurada. La guía oficial describe [Next.js en Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) y su [configuración `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json).

### Configuración incluida

- `vercel.json`: preset Next.js.
- `.env.example`: variable necesaria para PostgreSQL en Vercel.
- `db/schema.sql`: tabla de pedidos e índice.
- `src/core`: dominio y casos de uso.
- `src/infrastructure`: persistencia y composición.
- `src/app`: frontend y adaptadores HTTP.

Los documentos AWS describen una propuesta conceptual. El MVP desplegable usa Neon/PostgreSQL porque Vercel ofrece conexiones a bases de datos mediante integraciones del Marketplace; no conecta AWS MSK, DynamoDB ni otros servicios externos automáticamente. Este prototipo no incluye autenticación; usa datos ficticios y no debe recibir información personal ni quedar expuesto como sistema operativo real. Ver [arquitectura Onion del MVP](docs/arquitectura-onion.md).

## Límites

Esta actividad no fija la arquitectura definitiva, una base de datos final, contratos de integración, región, RTO/RPO, costos, CI/CD ni implementación. Antes de seleccionar servicios finales se deben validar volúmenes, fuentes maestras, requisitos de seguridad/privacidad, capacidades de integración y operación.

## Repositorio y video

- Repositorio GitHub (privado): https://github.com/santy8151/ultima-milla-diagnostico-contexto
- Video de sustentación: **pendiente de grabación/publicación**. Agrega aquí el enlace de YouTube, Google Drive o Microsoft Teams.

## Base del caso

Actividad 1: Diagnóstico y contexto arquitectónico, enunciado proporcionado por el estudiante. El caso obligatorio define la solución logística de última milla para retail digital y aporta actores, riesgos y decisión inicial. Las alternativas AWS son propuestas para análisis y validación.
