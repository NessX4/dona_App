// src/pages/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useZonas from "../../hooks/useZonas";
import SelectorZonas from "./SelectorZonas";
import FormDonador from "./FormDonador";
import FormRefugio from "./FormRefugio";
import FormVoluntario from "./FormVoluntario";
import FormRecuperar from "./FormRecuperar";
import { registrarUsuario, iniciarSesion } from "../../services/usuarios";
import logoDona from "../../assets/Logotipo.png";
import "./Login.css";

export default function Login() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [recuperarCorreo, setRecuperarCorreo] = useState("");
  const [usuarioForm, setUsuarioForm] = useState({ nombre: "", correo: "", contrasena: "" });
  const [donadorForm, setDonadorForm] = useState({ nombrelugar: "", representante: "", telefono: "", descripcion: "", horarioapertura: "", horariocierre: "" });
  const [refugioForm, setRefugioForm] = useState({ nombre: "", encargado: "", telefono: "", direccion: "", capacidad: "", horarioapertura: "", horariocierre: "", zona_id: "" });
  const [voluntarioForm, setVoluntarioForm] = useState({ telefono: "", zona_id: "" });

  const { zonas, cargando, error } = useZonas();
  const navigate = useNavigate();

  const resetForms = () => {
    setUsuarioForm({ nombre: "", correo: "", contrasena: "" });
    setDonadorForm({ nombrelugar: "", representante: "", telefono: "", descripcion: "", horarioapertura: "", horariocierre: "" });
    setRefugioForm({ nombre: "", encargado: "", telefono: "", direccion: "", capacidad: "", horarioapertura: "", horariocierre: "", zona_id: "" });
    setVoluntarioForm({ telefono: "", zona_id: "" });
    setActiveForm(null);
    setModalOpen(false);
  };

  const handleRegistro = (tipo) => async (e) => {
    e.preventDefault();
    const rol_id = tipo === "donador" ? 1 : tipo === "refugio" ? 2 : 3;
    const usuario = { ...usuarioForm, rol_id };
    const datos = tipo === "donador" ? donadorForm : tipo === "refugio" ? refugioForm : voluntarioForm;

    try {
      await registrarUsuario(usuario, tipo, datos);
      alert(`${tipo} registrado con éxito`);
      resetForms();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await iniciarSesion(usuarioForm.correo, usuarioForm.contrasena);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("usuarioId", data.usuario_id);
      localStorage.setItem("rol", data.rol);
      navigate(data.rol === "Donador" ? "/donador" : data.rol === "Refugio" ? "/refugio" : "/voluntario");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-outer">
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <img src={logoDona} alt="Logo DONA" />
            <h1>DONA</h1>
          </div>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLoginSubmit}>
            <input type="email" placeholder="Correo" value={usuarioForm.correo} onChange={(e) => setUsuarioForm({ ...usuarioForm, correo: e.target.value })} required />
            <input type="password" placeholder="Contraseña" value={usuarioForm.contrasena} onChange={(e) => setUsuarioForm({ ...usuarioForm, contrasena: e.target.value })} required />
            <button type="submit">Iniciar Sesión</button>
          </form>
          <button onClick={() => { setModalOpen(true); setActiveForm(null); }}>Regístrate</button>
          <button onClick={() => { setModalOpen(true); setActiveForm("recuperar"); }}>¿Olvidaste tu contraseña?</button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {activeForm === "recuperar" ? (
              <FormRecuperar correo={recuperarCorreo} setCorreo={setRecuperarCorreo} close={() => { setActiveForm(null); setModalOpen(false); }} />
            ) : !activeForm ? (
              <>
                <h3>¿Cómo quieres registrarte?</h3>
                <button onClick={() => setActiveForm("donador")}>Restaurante</button>
                <button onClick={() => setActiveForm("refugio")}>Refugio</button>
                <button onClick={() => setActiveForm("voluntario")}>Voluntario</button>
              </>
            ) : (
              <form onSubmit={handleRegistro(activeForm)}>
                {activeForm === "donador" && (
                  <FormDonador form={donadorForm} setForm={setDonadorForm} usuario={usuarioForm} setUsuario={setUsuarioForm} />
                )}
                {activeForm === "refugio" && (
                  <FormRefugio form={refugioForm} setForm={setRefugioForm} usuario={usuarioForm} setUsuario={setUsuarioForm} zonas={zonas} cargando={cargando} error={error} />
                )}
                {activeForm === "voluntario" && (
                  <FormVoluntario form={voluntarioForm} setForm={setVoluntarioForm} usuario={usuarioForm} setUsuario={setUsuarioForm} zonas={zonas} cargando={cargando} error={error} />
                )}
                <button type="submit">Registrar</button>
              </form>
            )}
            <button className="close-btn" onClick={() => { setActiveForm(null); setModalOpen(false); }}>← Regresar</button>
          </div>
        </div>
      )}
    </div>
  );
}
