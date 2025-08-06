import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiPackage,
  FiTruck,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import "./DonacionesDisponibles.css";

const DonacionesDisponibles = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas");

  // Estados para los modales
  const [modalDetalle, setModalDetalle] = useState(null);
  const [modalConfirmacion, setModalConfirmacion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          publicacionesRes,
          sucursalesRes,
          estadosRes,
          comidasRes,
          categoriasRes,
          archivosRes,
        ] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
          fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
          fetch("http://127.0.0.1:8000/api/donaciones/estados/"),
          fetch("http://127.0.0.1:8000/api/donaciones/comidas/"),
          fetch("http://127.0.0.1:8000/api/donaciones/categorias/"),
          fetch("http://127.0.0.1:8000/api/donaciones/archivos/"),
        ]);

        const [
          publicacionesData,
          sucursalesData,
          estadosData,
          comidasData,
          categoriasData,
          archivosData,
        ] = await Promise.all([
          publicacionesRes.json(),
          sucursalesRes.json(),
          estadosRes.json(),
          comidasRes.json(),
          categoriasRes.json(),
          archivosRes.json(),
        ]);

        setPublicaciones(publicacionesData);
        setSucursales(sucursalesData);
        setEstados(estadosData);
        setComidas(comidasData);
        setCategorias(categoriasData);
        setArchivosAdjuntos(archivosData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const solicitarDonacion = async (idPublicacion) => {
  try {
    // 1. Cambiar estado de la publicación
    const patchResponse = await fetch(
      `http://127.0.0.1:8000/api/donaciones/publicaciones/${idPublicacion}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: 8 }), // Estado "Pendiente"
      }
    );

    if (!patchResponse.ok) throw new Error("Error al actualizar estado");

    // 2. Crear la solicitud
    const receptorId = localStorage.getItem("receptorId");
    if (!receptorId) throw new Error("No se encontró el ID del receptor");

    const solicitudResponse = await fetch(
      "http://127.0.0.1:8000/api/solicitudes/solicitudes/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicacion: idPublicacion,
          receptor: parseInt(receptorId),
          estado: "Pendiente",
          comentarios: "",
        }),
      }
    );

    if (!solicitudResponse.ok) throw new Error("Error al crear la solicitud");

    // 3. Actualizar estado local
    setPublicaciones((prev) =>
      prev.map((p) =>
        p.id === idPublicacion ? { ...p, estado: 8 } : p
      )
    );

    setModalConfirmacion(null);
    alert("Donación solicitada exitosamente.");
  } catch (error) {
    console.error("Error al solicitar donación:", error);
    alert("Hubo un problema al solicitar la donación.");
  }
};

  const getSucursalNombre = (id) => {
    const sucursal = sucursales.find((s) => s.id === id);
    return sucursal ? sucursal.nombre : "Desconocido";
  };

  const getEstadoNombre = (id) => {
    const estado = estados.find((e) => e.id === id);
    return estado ? estado.nombre : "Desconocido";
  };

  const getArchivosPorPublicacion = (pubId) => {
    return archivosAdjuntos.filter((a) => a.publicacion === pubId);
  };

  const publicacionesFiltradas = () => {
    if (filtro === "todas") return publicaciones;
    return publicaciones.filter(
      (p) => getEstadoNombre(p.estado)?.toLowerCase() === filtro
    );
  };

  return (
    <>
      <RefugioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Donaciones Disponibles</h1>
          <div className="filtros">
            <button
              className={`filtro-btn ${filtro === "todas" ? "active" : ""}`}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button
              className={`filtro-btn ${filtro === "disponible" ? "active" : ""}`}
              onClick={() => setFiltro("disponible")}
            >
              Disponibles
            </button>
            <button
              className={`filtro-btn ${filtro === "pendiente" ? "active" : ""}`}
              onClick={() => setFiltro("pendiente")}
            >
              Pendientes
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Cargando donaciones...</p>
          </div>
        ) : publicacionesFiltradas().length === 0 ? (
          <div className="no-donaciones">
            <FiPackage size={48} />
            <p>No hay donaciones disponibles</p>
          </div>
        ) : (
          <div className="donaciones-grid">
            {publicacionesFiltradas().map((publicacion) => {
              const archivosAsociados = getArchivosPorPublicacion(publicacion.id);
              return (
                <div key={publicacion.id} className="donacion-card">
                  <div className="estado-badge-card">
                    {getEstadoNombre(publicacion.estado) === "Disponible" ? (
                      <FiCheckCircle size={14} />
                    ) : (
                      <FiClock size={14} />
                    )}
                    {getEstadoNombre(publicacion.estado)}
                  </div>
                  <div className="donacion-imagen">
                    {archivosAsociados.length > 0 ? (
                      <img
                        src={archivosAsociados[0].url}
                        alt={archivosAsociados[0].tipo}
                      />
                    ) : (
                      <div className="placeholder-imagen">Imagen</div>
                    )}
                  </div>
                  <div className="donacion-contenido">
                    <h3>{publicacion.titulo || "Sin título"}</h3>
                    <p className="cantidad">
                      <FiPackage /> {publicacion.cantidad}{" "}
                      {publicacion.unidad || "unidades"}
                    </p>
                    <p className="fecha">
                      <FiCalendar />{" "}
                      {new Date(publicacion.fecha_caducidad).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="donacion-actions">
                    <button
                      className="btn-secundario"
                      onClick={() => setModalDetalle(publicacion)}
                    >
                      Ver Detalle
                    </button>
                    {publicacion.estado === 1 && (
                      <button
                        className="btn-primary"
                        onClick={() => setModalConfirmacion(publicacion)}
                      >
                        Solicitar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal Detalle */}
      {modalDetalle && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h2>{modalDetalle.titulo}</h2>
            <p>{modalDetalle.descripcion}</p>
            <p>
              <strong>Ubicación:</strong>{" "}
              {getSucursalNombre(modalDetalle.sucursal)}
            </p>
            <p>
              <strong>Donante:</strong> {modalDetalle.donador_nombre}
            </p>
            <p>
              <strong>Fecha caducidad:</strong>{" "}
              {new Date(modalDetalle.fecha_caducidad).toLocaleDateString()}
            </p>
            <button
              className="btn-cerrar"
              onClick={() => setModalDetalle(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Confirmación */}
      {modalConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>¿Deseas solicitar esta donación?</h3>
            <div className="modal-botones">
              <button
                className="btn-confirmar"
                onClick={() => solicitarDonacion(modalConfirmacion.id)}
              >
                Sí, solicitar
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setModalConfirmacion(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonacionesDisponibles;
