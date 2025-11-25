<?php
require 'conn.php';
include 'logs.php';

log_insert("Prueba directa", ["test" => 123]);

// Función para enviar respuesta JSON
function sendResponse($success, $message)
{
    header('Content-Type: application/json');
    echo json_encode(["success" => $success, "message" => $message]);
    exit;
}

// Verificar método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, "Método no permitido");
}

// Obtener los datos enviados desde el frontend
$input = file_get_contents("php://input");
if (empty($input)) {
    sendResponse(false, "No se recibieron datos");
}

$data = json_decode($input, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    sendResponse(false, "Formato de datos inválido");
}

// Validar campos obligatorios
$requiredFields = ['area_atencion', 'experiencia', 'puntualidad', 'recomendacion']; // Estos datos se envían de main js en un  body: JSON.stringify(datos)
foreach ($requiredFields as $field) {

    // 1. Verifica que exista
    if (!isset($data[$field])) {
        sendResponse(false, "Faltan datos obligatorios: $field");
    }

    // 2. Verifica que no sea cadena vacía (pero permite "0")
    if (trim((string)$data[$field]) === '') {
        sendResponse(false, "El campo '$field' no puede estar vacío");
    }
}

// Validación de valores permitidos
$validAreas = ['nutricion', 'medicina', 'fisica'];
$validExperiencias = ['satisfecho', 'normal', 'insatisfecho'];
$validPuntualidad = ['1', '0'];
$validRecomendacion = ['1', '0'];

if (!in_array($data['area_atencion'], $validAreas)) {
    sendResponse(false, "Área de atención inválida");
}
if (!in_array($data['experiencia'], $validExperiencias)) {
    sendResponse(false, "Experiencia inválida");
}
if (!in_array($data['puntualidad'], $validPuntualidad)) {
    sendResponse(false, "Puntualidad inválida");
}
if (!in_array($data['recomendacion'], $validRecomendacion)) {
    sendResponse(false, "Recomendación inválida");
}

// Sanitizar comentarios
$comentarios = isset($data['comentarios']) ? substr(trim($data['comentarios']), 0, 500) : "";

// Preparar la consulta segura
$stmt = $conn->prepare(
    "INSERT INTO pw_encuesta_de_satisfaccion 
    (p1_area_atencion, p2_experiencia, p3_puntualidad, p4_recomendacion, comentarios)
    VALUES (?, ?, ?, ?, ?)"
);

if (!$stmt) {
    log_error("Error al preparar consulta: " . $conn->error);
    sendResponse(false, "Error interno del servidor");
}

// Vincular parámetros y ejecutar
$stmt->bind_param(
    "sssss",
    $data['area_atencion'],
    $data['experiencia'],
    $data['puntualidad'],
    $data['recomendacion'],
    $comentarios
);

if ($stmt->execute()) {
    sendResponse(true, "Encuesta enviada con éxito");
    log_insert("Encuesta insertada: " . json_encode($data));
    log_insert("Prueba directa de qeu si jala", ["test" => 123]);
} else {
    // Registrar error internamente, no mostrar detalles al usuario
    log_error("Error al insertar encuesta: " . $stmt->error);
    sendResponse(false, "Ocurrió un error al enviar la encuesta");
}

// Cerrar conexión
$stmt->close();
$conn->close();
