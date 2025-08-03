// Luna FLores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import DonadoresHeader from "../../../components/DonadoresHeader";
import {
  FiUser,
  FiMail,
  FiHome,
  FiPhone,
  FiClock,
  FiEdit,
  FiSave,
  FiX,
  FiCheck,
} from "react-icons/fi";
import "./PerfilDonador.css";

const PerfilDonador = () => {
  const [perfil, setPerfil] = useState(null);
  const [editarVisible, setEditarVisible] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [formData, setFormData] = useState({
    usuarioId: null,
    nombreUsuario: "",
    correo: "",
    nombreLugar: "",
    representante: "",
    telefono: "",
    descripcion: "",
    horarioApertura: "",
    horarioCierre: "",
  });

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    fetch("http://localhost:8000/api/usuarios/donadores/")
      .then((res) => res.json())
      .then((data) => {
        const donador = data.find(
          (d) => d.usuario.id === parseInt(usuarioId, 10)
        );
        if (!donador) return;

        setPerfil({
          usuarioId: donador.usuario.id,
          nombreUsuario: donador.usuario.nombre || "",
          correo: donador.usuario.correo || "",
          nombreLugar: donador.nombre_lugar || "",
          representante: donador.representante || "",
          telefono: donador.telefono || "",
          descripcion: donador.descripcion || "",
          horarioApertura: donador.horario_apertura || "",
          horarioCierre: donador.horario_cierre || "",
          donadorId: donador.id,
        });

        setFormData({
          usuarioId: donador.usuario.id,
          nombreUsuario: donador.usuario.nombre || "",
          correo: donador.usuario.correo || "",
          nombreLugar: donador.nombre_lugar || "",
          representante: donador.representante || "",
          telefono: donador.telefono || "",
          descripcion: donador.descripcion || "",
          horarioApertura: donador.horario_apertura || "",
          horarioCierre: donador.horario_cierre || "",
          donadorId: donador.id,
        });
      })
      .catch(console.error);
  }, []);

  const handleEditar = () => setEditarVisible(true);
  const handleCerrar = () => {
    setEditarVisible(false);
    if (perfil) {
      setFormData({ ...perfil });
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
      // Cambios para usuario
      const usuarioCambios = {};
      if (formData.nombreUsuario !== perfil.nombreUsuario)
        usuarioCambios.nombre = formData.nombreUsuario;
      if (formData.correo !== perfil.correo)
        usuarioCambios.correo = formData.correo;

      // Cambios para donador
      const donadorCambios = {};
      if (formData.nombreLugar !== perfil.nombreLugar)
        donadorCambios.nombre_lugar = formData.nombreLugar;
      if (formData.representante !== perfil.representante)
        donadorCambios.representante = formData.representante;
      if (formData.telefono !== perfil.telefono)
        donadorCambios.telefono = formData.telefono;
      if (formData.descripcion !== perfil.descripcion)
        donadorCambios.descripcion = formData.descripcion;
      if (formData.horarioApertura !== perfil.horarioApertura)
        donadorCambios.horario_apertura = formData.horarioApertura;
      if (formData.horarioCierre !== perfil.horarioCierre)
        donadorCambios.horario_cierre = formData.horarioCierre;

      // PATCH usuario si hay cambios
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

      // PATCH donador si hay cambios
      if (Object.keys(donadorCambios).length > 0) {
        const resDonador = await fetch(
          `http://localhost:8000/api/usuarios/donadores/${formData.donadorId}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(donadorCambios),
          }
        );
        if (!resDonador.ok) {
          const errorText = await resDonador.text();
          throw new Error(`Error al actualizar donador: ${errorText}`);
        }
      }

      setPerfil({ ...formData });
      setEditarVisible(false);
      setMostrarConfirmacion(false);
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      alert(`Error al actualizar el perfil: ${error.message}`);
      setMostrarConfirmacion(false);
    }
  };

  const cancelarActualizacion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <>
      <DonadoresHeader />
      <main className="perfil-refugio-container">
        <div className="perfil-header">
          <h1>
            <FiUser className="header-icon" />
            Mi Perfil - {perfil?.nombreUsuario}
          </h1>

          {!editarVisible && perfil && (
            <button className="btn-editar-pr" onClick={handleEditar}>
              <FiEdit />
              Editar Perfil
            </button>
          )}

          {editarVisible && (
            <div className="acciones-edicion">
              <button
                type="button"
                className="btn-cancelar-CD"
                onClick={handleCerrar}
              >
                <FiX style={{ marginRight: "0.5rem" }} />
                Cancelar
              </button>
              <button
                type="submit"
                form="form-perfil"
                className="btn-guardarCD"
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
          <div className="contenedor-ediciondonador">
            <form
              id="form-perfil"
              className="formulario-perfil"
              onSubmit={handleGuardar}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    name="nombreUsuario"
                    value={formData.nombreUsuario}
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
                  <label>Nombre del lugar</label>
                  <input
                    name="nombreLugar"
                    value={formData.nombreLugar}
                    onChange={handleCambio}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Representante</label>
                  <input
                    name="representante"
                    value={formData.representante}
                    onChange={handleCambio}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleCambio}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Horario apertura</label>
                  <input
                    type="time"
                    name="horarioApertura"
                    value={formData.horarioApertura}
                    onChange={handleCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Horario cierre</label>
                  <input
                    type="time"
                    name="horarioCierre"
                    value={formData.horarioCierre}
                    onChange={handleCambio}
                  />
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
                <FiHome className="info-icon" />
                <div>
                  <h3>Nombre del lugar</h3>
                  <p>{perfil.nombreLugar}</p>
                </div>
              </div>
              <div className="info-item">
                <FiUser className="info-icon" />
                <div>
                  <h3>Representante</h3>
                  <p>{perfil.representante}</p>
                </div>
              </div>
              <div className="info-item">
                <FiPhone className="info-icon" />
                <div>
                  <h3>Teléfono</h3>
                  <p>{perfil.telefono}</p>
                </div>
              </div>
              <div className="info-item full-width">
                <FiHome className="info-icon" />
                <div>
                  <h3>Descripción</h3>
                  <p>{perfil.descripcion}</p>
                </div>
              </div>
              <div className="info-item">
                <FiClock className="info-icon" />
                <div>
                  <h3>Horario Apertura</h3>
                  <p>{perfil.horarioApertura}</p>
                </div>
              </div>
              <div className="info-item">
                <FiClock className="info-icon" />
                <div>
                  <h3>Horario Cierre</h3>
                  <p>{perfil.horarioCierre}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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
    </>
  );
};

export default PerfilDonador;