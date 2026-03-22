# Feature Specification: Personal Budget App

**Feature Branch**: `001-personal-budget-app`  
**Created**: 2026-03-22  
**Status**: Draft  
**Input**: User description: "Desarrollar una App de Presupuesto Personal con gestión de presupuesto, registro de gastos, lógica de cuotas, CRUD, dashboard y diseño OLED Dark"

## User Scenarios & Testing _(mandatory)_

### User Story 1 — Gestión de Presupuesto Mensual (Priority: P1)

Como usuario, quiero establecer un límite de presupuesto mensual mediante un input numérico editable para controlar cuánto puedo gastar cada mes.

**Why this priority**: Sin un presupuesto definido no hay referencia contra la cual medir los gastos. Es el dato fundacional de toda la aplicación.

**Independent Test**: Abrir la app → ingresar un monto de presupuesto → confirmar que se persiste y se muestra correctamente al recargar.

**Acceptance Scenarios**:

1. **Given** la app se abre por primera vez, **When** el usuario ve el campo de presupuesto, **Then** muestra $0 como valor por defecto y el campo es editable.
2. **Given** el usuario ingresa un monto válido (ej. 500000), **When** confirma el valor, **Then** se persiste en el store y se refleja inmediatamente en el dashboard.
3. **Given** el usuario ingresa un valor negativo o texto no numérico, **When** intenta confirmar, **Then** el sistema rechaza la entrada y muestra un mensaje de error inline.
4. **Given** el usuario ya tiene un presupuesto guardado, **When** reabre la app, **Then** el presupuesto persiste con el último valor ingresado.

---

### User Story 2 — Registro de Gastos con Categorías (Priority: P1)

Como usuario, quiero registrar gastos seleccionando una categoría de pago (Tarjeta BBVA, Tarjeta Supervielle, Préstamo, Otros gastos) para organizar mis egresos por método de pago.

**Why this priority**: Sin la capacidad de registrar gastos, la app no tiene funcionalidad core. Es co-prioritario con el presupuesto.

**Independent Test**: Abrir el formulario de gasto → seleccionar categoría → ingresar monto y descripción → guardar → verificar que aparece en la lista.

**Acceptance Scenarios**:

1. **Given** el formulario de nuevo gasto, **When** el usuario selecciona una categoría del selector, **Then** las opciones disponibles son exactamente: "Tarjeta BBVA", "Tarjeta Supervielle", "Préstamo", "Otros gastos".
2. **Given** el usuario completa categoría, monto y descripción, **When** presiona guardar, **Then** el gasto se agrega a la lista y el total gastado se actualiza.
3. **Given** el usuario omite el monto o la categoría, **When** intenta guardar, **Then** el sistema muestra validación inline indicando los campos requeridos.
4. **Given** un gasto guardado exitosamente, **When** el usuario recarga la app, **Then** el gasto permanece visible gracias a la persistencia.

---

### User Story 3 — Lógica de Cuotas (Priority: P2)

Como usuario, quiero registrar gastos en cuotas indicando el monto por cuota y un detalle descriptivo (ej. "Cuota 2 de 6") para hacer seguimiento de pagos recurrentes.

**Why this priority**: Las cuotas son un patrón común en Argentina (tarjetas de crédito). Enriquece el registro de gastos pero depende de que US2 esté funcional.

**Independent Test**: Registrar un gasto con campos de cuota activos → verificar que se almacena el monto de cuota y el detalle de cuota → verificar que se muestra en la lista con la info de cuota.

**Acceptance Scenarios**:

1. **Given** el formulario de nuevo gasto, **When** el usuario activa la opción de cuotas, **Then** aparecen campos adicionales: "Monto de cuota" (numérico) y "Detalle de cuota" (texto, ej. "Cuota 2 de 6").
2. **Given** los campos de cuota están visibles, **When** el usuario ingresa monto de cuota y detalle, **Then** ambos se almacenan como parte del registro del gasto.
3. **Given** un gasto con cuotas registrado, **When** se muestra en la lista, **Then** incluye visualmente la información de cuota (monto de cuota y detalle) diferenciada del monto total.
4. **Given** la opción de cuotas está desactivada, **When** el usuario guarda el gasto, **Then** los campos de cuota no se persisten (son null/undefined).

