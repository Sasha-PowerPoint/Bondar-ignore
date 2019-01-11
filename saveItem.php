<?php



$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    //If json_decode failed, the JSON is invalid.
    if(! is_array($decoded)) {
        echo $decoded;


    }
    print_r($decoded);
    /*
    $pdodb = new PDO('mysql:host=localhost; dbname=bondardb', 'root', '');
    $pdodb -> exec("SET NAMES UTF8 ");
    $params = [ "nameeng"=>$arr->name, "Vh"=>$arr->Vh, "H"=>$arr->H, "Dv"=>$arr->Dv, "d_v"=>$arr->dv,
        "Lv"=>$arr->Lv, "Lv2"=>$arr->Lv2,
                "Lop"=>$arr->Lop, "Ddv"=>$arr->Ddv, "Lukl"=>$arr->Lukl, "Deltal"=>$arr->DeltaL, "Gv"=>$arr->Gv,
        "Ve"=>$arr->V_e, "Roh"=>$arr->Roh, "Ro"=>$arr->Ro,
                "k2"=>$arr->k2, "k4"=>$arr->k4, "L"=>$arr->L, "Fe"=>$arr->Fe, "Fet"=>$arr->Fe_t,
        "De"=>$arr->De, "Dm"=>$arr->Dm, "Delta"=>$arr->Delta,
                "Romin"=>$arr->Ro_min, "Fmin"=>$arr->Fmin, "LopLop1"=>$arr->Lop_lop1, "c"=>$arr->c, "k"=>$arr->k,
        "Dmin"=>$arr->Dmin, "R"=>$arr->R, "Tgbx"=>$arr->TgBx, "F2"=>$arr->F2
    ];
    $querysave = $pdodb->prepare("INSERT INTO savedeng SET nameeng=:nameeng, Vh=:Vh, H=:H, Dv=:Dv, d_v=:d_v,	Lv=:Lv, Lv2=:Lv2, Lop=:Lop, Ddv=:Ddv, Lukl=:Lukl, Deltal=:Deltal, Gv=:Gv, Ve=:Ve, Roh=:Roh, Ro=:Ro, k2=:k2, k4=:k4, L=:L, Fe=:Fe, Fet=:Fet, De=:De, Dm=:Dm, Delta=:Delta, Romin=:Romin, Fmin=:Fmin, LopLop1=:LopLop1, c=:c, k=:k, Dmin=:Dmin, R=:R, Tgbx=:Tgbx, F2=:F2");
    if($querysave -> execute($params))
    {

        echo 'Yeah';
    }
    else{
        print_r(json_decode($_POST['json']));
    }
    */
} else {
    echo 'disconnected';
}
?>