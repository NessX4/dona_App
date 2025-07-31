// src/components/Login/FormVoluntario.jsx
import React from "react";
import SelectorZonas from "./SelectorZonas";

export default function FormVoluntario({ usuario, setUsuario, form, setForm, zonas, cargando, error }) {
  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleVoluntarioChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <input
        name="nombre"
        placeholder="Nombre completo"
        value={usuario.nombre}
        onChange={handleUsuarioChange}
        required
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={usuario.correo}
        onChange={handleUsuarioChange}
        required
      />

      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña (mínimo 8 caracteres)"
        value={usuario.contrasena}
        onChange={handleUsuarioChange}
        required
        minLength={8}
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleVoluntarioChange}
        required
      />

      <SelectorZonas
        zonas={zonas}
        value={form.zona_id}
        onChange={(e) => setForm({ ...form, zona_id: e.target.value })}
        disabled={cargando || !!error}
      />
    </>
  );
}
