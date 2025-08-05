--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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



--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_estadodonacion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_rol; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_usuario; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_donador; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: zonas_zona; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: zonas_ubicacion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_sucursal; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_publicacion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: comentarios_comentario; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'zonas', '0001_initial', '2025-07-24 18:15:59.633599-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'contenttypes', '0001_initial', '2025-07-24 18:15:59.640969-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'contenttypes', '0002_remove_content_type_name', '2025-07-24 18:15:59.645881-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'auth', '0001_initial', '2025-07-24 18:15:59.6733-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'auth', '0002_alter_permission_name_max_length', '2025-07-24 18:15:59.676481-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'auth', '0003_alter_user_email_max_length', '2025-07-24 18:15:59.679815-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'auth', '0004_alter_user_username_opts', '2025-07-24 18:15:59.68326-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'auth', '0005_alter_user_last_login_null', '2025-07-24 18:15:59.68668-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'auth', '0006_require_contenttypes_0002', '2025-07-24 18:15:59.687814-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0007_alter_validators_add_error_messages', '2025-07-24 18:15:59.691143-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0008_alter_user_username_max_length', '2025-07-24 18:15:59.694928-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0009_alter_user_last_name_max_length', '2025-07-24 18:15:59.698566-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0010_alter_group_name_max_length', '2025-07-24 18:15:59.702803-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0011_update_proxy_permissions', '2025-07-24 18:15:59.706805-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'auth', '0012_alter_user_first_name_max_length', '2025-07-24 18:15:59.711627-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'usuarios', '0001_initial', '2025-07-24 18:15:59.781949-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'admin', '0001_initial', '2025-07-24 18:15:59.798333-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'admin', '0002_logentry_remove_auto_add', '2025-07-24 18:15:59.806387-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'admin', '0003_logentry_add_action_flag_choices', '2025-07-24 18:15:59.812768-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'donaciones', '0001_initial', '2025-07-24 18:15:59.866894-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'comentarios', '0001_initial', '2025-07-24 18:15:59.871671-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'comentarios', '0002_initial', '2025-07-24 18:15:59.884849-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'comentarios', '0003_initial', '2025-07-24 18:15:59.897262-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'donaciones', '0002_initial', '2025-07-24 18:15:59.944697-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'notificaciones', '0001_initial', '2025-07-24 18:15:59.950198-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'notificaciones', '0002_initial', '2025-07-24 18:15:59.963806-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (27, 'sessions', '0001_initial', '2025-07-24 18:15:59.971439-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (28, 'solicitudes', '0001_initial', '2025-07-24 18:15:59.979458-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (29, 'solicitudes', '0002_initial', '2025-07-24 18:16:00.072433-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (30, 'token_blacklist', '0001_initial', '2025-07-24 18:16:00.107535-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (31, 'token_blacklist', '0002_outstandingtoken_jti_hex', '2025-07-24 18:16:00.115332-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (32, 'token_blacklist', '0003_auto_20171017_2007', '2025-07-24 18:16:00.12832-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (33, 'token_blacklist', '0004_auto_20171017_2013', '2025-07-24 18:16:00.139293-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (34, 'token_blacklist', '0005_remove_outstandingtoken_jti', '2025-07-24 18:16:00.14893-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (35, 'token_blacklist', '0006_auto_20171017_2113', '2025-07-24 18:16:00.15832-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (36, 'token_blacklist', '0007_auto_20171017_2214', '2025-07-24 18:16:00.182856-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (37, 'token_blacklist', '0008_migrate_to_bigautofield', '2025-07-24 18:16:00.218158-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (38, 'token_blacklist', '0010_fix_migrate_to_bigautofield', '2025-07-24 18:16:00.232878-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (39, 'token_blacklist', '0011_linearizes_history', '2025-07-24 18:16:00.234158-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (40, 'token_blacklist', '0012_alter_outstandingtoken_user', '2025-07-24 18:16:00.246541-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (41, 'token_blacklist', '0013_alter_blacklistedtoken_options_and_more', '2025-07-24 18:16:00.256573-07');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (42, 'usuarios', '0002_logsistema', '2025-07-29 09:41:46.104644-07');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_archivoadjunto; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_categoriacomida; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: donaciones_comida; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: notificaciones_notificacion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_receptor; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: solicitudes_historialdonacion; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: solicitudes_solicitud; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_administrador; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_logsistema; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_usuario_groups; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_usuario_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuarios_voluntario; Type: TABLE DATA; Schema: public; Owner: -
--



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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 1, false);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 42, true);


--
-- Name: donaciones_archivoadjunto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_archivoadjunto_id_seq', 1, false);


--
-- Name: donaciones_categoriacomida_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_categoriacomida_id_seq', 1, false);


--
-- Name: donaciones_comida_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_comida_id_seq', 1, false);


--
-- Name: donaciones_estadodonacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_estadodonacion_id_seq', 1, false);


--
-- Name: donaciones_publicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_publicacion_id_seq', 1, false);


--
-- Name: donaciones_sucursal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donaciones_sucursal_id_seq', 1, false);


--
-- Name: notificaciones_notificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notificaciones_notificacion_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 1, false);


--
-- Name: usuarios_administrador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_administrador_id_seq', 1, false);


--
-- Name: usuarios_donador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_donador_id_seq', 1, false);


--
-- Name: usuarios_logsistema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_logsistema_id_seq', 1, false);


--
-- Name: usuarios_receptor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_receptor_id_seq', 1, false);


--
-- Name: usuarios_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_rol_id_seq', 1, false);


--
-- Name: usuarios_usuario_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_usuario_groups_id_seq', 1, false);


--
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_usuario_id_seq', 1, false);


--
-- Name: usuarios_usuario_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_usuario_user_permissions_id_seq', 1, false);


--
-- Name: usuarios_voluntario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_voluntario_id_seq', 1, false);


--
-- Name: zonas_ubicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zonas_ubicacion_id_seq', 1, false);


--
-- Name: zonas_zona_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zonas_zona_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

