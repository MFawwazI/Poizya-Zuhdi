<?php
$db = mysqli_connect('localhost', 'dene4871_denny', 'inwardco24', 'dene4871_poizya');
if (!$db) {
    $obj = (object) [
        'error' => 'failed to connect to db'
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($obj);
}
