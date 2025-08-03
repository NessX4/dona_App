// Luna FLores Yamileth Guadalupe
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./pages/Login/Login.jsx";

// Vistas del voluntario
import Voluntario from "./pages/Voluntario/voluntario.jsx";
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
import SucursalesRefugio from "./pages/Refugios/SucursalesRefugio/SucursalesRefugio.jsx";

// Vistas del donador
import Donadores from "./pages/Donadores/Donadores.jsx";
import PerfilDonador from "./pages/Donadores/PerfilDonador/PerfilDonador.jsx";
import NotificacionesDonador from "./pages/Donadores/NotificacionesDonador/NotificacionesDonador.jsx";
import SolicitudesDonador from "./pages/Donadores/SolicitudesDonador/SolicitudesDonador.jsx";
import DonacionesRest from "./pages/Donadores/DonacionesRest/DonacionesRest.jsx";

// Componente de protección
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas del voluntario */}
      <Route
        path="/voluntario"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Voluntario />
          </PrivateRoute>
        }
      />
      <Route
        path="/donaciones/publicaciones"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Donaciones />
          </PrivateRoute>
        }
      />
      <Route
        path="/solicitudes"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Solicitudes />
          </PrivateRoute>
        }
      />
      <Route
        path="/donaciones/sucursales"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Sucursales />
          </PrivateRoute>
        }
      />
      <Route
        path="/zonas/zonas"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Zonas />
          </PrivateRoute>
        }
      />
      <Route
        path="/notificaciones"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Notificaciones />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <Perfil />
          </PrivateRoute>
        }
      />
      <Route
        path="/historial"
        element={
          <PrivateRoute allowedRoles={["Voluntario"]}>
            <HistorialVoluntario />
          </PrivateRoute>
        }
      />

      {/* Rutas del refugio con LayoutPrincipal */}
      <Route
        path="/refugio"
        element={
          <PrivateRoute allowedRoles={["Refugio"]}>
            <LayoutPrincipal />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <DashboardRefugio />
            </PrivateRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <DashboardRefugio />
            </PrivateRoute>
          }
        />
        <Route
          path="donaciones-disponibles"
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <DonacionesDisponibles />
            </PrivateRoute>
          }
        />
        <Route
          path="historial-donaciones"
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <HistorialDonaciones />
            </PrivateRoute>
          }
        />
        <Route
          path="notificaciones"
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <NotificacionesRefugio />
            </PrivateRoute>
          }
        />
        <Route
          path="perfil"
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <PerfilRefugio />
            </PrivateRoute>
          }
        />
        <Route
          path="zonas-refugios"
          element={
            <PrivateRoute allowedRoles={["Refugio"]}>
              <ZonasRefugios />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="/refugio/sucursales"
        element={
          <PrivateRoute allowedRoles={["Refugio"]}>
            <SucursalesRefugio />
          </PrivateRoute>
        }
      />
      {/* Rutas del donador */}
      <Route
        path="/donadores"
        element={
          <PrivateRoute allowedRoles={["Donador"]}>
            <Donadores />
          </PrivateRoute>
        }
      />
      <Route
        path="/donadores/perfil"
        element={
          <PrivateRoute allowedRoles={["Donador"]}>
            <PerfilDonador />
          </PrivateRoute>
        }
      />
      <Route
        path="/donadores/notificaciones"
        element={
          <PrivateRoute allowedRoles={["Donador"]}>
            <NotificacionesDonador />
          </PrivateRoute>
        }
      />
      <Route
        path="/donadores/solicitudes"
        element={
          <PrivateRoute allowedRoles={["Donador"]}>
            <SolicitudesDonador />
          </PrivateRoute>
        }
      />
      <Route
        path="/donadores/donaciones"
        element={
          <PrivateRoute allowedRoles={["Donador"]}>
            <DonacionesRest />
          </PrivateRoute>
        }
      />
     
    </Routes>
  );
}

export default App;
