<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
require_once 'config.php';

$data = array();

if ($_POST) {
    $username = $_POST['username'];
    $query = "SELECT * FROM account WHERE username = '$username' ";
    $result = mysqli_query($db, $query);
    $num_row = mysqli_num_rows($result);
    while ($row = mysqli_fetch_object($result)) {
        $data[] = $row;
    }


    if ($num_row > 0) {
        echo json_encode($data);
    }
} else {
    $obj = (object) [
        'error' => 'user tidak ditemukan!'
    ];
    echo json_encode($obj);
}
