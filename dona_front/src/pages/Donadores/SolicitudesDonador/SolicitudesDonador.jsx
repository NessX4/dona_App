import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/DonadoresHeader";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import "./SolicitudesDonador.css";

const SolicitudesDonador = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [sdLoading, setSdLoading] = useState(true);
  const [sdError, setSdError] = useState(null);
  const [sdSolicitudAEliminar, setSdSolicitudAEliminar] = useState(null);
  const [sdSolicitudAAceptar, setSdSolicitudAAceptar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const sdCargarDatos = async () => {
    try {
      const [solicRes, pubRes, sucRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/solicitudes/solicitudes/"),
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
      ]);

      if (!solicRes.ok) throw new Error("Error al obtener solicitudes");
      if (!pubRes.ok) throw new Error("Error al obtener publicaciones");
      if (!sucRes.ok) throw new Error("Error al obtener sucursales");

      const [solicData, pubData, sucData] = await Promise.all([
        solicRes.json(),
        pubRes.json(),
        sucRes.json(),
      ]);

      const solicitudesArray = solicData.results || solicData;
      const publicacionesArray = pubData.results || pubData;
      const sucursalesArray = sucData.results || sucData;

      const solicitudesConDetalles = solicitudesArray.map((solicitud) => {
        const publicacion = publicacionesArray.find(
          (p) => p.id === solicitud.publicacion
        ) || null;

        let receptorSucursal = null;

        if (typeof solicitud.receptor === "object" && solicitud.receptor !== null) {
          receptorSucursal = solicitud.receptor;
        } else {
          receptorSucursal = sucursalesArray.find(
            (s) => s.id === solicitud.receptor
          ) || null;
        }

        return {
          ...solicitud,
          publicacionDetalle: publicacion,
          receptorDetalle: receptorSucursal,
        };
      });

      setSolicitudes(solicitudesConDetalles);
      setSdLoading(false);
    } catch (err) {
      setSdError(err.message);
      setSdLoading(false);
    }
  };

  useEffect(() => {
    sdCargarDatos();
  }, []);

  const sdSolicitudesFiltradas = solicitudes.filter(
    (solicitud) => solicitud.estado.toLowerCase() !== "completada"
  );

  const sdAceptarSolicitud = (id) => {
    setSdSolicitudAAceptar(id);
  };

  const sdConfirmarAceptar = async () => {
    if (!sdSolicitudAAceptar) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/solicitudes/solicitudes/${sdSolicitudAAceptar}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: "Aceptada" }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la solicitud");
      }

      setSolicitudes((prev) =>
        prev.map((sol) =>
          sol.id === sdSolicitudAAceptar ? { ...sol, estado: "Aceptada" } : sol
        )
      );
      setSdSolicitudAAceptar(null);
    } catch (error) {
      alert("Error al aceptar la solicitud: " + error.message);
    }
  };

  const sdCancelarAceptar = () => {
    setSdSolicitudAAceptar(null);
  };

  const sdConfirmarEliminar = (id) => {
    setSdSolicitudAEliminar(id);
  };

  const sdCancelarEliminar = () => {
    setSdSolicitudAEliminar(null);
  };

  const sdEliminarSolicitud = async () => {
    if (!sdSolicitudAEliminar) return;

    setEliminando(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/solicitudes/solicitudes/${sdSolicitudAEliminar}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la solicitud");
      }

      setSolicitudes((prev) => prev.filter((sol) => sol.id !== sdSolicitudAEliminar));
      setSdSolicitudAEliminar(null);
    } catch (error) {
      alert("Error al eliminar la solicitud: " + error.message);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="sd-container">
        <h1 className="sd-title">Solicitudes</h1>

        {sdLoading && <p className="sd-loading">Cargando solicitudes...</p>}
        {sdError && <p className="sd-error">{sdError}</p>}

        {!sdLoading && !sdError && sdSolicitudesFiltradas.length === 0 && (
          <p className="sd-no-data">No hay solicitudes disponibles.</p>
        )}

        {!sdLoading && !sdError && sdSolicitudesFiltradas.length > 0 && (
          <table className="sd-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Publicación</th>
                <th>Receptor</th>
                <th>Estado</th>
                <th>Comentarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sdSolicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.id} className="sd-table-row">
                  <td className="sd-table-cell">{solicitud.id}</td>
                  <td className="sd-table-cell">{solicitud.publicacionDetalle?.titulo || "N/A"}</td>
                  <td className="sd-table-cell">{solicitud.receptorDetalle?.nombre || "N/A"}</td>
                  <td className="sd-table-cell">
                    <span className={`sd-status sd-status-${solicitud.estado.toLowerCase()}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td className="sd-table-cell">{solicitud.comentarios || "-"}</td>
                  <td className="sd-table-cell sd-actions">
                    <button
                      className="sd-btn-aceptar"
                      onClick={() => sdAceptarSolicitud(solicitud.id)}
                      title="Aceptar"
                      aria-label="Aceptar solicitud"
                      disabled={solicitud.estado === "Aceptada"}
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      className="sd-btn-eliminar"
                      onClick={() => sdConfirmarEliminar(solicitud.id)}
                      title="Eliminar"
                      aria-label="Eliminar solicitud"
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

        {/* Modal de confirmación de aceptación */}
        {sdSolicitudAAceptar && (
          <div className="sd-modal-overlay" onClick={sdCancelarAceptar}>
            <div 
              className="sd-modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <p className="sd-modal-message">¿Estás seguro que deseas aceptar esta solicitud?</p>
              
              <div className="sd-modal-buttons">
                <button
                  className="sd-btn-cancelar"
                  onClick={sdCancelarAceptar}
                  disabled={eliminando}
                >
                  Cancelar
                </button>
                <button
                  className="sd-btn-confirmar-aceptar"
                  onClick={sdConfirmarAceptar}
                  disabled={eliminando}
                >
                  {eliminando ? "Procesando..." : "Aceptar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {sdSolicitudAEliminar && (
          <div className="sd-modal-overlay" onClick={sdCancelarEliminar}>
            <div 
              className="sd-modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <p className="sd-modal-message">¿Estás seguro que deseas eliminar esta solicitud?</p>
              <p className="sd-modal-warning">Esta acción no se puede deshacer</p>
              
              <div className="sd-modal-buttons">
                <button
                  className="sd-btn-cancelar"
                  onClick={sdCancelarEliminar}
                  disabled={eliminando}
                >
                  Cancelar
                </button>
                <button
                  className="sd-btn-confirmar-eliminar"
                  onClick={sdEliminarSolicitud}
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

export default SolicitudesDonador;