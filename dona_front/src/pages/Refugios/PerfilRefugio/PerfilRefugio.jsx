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
    nuevoServicio: "",
    nuevaFoto: null,
    previewFoto: "",
    cargando: true,
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
            nombreLugar: receptor.nombre_lugar || "",
            encargado: receptor.encargado || "",
            direccion: receptor.direccion || "",
            telefono: receptor.telefono || "",
            correo: receptor.usuario.correo || "",
            capacidad: receptor.capacidad ? String(receptor.capacidad) : "",
            horarioApertura: receptor.horario_apertura || "",
            horarioCierre: receptor.horario_cierre || "",
            servicios: [], // Sin datos por ahora
            normas: "",
            fotos: [],
          },
          cargando: false,
        }));
      })
      .catch((error) => {
        console.error("Error al cargar perfil receptor:", error);
        setState((prev) => ({ ...prev, cargando: false }));
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

  const handleGuardar = (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, editando: false }));
    console.log("Perfil guardado:", state.perfil);
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
              className="btn-editar-pr"
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
              <button className="btn-guardarCR" onClick={handleGuardar}>
                <FiSave /> Guardar cambios
              </button>
            </div>
          )}
        </div>

        <section className="seccion-perfil">
          <h2 className="seccion-titulo">Tus datos</h2>
          {state.editando ? (
            <form className="formulario-perfil" onSubmit={handleGuardar}>
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
                  onChange={handleChange}
                  required
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

        {/* Estadísticas - se mantiene igual */}
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
      </main>
    </>
  );
};

export default PerfilRefugio;
