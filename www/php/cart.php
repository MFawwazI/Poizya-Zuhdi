<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once 'config.php';

$data = array();
if ($_POST) {
    $id = $_POST['id'];
    $query = "SELECT product.name,product.price,cart.id FROM cart LEFT JOIN product ON cart.id_product = product.id WHERE cart.id_account = '$id'";
    $result = mysqli_query($db, $query);

    if (mysqli_num_rows($result) > 0) {
        while ($row = $result->fetch_assoc()) {
            $Product[] = $row;
        }

        $data = $Product;
    } else {
        $data = null;
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
