/*
 * Responsable: Mariela Higuera
 * Descripción: Componente exclusivo para el login de administradores en el sistema.
 */


import React, { useState } from "react";
import "./AdminLogin.css";
import logoDona from "../../assets/Logotipo.png";

export default function AdminLogin() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/usuarios/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      // Validar si el rol es administrador
      if (data.rol !== "Administrador") {
        throw new Error("Acceso no autorizado, contacte con soporte.");
      }

      // Guardar en localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("usuarioId", data.usuario_id);
      localStorage.setItem("rol", data.rol); // Guardar directamente "Administrador"

      // Redirigir al panel admin
      window.location.href = "/admin/#/";

    } catch (error) {
      alert(error.message);
      console.error("Error en el login de admin:", error);
    }
  };

  return (
    <div className="login-outer">
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <img src={logoDona} alt="Logo DONA" />
            <h1 className="titulo-dona">DONA</h1>
          </div>

          <h2>Login Administrativo</h2>

          <form onSubmit={handleAdminLogin}>
            <label htmlFor="admin-email">Correo electrónico</label>
            <input
              type="email"
              id="admin-email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="email"
            />

            <label htmlFor="admin-password">Contraseña</label>
            <input
              type="password"
              id="admin-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}
