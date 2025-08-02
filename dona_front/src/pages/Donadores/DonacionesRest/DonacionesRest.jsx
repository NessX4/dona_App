// Luna Flores Yamileth Guadalupe
import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit } from "react-icons/fi";
import DonadoresHeader from "../../../components/DonadoresHeader";
import "./DonacionesRest.css";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [publicacionAEliminar, setPublicacionAEliminar] = useState(null);
  const [publicacionEditando, setPublicacionEditando] = useState(null);

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
      const [pubRes, sucRes, estadoRes, categoriaRes, archivoRes] = await Promise.all([
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      obtenerDonadorId();
    } else {
      setError("No se encontró el ID de usuario.");
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    if (donadorId !== null) {
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

  const handleMostrarFormulario = () =
