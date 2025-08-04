// Luna Flores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiEdit,
  FiSave,
  FiX,
  FiHome,
  FiPhone,
  FiMail,
  FiUsers,
  FiClock,
} from "react-icons/fi";
import "./PerfilRefugio.css";

const PerfilRefugio = () => {
  const [state, setState] = useState({
    perfil: {
      id: null,             
      nombreLugar: "",
      encargado: "",
      direccion: "",
      telefono: "",
      correo: "",
      capacidad: "",
      horarioApertura: "",
      horarioCierre: "",
      servicios: [],
      normas: "",
      fotos: [],
    },
    editando: false,
    cargando: true,
    error: null,
    mostrarConfirmacion: false,
  });

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      console.warn("No hay usuarioId en localStorage");
      setState((prev) => ({ ...prev, cargando: false }));
      return;
    }

    fetch("http://localhost:8000/api/usuarios/receptores/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener receptores");
        return res.json();
      })
      .then((data) => {
        const receptor = data.find(
          (r) => r.usuario && r.usuario.id === parseInt(usuarioId, 10)
        );
        if (!receptor) {
          console.warn("No se encontró receptor con ese usuarioId");
          setState((prev) => ({ ...prev, cargando: false }));
          return;
        }

        setState((prev) => ({
          ...prev,
          perfil: {
            id: receptor.id,  
            nombreLugar: receptor.nombre_lugar || "",
            encargado: receptor.encargado || "",
            direccion: receptor.direccion || "",
            telefono: receptor.telefono || "",
            correo: receptor.usuario.correo || "",
            capacidad: receptor.capacidad ? String(receptor.capacidad) : "",
            horarioApertura: receptor.horario_apertura || "",
            horarioCierre: receptor.horario_cierre || "",
            servicios: receptor.servicios || [],
            normas: receptor.normas || "",
            fotos: receptor.fotos || [],
          },
          cargando: false,
          error: null,
        }));
      })
      .catch((error) => {
        console.error("Error al cargar perfil receptor:", error);
        setState((prev) => ({ ...prev, cargando: false, error: error.message }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      perfil: {
        ...prev.perfil,
        [name]: value,
      },
    }));
  };

  const handleGuardarClick = (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, mostrarConfirmacion: true }));
  };

  const confirmarActualizacion = async () => {
    setState((prev) => ({ ...prev, error: null, mostrarConfirmacion: false }));

    const { perfil } = state;

    const payload = {
      nombre_lugar: perfil.nombreLugar,
      encargado: perfil.encargado,
      direccion: perfil.direccion,
      telefono: perfil.telefono,
      capacidad: Number(perfil.capacidad),
      horario_apertura: perfil.horarioApertura,
      horario_cierre: perfil.horarioCierre,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/usuarios/receptores/${perfil.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Error al actualizar el perfil del refugio"
        );
      }

      const updated = await response.json();

      setState((prev) => ({
        ...prev,
        perfil: {
          ...prev.perfil,
          nombreLugar: updated.nombre_lugar || prev.perfil.nombreLugar,
          encargado: updated.encargado || prev.perfil.encargado,
          direccion: updated.direccion || prev.perfil.direccion,
          telefono: updated.telefono || prev.perfil.telefono,
          capacidad: updated.capacidad ? String(updated.capacidad) : prev.perfil.capacidad,
          horarioApertura: updated.horario_apertura || prev.perfil.horarioApertura,
          horarioCierre: updated.horario_cierre || prev.perfil.horarioCierre,
          servicios: updated.servicios || prev.perfil.servicios,
          normas: updated.normas || prev.perfil.normas,
          fotos: updated.fotos || prev.perfil.fotos,
          id: updated.id || prev.perfil.id,
          correo: prev.perfil.correo,
        },
        editando: false,
        error: null,
      }));

    } catch (error) {
      console.error("Error al guardar perfil refugio:", error);
      setState((prev) => ({ ...prev, error: error.message }));
      alert(`Error al actualizar el perfil: ${error.message}`);
    }
  };

  const cancelarActualizacion = () => {
    setState((prev) => ({ ...prev, mostrarConfirmacion: false }));
  };

  if (state.cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <>
      <RefugioHeader />
      <main className="perfil-refugio-container">
        <div className="perfil-header">
          <h1>
            <FiHome className="header-icon" />
            {state.perfil.nombreLugar || "Perfil del Receptor"}
          </h1>
          {!state.editando ? (
            <button
              className="btn-editarRefugio-pr"
              onClick={() => setState((prev) => ({ ...prev, editando: true }))}
            >
              <FiEdit /> Editar perfil
            </button>
          ) : (
            <div className="acciones-edicion">
              <button
                className="btn-cancelarCR"
                onClick={() => setState((prev) => ({ ...prev, editando: false }))}
              >
                <FiX /> Cancelar
              </button>
              <button className="btn-guardarCR" onClick={handleGuardarClick}>
                <FiSave /> Guardar cambios
              </button>
            </div>
          )}
        </div>

        <section className="seccion-perfil">
          <h2 className="seccion-titulo">Tus datos</h2>
          {state.editando ? (
            <form className="formulario-perfil" onSubmit={handleGuardarClick}>
              <div className="form-group">
                <label>Nombre del lugar</label>
                <input
                  type="text"
                  name="nombreLugar"
                  value={state.perfil.nombreLugar}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Encargado</label>
                <input
                  type="text"
                  name="encargado"
                  value={state.perfil.encargado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={state.perfil.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={state.perfil.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={state.perfil.correo}
                  readOnly
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Capacidad</label>
                <input
                  type="number"
                  name="capacidad"
                  value={state.perfil.capacidad}
                  onChange={handleChange}
                  required
                  min={0}
                />
              </div>
              <div className="form-group">
                <label>Horario apertura</label>
                <input
                  type="time"
                  name="horarioApertura"
                  value={state.perfil.horarioApertura}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Horario cierre</label>
                <input
                  type="time"
                  name="horarioCierre"
                  value={state.perfil.horarioCierre}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          ) : (
            <div className="info-perfil">
              <div className="info-item">
                <FiHome className="info-icon" />
                <div>
                  <h3>Nombre del lugar</h3>
                  <p>{state.perfil.nombreLugar}</p>
                </div>
              </div>
              <div className="info-item">
                <FiUsers className="info-icon" />
                <div>
                  <h3>Encargado</h3>
                  <p>{state.perfil.encargado}</p>
                </div>
              </div>
              <div className="info-item">
                <FiHome className="info-icon" />
                <div>
                  <h3>Dirección</h3>
                  <p>{state.perfil.direccion}</p>
                </div>
              </div>
              <div className="info-item">
                <FiPhone className="info-icon" />
                <div>
                  <h3>Teléfono</h3>
                  <p>{state.perfil.telefono}</p>
                </div>
              </div>
              <div className="info-item">
                <FiMail className="info-icon" />
                <div>
                  <h3>Correo</h3>
                  <p>{state.perfil.correo}</p>
                </div>
              </div>
              <div className="info-item">
                <FiUsers className="info-icon" />
                <div>
                  <h3>Capacidad</h3>
                  <p>{state.perfil.capacidad}</p>
                </div>
              </div>
              <div className="info-item">
                <FiClock className="info-icon" />
                <div>
                  <h3>Horario apertura</h3>
                  <p>{state.perfil.horarioApertura}</p>
                </div>
              </div>
              <div className="info-item">
                <FiClock className="info-icon" />
                <div>
                  <h3>Horario cierre</h3>
                  <p>{state.perfil.horarioCierre}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Estadísticas */}
        <section className="seccion-estadisticas">
          <h2 className="seccion-titulo">
            <FiUsers /> Estadísticas
          </h2>

          <div className="estadisticas-grid">
            <div className="estadistica-card">
              <h3>Personas alojadas</h3>
              <div className="estadistica-valor">78</div>
              <div className="estadistica-periodo">este mes</div>
            </div>

            <div className="estadistica-card">
              <h3>Capacidad disponible</h3>
              <div className="estadistica-valor">22</div>
              <div className="estadistica-periodo">de 100 plazas</div>
            </div>

            <div className="estadistica-card">
              <h3>Voluntarios activos</h3>
              <div className="estadistica-valor">12</div>
              <div className="estadistica-periodo">esta semana</div>
            </div>
          </div>
        </section>

        {/* Modal de confirmación */}
        {state.mostrarConfirmacion && (
          <div className="DatosActDonador-overlay">
            <div className="DatosActDonador-content">
              <p>¿Estás seguro que deseas guardar los cambios realizados?</p>
              <div className="DatosActDonador-buttons">
                <button
                  className="DatosActDonador-cancel"
                  onClick={cancelarActualizacion}
                >
                  Cancelar
                </button>
                <button
                  className="DatosActDonador-confirm"
                  onClick={confirmarActualizacion}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PerfilRefugio;