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
            <link rel="stylesheet" href="css/fonts.css">
            <link rel="stylesheet" href="css/normalize.css">
            <link rel="stylesheet" href="https://bootswatch.com/4/solar/bootstrap.min.css">

            <link rel="stylesheet" href="css/style.css">

            <title>Document</title>

        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" >NeedLe</a>
            <div class="navbar-collapse" id="navbarColor02">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" id="base">База</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" id="calculate">Розрахувати</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="base container-fluid">
            <div class="row" id="base_list">
            </div>
        </div>
        <div class="calculate container-fluid">
            <div class="row">
                <div class="form-group count-form mb-3">
                    <input class="form-control" id="name_of_engine" placeholder="Назва">
                    <input class="form-control" id="vh" placeholder="Vн" value ="660">
                    <input class="form-control" id="h" placeholder="Н" value ="7000">
                    <input class="form-control" id="dv" placeholder="Dв" value ="0.4">
                    <input class="form-control" id="dv2" placeholder="dв" value ="0.2">
                    <input class="form-control" id="lv" placeholder="Lв" value ="0.6">
                    <input class="form-control" id="lv2" placeholder="Lв2" value ="0.2">
                    <input class="form-control" id="lop" placeholder="Lop" value ="0.3">
                    <input class="form-control" id="ddv" placeholder="Dдв" value ="0.35">
                    <input class="form-control" id="lukl" placeholder="Lукл" value = "0.2">
                    <input class="form-control" id="deltal" placeholder="ΔL" value="0.04">
                    <input class="form-control" id="gv" placeholder="Gв" value="18">
                    <button type="button" class="btn btn-primary" id="count">Розрахувати</button>
                </div>
                <canvas id="canvas" class="mb-9" width="400" height="200"></canvas>
                <ul id="draw_desc" style="padding-left: 10px"></ul>
            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="js/script.js"></script>
        </body>
        </html>



        <!--
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
         -->
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