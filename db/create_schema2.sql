-- Tabla de roles
CREATE TABLE Roles (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE Usuarios (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
    RolID INT REFERENCES Roles(ID),
    FechaRegistro TIMESTAMP,
    Activo BOOLEAN DEFAULT TRUE
);

-- Tabla de donadores
CREATE TABLE Donadores (
    UsuarioID INT PRIMARY KEY REFERENCES Usuarios(ID),
    NombreLugar VARCHAR(100),
    Representante VARCHAR(100),
    Telefono VARCHAR(20),
    Direccion TEXT,
    Descripcion TEXT,
    HorarioApertura TIME,
    HorarioCierre TIME
);

-- Tabla de receptores
CREATE TABLE Receptores (
    UsuarioID INT PRIMARY KEY REFERENCES Usuarios(ID),
    NombreLugar VARCHAR(100),
    Encargado VARCHAR(100),
    Telefono VARCHAR(20),
    Direccion TEXT,
    Capacidad INT,
    HorarioApertura TIME,
    HorarioCierre TIME
);

-- Tabla de zonas
CREATE TABLE Zonas (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(100),
    CodigoPostal VARCHAR(10),
    Ciudad VARCHAR(100),
    Estado VARCHAR(100)
);

-- Tabla de voluntarios
CREATE TABLE Voluntarios (
    UsuarioID INT PRIMARY KEY REFERENCES Usuarios(ID),
    Nombre VARCHAR(100),
    Telefono VARCHAR(20),
    Correo VARCHAR(100),
    ZonaID INT REFERENCES Zonas(ID)
);

-- Tabla de ubicaciones
CREATE TABLE Ubicaciones (
    ID SERIAL PRIMARY KEY,
    Direccion TEXT,
    Latitud FLOAT,
    Longitud FLOAT,
    ZonaID INT REFERENCES Zonas(ID)
);

-- Tabla de estados de publicación
CREATE TABLE EstadosDonacion (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(50)
);

-- Tabla de publicaciones de donaciones
CREATE TABLE Publicaciones (
    ID SERIAL PRIMARY KEY,
    DonadorID INT REFERENCES Donadores(UsuarioID),
    Titulo VARCHAR(150),
    Descripcion TEXT,
    FechaPublicacion TIMESTAMP,
    EstadoID INT REFERENCES EstadosDonacion(ID),
    UbicacionID INT REFERENCES Ubicaciones(ID),
    ZonaID INT REFERENCES Zonas(ID)
);

-- Tabla de categorías de comida
CREATE TABLE CategoriasComida (
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(50)
);

-- Tabla de comidas por publicación
CREATE TABLE Comidas (
    ID SERIAL PRIMARY KEY,
    PublicacionID INT REFERENCES Publicaciones(ID),
    Nombre VARCHAR(100),
    Cantidad VARCHAR(50),
    CategoriaID INT REFERENCES CategoriasComida(ID),
    Ingredientes TEXT
);

-- Tabla de solicitudes de donación
CREATE TABLE Solicitudes (
    ID SERIAL PRIMARY KEY,
    PublicacionID INT REFERENCES Publicaciones(ID),
    ReceptorID INT REFERENCES Receptores(UsuarioID),
    FechaSolicitud TIMESTAMP,
    Estado VARCHAR(50),
    Comentarios TEXT
);

-- Historial de donaciones
CREATE TABLE HistorialDonaciones (
    ID SERIAL PRIMARY KEY,
    PublicacionID INT REFERENCES Publicaciones(ID),
    DonadorID INT REFERENCES Donadores(UsuarioID),
    ReceptorID INT REFERENCES Receptores(UsuarioID),
    Fecha TIMESTAMP,
    Tipo VARCHAR(20)
);

-- Tabla de notificaciones
CREATE TABLE Notificaciones (
    ID SERIAL PRIMARY KEY,
    UsuarioID INT REFERENCES Usuarios(ID),
    Mensaje TEXT,
    Fecha TIMESTAMP,
    Leido BOOLEAN DEFAULT FALSE
);

-- Tabla de comentarios sobre publicaciones
CREATE TABLE Comentarios (
    ID SERIAL PRIMARY KEY,
    PublicacionID INT REFERENCES Publicaciones(ID),
    UsuarioID INT REFERENCES Usuarios(ID),
    Comentario TEXT,
    Fecha TIMESTAMP
);

-- Tabla de archivos adjuntos
CREATE TABLE ArchivosAdjuntos (
    ID SERIAL PRIMARY KEY,
    PublicacionID INT REFERENCES Publicaciones(ID),
    URL VARCHAR(255),
    Tipo VARCHAR(50)
);
