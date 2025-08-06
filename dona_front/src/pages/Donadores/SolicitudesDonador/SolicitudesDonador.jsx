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
  const [procesandoAceptar, setProcesandoAceptar] = useState(false);
  const [procesandoEliminar, setProcesandoEliminar] = useState(false);

  const sdCargarDatos = async () => {
    try {
      const [solicRes, pubRes, sucRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/solicitudes/solicitudes/"),
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
      ]);

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
      setPublicaciones(publicacionesArray);
      setSucursales(sucursalesArray);
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
    setProcesandoAceptar(true);

    try {
      // 1. Marcar solicitud como completada
      const response = await fetch(
        `http://127.0.0.1:8000/api/solicitudes/solicitudes/${sdSolicitudAAceptar}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: "Completada" }),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar la solicitud");

      // 2. Obtener ID de la publicación relacionada
      const solicitudActual = solicitudes.find((s) => s.id === sdSolicitudAAceptar);
      const publicacionId = solicitudActual?.publicacion;

      // 3. Cambiar estado de la publicación (9 = Completada)
      if (publicacionId) {
        const pubResponse = await fetch(
          `http://127.0.0.1:8000/api/donaciones/publicaciones/${publicacionId}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: 9 }),
          }
        );

        if (!pubResponse.ok) throw new Error("Error al actualizar la publicación");
      }

      // 4. Refrescar estado local
      setSolicitudes((prev) =>
        prev.map((sol) =>
          sol.id === sdSolicitudAAceptar ? { ...sol, estado: "Completada" } : sol
        )
      );

      setSdSolicitudAAceptar(null);
    } catch (error) {
      alert("Error al completar la solicitud: " + error.message);
    } finally {
      setProcesandoAceptar(false);
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
    setProcesandoEliminar(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/solicitudes/solicitudes/${sdSolicitudAEliminar}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar la solicitud");

      setSolicitudes((prev) =>
        prev.filter((sol) => sol.id !== sdSolicitudAEliminar)
      );
      setSdSolicitudAEliminar(null);
    } catch (error) {
      alert("Error al eliminar la solicitud: " + error.message);
    } finally {
      setProcesandoEliminar(false);
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
                <th>Publicación</th>
                <th>Receptor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sdSolicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.id} className="sd-table-row">
                  <td className="sd-table-cell">
                    {solicitud.publicacionDetalle?.titulo || "N/A"}
                  </td>
                  <td className="sd-table-cell">
                    {solicitud.receptorDetalle?.nombre || "N/A"}
                  </td>
                  <td className="sd-table-cell">
                    <span
                      className={`sd-status sd-status-${solicitud.estado.toLowerCase()}`}
                    >
                      {solicitud.estado}
                    </span>
                  </td>
                  <td className="sd-table-cell sd-actions">
                    <button
                      className="sd-btn-aceptar"
                      onClick={(e) => {
                        e.stopPropagation();
                        sdAceptarSolicitud(solicitud.id);
                      }}
                      title="Completar"
                      aria-label="Completar solicitud"
                      disabled={solicitud.estado === "Completada" || procesandoAceptar}
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      className="sd-btn-eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        sdConfirmarEliminar(solicitud.id);
                      }}
                      title="Eliminar"
                      aria-label="Eliminar solicitud"
                      disabled={procesandoEliminar}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {sdSolicitudAAceptar && (
          <div className="sd-modal-overlay" onClick={sdCancelarAceptar}>
            <div className="sd-modal-content" onClick={(e) => e.stopPropagation()}>
              <p className="sd-modal-message">
                ¿Estás seguro que deseas marcar esta solicitud como completada?
              </p>
              <div className="sd-modal-buttons">
                <button
                  className="sd-btn-cancelar"
                  onClick={sdCancelarAceptar}
                  disabled={procesandoAceptar}
                >
                  Cancelar
                </button>
                <button
                  className="sd-btn-confirmar-aceptar"
                  onClick={sdConfirmarAceptar}
                  disabled={procesandoAceptar}
                >
                  {procesandoAceptar ? "Procesando..." : "Sí, Completar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {sdSolicitudAEliminar && (
          <div className="sd-modal-overlay" onClick={sdCancelarEliminar}>
            <div className="sd-modal-content" onClick={(e) => e.stopPropagation()}>
              <p className="sd-modal-message">
                ¿Estás seguro que deseas eliminar esta solicitud?
              </p>
              <div className="sd-modal-buttons">
                <button
                  className="sd-btn-cancelar"
                  onClick={sdCancelarEliminar}
                  disabled={procesandoEliminar}
                >
                  Cancelar
                </button>
                <button
                  className="sd-btn-confirmar-eliminar"
                  onClick={sdEliminarSolicitud}
                  disabled={procesandoEliminar}
                >
                  {procesandoEliminar ? "Eliminando..." : "Sí, Eliminar"}
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
