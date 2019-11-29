<?php
header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
require_once 'config.php';

$response = array();

if ($_POST) {
    $idcart = $_POST['idcart'];
    $query = "DELETE FROM cart WHERE id='$idcart'";
    $result = mysqli_query($db, $query);

    if ($result) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
    }
} else {
    $response = "Data not found";
}
echo json_encode($response);
