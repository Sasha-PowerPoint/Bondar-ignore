<?php
header("location: main.html");
/*
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
    header("location: main.php");
    }
    else {
        echo "Invalid data";
    }
}
*/
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
<body style="display: flex; align-items: center; justify-content: center">
    <form  style="display: flex; align-items: center; justify-content: center; flex-direction: column" method = "post" action = "index.php">
         <input id="name" placeholder="Ім'я" style="border: 2px solid black; width: 250px; height: 40px; padding-left: 10px; margin-bottom: 15px;"name = "name">
         <input id="pass" placeholder="Пароль" style="border: 2px solid black; width: 250px; height: 40px; padding-left: 10px; margin-bottom: 15px;" name = "password">
         <input type="submit" value="Ввійти" style="border: 2px solid black; width: 250px; height: 40px; background: black; color: white" name="submit">
    </form>
</body>
</html>