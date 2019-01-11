var ctx = setupCanvas(document.querySelector("canvas"));
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect($(window).width() / 4, $(window).height() / 4, 2, 2);
ctx.lineWidth = 3;

var dano = {};
var rozrah = {};
var base = {};
var koef =250;
var db_got =[];
/*, */
function SetDataToDatabase(name){
    fetch("saveItem.php",{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)})
        .then(function(result){
            db_got[name] = data;
            console.log(result);
        });

    
};

function ServeBlocksFromDatabase(){
    fetch("getBase_new.php")
        .then(function(res){
            return res.json();
        })
        .then(function(res){
            db_got = res;
            var fullTemplate = '';
            for(var obj in res){
                fullTemplate += CompleteBlock(obj, res[obj]);
            }
            document.getElementById('base_list').innerHTML = fullTemplate;

            $(".card").click(function(){
                alert(this.dataset.name);
            });
        });

    function CompleteBlock(name, data){
        var template = "<div class='card text-white bg-primary mb-3' data-name='"+ name +"' style='max-width: 20rem;'>" +
            "            <div class='card-header'>" + name + "</div>" +
            "            <div class='card-body'>" +
            "                <p class='card-text'>Vh = "+ data.Vh +"</p>" +
            "                <p class='card-text'>H = "+ data.H +"</p>" +
            "                <p class='card-text'>Dv = "+ data.Dv +"</p>" +
            "            </div>" +
            "        </div>"
        return template;


function Calculate() {
    dano.V_e = 2;
    dano.Roh = 1.24 * Math.pow(1 - (dano.H / 44300), 4.256);
    dano.Ro = dano.Roh * (1 + 0.5 * Math.pow(dano.Vh / 310, 2) * (1 - Math.pow(dano.V_e, 2)));
    dano.k2 = 1.2;
    dano.k4 = 0.8;
    rozrah.L = dano.Lop + dano.Lukl - dano.DeltaL;
    rozrah.Fe = dano.Gv / (dano.V_e * dano.Vh * dano.Ro);
    rozrah.Fe_t = rozrah.Fe + Math.PI * Math.pow(Yop1(rozrah.L),2);
    rozrah.De = Math.sqrt((4 * rozrah.Fe_t) / Math.PI);
    rozrah.Dm = dano.k2 * rozrah.De;
    rozrah.Delta = (rozrah.Dm - rozrah.De) / 2;
    rozrah.Ro_min = Math.pow(rozrah.Delta, 2) / rozrah.L;
    rozrah.Fmin = dano.k4 * rozrah.Fe;
    rozrah.Lop_Lop1 = dano.Lop / Math.sqrt(1 - Math.pow(dano.dv - dano.Dv, 2));
    rozrah.c = (
                Math.PI * Math.pow(dano.Dv, 2) *
                    (
                        Math.pow(2 * dano.DeltaL + rozrah.De, 2) - 4 * Math.pow(rozrah.Lop_Lop1, 2)
                    )
                    - 16 * Math.pow(rozrah.Lop_Lop1, 2) * rozrah.Fmin
                )
                / Math.PI *
                    (
                        4 * Math.pow(rozrah.Lop_Lop1, 2) + Math.pow(dano.Dv, 2)
                    );
    rozrah.k = -1 * ((Math.pow(dano.Dv, 2) * (2 * dano.DeltaL + rozrah.De)) / (4 * (Math.pow(rozrah.Lop_Lop1, 2)) + Math.pow(dano.Dv, 2)));
    rozrah.Dmin = -1 * rozrah.k + Math.sqrt(Math.pow(rozrah.k, 2) - rozrah.c);
    rozrah.R = (rozrah.De - rozrah.Dmin) / 8;
    rozrah.TgBx = (Math.pow(dano.Ddv, 2) - Math.pow(dano.dv, 2)) / (2 * dano.Ddv * dano.Lop);
    rozrah.F2 = (Math.PI / 4) * (Math.pow(dano.Ddv, 2) - 4 * Math.pow(Yop2(0), 2));
    console.log(base);

    $(".canvas_hover").addClass("canvas_hover_active");
    $(".shader").addClass("shader_active");
   // AddItemToFolder();
   /* Yv();
    Yv2();
    Yop();
    Yvnesh();
    Yvi1();
    Yop2_draw();
    Radius();
    DrawDesc();*/
};

function Calculate2(j) {
    var dano = base[j].dano;
    var rozrah = base[j].rozrah;
    dano.V_e = 2;
    dano.Roh = 1.24 * Math.pow(1 - (dano.H / 44300), 4.256);
    dano.Ro = dano.Roh * (1 + 0.5 * Math.pow(dano.Vh / 310, 2) * (1 - Math.pow(dano.V_e, 2)));
    dano.k2 = 1.2;
    dano.k4 = 0.8;
    /////////////////////////////////////////////////
    rozrah.L = dano.Lop + dano.Lukl - dano.DeltaL;
    rozrah.Fe = dano.Gv / (dano.V_e * dano.Vh * dano.Ro);
    rozrah.Fe_t = rozrah.Fe + Math.PI * Math.pow(Yop1(rozrah.L),2);
    rozrah.De = Math.sqrt((4 * rozrah.Fe_t) / Math.PI);
    rozrah.Dm = dano.k2 * rozrah.De;
    rozrah.Delta = (rozrah.Dm - rozrah.De) / 2;
    rozrah.Ro_min = Math.pow(rozrah.Delta, 2) / rozrah.L;
    rozrah.Fmin = dano.k4 * rozrah.Fe;
    rozrah.Lop_Lop1 = dano.Lop / Math.sqrt(1 - Math.pow(dano.dv - dano.Dv, 2));
    rozrah.c = (
            Math.PI * Math.pow(dano.Dv, 2) *
            (
                Math.pow(2 * dano.DeltaL + rozrah.De, 2) - 4 * Math.pow(rozrah.Lop_Lop1, 2)
            )
            - 16 * Math.pow(rozrah.Lop_Lop1, 2) * rozrah.Fmin
        )
        / Math.PI *
        (
            4 * Math.pow(rozrah.Lop_Lop1, 2) + Math.pow(dano.Dv, 2)
        );
    rozrah.k = -1 * ((Math.pow(dano.Dv, 2) * (2 * dano.DeltaL + rozrah.De)) / (4 * (Math.pow(rozrah.Lop_Lop1, 2)) + Math.pow(dano.Dv, 2)));
    rozrah.Dmin = -1 * rozrah.k + Math.sqrt(Math.pow(rozrah.k, 2) - rozrah.c);
    rozrah.R = (rozrah.De - rozrah.Dmin) / 8;
    rozrah.TgBx = (Math.pow(dano.Ddv, 2) - Math.pow(dano.dv, 2)) / (2 * dano.Ddv * dano.Lop);
    rozrah.F2 = (Math.PI / 4) * (Math.pow(dano.Ddv, 2) - 4 * Math.pow(Yop2(0), 2));
    //   console.log(dano);
    //   console.log(rozrah);


    console.log(base);

    $(".canvas_hover").addClass("canvas_hover_active");
    $(".shader").addClass("shader_active");
    // AddItemToFolder();
    Yv();
    Yv2();
    Yop();
    Yvnesh();
    Yvi1();
    Yop2_draw();
    Radius();
    DrawDesc();
};

$(".red_cross").click(function(){
    $(".canvas_hover").removeClass("canvas_hover_active");
    $(".shader").removeClass("shader_active");
});
function CreateItem(){
    var item = document.createElement("div");
    $(item).addClass("folder_item");
    $(item).html(
        "<p>" + dano.name + "</p>"
    );
    item.addEventListener("click", function(){
        alert($(item).children().html());
        Calculate2($(item).children().html());
    });
    var list = $(".folder");
    $(".folder").append(item);
}
function GetBase(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getBase.php", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200){
            console.error("Получено get");
            console.log(xhr.responseText);
        }
    };
}
function SendToBase(){
    var dani = {};
    dani.dano = dano;
    dani.rozrah = rozrah;
   // alert(dano.name);
    base[dano.name] = dani;
    //   console.log(base);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "saveItem.php", true);
    xhr.send("json=" + JSON.stringify(dani));
 //   console.log("Отправлено");
 //   console.log("json=" + JSON.stringify(dani));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200){
            console.log("Получено");
            console.log(xhr.responseText);
        }
    };
}
function Refill(name){
    console.log("gat = " + name );
    for(var i in base[name].dano){
        dano[i] = base[name].dano[i];
        console.log("name = " + i);
        console.log("dano[i] = " + dano[i]);
        console.log("base[name].dano[i] = "+ base[name].dano[i]);
    }
    for(var j in base[name].rozrah){
        rozrah[j] = base[name].rozrah[j];
    }
}
function DrawDesc(){
    var desc = $(".canvas_desc");
    $("#canvas_name").html(dano.name);
    $(desc).html(
        "<li>" + "L = "+ rozrah.L.toFixed(3) +"</li>" +
        "<li>" + "De = "+ rozrah.De.toFixed(3) +"</li>" +
        "<li>" + "Dm = "+ rozrah.Dm.toFixed(3) +"</li>" +
        "<li>" + "Delta = "+ rozrah.Delta.toFixed(3) +"</li>" +
        "<li>" + "Dmin = "+ rozrah.Dmin.toFixed(3) +"</li>" +
        "<li>" + "R = "+ rozrah.R.toFixed(3) +"</li>"
    );
}

