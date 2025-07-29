//Angel Alejandro Chavez Castillon

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
  const [donaciones, setDonaciones] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todas las APIs en paralelo
        const [
          donacionesRes,
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
          donacionesData,
          publicacionesData,
          sucursalesData,
          estadosData,
          comidasData,
          categoriasData,
          archivosData,
        ] = await Promise.all([
          donacionesRes.json(),
          publicacionesRes.json(),
          sucursalesRes.json(),
          estadosRes.json(),
          comidasRes.json(),
          categoriasRes.json(),
          archivosRes.json(),
        ]);

        setDonaciones(donacionesData);
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

  const getSucursalNombre = (id) => {
    const sucursal = sucursales.find((s) => s.id === id);
    return sucursal ? sucursal.nombre : "Desconocido";
  };

  const getEstadoNombre = (id) => {
    const estado = estados.find((e) => e.id === id);
    return estado ? estado.nombre : "Desconocido";
  };

  const getComidaPorPublicacion = (pubId) => {
    return comidas.filter((c) => c.publicacion === pubId);
  };

  const getCategoriaNombre = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nombre : "Desconocida";
  };

  const getArchivosPorPublicacion = (pubId) => {
    return archivosAdjuntos.filter((a) => a.publicacion === pubId);
  };

  const filtrarDonaciones = () => {
    if (filtro === "todas") return donaciones;
    return donaciones.filter(
      (donacion) => donacion.estado.toLowerCase() === filtro
    );
  };

  const donacionesFiltradas = filtrarDonaciones();

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
              className={`filtro-btn ${
                filtro === "disponible" ? "active" : ""
              }`}
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
        ) : donacionesFiltradas.length === 0 ? (
          <div className="no-donaciones">
            <FiPackage size={48} />
            <p>No hay donaciones disponibles</p>
          </div>
        ) : (
          <div className="donaciones-grid">
            {donacionesFiltradas.map((donacion) => {
              const publicacion = publicaciones.find(
                (p) => p.id === donacion.publicacion_id
              );
              const comidasAsociadas = publicacion
                ? getComidaPorPublicacion(publicacion.id)
                : [];
              const archivosAsociados = publicacion
                ? getArchivosPorPublicacion(publicacion.id)
                : [];

              return (
                <div key={donacion.id} className="donacion-card">
                  <div className="donacion-header">
                    <h3>{publicacion?.titulo || donacion.tipo}</h3>
                    <span
                      className={`estado-badge ${donacion.estado.toLowerCase()}`}
                    >
                      {donacion.estado === "disponible" ? (
                        <FiCheckCircle size={16} />
                      ) : (
                        <FiClock size={16} />
                      )}
                      {getEstadoNombre(donacion.estado_id)}
                    </span>
                  </div>

                  <div className="donacion-body">
                    {archivosAsociados.length > 0 && (
                      <div className="donacion-imagen">
                        <img
                          src={archivosAsociados[0].url}
                          alt={archivosAsociados[0].tipo}
                        />
                      </div>
                    )}

                    <div className="donacion-info">
                      <div className="info-item">
                        <FiPackage className="info-icon" />
                        <span>
                          {publicacion?.cantidad || donacion.cantidad}{" "}
                          {donacion.unidad || "unidades"}
                        </span>
                      </div>
                      <div className="info-item">
                        <FiCalendar className="info-icon" />
                        <span>
                          Disponible hasta:{" "}
                          {publicacion?.fecha_caducidad
                            ? new Date(
                                publicacion.fecha_caducidad
                              ).toLocaleDateString()
                            : new Date(
                                donacion.fecha_disponibilidad
                              ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-item">
                        <FiUser className="info-icon" />
                        <span>
                          Donante: {donacion.donante_nombre || "Anónimo"}
                        </span>
                      </div>
                      <div className="info-item">
                        <FiTruck className="info-icon" />
                        <span>
                          Ubicación:{" "}
                          {publicacion
                            ? getSucursalNombre(publicacion.sucursal)
                            : donacion.ubicacion}
                        </span>
                      </div>
                    </div>

                    <div className="donacion-descripcion">
                      <p>
                        {publicacion?.descripcion ||
                          donacion.descripcion ||
                          "Sin descripción adicional"}
                      </p>
                    </div>

                    {comidasAsociadas.length > 0 && (
                      <div className="donacion-comidas">
                        <p>
                          <strong>Comidas:</strong>
                        </p>
                        <div className="comidas-lista">
                          {comidasAsociadas.map((c) => (
                            <span key={c.id} className="comida-badge">
                              {c.nombre} ({getCategoriaNombre(c.categoria)})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="donacion-actions">
                    <button className="btn-primary">
                      {donacion.estado === "disponible"
                        ? "Solicitar Donación"
                        : "Ver Detalles"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default DonacionesDisponibles;
