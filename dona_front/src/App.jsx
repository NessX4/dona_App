import React from "react";
import { Routes, Route } from "react-router-dom";

// Rutas existentes
import Home from "./components/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Voluntario from "./pages/Voluntario/voluntario.jsx";

// Nuevas vistas del voluntario (con rutas corregidas según carpetas)
import Donaciones from "./pages/Voluntario/Donaciones/Donaciones.jsx";
import Solicitudes from "./pages/Voluntario/Solicitudes/Solicitudes.jsx";
import Sucursales from "./pages/Voluntario/Sucursales/Sucursales.jsx";
import Zonas from "./pages/Voluntario/Zonas/Zonas.jsx";
import Notificaciones from "./pages/Voluntario/Notificaciones/Notificaciones.jsx";
import Perfil from "./pages/Voluntario/Perfil/Perfil.jsx";
import HistorialDona from "./pages/Voluntario/HistorialDona/HistorialDona.jsx"; // ✅ usa un nombre diferente
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/voluntario" element={<Voluntario />} />

      {/* Rutas del voluntario */}
      <Route path="/donaciones/publicaciones" element={<Donaciones />} />
      <Route path="/solicitudes" element={<Solicitudes />} />
      <Route path="/donaciones/sucursales" element={<Sucursales />} />
      <Route path="/zonas/zonas" element={<Zonas />} />
      <Route path="/notificaciones" element={<Notificaciones />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/historial" element={<HistorialDona />} />
    </Routes>
  );
}

export default App;
