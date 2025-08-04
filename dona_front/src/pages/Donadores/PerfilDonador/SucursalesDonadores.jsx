// Luna Flores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX, FiPlus } from "react-icons/fi";
import "./SucursalesDonadores.css";
import NuevaSucursal from "./NuevaSucursal";

const SucursalesDonadores = ({ donadorId }) => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({});
  const [sucursalAEliminar, setSucursalAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [vista, setVista] = useState("listado");

  useEffect(() => {
    if (!donadorId) {
      setSucursales([]);
      setLoading(false);
      return;
    }

    const fetchSucursales = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/donaciones/sucursales/");
        const data = await res.json();
        const filtradas = data
          .filter((s) => s.donador === donadorId)
          .sort((a, b) => a.id - b.id);
        setSucursales(filtradas);
      } catch (error) {
        console.error("Error al cargar sucursales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSucursales();
  }, [donadorId]);

  const iniciarEdicion = (sucursal) => {
    setEditandoId(sucursal.id);
    setFormEdicion(sucursal);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormEdicion({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdicion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarCambios = async () => {
    if (!editandoId) return;
    try {
      const response = await fetch(
        `http://localhost:8000/api/donaciones/sucursales/${editandoId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formEdicion),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al guardar la sucursal");
      }

      const sucursalActualizada = await response.json();
      setSucursales((prev) =>
        prev
          .map((s) => (s.id === editandoId ? sucursalActualizada : s))
          .sort((a, b) => a.id - b.id)
      );
      cancelarEdicion();
    } catch (error) {
      alert("No se pudo guardar la sucursal: " + error.message);
    }
  };

  const solicitarEliminarSucursal = (sucursal) => {
    setSucursalAEliminar(sucursal);
  };

  const confirmarEliminarSucursal = async () => {
    if (!sucursalAEliminar) return;
    setEliminando(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/donaciones/sucursales/${sucursalAEliminar.id}/`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Error al eliminar la sucursal");

      setSucursales((prev) =>
        prev.filter((s) => s.id !== sucursalAEliminar.id)
      );
      setSucursalAEliminar(null);
    } catch (error) {
      alert("No se pudo eliminar la sucursal: " + error.message);
    } finally {
      setEliminando(false);
    }
  };

  const cancelarEliminarSucursal = () => {
    setSucursalAEliminar(null);
  };

  const handleNuevaSucursalCreada = (nuevaSucursal) => {
    setSucursales((prev) => [...prev, nuevaSucursal].sort((a, b) => a.id - b.id));
    setVista("listado");
  };

  if (loading) {
    return <p className="SucursalesDonadores-loading">Cargando sucursales...</p>;
  }

  if (!donadorId) {
    return <p className="SucursalesDonadores-error">No se recibió el ID del donador.</p>;
  }

  return (
    <div className="SucursalesDonadores-container">
      {vista === "listado" ? (
        <>
          <div className="SucursalesDonadores-header">
            <h1 style={{ color: "red" }}>Sucursales registradas</h1>
            <button
              className="SucursalesDonadores-btn-agregar"
              onClick={() => setVista("formulario")}
            >
              <FiPlus size={18} /> Agregar sucursal
            </button>
          </div>

          {sucursales.length === 0 ? (
            <p>No tienes sucursales registradas.</p>
          ) : (
            <table className="SucursalesDonadores-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Horario</th>
                  <th>Representante</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sucursales.map((sucursal) => {
                  const esEditando = editandoId === sucursal.id;
                  return (
                    <tr key={sucursal.id}>
                      <td>
                        {esEditando ? (
                          <input
                            type="text"
                            name="nombre"
                            value={formEdicion.nombre || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          sucursal.nombre
                        )}
                      </td>
                      <td>
                        {esEditando ? (
                          <input
                            type="text"
                            name="direccion"
                            value={formEdicion.direccion || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          sucursal.direccion
                        )}
                      </td>
                      <td>
                        {esEditando ? (
                          <input
                            type="text"
                            name="telefono"
                            value={formEdicion.telefono || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          sucursal.telefono
                        )}
                      </td>
                      <td>
                        {esEditando ? (
                          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <input
                              type="time"
                              name="horario_apertura"
                              value={formEdicion.horario_apertura || ""}
                              onChange={handleChange}
                            />
                            <span>-</span>
                            <input
                              type="time"
                              name="horario_cierre"
                              value={formEdicion.horario_cierre || ""}
                              onChange={handleChange}
                            />
                          </div>
                        ) : (
                          `${sucursal.horario_apertura} - ${sucursal.horario_cierre}`
                        )}
                      </td>
                      <td>
                        {esEditando ? (
                          <input
                            type="text"
                            name="representante"
                            value={formEdicion.representante || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          sucursal.representante
                        )}
                      </td>
                      <td className="SucursalesDonadores-actions">
                        {esEditando ? (
                          <>
                            <button onClick={guardarCambios} title="Guardar" className="GuardarCSucursales">
                              <FiSave />
                            </button>
                            <button onClick={cancelarEdicion} title="Cancelar" className="CancelarCSucursales">
                              <FiX />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-edit-sucursalDonadores"
                              onClick={() => iniciarEdicion(sucursal)}
                              aria-label="Editar sucursal"
                              title="Editar sucursal"
                            >
                              <FiEdit />
                            </button>
                            <button
                              className="btn-delete-sucursalDonadores"
                              onClick={() => solicitarEliminarSucursal(sucursal)}
                              aria-label="Eliminar sucursal"
                              title="Eliminar sucursal"
                            >
                              <FiTrash2 />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {sucursalAEliminar && (
            <div className="modal-overlay">
              <div className="modal-content">
                <p>
                  ¿Estás seguro que deseas eliminar la sucursal: <strong>{sucursalAEliminar.nombre}</strong>?
                </p>
                <div className="modal-buttons">
                  <button
                    className="SucursalesDonadores-btn-confirmar-eliminar"
                    onClick={confirmarEliminarSucursal}
                    disabled={eliminando}
                  >
                    {eliminando ? "Eliminando..." : "Sí, eliminar"}
                  </button>
                  <button
                    className="SucursalesDonadores-btn-cancelar"
                    onClick={cancelarEliminarSucursal}
                    disabled={eliminando}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <NuevaSucursal
          donadorId={donadorId}
          onSuccess={handleNuevaSucursalCreada}
          onCancel={() => setVista("listado")}
        />
      )}
    </div>
  );
};

export default SucursalesDonadores;
