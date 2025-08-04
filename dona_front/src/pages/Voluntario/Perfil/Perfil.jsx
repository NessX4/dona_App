// Luna FLores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiEdit,
  FiSave,
  FiX,
} from "react-icons/fi";
import "./Perfil.css";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [zonas, setZonas] = useState([]);
  const [editarVisible, setEditarVisible] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    zona: "",
    usuarioId: null,
    voluntarioId: null,
  });

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      console.warn("No hay usuario_id en localStorage");
      return;
    }

    const fetchData = async () => {
      try {
        const [voluntariosRes, zonasRes] = await Promise.all([
          fetch("http://localhost:8000/api/usuarios/voluntarios/"),
          fetch("http://localhost:8000/api/zonas/zonas/"),
        ]);

        if (!voluntariosRes.ok || !zonasRes.ok) {
          throw new Error("Error al obtener datos");
        }

        const [voluntariosData, zonasData] = await Promise.all([
          voluntariosRes.json(),
          zonasRes.json(),
        ]);

        const voluntario = voluntariosData.find(
          (v) => v.usuario.id === parseInt(usuarioId, 10)
        );

        if (!voluntario) {
          console.warn("No se encontró voluntario con ese usuario_id");
          return;
        }

        const datos = {
          nombre: voluntario.usuario.nombre,
          correo: voluntario.usuario.correo,
          telefono: voluntario.telefono,
          zona: voluntario.zona,
          usuarioId: voluntario.usuario.id,
          voluntarioId: voluntario.id,
        };

        setPerfil(datos);
        setFormData(datos);
        setZonas(zonasData);
      } catch (error) {
        console.error("Error en fetch:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditar = () => {
    setEditarVisible(true);
  };

  const handleCerrar = () => {
    setEditarVisible(false);
    if (perfil) {
      setFormData({
        nombre: perfil.nombre,
        correo: perfil.correo,
        telefono: perfil.telefono,
        zona: perfil.zona,
        usuarioId: perfil.usuarioId,
        voluntarioId: perfil.voluntarioId,
      });
    }
  };

  const handleCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setMostrarConfirmacion(true);
  };

  const confirmarActualizacion = async () => {
    try {
      // Cambios para usuario (nombre, correo)
      const usuarioCambios = {};
      if (formData.nombre !== perfil.nombre) usuarioCambios.nombre = formData.nombre;
      if (formData.correo !== perfil.correo) usuarioCambios.correo = formData.correo;

      // Cambios para voluntario (telefono, zona)
      const voluntarioCambios = {};
      if (formData.telefono !== perfil.telefono) voluntarioCambios.telefono = formData.telefono;
      if (parseInt(formData.zona, 10) !== perfil.zona) voluntarioCambios.zona = parseInt(formData.zona, 10);

      // Actualizar usuario si hay cambios
      if (Object.keys(usuarioCambios).length > 0) {
        const resUsuario = await fetch(
          `http://localhost:8000/api/usuarios/usuarios/${formData.usuarioId}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioCambios),
          }
        );
        if (!resUsuario.ok) {
          const errorText = await resUsuario.text();
          throw new Error(`Error al actualizar usuario: ${errorText}`);
        }
      }

      // Actualizar voluntario si hay cambios
      if (Object.keys(voluntarioCambios).length > 0) {
        const resVoluntario = await fetch(
          `http://localhost:8000/api/usuarios/voluntarios/${formData.voluntarioId}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(voluntarioCambios),
          }
        );
        if (!resVoluntario.ok) {
          const errorText = await resVoluntario.text();
          throw new Error(`Error al actualizar voluntario: ${errorText}`);
        }
      }

      setPerfil({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        zona: formData.zona,
        usuarioId: formData.usuarioId,
        voluntarioId: formData.voluntarioId,
      });
      setEditarVisible(false);
      setMostrarConfirmacion(false);
    } catch (error) {
      console.error("Error completo al guardar:", error);
      alert(`Error al actualizar el perfil: ${error.message}`);
      setMostrarConfirmacion(false);
    }
  };

  const cancelarActualizacion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="perfil-voluntario-container">
        <div className="perfil-header">
          <h1>
            <FiUser className="header-icon" />
            Mi Perfil - {perfil?.nombre}
          </h1>

          {!editarVisible && perfil && (
            <button className="btn-editarVoluntario-pr" onClick={handleEditar}>
              <FiEdit />
              Editar Perfil
            </button>
          )}

          {editarVisible && (
            <div className="acciones-edicion">
              <button
                type="button"
                className="btn-cancelar-CV"
                onClick={handleCerrar}
              >
                <FiX style={{ marginRight: "0.5rem" }} />
                Cancelar
              </button>
              <button
                type="submit"
                form="form-perfil-voluntario"
                className="btn-guardarCV"
              >
                <FiSave style={{ marginRight: "0.5rem" }} />
                Guardar cambios
              </button>
            </div>
          )}
        </div>

        {!perfil ? (
          <div className="loading-container">
            <div className="spinner" />
            <p>Cargando perfil...</p>
          </div>
        ) : editarVisible ? (
          <div className="contenedor-edicion">
            <form
              id="form-perfil-voluntario"
              className="formulario-perfil"
              onSubmit={handleGuardar}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleCambio}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Correo</label>
                  <input
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleCambio}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleCambio}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Zona</label>
                  <select
                    name="zona"
                    value={formData.zona}
                    onChange={handleCambio}
                    required
                  >
                    <option value="">Selecciona una zona</option>
                    {zonas.map((zona) => (
                      <option key={zona.id} value={zona.id}>
                        {zona.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="seccion-perfil">
            <h2 className="seccion-titulo">Tus datos</h2>
            <div className="info-perfil">
              <div className="info-item">
                <FiMail className="info-icon" />
                <div>
                  <h3>Correo</h3>
                  <p>{perfil.correo}</p>
                </div>
              </div>
              <div className="info-item">
                <FiPhone className="info-icon" />
                <div>
                  <h3>Teléfono</h3>
                  <p>{perfil.telefono}</p>
                </div>
              </div>
              <div className="info-item">
                <FiHome className="info-icon" />
                <div>
                  <h3>Zona</h3>
                  <p>
                    {zonas.find((z) => z.id === perfil.zona)?.nombre ||
                      "Zona no encontrada"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación */}
        {mostrarConfirmacion && (
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

export default Perfil;