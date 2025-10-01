<?php
// Configuración de la base de datos
$servername = "localhost"; // Cambia esto según tu configuración
$username = "root"; // Cambia esto según tu configuración
$password = ""; // Cambia esto según tu configuración
$dbname = "pw-encuesta-satisfaccion"; // Cambia esto por el nombre de tu base de datos

// Conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
