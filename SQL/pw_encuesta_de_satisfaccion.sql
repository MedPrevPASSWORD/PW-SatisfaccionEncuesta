-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 02-10-2025 a las 17:49:24
-- Versión del servidor: 8.0.42-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3-4ubuntu2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pw-encuesta-satisfaccion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pw_encuesta_de_satisfaccion`
--

CREATE TABLE `pw_encuesta_de_satisfaccion` (
  `id` int NOT NULL,
  `p1_area_atencion` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `p2_experiencia` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `P3_puntualidad` tinyint(1) DEFAULT NULL,
  `p4_recomendacion` tinyint(1) DEFAULT NULL,
  `comentarios` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pw_encuesta_de_satisfaccion`
--

INSERT INTO `pw_encuesta_de_satisfaccion` (`id`, `p1_area_atencion`, `p2_experiencia`, `P3_puntualidad`, `p4_recomendacion`, `comentarios`) VALUES
(13, 'nutricion', 'insatisfecho', 1, 0, 'Ieieejwiqwo'),
(14, 'nutricion', 'satisfecho', 1, 1, 'Nutri, satisfecho, si, si'),
(15, 'fisica', 'insatisfecho', 1, 1, ''),
(16, 'nutricion', 'satisfecho', 1, 1, ''),
(17, 'nutricion', 'satisfecho', 0, 1, ''),
(18, 'fisica', 'normal', 1, 1, 'Uxuckv'),
(19, 'fisica', 'insatisfecho', 0, 1, ''),
(20, 'nutricion', 'insatisfecho', 1, 1, 'Dhrheheh'),
(21, 'nutricion', 'normal', 1, 1, ''),
(22, 'nutricion', 'normal', 1, 1, ''),
(23, 'nutricion', 'normal', 1, 1, ''),
(24, 'nutricion', 'satisfecho', 1, 1, ''),
(25, 'nutricion', 'normal', 1, 1, 'Gracias'),
(26, 'nutricion', 'satisfecho', 1, 1, ''),
(27, 'medicina', 'satisfecho', 1, 1, 'Ueudjs'),
(28, 'nutricion', 'satisfecho', 1, 1, ''),
(29, 'fisica', 'satisfecho', 1, 1, 'Skjsis'),
(30, 'nutricion', 'normal', 1, 1, ''),
(31, 'nutricion', 'satisfecho', 1, 1, ''),
(32, 'fisica', 'normal', 1, 1, ''),
(33, 'nutricion', 'satisfecho', 1, 1, ''),
(34, 'nutricion', 'satisfecho', 1, 1, 'Irieis'),
(35, 'nutricion', 'normal', 1, 1, 'Vsvsvs'),
(36, 'nutricion', 'normal', 1, 1, 'Hshdvsha'),
(37, 'nutricion', 'normal', 1, 1, 'Egrg4y'),
(38, 'nutricion', 'satisfecho', 1, 1, 'Sgjstksgkdtjetj4wu24iw4uw4u5eu'),
(39, 'fisica', 'normal', 1, 1, 'Ugcp'),
(40, 'fisica', 'normal', 1, 1, ''),
(41, 'nutricion', 'normal', 1, 1, 'Eeh'),
(42, 'medicina', 'normal', 0, 0, 'Gdf'),
(43, 'fisica', 'normal', 1, 1, 'Ksjsje'),
(44, 'nutricion', 'insatisfecho', 1, 1, 'Doeiei');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pw_encuesta_de_satisfaccion`
--
ALTER TABLE `pw_encuesta_de_satisfaccion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pw_encuesta_de_satisfaccion`
--
ALTER TABLE `pw_encuesta_de_satisfaccion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
