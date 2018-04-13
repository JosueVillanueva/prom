<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$i = 0;
foreach($_FILES as $campo => $valor){
    $r[$i] = "$campo -> $valor <br>";
    $i = $i+1;
}
echo json_encode($_FILES['image']['type']);
?>
