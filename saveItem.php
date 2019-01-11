<?php


$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';


if ($contentType === "application/text") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $arr = json_decode($content, true);

    //If json_decode failed, the JSON is invalid.
    if(! is_array($arr)) {



    }

    $pdodb = new PDO('mysql:host=localhost; dbname=bondardb', 'root', '');
    $pdodb -> exec("SET NAMES UTF8 ");
    $params = [ "nameeng"=>$arr['data']['name'], "Vh"=>$arr['data']['Vh'], "H"=>$arr['data']['H'], "Dv"=>$arr['data']['Dv'], "d_v"=>$arr['data']['dv'],
        "Lv"=>$arr['data']['Lv'], "Lv2"=>$arr['data']['Lv2'],
        "Lop"=>$arr['data']['Lop'], "Ddv"=>$arr['data']['Ddv'], "Lukl"=>$arr['data']['Lukl'], "Deltal"=>$arr['data']['DeltaL'], "Gv"=>$arr['data']['Gv'],
        "Ve"=>$arr['data']['V_e'], "Roh"=>$arr['data']['Roh'], "Ro"=>$arr['data']['Ro'],
        "k2"=>$arr['data']['k2'], "k4"=>$arr['data']['k4'], "L"=>$arr['data']['L'], "Fe"=>$arr['data']['Fe'], "Fet"=>$arr['data']['Fe_t'],
        "De"=>$arr['data']['De'], "Dm"=>$arr['data']['Dm'], "Delta"=>$arr['data']['Delta'],
        "Romin"=>$arr['data']['Ro_min'], "Fmin"=>$arr['data']['Fmin'], "LopLop1"=>$arr['data']['Lop_Lop1'], "c"=>$arr['data']['c'], "k"=>$arr['data']['k'],
        "Dmin"=>$arr['data']['Dmin'], "R"=>$arr['data']['R'], "Tgbx"=>$arr['data']['TgBx'], "F2"=>$arr['data']['F2'], "userid" => $arr['id']
    ];
    $querysave = $pdodb->prepare("INSERT INTO savedeng SET nameeng=:nameeng, Vh=:Vh, H=:H, Dv=:Dv, d_v=:d_v,	Lv=:Lv, Lv2=:Lv2, Lop=:Lop, Ddv=:Ddv, Lukl=:Lukl, Deltal=:Deltal, Gv=:Gv, Ve=:Ve, Roh=:Roh, Ro=:Ro, k2=:k2, k4=:k4, L=:L, Fe=:Fe, Fet=:Fet, De=:De, Dm=:Dm, Delta=:Delta, Romin=:Romin, Fmin=:Fmin, LopLop1=:LopLop1, c=:c, k=:k, Dmin=:Dmin, R=:R, Tgbx=:Tgbx, F2=:F2, userid=:userid");
    if($querysave -> execute($params))
    {

       print_r($arr);
    }
    else{
        print_r($content );
    }

} else {
    echo 'disconnected';
}
?>