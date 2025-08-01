// src/components/Login/FormDonador.jsx
import React from "react";

export default function FormDonador({ usuario, setUsuario, form, setForm }) {
  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleDonadorChange = (e) => {
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
        name="nombrelugar"
        placeholder="Nombre del restaurante"
        value={form.nombrelugar}
        onChange={handleDonadorChange}
        required
      />

      <input
        name="representante"
        placeholder="Nombre del representante"
        value={form.representante}
        onChange={handleDonadorChange}
        required
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleDonadorChange}
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleDonadorChange}
        required
      />

      <div className="time-inputs">
        <label>Horario de apertura:</label>
        <input
          type="time"
          name="horarioapertura"
          value={form.horarioapertura}
          onChange={handleDonadorChange}
          required
        />

        <label>Horario de cierre:</label>
        <input
          type="time"
          name="horariocierre"
          value={form.horariocierre}
          onChange={handleDonadorChange}
          required
        />
      </div>
    </>
  );
}