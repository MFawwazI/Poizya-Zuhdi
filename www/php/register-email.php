<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once 'config.php';
require_once 'phpmailer/classes/class.phpmailer.php';

$data = array();

if ($_POST) {
    $Username = $_POST['username'];
    $Email = $_POST['email'];
    $query = "SELECT id,email FROM account WHERE email = '$Email' ";
    $result = mysqli_query($db, $query);

    if (mysqli_num_rows($result) == 1) {
        $userData = mysqli_fetch_assoc($result);

        $id = $userData["id"];

        $mail = new PHPMailer;
        $mail->IsSMTP();
        $mail->SMTPSecure = ‘tls’;
        $mail->Host = "ssl://poizya.dennyfebrygo.com";
        $mail->SMTPDebug = 2;
        $mail->Port = 465;
        $mail->SMTPAuth = true;
        $mail->Username = "no-reply@poizya.dennyfebrygo.com"; //user email
        $mail->Password = "inwardco24"; //password email
        $mail->SetFrom("no-reply@poizya.dennyfebrygo.com", "Admin Poizya"); //set email pengirim
        $mail->Subject = "Verifikasi Email"; //subyek email
        $mail->AddAddress($Email, $Username); //tujuan email
        $mail->MsgHTML("Hallo $Username ,<br/><br/>Thank you for registering a Poizya account<br/>Please click <a href=''>here</a> to verify your account");
        if ($mail->Send()) $data['email'] = "Message has been sent";
        else $data['email'] = "Failed to sending message";

        $data = $userData;
    } else {
        $data = 'tidak berhasil';
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
