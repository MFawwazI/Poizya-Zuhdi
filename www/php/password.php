<?php
header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');
require_once 'config.php';

$response = array();

if ($_POST) {
    $username = $_POST['username'];
    $old_password = base64_encode($_POST['old_password']);
    $new_password = base64_encode($_POST['new_password']);
    $time = date("Y-m-d h:i:s");

    $sql = "SELECT username,password FROM account WHERE username='$username' AND password='$old_password' ";
    $res = mysqli_query($db, $sql);
    $row = mysqli_num_rows($res);
    if ($row == 1) {
        $query = "UPDATE account SET password='$new_password',modified='$time' WHERE username='$username'";
        $result = mysqli_query($db, $query);

        if ($result) {
            $response['status'] = 'success';
            $response['message'] = '<span class="fas fa-check"></span> &nbsp; OK! password change successfully';
        } else {
            $response['status'] = 'error';
            $response['message'] = '<span class="fa fa-info-circle"></span> &nbsp; Not OK! password change unsuccessfully, please try again :)';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = '<span class="fa fa-info-circle"></span> &nbsp; The old password you entered is incorrect';
    }
} else {
    $response = "Data not found";
}
echo json_encode($response);
