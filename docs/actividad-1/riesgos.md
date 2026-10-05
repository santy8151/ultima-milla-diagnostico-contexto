# Registro de riesgos iniciales

Escala cualitativa preliminar: probabilidad e impacto bajo/medio/alto. Se debe recalibrar con datos de la empresa. Las mitigaciones son propuestas, no controles implementados.

| ID | Riesgo | Prob. | Impacto | Señal temprana | Respuesta inicial |
|---|---|---|---|---|---|
| R1 | Pedidos duplicados por reintentos o entradas multicanal. | Media | Alto | Mismo pedido aparece más de una vez o con IDs distintos. | Definir identificador y reglas de deduplicación; monitorear duplicados y conservar origen. |
| R2 | Inventario inconsistente entre plataforma y almacenes/ERP. | Alta | Alto | Reserva supera existencias o se cancela tras prometer disponibilidad. | Acordar fuente maestra, frecuencia y reglas de reserva/ajuste; alertar diferencias. |
| R3 | Entregas fallidas o retrasadas por asignación inadecuada o cambios de ruta. | Media | Alto | Aumentan intentos fallidos y pedidos fuera de ventana. | Registrar causas e intentos, definir reglas operativas y mecanismos de reasignación. |
| R4 | Pérdida de trazabilidad por eventos tardíos, omitidos o contradictorios. | Media | Alto | Pedido sin avance o estados que retroceden sin motivo registrado. | Mantener cronología con origen/tiempo, validación de transiciones y cola de excepciones. |
| R5 | Mala coordinación entre almacén, ruta y soporte. | Alta | Alto | Se repiten contactos, instrucciones contradictorias y tiempo de resolución alto. | Acordar estados compartidos, responsables y flujo de escalamiento. |
| R6 | Indisponibilidad o cambios de interfaces de sistemas externos. | Media | Alto | Fallan sincronizaciones o se acumulan eventos pendientes. | Confirmar contratos y responsables; acordar manejo de fallos y conciliación. |
| R7 | Exposición o uso indebido de datos de clientes y ubicación. | Media | Alto | Accesos no justificados o datos visibles a roles incorrectos. | Definir permisos por rol, datos mínimos y reglas de retención con responsables. |
| R8 | Baja adopción por operadores o repartidores. | Media | Medio | Se mantienen registros paralelos o faltan actualizaciones. | Incluir usuarios en validación, reducir pasos y acordar capacitación. |
| R9 | Crecimiento operativo sin control en picos o nuevas zonas. | Media | Alto | Aumentan pedidos pendientes, latencia o trabajo manual. | Medir volúmenes y picos; definir capacidad y seguimiento como requisitos por validar. |
| R10 | El alcance inicial crece hasta incluir reemplazo de sistemas comerciales. | Media | Medio | Se agregan módulos ajenos a coordinación logística antes de validar el núcleo. | Acordar límites, responsables de decisión y priorización por fases. |

## Riesgos prioritarios para validar primero

1. Consistencia de inventario y fuente maestra.
2. Integridad y actualización de eventos de pedido.
3. Coordinación operacional ante fallas y entregas fallidas.
4. Privacidad y acceso a datos de cliente y ubicación.
5. Capacidad de integración y continuidad de sistemas externos.
