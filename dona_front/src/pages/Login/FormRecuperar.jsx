import React from "react";

export default function FormRecuperar({ correo, setCorreo }) {
  return (
    <input
      type="email"
      name="correo"
      placeholder="Correo electrónico"
      value={correo}
      onChange={(e) => setCorreo(e.target.value)}
      required
    />
  );
}
