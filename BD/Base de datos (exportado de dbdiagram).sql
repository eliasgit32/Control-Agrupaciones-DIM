CREATE TABLE `agrupaciones` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(25) UNIQUE NOT NULL,
  `descripcion` varchar(255),
  `cupos` tinyint unsigned NOT NULL DEFAULT 0,
  `publico` varchar(25) NOT NULL,
  `catedra` tinyint(1) NOT NULL DEFAULT 0
);

CREATE TABLE `actividades` (
  `id` int unsigned,
  `agrupacion` int unsigned,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(255),
  PRIMARY KEY (`id`, `agrupacion`)
);

CREATE TABLE `conformaciones_agrupaciones` (
  `agrupacion` int unsigned,
  `actividad` int unsigned,
  `periodo` varchar(10),
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `observaciones` varchar(255),
  PRIMARY KEY (`agrupacion`, `actividad`, `periodo`)
);

CREATE TABLE `participantes` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `cedula` int unsigned UNIQUE,
  `primerNombre` varchar(25) NOT NULL,
  `segundoNombre` varchar(25),
  `primerApellido` varchar(25) NOT NULL,
  `segundoApellido` varchar(25) NOT NULL,
  `fechaNac` date NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `comunidad` smallint unsigned NOT NULL,
  `etapa` varchar(20) NOT NULL,
  `email` varchar(150) UNIQUE NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `periodoIngreso` varchar(10),
  `emailInst` varchar(150) UNIQUE
);

CREATE TABLE `estudiantes` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `cedula` int unsigned UNIQUE
);

CREATE TABLE `docentes` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `cedula` int unsigned UNIQUE
);

CREATE TABLE `personal` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `cedula` int unsigned UNIQUE
);

CREATE TABLE `participaciones` (
  `agrupacion` int unsigned,
  `actividad` int unsigned,
  `participante` int unsigned,
  `periodo` varchar(10),
  PRIMARY KEY (`agrupacion`, `actividad`, `participante`, `periodo`)
);

CREATE TABLE `inscripciones` (
  `agrupacion` int unsigned,
  `participante` int unsigned,
  `periodo` varchar(10),
  `calificacion` tinyint,
  PRIMARY KEY (`agrupacion`, `participante`, `periodo`)
);

CREATE TABLE `acompannantes` (
  `agrupacion` int unsigned,
  `actividad` int unsigned,
  `acompannantes` int unsigned,
  PRIMARY KEY (`agrupacion`, `actividad`, `acompannantes`)
);

CREATE TABLE `coordinadores` (
  `cedula` int unsigned PRIMARY KEY
);

CREATE TABLE `supervisiones` (
  `coordinador` int unsigned,
  `agrupacion` int unsigned,
  `periodo` varchar(10),
  `docente` int unsigned,
  PRIMARY KEY (`coordinador`, `agrupacion`, `periodo`)
);

CREATE TABLE `comunidades` (
  `id` smallint unsigned PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(100) UNIQUE NOT NULL,
  `tipo` varchar(20) NOT NULL
);

CREATE TABLE `periodos` (
  `id` varchar(10) PRIMARY KEY,
  `actual` tinyint(1) NOT NULL DEFAULT 0
);

ALTER TABLE `actividades` ADD FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

ALTER TABLE `conformaciones_agrupaciones` ADD FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

ALTER TABLE `conformaciones_agrupaciones` ADD FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`);

ALTER TABLE `conformaciones_agrupaciones` ADD FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

ALTER TABLE `participantes` ADD FOREIGN KEY (`comunidad`) REFERENCES `comunidades` (`id`);

ALTER TABLE `participantes` ADD FOREIGN KEY (`periodoIngreso`) REFERENCES `periodos` (`id`);

ALTER TABLE `estudiantes` ADD FOREIGN KEY (`cedula`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `docentes` ADD FOREIGN KEY (`cedula`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `personal` ADD FOREIGN KEY (`cedula`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `participaciones` ADD FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

ALTER TABLE `participaciones` ADD FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`);

ALTER TABLE `participaciones` ADD FOREIGN KEY (`participante`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `participaciones` ADD FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

ALTER TABLE `inscripciones` ADD FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

ALTER TABLE `inscripciones` ADD FOREIGN KEY (`participante`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `inscripciones` ADD FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

ALTER TABLE `acompannantes` ADD FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

ALTER TABLE `acompannantes` ADD FOREIGN KEY (`actividad`) REFERENCES `actividades` (`id`);

ALTER TABLE `acompannantes` ADD FOREIGN KEY (`acompannantes`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `coordinadores` ADD FOREIGN KEY (`cedula`) REFERENCES `participantes` (`cedula`);

ALTER TABLE `supervisiones` ADD FOREIGN KEY (`coordinador`) REFERENCES `coordinadores` (`cedula`);

ALTER TABLE `supervisiones` ADD FOREIGN KEY (`agrupacion`) REFERENCES `agrupaciones` (`id`);

ALTER TABLE `supervisiones` ADD FOREIGN KEY (`periodo`) REFERENCES `periodos` (`id`);

ALTER TABLE `supervisiones` ADD FOREIGN KEY (`docente`) REFERENCES `docentes` (`cedula`);
