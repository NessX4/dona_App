import React, { useState, useEffect } from "react";
import VoluntarioHeader from "../../../components/DonadoresHeader";
import { FiTrash2 } from "react-icons/fi";
import "./NotificacionesDonador.css";

const NotificacionesDonador = () => {
const [notificaciones, setNotificaciones] = useState([]);
const [editarVisible, setEditarVisible] = useState(false);
const [notificacionActiva, setNotificacionActiva] = useState(null);
const [notificacionEliminar, setNotificacionEliminar] = useState(null);
const [eliminando, setEliminando] = useState(false);

useEffect(() => {
const usuarioId = localStorage.getItem("usuarioId");

if (!usuarioId) return;

fetch("http://127.0.0.1:8000/api/notificaciones/notifiaciones/")
.then((res) => {
if (!res.ok) {
throw new Error("Error al cargar notificaciones");
}
return res.json();
})
.then((data) => {
        
      const adaptadas = data
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .map((n) => ({
      ...n,
      titulo: "Notificación",
      leida: n.leido,
      }));
setNotificaciones(adaptadas);
})
.catch((error) => {
console.error("Error al cargar notificaciones:", error);
});
}, []);

const abrirNotificacion = (notificacion) => {
setNotificacionActiva(notificacion);
setEditarVisible(true);

    // Marcar como leída solo si no está leída
if (!notificacion.leida) {
setNotificaciones((prev) =>
prev.map((n) =>
n.id === notificacion.id ? { ...n, leida: true } : n
)
);
}
};

const cerrarModal = () => {
setEditarVisible(false);
setNotificacionActiva(null);
};

const confirmarEliminar = (notificacion) => {
setNotificacionEliminar(notificacion);
};

const cancelarEliminar = () => {
setNotificacionEliminar(null);
};

const eliminarNotificacion = async () => {
if (!notificacionEliminar) return;
    

const id = notificacionEliminar.id;
setEliminando(true);

try {
const response = await fetch(
`http://127.0.0.1:8000/api/notificaciones/notifiaciones/${id}/`,
{
method: "DELETE",
headers: {
"Content-Type": "application/json",
},
}
);

if (!response.ok) {
throw new Error(`Error HTTP! estado: ${response.status}`);
}

setNotificaciones((prev) => prev.filter((n) => n.id !== id));
setNotificacionEliminar(null);
} catch (error) {
console.error("Error al eliminar notificación:", error);
alert("No se pudo eliminar la notificación. Por favor intenta nuevamente.");
} finally {
setEliminando(false);
}
};

const formatoFecha = (fecha) => {
return new Date(fecha).toLocaleString("es-MX", {
day: "2-digit",
month: "short",
year: "numeric",
hour: "2-digit",
minute: "2-digit",
});
};

return (
<>
<VoluntarioHeader />

<main className="nd-container">
<h1 className="nd-title">Notificaciones</h1>

{notificaciones.length === 0 ? (
<p className="nd-loading">No hay notificaciones.</p>
) : (
<table className="nd-tabla">
<thead>
<tr>
<th>ID</th>
<th>Título</th>
<th>Mensaje</th>
<th>Fecha</th>
<th>Estado</th>
<th>Acciones</th>
</tr>
</thead>
<tbody>
{notificaciones.map((notificacion) => (
<tr
key={notificacion.id}
className={
notificacion.leida
? "nd-fila-leida"
: "nd-fila-no-leida"
}
onClick={() => abrirNotificacion(notificacion)}
>
<td>{notificacion.id}</td>
<td>{notificacion.titulo}</td>
<td>{notificacion.mensaje.substring(0, 50)}...</td>
<td>{formatoFecha(notificacion.fecha)}</td>
<td>
<span
className={`nd-status ${
                       notificacion.leida ? "nd-leido" : "nd-no-leido"
                     }`}
>
{notificacion.leida ? "Leído" : "No leído"}
</span>
</td>
<td onClick={(e) => e.stopPropagation()}>
<button
className="nd-btn-eliminar"
onClick={(e) => {
e.stopPropagation();
confirmarEliminar(notificacion);
}}
title="Eliminar notificación"
aria-label="Eliminar notificación"
disabled={eliminando}
>
<FiTrash2 size={18} />
</button>
</td>
</tr>
))}
</tbody>
</table>
)}

{/* Modal para ver notificación */}
{editarVisible && notificacionActiva && (
<div className="nd-modal-overlay" onClick={cerrarModal}>
<div
className="nd-modal-content"
onClick={(e) => e.stopPropagation()}
>
<h2>{notificacionActiva.titulo}</h2>
<p className="nd-modal-mensaje">{notificacionActiva.mensaje}</p>
<small className="nd-modal-fecha">
{formatoFecha(notificacionActiva.fecha)}
</small>
<div className="nd-modal-btns">
<button
className="nd-modal-btn-cerrar"
onClick={cerrarModal}
>
Cerrar
</button>
</div>
</div>
</div>
)}

{/* Modal de confirmación para eliminar */}
{notificacionEliminar && (
<div className="nd-modal-overlay" onClick={cancelarEliminar}>
<div
className="nd-modal-content nd-modal-confirmacion"
onClick={(e) => e.stopPropagation()}
>
<p>¿Estás seguro de eliminar esta notificación?</p>
<p className="nd-notificacion-titulo">
{notificacionEliminar.titulo}
</p>
<div className="nd-modal-btns">
<button
className="nd-modal-btn-cancelar"
onClick={cancelarEliminar}
disabled={eliminando}
>
Cancelar
</button>
<button
className="nd-modal-btn-confirmar"
onClick={eliminarNotificacion}
disabled={eliminando}
>
{eliminando ? "Eliminando..." : "Eliminar"}
</button>
</div>
</div>
</div>
)}
</main>
</>
);
};

export default NotificacionesDonador;