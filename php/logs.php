<?php

include 'conn.php';

function log_error($mensaje, $data = null) {
    $file = __DIR__ . '/../logs/errors.log';
    escribir_log($file, $mensaje, $data);
}

function log_insert($mensaje, $data = null) {
    $file = __DIR__ . '/../logs/inserts.log';
    escribir_log($file, $mensaje, $data);
}

function escribir_log($file, $mensaje, $data) {
    $fecha = date('Y-m-d H:i:s');

    $info = is_array($data) || is_object($data)
        ? json_encode($data, JSON_UNESCAPED_UNICODE)
        : $data;

    $line = "[$fecha] $mensaje => $info" . PHP_EOL;

    file_put_contents($file, $line, FILE_APPEND);
}

?>