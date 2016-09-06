<?php
require 'flight/Flight.php';

Flight::route('GET /points/@reviewerId:[0-9a-zA-Z]+', function($reviewerId){
    $url = "data/" . $reviewerId . ".json";
    if (!is_readable($url)) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    $json = file_get_contents($url);

    header("Content-Type: text/javascript; charset=utf-8");
    echo $json;
});

Flight::route('PUT /points/@reviewerId:[0-9a-zA-Z]+', function($reviewerId){
    $url = "data/" . $reviewerId . ".json";
    if (!is_writable($url)) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    $raw = Flight::request()->getBody();
    $data = json_decode($raw);
    if (is_null($data)) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    $json = json_encode(json_decode($raw), JSON_PRETTY_PRINT);
    $result = file_put_contents($url, $json, LOCK_EX);
    if (!$result) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    header("Content-Type: text/javascript; charset=utf-8");
    echo $json;
});

Flight::start();
