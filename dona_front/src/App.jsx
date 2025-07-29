// Luna FLores Yamileth Guadalupe
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
import HistorialDona from "./pages/Voluntario/HistorialDona/HistorialDona.jsx"; //  usa un nombre diferente
import Donadores from "./pages/Donadores/Donadores.jsx";
import PerfilDonador from "./pages/Donadores/PerfilDonador/PerfilDonador.jsx";
import NotificacionesDonador from "./pages/Donadores/NotificacionesDonador/NotificacionesDonador.jsx";
import SolicitudesDonador from "./pages/Donadores/SolicitudesDonador/SolicitudesDonador.jsx";
import DonacionesRest from "./pages/Donadores/DonacionesRest/DonacionesRest.jsx";
import NuevaDona from "./pages/Donadores/NuevaDona/NuevaDona.jsx";

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
      <Route path="/donadores" element={<Donadores />} />
      <Route path="/donadores/perfil" element={<PerfilDonador />} />
      <Route path="/donadores/notificaciones" element={<NotificacionesDonador />} />
      <Route path="/donadores/solicitudes" element={<SolicitudesDonador />} />
      <Route path="/donadores/donaciones" element={<DonacionesRest />} />
      <Route path="/donadores/nueva-donacion" element={<NuevaDona />} />
      {/* Rutas adicionales si las necesitas */}
      {/* <Route path="/otra-ruta" element={<OtroComponente />} /> */}
    
      </Routes>
  );
}

export default App;