function Yv() {
    var high = dano.Lukl + dano.Lop + dano.Lv2 + dano.Lv;
    var low = dano.Lukl + dano.Lop + dano.Lv2;
    var prev = {};
    prev.x = high;
    prev.y1 = 0;
    prev.y2 = 0;
    for (var x = high; x >= low; x = x - 0.01) {
        var Yv1 = (dano.Dv / 2) * Math.sqrt(1 - (Math.pow(x - (rozrah.L + dano.DeltaL + dano.Lv2), 2) / (Math.pow(dano.Lv, 2))));
        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -1 * (dano.Dv / 2) * Math.sqrt(1 - (Math.pow(x - (rozrah.L + dano.DeltaL + dano.Lv2), 2) / (Math.pow(dano.Lv, 2))));
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv2 * koef);
        ctx.stroke();

        prev.x = x;
        prev.y1 = Yv1;
        prev.y2 = Yv2;

    }
    ;
}

function Yv2() {
    var high = dano.Lukl + dano.Lop + dano.Lv2 + 0.01;
    var low = dano.Lukl + dano.Lop;
    var y1 = dano.Dv / 2;
    var y2 = -dano.Dv / 2;
    ctx.beginPath();
    ctx.moveTo(center.width - high * koef - 1, center.height - y1 * koef);
    ctx.lineTo(center.width - low * koef, center.height - y1 * koef);
    ctx.moveTo(center.width - high * koef - 1, center.height - y2 * koef);
    ctx.lineTo(center.width - low * koef, center.height - y2 * koef);
    ctx.stroke();
}

