<?php
$_POST = json_decode{file_get_contents("php://input"),true}; //декодер для json
echo var_dump($_POST);