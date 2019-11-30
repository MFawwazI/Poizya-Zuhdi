<?php
header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
require_once 'config.php';

$response = array();

if ($_POST) {
    $id_product = $_POST['idproduct'];
    $id_account = $_POST['idaccount'];
    $query = "DELETE FROM favorite WHERE id_product='$id_product' AND id_account='$id_account'";
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