function Yop() {
    var high = dano.Lukl + dano.Lop;
    var low = dano.Lukl;
    var prev = {};
    prev.x = high;
    prev.y1 = dano.Dv / 2;
    prev.y2 = -dano.Dv / 2;
    for (var x = high; x >= low; x = x - 0.01) {
        var Yv1 = 1 * (dano.Dv / 2) * Math.sqrt(1 - ((Math.pow(x - (rozrah.L + dano.DeltaL), 2)) / (Math.pow(dano.Lop + (dano.Lop / (Math.sqrt(1 - (Math.pow(dano.dv / dano.Dv, 2))))), 2))));
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -1 * (dano.Dv / 2) * Math.sqrt(1 - ((Math.pow(x - (rozrah.L + dano.DeltaL), 2)) / (Math.pow(dano.Lop + (dano.Lop / (Math.sqrt(1 - (Math.pow(dano.dv / dano.Dv, 2))))), 2))));
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv2 * koef);
        ctx.stroke();
        prev.x = x;
        prev.y1 = Yv1;
        prev.y2 = Yv2;
    }
    ;
}

function Yvnesh() {
    var high = rozrah.L;
    var low = 0;
    var prev = {};
    prev.x = high;
    prev.y1 = rozrah.De / 2 + rozrah.Delta * Math.sqrt(1 - (Math.pow(high, 2) / (Math.pow(rozrah.L, 2))));
    prev.y2 = -rozrah.De / 2 + rozrah.Delta * Math.sqrt(1 - (Math.pow(high, 2) / (Math.pow(rozrah.L, 2))));
    for (var x = high; x >= low; x = x - 0.01) {
        var Yv1 = (rozrah.De / 2 + rozrah.Delta * Math.sqrt(1 - (Math.pow(x, 2)) / (Math.pow(rozrah.L, 2))));
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -(rozrah.De / 2 + rozrah.Delta * Math.sqrt(1 - (Math.pow(x, 2) / (Math.pow(rozrah.L, 2)))));
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv2 * koef);
        ctx.stroke();
        prev.x = x;
        prev.y1 = Yv1;
        prev.y2 = Yv2;
    }
    ;
}

