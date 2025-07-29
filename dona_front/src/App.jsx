import React from "react";
import { Routes, Route } from "react-router-dom";

// Rutas existentes
import Home from "./components/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Voluntario from "./pages/Voluntario/voluntario.jsx";

// Vistas del voluntario
import Donaciones from "./pages/Voluntario/Donaciones/Donaciones.jsx";
import Solicitudes from "./pages/Voluntario/Solicitudes/Solicitudes.jsx";
import Sucursales from "./pages/Voluntario/Sucursales/Sucursales.jsx";
import Zonas from "./pages/Voluntario/Zonas/Zonas.jsx";
import Notificaciones from "./pages/Voluntario/Notificaciones/Notificaciones.jsx";
import Perfil from "./pages/Voluntario/Perfil/Perfil.jsx";
import HistorialVoluntario from "./pages/Voluntario/HistorialDona/HistorialDona.jsx";

// Vistas del refugio
import LayoutPrincipal from "./pages/Refugios/LayoutPrincipal/LayoutPrincipal.jsx";
import DashboardRefugio from "./pages/Refugios/DashboardRefugio/DashboardRefugio.jsx";
import DonacionesDisponibles from "./pages/Refugios/DonacionesDisponibles/DonacionesDisponibles.jsx";
import HistorialDonaciones from "./pages/Refugios/HistorialDonaciones/HistorialDonaciones.jsx";
import NotificacionesRefugio from "./pages/Refugios/NotificacionesRefugio/NotificacionesRefugio.jsx";
import PerfilRefugio from "./pages/Refugios/PerfilRefugio/PerfilRefugio.jsx";
import ZonasRefugios from "./pages/Refugios/ZonasRefugio/ZonasRefugio.jsx";

// Vistas del donador
import Donadores from "./pages/Donadores/Donadores.jsx";
import PerfilDonador from "./pages/Donadores/PerfilDonador/PerfilDonador.jsx";
import NotificacionesDonador from "./pages/Donadores/NotificacionesDonador/NotificacionesDonador.jsx";
import SolicitudesDonador from "./pages/Donadores/SolicitudesDonador/SolicitudesDonador.jsx";
import DonacionesRest from "./pages/Donadores/DonacionesRest/DonacionesRest.jsx";
import NuevaDona from "./pages/Donadores/NuevaDona/NuevaDona.jsx";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/voluntario" element={<Voluntario />} />

      {/* Rutas del voluntario */}
      <Route path="/voluntario" element={<Voluntario />} />
      <Route path="/donaciones/publicaciones" element={<Donaciones />} />
      <Route path="/solicitudes" element={<Solicitudes />} />
      <Route path="/donaciones/sucursales" element={<Sucursales />} />
      <Route path="/zonas/zonas" element={<Zonas />} />
      <Route path="/notificaciones" element={<Notificaciones />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/historial-voluntario" element={<HistorialVoluntario />} />

      {/* Rutas del refugio con LayoutPrincipal */}
      <Route path="/refugio" element={<LayoutPrincipal />}>
        <Route index element={<DashboardRefugio />} />
        <Route path="dashboard" element={<DashboardRefugio />} />
        <Route
          path="donaciones-disponibles"
          element={<DonacionesDisponibles />}
        />
        <Route path="historial-donaciones" element={<HistorialDonaciones />} />
        <Route path="notificaciones" element={<NotificacionesRefugio />} />
        <Route path="perfil" element={<PerfilRefugio />} />
        <Route path="zonas-refugios" element={<ZonasRefugios />} />
      </Route>

      {/* Rutas del donador */}
      <Route path="/donadores" element={<Donadores />} />
      <Route path="/donadores/perfil" element={<PerfilDonador />} />
      <Route path="/donadores/notificaciones" element={<NotificacionesDonador />} />
      <Route path="/donadores/solicitudes" element={<SolicitudesDonador />} />
      <Route path="/donadores/donaciones" element={<DonacionesRest />} />
      <Route path="/donadores/nueva-donacion" element={<NuevaDona />} />
    </Routes>
  );
}

export default App;