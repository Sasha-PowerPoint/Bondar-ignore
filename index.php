<?php
//header("location: main.html");

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
$pass = $_POST['password'];


    $pdodb = new PDO('mysql:host=localhost; dbname=bondardb', 'root', '');
    $pdodb->exec("SET NAMES UTF8 ");
    $params = ["username" => $name, "password"=> $pass];
    $queryget = $pdodb->prepare("SELECT * FROM users WHERE username=:username AND password=:password");
    if ($queryget->execute($params)) {
    }
        $count = $queryget->rowCount();
if($count != 0)
{
    $user = $queryget->fetch();
    setcookie("user", $user['username']);
    setcookie("password", $user['password']);
    header("location: main.html");
    }
    else {
        echo "Invalid data";
    }
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="https://bootswatch.com/4/solar/bootstrap.min.css">
<!--    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/normalize.css"> -->
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
    <style>
        .form-group{
            display: flex;
            flex-direction: column;
        }
    </style>
</head>
<body style="display: flex; align-items: center; justify-content: center; padding-top: 150px; flex-direction: column;">
    <h2 class="text-primary">NeedLe</h2>
    <div class="form-group row">
          <input style="width: 300px" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введіть ваш нікнейм" name="name">
        </div>
        <div class="form-group row">
          <input style="width: 300px" type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" name="password">
        </div>
        <button style="width: 300px" type="submit" class="btn btn-primary">Submit</button>
</body>
</html>