// Luna FLores Yamileth Guadalupe
import React, { useState, useEffect } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import FotoVoluntario from "../../../assets/FotoVoluntario.avif";
import "./Perfil.css";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [editarVisible, setEditarVisible] = useState(false);
  const [formData, setFormData] = useState({
    usuario: "",
    telefono: "",
    zona: "",
  });

  useEffect(() => {
    setTimeout(() => {
      const datos = {
        usuario: "Ana Luz",
        telefono: "123-456-7890",
        zona: "Zona Río",
      };
      setPerfil(datos);
      setFormData(datos);
    }, 1000);
  }, []);

  const handleEditar = () => {
    setEditarVisible(true);
  };

  const handleCerrar = () => {
    setEditarVisible(false);
  };

  const handleCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setPerfil(formData);
    setEditarVisible(false);
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="donaciones-container">
        <h1 className="donaciones-title">
          Mi perfil{perfil ? ` - ${perfil.usuario}` : ""}
        </h1>

        <img
          src={FotoVoluntario}
          alt="Foto de Voluntario"
          className="foto-voluntario"
        />

        {!perfil ? (
          <p className="loading">Cargando perfil...</p>
        ) : (
          <>
            <div className="perfil-card">
              <div className="campo-perfil">
                <label>Usuario</label>
                <p className="valor-perfil">{perfil.usuario}</p>
              </div>
              <div className="campo-perfil">
                <label>Teléfono</label>
                <p className="valor-perfil">{perfil.telefono}</p>
              </div>
              <div className="campo-perfil">
                <label>Zona</label>
                <p className="valor-perfil">{perfil.zona}</p>
              </div>
            </div>
            <button className="btn-editar" onClick={handleEditar}>
              Editar perfil
            </button>
          </>
        )}

        {editarVisible && (
          <div className="modal-overlay" onClick={handleCerrar}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Editar perfil</h2>
              <form onSubmit={handleGuardar} className="form-editar">
                <label>
                  Usuario:
                  <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleCambio}
                    required
                  />
                </label>
                <label>
                  Teléfono:
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleCambio}
                    required
                  />
                </label>
                <label>
                  Zona:
                  <input
                    type="text"
                    name="zona"
                    value={formData.zona}
                    onChange={handleCambio}
                    required
                  />
                </label>
                <div className="modal-buttons">
                  <button type="submit" className="btn-guardar">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={handleCerrar}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Perfil;
