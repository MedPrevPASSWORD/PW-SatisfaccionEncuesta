-- Migración: agrega la pregunta de entrenador personalizado a la encuesta
-- Respuesta: 1 = Sí, 0 = No (mismo criterio que p3_puntualidad y p4_recomendacion)
-- Ejecutar una sola vez sobre la base de datos `pw-encuesta-satisfaccion`.

ALTER TABLE `pw_encuesta_de_satisfaccion`
  ADD COLUMN `p5_entrenador` tinyint(1) DEFAULT NULL AFTER `p4_recomendacion`;
