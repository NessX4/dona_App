-- Active: 1750291402557@@127.0.0.1@5432@dona_db
-- -- Database: dona_db

-- -- DROP DATABASE IF EXISTS dona_db;

-- CREATE DATABASE dona_db
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'Spanish_Mexico.1252'
--     LC_CTYPE = 'Spanish_Mexico.1252'
--     LOCALE_PROVIDER = 'libc'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- Create the database
-- CREATE DATABASE DONA_DB;

-- Connect to the database
--\c food_donation_system

-- Create tables
CREATE TABLE USUARIO (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    rol VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UBICACION (
    id_ubicacion SERIAL PRIMARY KEY,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    referencia VARCHAR(200)
);

CREATE TABLE CATEGORIA (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE RESTAURANTE (
    id_rest SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    nombre_rest VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    ruc VARCHAR(20) UNIQUE NOT NULL,
    horario VARCHAR(100),
    descripcion TEXT,
    id_ubicacion INTEGER REFERENCES UBICACION(id_ubicacion) NOT NULL
);

CREATE TABLE DONACION (
    id_donacion SERIAL PRIMARY KEY,
    id_rest INTEGER REFERENCES RESTAURANTE(id_rest) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_limite TIMESTAMP NOT NULL,
    estado VARCHAR(20) NOT NULL,
    id_ubicacion INTEGER REFERENCES UBICACION(id_ubicacion) NOT NULL
);

CREATE TABLE DETALLE_ALIMENTO (
    id_detalle SERIAL PRIMARY KEY,
    id_donacion INTEGER REFERENCES DONACION(id_donacion) NOT NULL,
    id_categoria INTEGER REFERENCES CATEGORIA(id_categoria) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL,
    estado VARCHAR(20) NOT NULL
);

CREATE TABLE VOLUNTARIO (
    id_vol SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    habilidades TEXT,
    disponibilidad TEXT,
    transporte BOOLEAN DEFAULT FALSE,
    zona VARCHAR(100)
);

CREATE TABLE ESTADO_ENTREGA (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(100)
);

CREATE TABLE ENTREGA (
    id_entrega SERIAL PRIMARY KEY,
    id_donacion INTEGER REFERENCES DONACION(id_donacion) NOT NULL,
    id_vol INTEGER REFERENCES VOLUNTARIO(id_vol) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    id_estado INTEGER REFERENCES ESTADO_ENTREGA(id_estado) NOT NULL,
    comentarios TEXT,
    evidencia_fotos TEXT[]
);

CREATE TABLE REFUGIO (
    id_refugio SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    nombre_refugio VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    capacidad INTEGER NOT NULL,
    beneficiarios TEXT,
    id_categoria INTEGER REFERENCES CATEGORIA(id_categoria) NOT NULL,
    id_ubicacion INTEGER REFERENCES UBICACION(id_ubicacion) NOT NULL
);

CREATE TABLE HISTORIAL (
    id_historial SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    accion VARCHAR(100) NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalles TEXT,
    tp_origen VARCHAR(50) NOT NULL
);

CREATE TABLE NOTIFICACION (
    id_notif SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leída BOOLEAN DEFAULT FALSE,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE REPORTE (
    id_reporte SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    contenido TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    generado_por INTEGER REFERENCES USUARIO(id_usuario) NOT NULL
);

---- Create indexes for better performance
--CREATE INDEX idx_donacion_rest ON DONACION(id_rest);
--CREATE INDEX idx_donacion_ubicacion ON DONACION(id_ubicacion);
--CREATE INDEX idx_entrega_donacion ON ENTREGA(id_donacion);
--CREATE INDEX idx_entrega_voluntario ON ENTREGA(id_vol);
--CREATE INDEX idx_notificacion_usuario ON NOTIFICACION(id_usuario);
--CREATE INDEX idx_historial_usuario ON HISTORIAL(id_usuario);