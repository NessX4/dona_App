// Angel Alejandro Chavez Castillon

import React, { useEffect, useState } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiFilter,
  FiCalendar,
  FiBox,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTruck,
} from "react-icons/fi";
import "./HistorialDonaciones.css";

const HistorialDonaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    tipoDonacion: "",
    estado: "",
  });
  const [tiposDonacion, setTiposDonacion] = useState([]);
  const [estadosDonacion, setEstadosDonacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para datos de API
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

  const cargarDatos = async () => {
    try {
      // Obtener todas las APIs en paralelo
      const [
        solicitudesRes,
        publicacionesRes,
        sucursalesRes,
        estadosRes,
        comidasRes,
        categoriasRes,
        archivosRes,
      ] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/solicitudes/solicitudes/"),
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
        fetch("http://127.0.0.1:8000/api/donaciones/estados/"),
        fetch("http://127.0.0.1:8000/api/donaciones/comidas/"),
        fetch("http://127.0.0.1:8000/api/donaciones/categorias/"),
        fetch("http://127.0.0.1:8000/api/donaciones/archivos/"),
      ]);

      const [
        solicitudesData,
        publicacionesData,
        sucursalesData,
        estadosData,
        comidasData,
        categoriasData,
        archivosData,
      ] = await Promise.all([
        solicitudesRes.json(),
        publicacionesRes.json(),
        sucursalesRes.json(),
        estadosRes.json(),
        comidasRes.json(),
        categoriasRes.json(),
        archivosRes.json(),
      ]);

      // Procesar datos para el refugio (solicitudes completadas donde el receptor es este refugio)
      const solicitudesCompletadas = (
        solicitudesData.results || solicitudesData
      )
        .filter((solicitud) => solicitud.estado.toLowerCase() === "completada")
        .map((solicitud) => {
          const publicacion =
            (publicacionesData.results || publicacionesData).find(
              (p) => p.id === solicitud.publicacion
            ) || null;

          const sucursalReceptor =
            (sucursalesData.results || sucursalesData).find(
              (s) => s.id === solicitud.receptor
            ) || null;

          const comidasAsociadas = publicacion
            ? (comidasData.results || comidasData).filter(
                (c) => c.publicacion === publicacion.id
              )
            : [];

          return {
            id: solicitud.id,
            fecha: solicitud.fecha_creacion,
            donador: publicacion?.donante || "Anónimo",
            tipo:
              comidasAsociadas.length > 0
                ? comidasAsociadas.map((c) => c.nombre).join(", ")
                : "Varios",
            cantidad: publicacion?.cantidad || "N/A",
            descripcion: publicacion?.descripcion || "Sin descripción",
            estado: "Recibido", // Asumimos que las completadas están recibidas
            publicacionDetalle: publicacion,
            receptorDetalle: sucursalReceptor,
            comidas: comidasAsociadas,
          };
        });

      setDonaciones(solicitudesCompletadas);
      setPublicaciones(publicacionesData.results || publicacionesData);
      setSucursales(sucursalesData.results || sucursalesData);
      setEstados(estadosData.results || estadosData);
      setComidas(comidasData.results || comidasData);
      setCategorias(categoriasData.results || categoriasData);
      setArchivosAdjuntos(archivosData.results || archivosData);

      // Extraer tipos únicos de donación basados en categorías de comida
      const tiposUnicos = [
        ...new Set(
          (categoriasData.results || categoriasData).map((cat) => cat.nombre)
        ),
      ];
      setTiposDonacion(tiposUnicos);

      setEstadosDonacion(["Recibido", "Procesado", "Pendiente"]);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFiltros = () => {
    setFiltros({
      fechaInicio: "",
      fechaFin: "",
      tipoDonacion: "",
      estado: "",
    });
  };

  const filtrarDonaciones = () => {
    return donaciones.filter((donacion) => {
      const cumpleFiltros =
        (filtros.fechaInicio === "" || donacion.fecha >= filtros.fechaInicio) &&
        (filtros.fechaFin === "" || donacion.fecha <= filtros.fechaFin) &&
        (filtros.estado === "" || donacion.estado === filtros.estado);

      // Filtro especial para tipo de donación (busca en comidas y categorías)
      if (filtros.tipoDonacion !== "") {
        const tieneTipo = donacion.comidas.some(
          (c) => getCategoriaNombre(c.categoria) === filtros.tipoDonacion
        );
        return cumpleFiltros && tieneTipo;
      }

      return cumpleFiltros;
    });
  };

  const getCategoriaNombre = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nombre : "Desconocida";
  };

  const getEstadoIcon = (estado) => {
    switch (estado.toLowerCase()) {
      case "recibido":
        return <FiCheckCircle size={16} />;
      case "procesado":
        return <FiDollarSign size={16} />;
      case "pendiente":
        return <FiClock size={16} />;
      case "cancelado":
        return <FiXCircle size={16} />;
      default:
        return null;
    }
  };

  const donacionesFiltradas = filtrarDonaciones();

  return (
    <>
      <RefugioHeader />
      <main className="donaciones-container">
        <div className="donaciones-header">
          <h1>
            <FiBox className="info-icon" />
            Historial de Donaciones Recibidas
          </h1>
          <div className="filtros">
            <button className="filtro-btn">Exportar a Excel</button>
          </div>
        </div>

        {/* Filtros de búsqueda */}
        <div className="filtros-section">
          <div className="filtros-header">
            <h2>
              <FiFilter size={20} />
              Filtros de Búsqueda
            </h2>
            <button className="reset-filtros" onClick={resetFiltros}>
              Limpiar filtros
            </button>
          </div>

          <div className="filtros-grid">
            <div className="filtro-group">
              <label>
                <FiCalendar className="filter-icon" />
                Fecha Inicio
              </label>
              <input
                type="date"
                name="fechaInicio"
                value={filtros.fechaInicio}
                onChange={handleFiltroChange}
                className="filtro-input"
                placeholder="dd/mm/aaaa"
              />
            </div>

            <div className="filtro-group">
              <label>
                <FiCalendar className="filter-icon" />
                Fecha Fin
              </label>
              <input
                type="date"
                name="fechaFin"
                value={filtros.fechaFin}
                onChange={handleFiltroChange}
                className="filtro-input"
                placeholder="dd/mm/aaaa"
              />
            </div>

            <div className="filtro-group">
              <label>
                <FiBox className="filter-icon" />
                Tipo de Donación
              </label>
              <select
                name="tipoDonacion"
                value={filtros.tipoDonacion}
                onChange={handleFiltroChange}
                className="filtro-input"
              >
                <option value="">Todos los tipos</option>
                {tiposDonacion.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="filtro-group">
              <label>
                <FiCheckCircle className="filter-icon" />
                Estado
              </label>
              <select
                name="estado"
                value={filtros.estado}
                onChange={handleFiltroChange}
                className="filtro-input"
              >
                <option value="">Todos los estados</option>
                {estadosDonacion.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="donacion-card">
          <div className="donacion-header">
            <h3>
              Resultados
              <span className="estado-badge disponible">
                {donacionesFiltradas.length}
              </span>
            </h3>
          </div>

          <div className="donacion-body">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Cargando historial de donaciones...</p>
              </div>
            ) : error ? (
              <div className="no-donaciones">
                <FiXCircle size={48} className="info-icon" />
                <p>Error al cargar el historial: {error}</p>
                <button className="btn-primary" onClick={cargarDatos}>
                  Reintentar
                </button>
              </div>
            ) : donacionesFiltradas.length === 0 ? (
              <div className="no-donaciones">
                <FiBox size={48} className="info-icon" />
                <p>No se encontraron donaciones con los filtros aplicados</p>
                <button className="btn-primary" onClick={resetFiltros}>
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="table-container">
                <table className="historial-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Donador</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Origen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donacionesFiltradas.map((donacion) => (
                      <tr key={donacion.id}>
                        <td>{new Date(donacion.fecha).toLocaleDateString()}</td>
                        <td>
                          <div className="info-item">
                            <FiUser className="info-icon" />
                            {donacion.donador}
                          </div>
                        </td>
                        <td>{donacion.tipo}</td>
                        <td>{donacion.cantidad}</td>
                        <td className="descripcion-cell">
                          {donacion.descripcion}
                        </td>
                        <td>
                          <span
                            className={`estado-badge ${donacion.estado.toLowerCase()}`}
                          >
                            {getEstadoIcon(donacion.estado)}
                            {donacion.estado}
                          </span>
                        </td>
                        <td>
                          <div className="info-item">
                            <FiTruck className="info-icon" />
                            {donacion.publicacionDetalle?.sucursal_nombre ||
                              "Desconocido"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default HistorialDonaciones;
