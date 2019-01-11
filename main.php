<?php
if($_COOKIE['user'] && $_COOKIE['password']) {
    $pdodb = new PDO('mysql:host=localhost; dbname=bondardb', 'root', '');
    $pdodb->exec("SET NAMES UTF8 ");
    $params = ["username" => $_COOKIE['user'], "password" => $_COOKIE['password']];
    $queryget = $pdodb->prepare("SELECT * FROM users WHERE username=:username AND password=:password");
    if ($queryget->execute($params)) {
    }
    $count = $queryget->rowCount();
    if ($count != 0) {
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/fonts.css">
    <title>Document</title>

</head>
<body>
<div class="add_item" style="position: absolute;top:0px; right: 20px; width: 50px; height: 50px; background: lawngreen; border-radius: 0 0 50% 50%; font-size: 40px; color: white; text-align: center; line-height: 50px; z-index:40">+</div>
<div class="folder">
</div>
<div class="inputs">
    <input id="name_of_engine" placeholder="Назва" style="border: 2px solid lawngreen">
    <input id="vh" placeholder="Швидкість польоту Vн" value ="660">
    <input id="h" placeholder="Висота польоту Н" value ="7000">
    <input id="dv" placeholder="Діаметр міделю втулки повітряного гвинта Dв" value ="0.4">
    <input id="dv2" placeholder="Діаметр міделю втулки повітряного гвинта dв" value ="0.2">
    <input id="lv" placeholder="Довжина втулки гвинта Lв" value ="0.6">
    <input id="lv2" placeholder="Довжина втулки другого гвинта Lв2" value ="0.2">
    <input id="lop" placeholder="Відстань від втулки другого гвинта до внутрішньої кромки входу в двигуна Lop" value ="0.3">
    <input id="ddv" placeholder="Внутрішній і зовнішній діаметри входу в двигунь перед компресором dдв, Dдв" value ="0.35">
    <input id="lukl" placeholder="Відстань по осі Х від внутрішньої до зовнішньої кромок входу в двигун Lукл" value = "0.2">
    <input id="deltal" placeholder="Відстань від втулки заднього гвинта до передньої кромки повітрозабірника ΔL" value="0.04">
    <input id="gv" placeholder="Витрата повітря Gв, кг / с на розрахунковому режимі польоту" value="18">
    <p id="count">Рассчитать</p>
</div>
<div class="shader"></div>
<div class="canvas_hover">
    <canvas id="canvas"></canvas>
    <ul class="canvas_desc"></ul>
    <p id="canvas_name"></p>
    <div class="red_cross">Закрити</div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>
<?php
    }
    else{
        echo "invalid Data";
    }
}
else{
    header("HTTP/1.0 404 Not Found");
}

?>