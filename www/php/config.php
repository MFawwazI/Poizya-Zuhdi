<?php
$db = mysqli_connect('localhost', 'root', '', 'poizya');
if (!$db) {
    $obj = (object) [
        'error' => 'failed to connect to db'
    ];
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($obj);
}
