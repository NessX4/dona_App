// src/components/Login/FormRefugio.jsx
import React from "react";
import SelectorZonas from "./SelectorZonas";

export default function FormRefugio({ usuario, setUsuario, form, setForm, zonas, cargando, error }) {
  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleRefugioChange = (e) => {
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
        name="nombre"
        placeholder="Nombre del refugio"
        value={form.nombre}
        onChange={handleRefugioChange}
        required
      />

      <input
        name="encargado"
        placeholder="Encargado"
        value={form.encargado}
        onChange={handleRefugioChange}
        required
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleRefugioChange}
        required
      />

      <input
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleRefugioChange}
        required
      />

      <input
        name="capacidad"
        placeholder="Capacidad"
        value={form.capacidad}
        onChange={handleRefugioChange}
        required
      />

      <div className="time-inputs">
        <label>Horario de apertura:</label>
        <input
          type="time"
          name="horarioapertura"
          value={form.horarioapertura}
          onChange={handleRefugioChange}
          required
        />

        <label>Horario de cierre:</label>
        <input
          type="time"
          name="horariocierre"
          value={form.horariocierre}
          onChange={handleRefugioChange}
          required
        />
      </div>

      <SelectorZonas
        zonas={zonas}
        value={form.zona_id}
        onChange={(e) => setForm({ ...form, zona_id: e.target.value })}
        disabled={cargando || !!error}
      />
    </>
  );
}