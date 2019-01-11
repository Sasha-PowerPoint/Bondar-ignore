<?php
$pdodb = new PDO('mysql:host=localhost; dbname=bondardb', 'root', '');
$pdodb -> exec("SET NAMES UTF8 ");

$queryget = $pdodb->prepare("SELECT * FROM savedeng");
if($queryget -> execute())
{
    $rows = $queryget->fetchAll();
    foreach($rows as $row) {
        $array[] = ["name" => $row['nameeng'], "Vh" => $row['Vh'], "H" => $row['H'], "Dv" => $row['Dv'], "dv" => $row['d_v'],
            "Lv" => $row['Lv'], "Lv2" => $row['Lv2'],
            "Lop" => $row['Lop'], "Ddv" => $row['Ddv'], "Lukl" => $row['Lukl'], "DeltaL" => $row['Deltal'], "Gv" => $row['Gv'],
            "V_e" => $row['Ve'], "Roh" => $row['Roh'], "Ro" => $row['Ro'],
            "k2" => $row['k2'], "k4" => $row['k4'], "L" => $row['L'], "Fe" => $row['Fe'], "Fe_t" => $row['Fet'],
            "De" => $row['De'], "Dm" => $row['Dm'], "Delta" => $row['Delta'],
            "Ro_min" => $row['Romin'], "Fmin" => $row['Fmin'], "Lop_lop1" => $row['LopLop1'], "c" => $row['c'], "k" => $row['k'],
            "Dmin" => $row['Dmin'], "R" => $row['R'], "TgBx" => $row['Tgbx'], "F2" => $row['F2']
        ];
    }
    echo json_encode($array);
}
else{
    print_r('Error in PHP code');
}

?>