---

### User Story 4 — CRUD Completo de Gastos (Priority: P2)

Como usuario, quiero editar y eliminar gastos existentes para corregir errores o remover gastos duplicados.

**Why this priority**: Permite gestionar la data ya ingresada. Depende de US2 (crear gastos) pero es esencial para la usabilidad completa.

**Independent Test**: Crear un gasto → editarlo → verificar cambios → eliminarlo → verificar que desaparece y el total se recalcula.

**Acceptance Scenarios**:

1. **Given** un gasto existente en la lista, **When** el usuario presiona editar, **Then** se abre el formulario pre-poblado con los datos actuales del gasto.
2. **Given** el formulario de edición abierto, **When** el usuario modifica campos y guarda, **Then** el gasto se actualiza en la lista y el total gastado se recalcula.
3. **Given** un gasto existente, **When** el usuario presiona eliminar, **Then** se muestra confirmación y al aceptar, el gasto se remueve y el total se recalcula.
4. **Given** cambios de edición/eliminación, **When** el usuario recarga la app, **Then** los cambios persisten correctamente.

---

### User Story 5 — Dashboard de Resumen (Priority: P2)

Como usuario, quiero ver un dashboard con el total gastado versus el presupuesto restante para tener visibilidad inmediata de mi situación financiera.

**Why this priority**: El dashboard es la pantalla principal y la interfaz visual que da sentido a los datos. Depende de US1 y US2.

**Independent Test**: Definir presupuesto + registrar gastos → verificar que el dashboard muestra correctamente total gastado, presupuesto restante y barra de progreso.

**Acceptance Scenarios**:

1. **Given** un presupuesto de $500.000 y gastos por $150.000, **When** el usuario ve el dashboard, **Then** muestra: Total gastado = $150.000, Restante = $350.000.
2. **Given** los gastos superan el presupuesto, **When** el usuario ve el dashboard, **Then** el indicador visual cambia a estado de alerta (rojo/destructive) mostrando el exceso.
3. **Given** no hay gastos registrados, **When** el usuario ve el dashboard, **Then** muestra el presupuesto completo como restante y una barra de progreso vacía.
4. **Given** el dashboard visible, **When** se agrega o elimina un gasto, **Then** los valores se actualizan en tiempo real sin necesidad de recargar.

---

### User Story 6 — Limpieza Total (Reset) (Priority: P3)

Como usuario, quiero un botón de "Limpieza Total" que borre todos los gastos y reinicie el presupuesto para empezar un nuevo período desde cero.

**Why this priority**: Función de conveniencia para ciclo mensual. No bloquea funcionalidad core pero completa la experiencia.

**Independent Test**: Registrar presupuesto y gastos → presionar "Limpieza Total" → confirmar → verificar que todo se reinicia a estado inicial.

**Acceptance Scenarios**:

1. **Given** hay gastos y presupuesto guardados, **When** el usuario presiona "Limpieza Total", **Then** se muestra un diálogo de confirmación advirtiendo que la acción es irreversible.
2. **Given** el diálogo de confirmación visible, **When** el usuario confirma, **Then** todos los gastos se eliminan y el presupuesto se reinicia a $0.
3. **Given** el diálogo de confirmación visible, **When** el usuario cancela, **Then** no se modifica ningún dato.
4. **Given** la limpieza total ejecutada, **When** el usuario recarga la app, **Then** el estado es idéntico a la primera apertura (sin gastos, presupuesto en $0).

---

### Edge Cases