function Yop1(x) {
    var n =  1 * (dano.Dv / 2) * Math.sqrt(1 - ((Math.pow(x - (rozrah.L + dano.DeltaL), 2)) / (Math.pow(dano.Lop + (dano.Lop / (Math.sqrt(1 - (Math.pow(dano.dv / dano.Dv, 2))))), 2))));
    return n;
}
function Yop2(x) {
    var n = (dano.Ddv / 2 + rozrah.TgBx * (x - dano.Lukl));
    return n;
}

function Yop2_draw(){
    var high = dano.Lukl;
    var low = 0;
    var prev = {};
    prev.x = high;
    prev.y1 = Yop2(high);
    prev.y2 = -Yop2(high);
    for (var x = high + 0.01; x >= low; x = x - 0.01) {
        var Yv1 = Yop2(x);
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -Yop2(x);
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv2 * koef);
        ctx.stroke();
        prev.x = x;
        prev.y1 = Yv1;
        prev.y2 = Yv2;
    }
    ;
}
function Radius(){
    var high = rozrah.L;
    var low = rozrah.L - rozrah.R;
    var prev = {};
    prev.x = high;
    prev.y1 = (rozrah.De/2) - Math.sqrt(Math.pow(rozrah.R,2) - Math.pow(high - rozrah.L + rozrah.R,2));
    prev.y2 = -prev.y1;
    console.log(prev.y1);
    for (var x = high + 0.01; x >= low; x = x - 0.001) {
        var Yv1 = (rozrah.De/2) - Math.sqrt(Math.pow(rozrah.R,2) - Math.pow(x - rozrah.L + rozrah.R,2));
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -Yv1;
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv2 * koef);
        ctx.stroke();
        prev.x = x;
        prev.y1 = Yv1;
        prev.y2 = Yv2;
    };
}

function Yvi1() {
    var high = rozrah.L - rozrah.R;
    var low = 0;
    var prev = {};
    prev.x = low;

    prev.y1_2 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(0), 2) + rozrah.F2 ));
    prev.y2_2 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(0), 2) + rozrah.F2 ));

    prev.y1_1 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(dano.Lukl-0.01), 2) + rozrah.F2 + ((rozrah.Fmin - rozrah.F2) / (rozrah.L - rozrah.R)) * (dano.Lukl-0.01) ));
    prev.y2_1 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(dano.Lukl-0.01), 2) + rozrah.F2 + ((rozrah.Fmin - rozrah.F2) / (rozrah.L - rozrah.R)) * (dano.Lukl-0.01) ));
    for (var x = low; x <= high; x = x + 0.01) {
        if (x > dano.Lukl) {
            var Yv1_1 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(x), 2) + rozrah.F2 + ((rozrah.Fmin - rozrah.F2) / (rozrah.L - rozrah.R)) * x ));
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1_1 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv1_1 * koef);

            ctx.stroke();
            var Yv2_1 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(x), 2) + rozrah.F2 + ((rozrah.Fmin - rozrah.F2) / (rozrah.L - rozrah.R)) * x ));
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2_1 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv2_1 * koef);

            ctx.stroke();
            prev.y1_1 = Yv1_1;
            prev.y2_1 = Yv2_1;
        }
        else {
            var Yv1_2 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(x), 2) + rozrah.F2 + ((rozrah.Fmin - rozrah.F2) / (rozrah.L - rozrah.R)) * x )) ;
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1_2 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv1_2 * koef);

            ctx.stroke();
            var Yv2_2 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(x), 2) + rozrah.F2 + ((rozrah.Fmin - rozrah.F2) / (rozrah.L - rozrah.R)) * x ));
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2_2 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv2_2 * koef);

            ctx.stroke();
            prev.y1_2 = Yv1_2;
            prev.y2_2 = Yv2_2;
        }
        prev.x = x;
    }
}

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}
