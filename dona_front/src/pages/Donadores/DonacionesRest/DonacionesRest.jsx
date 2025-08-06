// Luna Flores Yamileth Guadalupe
// DonacionesRest.jsx
import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiSave, FiTrash2, FiX } from "react-icons/fi";
import DonadoresHeader from "../../../components/DonadoresHeader";
import FormNuevaDonacion from "./FormNuevaDonacion";
import "./DonacionesRest.css";

const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => (
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

const DonacionesRest = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comidas, setComidas] = useState({});
  const [sucursales, setSucursales] = useState([]);
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [donadorId, setDonadorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [publicacionAEliminar, setPublicacionAEliminar] = useState(null);
  const [publicacionEditandoId, setPublicacionEditandoId] = useState(null);
  const [campoModificado, setCampoModificado] = useState(null);
  const [datosEditados, setDatosEditados] = useState({
    titulo: "",
    descripcion: "",
    cantidad: 1,
    fecha_publicacion: "",
    fecha_caducidad: "",
    sucursal: "",
    estado: "",
    comida_id: null,
    comida_nombre: "",
    comida_cantidad: "",
    comida_ingredientes: "",
    comida_categoria: "",
  });

  const usuarioId = localStorage.getItem("usuarioId");

  const obtenerDonadorId = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/usuarios/donadores/");
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();
      const donador = data.find((d) => d.usuario.id === parseInt(usuarioId));
      if (donador) setDonadorId(donador.id);
      else throw new Error("No se encontró el donador.");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const cargarDatos = async () => {
    try {
      const [pubRes, sucRes, estadoRes, categoriaRes, archivoRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/donaciones/publicaciones/"),
        fetch("http://127.0.0.1:8000/api/donaciones/sucursales/"),
        fetch("http://127.0.0.1:8000/api/donaciones/estados/"),
        fetch("http://127.0.0.1:8000/api/donaciones/categorias/"),
        fetch("http://127.0.0.1:8000/api/donaciones/archivos/"),
      ]);

      if (![pubRes, sucRes, estadoRes, categoriaRes, archivoRes].every(r => r.ok))
        throw new Error("Error al cargar datos");

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
      const publicacionesFiltradas = publicacionesArray
        .filter((pub) => {
          const sucursal = (sucursalesData.results || sucursalesData).find(
            (s) => s.id === pub.sucursal
          );
          return sucursal && sucursal.donador === donadorId;
        })
        .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));

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
          }
        })
      );
      setComidas(comidasObj);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuarioId) obtenerDonadorId();
    else {
      setError("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    if (donadorId !== null) cargarDatos();
  }, [donadorId]);

  const getSucursalNombre = (id) => sucursales.find((s) => s.id === id)?.nombre || "Desconocido";
  const getEstadoNombre = (id) => estados.find((e) => e.id === id)?.nombre || "Desconocido";
  const getCategoriaNombre = (id) => categorias.find((c) => c.id === id)?.nombre || "Desconocida";
  const getArchivosPorPublicacion = (pubId) => archivos.filter((a) => a.publicacion === pubId);

  const handleEditarClick = (pub) => {
    const comida = comidas[pub.id] || {};
    setPublicacionEditandoId(pub.id);
    setDatosEditados({
      titulo: pub.titulo || "",
      descripcion: pub.descripcion || "",
      cantidad: pub.cantidad || 1,
      fecha_publicacion: pub.fecha_publicacion?.substring(0, 10) || "",
      fecha_caducidad: pub.fecha_caducidad || "",
      sucursal: pub.sucursal || "",
      estado: pub.estado || "",
      comida_id: comida.id || null,
      comida_nombre: comida.nombre || "",
      comida_cantidad: comida.cantidad || "",
      comida_ingredientes: comida.ingredientes || "",
      comida_categoria: comida.categoria || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampoModificado(name);
    setDatosEditados((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelarEdicion = () => {
    setCampoModificado(null);
    setPublicacionEditandoId(null);
    setDatosEditados({
      titulo: "",
      descripcion: "",
      cantidad: 1,
      fecha_publicacion: "",
      fecha_caducidad: "",
      sucursal: "",
      estado: "",
      comida_id: null,
      comida_nombre: "",
      comida_cantidad: "",
      comida_ingredientes: "",
      comida_categoria: "",
    });
  };

  const handleGuardarEdicion = async () => {
    try {
      const value = datosEditados[campoModificado];
      const body = { [campoModificado]: value };

      const camposComida = [
        "comida_nombre",
        "comida_cantidad",
        "comida_ingredientes",
        "comida_categoria"
      ];

      if (camposComida.includes(campoModificado)) {
        const comidaBody = {
          [campoModificado.replace("comida_", "")]: value,
          publicacion: publicacionEditandoId,
        };

        const resComida = await fetch(
          `http://127.0.0.1:8000/api/donaciones/comidas/${datosEditados.comida_id}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comidaBody),
          }
        );
        if (!resComida.ok) throw new Error("Error al editar comida");

        setComidas((prev) => ({
          ...prev,
          [publicacionEditandoId]: {
            ...prev[publicacionEditandoId],
            [campoModificado.replace("comida_", "")]: value,
          },
        }));
      } else {
        const resPub = await fetch(
          `http://127.0.0.1:8000/api/donaciones/publicaciones/${publicacionEditandoId}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        if (!resPub.ok) throw new Error("Error al editar publicación");

        const pubActualizada = await resPub.json();
        setPublicaciones((prev) =>
          prev.map((pub) =>
            pub.id === publicacionEditandoId ? { ...pubActualizada, fecha_publicacion: pub.fecha_publicacion } : pub
          ).sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion))
        );
      }

      handleCancelarEdicion();
    } catch (error) {
      alert("Error al guardar los cambios");
      console.error(error);
    }
  };

  const handleEliminarPublicacion = (publicacion) => {
    setPublicacionAEliminar(publicacion);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/donaciones/publicaciones/${publicacionAEliminar.id}/`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar");

      setPublicaciones((prev) =>
        prev.filter((p) => p.id !== publicacionAEliminar.id)
      );
    } catch (error) {
      alert("Error al eliminar la publicación");
      console.error(error);
    } finally {
      setMostrarModalEliminar(false);
      setPublicacionAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setPublicacionAEliminar(null);
  };

  const handleMostrarFormulario = () => setMostrarFormulario(true);
  const handleOcultarFormulario = () => setMostrarFormulario(false);

  const agregarPublicacionEnLista = (nueva) => {
    setPublicaciones((prev) => 
      [nueva, ...prev].sort((a, b) => 
        new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
      )
    );
  };

  return (
    <>
      <DonadoresHeader />
      <main className="container historialDonador">
        <div className="header-publicaciones">
          {!mostrarFormulario && <h1>Mis Publicaciones</h1>}
          {!mostrarFormulario && (
            <button className="boton-agregar-donacion" onClick={handleMostrarFormulario}>
              <FiPlus className="icono-plus" />
              Agregar Donación
            </button>
          )}
        </div>

        {mostrarFormulario && (
          <div className="formulario-nueva-donacion">
            <FormNuevaDonacion
              onCancel={handleOcultarFormulario}
              onSave={(nueva) => {
                agregarPublicacionEnLista(nueva);
                handleOcultarFormulario();
              }}
            />
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
              const imagen = archivosAsociados[0];

              if (publicacionEditandoId === pub.id) {
                return (
                  <div key={`editing-${pub.id}`} className="publicacion-card publicacion-editando">
                    <div className="contenido-publicacion">
                      <input
                        name="titulo"
                        value={datosEditados.titulo}
                        onChange={handleInputChange}
                        placeholder="Título"
                        type="text"
                      />
                      <textarea
                        name="descripcion"
                        value={datosEditados.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción"
                      />
                      <input
                        name="cantidad"
                        type="number"
                        value={datosEditados.cantidad}
                        onChange={handleInputChange}
                        placeholder="Cantidad"
                      />
                      <input
                        name="fecha_publicacion"
                        type="date"
                        value={datosEditados.fecha_publicacion}
                        onChange={handleInputChange}
                      />
                      <input
                        name="fecha_caducidad"
                        type="date"
                        value={datosEditados.fecha_caducidad}
                        onChange={handleInputChange}
                      />
                      <input
                        name="comida_nombre"
                        value={datosEditados.comida_nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre de comida"
                        type="text"
                      />
                      <input
                        name="comida_cantidad"
                        value={datosEditados.comida_cantidad}
                        onChange={handleInputChange}
                        placeholder="Cantidad comida"
                        type="text"
                      />
                      <textarea
                        name="comida_ingredientes"
                        value={datosEditados.comida_ingredientes}
                        onChange={handleInputChange}
                        placeholder="Ingredientes"
                      />
                      <input
                        name="comida_categoria"
                        value={datosEditados.comida_categoria}
                        onChange={handleInputChange}
                        placeholder="Categoría"
                        type="text"
                      />
                      {imagen && (
                        <img
                          src={imagen.url}
                          alt={imagen.tipo}
                          className="imagen-archivo"
                        />
                      )}
                    </div>

                    <div className="botones-edicion-donacion">
                      <button
                        className="boton-editardonacion"
                        onClick={handleGuardarEdicion}
                        title="Guardar cambios"
                      >
                        <FiSave />
                      </button>
                      <button
                        className="boton-eliminardonacion"
                        onClick={handleCancelarEdicion}
                        title="Cancelar edición"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div key={`publicacion-${pub.id}`} className="publicacion-card">
                  <div className="contenido-publicacion">
                    <h2>{pub.titulo}</h2>
                    {imagen && (
                      <img
                        src={imagen.url}
                        alt={imagen.tipo}
                        className="ImagenDonacion"
                      />
                    )}
                    <p><strong>Descripción:</strong> {pub.descripcion}</p>
                    <p><strong>Cantidad:</strong> {pub.cantidad}</p>
                    <p><strong>Fecha Publicación:</strong> {pub.fecha_publicacion?.substring(0, 10)}</p>
                    <p><strong>Fecha Caducidad:</strong> {pub.fecha_caducidad}</p>
                    <p><strong>Sucursal:</strong> {getSucursalNombre(pub.sucursal)}</p>
                    <p><strong>Estado:</strong> {getEstadoNombre(pub.estado)}</p>
                    {comida && (
                      <>
                        <p><strong>Comida:</strong> {comida.nombre}</p>
                        <p><strong>Cantidad Comida:</strong> {comida.cantidad}</p>
                        <p><strong>Ingredientes:</strong> {comida.ingredientes}</p>
                        <p><strong>Categoría:</strong> {getCategoriaNombre(comida.categoria)}</p>
                      </>
                    )}
                  </div>

                  <div className="acciones-publicacion">
                    <button
                      className="boton-editardonacion"
                      onClick={() => handleEditarClick(pub)}
                      title="Editar publicación"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="boton-eliminardonacion"
                      onClick={() => handleEliminarPublicacion(pub)}
                      title="Eliminar publicación"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {mostrarModalEliminar && (
          <ModalConfirmacion
            mensaje="¿Estás seguro de eliminar esta publicación?"
            onConfirmar={confirmarEliminacion}
            onCancelar={cancelarEliminacion}
          />
        )}
      </main>
    </>
  );
};

export default DonacionesRest;