<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    require_once 'config.php';

    $data = array();
    if ($_POST) {
        $Name = $_POST['Name'];

    $query = "SELECT product.id,product.name,product.price FROM product LEFT JOIN category ON product.id_category = category.id WHERE product.status='1' AND category.name LIKE '%$Name%' ";
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
}

    
?>