<?php

require 'conn.php';

// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);

// Validar que los datos existen
if (isset($data['area_atencion'], $data['experiencia'], $data['puntualidad'], $data['recomendacion'])) {
    // Sanear los datos para evitar inyecciones SQL
    $area_atencion = $conn->real_escape_string($data['area_atencion']);
    $experiencia = $conn->real_escape_string($data['experiencia']);
    $puntualidad = $conn->real_escape_string($data['puntualidad']);
    $recomendacion = $conn->real_escape_string($data['recomendacion']);
    $comentarios = isset($data['comentarios']) ? $conn->real_escape_string($data['comentarios']) : "";

    // Crear la consulta SQL para insertar los datos en la tabla
    $sql = "INSERT INTO pw_encuesta_de_satisfaccion (p1_area_atencion, p2_experiencia, p3_puntualidad, p4_recomendacion, comentarios) 
            VALUES ('$area_atencion', '$experiencia', '$puntualidad', '$recomendacion', '$comentarios')";

    if ($conn->query($sql) === TRUE) {
        // Si la inserción fue exitosa, enviar una respuesta JSON
        echo json_encode(["success" => true, "message" => "Encuesta enviada con éxito"]);
    } else {
        // Si hubo un error, enviar una respuesta JSON de error
        echo json_encode(["success" => false, "message" => "Error al insertar los datos: " . $conn->error]);
    }
} else {
    // Si faltan algunos datos requeridos
    echo json_encode(["success" => false, "message" => "Faltan algunos datos obligatorios."]);
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
