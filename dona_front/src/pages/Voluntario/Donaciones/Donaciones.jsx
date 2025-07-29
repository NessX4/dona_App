// Luna FLores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import VoluntarioHeader from "../../../components/VoluntarioHeader";
import "./Donaciones.css";

const Donaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

  const [donaciones] = useState([
    {
      id: 1,
      sucursal: "Sucursal Centro",
      estado: "En proceso",
      publicacion: "Comida para familias",
      categoria: "Alimentos secos",
      comida: "Arroz",
    },
    {
      id: 2,
      sucursal: "Sucursal Norte",
      estado: "Completada",
      publicacion: "Donación de frutas",
      categoria: "Frutas",
      comida: "Manzanas",
    },
    {
      id: 3,
      sucursal: "Sucursal Sur",
      estado: "Pendiente",
      publicacion: "Comida enlatada",
      categoria: "Enlatados",
      comida: "Atún",
    },
  ]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/")
      .then((res) => res.json())
      .then(setPublicaciones)
      .catch((err) => console.error("Error publicaciones:", err));

    fetch("http://127.0.0.1:8000/api/donaciones/sucursales/")
      .then((res) => res.json())
      .then(setSucursales)
      .catch((err) => console.error("Error sucursales:", err));

    fetch("http://127.0.0.1:8000/api/donaciones/estados/")
      .then((res) => res.json())
      .then(setEstados)
      .catch((err) => console.error("Error estados:", err));

    fetch("http://127.0.0.1:8000/api/donaciones/comidas/")
      .then((res) => res.json())
      .then(setComidas)
      .catch((err) => console.error("Error comidas:", err));

    fetch("http://127.0.0.1:8000/api/donaciones/categorias/")
      .then((res) => res.json())
      .then(setCategorias)
      .catch((err) => console.error("Error categorias:", err));

    fetch("http://127.0.0.1:8000/api/donaciones/archivos/")
      .then((res) => res.json())
      .then(setArchivosAdjuntos)
      .catch((err) => console.error("Error archivos:", err));
  }, []);

  const getSucursalNombre = (id) => {
    const sucursal = sucursales.find((s) => s.id === id);
    return sucursal ? sucursal.nombre : "Desconocido";
  };

  const getEstadoNombre = (id) => {
    const estado = estados.find((e) => e.id === id);
    return estado ? estado.nombre : "Desconocido";
  };

  const getComidaPorPublicacion = (pubId) => {
    return comidas.filter((c) => c.publicacion === pubId);
  };

  const getCategoriaNombre = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nombre : "Desconocida";
  };

  const getArchivosPorPublicacion = (pubId) => {
    return archivosAdjuntos.filter((a) => a.publicacion === pubId);
  };

  return (
    <>
      <VoluntarioHeader />
      <main className="container">
        <h1>Publicaciones de Donaciones</h1>

        {publicaciones.length === 0 ? (
          <p>No hay publicaciones cargadas.</p>
        ) : (
          <div className="publicaciones-wrapper">
            {publicaciones.map((item) => {
              const comidasAsociadas = getComidaPorPublicacion(item.id);
              const archivosAsociados = getArchivosPorPublicacion(item.id);

              return (
                <div key={item.id} className="publicacion-card">
                  <h2>{item.titulo}</h2>

                  {archivosAsociados.length > 0 && (
                    <div className="imagen-wrapper">
                      <img
                        src={archivosAsociados[0].url}
                        alt={archivosAsociados[0].tipo}
                        className="imagen-adjunta"
                      />
                    </div>
                  )}

                  <p><strong>Descripción:</strong> {item.descripcion}</p>
                  <p><strong>Cantidad:</strong> {item.cantidad}</p>
                  <p><strong>Fecha Publicación:</strong> {new Date(item.fecha_publicacion).toLocaleDateString()}</p>
                  <p><strong>Fecha Caducidad:</strong> {item.fecha_caducidad}</p>
                  <p><strong>Sucursal:</strong> {getSucursalNombre(item.sucursal)}</p>
                  <p><strong>Estado:</strong> {getEstadoNombre(item.estado)}</p>

                  <p><strong>Comidas:</strong>{" "}
                    {comidasAsociadas.length > 0
                      ? comidasAsociadas.map((c) => (
                          <span key={c.id} className="badge">{c.nombre}</span>
                        ))
                      : "Ninguna"}
                  </p>

                  <p><strong>Categorías:</strong>{" "}
                    {comidasAsociadas.length > 0
                      ? comidasAsociadas.map((c) => (
                          <span key={c.id} className="badge categoria">
                            {getCategoriaNombre(c.categoria)}
                          </span>
                        ))
                      : "Ninguna"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default Donaciones;
