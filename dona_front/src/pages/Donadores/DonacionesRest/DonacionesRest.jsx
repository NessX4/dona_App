<<<<<<< Updated upstream
// Luna FLores Yamileth Guadalupe
=======
>>>>>>> Stashed changes
import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiX } from "react-icons/fi";
import DonadoresHeader from "../../../components/DonadoresHeader";
import "./DonacionesRest.css";

<<<<<<< Updated upstream
const DonacionesRest = ({ donadorId }) => {
  const [solicitudes, setSolicitudes] = useState([]);
=======
const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <p className="modal-mensaje">{mensaje}</p>
        <div className="modal-botones">
          <button className="btn-cancelarED" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn-eliminarED" onClick={onConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

const FormNuevaDonacion = ({
  modoEdicion = false,
  datosPublicacion = {},
  datosComida = {},
  onCancel,
  onSave,
}) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");

  const [nombreComida, setNombreComida] = useState("");
  const [cantidadComida, setCantidadComida] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (modoEdicion && datosPublicacion) {
      setTitulo(datosPublicacion.titulo || "");
      setDescripcion(datosPublicacion.descripcion || "");
      setCantidad(datosPublicacion.cantidad || "");
      setFechaCaducidad(datosPublicacion.fecha_caducidad || "");

      if (datosComida) {
        setNombreComida(datosComida.nombre || "");
        setCantidadComida(datosComida.cantidad || "");
        setIngredientes(datosComida.ingredientes || "");
        setCategoria(datosComida.categoria || "");
      }
    }
  }, [modoEdicion, datosPublicacion, datosComida]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Actualizar publicación
      const publicacionActualizada = {
        ...datosPublicacion,
        titulo,
        descripcion,
        cantidad,
        fecha_caducidad: fechaCaducidad,
      };

      const resPub = await fetch(
        `http://127.0.0.1:8000/api/donaciones/publicaciones/${datosPublicacion.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(publicacionActualizada),
        }
      );
      if (!resPub.ok) throw new Error("Error al actualizar publicación");

      // Actualizar comida
      const comidaActualizada = {
        ...datosComida,
        nombre: nombreComida,
        cantidad: cantidadComida,
        ingredientes,
        categoria,
        publicacion: datosPublicacion.id,
      };

      // Si comida tiene id hacemos PUT, si no POST
      const urlComida = comidaActualizada.id
        ? `http://127.0.0.1:8000/api/donaciones/comidas/${comidaActualizada.id}/`
        : "http://127.0.0.1:8000/api/donaciones/comidas/";

      const methodComida = comidaActualizada.id ? "PUT" : "POST";

      const resComida = await fetch(urlComida, {
        method: methodComida,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comidaActualizada),
      });
      if (!resComida.ok) throw new Error("Error al actualizar comida");

      const pubActualizadaJson = await resPub.json();
      const comidaActualizadaJson = await resComida.json();

      // Devolver los datos actualizados
      if (onSave) {
        onSave({
          ...pubActualizadaJson,
          comida: comidaActualizadaJson,
        });
      }
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-nueva-donacion">
      <div>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Cantidad:
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Fecha Caducidad:
          <input
            type="date"
            value={fechaCaducidad}
            onChange={(e) => setFechaCaducidad(e.target.value)}
            required
          />
        </label>
      </div>

      <hr />

      <h4>Datos de la comida</h4>

      <div>
        <label>
          Nombre Comida:
          <input
            type="text"
            value={nombreComida}
            onChange={(e) => setNombreComida(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Cantidad Comida:
          <input
            type="number"
            value={cantidadComida}
            onChange={(e) => setCantidadComida(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Ingredientes:
          <textarea
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Categoría:
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </label>
      </div>

      <div className="botones-edicion-donacion">
        <button type="submit" className="btn-guardarEdDona">
          Guardar Cambios
        </button>
        <button type="button" className="btn-cancelarEdDona" onClick={onCancel}>
         Cancelar
        </button>
      </div>
    </form>
  );
};

const DonacionesRest = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comidas, setComidas] = useState({});
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [donadorId, setDonadorId] = useState(null);
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [publicacionAEliminar, setPublicacionAEliminar] = useState(null);

  // Estado para publicación que se está editando (ID)
  const [publicacionEditando, setPublicacionEditando] = useState(null);

<<<<<<< Updated upstream
  const cargarDatos = async () => {
    try {
      const [solicRes, pubRes, sucRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/solicitudes/solicitudes/"),
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
      ]);

      if (!solicRes.ok) throw new Error("Error al obtener solicitudes");
      if (!pubRes.ok) throw new Error("Error al obtener publicaciones");
      if (!sucRes.ok) throw new Error("Error al obtener sucursales");

      const [solicData, pubData, sucData] = await Promise.all([
        solicRes.json(),
        pubRes.json(),
        sucRes.json(),
      ]);

      const solicitudesArray = solicData.results || solicData;
      const publicacionesArray = pubData.results || pubData;
      const sucursalesArray = sucData.results || sucData;

      // Filtrar solicitudes SOLO del donador actual
      const solicitudesDonador = solicitudesArray.filter(
        (solicitud) => solicitud.donador === donadorId
      );

      // Mapear detalles
      const solicitudesConDetalles = solicitudesDonador.map((solicitud) => {
        const publicacion = publicacionesArray.find(
          (p) => p.id === solicitud.publicacion
        ) || null;

        let receptorSucursal = null;

        if (typeof solicitud.receptor === "object" && solicitud.receptor !== null) {
          receptorSucursal = solicitud.receptor;
        } else {
          receptorSucursal = sucursalesArray.find(
            (s) => s.id === solicitud.receptor
          ) || null;
        }

        return {
          ...solicitud,
          publicacionDetalle: publicacion,
          receptorDetalle: receptorSucursal,
        };
      });

      setSolicitudes(solicitudesConDetalles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
=======
  const usuarioId = localStorage.getItem("usuarioId");

  const obtenerDonadorId = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/usuarios/donadores/");
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();
      const donador = data.find((d) => d.usuario.id === parseInt(usuarioId));
      if (donador) {
        setDonadorId(donador.id);
      } else {
        setError("No se encontró el donador correspondiente.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error al obtener donadores:", err.message);
      setError("Error al obtener donadores.");
      setLoading(false);
    }
  };

  const cargarDatos = async () => {
    try {
      const [
        pubRes,
        sucRes,
        estadoRes,
        categoriaRes,
        archivoRes,
      ] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
        fetch("http://127.0.0.1:8000/api/donaciones/estados/"),
        fetch("http://127.0.0.1:8000/api/donaciones/categorias/"),
        fetch("http://127.0.0.1:8000/api/donaciones/archivos/"),
      ]);

      if (!pubRes.ok) throw new Error(`Error HTTP publicaciones: ${pubRes.status}`);
      if (!sucRes.ok) throw new Error(`Error HTTP sucursales: ${sucRes.status}`);
      if (!estadoRes.ok) throw new Error(`Error HTTP estados: ${estadoRes.status}`);
      if (!categoriaRes.ok) throw new Error(`Error HTTP categorías: ${categoriaRes.status}`);
      if (!archivoRes.ok) throw new Error(`Error HTTP archivos: ${archivoRes.status}`);

      const publicacionesData = await pubRes.json();
      const sucursalesData = await sucRes.json();
      const estadosData = await estadoRes.json();
      const categoriasData = await categoriaRes.json();
      const archivosData = await archivoRes.json();

      setSucursales(sucursalesData.results || sucursalesData);
      setEstados(estadosData.results || estadosData);
      setCategorias(categoriasData.results || categoriasData);
      setArchivos(archivosData.results || archivosData);

      const publicacionesArray = publicacionesData.results || publicacionesData;
      const publicacionesFiltradas = publicacionesArray.filter((pub) => {
        const sucursal = (sucursalesData.results || sucursalesData).find(
          (s) => s.id === pub.sucursal
        );
        return sucursal && sucursal.donador === donadorId;
      });

      setPublicaciones(publicacionesFiltradas);

      const comidasObj = {};
      await Promise.all(
        publicacionesFiltradas.map(async (pub) => {
          const resComida = await fetch(
            `http://127.0.0.1:8000/api/donaciones/comidas/?publicacion=${pub.id}`
          );
          if (resComida.ok) {
            const dataComida = await resComida.json();
            comidasObj[pub.id] = dataComida.results?.[0] || dataComida[0] || null;
          } else {
            comidasObj[pub.id] = null;
          }
        })
      );
      setComidas(comidasObj);

      setLoading(false);
    } catch (err) {
      console.error("Error al cargar datos:", err.message);
      setError("Error al obtener datos.");
>>>>>>> Stashed changes
      setLoading(false);
    }
  };

  useEffect(() => {
<<<<<<< Updated upstream
    if (donadorId) {
=======
    if (usuarioId) {
      obtenerDonadorId();
    } else {
      setError("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    if (donadorId !== null) {
>>>>>>> Stashed changes
      cargarDatos();
    }
  }, [donadorId]);

  const getSucursalNombre = (id) => {
    const sucursal = sucursales.find((s) => s.id === id);
    return sucursal ? sucursal.nombre : "Desconocido";
  };

  const getEstadoNombre = (id) => {
    const estado = estados.find((e) => e.id === id);
    return estado ? estado.nombre : "Desconocido";
  };

  const getCategoriaNombre = (id) => {
    const categoria = categorias.find((c) => c.id === id);
    return categoria ? categoria.nombre : "Desconocida";
  };

  const getArchivosPorPublicacion = (pubId) => {
    return archivos.filter((a) => a.publicacion === pubId);
  };

  const handleMostrarFormulario = () => setMostrarFormulario(true);
  const handleOcultarFormulario = () => setMostrarFormulario(false);

  const handleEliminarPublicacion = (publicacion) => {
    setPublicacionAEliminar(publicacion);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/donaciones/publicaciones/${publicacionAEliminar.id}/`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error(`Error al eliminar: ${res.status}`);

      setPublicaciones((prev) =>
        prev.filter((p) => p.id !== publicacionAEliminar.id)
      );
      setMostrarModalEliminar(false);
      setPublicacionAEliminar(null);
    } catch (err) {
      console.error("Error al eliminar publicación:", err);
      alert("Ocurrió un error al eliminar la publicación.");
      setMostrarModalEliminar(false);
      setPublicacionAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setPublicacionAEliminar(null);
  };

  const handleEditarPublicacion = (publicacion) => {
    if (publicacionEditando === publicacion.id) {
      setPublicacionEditando(null);
    } else {
      setPublicacionEditando(publicacion.id);
    }
  };

  return (
    <>
      <DonadoresHeader />
      <main className="container historialDonador">
<<<<<<< Updated upstream
        <h1>Mis Donaciones</h1>

        {loading && <p>Cargando donaciones...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && solicitudes.length === 0 && (
          <p>No tienes donaciones registradas.</p>
        )}

        {!loading && !error && solicitudes.length > 0 && (
          <table className="historial-table">
            <thead>
              <tr>
                <th>Publicación</th>
                <th>Receptor</th>
                <th>Estado</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id}>
                  <td>{solicitud.publicacionDetalle?.titulo || "N/A"}</td>
                  <td>{solicitud.receptorDetalle?.nombre || "N/A"}</td>
                  <td>
                    <span className={`status ${solicitud.estado.toLowerCase()}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td>{solicitud.comentarios || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
=======
        <div className="header-publicaciones">
          {!mostrarFormulario && <h1>Mis Publicaciones</h1>}
          {!mostrarFormulario && (
            <button
              className="boton-circular"
              title="Nueva publicación"
              onClick={handleMostrarFormulario}
            >
              <FiPlus />
            </button>
          )}
        </div>

        {mostrarFormulario && (
          <div className="formulario-nueva-donacion">
            <FormNuevaDonacion onCancel={handleOcultarFormulario} />
          </div>
        )}

        {loading && <p className="loading">Cargando publicaciones...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && !mostrarFormulario && publicaciones.length === 0 && (
          <p>No tienes publicaciones registradas.</p>
        )}

        {!loading && !error && !mostrarFormulario && publicaciones.length > 0 && (
          <div className="publicaciones-wrapper">
            {publicaciones.map((pub) => {
              const comida = comidas[pub.id];
              const archivosAsociados = getArchivosPorPublicacion(pub.id);

              const claseCard =
                pub.id === publicacionEditando
                  ? "publicacion-card publicacion-editando"
                  : "publicacion-card";

              return (
                <div key={pub.id} className={claseCard}>
                  {pub.id === publicacionEditando ? (
                    <FormNuevaDonacion
                      modoEdicion={true}
                      datosPublicacion={pub}
                      datosComida={comida}
                      onCancel={() => setPublicacionEditando(null)}
                      onSave={(publicacionActualizada) => {
                        setPublicaciones((prev) =>
                          prev.map((p) =>
                            p.id === pub.id
                              ? {
                                  ...p,
                                  ...publicacionActualizada,
                                }
                              : p
                          )
                        );
                        // Actualiza comida también en el estado comidas
                        setComidas((prev) => ({
                          ...prev,
                          [pub.id]: publicacionActualizada.comida || comida,
                        }));
                        setPublicacionEditando(null);
                      }}
                    />
                  ) : (
                    <>
                      <div className="contenido-publicacion">
                        <h2>{pub.titulo}</h2>

                        {archivosAsociados.length > 0 && (
                          <div className="imagen-wrapper">
                            <img
                              src={archivosAsociados[0].url}
                              alt={archivosAsociados[0].tipo}
                              className="imagen-adjunta"
                            />
                          </div>
                        )}

                        <p>
                          <strong>Descripción:</strong> {pub.descripcion}
                        </p>
                        <p>
                          <strong>Cantidad:</strong> {pub.cantidad}
                        </p>
                        <p>
                          <strong>Fecha Publicación:</strong>{" "}
                          {new Date(pub.fecha_publicacion).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Fecha Caducidad:</strong> {pub.fecha_caducidad}
                        </p>
                        <p>
                          <strong>Sucursal:</strong> {getSucursalNombre(pub.sucursal)}
                        </p>
                        <p>
                          <strong>Estado:</strong> {getEstadoNombre(pub.estado)}
                        </p>
                        <p>
                          <strong>Comida:</strong> {comida ? comida.nombre : "Ninguna"}
                        </p>
                        <p>
                          <strong>Cantidad Comida:</strong>{" "}
                          {comida ? comida.cantidad : "-"}
                        </p>
                        <p>
                          <strong>Ingredientes:</strong> {comida ? comida.ingredientes : "-"}
                        </p>
                        <p>
                          <strong>Categoría:</strong>{" "}
                          {comida ? getCategoriaNombre(comida.categoria) : "-"}
                        </p>
                      </div>

                      <div className="acciones-publicacion">
                        <button
                          className="boton-editardonacion"
                          title="Editar publicación"
                          onClick={() => handleEditarPublicacion(pub)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="boton-eliminardonacion"
                          title="Eliminar publicación"
                          onClick={() => handleEliminarPublicacion(pub)}
                        >
                          ×
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {mostrarModalEliminar && (
          <ModalConfirmacion
            mensaje={`¿Estás seguro de que quieres eliminar la publicación "${publicacionAEliminar.titulo}"?`}
            onCancelar={cancelarEliminacion}
            onConfirmar={confirmarEliminacion}
          />
>>>>>>> Stashed changes
        )}
      </main>
    </>
  );
};

export default DonacionesRest;
