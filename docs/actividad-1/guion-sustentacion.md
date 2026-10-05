# Guion de sustentación (5 a 8 minutos)

Duración sugerida: 6 minutos. Completa los campos entre corchetes antes de grabar. Comparte pantalla con el diagrama durante el segmento 3.

## 0:00–0:40 | Presentación

Hola, somos [nombres] de [curso/grupo]. Presentamos el diagnóstico y contexto arquitectónico de una plataforma de gestión logística de última milla para una empresa de retail digital. En esta actividad buscamos comprender el problema antes de escoger tecnologías.

## 0:40–1:35 | Problema

La empresa recibe pedidos por varios canales, trabaja con inventario distribuido y coordina almacenes, rutas y repartidores. Hoy no dispone de una vista centralizada del estado real de cada pedido. La información se duplica o queda desactualizada, lo que produce retrasos, errores operativos y poca trazabilidad.

Esto afecta al cliente, que no sabe con claridad qué pasa con su pedido, y también al equipo interno, que debe reconstruir información entre sistemas y personas. Las consecuencias posibles incluyen comprometer inventario inexistente, repetir trabajo, fallar entregas y elevar el costo de soporte.

## 1:35–2:35 | Usuarios y actores

Los actores humanos principales son el cliente, el operador de comercio o tienda, el administrador de almacén, el repartidor y soporte al cliente. Proponemos también un administrador de plataforma para gestionar usuarios y parámetros. Cada actor necesita información y permisos distintos: por ejemplo, almacén confirma preparación, repartidores actualizan intentos y soporte consulta la cronología.

En el entorno se encuentran el sistema de pagos, el servicio de geolocalización, el sistema de notificaciones y el ERP o CRM interno. Los consideramos externos porque conservan responsabilidades propias y su integración debe confirmarse.

## 2:35–4:00 | Diagrama de contexto

[Mostrar el diagrama.]

El sistema bajo análisis es la plataforma centralizada. Recibe pedidos y consultas, y ofrece seguimiento al cliente. Intercambia pedidos, existencias, preparación y despacho con operación y almacén; entrega asignaciones al repartidor y recibe ubicación, estados e intentos. Soporte consulta la cronología y registra incidencias.

Con sistemas externos, el flujo es conceptual: pagos aporta estados de autorización, geolocalización información de posición o rutas, notificaciones transporta avisos y ERP/CRM comparte los datos empresariales que se acuerden. El diagrama no fija protocolos ni tecnología. Una pregunta clave que queda abierta es qué sistema será la fuente maestra de pedidos e inventario.

## 4:00–5:00 | Alcance

La propuesta inicial cubre el seguimiento logístico desde la recepción hasta la entrega o cierre de incidencia, la validación de inventario, la coordinación de preparación, la asignación operativa y el registro de eventos. También considera una vista para soporte y estado para el cliente.

En esta actividad dejamos fuera la selección tecnológica, el diseño interno, la optimización avanzada de rutas y el reemplazo del ERP o CRM. Delimitamos así el análisis al problema y sus fronteras.

## 5:00–5:45 | Riesgos y decisiones

Los riesgos más importantes son la inconsistencia de inventario, los pedidos duplicados, las entregas fallidas, la pérdida de trazabilidad, la coordinación deficiente y el acceso indebido a datos personales o de ubicación. Como decisión inicial proponemos una plataforma centralizada que registre el ciclo logístico y sus incidencias. No escogemos tecnologías porque todavía necesitamos conocer volúmenes, sistemas existentes, conectividad y requisitos de disponibilidad.

## 5:45–6:15 | Cierre

El siguiente paso es validar los supuestos con las áreas de operación, almacén, soporte y tecnología. Con una línea base podremos definir objetivos medibles y luego evaluar alternativas de arquitectura. Gracias.

## Antes de publicar

- Reemplazar los campos entre corchetes.
- Mostrar el diagrama con texto legible.
- Confirmar que no se expongan datos personales reales en la grabación.
- Publicar en YouTube, Google Drive o Microsoft Teams y pegar el enlace en el README.
