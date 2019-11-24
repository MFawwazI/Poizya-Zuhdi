<?php
header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');
require_once 'config.php';

$response = array();

if ($_POST) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $bio = $_POST['bio'];
    $gender = $_POST['gender'];
    $birthday = $_POST['birthday'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $portal_code = $_POST['portal_code'];
    $time = date("Y-m-d h:i:s");

        $query = "UPDATE account SET name='$name', bio='$bio', gender='$gender', birthday='$birthday', phone_number='$phone', address='$address', portal_code='$portal_code', modified='$time' WHERE id='$id'";
        $result = mysqli_query($db, $query);

        if ($result) {
            $response['status'] = 'success';
            $response['message'] = '<span class="fas fa-check"></span> &nbsp; OK! profile change successfully';
        } else {
            $response['status'] = 'error';
            $response['message'] = '<span class="fa fa-info-circle"></span> &nbsp; Not OK! profile change unsuccessfully, please try again :)';
        }
} else {
    $response = "Data not found";
}
echo json_encode($response);
