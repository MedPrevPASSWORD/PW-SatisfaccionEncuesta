<?php
header('Content-Type: application/json');
include '../php/conn.php';

// ================================
// Función auxiliar
// ================================
function send_response($success, $data = [], $message = '')
{
    echo json_encode([
        "success" => $success,
        "count" => is_array($data) ? count($data) : 0,
        "data" => $data,
        "message" => $message
    ]);
    exit;
}

try {
    // ================================
    // Construcción de filtros dinámicos
    // ================================
    $conditions = [];
    $params = [];
    $types = '';

    if (!empty($_GET['area'])) {
        $conditions[] = "p1_area_atencion = ?";
        $params[] = $_GET['area'];
        $types .= "s";
    }

    if (!empty($_GET['experiencia'])) {
        $conditions[] = "p2_experiencia = ?";
        $params[] = $_GET['experiencia'];
        $types .= "s";
    }

    // ================================
    // Consulta dinámica
    // ================================
    $sql = "SELECT * FROM pw_encuesta_de_satisfaccion";
    if ($conditions) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    $stmt = $conn->prepare($sql);
    if ($params) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Mensaje descriptivo según filtros
    $mensaje = "Datos generales cargados.";
    if (!empty($_GET)) {
        $filtros = [];
        foreach ($_GET as $key => $value) {
            $filtros[] = "$key = $value";
        }
        $mensaje = "Datos filtrados por: " . implode(", ", $filtros);
    }

    send_response(true, $data, $mensaje);

} catch (Exception $e) {
    http_response_code(500);
    send_response(false, [], "Error: " . $e->getMessage());
} finally {
    $conn->close();
}
?>
