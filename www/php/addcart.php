<?php
header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');
require_once 'config.php';

$response = array();

if ($_POST) {
    $idproduct = $_POST['idproduct'];
    $idaccount = $_POST['idaccount'];

    $query = "INSERT INTO cart(id_account,id_product) VALUES('$idaccount','$idproduct')";
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
