import React, { useState, useEffect } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import FotoVoluntario from "../../../assets/FotoVoluntario.avif";
import "./Perfil.css";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [zonas, setZonas] = useState([]);
  const [editarVisible, setEditarVisible] = useState(false);
  const [formData, setFormData] = useState({
    usuario: "",
    correo: "",
    telefono: "",
    zona: "",
  });
useEffect(() => {
  const usuarioId = localStorage.getItem("usuarioId");
  console.log("usuario_id desde localStorage:", usuarioId);

  if (!usuarioId) {
    console.warn("No hay usuario_id en localStorage");
    return;
  }

  // Hacemos ambos fetch al mismo tiempo
  Promise.all([
    fetch("http://localhost:8000/api/usuarios/voluntarios/").then((res) => {
      if (!res.ok) throw new Error("Error al obtener voluntarios");
      return res.json();
    }),
    fetch("http://localhost:8000/api/zonas/zonas/").then((res) => {
      if (!res.ok) throw new Error("Error al obtener zonas");
      return res.json();
    }),
  ])
    .then(([voluntariosData, zonasData]) => {
      const voluntario = voluntariosData.find(
        (v) => v.usuario.id === parseInt(usuarioId, 10)
      );

      if (!voluntario) {
        console.warn("No se encontró voluntario con ese usuario_id");
        return;
      }

      const zonaEncontrada = zonasData.find((z) => z.id === voluntario.zona);

      const datos = {
        usuario: voluntario.usuario.nombre || "Sin nombre",
        correo: voluntario.usuario.correo || "Sin correo",
        telefono: voluntario.telefono || "",
        zona: zonaEncontrada ? zonaEncontrada.nombre : "Zona no encontrada",
      };

      setPerfil(datos);
      setFormData(datos);
    })
    .catch((error) => {
      console.error("Error en fetch:", error);
    });
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
                <label>Correo</label>
                <p className="valor-perfil">{perfil.correo}</p>
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
                  Correo:
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
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
