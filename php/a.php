<?php
require_once 'logs.php';

log_insert("Prueba directa", ["test" => 123]);
log_error("Prueba de error", ["msg" => "algo salió mal"]);

?>