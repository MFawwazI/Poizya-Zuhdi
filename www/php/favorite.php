<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once 'config.php';

$data = array();

if ($_POST) {
    $id_product = $_POST['id_product'];
    $id_account = $_POST['id_account'];
    $query = "SELECT * FROM favorite WHERE id_product = '$id_product' AND id_account = '$id_account' ";
    $result = mysqli_query($db, $query);

    $row = mysqli_num_rows($result);
    if ($row == 1) {
        $data = true;
    } else {
        $data = false;
    }
    //returns data as JSON format
    echo json_encode($data);
} else {
    $obj = (object) [
        'error' => 'user not found!'
    ];
    http_response_code(400);
    echo json_encode($obj);
}