- ¿Qué pasa cuando el usuario ingresa un presupuesto de $0? → Se permite; el dashboard muestra 0 restante y cualquier gasto genera estado de alerta.
- ¿Qué pasa cuando localStorage está corrupto o se borra externamente? → La app detecta datos inválidos y cae a valores por defecto (presupuesto $0, lista de gastos vacía) sin crash.
- ¿Qué pasa con montos extremadamente grandes (ej. > 999.999.999)? → Se define un límite razonable de $999.999.999; valores superiores se rechazan con validación.
- ¿Qué pasa si el detalle de cuota está vacío pero el monto de cuota tiene valor? → Ambos campos de cuota son opcionales pero si uno tiene valor, el otro se sugiere (no se bloquea el guardado).
- ¿Cómo se manejan decimales? → Montos son enteros (pesos argentinos sin centavos) para simplificar. Los inputs rechazan decimales.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE permitir establecer y editar un presupuesto mensual mediante input numérico.
- **FR-002**: El sistema DEBE proveer un selector de categoría de pago con exactamente 4 opciones fijas: "Tarjeta BBVA", "Tarjeta Supervielle", "Préstamo", "Otros gastos".
- **FR-003**: El sistema DEBE soportar campos opcionales de cuota: monto de cuota (numérico) y detalle de cuota (texto libre, ej. "Cuota 2 de 6").
- **FR-004**: El sistema DEBE implementar CRUD completo para gastos (crear, leer, editar, eliminar).
- **FR-005**: El sistema DEBE mostrar un dashboard con: total gastado, presupuesto restante, e indicador visual de progreso.
- **FR-006**: El sistema DEBE proveer una función de "Limpieza Total" con confirmación que reinicia todos los datos.
- **FR-007**: El sistema DEBE persistir todos los datos (presupuesto, gastos) usando Zustand con persist middleware hacia localStorage.
- **FR-008**: El sistema DEBE validar inputs numéricos (no negativos, no texto, rango 0–999.999.999, sin decimales).
- **FR-009**: El sistema DEBE actualizar el dashboard en tiempo real al agregar, editar o eliminar gastos.
- **FR-010**: El sistema DEBE implementar el design system "OLED Precision" definido en Stitch (Project ID: 17932324752529185753, Screen ID: 8f78962530234e7684ade2dd319f1ae0).

### Key Entities

- **Budget**: Representa el presupuesto mensual. Atributos: monto (entero), timestamp de última actualización.
- **Expense**: Representa un gasto individual. Atributos: id único, categoría (enum de 4 opciones), monto (entero), descripción (texto), monto de cuota (entero, opcional), detalle de cuota (texto, opcional), fecha de creación, fecha de actualización.
- **Category**: Enumeración fija de métodos de pago — "Tarjeta BBVA", "Tarjeta Supervielle", "Préstamo", "Otros gastos".

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El usuario puede definir un presupuesto y registrar su primer gasto en menos de 30 segundos desde la primera apertura.
- **SC-002**: El dashboard refleja correctamente total gastado y restante en tiempo real tras cada operación CRUD.
- **SC-003**: Todos los datos persisten correctamente entre sesiones (cerrar y reabrir navegador).
- **SC-004**: La función de "Limpieza Total" reinicia la app a estado inicial en un solo clic (más confirmación).
- **SC-005**: La interfaz respeta fielmente el design system "OLED Precision" de Stitch con fondo negro puro y alto contraste.
- **SC-006**: La app es completamente funcional en mobile (responsive, touch-friendly) y desktop.

## Assumptions

- La app opera 100% en el cliente (sin backend/API); todos los datos se almacenan localmente.
- La moneda es peso argentino (ARS); sin soporte multi-moneda.
- Las categorías de pago son fijas (no configurables por el usuario en esta versión).
- No se requiere autenticación ni manejo de usuarios múltiples.
- No se requiere exportación de datos ni reportes avanzados en esta versión.

## Stitch Design Reference

- **Project ID**: 17932324752529185753
- **Primary Screen**: "OLED Precision Dashboard - Sin Sidebar" (ID: 8f78962530234e7684ade2dd319f1ae0)
- **Design System**: asset-stub-assets-c6c2c3f5e73e4e4b88a782ab6dcd9e18-1774155224804
- **Available Screens**: "OLED Precision Dashboard - Fixed Layout", "OLED Precision Dashboard", "OLED Precision Dashboard - Actualizado", "OLED Precision Dashboard - Sin Sidebar"
- Los estilos y assets DEBEN consumirse mediante el MCP de Stitch para asegurar fidelidad visual.
