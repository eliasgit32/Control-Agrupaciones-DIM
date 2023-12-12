-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2023 a las 16:33:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grupos_actividades_dim`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acompannantes`
--

CREATE TABLE `acompannantes` (
  `agrupacion` int(10) UNSIGNED NOT NULL,
  `actividad` int(10) UNSIGNED NOT NULL,
  `acompannante` varchar(20) NOT NULL,
  `periodo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `acompannantes`
--

INSERT INTO `acompannantes` (`agrupacion`, `actividad`, `acompannante`, `periodo`) VALUES
(1, 2, '31385200', '2024-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` int(10) UNSIGNED NOT NULL,
  `agrupacion` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id`, `agrupacion`, `nombre`, `descripcion`) VALUES
(2, 1, 'Encuentro 1', 'Descripción del encuentro AB'),
(3, 1, 'Encuentro 2', 'Descripción del encuentro 2'),
(4, 2, 'Actividad 1 de huellas', 'Descripción de actividad 1 de huelas'),
(5, 1, 'Encuentro 3', 'Descripción encuentro 3+'),
(6, 1, 'Encuentro 4', 'Descripción del encuentro 4'),
(7, 2, 'Actividad 2 de huellas', 'Descripción de actividad 2 de huellas'),
(8, 1, 'Encuentro 015', 'Descripción de encuentro 15'),
(9, 1, 'Actividad 5', 'Descripción de actividad 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agrupaciones`
--

CREATE TABLE `agrupaciones` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `cupos` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `publico` varchar(25) NOT NULL,
  `catedra` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `agrupaciones`
--

INSERT INTO `agrupaciones` (`id`, `nombre`, `descripcion`, `cupos`, `publico`, `catedra`) VALUES
(1, 'PLIUL', 'Programa de Liderazgo Ignaciano', 13, 'Estudiantes', 0),
(2, 'Huellas', 'Descripción de agrupación huellas', 30, 'Estudiantes', 0),
(3, 'Pazando', 'Agrupación llamada Pazando', 2, 'Estudiantes', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunidades`
--

CREATE TABLE `comunidades` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comunidades`
--

INSERT INTO `comunidades` (`id`, `nombre`, `tipo`) VALUES
(2, 'Escuela de Ingeniería Informática', 'Escuela'),
(3, 'Escuela de Ingeniería Industrial', 'Escuela'),
(4, 'Escuela de Ingeniería Civil', 'Escuela'),
(5, 'Coordinación General de Tecnología de la Información', 'Unidad'),
(6, 'Dirección de Identidad y Misión', 'Unidad'),
(7, 'Escuela de Comunicación Social', 'Escuela'),
(9, 'Escuela de Derecho', 'Escuela'),
(10, 'Casa Barandi', 'Comunidad'),
(11, 'Alta Vista', 'Comunidad'),
(13, 'Escuela Administración y Contaduría', 'Escuela'),
(14, 'Ingeniería', 'Escuela'),
(15, 'Auditoría Interna', 'Unidad'),
(17, 'Cátedra Institucional: Competencia Textual en Español', 'Unidad'),
(18, 'Centro de Asesoramiento y Desarrollo Humano ', 'Unidad'),
(19, 'Centro de Estudios Regionales', 'Unidad'),
(20, 'Consultoría Jurídica', 'Unidad'),
(21, 'Coordinación de Biblioteca', 'Unidad'),
(22, 'Coordinación de Compras y Almacenes', 'Unidad'),
(23, 'Coordinación de Cooperación Económica', 'Unidad'),
(24, 'Coordinación de Cultura', 'Unidad'),
(25, 'Coordinación de Deportes', 'Unidad'),
(26, 'Coordinación de Desarrollo Estudiantil', 'Unidad'),
(27, 'Coordinación de Gestión Estudiantil', 'Unidad'),
(28, 'Coordinación de Mercadeo', 'Unidad'),
(29, 'Coordinación de Relaciones Internacionales', 'Unidad'),
(30, 'Coordinación de Seguridad', 'Unidad'),
(31, 'Coordinación de Seguridad y Salud Laboral', 'Unidad'),
(32, 'Coordinación de Servicios Financieros', 'Unidad'),
(33, 'Coordinación de Sustentabilidad Ambiental', 'Unidad'),
(34, 'Coordinación del CIAP ', 'Unidad'),
(35, 'Coordinación General de Gestión de Recursos Humanos', 'Unidad'),
(36, 'Direc.Gen. Identidad Desarrollo Estudiantil y Ext. Social', 'Unidad'),
(37, 'Dirección de Calidad y Mejora Continua', 'Unidad'),
(38, 'Dirección de Comunicación Mercadeo Promoción y Rel. Instit.', 'Unidad'),
(39, 'Dirección de Extensión Social Universitaria', 'Unidad'),
(40, 'Dirección de Planificación y Gestión Estratégica', 'Unidad'),
(41, 'Dirección de Postgrado', 'Unidad'),
(42, 'Dirección de Secretaría', 'Unidad'),
(43, 'Dirección de Servicios Generales', 'Unidad'),
(44, 'Dirección General Académica', 'Unidad'),
(45, 'Dirección General de Administración y Finanzas', 'Unidad'),
(46, 'Ecología, Ambiente y Sustentabilidad: Catd.Institucional', 'Unidad'),
(47, 'Emprendimiento, Cátedra Interfacultad', 'Unidad'),
(48, 'Escuela de Relaciones Industriales', 'Escuela'),
(49, 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'Unidad'),
(50, 'Identidad, Liderazgo y Compromiso, Cátedra Institucional', 'Unidad'),
(51, 'Oficina de Derechos Humanos', 'Unidad'),
(52, 'Vice-Rectorado de Extensión', 'Unidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conformaciones_agrupaciones`
--

CREATE TABLE `conformaciones_agrupaciones` (
  `agrupacion` int(10) UNSIGNED NOT NULL,
  `actividad` int(10) UNSIGNED NOT NULL,
  `periodo` varchar(10) NOT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `conformaciones_agrupaciones`
--

INSERT INTO `conformaciones_agrupaciones` (`agrupacion`, `actividad`, `periodo`, `fechaInicio`, `fechaFin`, `observaciones`) VALUES
(1, 2, '2024-15', '2023-12-11', '2023-12-13', NULL),
(1, 2, '2024-25', NULL, NULL, NULL),
(1, 3, '2024-15', NULL, NULL, NULL),
(1, 3, '2024-25', NULL, NULL, NULL),
(1, 5, '2024-25', NULL, NULL, NULL),
(1, 6, '2025-25', '2024-08-14', '2024-08-15', NULL),
(1, 8, '2026-25', NULL, NULL, NULL),
(2, 4, '2024-25', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `agrupacion` int(10) UNSIGNED NOT NULL,
  `participante` varchar(20) NOT NULL,
  `periodo` varchar(10) NOT NULL,
  `calificacion` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`agrupacion`, `participante`, `periodo`, `calificacion`) VALUES
(1, '27158735', '2024-15', NULL),
(1, '31782332', '2024-15', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participaciones`
--

CREATE TABLE `participaciones` (
  `agrupacion` int(10) UNSIGNED NOT NULL,
  `actividad` int(10) UNSIGNED NOT NULL,
  `participante` varchar(20) NOT NULL,
  `periodo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `participaciones`
--

INSERT INTO `participaciones` (`agrupacion`, `actividad`, `participante`, `periodo`) VALUES
(1, 2, '27158735', '2024-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participantes`
--

CREATE TABLE `participantes` (
  `id` int(10) UNSIGNED NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombres` varchar(70) NOT NULL,
  `apellidos` varchar(70) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `comunidad` varchar(100) NOT NULL,
  `etapa` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT '',
  `emailInst` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `participantes`
--

INSERT INTO `participantes` (`id`, `cedula`, `nombres`, `apellidos`, `tipo`, `comunidad`, `etapa`, `email`, `telefono`, `emailInst`) VALUES
(277, '31701663', 'Jesús David', 'Agrinzone Lozada', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jdagrinzone.24@est.ucab.edu.ve'),
(278, '31591925', 'Aleshka Valentina', 'Al Yousef González', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'avalyousef.24@est.ucab.edu.ve'),
(279, '31522035', 'Naomi Isabella', 'Álvarez Amaya', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'nialvarez.24@est.ucab.edu.ve'),
(280, '31048917', 'Daniella Carolina', 'Angulo Gil', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'dcangulo.24@est.ucab.edu.ve'),
(281, '31615926', 'Lourdes María', 'Ankah Nemeh', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', '', '', 'lmankah.24@est.ucab.edu.ve'),
(282, '31385200', 'María Gabriela', 'Ascanio Tremaria', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'mgascanio.24@est.ucab.edu.ve'),
(283, '30857192', 'Chloé Michele', 'Brun Dupuis', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'cmbrun.24@est.ucab.edu.ve'),
(284, '31983111', 'Willians Antonio', 'Calzadilla Hernández', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'wacalzadilla.24@est.ucab.edu.ve'),
(285, '31882032', 'José Ignacio', 'Candurín Herrera', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jicandurin.24@est.ucab.edu.ve'),
(286, '32037985', 'Ivana Nazareth', 'Caraballo González', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'incaraballo.24@est.ucab.edu.ve'),
(287, '32415172', 'Pedro Sebastián', 'Carvajal Ojeda', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'pscarvajal.24@est.ucab.edu.ve'),
(288, '32277035', 'Sebastián Elías', 'Cedeño Pante', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'secedeno.24@est.ucab.edu.ve'),
(289, '31384795', 'José Gregorio', 'Colmenares Márquez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jgcolmenares.24@est.ucab.edu.ve'),
(290, '31730659', 'Ángel David', 'Contreras Cárdenas', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'adcontreras.24@est.ucab.edu.ve'),
(291, '31113139', 'María Victoria', 'Cova Lezama', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'mvcova.24@est.ucab.edu.ve'),
(292, '31685746', 'Jean Paul Rafael', 'Cova Ramírez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jrcova.24@est.ucab.edu.ve'),
(293, '31943558', 'Victoria Paola', 'Dasilva Delgado', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'vpdasilva.24@est.ucab.edu.ve'),
(294, '31444815', 'Pedro Luis', 'Delgadillo Ferrer', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'pldelgadillo.24@est.ucab.edu.ve'),
(295, '31521981', 'Noreannys Alejandra', 'Díaz Brazón', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'nadiaz.24@est.ucab.edu.ve'),
(296, '31385525', 'Juan Andrés', 'Díaz Ferrer', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'jadiaz.24@est.ucab.edu.ve'),
(297, '31120608', 'Arantza del Valle', 'Doucas Grimaldi', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'addoucas.24@est.ucab.edu.ve'),
(298, '34539713', 'Mohamad Alí', 'El Sahli Saheli', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'maelsahli.24@est.ucab.edu.ve'),
(299, '31384844', 'Guillermo Eduardo', 'García López', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'gegarcia.24@est.ucab.edu.ve'),
(300, '31445331', 'Ángelo Javier', 'Gil Barrios', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'ajgil.24@est.ucab.edu.ve'),
(301, '31445632', 'Paola De Los Ángeles', 'Gómez Villarroel', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'pdgomez.24@est.ucab.edu.ve'),
(302, '31701721', 'Zurisadai Abigail', 'Guzmán Cova', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'zaguzman.24@est.ucab.edu.ve'),
(303, '31701790', 'Noelismar Del Valle', 'Guzmán Pérez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'ndguzman.24@est.ucab.edu.ve'),
(304, '31783002', 'Ramón Alejandro', 'Hernández Mota', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'rahernandezm.24@est.ucab.edu.ve'),
(305, '32172489', 'Charbel Antonio', 'Jraije De Sousa', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'cajraije.24@est.ucab.edu.ve'),
(306, '29899312', 'Natalia Alessandra', 'Kress Di Bartolomeo', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'nakress.24@est.ucab.edu.ve'),
(307, '30994318', 'Nathaly Nazareth', 'Lara Fernández', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'nnlara.23@est.ucab.edu.ve'),
(308, '31230596', 'Fiorella Angelinna', 'Páez Ranalli', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'fapaez.24@est.ucab.edu.ve'),
(309, '31462442', 'Sara Beatriz', 'Papaianni Jiménez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'sbpapaianni.24@est.ucab.edu.ve'),
(310, '32469763', 'Luis Francisco', 'Penoth Bejarano', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'lfpenoth.24@est.ucab.edu.ve'),
(311, '31275694', 'Piero', 'Rodríguez Cavicchioli', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'prodriguez.24@est.ucab.edu.ve'),
(312, '31385414', 'Ricardo Antonio', 'Rodríguez Vicent', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'rrodriguez.23@est.ucab.edu.ve'),
(313, '30501010', 'Orlando Rafael', 'Salazar Hernández', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'orsalazar.24@est.ucab.edu.ve'),
(314, '30436692', 'Juan Cristóbal', 'Vera Gandica', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jcvera.24@est.ucab.edu.ve'),
(315, 'AY243234', 'Juan David', 'Acevedo Arguello', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jdacevedo.24@est.ucab.edu.ve'),
(316, '31782332', 'Cindy', 'Antar Tannous', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'cantar.24@est.ucab.edu.ve'),
(317, '31522270', 'Daniel Alejandro', 'Carreño Marcano', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'dacarreno.24@est.ucab.edu.ve'),
(318, '31981497', 'Fabiola Caridad', 'De Gouveia Vera', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'fcdegouveia.24@est.ucab.edu.ve'),
(319, '30898207', 'Luisangela Monserrat', 'Delgado León', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'lmdelgado.24@est.ucab.edu.ve'),
(320, '32596282', 'Manuel Eduardo', 'Fernández Guevara', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'mefernandez.24@est.ucab.edu.ve'),
(321, '31598262', 'Luimar', 'Fernández Palenzuela', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'lfernandez.24@est.ucab.edu.ve'),
(322, '32032853', 'Britanyt Alondra', 'Fuentes Rodríguez', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'bafuentes.24@est.ucab.edu.ve'),
(323, '31882319', 'Farida Saraid', 'García Pérez', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'fsgarcia.24@est.ucab.edu.ve'),
(324, '31772548', 'Angélica Chiquinquirá', 'González Devera', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'acgonzalez.24@est.ucab.edu.ve'),
(325, '31730370', 'Orianna Del Valle', 'González Gruber', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'odgonzalezg.24@est.ucab.edu.ve'),
(326, '31475773', 'Irayaliz De Los Ángeles', 'Guevara Ferman', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'idguevara.24@est.ucab.edu.ve'),
(327, '32140714', 'Victoria Elizabeth', 'Gutiérrez Sulbarán', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'vegutierrez.24@est.ucab.edu.ve'),
(328, '31292149', 'Karolainth Mariana', 'Infantino Tamayo', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'kminfantino.24@est.ucab.edu.ve'),
(329, '31782498', 'Charbel Santiago', 'Khalil Peña', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'cskhalil.24@est.ucab.edu.ve'),
(330, '31912473', 'Elliooth Rafael Ignacio', 'Kizer Figallo', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'erkizer.24@est.ucab.edu.ve'),
(331, '31570171', 'Ricardo Vittorio', 'Lisi Gómez', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'rvlisi.24@est.ucab.edu.ve'),
(332, '31073987', 'Carla Rebeca', 'Lugo Larez', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'crlugo.24@est.ucab.edu.ve'),
(333, '31981553', 'Daymal Victoria', 'Maita Páez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'dvmaita.24@est.ucab.edu.ve'),
(334, '31384700', 'Marielvys Valentina', 'Manduca González', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'mvmanduca.24@est.ucab.edu.ve'),
(335, '31597585', 'Reinaldo Miguel', 'Marcano Alemán', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'rmmarcano.24@est.ucab.edu.ve'),
(336, '31782704', 'Isabella Cristina', 'Marín Rojas', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'icmarin.24@est.ucab.edu.ve'),
(337, '33226107', 'Libertad', 'Márquez Rojas', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'lmarquez.24@est.ucab.edu.ve'),
(338, '31318354', 'Natasha Alejandra', 'Martínez Parra', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'namartinez.24@est.ucab.edu.ve'),
(339, '31015037', 'Marcos Jesús', 'Martínez Pérez', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'mjmartinez.24@est.ucab.edu.ve'),
(340, '27801960', 'Karmella José', 'Mata Guerrero', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'kjmata.20@est.ucab.edu.ve'),
(341, '31159306', 'Santiago Sebastian', 'Medina Cozier', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'ssmedina.24@est.ucab.edu.ve'),
(342, '32172328', 'Jesús Andrés', 'Montoya Caputi', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jamontoya.24@est.ucab.edu.ve'),
(343, '31207520', 'Nadim Yoel', 'Naser Nasser', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'nynaser.24@est.ucab.edu.ve'),
(344, '31159576', 'Beatriz Alejandra', 'Nuñez Quintero', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'banunez.24@est.ucab.edu.ve'),
(345, '32038021', 'César Guillermo', 'Ostos Álvarez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'cgostos.24@est.ucab.edu.ve'),
(346, '31120583', 'María Valentina', 'Passarelli Alonso', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'mvpassarelli.24@est.ucab.edu.ve'),
(347, '31074822', 'José Andrés', 'Pereira Sánchez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'japereira.24@est.ucab.edu.ve'),
(348, '31894388', 'Martín Alejandro', 'Pinto Guilarte', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'mapinto.24@est.ucab.edu.ve'),
(349, '30806426', 'Loredana Vanessa', 'Ramos Dieguez', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'lvramos.24@est.ucab.edu.ve'),
(350, '31153391', 'Camila', 'Riaño Fierro', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'criano.24@est.ucab.edu.ve'),
(351, '31522257', 'Daniela Valentina', 'Rincón Parra', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'dvrinconp.24@est.ucab.edu.ve'),
(352, '32015224', 'Verioska Adela', 'Rozo Morales', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'varozo.24@est.ucab.edu.ve'),
(353, '31882503', 'Greysimar Antonella', 'Sánchez Martínez', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'gasanchez.24@est.ucab.edu.ve'),
(354, '31782847', 'Michael Alejandro', 'Wehbe Nakad', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'mawehbe.24@est.ucab.edu.ve'),
(355, '31963690', 'Mariana', 'Yegres Vásquez', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'myegres.24@est.ucab.edu.ve'),
(356, '32015197', 'Eglimar Catherine', 'Caraballo Pérez', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'eccaraballo.24@est.ucab.edu.ve'),
(357, '31701708', 'Luis Adrián', 'Coraspe Lichou', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'lacoraspe.24@est.ucab.edu.ve'),
(358, '31353201', 'Enger Manuel', 'Dorado Mora', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'emdorado.24@est.ucab.edu.ve'),
(359, '32497893', 'Ashly Valentina', 'Fernández Hurtado', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'avfernandez.24@est.ucab.edu.ve'),
(360, '32059306', 'Génesis Dasneily', 'Guzmán García', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'gdguzman.24@est.ucab.edu.ve'),
(361, '30040542', 'Alexandro Andrés', 'Huaman Martínez', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'aahuaman.24@est.ucab.edu.ve'),
(362, '32015145', 'Liz Simone Guadalupe', 'Martínez Reyes', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'lsmartinez.24@est.ucab.edu.ve'),
(363, '32694637', 'Diego Alexander', 'Mata Caraballo', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'damata.23@est.ucab.edu.ve'),
(364, '31570880', 'Carlos Antonio', 'Mata Flores', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'camata.24@est.ucab.edu.ve'),
(365, '31827735', 'Santiago David', 'Medina Zabala', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'sdmedina.24@est.ucab.edu.ve'),
(366, '32000629', 'Arturo José', 'Meléndez Alvino', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'ajmelendez.24@est.ucab.edu.ve'),
(367, '30341578', 'Sherry Rosannah', 'Meza Wong', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'srmeza.24@est.ucab.edu.ve'),
(368, '32276303', 'Marielena D´ Los Angeles', 'Milano Mejias', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'mdmilano.24@est.ucab.edu.ve'),
(369, '31538269', 'Krismar Valentina', 'Morales Serrano', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'kvmorales.24@est.ucab.edu.ve'),
(370, '30065255', 'Laura Mariana', 'Moreno Zamora', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'lmmoreno.24@est.ucab.edu.ve'),
(371, '31963043', 'Victoria Isabel', 'Pereira Yong', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'vipereira.24@est.ucab.edu.ve'),
(372, '31021434', 'Paola Margarita', 'Portela Serume', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'pmportela.24@est.ucab.edu.ve'),
(373, '31292146', 'Noel Alejandro', 'Pulvett Salazar', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'napulvett.24@est.ucab.edu.ve'),
(374, '31761650', 'Yulimar', 'Quintero Cárdenas', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'yquintero.24@est.ucab.edu.ve'),
(375, '30001649', 'Fabiana Valentina', 'Ríos Cámara', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'fvrios.24@est.ucab.edu.ve'),
(376, '31384817', 'Eduardo José', 'Rivas Dorta', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'ejrivas.24@est.ucab.edu.ve'),
(377, '32506749', 'Claudia Salomé', 'Rivas González', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'csrivas.24@est.ucab.edu.ve'),
(378, '32439635', 'Julián Alonso', 'Rodríguez García', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jarodriguezg.24@est.ucab.edu.ve'),
(379, '30498118', 'Isabella Antonieta', 'Rodríguez Quintana', 'Estudiante', 'Escuela de Comunicación Social', 'Familiarización', NULL, '', 'iarodriguez.23@est.ucab.edu.ve'),
(380, '31963210', 'Camilla', 'Rodríguez Rodríguez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'crodriguez.24@est.ucab.edu.ve'),
(381, '31397859', 'Antonella Alessandra', 'Rojas Deyán', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'aarojas.24@est.ucab.edu.ve'),
(382, '31905792', 'Liangi Dalí', 'Romero González', 'Estudiante', 'Escuela de Ingeniería Civil', 'Familiarización', NULL, '', 'ldromero.24@est.ucab.edu.ve'),
(383, '31275151', 'Juan Román', 'Salazar Escobar', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jrsalazar.24@est.ucab.edu.ve'),
(384, '32539925', 'Juan Alberto', 'Simoza Rojas', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jasimoza.24@est.ucab.edu.ve'),
(385, '31152554', 'Julio Cesar', 'Solórzano Salinas', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'jcsolorzano.24@est.ucab.edu.ve'),
(386, '31781942', 'Enrique Alejandro', 'Suazo Romero', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'easuazo.24@est.ucab.edu.ve'),
(387, '32014931', 'Andrea Elizabeth', 'Sucre Rangel', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'aesucre.24@est.ucab.edu.ve'),
(388, '31159339', 'Andrés Sebastián', 'Vallenilla Arredondo', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'asvallenilla.24@est.ucab.edu.ve'),
(389, '31274151', 'Aracelis Del Carmen', 'Valles Figuera', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'advalles.24@est.ucab.edu.ve'),
(390, '31701591', 'Alejandro José', 'Vielma Glod', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'ajvielma.24@est.ucab.edu.ve'),
(391, '31701498', 'Ángel David', 'Villegas', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'advillegas.24@est.ucab.edu.ve'),
(392, '31318049', 'Piero', 'Volpatti Giorgio', 'Estudiante', 'Escuela de Derecho', 'Familiarización', NULL, '', 'pvolpatti.24@est.ucab.edu.ve'),
(393, '31963691', 'Manuel Alejandro', 'Yegres Vásquez', 'Estudiante', 'Ingeniería', 'Familiarización', NULL, '', 'mayegres.24@est.ucab.edu.ve'),
(394, '31868393', 'Alexander Burton', 'Young Muñoz', 'Estudiante', 'Escuela Administración y Contaduría', 'Familiarización', NULL, '', 'abyoung.24@est.ucab.edu.ve'),
(395, '27158735', 'Elias José', 'Peñalver Buttó', 'Estudiante', 'Escuela de Ingeniería Informática', 'Familiarización', 'eliasjpb32@gmail.com', '4249508998', 'ejpenalver.18@est.ucab.edu.ve'),
(767, '18025377', 'Clemencia Isabel', 'Abad Gonzalez', 'Docentes Pregrado', 'Escuela de Relaciones Industriales', 'null', NULL, '', 'cabadgon@ucab.edu.ve'),
(768, '25696226', 'Giovanni de Jesús', 'Acosta Garcia', 'Profesionales', 'Coordinación General de Gestión de Recursos Humanos', 'null', NULL, '', 'gacostag@ucab.edu.ve'),
(769, '18452718', 'Jhonathan Gabriel', 'Acosta Rondon', 'Profesionales', 'Dirección de Servicios Generales', 'null', NULL, '', 'jcostaro@ucab.edu.ve'),
(770, '13089063', 'Maria Alejandra', 'Acosta Vahlis', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'macostav@ucab.edu.ve'),
(771, '18926305', 'Adriana Mercedes', 'Adrian Lopez', 'Profesionales', 'Coordinación de Mercadeo', 'null', NULL, '', 'aadrianl@ucab.edu.ve'),
(772, '6043564', 'Piedad Marisol', 'Agredo Madera', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'magredom@ucab.edu.ve'),
(773, '15372683', 'María Virginia', 'Alarcon Navarro', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'malarcon@ucab.edu.ve'),
(774, '12187361', 'Pedro Luis', 'Alemán Bermudez', 'Profesionales', 'Coordinación de Compras y Almacenes', 'null', NULL, '', 'palemanb@ucab.edu.ve'),
(775, '24796170', 'Carmen Natalia', 'Alfaro Astorga', 'Profesionales', 'Dirección de Calidad y Mejora Continua', 'null', NULL, '', 'calfaroa@ucab.edu.ve'),
(776, '8275036', 'José Rafael', 'Alonzo Pacheco', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'joalonzo@ucab.edu.ve'),
(777, '10391770', 'José Jacinto', 'Alvarado Brito', 'Empleados', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'joalvara@ucab.edu.ve'),
(778, '17338048', 'Alvexis Roselin', 'Alvarado Gomez', 'Empleados', 'Coordinación de Biblioteca', 'null', NULL, '', 'alalvara@ucab.edu.ve'),
(779, '8857699', 'Aiskel Sabrina', 'Andrade Mantilla', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'aandrade@ucab.edu.ve'),
(780, '20224238', 'Marianny', 'Aponte Salomon', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mapontes@ucab.edu.ve'),
(781, '12893591', 'Freddy Alberto', 'Aray Larez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'faray@ucab.edu.ve'),
(782, '12644630', 'Claudia', 'Arismendi Gonzalez', 'Docentes Pregrado', 'Dirección General Académica', 'null', NULL, '', 'carismen@ucab.edu.ve'),
(783, '28683338', 'Eduardo Alexander', 'Armas Aguilera', 'Empleados', 'Coordinación de Compras y Almacenes', 'null', NULL, '', 'earmasag@ucab.edu.ve'),
(784, '20988843', 'Manuel Alejandro', 'Arteaga Caballero', 'Profesionales', 'Dirección de Servicios Generales', 'null', NULL, '', 'marteaga@ucab.edu.ve'),
(785, '16162878', 'Lilibeth del Valle', 'Ascanio', 'Profesionales', 'Coordinación General de Gestión de Recursos Humanos', 'null', NULL, '', 'lascanio@ucab.edu.ve'),
(786, '11510942', 'Linett Del Carmen', 'Avila Avendaño', 'Profesionales', 'Consultoría Jurídica', 'null', NULL, '', 'lavilaav@ucab.edu.ve'),
(787, '8528172', 'Roxana Beatriz', 'Avila Lezama', 'Empleados', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'roavila@ucab.edu.ve'),
(788, '26444594', 'Cesar', 'Aviles Caceres', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'CORREO'),
(789, '8915099', 'Aura Matilde', 'Balbi Ochoa', 'Docentes Pregrado', 'Centro de Asesoramiento y Desarrollo Humano ', 'null', NULL, '', 'abalbioc@ucab.edu.ve'),
(790, '10931038', 'David Jesús', 'Bastardo Caraballo', 'Profesionales', 'Coordinación de Cultura', 'null', NULL, '', 'dbastardo@ucab.edu.ve'),
(791, '25083900', 'Veronica Andreina', 'Bastardo Vera', 'Profesionales', 'Escuela de Comunicación Social', 'null', NULL, '', 'vbastard@ucab.edu.ve'),
(792, '14986003', 'Georgina del Carmen', 'Bejarano De Rangel', 'Empleados', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'gbejaran@ucab.edu.ve'),
(793, '6354427', 'Arisleyda Del Carmen', 'Bejarano Ortega', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'abejaran@ucab.edu.ve'),
(794, '7483978', 'Franklin Bismar', 'Bello Castillo', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'fbelloca@ucab.edu.ve'),
(795, '13202828', 'Jannellys ', 'Bello Chirinos', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'jbelloch@ucab.edu.ve'),
(796, '17289843', 'Edisson Jose', 'Bellorin Martinez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'ebellori@ucab.edu.ve'),
(797, '17884451', 'Lusmila', 'Bermudez Lugo De Romero', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'lbermude@ucab.edu.ve'),
(798, '7972580', 'Gilberto', 'Berrio Serrano', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'giberrio@ucab.edu.ve'),
(799, '8919729', 'Sara Cristina', 'Bianco De Natera', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'sbiancof@ucab.edu.ve'),
(800, '10712342', 'María Victoria', 'Bolivar Sanchez', 'Profesionales', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'maboliva@ucab.edu.ve'),
(801, '11171627', 'Guillermo Adolfo', 'Borges Somoza', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'gborges@ucab.edu.ve'),
(802, '10933502', 'Lesneika Josefina', 'Bottini Flores', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'lbottini@ucab.edu.ve'),
(803, '15570957', 'Lenys de Jesús', 'Brazon Rodriguez', 'Empleados', 'Coordinación de Desarrollo Estudiantil', 'null', NULL, '', 'lbrazonr@ucab.edu.ve'),
(804, '6631946', 'Ana Joséfa', 'Bueno Cova', 'Empleados', 'Coordinación de Gestión Estudiantil', 'null', NULL, '', 'abueno@ucab.edu.ve'),
(805, '27158393', 'Fanny Saray', 'Caballero Garcia', 'Empleados', 'Dirección General de Administración y Finanzas', 'null', NULL, '', 'fcaballe@ucab.edu.ve'),
(806, '25081515', 'Manuel Felipe', 'Caballero Garcia', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'mcaballe@ucab.edu.ve'),
(807, '24120258', 'Eliezer José', 'Caballero Hurtado', 'Profesionales', 'Dirección de Servicios Generales', 'null', NULL, '', 'ecaballe@ucab.edu.ve'),
(808, '10925045', 'Luis Antonio', 'Cabareda Rondon', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'lcabared@ucab.edu.ve'),
(809, '6914671', 'Sandra', 'Caceres De Rosello', 'Docentes Pregrado', 'Centro de Asesoramiento y Desarrollo Humano ', 'null', NULL, '', 'scaceres@ucab.edu.ve'),
(810, '12710883', 'Andres Eloy', 'Camacaro Arraez', 'Profesionales', 'Escuela de Comunicación Social', 'null', NULL, '', 'acamacar@ucab.edu.ve'),
(811, '11362029', 'Enrique Manuel', 'Camacho Zambrano', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'ecamacho@ucab.edu.ve'),
(812, '18077497', 'Luis Alberto', 'Caña Martinez', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'lcanamar@ucab.edu.ve'),
(813, '22830714', 'Jhosen de Jesus', 'Cañas Rodriguez', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'jcanasro@ucab.edu.ve'),
(814, '28512825', 'Héctor Alexander', 'Caraballo Amaiz', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'hcarabal@ucab.edu.ve'),
(815, '7835849', 'Mirida Coromoto', 'Carrasco Muñoz', 'Profesionales', 'Dirección de Comunicación Mercadeo Promoción y Rel. Instit.', 'null', NULL, '', 'mcarrasc@ucab.edu.ve'),
(816, '17209715', 'Juan Manuel', 'Carvajal Gutierrez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'jcarvaja@ucab.edu.ve'),
(817, '25445724', 'Roxana Nazaret', 'Castillo Baron', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'rocastil@ucab.edu.ve'),
(818, '29907208', 'Victorial Isabel', 'Castillo Sanchez', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'vcastill@ucab.edu.ve'),
(819, '4736586', 'Mario Alberto', 'Castro Villegas', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mcastro@ucab.edu.ve'),
(820, '4078979', 'Omar Enrique', 'Castro', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'ocastro@ucab.edu.ve'),
(821, '5874865', 'Marbelis', 'Cedeño De Marcano', 'Profesionales', 'Coordinación de Relaciones Internacionales', 'null', NULL, '', 'mcedeno@ucab.edu.ve'),
(822, '10927452', 'Marco Tulio', 'Cedeño Rodriguez', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'mcedenor@ucab.edu.ve'),
(823, '24412218', 'Janeth Magdalena', 'Cedeño Velasquez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'jcedenov@ucab.edu.ve'),
(824, '10392200', 'Aleja', 'Cedeño', 'Empleados', 'Coordinación de Biblioteca', 'null', NULL, '', 'alcedeno@ucab.edu.ve'),
(825, '14036853', 'Adriana Josefina', 'Centeno Rondon', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'acenteno@ucab.edu.ve'),
(826, '3688680', 'Damelis del Valle', 'Cermeño Guaina', 'Profesionales', 'Auditoría Interna', 'null', NULL, '', 'dcermeno@ucab.edu.ve'),
(827, '23623334', 'Hildebrando', 'Chacin Mora', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'hmora@ucab.edu.ve'),
(828, '11533833', 'Héctor Enrique', 'Chamorro Vergara', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'hchamorr@ucab.edu.ve'),
(829, '9120004', 'Anna María', 'Cian Finotto', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'acian@ucab.edu.ve'),
(830, '4459012', 'Emma Georgina', 'Clavo Encibo', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'eclavo@ucab.edu.ve'),
(831, '8854851', 'Mayra Lucrecia', 'Colina Ruiz', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'mcolina@ucab.edu.ve'),
(832, '5221364', 'Florencia Esperanza', 'Cordero Rivero', 'Docentes Pregrado', 'Coordinación de Sustentabilidad Ambiental', 'null', NULL, '', 'fcordero@ucab.edu.ve'),
(833, '14120871', 'Argelida María', 'Cordova Abreu', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'arcordov@ucab.edu.ve'),
(834, '3740716', 'Pío ', 'Crespo Martell', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'pcrespo@ucab.edu.ve'),
(835, '11174711', 'Noel Antonio', 'Cuba Garrido', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'ncuba@ucab.edu.ve'),
(836, '5808412', 'María Venancia', 'Cueto Chourio', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'mcuetoch@ucab.edu.ve'),
(837, '8891742', 'Otaiza ', 'Cupare Castro', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'ocuparec@ucab.edu.ve'),
(838, '10571862', 'Rimath Ahyskel', 'Dager De Flamerich', 'Profesionales', 'Coordinación General de Gestión de Recursos Humanos', 'null', NULL, '', 'rdagerde@ucab.edu.ve'),
(839, '17885856', 'Andreina del Valle', 'Davila Marcano', 'Docentes Pregrado', 'Dirección General Académica', 'null', NULL, '', 'adavilam@ucab.edu.ve'),
(840, '15185332', 'Katherine Elizabeth', 'Daza Suniaga', 'Profesionales', 'Auditoría Interna', 'null', NULL, '', 'kdazasun@ucab.edu.ve'),
(841, '16162039', 'Norali Natasha', 'De La Rosa Barilla', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'ndelaros@ucab.edu.ve'),
(842, '12644170', 'Roberto José', 'Delgado Idrogo', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'rodelgad@ucab.edu.ve'),
(843, '14735225', 'Maryeris Marbelis', 'Devera Colina', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'mdeverac@ucab.edu.ve'),
(844, '5880205', 'Paula Beatriz', 'Diaz De Cordero', 'Docentes Pregrado', 'Cátedra Institucional: Competencia Textual en Español', 'null', NULL, '', 'pdiazde@ucab.edu.ve'),
(845, '2144576', 'Jose Antonio ', 'Diaz Fernandez', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'jdiazfer@ucab.edu.ve'),
(846, '9292942', 'Cruz Jaguay', 'Diaz Gutierrez', 'Empleados', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'cdiazgut@ucab.edu.ve'),
(847, '10044274', 'Zulma Elizabeth', 'Diaz Peñaloza', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'zdiazpen@ucab.edu.ve'),
(848, '20772094', 'Julio Cesar', 'Diaz Silva', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'jdiazsil@ucab.edu.ve'),
(849, '10387571', 'Julio Cesar', 'Diaz Valdez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'jdiazval@ucab.edu.ve'),
(850, '7569947', 'Carlos Dixom', 'Dickson Perez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'cdickson@ucab.edu.ve'),
(851, '5913324', 'Jesús Daniel', 'Duran Boada', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'jeduran@ucab.edu.ve'),
(852, '4506408', 'Dafnis José', 'Echeverria Diaz', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'dechever@ucab.edu.ve'),
(853, '24847625', 'Euclides José', 'Ferman Zorrilla', 'Empleados', 'Coordinación de Biblioteca', 'null', NULL, '', 'efermanz@ucab.edu.ve'),
(854, '24037052', 'Cruz Caya Pelagia', 'Fermin Caraballo', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'fcruzcay@ucab.edu.ve'),
(855, '19419767', 'Linoris Carolina', 'Fermin Mena', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'lferminm@ucab.edu.ve'),
(856, '10798141', 'Jackeline', 'Fernandez Perez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'jafernan@ucab.edu.ve'),
(857, '3872650', 'María Nicolasa', 'Ferrer Rojas', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'mferrer@ucab.edu.ve'),
(858, '13994098', 'Carolina del Valle', 'Flores Avila', 'Profesionales', 'Dirección de Identidad y Misión', 'null', NULL, '', 'cfloresa@ucab.edu.ve'),
(859, '21251277', 'Eily Josefina', 'Flores Bellorin', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'efloresb@ucab.edu.ve'),
(860, '12053992', 'Varinia', 'Flores De Mata', 'Profesionales', 'Coordinación del CIAP ', 'null', NULL, '', 'vfloresc@ucab.edu.ve'),
(861, '9968612', 'Belzahir', 'Flores Gonzalez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'bflores@ucab.edu.ve'),
(862, '7351818', 'José Francisco', 'Fonseca Droy', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'jfonceca@ucab.edu.ve'),
(863, '8520020', 'Pedro Manuel', 'Freitez', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'perdofreites16@gmail.com'),
(864, '16945774', 'Jenny Carolina', 'Fuenmayor Gamez', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'jefuenma@ucab.edu.ve'),
(865, '8360618', 'José Humberto', 'Fuenmayor', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'jfuenmay@ucab.edu.ve'),
(866, '5768559', 'Alba Mercedes', 'Fuentes Bastardo', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'alfuente@ucab.edu.ve'),
(867, '26549362', 'Graciani Emilio', 'Fuentes Cardozo', 'Empleados', 'Coordinación de Compras y Almacenes', 'null', NULL, '', 'gfuentes@ucab.edu.ve'),
(868, '14913835', 'Pedro Daniel', 'Fuentes Guillen', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'pfuentes@ucab.edu.ve'),
(869, '11532634', 'Nelymer', 'Fuentes Tovar', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'nfuentes@ucab.edu.ve'),
(870, '20615032', 'Miguel', 'Gamboa Rodriguez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mgamboar@ucab.edu.ve'),
(871, '8446352', 'Marys Cruz', 'Gamero', 'Profesionales', 'Coordinación General de Gestión de Recursos Humanos', 'null', NULL, '', 'mgamero@ucab.edu.ve'),
(872, '3655449', 'Petra del Pilar', 'Gamez Bastidas', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'ppilar@ucab.edu.ve'),
(873, '20704236', 'Daymar Nazareth', 'Gamez Perez', 'Profesionales', 'Coordinación General de Gestión de Recursos Humanos', 'null', NULL, '', 'dgamezpe@ucab.edu.ve'),
(874, '11157561', 'Zaida Gisela', 'Garcia Canelon', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'zgarciac@ucab.edu.ve'),
(875, '13853356', 'Wladimir ', 'Garcia Castro', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'wgarciac@ucab.edu.ve'),
(876, '5245966', 'Maria Cristina', 'Garcia De Bermudez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mgarcia@ucab.edu.ve'),
(877, '16666982', 'Homer Alexander', 'Garcia Rivero', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'hogarcia@ucab.edu.ve'),
(878, '9275777', 'Briceida Joséfina', 'Garcia Zerpa', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'bgarcia@ucab.edu.ve'),
(879, '13294649', 'Edgar Jose', 'Garcia', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'edgagarc@ucab.edu.ve'),
(880, '5003246', 'Joseba Iñaki', 'Garitaonandia Asua', 'Docentes Pregrado', 'Dirección General de Administración y Finanzas', 'null', NULL, '', 'igaritao@ucab.edu.ve'),
(881, '25933635', 'Bárbara Alesandra', 'Gerdez Calderon', 'Empleados', 'Coordinación de Biblioteca', 'null', NULL, '', 'bgerdezc@ucab.edu.ve'),
(882, '19622400', 'Romelys del Carmen', 'Gil Alvarez', 'Profesionales', 'Coordinación de Cultura', 'null', NULL, '', 'rgilalva@ucab.edu.ve'),
(883, '8180342', 'Orlando Rafael', 'Gil Rubio', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'ogil@ucab.edu.ve'),
(884, '18169056', 'Virginia Charlina', 'Gilkes Antoima', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'vgilkesa@ucab.edu.ve'),
(885, '11679048', 'Oliver Gustavo', 'Giusti Ceballos', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'ogiustic@ucab.edu.ve'),
(886, '16628465', 'Carlimar Teresa', 'Golindano Gonzalez', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'cgolinda@ucab.edu.ve'),
(887, '6252560', 'Huian ', 'Gomez Gonzalez', 'Profesionales', 'Coordinación de Deportes', 'null', NULL, '', 'hgomezgo@ucab.edu.ve'),
(888, '13220768', 'Wilfredo Rafael', 'Gomez Longart', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'wgomezlo@ucab.edu.ve'),
(889, '18452522', 'Sthefany Yoselida', 'Gomez Vargas', 'Empleados', 'Consultoría Jurídica', 'null', NULL, '', 'sgomezva@ucab.edu.ve'),
(890, '28606592', 'Sofia Valentina', 'Gonzalez Marcano', 'Empleados', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'sofgonza@ucab.edu.ve'),
(891, '14986078', 'María Ynocencia', 'Gonzalez Perez', 'Profesionales', 'Coordinación de Desarrollo Estudiantil', 'null', NULL, '', 'mygonzal@ucab.edu.ve'),
(892, '6517126', 'Marino Angel', 'Gonzalez Reyes', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mgonzale@ucab.edu.ve'),
(893, '8932124', 'Hernan Enrique', 'Gonzalez Solis', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'hergonza@ucab.edu.ve'),
(894, '11172023', 'Carlos Eduardo', 'Gonzalez', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'cargonza@ucab.edu.ve'),
(895, '9944783', 'Elías José', 'Gonzalez', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'egonzalez@ucab.edu.ve'),
(896, '12887147', 'Rodolfo Del Valle', 'Gonzalez', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'rodgonza@ucab.edu.ve'),
(897, '8931166', 'Pedro Tomás', 'Goudet Sifontes', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'pgoudets@ucab.edu.ve'),
(898, '15371587', 'Joslym Carolina', 'Granado Castillo', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'jogranad@ucab.edu.ve'),
(899, '10878330', 'Juan José', 'Granado Rojas', 'Empleados', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'jgranado@ucab.edu.ve'),
(900, '4942763', 'Fortunoli Antonio', 'Grilli Rodriguez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'fgrilli@ucab.edu.ve'),
(901, '14440996', 'Maria Victoria', 'Grisolia Merayo', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mgrisoli@ucab.edu.ve'),
(902, '13646945', 'Rosanna Nisbeth', 'Gruber De Gonzalez', 'Profesionales', 'Coordinación del CIAP ', 'null', NULL, '', 'rgruberd@ucab.edu.ve'),
(903, '16219139', 'Carolina Dionexis', 'Gutierrez Benavides', 'Profesionales', 'Coordinación de Cooperación Económica', 'null', NULL, '', 'cargutie@ucab.edu.ve'),
(904, '8954543', 'Yoel Emilio', 'Gutierrez Tovar', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'yogutier@ucab.edu.ve'),
(905, '7927548', 'Ibelitze Claret ', 'Hernandez Bustamante', 'Profesionales', 'Coordinación de Cultura', 'null', NULL, '', 'ibhernan@ucab.edu.ve'),
(906, '4776489', 'Luis Alberto', 'Hernandez Cumana', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'lhernand@ucab.edu.ve'),
(907, '16164691', 'Julio José', 'Hernandez Farfan', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'julherna@ucab.edu.ve'),
(908, '4983839', 'Luis Orlando', 'Hernandez Salinas', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'luiherna@ucab.edu.ve'),
(909, '17339009', 'Milagros del Valle', 'Hernandez Zambrano', 'Profesionales', 'Dirección de Identidad y Misión', 'null', NULL, '', 'mdhernan@ucab.edu.ve'),
(910, '27390848', 'Hanner Hellias', 'Hernandez Zaraza', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'hahernan@ucab.edu.ve'),
(911, '5003689', 'Henry Eduardo', 'Izquierdo Ojeda', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'hizquier@ucab.edu.ve'),
(912, '5341186', 'Frank Winston', 'Jansen Maneiro', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'fjansen@ucab.edu.ve'),
(913, '19420602', 'Sergio Antonio', 'Jimenez Almerida', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'serjimen@ucab.edu.ve'),
(914, '20035252', 'Scarlet Mariángel', 'Jimenez Caraballo', 'Empleados', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'scjimene@ucab.edu.ve'),
(915, '27837339', 'María José', 'Lanz Alvarez', 'Empleados', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'mlanz@ucab.edu.ve'),
(916, '10571769', 'Adriana Carolina', 'Lanz Rodriguez', 'Profesionales', 'Dirección de Planificación y Gestión Estratégica', 'null', NULL, '', 'alanz@ucab.edu.ve'),
(917, '8967479', 'Jesús José', 'Larez Mata', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'jlarez@ucab.edu.ve'),
(918, '12645415', 'Leymar Alessandra', 'Leiva Maraña', 'Profesionales', 'Dirección de Calidad y Mejora Continua', 'null', NULL, '', 'lleivama@ucab.edu.ve'),
(919, '19621603', 'Dional José', 'Liccien Ojeda', 'Profesionales', 'Coordinación de Compras y Almacenes', 'null', NULL, '', 'dliccien@ucab.edu.ve'),
(920, '13570514', 'Yeli Zenaida', 'Liccien Zapata', 'Profesionales', 'Coordinación de Seguridad y Salud Laboral', 'null', NULL, '', 'yliccien@ucab.edu.ve'),
(921, '10790569', 'Jose Humberto', 'Lizardo Pacheco', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'jlizardo@ucab.edu.ve'),
(922, '11511412', 'José Gregorio', 'Llovera', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'jollover@ucab.edu.ve'),
(923, '10233356', 'Camilo Ernesto', 'London Arena', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'clondon@ucab.edu.ve'),
(924, '15608057', 'Kristy', 'Lopez Spitschka', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'klopezsp@ucab.edu.ve'),
(925, '26801013', 'Desireé de los Angeles', 'Lugo Fuentes', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'dlugo@ucab.edu.ve'),
(926, '5553877', 'Juan Aldemaro', 'Madrid Rodriguez', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'jmadrid@ucab.edu.ve'),
(927, '8021226', 'Pedro Alexis', 'Maldonado Monsalve', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'pmaldona@ucab.edu.ve'),
(928, '25034178', 'Juan Alberto', 'Marcano Bracamontes', 'Profesionales', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'jumarcan@ucab.edu.ve'),
(929, '13924102', 'Marlin Carolina', 'Marcano De Patiño', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'mcmarcano@ucab.edu.ve'),
(930, '13327201', 'Nidia Del Carmen', 'Marcano Delgado', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'nimarcan@ucab.edu.ve'),
(931, '3849530', 'Arturo Luis', 'Marcano Gonzalez', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'amarcano@ucab.edu.ve'),
(932, '14289071', 'Isamar Yordana', 'Marcano Ledezma', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'imarcano@ucab.edu.ve'),
(933, '12214876', 'Beisys Alibe', 'Marcano Ruiz', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'bmarcano@ucab.edu.ve'),
(934, '15185044', 'José Angel', 'Marquez Acevedo', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'josmarqu@ucab.edu.ve'),
(935, '12133842', 'Sunny Josefina', 'Marquez Benavides', 'Profesionales', 'Coordinación de Cooperación Económica', 'null', NULL, '', 'sumarque@ucab.edu.ve'),
(936, '6133155', 'Maxwel Eduardo', 'Martinez Aquino', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'maxmarti@ucab.edu.ve'),
(937, '14987095', 'Minelvis Del Valle', 'Martinez Gil', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'minmarti@ucab.edu.ve'),
(938, '17632306', 'Morelvis Del Valle', 'Martinez Gil', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'momartin@ucab.edu.ve'),
(939, '3501019', 'Juan Bautista', 'Martinez', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'juanmart@ucab.edu.ve'),
(940, '11998052', 'Ynes Cecilia del Valle', 'Mata De Bastida', 'Profesionales', 'Coordinación de Seguridad y Salud Laboral', 'null', NULL, '', 'ymatade@ucab.edu.ve'),
(941, '10390570', 'Isabel María', 'Maurera Perez', 'Profesionales', 'Coordinación de Desarrollo Estudiantil', 'null', NULL, '', 'imaurera@ucab.edu.ve'),
(942, '27293367', 'Gustavo Juan', 'Mederico Perales', 'Empleados', 'Dirección de Secretaría', 'null', NULL, '', 'gmederic@ucab.edu.ve'),
(943, '9946067', 'Luz Esperanza', 'Medina Cuida', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'lmedinac@ucab.edu.ve'),
(944, '6249040', 'Jesús Estenio', 'Medina Maldonado', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'jmedina@ucab.edu.ve'),
(945, '20300595', 'Gregorio Xadiel', 'Medina Marin', 'Profesionales', 'Coordinación de Compras y Almacenes', 'null', NULL, '', 'gmedinam@ucab.edu.ve'),
(946, '5133904', 'Antonio José', 'Medina Puerta', 'Docentes Pregrado', 'Escuela de Relaciones Industriales', 'null', NULL, '', 'amedinap@ucab.edu.ve'),
(947, '20503558', 'Beatriz Alejandra', 'Meixeira Salinas', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'bmeixeir@ucab.edu.ve'),
(948, '14447736', 'Moraima del Valle', 'Mendez De Serrao', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'mmendezd@ucab.edu.ve'),
(949, '8179805', 'Irama Josefina', 'Mendez Frontado', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'imendezf@ucab.edu.ve'),
(950, '10389977', 'Marco Tulio', 'Mendez Gutierrez', 'Docentes Pregrado', 'Escuela de Relaciones Industriales', 'null', NULL, '', 'mamendez@ucab.edu.ve'),
(951, '8712448', 'Nancy Mariela', 'Mendez Rojas', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'nmendez@ucab.edu.ve'),
(952, '26770346', 'María Gabriela', 'Mendoza Dueñas', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'marmendo@ucab.edu.ve'),
(953, '26770347', 'María Laura', 'Mendoza Dueñas', 'Docentes Pregrado', 'Centro de Asesoramiento y Desarrollo Humano ', 'null', NULL, '', 'mamendoz@ucab.edu.ve'),
(954, '10391079', 'Audines Daniel', 'Milano Agñes', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'amilano@ucab.edu.ve'),
(955, '28255056', 'Luisandra Carolina', 'Millan Chacin', 'Empleados', 'Dirección de Secretaría', 'null', NULL, '', 'lmillanc@ucab.edu.ve'),
(956, '13911232', 'Jorge Alberto', 'Mogollon Franklin', 'Profesionales', 'Dirección de Servicios Generales', 'null', NULL, '', 'jmogollo@ucab.edu.ve'),
(957, '8009360', 'Antonio José', 'Molina', 'Profesionales', 'Coordinación de Deportes', 'null', NULL, '', 'anmolina@ucab.edu.ve'),
(958, '5372120', 'Gloria', 'Montenegro', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'gmontene@ucab.edu.ve'),
(959, '20883493', 'Yoselin del Mar', 'Montero Arellano', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'ymontero@ucab.edu.ve'),
(960, '5535814', 'Yolanda', 'Montesinos Alcala', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'ymontesi@ucab.edu.ve'),
(961, '4034893', 'Yraida Josefina', 'Mora Quijada', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'ymora@ucab.edu.ve'),
(962, '24183008', 'Valentina Gabriela', 'Morales Romero', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'vmorales@ucab.edu.ve'),
(963, '3825293', 'Gonzalo Guillermo', 'Morao Ramos', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'gmorao@ucab.edu.ve'),
(964, '20503464', 'Jhonass José', 'Moreno Romero', 'Profesionales', 'Escuela de Comunicación Social', 'null', NULL, '', 'jmorenor@ucab.edu.ve'),
(965, '14118542', 'Eumelis Mayerlis', 'Moya Goitte', 'Docentes Pregrado', 'Oficina de Derechos Humanos', 'null', NULL, '', 'emoya@ucab.edu.ve'),
(966, '26582882', 'Luis Fernando', 'Muñoz Brizuela', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'lmunozbr@ucab.edu.ve'),
(967, '19803165', 'Sorangel del Valle', 'Muñoz Jimenez', 'Profesionales', 'Dirección de Calidad y Mejora Continua', 'null', NULL, '', 'smunozji@ucab.edu.ve'),
(968, '15687308', 'Oscar Fernando', 'Murillo Hernandez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'omurillo@ucab.edu.ve'),
(969, '20808076', 'Joséph Leonardo', 'Naranjo Garcia', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'jonaranj@ucab.edu.ve'),
(970, '12560062', 'María Karina', 'Naranjo Hernandez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'marnaran@ucab.edu.ve'),
(971, '25324215', 'Yilander Ramón de Jesús', 'Naranjo Parra', 'Empleados', 'Dirección de Servicios Generales', 'null', NULL, '', 'yinaranj@ucab.edu.ve'),
(972, '8921138', 'Ivan José', 'Natera Alvizu', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'inateraa@ucab.edu.ve'),
(973, '30530344', 'Ronney Jose', 'Navarro Rodriguez', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'rnavarro@ucab.edu.ve'),
(974, '5534440', 'Jorge Eduardo', 'Nevado Arreaza', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'jnevado@ucab.edu.ve'),
(975, '8957524', 'Mitzay', 'Noriega León', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'mnoriega@ucab.edu.ve'),
(976, '26680884', 'Marian Sinai', 'Ojeda Carrillo', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'mojedaca@ucab.edu.ve');
INSERT INTO `participantes` (`id`, `cedula`, `nombres`, `apellidos`, `tipo`, `comunidad`, `etapa`, `email`, `telefono`, `emailInst`) VALUES
(977, '23501506', 'Marieysa del Valle', 'Ostos Perez', 'Profesionales', 'Coordinación General de Gestión de Recursos Humanos', 'null', NULL, '', 'mostospe@ucab.edu.ve'),
(978, '20507790', 'Sergio Manuel', 'Pacheco Villa', 'Empleados', 'Direc.Gen. Identidad Desarrollo Estudiantil y Ext. Social', 'null', NULL, '', 'spacheco@ucab.edu.ve'),
(979, '17633300', 'Arlington Manuel', 'Padmore Rivas', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'apadmore@ucab.edu.ve '),
(980, '6177972', 'Humberto', 'Paniagua Melo', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'hpaniagu@ucab.edu.ve'),
(981, '16394986', 'Dulis Irene', 'Pante Robles', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'dpante@ucab.edu.ve'),
(982, '21248805', 'Carla Marianela', 'Pariguan Rosas', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'cparigua@ucab.edu.ve'),
(983, '5834539', 'Lilia Del Carmen', 'Parra De Reverol', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'lparra@ucab.edu.ve'),
(984, '3441168', 'Xiomara Josefina', 'Parra De Roman', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'xparra@ucab.edu.ve'),
(985, '4024317', 'Henry Manuel', 'Patiño', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'hpatino@ucab.edu.ve'),
(986, '11996950', 'Luis Jesús ', 'Penoth Jimenez', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'lpenothj@ucab.edu.ve'),
(987, '9946354', 'Rosa Felicia', 'Peñalver Fernandez', 'Empleados', 'Escuela de Comunicación Social', 'null', NULL, '', 'ropenalv@ucab.edu.ve'),
(988, '18805480', 'Ritzelis Carolina', 'Perales Olivier', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'rperales@ucab.edu.ve'),
(989, '12600635', 'Carla Zulimar', 'Perez Alvarez', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'cperezal@ucab.edu.ve'),
(990, '12483808', 'Edwin Enrique', 'Perez Bracho', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'eperezbr@ucab.edu.ve'),
(991, '9391200', 'Jorge Luis', 'Pernia Morales', 'Docentes Pregrado', 'Vice-Rectorado de Extensión', 'null', NULL, '', 'jpernia@ucab.edu.ve'),
(992, '4594248', 'Yuraima Milagros', 'Perroni Guevara', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'yperroni@ucab.edu.ve'),
(993, '23500957', 'Roberto Antonio', 'Persi Cedeño', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'rpersice@ucab.edu.ve'),
(994, '10712697', 'Mario Antonio', 'Pietroniro Rangel', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'mpietron@ucab.edu.ve'),
(995, '13122756', 'Gustavo Jesús', 'Ponne Gonzalez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'gponnego@ucab.edu.ve'),
(996, '2564594', 'Teodardo E.', 'Porras Cardozo', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'tporras@ucab.edu.ve'),
(997, '15782749', 'Karla Virginia', 'Pravia Alvarez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'kpraviaa@ucab.edu.ve'),
(998, '12644253', 'Carlos', 'Prince Avila', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'cprince@ucab.edu.ve'),
(999, '16030529', 'Franco', 'Puppio Perez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'fpuppiop@ucab.edu.ve'),
(1000, '8926061', 'Damaris Del Valle', 'Quijada De Marcano', 'Docentes Pregrado', 'Identidad, Liderazgo y Compromiso, Cátedra Institucional', 'null', NULL, '', 'daquijad@ucab.edu.ve'),
(1001, '26444443', 'Jhorliana Valentina', 'Quijada Salomon', 'Profesionales', 'Dirección de Comunicación Mercadeo Promoción y Rel. Instit.', 'null', NULL, '', 'jhquijad@ucab.edu.ve'),
(1002, '4883142', 'Ana María', 'Quintero De Arteaga', 'Docentes Pregrado', 'Escuela de Relaciones Industriales', 'null', NULL, '', 'anquinte@ucab.edu.ve'),
(1003, '5892710', 'Jesus Alberto', 'Rada Correa', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'jrada@ucab.edu.ve'),
(1004, '5422594', 'Omar José', 'Ramirez Barrios', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'omramire@ucab.edu.ve'),
(1005, '15542236', 'Edgardo Francisco', 'Ramirez Fajardo', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'edramire@ucab.edu.ve'),
(1006, '10828119', 'Jairo', 'Ramirez Morales', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'jaramire@ucab.edu.ve'),
(1007, '11469085', 'Jairo Enrique', 'Ramirez Rangel', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'jairamir@ucab.edu.ve'),
(1008, '18169500', 'Yisneidy Lineth', 'Ramos Velasquez', 'Profesionales', 'Dirección de Servicios Generales', 'null', NULL, '', 'yramosve@ucab.edu.ve'),
(1009, '4676846', 'Carmen Urquia', 'Ravelo Vivenes', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'cravelov@ucab.edu.ve'),
(1010, '20807298', 'Oriana Marisela', 'Renaud Pascual', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'orenaudp@ucab.edu.ve'),
(1011, '2641766', 'Gilberto Enrique', 'Resplandor Barreto', 'Docentes Pregrado', 'Centro de Estudios Regionales', 'null', NULL, '', 'gresplan@ucab.edu.ve'),
(1012, '24560320', 'Ricardo Andrés', 'Reyes Carreño', 'Empleados', 'Direc.Gen. Identidad Desarrollo Estudiantil y Ext. Social', 'null', NULL, '', 'rreyesca@ucab.edu.ve'),
(1013, '9682934', 'Mariana Alejandra', 'Rivas Ferray', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mrivasfe@ucab.edu.ve'),
(1014, '11513347', 'Gervacio Enrique', 'Rivas Martinez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'grivasma@ucab.edu.ve'),
(1015, '7711406', 'Ramón Antonio', 'Rivera Verde', 'Profesionales', 'Dirección de Comunicación Mercadeo Promoción y Rel. Instit.', 'null', NULL, '', 'rriverav@ucab.edu.ve'),
(1016, '4034926', 'Modesto Abrahan', 'Roa Pinto', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'mroapint@ucab.edu.ve'),
(1017, '16394773', 'Luis Anibal', 'Robles Longart', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'lroblesl@ucab.edu.ve'),
(1018, '18451462', 'Francisco José', 'Rodriguez Guerrero', 'Docentes Pregrado', 'Emprendimiento, Cátedra Interfacultad', 'null', NULL, '', 'franrodr@ucab.edu.ve'),
(1019, '2251174', 'Noemi Guillermina', 'Rodriguez Hernandez undefined', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'noerodri@ucab.edu.ve'),
(1020, '8928993', 'Yuraima Joséfina', 'Rodriguez Hernandez', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'yurodrigu@ucab.edu.ve'),
(1021, '13122364', 'Yamilet Josefina', 'Rodriguez Medina', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'yjrodrig@ucab.edu.ve'),
(1022, '12112850', 'Yumisay del Valle', 'Rodriguez Torres', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'yumrodri@ucab.edu.ve'),
(1023, '12457198', 'Diego Augusto', 'Rojas Ajmad', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'drojasaj@ucab.edu.ve'),
(1024, '10302302', 'Vaicary Elizabeth', 'Rojas Guevara', 'Profesionales', 'Dirección de Postgrado', 'null', NULL, '', 'vrojasde@ucab.edu.ve'),
(1025, '13981136', 'Jessy Manuel', 'Rojas Robles', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'jerojasr@ucab.edu.ve'),
(1026, '24701369', 'Christopher David', 'Romero Azugaray', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'cromeroa@ucab.edu.ve'),
(1027, '5560037', 'Wilmer Iván', 'Romero Diaz', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'wromero@ucab.edu.ve'),
(1028, '13884875', 'Luis José', 'Rondon Brito', 'Profesionales', 'Coordinación de Deportes', 'null', NULL, '', 'lrondonb@ucab.edu.ve'),
(1029, '12187976', 'Jesus Manuel', 'Rondon Flores', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'jrondonf@ucab.edu.ve'),
(1030, '12073772', 'Teresa Elena', 'Rondon Rangel', 'Docentes Pregrado', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'trondonr@ucab.edu.ve'),
(1031, '8025272', 'Adolia', 'Rosales De Maldonado', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'arosales@ucab.edu.ve'),
(1032, '14368984', 'Pilar del Valle', 'Rosales Parra', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'prosales@ucab.edu.ve'),
(1033, '11843608', 'Gerardo', 'Ruiz Camero', 'Profesionales', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'gruizcam@ucab.edu.ve'),
(1034, '8961599', 'Vladimir José', 'Ruiz Cayaspo', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'vruiz@ucab.edu.ve'),
(1035, '12129218', 'Omar Jose', 'Salazar Benavente', 'Empleados', 'Coordinación de Seguridad', 'null', NULL, '', 'omsalaza@ucab.edu.ve'),
(1036, '24849471', 'Jonathan Oswaldo', 'Salazar Guerra', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'josalaza@ucab.edu.ve'),
(1037, '18000537', 'Neliber José', 'Salazar Ramirez', 'Empleados', 'Direc.Gen. Identidad Desarrollo Estudiantil y Ext. Social', 'null', NULL, '', 'nesalaza@ucab.edu.ve'),
(1038, '21248022', 'Nelson Bernardino', 'Salazar Ramirez', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'nelsalaz@ucab.edu.ve'),
(1039, '5117106', 'María Teresa ', 'Sanchez Reyes', 'Docentes Pregrado', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'marisanc@ucab.edu.ve'),
(1040, '15040074', 'Mariely Carolina', 'Sarmiento Arteaga', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'msarmien@ucab.edu.ve'),
(1041, '11728387', 'Verónica Lisbeth', 'Schweigart Rios', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'vschweig@ucab.edu.ve'),
(1042, '4594954', 'Antonio Enrique', 'Seijas Botana', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'aseijas@ucab.edu.ve'),
(1043, '14726819', 'Oliver Eion', 'Serrao Arrioja', 'Profesionales', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'oserraoa@ucab.edu.ve'),
(1044, '3046711', 'Elba', 'Sieglett De Quintero', 'Empleados', 'Vice-Rectorado de Extensión', 'null', NULL, '', 'esieglet@ucab.edu.ve'),
(1045, '6932070', 'Richard Javier', 'Sierra Perez', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'rsierrap@ucab.edu.ve'),
(1046, '8920651', 'Ranses Epifanis', 'Sifontes Idrogo', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'rsifonte@ucab.edu.ve'),
(1047, '7232126', 'Romel Felipe ', 'Silva Briceño', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'rsilvabr@ucab.edu.ve'),
(1048, '4816918', 'Marisol Josefina', 'Silva De Le Du', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'marsilva@ucab.edu.ve'),
(1049, '23572846', 'José Luis', 'Silva Rodriguez', 'Profesionales', 'Dirección General de Administración y Finanzas', 'null', NULL, '', 'jsilvaro@ucab.edu.ve'),
(1050, '12130714', 'Nidia del Carmen', 'Solano Idrogo', 'Empleados', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'nsolanoi@ucab.edu.ve'),
(1051, '12050490', 'Ramón Dario', 'Sosa Caraballo', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'rsosacar@ucab.edu.ve'),
(1052, '3198343', 'Valentín', 'Sosa Rojas', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'vsosa@ucab.edu.ve'),
(1053, '26939411', 'Davelis Vanessa', 'Suarez Alvarez', 'Profesionales', 'Dirección de Planificación y Gestión Estratégica', 'null', NULL, '', 'dsuareza@ucab.edu.ve'),
(1054, '11026540', 'Juan Carlos', 'Tacoa Berroteran', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'jtacoabe@ucab.edu.ve'),
(1055, '13334488', 'Martha', 'Torres De Briceño', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'marttorr@ucab.edu.ve'),
(1056, '27656488', 'Scarleth Del Valle', 'Torres Mota', 'Empleados', 'Coordinación de Servicios Financieros', 'null', NULL, '', 'storresm@ucab.edu.ve'),
(1057, '8672662', 'Marianela Coromoto', 'Tortolero Herrera', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'mtortole@ucab.edu.ve'),
(1058, '16613063', 'Ysmaira Yanett', 'Touriño De Boleo', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'ytourino@ucab.edu.ve'),
(1059, '26459459', 'Jose Rafel', 'Urbaneja Rondon', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'jurbaneja@ucab.edu.ve'),
(1060, '10104229', 'María Cora', 'Urdaneta Ponte', 'Docentes Pregrado', 'Escuela de Ingeniería Informática', 'null', NULL, '', 'maurdane@ucab.edu.ve'),
(1061, '5762664', 'Henrri Maria', 'Uzcategui Uzcategui', 'Profesionales', 'Coordinación de Sustentabilidad Ambiental', 'null', NULL, '', 'huzcateg@ucab.edu.ve'),
(1062, '25032186', 'Orlando Jose', 'Uzcategui Yanez', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'ouzcateg@ucab.edu.ve'),
(1063, '25395377', 'José Enrique', 'Valdez Zerpa', 'Profesionales', 'Dirección de Extensión Social Universitaria', 'null', NULL, '', 'jvaldezz@ucab.edu.ve'),
(1064, '81080632', 'Carlos', 'Valente Rocha', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'cvalente@ucab.edu.ve'),
(1065, '13216479', 'Marlyn Josefina', 'Vargas Puerta', 'Profesionales', 'Dirección de Secretaría', 'null', NULL, '', 'mvargasp@ucab.edu.ve'),
(1066, '12130083', 'Noiralyh Ydalmys', 'Vasquez Noriega', 'Profesionales', 'Dirección de Identidad y Misión', 'null', NULL, '', 'novasque@ucab.edu.ve'),
(1067, '10275805', 'Gustavo', 'Veitia Gutierrez', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'gveitiag@ucab.edu.ve'),
(1068, '17432300', 'Antonio José', 'Velasquez Diaz', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'avelasqu@ucab.edu.ve'),
(1069, '12359130', 'Mariana Natalia', 'Viamonte Garcia', 'Empleados', 'Coordinación General de Tecnología de la Información', 'null', NULL, '', 'mviamont@ucab.edu.ve'),
(1070, '12068901', 'Miguel Angel', 'Vicentin Bello', 'Docentes Pregrado', 'Escuela de Derecho ', 'null', NULL, '', 'mivicen@ucab.edu.ve'),
(1071, '3776450', 'Fernando José', 'Vilchez Leal', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'fvilchez@ucab.edu.ve'),
(1072, '4720905', 'Belkis ', 'Villaverde Colmenarez', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'bvillave@ucab.edu.ve'),
(1073, '10932977', 'Juan Manuel', 'Vivas Lorenzo', 'Profesionales', 'Coordinación de Seguridad', 'null', NULL, '', 'pvalless@ucab.edu.ve'),
(1074, '6454735', 'Igor', 'Williams De Castro', 'Docentes Pregrado', 'Escuela Administración y Contaduría ', 'null', NULL, '', 'iwilliam@ucab.edu.ve'),
(1075, '8438050', 'Elizabeth', 'Zabala Medina', 'Profesionales', 'Fac. Ingeniería: Cátedras Intrafacultad Pregrado', 'null', NULL, '', 'ezabalam@ucab.edu.ve'),
(1076, '25512006', 'Rosana María', 'Zacarias Leslie', 'Docentes Pregrado', 'Escuela de Ingeniería Civil', 'null', NULL, '', 'rzacaria@ucab.edu.ve'),
(1077, '9943139', 'José Gregorio', 'Zacarias Vasquez', 'Docentes Pregrado', 'Escuela de Ingeniería Industrial', 'null', NULL, '', 'jzacaria@ucab.edu.ve'),
(1078, '5385126', 'Doraine Mercedes', 'Zamora De Carvajal', 'Docentes Pregrado', 'Escuela de Comunicación Social', 'null', NULL, '', 'dzamora@ucab.edu.ve'),
(1079, '17525465', 'Yenife josefina', 'Zapata Romero', 'Profesionales', 'Coordinación de Seguridad y Salud Laboral', 'null', NULL, '', 'yzapatar@ucab.edu.ve');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

CREATE TABLE `periodos` (
  `id` varchar(10) NOT NULL,
  `actual` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `periodos`
--

INSERT INTO `periodos` (`id`, `actual`) VALUES
('2024-15', 0),
('2024-25', 1),
('2025-15', 0),
('2025-25', 0),
('2026-15', 0),
('2026-25', 0),
('2027-15', 0),
('2027-25', 0),
('2028-15', 0),
('2028-25', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supervisiones`
--

CREATE TABLE `supervisiones` (
  `coordinador` varchar(20) DEFAULT NULL,
  `agrupacion` int(10) UNSIGNED NOT NULL,
  `periodo` varchar(10) NOT NULL,
  `docente` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `supervisiones`
--

INSERT INTO `supervisiones` (`coordinador`, `agrupacion`, `periodo`, `docente`) VALUES
('12130083', 1, '2024-15', NULL),
('17339009', 1, '2024-25', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `password`) VALUES
('DIM', '2023');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acompannantes`
--
ALTER TABLE `acompannantes`
  ADD PRIMARY KEY (`agrupacion`,`actividad`,`acompannante`,`periodo`) USING BTREE,
  ADD KEY `acompannantes_ibfk_2` (`actividad`),
  ADD KEY `acompannantes_ibfk_4` (`periodo`),
  ADD KEY `acompannantes_ibfk_3` (`acompannante`);

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`,`agrupacion`),
  ADD KEY `agrupacion` (`agrupacion`);

--
-- Indices de la tabla `agrupaciones`
--
ALTER TABLE `agrupaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `comunidades`
--
ALTER TABLE `comunidades`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `conformaciones_agrupaciones`
--
ALTER TABLE `conformaciones_agrupaciones`
  ADD PRIMARY KEY (`agrupacion`,`actividad`,`periodo`),
  ADD KEY `periodo` (`periodo`),
  ADD KEY `conformaciones_agrupaciones_ibfk_2` (`actividad`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`agrupacion`,`participante`,`periodo`),
  ADD KEY `periodo` (`periodo`),
  ADD KEY `inscripciones_ibfk_2` (`participante`);

--
-- Indices de la tabla `participaciones`
--
ALTER TABLE `participaciones`
  ADD PRIMARY KEY (`agrupacion`,`actividad`,`participante`,`periodo`),
  ADD KEY `periodo` (`periodo`),
  ADD KEY `participaciones_ibfk_2` (`actividad`),
  ADD KEY `participaciones_ibfk_3` (`participante`);

--
-- Indices de la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `emailInst` (`emailInst`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `participantes_ibfk_1` (`comunidad`);

--
-- Indices de la tabla `periodos`
--
ALTER TABLE `periodos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `supervisiones`
--
ALTER TABLE `supervisiones`
  ADD PRIMARY KEY (`agrupacion`,`periodo`) USING BTREE,
  ADD KEY `periodo` (`periodo`),
  ADD KEY `supervisiones_ibfk_4` (`docente`),
  ADD KEY `supervisiones_ibfk_1` (`coordinador`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`nombre`,`password`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `agrupaciones`
--
ALTER TABLE `agrupaciones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `comunidades`
--
ALTER TABLE `comunidades`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `participantes`
--
ALTER TABLE `participantes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1080;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acompannantes`
--
ALTER TABLE `acompannantes`
  ADD CONSTRAINT `acompannantes_ibfk_1` FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`),
  ADD CONSTRAINT `acompannantes_ibfk_2` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`),
  ADD CONSTRAINT `acompannantes_ibfk_3` FOREIGN KEY (`acompannante`) REFERENCES `participantes` (`cedula`),
  ADD CONSTRAINT `acompannantes_ibfk_4` FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

--
-- Filtros para la tabla `conformaciones_agrupaciones`
--
ALTER TABLE `conformaciones_agrupaciones`
  ADD CONSTRAINT `conformaciones_agrupaciones_ibfk_1` FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`),
  ADD CONSTRAINT `conformaciones_agrupaciones_ibfk_2` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`),
  ADD CONSTRAINT `conformaciones_agrupaciones_ibfk_3` FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`),
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`participante`) REFERENCES `participantes` (`cedula`),
  ADD CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

--
-- Filtros para la tabla `participaciones`
--
ALTER TABLE `participaciones`
  ADD CONSTRAINT `participaciones_ibfk_1` FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`),
  ADD CONSTRAINT `participaciones_ibfk_2` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`),
  ADD CONSTRAINT `participaciones_ibfk_3` FOREIGN KEY (`participante`) REFERENCES `participantes` (`cedula`),
  ADD CONSTRAINT `participaciones_ibfk_4` FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

--
-- Filtros para la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `participantes_ibfk_1` FOREIGN KEY (`comunidad`) REFERENCES `comunidades` (`nombre`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `supervisiones`
--
ALTER TABLE `supervisiones`
  ADD CONSTRAINT `supervisiones_ibfk_1` FOREIGN KEY (`coordinador`) REFERENCES `participantes` (`cedula`),
  ADD CONSTRAINT `supervisiones_ibfk_2` FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`),
  ADD CONSTRAINT `supervisiones_ibfk_3` FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
