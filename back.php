<?php
    header("Content-Type:json; charset=utf-8");
    $value = 'SB1';
    if(!empty($_GET['values'])){
        $value = $_GET['values'];
    }
    $command="python mine.py ";
    return json_encode(passthru($command.$value));
?>