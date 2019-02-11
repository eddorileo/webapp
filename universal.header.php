<?php
header("X-Frame-Options: DENY");
function template_path($frontend=false){
    return (($frontend===false)?("/app"):(""))."/templates/".getenv('template');
}
function root_path(){
    return "/app";
}
$cache_version = 7; //bump when changing JS or CSS files