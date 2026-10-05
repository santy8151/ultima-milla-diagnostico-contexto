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

## Límites

Esta actividad no fija la arquitectura definitiva, una base de datos final, contratos de integración, región, RTO/RPO, costos, CI/CD ni implementación. Antes de seleccionar servicios finales se deben validar volúmenes, fuentes maestras, requisitos de seguridad/privacidad, capacidades de integración y operación.

## Repositorio y video

- Repositorio GitHub (privado): https://github.com/santy8151/ultima-milla-diagnostico-contexto
- Video de sustentación: **pendiente de grabación/publicación**. Agrega aquí el enlace de YouTube, Google Drive o Microsoft Teams.

## Base del caso

Actividad 1: Diagnóstico y contexto arquitectónico, enunciado proporcionado por el estudiante. El caso obligatorio define la solución logística de última milla para retail digital y aporta actores, riesgos y decisión inicial. Las alternativas AWS son propuestas para análisis y validación.
