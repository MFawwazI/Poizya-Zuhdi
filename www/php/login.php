<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
require_once 'config.php';

$response = array();


if ($_POST) {
    $id = $_POST['id'];
    $password = base64_encode($_POST['password']);
    $time = date("Y-m-d h:i:s");

    $sql = "SELECT * FROM account WHERE (username='$id' OR  email='$id') AND password='$password'";
    $result = mysqli_query($db, $sql);
    $num_row = mysqli_num_rows($result);
    while ($row = mysqli_fetch_object($result)) {
        $response[] = $row;
    }


    if ($num_row > 0) {
        $query = "UPDATE account SET last_login='$time' WHERE (username='$id' OR  email='$id') AND password='$password'";
        $insert = mysqli_query($db, $query);
        echo json_encode($response);
    } else {
        $obj = (object) [
            'error' => '<span class="fa fa-info-circle"></span> &nbsp; Username or Email and password you entered is incorrect :('
        ];
        http_response_code(400);
        echo json_encode($obj);
    }
}
