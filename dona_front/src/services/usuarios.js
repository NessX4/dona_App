// src/services/usuarios.js
const API_URL = "http://localhost:8000/api";

export async function registrarUsuario(usuario, tipo, datos) {
  const url = `${API_URL}/${tipo}/registro/`;
  const payload = { usuario, [tipo]: datos };

  const respuesta = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json();
    throw new Error(errorData.detail || "Error al registrar usuario");
  }

  return await respuesta.json();
}

export async function iniciarSesion(correo, contrasena) {
  const respuesta = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contrasena }),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json();
    throw new Error(errorData.detail || "Credenciales incorrectas");
  }

  return await respuesta.json();
}

export async function recuperarContrasena(correo) {
  const respuesta = await fetch(`${API_URL}/recuperar/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo }),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json();
    throw new Error(errorData.detail || "Error al enviar recuperación");
  }

  return await respuesta.json();
}