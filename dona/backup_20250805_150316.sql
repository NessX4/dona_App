--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.django_content_type (id, app_label, model) VALUES (1, 'zonas', 'zona');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (2, 'zonas', 'ubicacion');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (3, 'usuarios', 'rol');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (4, 'usuarios', 'usuario');


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_estadodonacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (1, 'Disponible');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (2, 'Reservado');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (3, 'Entregado');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (4, 'Caducado');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (5, 'Cancelado');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (6, 'En proceso');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (7, 'Verificación');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (8, 'Pendiente');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (9, 'Rechazado');
INSERT INTO public.donaciones_estadodonacion (id, nombre) VALUES (10, 'Completado');


--
-- Data for Name: usuarios_rol; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios_rol (id, nombre) VALUES (1, 'Donador');
INSERT INTO public.usuarios_rol (id, nombre) VALUES (3, 'Voluntario');
INSERT INTO public.usuarios_rol (id, nombre) VALUES (4, 'Administrador');
INSERT INTO public.usuarios_rol (id, nombre) VALUES (2, 'Refugio');


--
-- Data for Name: usuarios_usuario; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (1, 'pbkdf2_sha256$1000000$vXMltQDBWfsdnuy322DEuv$rgPy7ILTmr3UliBwRmUFf2bGJzSZ5G1Hiso1H8zT2vU=', '2025-07-29 20:01:39-07', true, 'Ness', '0322103677@ut-tijuana.edu.mx', '2025-07-29 19:56:19-07', true, true, true, 4);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (2, 'pbkdf2_sha256$1000000$GLo6indYI7lqvO5dCuJX6P$UIZ2ir0GTwIYyYrfYhNCr6NtM0e8ZHOX+QHLKr/Hzd8=', NULL, false, 'Roberto Martínez', 'roberto.martinez@lacasa.com', '2025-07-29 21:07:48-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (3, 'pbkdf2_sha256$1000000$qiE4CYFvrMLRP3j7ynAnEZ$adeDFaQ428nut4b67w5H/p/t3cu/vbpZGMbf2MiufZc=', NULL, false, 'Giovanni Bianchi', 'info@trattoriaitalia.com', '2025-07-29 21:09:31-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (4, 'pbkdf2_sha256$1000000$ZWCwzyli9P70Fx4yFLcHGD$wpOBDUbg362R7MVbB1m1QFGrp73vJxmGIZDURqIRGa0=', NULL, false, 'María Fernández', 'contacto@cafeliterario.com', '2025-07-29 21:11:11-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (5, 'pbkdf2_sha256$1000000$e84J2WU2xfEINnCfa3VB3L$jEuWbw5a8wd/2ekb5FEZoqTKDn48yew3dgzevDHtAoE=', NULL, false, 'Carlos Sánchez', 'ventas@panaderiaeltigal.com', '2025-07-29 21:22:48.512979-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (6, 'pbkdf2_sha256$1000000$4KcnU1JmBlNJRlDPID05uR$pZlGPYLlbEJdQ4nrDvbxXybJXQAutUZ1TbvrLS8zJsQ=', NULL, false, 'Ana García', 'hola@verdevida.com', '2025-07-29 21:24:05.439632-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (7, 'pbkdf2_sha256$1000000$jQ63MIYg9CSl2RRJ4cxxwp$bB8H5J5n9L+oIe5MkxzM7Goe1jdDjtQ11aPWuLwskpY=', NULL, false, 'Luis Ramírez', 'reservaciones@mariscoseldelfin.com', '2025-07-29 21:25:15.588706-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (8, 'pbkdf2_sha256$1000000$mRWVFKdMdj2Ewm7my8DkIz$KHjtv1kJoNRkX9GSNM/RSJuvyvu8tO6aS43RemA+M0w=', NULL, false, 'Juan Morales', 'contacto@refugiosanjose.com', '2025-07-29 21:31:59.400252-07', true, false, true, 2);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (9, 'pbkdf2_sha256$1000000$vX1kPubdWKQRN13PMgQ7Ls$Y22yJ2FUVZ0fYNw6zCTUEaPpElErrya7IAl9mLC7CEk=', NULL, false, 'Dra. Laura Méndez', 'info@albergueesperanza.org', '2025-07-29 21:34:13.827244-07', true, false, true, 2);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (10, 'pbkdf2_sha256$1000000$mxTWjPaDoDhppy3YFpa2Ot$juNPBWtBVqhxFucFFz31KOoOGe/hXaCNoUve8Kqo3SE=', NULL, false, 'Lic. Carlos Ramírez', 'comedor@solidaridad.org', '2025-07-29 21:35:21.466142-07', true, false, true, 2);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (11, 'pbkdf2_sha256$1000000$oY1OSVHaRVYXKfI4LVj3hG$PcsDYGn46B/83g2kClrrOHcBt2Mo40ZPQb1M+X7Agyo=', NULL, false, 'Hna. María Fernández', 'director@casahogarninos.org', '2025-07-29 21:38:50.314514-07', true, false, true, 2);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (12, 'pbkdf2_sha256$1000000$Vm7KZnyq7pijaVL2VHU5s1$7eksxCJA2gV2whlBb9sku0xw8hEbbX10LFn5rv9A8bs=', NULL, false, 'Ana García López', 'ana.garcia@email.com', '2025-08-02 21:47:52.245232-07', true, false, true, 3);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (13, 'pbkdf2_sha256$1000000$O7jnn5fzm5blIkf3lb4Hol$xapn7bosJKGYb0HSmzFzNWyaCNBxqp5fAGni4QZg4kI=', NULL, false, 'Carlos Méndez Ruiz', 'carlos.mendez@email.com', '2025-08-02 21:50:32.347792-07', true, false, true, 3);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (14, 'pbkdf2_sha256$1000000$b9Q82KtVkw30HRNGYb03IE$En0gS739pzDP/Su+iT0pcJ3gc6PDuveQQ6V9TjpMMyw=', NULL, false, 'María Fernández Soto', 'maria.fernandez@email.com', '2025-08-02 21:51:11.672499-07', true, false, true, 3);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (15, 'pbkdf2_sha256$1000000$bfpPZ1HPsVEbJYFQCEu1q1$Z+f8hPAwkIxYFzorcBl/gyTBN2iz4IYbClwWbu/z5Dc=', NULL, false, 'Jorge Ramírez Morales', 'jorge.ramirez@email.com', '2025-08-02 21:51:47.558629-07', true, false, true, 3);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (16, 'pbkdf2_sha256$1000000$pdWFmreJOFaG0GvAj2tE3u$XEX9BlPXOixzE0C6HaPl9UWdHSZtjRFx4jAwDk1fJdI=', NULL, false, 'Lucía Sánchez Castro', 'lucia.sanchez@email.com', '2025-08-02 21:52:24.306312-07', true, false, true, 3);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (17, 'pbkdf2_sha256$1000000$O6rgc1JZicCTg7oRVnOdQR$JUPHYauE/QWeW/65uJf1wL8/ciaJimxSMHPVpZMsMM0=', NULL, false, 'Ricardo Ochoa Martínez', 'ricardo.ochoa@saborestradicionales.com', '2025-08-04 14:35:33.898469-07', true, false, true, 1);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (18, 'pbkdf2_sha256$1000000$A0ntQ4wQbF64Gt2JOA5ot3$17NhQxcc4D0PaLDBBMFGqOMOps1fqccfPJMySYouWik=', NULL, false, 'Hermana María del Carmen Ríos', 'directora@albergueluzdeesperanza.org', '2025-08-04 14:37:04.945333-07', true, false, true, 2);
INSERT INTO public.usuarios_usuario (id, password, last_login, is_superuser, nombre, correo, fecha_registro, activo, is_staff, is_active, rol_id) VALUES (19, 'pbkdf2_sha256$1000000$eHRbPzjvZiJ39AdAKADLU7$JI000cDb9xvyMoc7wVC5WCs/l8F0jrWq0+RkP3zKWpA=', NULL, false, 'Fernanda Gutiérrez López', 'fernanda.gutierrez.v@gmail.com', '2025-08-04 14:39:26.987313-07', true, false, true, 3);


--
-- Data for Name: usuarios_donador; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (1, 'Restaurante La Casa', 'Roberto Martínez', '5551234567', 'Restaurante de comida mexicana tradicional con más de 20 años de experiencia', '08:00:00', '22:00:00', 2);
INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (2, 'Trattoria Italia', 'Giovanni Bianchi', '5552345678', 'Auténtica cocina italiana con ingredientes importados', '11:30:00', '23:00:00', 3);
INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (3, 'Café Literario', 'María Fernández', '5553456789', 'Café de especialidad con ambiente para lectura y trabajo', '07:00:00', '14:10:00', 4);
INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (4, 'Panadería El Trigal', 'Carlos Sánchez', '5554567890', 'Pan artesanal hecho con masa madre y horno de leña', '05:00:00', '20:00:00', 5);
INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (5, 'Verde Vida', 'Ana García', '5555678901', '"Cocina 100% vegetal con productos orgánicos locales', '09:00:00', '22:00:00', 6);
INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (6, 'Mariscos El Delfín', 'Luis Ramírez', '5556789012', 'Pescados y mariscos frescos del día con recetas tradicionales', '00:00:00', '19:00:00', 7);
INSERT INTO public.usuarios_donador (id, nombre_lugar, representante, telefono, descripcion, horario_apertura, horario_cierre, usuario_id) VALUES (7, 'Restaurante Sabores Tradicionales', 'Ricardo Ochoa Martínez', '6641234567', 'Restaurante familiar especializado en cocina regional con 15 años de experiencia', '08:00:00', '22:00:00', 17);


--
-- Data for Name: zonas_zona; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (1, 'El Lago', '22210', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (2, 'Loma Dorada', '22214', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (3, 'Niños Héroes (La Mesa)', '22120', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (4, 'Los Venados', '22123', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (5, 'Terrazas de La Presa', '22124', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (6, 'Colinas de la Presa', '22125', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (7, 'Residencial Alameda', '22126', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (8, 'Insurgentes', '22225', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (9, 'Río Tijuana 3ra. Etapa', '22226', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (10, 'Mariano Matamoros (Centro)', '22234', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (11, 'El Florido 2da. Sección', '22237', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (12, 'El Refugio', '22253', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (13, 'El Laurel I', '22253', 'Tijuana', 'Baja California');
INSERT INTO public.zonas_zona (id, nombre, codigo_postal, ciudad, estado) VALUES (14, 'La Jolla', '22525', 'Tijuana', 'Baja California');


--
-- Data for Name: zonas_ubicacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (1, 'Av. Lago Victoria 123, El Lago, Tijuana, BC', 32.4915, -116.9113, 1);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (2, 'Calle Loma Dorada 45, Loma Dorada, Tijuana, BC', 32.4772, -116.8669, 2);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (3, 'Av. de los Niños Héroes 210, La Mesa, Tijuana, BC', 32.5057, -116.9254, 3);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (4, 'Calle Venados 89, Los Venados, Tijuana, BC', 32.5146, -116.9201, 4);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (5, 'Privada Terrazas 56, Terrazas de La Presa, Tijuana, BC', 32.4861, -116.8705, 5);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (6, 'Calle Colinas 134, Colinas de la Presa, Tijuana, BC', 32.4869, -116.8658, 6);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (7, 'Av. Alameda 200, Residencial Alameda, Tijuana, BC', 32.4978, -116.8892, 7);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (8, 'Blvd. Insurgentes 12500, Insurgentes, Tijuana, BC', 32.4879, -116.8821, 8);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (9, 'Blvd. Río Tijuana 3ra Etapa 450, Tijuana, BC', 32.5131, -116.9226, 9);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (10, 'Av. Mariano Matamoros 321, Mariano Matamoros (Centro), Tijuana, BC', 32.5038, -116.8582, 10);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (11, 'Av. El Florido 2da Sección 560, Tijuana, BC', 32.4752, -116.8365, 11);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (12, 'Calle El Refugio 89, El Refugio, Tijuana, BC', 32.4541, -116.8223, 12);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (13, 'Calle Laurel 25, El Laurel I, Tijuana, BC', 32.4559, -116.8201, 13);
INSERT INTO public.zonas_ubicacion (id, direccion, latitud, longitud, zona_id) VALUES (14, 'Calle La Jolla 301, La Jolla, Tijuana, BC', 32.4904, -117.0247, 14);


--
-- Data for Name: donaciones_sucursal; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donaciones_sucursal (id, nombre, direccion, telefono, horario_apertura, horario_cierre, representante, donador_id, ubicacion_id, zona_id) VALUES (1, 'La Casa Centro', 'Av. Revolución 1250, Zona Centro', '6641234567', '08:00:00', '22:00:00', 'Roberto Martínez', 1, 10, 10);
INSERT INTO public.donaciones_sucursal (id, nombre, direccion, telefono, horario_apertura, horario_cierre, representante, donador_id, ubicacion_id, zona_id) VALUES (2, 'Trattoria Italia Express', 'Blvd. Loma Dorada 456, Loma Dorada', '6642345678', '11:00:00', '22:00:00', 'Giovanni Bianchi', 2, 2, 2);
INSERT INTO public.donaciones_sucursal (id, nombre, direccion, telefono, horario_apertura, horario_cierre, representante, donador_id, ubicacion_id, zona_id) VALUES (3, 'El Trigal Express', 'Av. Niños Héroes 789, La Mesa', '6643456789', '06:00:00', '18:00:00', 'Carlos Sánchez', 4, 3, 3);
INSERT INTO public.donaciones_sucursal (id, nombre, direccion, telefono, horario_apertura, horario_cierre, representante, donador_id, ubicacion_id, zona_id) VALUES (4, 'Sabores Tradicionales Presa', 'Av. de las Terrazas 321, Terrazas de La Presa', '6644567890', '09:00:00', '21:00:00', 'Ricardo Ochoa', 7, 5, 5);


--
-- Data for Name: donaciones_publicacion; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donaciones_publicacion (id, titulo, descripcion, cantidad, fecha_publicacion, fecha_caducidad, estado_id, ubicacion_id, zona_id, sucursal_id) VALUES (1, 'Excedente de buffet - Comida mexicana', 'Platillos variados del buffet de hoy incluyendo enchiladas, arroz, frijoles y guisados. Todos preparados esta mañana.', 15, '2025-08-04 15:31:46.745526-07', '2025-08-06', 1, 10, 10, 1);
INSERT INTO public.donaciones_publicacion (id, titulo, descripcion, cantidad, fecha_publicacion, fecha_caducidad, estado_id, ubicacion_id, zona_id, sucursal_id) VALUES (2, 'Desayuno mexicano', 'Desayuno mexicano sobrante de restaurante', 9, '2025-08-04 19:20:38.754366-07', '2025-08-06', 10, 6, 12, 1);
INSERT INTO public.donaciones_publicacion (id, titulo, descripcion, cantidad, fecha_publicacion, fecha_caducidad, estado_id, ubicacion_id, zona_id, sucursal_id) VALUES (3, 'Pan fresco del día', 'Pan recién horneado que no se vendió hoy. Incluye bolillos, conchas y pan de dulce.', 24, '2025-08-05 14:52:43.287595-07', '2025-08-08', 1, 3, 3, 3);
INSERT INTO public.donaciones_publicacion (id, titulo, descripcion, cantidad, fecha_publicacion, fecha_caducidad, estado_id, ubicacion_id, zona_id, sucursal_id) VALUES (4, 'Desayunos completos', 'Desayunos preparados que no fueron reclamados. Incluyen café, jugo y fruta.', 10, '2025-08-05 14:56:04.022305-07', '2025-08-05', 1, 5, 5, 4);
INSERT INTO public.donaciones_publicacion (id, titulo, descripcion, cantidad, fecha_publicacion, fecha_caducidad, estado_id, ubicacion_id, zona_id, sucursal_id) VALUES (5, 'Pasta fresca sobrante', 'Pasta preparada en exceso para el servicio de hoy. Incluye diferentes tipos de pasta y salsas.', 15, '2025-08-05 15:00:56.919655-07', '2025-08-07', 1, 2, 2, 2);


--
-- Data for Name: comentarios_comentario; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (1, '2025-07-29 20:42:12.147099-07', '1', 'El Lago', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (2, '2025-07-29 20:42:41.234083-07', '2', 'Loma Dorada', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (3, '2025-07-29 20:43:22.64036-07', '3', 'Niños Héroes (La Mesa)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (4, '2025-07-29 20:43:31.985919-07', '3', 'Niños Héroes (La Mesa)', 2, '[{"changed": {"fields": ["Estado"]}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (5, '2025-07-29 20:44:18.424794-07', '4', 'Los Venados', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (6, '2025-07-29 20:44:54.922232-07', '5', 'Terrazas de La Presa', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (7, '2025-07-29 20:45:18.156481-07', '6', 'Colinas de la Presa', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (8, '2025-07-29 20:46:17.723618-07', '7', 'Residencial Alameda', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (9, '2025-07-29 20:47:01.586141-07', '8', 'Insurgentes', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (10, '2025-07-29 20:47:25.29871-07', '9', 'Río Tijuana 3ra. Etapa', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (11, '2025-07-29 20:47:47.200684-07', '10', 'Mariano Matamoros (Centro)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (12, '2025-07-29 20:48:18.942425-07', '11', 'El Florido 2da. Sección', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (13, '2025-07-29 20:48:48.530159-07', '12', 'El Refugio', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (14, '2025-07-29 20:49:30.728577-07', '13', 'El Laurel I', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (15, '2025-07-29 20:50:33.909025-07', '14', 'La Jolla', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (16, '2025-07-29 21:19:27.207319-07', '1', 'Ness', 2, '[{"changed": {"fields": ["Rol"]}}]', 4, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (17, '2025-07-29 21:19:36.748591-07', '2', 'Roberto Martínez', 2, '[{"changed": {"fields": ["Rol"]}}]', 4, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (18, '2025-07-29 21:19:44.911033-07', '3', 'Giovanni Bianchi', 2, '[{"changed": {"fields": ["Rol"]}}]', 4, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (19, '2025-07-29 21:19:51.965855-07', '4', 'María Fernández', 2, '[{"changed": {"fields": ["Rol"]}}]', 4, 1);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'zonas', '0001_initial', '2025-08-04 18:24:05.041867-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'contenttypes', '0001_initial', '2025-08-04 18:24:05.053425-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'contenttypes', '0002_remove_content_type_name', '2025-08-04 18:24:05.060235-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'auth', '0001_initial', '2025-08-04 18:24:05.095611-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'auth', '0002_alter_permission_name_max_length', '2025-08-04 18:24:05.100674-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'auth', '0003_alter_user_email_max_length', '2025-08-04 18:24:05.104741-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'auth', '0004_alter_user_username_opts', '2025-08-04 18:24:05.108347-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'auth', '0005_alter_user_last_login_null', '2025-08-04 18:24:05.112334-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'auth', '0006_require_contenttypes_0002', '2025-08-04 18:24:05.113532-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0007_alter_validators_add_error_messages', '2025-08-04 18:24:05.118303-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0008_alter_user_username_max_length', '2025-08-04 18:24:05.122923-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0009_alter_user_last_name_max_length', '2025-08-04 18:24:05.126649-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0010_alter_group_name_max_length', '2025-08-04 18:24:05.136554-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0011_update_proxy_permissions', '2025-08-04 18:24:05.141155-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'auth', '0012_alter_user_first_name_max_length', '2025-08-04 18:24:05.145074-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'usuarios', '0001_initial', '2025-08-04 18:24:05.231567-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'admin', '0001_initial', '2025-08-04 18:24:05.252391-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'admin', '0002_logentry_remove_auto_add', '2025-08-04 18:24:05.258597-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'admin', '0003_logentry_add_action_flag_choices', '2025-08-04 18:24:05.266243-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'donaciones', '0001_initial', '2025-08-04 18:24:05.333059-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'comentarios', '0001_initial', '2025-08-04 18:24:05.339817-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'comentarios', '0002_initial', '2025-08-04 18:24:05.355715-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'comentarios', '0003_initial', '2025-08-04 18:24:05.370664-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'donaciones', '0002_initial', '2025-08-04 18:24:05.420524-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'notificaciones', '0001_initial', '2025-08-04 18:24:05.426226-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'notificaciones', '0002_initial', '2025-08-04 18:24:05.441966-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (27, 'sessions', '0001_initial', '2025-08-04 18:24:05.451269-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (28, 'solicitudes', '0001_initial', '2025-08-04 18:24:05.459575-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (29, 'solicitudes', '0002_initial', '2025-08-04 18:24:05.527143-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (30, 'token_blacklist', '0001_initial', '2025-08-04 18:24:05.564601-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (31, 'token_blacklist', '0002_outstandingtoken_jti_hex', '2025-08-04 18:24:05.573843-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (32, 'token_blacklist', '0003_auto_20171017_2007', '2025-08-04 18:24:05.590292-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (33, 'token_blacklist', '0004_auto_20171017_2013', '2025-08-04 18:24:05.603541-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (34, 'token_blacklist', '0005_remove_outstandingtoken_jti', '2025-08-04 18:24:05.612925-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (35, 'token_blacklist', '0006_auto_20171017_2113', '2025-08-04 18:24:05.628017-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (36, 'token_blacklist', '0007_auto_20171017_2214', '2025-08-04 18:24:05.662827-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (37, 'token_blacklist', '0008_migrate_to_bigautofield', '2025-08-04 18:24:05.706604-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (38, 'token_blacklist', '0010_fix_migrate_to_bigautofield', '2025-08-04 18:24:05.729232-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (39, 'token_blacklist', '0011_linearizes_history', '2025-08-04 18:24:05.731539-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (40, 'token_blacklist', '0012_alter_outstandingtoken_user', '2025-08-04 18:24:05.743608-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (41, 'token_blacklist', '0013_alter_blacklistedtoken_options_and_more', '2025-08-04 18:24:05.755991-07');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('ak94hm966th6w8dmryh6x3c5srf8zi9u', '.eJxVjDsOwjAQBe_iGlkxJutdSnrOEO3HwQHkSPlUiLtDpBTQvpl5L9fxupRunfPUDebOLrjD7yasj1w3YHeut9HrWJdpEL8pfqezv46Wn5fd_TsoPJdvjSrUHhvtU-oVMkCPSg0BBEwoBGQSUiRCThbJ8NRqBM6EIWZuTNz7A9mQN60:1ugx4V:HO5QkRpw2ZixHcj9l6SYH8T3AaztTttjvG72GESb_1I', '2025-08-12 20:01:39.969079-07');


--
-- Data for Name: donaciones_archivoadjunto; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donaciones_archivoadjunto (id, url, tipo, publicacion_id) VALUES (1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2dTn9MLsKUfL492hezPVf_Nllt3b3E0I9Gg&s', 'imagen', 3);
INSERT INTO public.donaciones_archivoadjunto (id, url, tipo, publicacion_id) VALUES (2, 'https://images.app.goo.gl/8kwinPRKVnBFqU5a6', 'imagen', 4);
INSERT INTO public.donaciones_archivoadjunto (id, url, tipo, publicacion_id) VALUES (3, 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2023-01-Caramelized-Tomato-Paste-Pasta%2F06-CARAMELIZED-TOMATO-PASTE-PASTA-039', 'imagen', 5);


--
-- Data for Name: donaciones_categoriacomida; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (1, 'Desayunos');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (2, 'Comidas');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (3, 'Cenas');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (4, 'Bebidas');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (5, 'Postres');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (6, 'Panadería');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (7, 'Frutas y Verduras');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (8, 'Lácteos');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (9, 'Carnes');
INSERT INTO public.donaciones_categoriacomida (id, nombre) VALUES (10, 'Alimentos no perecederos');


--
-- Data for Name: donaciones_comida; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.donaciones_comida (id, nombre, cantidad, ingredientes, categoria_id, publicacion_id) VALUES (1, 'Combinado mexicano', '15', 'Tortillas de maíz, pollo, salsa verde, arroz, frijoles, crema, queso fresco', 2, 1);
INSERT INTO public.donaciones_comida (id, nombre, cantidad, ingredientes, categoria_id, publicacion_id) VALUES (2, 'huevos a la mexicana', '9', 'huevo, tomate, cebolla, chile', 1, 2);
INSERT INTO public.donaciones_comida (id, nombre, cantidad, ingredientes, categoria_id, publicacion_id) VALUES (3, 'Variedad de pan', '30', 'Harina, levadura, huevo, azúcar, mantequilla', 6, 3);
INSERT INTO public.donaciones_comida (id, nombre, cantidad, ingredientes, categoria_id, publicacion_id) VALUES (4, 'Desayuno tradicional', '10', 'Huevo, frijoles, chilaquiles, café, jugo de naranja', 1, 4);
INSERT INTO public.donaciones_comida (id, nombre, cantidad, ingredientes, categoria_id, publicacion_id) VALUES (5, 'Variedad de pastas', '15', 'Pasta, salsa pomodoro, salsa Alfredo, vegetales, queso parmesano', 2, 5);


--
-- Data for Name: notificaciones_notificacion; Type: TABLE DATA; Schema: public; Owner: -
--
-- Notificación para el Donador
INSERT INTO public.notificaciones_notificacion (id, tipo, mensaje, fecha, leido, usuario_id)
VALUES (101, 'donacion', 'El refugio Refugio Esperanza ha solicitado tu donación.', NOW(), false, 2);

-- Notificación para el Refugio
INSERT INTO public.notificaciones_notificacion (id, tipo, mensaje, fecha, leido, usuario_id)
VALUES (102, 'sistema', 'Has solicitado una donación publicada por Carlos Ramírez.', NOW(), false, 3);

-- Notificación para Voluntario 1
INSERT INTO public.notificaciones_notificacion (id, tipo, mensaje, fecha, leido, usuario_id)
VALUES (103, 'voluntario', 'El refugio Refugio Esperanza ha solicitado una donación disponible.', NOW(), false, 4);

-- Notificación para Voluntario 2
INSERT INTO public.notificaciones_notificacion (id, tipo, mensaje, fecha, leido, usuario_id)
VALUES (104, 'voluntario', 'El refugio Refugio Esperanza ha solicitado una donación disponible.', NOW(), false, 5);

-- Notificación para Voluntario 3
INSERT INTO public.notificaciones_notificacion (id, tipo, mensaje, fecha, leido, usuario_id)
VALUES (105, 'voluntario', 'El refugio Refugio Esperanza ha solicitado una donación disponible.', NOW(), false, 6);

--
-- Data for Name: usuarios_receptor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios_receptor (id, nombre_lugar, encargado, telefono, direccion, capacidad, horario_apertura, horario_cierre, usuario_id) VALUES (1, 'Refugio San José', 'Juan Morales', '6641234567', 'Calle Segunda 123, Zona Centro', 50, '18:00:00', '08:00:00', 8);
INSERT INTO public.usuarios_receptor (id, nombre_lugar, encargado, telefono, direccion, capacidad, horario_apertura, horario_cierre, usuario_id) VALUES (2, 'Albergue Esperanza', 'Dra. Laura Méndez', '6642345678', 'Av. Niños Héroes 456', 80, '00:00:00', '23:59:00', 9);
INSERT INTO public.usuarios_receptor (id, nombre_lugar, encargado, telefono, direccion, capacidad, horario_apertura, horario_cierre, usuario_id) VALUES (3, 'Comedor Solidaridad', 'Lic. Carlos Ramírez', '6643456789', 'Calle Loma Alta 789', 100, '07:00:00', '20:00:00', 10);
INSERT INTO public.usuarios_receptor (id, nombre_lugar, encargado, telefono, direccion, capacidad, horario_apertura, horario_cierre, usuario_id) VALUES (4, 'Casa Hogar Niños Felices', 'Hna. María Fernández', '6644567890', 'Boulevard Florido 2345', 40, '07:30:00', '21:30:00', 11);
INSERT INTO public.usuarios_receptor (id, nombre_lugar, encargado, telefono, direccion, capacidad, horario_apertura, horario_cierre, usuario_id) VALUES (5, 'Albergue Luz de Esperanza', 'Hermana María del Carmen Ríos', '6642345678', 'Calle 5a y Miramar 123, Zona Centro', 75, '00:00:00', '23:59:00', 18);


--
-- Data for Name: solicitudes_historialdonacion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: solicitudes_solicitud; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDI3MzE4MywiaWF0IjoxNzU0MTg2NzgzLCJqdGkiOiIxM2EyYmViYTE0YWE0MDM2YjkyNWQwZWE3NzE2ZGI4YSIsInVzZXJfaWQiOiIyIn0.0JO9UZJ_eAC8NoLagHUJvoZHRxZrg6ca6R4t8TF0AUs', '2025-08-02 19:06:23.466262-07', '2025-08-03 19:06:23-07', 2, '13a2beba14aa4036b925d0ea7716db8a');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDI4Mjk3MCwiaWF0IjoxNzU0MTk2NTcwLCJqdGkiOiJmNzExZmZmY2E2Yzc0MTMxYjMxMzQ1NjFlYjQyOTFlMSIsInVzZXJfaWQiOiIxMiJ9.IXMBlGF0PYZ4bFPKD4wO_gScGztagXbERB4t69cnr_w', '2025-08-02 21:49:30.83627-07', '2025-08-03 21:49:30-07', 12, 'f711fffca6c74131b3134561eb4291e1');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDI4MzI5NSwiaWF0IjoxNzU0MTk2ODk1LCJqdGkiOiI5YjI4ODViMjQ2MDk0YzY5YjFkODAwZGZjMWM3ZDg2MSIsInVzZXJfaWQiOiIyIn0.ftg9iHn0QlmecPv1uhtTCD0FzOqDNAzr0nMn7OUsPJ8', '2025-08-02 21:54:55.875987-07', '2025-08-03 21:54:55-07', 2, '9b2885b246094c69b1d800dfc1c7d861');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMDAwNiwiaWF0IjoxNzU0MzQzNjA2LCJqdGkiOiJmMTJiZjRjMTM5YWM0ZTc4YThjZmEzMWJhNDNlNGVjYSIsInVzZXJfaWQiOiIyIn0.bWEdKhAIo1C52R1SKg4GOK7boHboAXeHm7e7WeSwuAg', '2025-08-04 14:40:06.151726-07', '2025-08-05 14:40:06-07', 2, 'f12bf4c139ac4e78a8cfa31ba43e4eca');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMTA0NiwiaWF0IjoxNzU0MzQ0NjQ2LCJqdGkiOiJhOGIwMmUyNjAxZmQ0OTJjOWUxYjBlYWUxODc0ZGMwNCIsInVzZXJfaWQiOiIxIn0.yu5LlLf75uY8tdv2rx8mgFaHsyDN90hzmWn-HQQ3Y5s', '2025-08-04 14:57:26.656059-07', '2025-08-05 14:57:26-07', 1, 'a8b02e2601fd492c9e1b0eae1874dc04');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMjc4NiwiaWF0IjoxNzU0MzQ2Mzg2LCJqdGkiOiI0NzgyMGY5OTdjNjg0ZTU0YWI1OWMyMjVmYmQ2MDc2MiIsInVzZXJfaWQiOiIyIn0.WxqnKuHqUN3-17xIthOKnyFUUqPltn4Y-Mbc-BX3Ny4', '2025-08-04 15:26:26.705548-07', '2025-08-05 15:26:26-07', 2, '47820f997c684e54ab59c225fbd60762');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMzE2OSwiaWF0IjoxNzU0MzQ2NzY5LCJqdGkiOiIxYmE1YjM4NTkwOWQ0N2E0OTM5YWMxNjJkMTEwZjk5MyIsInVzZXJfaWQiOiI4In0.dgxTJ_iBdkiEWXJEyJH66HloFzFDtJaC1cRMkAYnt5U', '2025-08-04 15:32:49.507189-07', '2025-08-05 15:32:49-07', 8, '1ba5b385909d47a4939ac162d110f993');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMzI1NSwiaWF0IjoxNzU0MzQ2ODU1LCJqdGkiOiJlOTE0ZWUwNDAyZjg0ZmQ3ODQyMmM4NGU5ZGQzMGVkZiIsInVzZXJfaWQiOiI4In0.-wn3-sFhbzF8FUcQxr3go-m9abRHquY2wnmzpPalU1M', '2025-08-04 15:34:15.636291-07', '2025-08-05 15:34:15-07', 8, 'e914ee0402f84fd78422c84e9dd30edf');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMzMwOSwiaWF0IjoxNzU0MzQ2OTA5LCJqdGkiOiI3YmU5MWU4MTg2YTI0OTQ2YTVjMzVlOTNiYTVmZTMxNiIsInVzZXJfaWQiOiI4In0.P3cDaMlGhe0LNpxfFD9uKpnFGdAEhlKAXd8XAxWNUdY', '2025-08-04 15:35:09.683996-07', '2025-08-05 15:35:09-07', 8, '7be91e8186a24946a5c35e93ba5fe316');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzMzQyNCwiaWF0IjoxNzU0MzQ3MDI0LCJqdGkiOiJiMWVjZWVkMzg3MDE0ZDFiODkxZGUzNWM4MDM1YWFmOSIsInVzZXJfaWQiOiI4In0.wBeiICNryqnc6aur0AvXrv845LWjUhZhKmw_abXpV8Q', '2025-08-04 15:37:04.372664-07', '2025-08-05 15:37:04-07', 8, 'b1eceed387014d1b891de35c8035aaf9');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQzNzY4OCwiaWF0IjoxNzU0MzUxMjg4LCJqdGkiOiJmZDdhNTNkMTQxYjE0NjcwOTNiMzgyY2Q5NjgyOWViNyIsInVzZXJfaWQiOiIxIn0.zW2i1XG8QWwZsljcYBoko3ng_MJ0jyKsrC1k5NjVRU0', '2025-08-04 16:48:08.914532-07', '2025-08-05 16:48:08-07', 1, 'fd7a53d141b1467093b382cd96829eb7');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQ0NjcwOCwiaWF0IjoxNzU0MzYwMzA4LCJqdGkiOiJlOGRjNmE1MzcxYjQ0MTRjYmE4ZWY3ZTU4ZGE0MDA2OCIsInVzZXJfaWQiOiIyIn0.Celg3DrQ2JvssicDPg6kiOfraN5iMCUa5rfwh-mAYxs', '2025-08-04 19:18:28.194556-07', '2025-08-05 19:18:28-07', 2, 'e8dc6a5371b4414cba8ef7e58da40068');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQ0NzA5NiwiaWF0IjoxNzU0MzYwNjk2LCJqdGkiOiI0MTFmMGM1MDcxZWI0NTM2ODg3OGVkNjZiZDBhNDQ4NiIsInVzZXJfaWQiOiIxNCJ9.3fuYkXPKc2Pq1J4mSFx-U1dLEBo1b0hyBTqWiaDhZVw', '2025-08-04 19:24:56.80666-07', '2025-08-05 19:24:56-07', 14, '411f0c5071eb45368878ed66bd0a4486');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQ0NzQyOCwiaWF0IjoxNzU0MzYxMDI4LCJqdGkiOiJiZTc2MTZlNDIwMDk0ZDU1ODI4M2E2NDBkMjE1NjE3OSIsInVzZXJfaWQiOiIxNSJ9.jiXWw2zxQkqL5S8LFU5Y9TKcRZE5n9aX9D0Xgcl6bbA', '2025-08-04 19:30:28.950723-07', '2025-08-05 19:30:28-07', 15, 'be7616e420094d558283a640d2156179');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDQ0NzU2NCwiaWF0IjoxNzU0MzYxMTY0LCJqdGkiOiJmYWMzODgwNjQwMTU0ODRkOTI0MTFiYmYwYjIzODdiMiIsInVzZXJfaWQiOiIxMCJ9.LqFJ4Lc34SumTqbFaRRD1yV2xqaKH-CGJ_f6kn0qGKg', '2025-08-04 19:32:44.822655-07', '2025-08-05 19:32:44-07', 10, 'fac388064015484d92411bbf0b2387b2');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNTYxMiwiaWF0IjoxNzU0NDI5MjEyLCJqdGkiOiI1ZjllYjZlYzEyMDk0NzBjOTU1YTkxMTM4ZjQ2YjM1OCIsInVzZXJfaWQiOiIxIn0.q2jpQWSep5EGdDUA7SDhsIx3H4sOWR9uy_kg2UJ7Zow', '2025-08-05 14:26:52.924152-07', '2025-08-06 14:26:52-07', 1, '5f9eb6ec1209470c955a91138f46b358');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNjEwNiwiaWF0IjoxNzU0NDI5NzA2LCJqdGkiOiIxYzhlYzk3NWQwODU0NmUwYTRhM2RjY2YyMjExN2M5ZiIsInVzZXJfaWQiOiIzIn0.PAt5qad449UWu4aFwnQP9RFsDUkCDi2HcnNCO4SoQy0', '2025-08-05 14:35:06.732274-07', '2025-08-06 14:35:06-07', 3, '1c8ec975d08546e0a4a3dccf22117c9f');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNjEwNiwiaWF0IjoxNzU0NDI5NzA2LCJqdGkiOiI4YjZkYWMwZjQyYTU0NzUyYjhlZDk4MTk0YzdkNmIxOSIsInVzZXJfaWQiOiIzIn0.mq8_DjMFiPTArC59X0HSvjlr9t3_F9xj4bXktJQAS6Y', '2025-08-05 14:35:06.752912-07', '2025-08-06 14:35:06-07', 3, '8b6dac0f42a54752b8ed98194c7d6b19');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNjM2MywiaWF0IjoxNzU0NDI5OTYzLCJqdGkiOiIxZjZlOTZjZTAwNDU0ODNhODdhMGU4M2FjNDVjMGFkNiIsInVzZXJfaWQiOiI1In0.A4QOy2R64An1WTyKz0GXJ1Vfw_NV_hZnLj7oVyvQq30', '2025-08-05 14:39:23.050182-07', '2025-08-06 14:39:23-07', 5, '1f6e96ce0045483a87a0e83ac45c0ad6');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNjQ2OCwiaWF0IjoxNzU0NDMwMDY4LCJqdGkiOiIwNGEzMTI1ZWVhZDk0ODA5YjhlMTIyYTgxM2U0ODAwMiIsInVzZXJfaWQiOiIxNyJ9.Fltg2qh0cPDVAnl6dU_svFTog-sjUG0_UoSoF8UhVVo', '2025-08-05 14:41:08.010881-07', '2025-08-06 14:41:08-07', 17, '04a3125eead94809b8e122a813e48002');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNjU0MCwiaWF0IjoxNzU0NDMwMTQwLCJqdGkiOiI4ZjhmMTM5ZjNkMTg0NzI2YWM0ZjNkODFmNTAyZjQ4YiIsInVzZXJfaWQiOiIxIn0.XPgXlWsM4ea_K2SVhn0eW9hrsjpP-z-QKtN4tQExzBs', '2025-08-05 14:42:20.553363-07', '2025-08-06 14:42:20-07', 1, '8f8f139f3d184726ac4f3d81f502f48b');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNjY2MSwiaWF0IjoxNzU0NDMwMjYxLCJqdGkiOiI4YzhjODVlNWZlOWQ0ODE4OTVhYWYxNGIzMjM2OTZlNiIsInVzZXJfaWQiOiIxNyJ9.Q0Z2uxZG1-C9eEpyVN1pKOuNVu4baFFl0MoKL_J8aVY', '2025-08-05 14:44:21.5265-07', '2025-08-06 14:44:21-07', 17, '8c8c85e5fe9d481895aaf14b323696e6');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNzA0OSwiaWF0IjoxNzU0NDMwNjQ5LCJqdGkiOiJhZTMxZmUyZTRhYmI0ODI3YjE3MzZhY2Y4YmRlMzczMCIsInVzZXJfaWQiOiI1In0.TfkfEGtjEcoImCDL4DZ6wMs-IJdyAVfQjU6ZxkKAGvM', '2025-08-05 14:50:49.325117-07', '2025-08-06 14:50:49-07', 5, 'ae31fe2e4abb4827b1736acf8bde3730');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNzIxMCwiaWF0IjoxNzU0NDMwODEwLCJqdGkiOiI4OGUwZDRlYzU2OWY0YzUxYmZhMmMzOWE5MzdjY2NmMCIsInVzZXJfaWQiOiIxNyJ9.Q1IaKyMcbtxewfZ-Dj8_8U906DH59PUInLVvllwvyf0', '2025-08-05 14:53:30.591967-07', '2025-08-06 14:53:30-07', 17, '88e0d4ec569f4c51bfa2c39a937cccf0');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNzUwNywiaWF0IjoxNzU0NDMxMTA3LCJqdGkiOiIwZTQzN2FjODdkNmQ0ZDI3Yjc0MTcwMTU3NzRjMWFiMCIsInVzZXJfaWQiOiIzIn0.TZH39SGgtLdXa3Blkm9sPVTw_xB9jpz38MjITIKtxPc', '2025-08-05 14:58:27.741882-07', '2025-08-06 14:58:27-07', 3, '0e437ac87d6d4d27b7417015774c1ab0');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNzY5MSwiaWF0IjoxNzU0NDMxMjkxLCJqdGkiOiJkMjA2YWE4Yzc1YzE0NDVjOWFlMzgxYzI3NjczMmMwMyIsInVzZXJfaWQiOiI2In0.nMa4RE9K_PMHVeTEyrv5QSmb3vdSLUkhOWCRmArIn20', '2025-08-05 15:01:31.502727-07', '2025-08-06 15:01:31-07', 6, 'd206aa8c75c1445c9ae381c276732c03');
INSERT INTO public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) VALUES (27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NDUxNzc5MiwiaWF0IjoxNzU0NDMxMzkyLCJqdGkiOiI0NWRmNzQ0NjUyYjI0M2EyOWQxMWEyODY0NDMxN2I2NCIsInVzZXJfaWQiOiIxIn0.M9WA_LqWWd4W9kihoODwttON0vRHUsRlxPw_t2DX5y0', '2025-08-05 15:03:12.135242-07', '2025-08-06 15:03:12-07', 1, '45df744652b243a29d11a28644317b64');


--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_administrador; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_logsistema; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (1, '2025-07-29 20:42:12.139789-07', 'sistema', 'Creación de zona', 'Se creó la zona "El Lago" con ID 1.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (2, '2025-07-29 20:42:41.232277-07', 'sistema', 'Creación de zona', 'Se creó la zona "Loma Dorada" con ID 2.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (3, '2025-07-29 20:43:22.639138-07', 'sistema', 'Creación de zona', 'Se creó la zona "Niños Héroes (La Mesa)" con ID 3.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (4, '2025-07-29 20:43:31.984281-07', 'sistema', 'Edición de zona', 'Se actualizó la zona "Niños Héroes (La Mesa)" (ID 3).');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (5, '2025-07-29 20:44:18.42376-07', 'sistema', 'Creación de zona', 'Se creó la zona "Los Venados" con ID 4.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (6, '2025-07-29 20:44:54.921127-07', 'sistema', 'Creación de zona', 'Se creó la zona "Terrazas de La Presa" con ID 5.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (7, '2025-07-29 20:45:18.155318-07', 'sistema', 'Creación de zona', 'Se creó la zona "Colinas de la Presa" con ID 6.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (8, '2025-07-29 20:46:17.722313-07', 'sistema', 'Creación de zona', 'Se creó la zona "Residencial Alameda" con ID 7.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (9, '2025-07-29 20:47:01.584718-07', 'sistema', 'Creación de zona', 'Se creó la zona "Insurgentes" con ID 8.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (10, '2025-07-29 20:47:25.297464-07', 'sistema', 'Creación de zona', 'Se creó la zona "Río Tijuana 3ra. Etapa" con ID 9.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (11, '2025-07-29 20:47:47.199357-07', 'sistema', 'Creación de zona', 'Se creó la zona "Mariano Matamoros (Centro)" con ID 10.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (12, '2025-07-29 20:48:18.941391-07', 'sistema', 'Creación de zona', 'Se creó la zona "El Florido 2da. Sección" con ID 11.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (13, '2025-07-29 20:48:48.528457-07', 'sistema', 'Creación de zona', 'Se creó la zona "El Refugio" con ID 12.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (14, '2025-07-29 20:49:30.727036-07', 'sistema', 'Creación de zona', 'Se creó la zona "El Laurel I" con ID 13.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (15, '2025-07-29 20:50:33.907813-07', 'sistema', 'Creación de zona', 'Se creó la zona "La Jolla" con ID 14.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (16, '2025-07-29 21:07:49.170851-07', 'sistema', 'Creación de donador', 'Se creó el donador "Restaurante La Casa" con ID 1.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (17, '2025-07-29 21:09:31.78449-07', 'sistema', 'Creación de donador', 'Se creó el donador "Trattoria Italia" con ID 2.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (18, '2025-07-29 21:11:11.9624-07', 'sistema', 'Creación de donador', 'Se creó el donador "Café Literario" con ID 3.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (19, '2025-07-29 21:22:48.97665-07', 'sistema', 'Creación de donador', 'Se creó el donador "Panadería El Trigal" con ID 4.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (20, '2025-07-29 21:24:05.929371-07', 'sistema', 'Creación de donador', 'Se creó el donador "Verde Vida" con ID 5.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (21, '2025-07-29 21:25:16.080411-07', 'sistema', 'Creación de donador', 'Se creó el donador "Mariscos El Delfín" con ID 6.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (22, '2025-07-29 21:31:59.894616-07', 'sistema', 'Creación de receptor', 'Se creó el receptor "Refugio San José" con ID 1.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (23, '2025-07-29 21:34:14.423547-07', 'sistema', 'Creación de receptor', 'Se creó el receptor "Albergue Esperanza" con ID 2.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (24, '2025-07-29 21:35:22.245436-07', 'sistema', 'Creación de receptor', 'Se creó el receptor "Comedor Solidaridad" con ID 3.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (25, '2025-07-29 21:38:51.215441-07', 'sistema', 'Creación de receptor', 'Se creó el receptor "Casa Hogar Niños Felices" con ID 4.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (26, '2025-08-02 21:47:52.812269-07', 'sistema', 'Creación de voluntario', 'Se creó el voluntario "Ana García López" con ID 1.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (27, '2025-08-02 21:50:34.470111-07', 'sistema', 'Creación de voluntario', 'Se creó el voluntario "Carlos Méndez Ruiz" con ID 2.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (28, '2025-08-02 21:51:13.248761-07', 'sistema', 'Creación de voluntario', 'Se creó el voluntario "María Fernández Soto" con ID 3.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (29, '2025-08-02 21:51:49.450357-07', 'sistema', 'Creación de voluntario', 'Se creó el voluntario "Jorge Ramírez Morales" con ID 4.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (30, '2025-08-02 21:52:26.090986-07', 'sistema', 'Creación de voluntario', 'Se creó el voluntario "Lucía Sánchez Castro" con ID 5.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (31, '2025-08-04 14:35:35.877556-07', 'sistema', 'Creación de donador', 'Se creó el donador "Restaurante Sabores Tradicionales" con ID 7.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (32, '2025-08-04 14:37:06.792099-07', 'sistema', 'Creación de receptor', 'Se creó el receptor "Albergue Luz de Esperanza" con ID 5.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (33, '2025-08-04 14:39:28.8707-07', 'sistema', 'Creación de voluntario', 'Se creó el voluntario "Fernanda Gutiérrez López" con ID 6.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (34, '2025-08-04 15:28:05.533598-07', 'sistema', 'Creación de sucursal', 'Se creó la sucursal "La Casa Centro" con ID 1.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (35, '2025-08-04 15:31:46.75306-07', 'sistema', 'Creación de publicación', 'Se creó la publicación "Excedente de buffet - Comida mexicana" con ID 1.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (36, '2025-08-04 19:20:38.758122-07', 'sistema', 'Creación de publicación', 'Se creó la publicación "Desayuno mexicano" con ID 2.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (37, '2025-08-04 19:27:39.900665-07', 'sistema', 'Edición de publicación', 'Se actualizó la publicación "Desayuno mexicano" (ID 2).');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (38, '2025-08-05 14:36:08.308163-07', 'sistema', 'Creación de sucursal', 'Se creó la sucursal "Trattoria Italia Express" con ID 2.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (39, '2025-08-05 14:40:18.226735-07', 'sistema', 'Creación de sucursal', 'Se creó la sucursal "El Trigal Express" con ID 3.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (40, '2025-08-05 14:42:05.171728-07', 'sistema', 'Creación de sucursal', 'Se creó la sucursal "Sabores Tradicionales Presa" con ID 4.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (41, '2025-08-05 14:52:43.293376-07', 'sistema', 'Creación de publicación', 'Se creó la publicación "Pan fresco del día" con ID 3.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (42, '2025-08-05 14:56:04.027295-07', 'sistema', 'Creación de publicación', 'Se creó la publicación "Desayunos completos" con ID 4.');
INSERT INTO public.usuarios_logsistema (id, fecha, usuario, accion, detalle) VALUES (43, '2025-08-05 15:00:56.924045-07', 'sistema', 'Creación de publicación', 'Se creó la publicación "Pasta fresca sobrante" con ID 5.');


--
-- Data for Name: usuarios_usuario_groups; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_usuario_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_voluntario; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios_voluntario (id, telefono, usuario_id, zona_id) VALUES (1, '6641234567', 12, 1);
INSERT INTO public.usuarios_voluntario (id, telefono, usuario_id, zona_id) VALUES (2, '6642345678', 13, 2);
INSERT INTO public.usuarios_voluntario (id, telefono, usuario_id, zona_id) VALUES (3, '6643456789', 14, 3);
INSERT INTO public.usuarios_voluntario (id, telefono, usuario_id, zona_id) VALUES (4, '6644567890', 15, 4);
INSERT INTO public.usuarios_voluntario (id, telefono, usuario_id, zona_id) VALUES (5, '6645678901', 16, 5);
INSERT INTO public.usuarios_voluntario (id, telefono, usuario_id, zona_id) VALUES (6, '6643456789', 19, 3);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 1, false);


--
-- Name: comentarios_comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comentarios_comentario_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 19, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 4, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 36, true);


--
-- Name: donaciones_archivoadjunto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_archivoadjunto_id_seq', 3, true);


--
-- Name: donaciones_categoriacomida_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_categoriacomida_id_seq', 10, true);


--
-- Name: donaciones_comida_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_comida_id_seq', 5, true);


--
-- Name: donaciones_estadodonacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_estadodonacion_id_seq', 10, true);


--
-- Name: donaciones_publicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_publicacion_id_seq', 5, true);


--
-- Name: donaciones_sucursal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_sucursal_id_seq', 4, true);


--
-- Name: notificaciones_notificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notificaciones_notificacion_id_seq', 42, true);


--
-- Name: solicitudes_historialdonacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.solicitudes_historialdonacion_id_seq', 1, false);


--
-- Name: solicitudes_solicitud_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.solicitudes_solicitud_id_seq', 1, false);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 1, false);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 27, true);


--
-- Name: usuarios_administrador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_administrador_id_seq', 1, false);


--
-- Name: usuarios_donador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_donador_id_seq', 7, true);


--
-- Name: usuarios_logsistema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_logsistema_id_seq', 43, true);


--
-- Name: usuarios_receptor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_receptor_id_seq', 5, true);


--
-- Name: usuarios_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_rol_id_seq', 4, true);


--
-- Name: usuarios_usuario_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_usuario_groups_id_seq', 1, false);


--
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_usuario_id_seq', 19, true);


--
-- Name: usuarios_usuario_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_usuario_user_permissions_id_seq', 1, false);


--
-- Name: usuarios_voluntario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_voluntario_id_seq', 6, true);


--
-- Name: zonas_ubicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zonas_ubicacion_id_seq', 1, false);


--
-- Name: zonas_zona_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zonas_zona_id_seq', 14, true);


--
-- PostgreSQL database dump complete
--

