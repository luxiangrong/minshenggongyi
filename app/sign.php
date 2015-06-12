<?php

require_once "jssdk.php";
$jssdk = new JSSDK("wx6a5abd439bad0891", "eeb2863c1e4491f5a76c981dfcb79ca5");

$signPackage = $jssdk->GetSignPackage('/msgy/index.html');

echo json_encode($signPackage );