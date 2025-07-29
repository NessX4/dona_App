import React, { useState, useEffect } from "react";
import RefugioHeader from "../../../components/RefugioHeader";
import {
  FiEdit,
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiHome,
  FiPhone,
  FiMail,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiImage,
} from "react-icons/fi";
import "./PerfilRefugio.css";

const PerfilRefugio = () => {
  // Estado unificado para mejor organización
  const [state, setState] = useState({
    perfil: {
      nombre: "",
      tipo: "Albergue",
      direccion: "",
      telefono: "",
      email: "",
      capacidad: "",
      servicios: [],
      horario: "",
      normas: "",
      fotos: [],
    },
    editando: false,
    nuevoServicio: "",
    nuevaFoto: null,
    previewFoto: "",
    cargando: true,
  });

  // Cargar datos de ejemplo
  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        perfil: {
          nombre: "Albergue Solidario",
          tipo: "Albergue",
          direccion: "Av. Principal #456, Col. Centro, Ciudad de México",
          telefono: "5512345678",
          email: "contacto@alberguesolidario.org",
          capacidad: "100 personas",
          servicios: ["Camas", "Comida", "Duchas", "Asesoría legal"],
          horario: "Abierto 24/7",
          normas:
            "Prohibido el consumo de alcohol y drogas. Respeto a todos los residentes.",
          fotos: [
            "https://images.unsplash.com/photo-1582719471386-44d601267e4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          ],
        },
        cargando: false,
      }));
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Manejadores de eventos
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, editando: false }));
    // Aquí iría la lógica para guardar en la API
    console.log("Perfil actualizado:", state.perfil);
  };

  const agregarServicio = () => {
    if (state.nuevoServicio.trim()) {
      setState((prev) => ({
        ...prev,
        perfil: {
          ...prev.perfil,
          servicios: [...prev.perfil.servicios, prev.nuevoServicio.trim()],
        },
        nuevoServicio: "",
      }));
    }
  };

  const eliminarServicio = (index) => {
    setState((prev) => ({
      ...prev,
      perfil: {
        ...prev.perfil,
        servicios: prev.perfil.servicios.filter((_, i) => i !== index),
      },
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setState((prev) => ({
          ...prev,
          nuevaFoto: file,
          previewFoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const agregarFoto = () => {
    if (state.previewFoto) {
      setState((prev) => ({
        ...prev,
        perfil: {
          ...prev.perfil,
          fotos: [...prev.perfil.fotos, prev.previewFoto],
        },
        nuevaFoto: null,
        previewFoto: "",
      }));
    }
  };

  const eliminarFoto = (index) => {
    setState((prev) => ({
      ...prev,
      perfil: {
        ...prev.perfil,
        fotos: prev.perfil.fotos.filter((_, i) => i !== index),
      },
    }));
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
        {/* Encabezado */}
        <header className="perfil-header">
          <h1>
            <FiHome className="header-icon" />
            Perfil del Refugio
          </h1>

          {!state.editando ? (
            <button
              className="btn-editar"
              onClick={() => setState((prev) => ({ ...prev, editando: true }))}
            >
              <FiEdit /> Editar perfil
            </button>
          ) : (
            <div className="acciones-edicion">
              <button
                className="btn-cancelar"
                onClick={() =>
                  setState((prev) => ({ ...prev, editando: false }))
                }
              >
                <FiX /> Cancelar
              </button>
              <button className="btn-guardar" onClick={handleSubmit}>
                <FiSave /> Guardar cambios
              </button>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <div className="perfil-content">
          {/* Información básica */}
          <section className="seccion-perfil">
            <h2 className="seccion-titulo">Información básica</h2>

            {state.editando ? (
              <form className="formulario-perfil">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombre del refugio</label>
                    <input
                      type="text"
                      name="nombre"
                      value={state.perfil.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo de refugio</label>
                    <select
                      name="tipo"
                      value={state.perfil.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="Albergue">Albergue</option>
                      <option value="Casa Hogar">Casa Hogar</option>
                      <option value="Refugio Temporal">Refugio Temporal</option>
                      <option value="Centro Comunitario">
                        Centro Comunitario
                      </option>
                    </select>
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
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={state.perfil.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Capacidad</label>
                    <input
                      type="text"
                      name="capacidad"
                      value={state.perfil.capacidad}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Horario</label>
                    <input
                      type="text"
                      name="horario"
                      value={state.perfil.horario}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Servicios ofrecidos</label>
                    <div className="servicios-input-container">
                      <input
                        type="text"
                        value={state.nuevoServicio}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            nuevoServicio: e.target.value,
                          }))
                        }
                        placeholder="Agregar servicio"
                      />
                      <button
                        type="button"
                        className="btn-agregar-servicio"
                        onClick={agregarServicio}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="lista-servicios">
                      {state.perfil.servicios.map((servicio, index) => (
                        <div key={index} className="servicio-item">
                          <span>{servicio}</span>
                          <button
                            type="button"
                            className="btn-eliminar-servicio"
                            onClick={() => eliminarServicio(index)}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Normas del refugio</label>
                    <textarea
                      name="normas"
                      value={state.perfil.normas}
                      onChange={handleChange}
                      rows="4"
                      required
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="info-perfil">
                <div className="info-item">
                  <FiHome className="info-icon" />
                  <div>
                    <h3>Nombre</h3>
                    <p>{state.perfil.nombre}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FiCheckCircle className="info-icon" />
                  <div>
                    <h3>Tipo</h3>
                    <p>{state.perfil.tipo}</p>
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
                    <h3>Email</h3>
                    <p>{state.perfil.email}</p>
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
                    <h3>Horario</h3>
                    <p>{state.perfil.horario}</p>
                  </div>
                </div>

                <div className="info-item full-width">
                  <div>
                    <h3>Servicios ofrecidos</h3>
                    <ul className="lista-servicios">
                      {state.perfil.servicios.map((servicio, index) => (
                        <li key={index}>{servicio}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="info-item full-width">
                  <div>
                    <h3>Normas del refugio</h3>
                    <p>{state.perfil.normas}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Galería de fotos */}
          <section className="seccion-perfil">
            <h2 className="seccion-titulo">
              <FiImage /> Galería de fotos
            </h2>

            <div className="galeria-fotos">
              {state.perfil.fotos.map((foto, index) => (
                <div key={index} className="foto-item">
                  <img src={foto} alt={`Refugio ${index + 1}`} />
                  {state.editando && (
                    <button
                      className="btn-eliminar-foto"
                      onClick={() => eliminarFoto(index)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}

              {state.editando && (
                <div className="upload-foto-container">
                  <input
                    type="file"
                    id="upload-foto"
                    accept="image/*"
                    onChange={handleFotoChange}
                  />
                  <label htmlFor="upload-foto" className="upload-foto-btn">
                    {state.previewFoto ? (
                      <>
                        <img src={state.previewFoto} alt="Vista previa" />
                        <button
                          className="btn-confirmar-foto"
                          onClick={agregarFoto}
                        >
                          <FiPlus /> Agregar foto
                        </button>
                      </>
                    ) : (
                      <div className="upload-placeholder">
                        <FiPlus size={24} />
                        <span>Agregar foto</span>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </div>
          </section>

          {/* Estadísticas */}
          <section className="seccion-perfil">
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
        </div>
      </main>
    </>
  );
};

export default PerfilRefugio;
