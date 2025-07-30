// src/components/Login/SelectorZonas.jsx
import React from "react";

export default function SelectorZonas({ zonas, value, onChange, disabled }) {
  return (
    <select name="zona_id" value={value} onChange={onChange} disabled={disabled} required>
      <option value="">Selecciona una zona</option>
      {zonas.map((zona) => (
        <option key={zona.id} value={zona.id}>
          {zona.nombre}
        </option>
      ))}
    </select>
  );
}