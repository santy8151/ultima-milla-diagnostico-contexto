"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Activity, ArrowDown, ArrowDownToLine, ArrowUpRight, Bell, Bike, Box, Check, ChevronDown,
  CircleAlert, Clock3, Command, MapPin, Menu, MoreHorizontal, Package, Plus, Search,
  SlidersHorizontal, Truck, X,
} from "lucide-react";
import { STATUS_LABELS, type Order, type OrderStatus } from "@/core/domain/order";

type Filter = "TODOS" | OrderStatus;
type Toast = { kind: "success" | "error"; message: string } | null;
const statusOrder: OrderStatus[] = ["RECIBIDO", "PREPARANDO", "EN_RUTA", "ENTREGADO", "INCIDENCIA"];
function formatTime(iso: string) {
  return new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function StatusPill({ status }: { status: OrderStatus }) {
  return <span className={`status-pill status-${status.toLowerCase()}`}><i />{STATUS_LABELS[status]}</span>;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Filter>("TODOS");
  const [query, setQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("TODOS");
  const [priorityFilter, setPriorityFilter] = useState("TODAS");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [insightModal, setInsightModal] = useState<"INVENTARIO" | "ANALITICA" | "REPARTIDORES" | null>(null);
  const [systemLabel, setSystemLabel] = useState("Conectando…");
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  const loadOrders = useCallback(async () => {
    try {
      const [response, healthResponse] = await Promise.all([
        fetch("/api/orders", { cache: "no-store" }),
        fetch("/api/health", { cache: "no-store" }),
      ]);
      const payload = await response.json();
      const health = await healthResponse.json();
      if (!response.ok) throw new Error(payload.error || "Error al cargar pedidos");
      setOrders(payload.data as Order[]);
      setSystemLabel(health.persistence === "postgresql" ? "PostgreSQL conectado" : "Persistencia local activa");
      setLastSync(new Intl.DateTimeFormat("es-CO", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    } catch (error) {
      setToast({ kind: "error", message: error instanceof Error ? error.message : "No se pudo conectar con la API" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadOrders(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadOrders]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const counts = useMemo(() => ({
    TODOS: orders.length,
    RECIBIDO: orders.filter((order) => order.status === "RECIBIDO").length,
    PREPARANDO: orders.filter((order) => order.status === "PREPARANDO").length,
    EN_RUTA: orders.filter((order) => order.status === "EN_RUTA").length,
    ENTREGADO: orders.filter((order) => order.status === "ENTREGADO").length,
    INCIDENCIA: orders.filter((order) => order.status === "INCIDENCIA").length,
  }), [orders]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es-CO");
    return orders.filter((order) => {
      const statusMatches = filter === "TODOS" || order.status === filter;
      const searchMatches = !normalized || [order.id, order.customer, order.address, order.courier || "", ...order.items]
        .some((part) => part.toLocaleLowerCase("es-CO").includes(normalized));
      const warehouseMatches = warehouseFilter === "TODOS" || order.warehouse === warehouseFilter;
      const priorityMatches = priorityFilter === "TODAS" || order.priority === priorityFilter;
      return statusMatches && searchMatches && warehouseMatches && priorityMatches;
    });
  }, [filter, orders, priorityFilter, query, warehouseFilter]);

  async function updateOrder(id: string, status: OrderStatus) {
    setBusy(true);
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "No se pudo actualizar el pedido");
      setOrders((current) => current.map((order) => order.id === id ? payload.data as Order : order));
      setSelected(payload.data as Order);
      setToast({ kind: "success", message: "Estado del pedido actualizado." });
    } catch (error) {
      setToast({ kind: "error", message: error instanceof Error ? error.message : "Error inesperado" });
    } finally {
      setBusy(false);
    }
  }

  async function createOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      customer: String(form.get("customer") || ""),
      email: String(form.get("email") || ""),
      address: String(form.get("address") || ""),
      items: String(form.get("items") || "").split(",").map((item) => item.trim()).filter(Boolean),
      priority: form.get("priority") === "Prioritario" ? "Prioritario" : "Estándar",
      warehouse: String(form.get("warehouse") || ""),
      courier: String(form.get("courier") || "").trim() || null,
      eta: String(form.get("eta") || "Hoy, 5:00 p. m."),
    };
    try {
      const response = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "No se pudo crear el pedido");
      setOrders((current) => [result.data as Order, ...current]);
      setCreateOpen(false);
      setToast({ kind: "success", message: "Pedido creado correctamente." });
    } catch (error) {
      setToast({ kind: "error", message: error instanceof Error ? error.message : "Error inesperado" });
    } finally {
      setBusy(false);
    }
  }

  function exportOrders() {
    const columns = ["Pedido", "Cliente", "Correo", "Dirección", "Estado", "Prioridad", "Almacén", "Repartidor", "Entrega estimada"];
    const rows = filtered.map((order) => [order.id, order.customer, order.email, order.address, STATUS_LABELS[order.status], order.priority, order.warehouse, order.courier || "Sin asignar", order.eta]);
    const csv = [columns, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "ruta-clara-pedidos.csv";
    link.click();
    URL.revokeObjectURL(url);
    setToast({ kind: "success", message: `Exportados ${rows.length} pedidos a CSV.` });
  }

  const activeOrders = counts.RECIBIDO + counts.PREPARANDO + counts.EN_RUTA + counts.INCIDENCIA;
  const warehouses = [...new Set(orders.map((order) => order.warehouse))];
  const couriers = [...new Set(orders.map((order) => order.courier).filter((courier): courier is string => Boolean(courier)))];

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <a className="brand" href="#inicio"><span className="brand-mark"><Command size={19} strokeWidth={2.5} /></span><span>ruta<span className="brand-light">clara</span><small>LOGISTICS OS</small></span></a>
          <div className="workspace"><span className="workspace-avatar">RC</span><span><strong>Retail Colombia</strong><small>Workspace principal</small></span><ChevronDown size={15} /></div>
        <div className="nav-label">OPERACIÓN</div>
        <nav className="side-nav">
          <button className="nav-item active"><Package size={18} />Pedidos <span className="nav-count">{activeOrders}</span></button>
          <button className="nav-item" onClick={() => setFilter("EN_RUTA")}><MapPin size={18} />En ruta</button>
          <button className="nav-item" onClick={() => setFilter("INCIDENCIA")}><CircleAlert size={18} />Incidencias{counts.INCIDENCIA > 0 && <span className="nav-alert">{counts.INCIDENCIA}</span>}</button>
          <button className="nav-item" onClick={() => setInsightModal("INVENTARIO")}><Box size={18} />Inventario</button>
        </nav>
        <div className="nav-label nav-label-spaced">GESTIÓN</div>
        <nav className="side-nav">
          <button className="nav-item" onClick={() => setInsightModal("ANALITICA")}><Activity size={18} />Analítica</button>
          <button className="nav-item" onClick={() => setInsightModal("REPARTIDORES")}><Bike size={18} />Repartidores</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="status-card"><span className="live-dot" /><span><strong>{systemLabel}</strong><small>{lastSync ? `Consulta más reciente ${lastSync}` : "Esperando conexión"}</small></span><ArrowUpRight size={15} /></div>
          <div className="profile"><div className="profile-avatar">EO</div><span><strong>Equipo operativo</strong><small>Administrador</small></span><MoreHorizontal size={18} /></div>
        </div>
      </aside>

      <section className="main-area" id="inicio">
        <header className="topbar">
          <button className="mobile-menu icon-button" aria-label="Abrir menú" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Operación</span><span className="crumb-slash">/</span><strong>Pedidos</strong></div>
          <div className="top-actions"><span className="today-label">{new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</span><button className="icon-button notification-button" aria-label="Notificaciones" onClick={() => setFilter("INCIDENCIA")}><Bell size={18} /><i /></button><div className="top-avatar">EO</div></div>
        </header>

        <div className="page-content">
          <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" />CENTRO DE OPERACIONES</div><h1>Pedidos</h1><p>Visibilidad del estado de cada entrega, desde la compra hasta la puerta.</p></div><div className="heading-actions"><button className="button button-secondary" onClick={exportOrders}><ArrowDownToLine size={16} />Exportar</button><button className="button button-primary" onClick={() => setCreateOpen(true)}><Plus size={17} />Nuevo pedido</button></div></div>

          <div className="metric-grid">
            <Metric title="Pedidos activos" value={String(activeOrders).padStart(2, "0")} note="En proceso" icon={<Package size={17} />} trend="Operación" />
            <Metric title="En camino" value={String(counts.EN_RUTA).padStart(2, "0")} note="Asignados a ruta" icon={<Truck size={17} />} trend="Seguimiento" />
            <Metric title="Pedidos entregados" value={String(counts.ENTREGADO).padStart(2, "0")} note="Estado completado" icon={<Check size={17} />} trend="Cerrados" />
            <Metric title="Requieren atención" value={String(counts.INCIDENCIA).padStart(2, "0")} note="Incidencias abiertas" icon={<CircleAlert size={17} />} trend={counts.INCIDENCIA ? "Revisar" : "Al día"} alert={counts.INCIDENCIA > 0} />
          </div>

          <section className="orders-panel">
            <div className="panel-heading"><div><div className="panel-title-line"><h2>Seguimiento de pedidos</h2><span className="total-chip">{filtered.length} pedidos</span></div><p>Consulta y gestiona el estado de cada orden.</p></div><button className="icon-button panel-more" aria-label="Actualizar pedidos" onClick={() => void loadOrders()}><MoreHorizontal size={19} /></button></div>
            <div className="toolbar"><div className="filter-tabs" role="tablist" aria-label="Filtrar pedidos">
              {(["TODOS", "RECIBIDO", "PREPARANDO", "EN_RUTA", "ENTREGADO", "INCIDENCIA"] as Filter[]).map((key) => <button key={key} role="tab" aria-selected={filter === key} className={`filter-tab ${filter === key ? "selected" : ""}`} onClick={() => setFilter(key)}>{key === "TODOS" ? "Todos" : STATUS_LABELS[key]}<span>{counts[key]}</span></button>)}
            </div><div className="table-tools"><label className="search-box"><Search size={16} /><input aria-label="Buscar pedido" placeholder="Buscar pedido..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><button className={`button button-filter ${filtersOpen ? "filter-open" : ""}`} onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}><SlidersHorizontal size={16} />Filtros<ArrowDown size={13} /></button></div></div>
            {filtersOpen && <div className="advanced-filters"><label>Almacén<select value={warehouseFilter} onChange={(event) => setWarehouseFilter(event.target.value)}><option value="TODOS">Todos</option>{[...new Set(orders.map((order) => order.warehouse))].map((warehouse) => <option key={warehouse}>{warehouse}</option>)}</select></label><label>Prioridad<select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}><option value="TODAS">Todas</option><option>Estándar</option><option>Prioritario</option></select></label><button onClick={() => { setWarehouseFilter("TODOS"); setPriorityFilter("TODAS"); setQuery(""); setFilter("TODOS"); }}>Limpiar filtros</button></div>}

            <div className="table-wrap"><table><thead><tr><th>ORDEN</th><th>CLIENTE</th><th>ESTADO</th><th>ALMACÉN</th><th>REPARTIDOR</th><th>ENTREGA ESTIMADA</th><th /></tr></thead><tbody>
              {loading ? <tr><td colSpan={7} className="empty-cell">Cargando pedidos…</td></tr> : filtered.map((order) => <tr key={order.id} onClick={() => setSelected(order)} className="order-row"><td><span className="order-id">{order.id}</span><small className="row-secondary">{order.items.length} {order.items.length === 1 ? "artículo" : "artículos"}</small></td><td><div className="customer-cell"><span className="customer-avatar" style={{ "--avatar": avatarColor(order.customer) } as React.CSSProperties}>{initials(order.customer)}</span><span><strong>{order.customer}</strong><small>{order.email}</small></span></div></td><td><StatusPill status={order.status} /></td><td><span className="warehouse-name"><span className="warehouse-dot" />{order.warehouse}</span></td><td>{order.courier ? <span className="courier-name"><span className="courier-avatar">{initials(order.courier)}</span>{order.courier}</span> : <span className="unassigned">Sin asignar</span>}</td><td><span className="eta-text">{order.eta}</span><small className="row-secondary">Actualizado {formatTime(order.updatedAt)}</small></td><td><button className="row-action" aria-label={`Ver ${order.id}`} onClick={(event) => { event.stopPropagation(); setSelected(order); }}><MoreHorizontal size={18} /></button></td></tr>)}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="empty-cell"><Package size={24} /><strong>No hay pedidos para mostrar</strong><span>Prueba otro filtro o registra un nuevo pedido.</span></td></tr>}
            </tbody></table></div>
            <div className="panel-footer"><span>Mostrando <strong>{filtered.length}</strong> de <strong>{orders.length}</strong> pedidos</span><div className="pagination"><button disabled>Anterior</button><button className="page-current">1</button><button disabled>Siguiente</button></div></div>
          </section>
          <footer className="page-footer"><span>Ruta Clara Logistics OS <span>·</span> Panel de operaciones</span><span><span className="live-dot" />{lastSync ? `Consultado ${lastSync}` : "Conectando"}<button onClick={() => void loadOrders()}>Actualizar</button></span></footer>
        </div>
      </section>

      {createOpen && <Modal title="Registrar nuevo pedido" subtitle="Ingresa la información inicial de la orden." onClose={() => setCreateOpen(false)}><form className="form-grid" onSubmit={createOrder}>
        <label>Nombre del cliente<input name="customer" placeholder="Nombre completo" required minLength={2} /></label><label>Correo electrónico<input name="email" type="email" placeholder="cliente@correo.com" required /></label>
        <label className="field-wide">Dirección de entrega<input name="address" placeholder="Dirección completa" required minLength={5} /></label><label className="field-wide">Artículos <small>Separados por coma</small><input name="items" placeholder="Producto 1, Producto 2" required /></label>
        <label>Almacén<select name="warehouse"><option>CEDI Norte</option><option>CEDI Occidente</option><option>Tienda Chapinero</option><option>Tienda Usaquén</option></select></label><label>Prioridad<select name="priority"><option>Estándar</option><option>Prioritario</option></select></label>
        <label>Repartidor<input name="courier" placeholder="Sin asignar" /></label><label>Entrega estimada<input name="eta" placeholder="Hoy, 5:00 p. m." defaultValue="Hoy, 5:00 p. m." /></label>
        <div className="modal-actions field-wide"><button type="button" className="button button-secondary" onClick={() => setCreateOpen(false)}>Cancelar</button><button className="button button-primary" disabled={busy}>{busy ? "Guardando…" : <><Plus size={16} />Crear pedido</>}</button></div>
      </form></Modal>}

      {selected && <Modal title={`Pedido ${selected.id}`} subtitle={`${selected.customer} · ${selected.address}`} onClose={() => setSelected(null)}><div className="detail-top"><StatusPill status={selected.status} /><span className="priority-tag">{selected.priority}</span><span className="detail-eta"><Clock3 size={14} />{selected.eta}</span></div><div className="detail-grid"><div><small>ALMACÉN</small><strong>{selected.warehouse}</strong></div><div><small>REPARTIDOR</small><strong>{selected.courier || "Sin asignar"}</strong></div><div className="field-wide"><small>ARTÍCULOS</small><strong>{selected.items.join(", ")}</strong></div></div><h3 className="timeline-heading">Actividad del pedido</h3><div className="timeline">{[...selected.events].reverse().map((item, index) => <div className="timeline-item" key={item.id}><span className={`timeline-dot ${index === 0 ? "current" : ""}`} /><div><strong>{STATUS_LABELS[item.status]}</strong><p>{item.description}</p><small>{new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.occurredAt))}</small></div></div>)}</div><label className="update-label">Actualizar estado<select disabled={busy} value={selected.status} onChange={(event) => void updateOrder(selected.id, event.target.value as OrderStatus)}>{statusOrder.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}</select></label></Modal>}

      {insightModal && <Modal title={insightModal === "INVENTARIO" ? "Preparación por almacén" : insightModal === "ANALITICA" ? "Resumen operativo" : "Repartidores asignados"} subtitle={insightModal === "INVENTARIO" ? "Pedidos registrados por centro de preparación; no representa stock físico." : "Indicadores calculados sobre los pedidos cargados."} onClose={() => setInsightModal(null)}>
        {insightModal === "INVENTARIO" && <div className="summary-list">{warehouses.map((warehouse) => <div className="summary-row" key={warehouse}><span><Box size={16} />{warehouse}</span><strong>{orders.filter((order) => order.warehouse === warehouse).length} pedidos</strong></div>)}</div>}
        {insightModal === "ANALITICA" && <div className="summary-list">{statusOrder.map((status) => <div className="summary-row" key={status}><StatusPill status={status} /><strong>{counts[status]} pedidos</strong></div>)}<div className="summary-total"><span>Total registrado</span><strong>{orders.length}</strong></div></div>}
        {insightModal === "REPARTIDORES" && <div className="summary-list">{couriers.length ? couriers.map((courier) => <div className="summary-row" key={courier}><span><span className="courier-avatar">{initials(courier)}</span>{courier}</span><strong>{orders.filter((order) => order.courier === courier && order.status !== "ENTREGADO").length} activos</strong></div>) : <p className="empty-insight">Aún no hay repartidores asignados a pedidos.</p>}</div>}
      </Modal>}

      {toast && <div className={`toast toast-${toast.kind}`} role="status">{toast.kind === "success" ? <Check size={17} /> : <CircleAlert size={17} />}{toast.message}<button aria-label="Cerrar" onClick={() => setToast(null)}><X size={16} /></button></div>}
    </main>
  );
}

function Metric({ title, value, note, icon, trend, alert = false }: { title: string; value: string; note: string; icon: React.ReactNode; trend: string; alert?: boolean }) {
  return <article className={`metric-card ${alert ? "metric-alert" : ""}`}><div className="metric-top"><span className="metric-icon">{icon}</span><button aria-label={`${title}: ${note}`}><MoreHorizontal size={17} /></button></div><div className="metric-value">{value}<span className={`metric-trend ${alert ? "trend-alert" : ""}`}>{trend}</span></div><div className="metric-title">{title}</div><div className="metric-note">{note}</div></article>;
}

function Modal({ title, subtitle, children, onClose }: { title: string; subtitle: string; children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header className="modal-header"><div><h2 id="modal-title">{title}</h2><p>{subtitle}</p></div><button className="icon-button" aria-label="Cerrar" onClick={onClose}><X size={19} /></button></header>{children}</section></div>;
}

function initials(name: string) { return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }
function avatarColor(name: string) { const palette = ["#e9e5ff", "#e1f2ec", "#fff0dc", "#e2eefb", "#f8e6e9"]; return palette[name.charCodeAt(0) % palette.length]; }
