<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    require_once 'config.php';

    $data = array();

    $query = "SELECT * FROM product WHERE status='1'";
    $result = mysqli_query($db, $query);

    if(mysqli_num_rows($result) > 0){
        while($row = $result->fetch_assoc()) {
            $Product[] = $row;
        }
        
        $data = $Product;
    }else{
        $data = null;
    }
        
    //returns data as JSON format
    echo json_encode($data);
    
?>