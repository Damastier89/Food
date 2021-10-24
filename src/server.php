<?php
$_POST = json_decode(file_get_contents("php://input"), true); // декодирует JSON 
echo var_dump($_POST); // данные из форм