# Guion de sustentación (6-7 minutos)

Completa [nombres] y [curso]. El contenido desarrolla una propuesta inicial, no un diseño de producción.

## 0:00-0:40 | Presentación

Hola, somos [nombres] de [curso]. Presentamos el diagnóstico de una plataforma de gestión logística de última milla para retail digital. Primero entendemos el problema y luego justificamos opciones de arquitectura.

## 0:40-1:35 | Problema

La empresa recibe pedidos por varios canales, maneja inventario distribuido y coordina almacenes, rutas y repartidores sin una vista confiable del estado de cada pedido. Esto produce duplicados, discrepancias, retrasos, errores y poca trazabilidad. Afecta la experiencia del cliente y obliga a operación y soporte a reconstruir información manualmente.

## 1:35-2:20 | Actores

Los usuarios son clientes, operadores de tienda, administradores de almacén, repartidores y soporte. La plataforma también intercambia información con pagos, geolocalización, notificaciones y ERP/CRM. Aún hay que validar quién es dueño del pedido y del inventario.

## 2:20-3:20 | Diagrama de contexto

[Muestra el diagrama de contexto.] Ruta Clara centraliza la vista y coordinación del ciclo del pedido. Recorre los intercambios de cada usuario y después los sistemas externos. Las flechas no significan que la integración ya exista ni fijan protocolos. El límite del sistema mantiene a pagos y ERP/CRM como sistemas con responsabilidades propias.

## 3:20-4:45 | Arquitectura AWS inicial

[Muestra el diagrama AWS.] CloudFront y S3 pueden servir una interfaz web estática. API Gateway recibe solicitudes HTTPS y Lambda ejecuta validaciones y lógica acotada. Para el estado operativo hace falta almacenamiento estructurado; proponemos DynamoDB como candidato sujeto a validar. S3 se reserva para evidencias y archivos, no para guardar transacciones de pedidos.

Los eventos pueden desacoplar asignación, seguimiento y notificaciones. MSK/Kafka se considera si volumen, múltiples consumidores, retención y capacidad del equipo lo justifican. Para empezar, podría bastar una alternativa administrada más simple.

## 4:45-5:40 | Red, seguridad y monitoreo

Los recursos que necesitan conectividad privada, como un posible clúster MSK, irían en subnets privadas de una VPC. Los servicios administrados no se instalan todos dentro de la VPC. Security Groups restringen conexiones y cada componente usa un rol IAM con permisos mínimos. CloudWatch es la base para logs y métricas; AMP se añade solo si necesitamos métricas Prometheus de aplicación.

## 5:40-6:40 | Riesgos y cierre

Los principales riesgos son inventario inconsistente, pedidos duplicados, pérdida o repetición de eventos, fallas de proveedores, retrasos y exposición de datos. Antes del diseño definitivo debemos conocer volúmenes, fuentes maestras, conectividad, objetivos de servicio, requisitos de privacidad y presupuesto. Gracias.

## Antes de publicar

- Completar nombres/curso y confirmar que las afirmaciones representan el trabajo del equipo.
- Mostrar los diagramas legibles.
- No mostrar datos personales reales en pantalla.
- Publicar el video en YouTube, Google Drive o Microsoft Teams y agregar el enlace al README.
