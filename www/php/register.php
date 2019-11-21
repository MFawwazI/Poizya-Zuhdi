<?php
header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');
require_once 'config.php';


$response = array();

if ($_POST) {
    $Username = $_POST['username'];
    $Email = $_POST['email'];
    $Phone_number = $_POST['phone_number'];
    $Password = base64_encode($_POST['password']);

    $query = "INSERT INTO account(username,email,password,phone_number,level,status) VALUES('$Username', '$Email', '$Password', '$Phone_number', '0', '0')";
    $result = mysqli_query($db, $query);

    if ($result) {
        $response['email'] = $Email;
        $response['status'] = 'success';
        $response['message'] = '<span class="fas fa-check"></span> &nbsp; OK! registered successfully, Please verify your email';
    } else {
        $response['status'] = 'error';
        $response['message'] = '<span class="fa fa-info-circle"></span> &nbsp; Not OK! registered unsuccessfully, please try again :)';
    }
} else {
    $response = "Data not entered";
}
echo json_encode($response);
