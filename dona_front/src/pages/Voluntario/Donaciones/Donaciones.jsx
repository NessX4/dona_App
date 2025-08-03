// Luna FLores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import {
  FiPackage,
  FiTruck,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import "./Donaciones.css";

const Donaciones = () => {
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
        setDonaciones(publicacionesData);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
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
      (donacion) => getEstadoNombre(donacion.estado).toLowerCase() === filtro
    );
  };

  const donacionesFiltradas = filtrarDonaciones();

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>Donaciones Publicadas</h1>
          <div className="filtros">
            <button
              className={`filtro-btn ${filtro === "todas" ? "active" : ""}`}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button
              className={`filtro-btn ${filtro === "pendiente" ? "active" : ""}`}
              onClick={() => setFiltro("pendiente")}
            >
              Pendientes
            </button>
            <button
              className={`filtro-btn ${
                filtro === "en proceso" ? "active" : ""
              }`}
              onClick={() => setFiltro("en proceso")}
            >
              En Proceso
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
            {donacionesFiltradas.map((pub) => {
              const comidasAsociadas = getComidaPorPublicacion(pub.id);
              const archivosAsociados = getArchivosPorPublicacion(pub.id);

              return (
                <div key={pub.id} className="donacion-card">
                  <div className="donacion-header">
                    <h3>{pub.titulo}</h3>
                    <span
                      className={`estado-badge ${getEstadoNombre(
                        pub.estado
                      ).toLowerCase()}`}
                    >
                      {pub.estado === 1 ? <FiCheckCircle /> : <FiClock />}
                      {getEstadoNombre(pub.estado)}
                    </span>
                  </div>

                  {archivosAsociados.length > 0 && (
                    <div className="donacion-imagen">
                      <img
                        src={archivosAsociados[0].url}
                        alt={archivosAsociados[0].tipo}
                      />
                    </div>
                  )}

                  <div className="donacion-body">
                    <div className="donacion-info">
                      <div className="info-item">
                        <FiPackage className="info-icon" />
                        <span>{pub.cantidad} unidades</span>
                      </div>
                      <div className="info-item">
                        <FiCalendar className="info-icon" />
                        <span>
                          Expira el:{" "}
                          {new Date(pub.fecha_caducidad).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-item">
                        <FiTruck className="info-icon" />
                        <span>
                          Ubicación: {getSucursalNombre(pub.sucursal)}
                        </span>
                      </div>
                    </div>

                    <div className="donacion-descripcion">
                      <p>{pub.descripcion}</p>
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

                    <div className="donacion-actions">
                      <button className="btn-primary">Ver detalles</button>
                    </div>
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

export default Donaciones;
