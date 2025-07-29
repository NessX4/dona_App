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

  useEffect(() => {
    // Simulación de datos de API
    const fetchData = async () => {
      try {
        // Simular carga de API
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Datos de ejemplo mejorados
        const data = [
          {
            id: 1,
            fecha: "2023-10-15",
            donador: "Supermercado ABC",
            tipo: "Alimentos",
            cantidad: "50 kg",
            descripcion: "Arroz, frijoles y aceite vegetal",
            estado: "Recibido",
            detalles: "Entregado por el personal de logística",
          },
          {
            id: 2,
            fecha: "2023-10-12",
            donador: "Farmacia XYZ",
            tipo: "Medicamentos",
            cantidad: "25 unidades",
            descripcion: "Antiparasitarios y complejos vitamínicos",
            estado: "Recibido",
            detalles: "Revisado por el área médica",
          },
          {
            id: 3,
            fecha: "2023-10-10",
            donador: "Empresa Solidaria S.A.",
            tipo: "Efectivo",
            cantidad: "$5,000 MXN",
            descripcion: "Donación monetaria para gastos operativos",
            estado: "Procesado",
            detalles: "Depositado en cuenta bancaria",
          },
          {
            id: 4,
            fecha: "2023-10-05",
            donador: "Donador anónimo",
            tipo: "Ropa",
            cantidad: "3 cajas",
            descripcion: "Ropa de abrigo en buen estado",
            estado: "Recibido",
            detalles: "Clasificada y almacenada",
          },
          {
            id: 5,
            fecha: "2023-09-28",
            donador: "Tienda de Cosméticos",
            tipo: "Higiene",
            cantidad: "15 paquetes",
            descripcion: "Jabones, champú y artículos de aseo",
            estado: "Recibido",
            detalles: "Distribuido a beneficiarios",
          },
        ];

        setDonaciones(data);
        setTiposDonacion([
          "Alimentos",
          "Medicamentos",
          "Efectivo",
          "Ropa",
          "Higiene",
          "Otros",
        ]);
        setEstadosDonacion(["Recibido", "Procesado", "Cancelado", "Pendiente"]);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando historial:", error);
        setLoading(false);
      }
    };

    fetchData();
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
      return (
        (filtros.fechaInicio === "" || donacion.fecha >= filtros.fechaInicio) &&
        (filtros.fechaFin === "" || donacion.fecha <= filtros.fechaFin) &&
        (filtros.tipoDonacion === "" ||
          donacion.tipo === filtros.tipoDonacion) &&
        (filtros.estado === "" || donacion.estado === filtros.estado)
      );
    });
  };

  const donacionesFiltradas = filtrarDonaciones();

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

  return (
    <>
      <RefugioHeader />
      <main className="historial-container">
        <div className="historial-header">
          <h1>
            <FiBox className="header-icon" />
            Historial de Donaciones
          </h1>
          <div className="header-actions">
            <button className="export-btn">Exportar a Excel</button>
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
        <div className="resultados-section">
          <div className="resultados-header">
            <h2>
              Resultados
              <span className="resultados-count">
                ({donacionesFiltradas.length})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando historial de donaciones...</p>
            </div>
          ) : donacionesFiltradas.length === 0 ? (
            <div className="empty-state">
              <FiBox size={48} className="empty-icon" />
              <p>No se encontraron donaciones con los filtros aplicados</p>
              <button className="reset-btn" onClick={resetFiltros}>
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
                  </tr>
                </thead>
                <tbody>
                  {donacionesFiltradas.map((donacion) => (
                    <tr key={donacion.id}>
                      <td>{new Date(donacion.fecha).toLocaleDateString()}</td>
                      <td>
                        <div className="donador-cell">
                          <FiUser className="donador-icon" />
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default HistorialDonaciones;
