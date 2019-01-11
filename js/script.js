
var ctx = setupCanvas(document.getElementById("canvas"));
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
ctx.lineWidth = 3;
$('#canvas').css("height", "300px");
$('#canvas').css("width", "500px");
var center = {
    width: document.getElementById("canvas").width,
    height: document.getElementById("canvas").height/2
};

var data = {};
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

    }

}
function Calculate() {
    data.V_e = 2;
    data.Roh = 1.24 * Math.pow(1 - (data.H / 44300), 4.256);
    data.Ro = data.Roh * (1 + 0.5 * Math.pow(data.Vh / 310, 2) * (1 - Math.pow(data.V_e, 2)));
    data.k2 = 1.2;
    data.k4 = 0.8;
    data.L = data.Lop + data.Lukl - data.DeltaL;
    data.Fe = data.Gv / (data.V_e * data.Vh * data.Ro);
    data.Fe_t = data.Fe + Math.PI * Math.pow(Yop1(data.L),2);
    data.De = Math.sqrt((4 * data.Fe_t) / Math.PI);
    data.Dm = data.k2 * data.De;
    data.Delta = (data.Dm - data.De) / 2;
    data.Ro_min = Math.pow(data.Delta, 2) / data.L;
    data.Fmin = data.k4 * data.Fe;
    data.Lop_Lop1 = data.Lop / Math.sqrt(1 - Math.pow(data.dv - data.Dv, 2));
    data.c = (
                Math.PI * Math.pow(data.Dv, 2) *
                    (
                        Math.pow(2 * data.DeltaL + data.De, 2) - 4 * Math.pow(data.Lop_Lop1, 2)
                    )
                    - 16 * Math.pow(data.Lop_Lop1, 2) * data.Fmin
                )
                / Math.PI *
                    (
                        4 * Math.pow(data.Lop_Lop1, 2) + Math.pow(data.Dv, 2)
                    );
    data.k = -1 * ((Math.pow(data.Dv, 2) * (2 * data.DeltaL + data.De)) / (4 * (Math.pow(data.Lop_Lop1, 2)) + Math.pow(data.Dv, 2)));
    data.Dmin = -1 * data.k + Math.sqrt(Math.pow(data.k, 2) - data.c);
    data.R = (data.De - data.Dmin) / 8;
    data.TgBx = (Math.pow(data.Ddv, 2) - Math.pow(data.dv, 2)) / (2 * data.Ddv * data.Lop);
    data.F2 = (Math.PI / 4) * (Math.pow(data.Ddv, 2) - 4 * Math.pow(Yop2(0), 2));
    console.log(data);

    Yv();
    Yv2();
    Yop();
    Yvnesh();
    Yvi1();
    Yop2_draw();
    Radius();
    DrawDesc();
};


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
    dani.data = data;
    dani.data = data;
   // alert(data.name);
    base[data.name] = dani;
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
    for(var i in base[name].data){
        data[i] = base[name].data[i];
        console.log("name = " + i);
        console.log("data[i] = " + data[i]);
        console.log("base[name].data[i] = "+ base[name].data[i]);
    }
    for(var j in base[name].data){
        data[j] = base[name].data[j];
    }
}
function DrawDesc(){
    var desc = $(".canvas_desc");
    $("#canvas_name").html(data.name);
    $(desc).html(
        "<li>" + "L = "+ data.L.toFixed(3) +"</li>" +
        "<li>" + "De = "+ data.De.toFixed(3) +"</li>" +
        "<li>" + "Dm = "+ data.Dm.toFixed(3) +"</li>" +
        "<li>" + "Delta = "+ data.Delta.toFixed(3) +"</li>" +
        "<li>" + "Dmin = "+ data.Dmin.toFixed(3) +"</li>" +
        "<li>" + "R = "+ data.R.toFixed(3) +"</li>"
    );
}

function Yv() {
    var high = data.Lukl + data.Lop + data.Lv2 + data.Lv;
    var low = data.Lukl + data.Lop + data.Lv2;
    var prev = {};
    prev.x = high;
    prev.y1 = 0;
    prev.y2 = 0;
    for (var x = high; x >= low; x = x - 0.01) {
        var Yv1 = (data.Dv / 2) * Math.sqrt(1 - (Math.pow(x - (data.L + data.DeltaL + data.Lv2), 2) / (Math.pow(data.Lv, 2))));
        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -1 * (data.Dv / 2) * Math.sqrt(1 - (Math.pow(x - (data.L + data.DeltaL + data.Lv2), 2) / (Math.pow(data.Lv, 2))));
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
    var high = data.Lukl + data.Lop + data.Lv2 + 0.01;
    var low = data.Lukl + data.Lop;
    var y1 = data.Dv / 2;
    var y2 = -data.Dv / 2;
    ctx.beginPath();
    ctx.moveTo(center.width - high * koef - 1, center.height - y1 * koef);
    ctx.lineTo(center.width - low * koef, center.height - y1 * koef);
    ctx.moveTo(center.width - high * koef - 1, center.height - y2 * koef);
    ctx.lineTo(center.width - low * koef, center.height - y2 * koef);
    ctx.stroke();
}

function Yop() {
    var high = data.Lukl + data.Lop;
    var low = data.Lukl;
    var prev = {};
    prev.x = high;
    prev.y1 = data.Dv / 2;
    prev.y2 = -data.Dv / 2;
    for (var x = high; x >= low; x = x - 0.01) {
        var Yv1 = 1 * (data.Dv / 2) * Math.sqrt(1 - ((Math.pow(x - (data.L + data.DeltaL), 2)) / (Math.pow(data.Lop + (data.Lop / (Math.sqrt(1 - (Math.pow(data.dv / data.Dv, 2))))), 2))));
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -1 * (data.Dv / 2) * Math.sqrt(1 - ((Math.pow(x - (data.L + data.DeltaL), 2)) / (Math.pow(data.Lop + (data.Lop / (Math.sqrt(1 - (Math.pow(data.dv / data.Dv, 2))))), 2))));
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
    var high = data.L;
    var low = 0;
    var prev = {};
    prev.x = high;
    prev.y1 = data.De / 2 + data.Delta * Math.sqrt(1 - (Math.pow(high, 2) / (Math.pow(data.L, 2))));
    prev.y2 = -data.De / 2 + data.Delta * Math.sqrt(1 - (Math.pow(high, 2) / (Math.pow(data.L, 2))));
    for (var x = high; x >= low; x = x - 0.01) {
        var Yv1 = (data.De / 2 + data.Delta * Math.sqrt(1 - (Math.pow(x, 2)) / (Math.pow(data.L, 2))));
        ctx.beginPath();
        ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1 * koef);
        ctx.lineTo(center.width - x * koef, center.height - Yv1 * koef);
        ctx.stroke();
        var Yv2 = -(data.De / 2 + data.Delta * Math.sqrt(1 - (Math.pow(x, 2) / (Math.pow(data.L, 2)))));
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
    var n =  1 * (data.Dv / 2) * Math.sqrt(1 - ((Math.pow(x - (data.L + data.DeltaL), 2)) / (Math.pow(data.Lop + (data.Lop / (Math.sqrt(1 - (Math.pow(data.dv / data.Dv, 2))))), 2))));
    return n;
}
function Yop2(x) {
    var n = (data.Ddv / 2 + data.TgBx * (x - data.Lukl));
    return n;
}

function Yop2_draw(){
    var high = data.Lukl;
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
    var high = data.L;
    var low = data.L - data.R;
    var prev = {};
    prev.x = high;
    prev.y1 = (data.De/2) - Math.sqrt(Math.pow(data.R,2) - Math.pow(high - data.L + data.R,2));
    prev.y2 = -prev.y1;
    console.log(prev.y1);
    for (var x = high + 0.01; x >= low; x = x - 0.001) {
        var Yv1 = (data.De/2) - Math.sqrt(Math.pow(data.R,2) - Math.pow(x - data.L + data.R,2));
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
    var high = data.L - data.R;
    var low = 0;
    var prev = {};
    prev.x = low;

    prev.y1_2 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(0), 2) + data.F2 ));
    prev.y2_2 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(0), 2) + data.F2 ));

    prev.y1_1 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(data.Lukl-0.01), 2) + data.F2 + ((data.Fmin - data.F2) / (data.L - data.R)) * (data.Lukl-0.01) ));
    prev.y2_1 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(data.Lukl-0.01), 2) + data.F2 + ((data.Fmin - data.F2) / (data.L - data.R)) * (data.Lukl-0.01) ));
    for (var x = low; x <= high; x = x + 0.01) {
        if (x > data.Lukl) {
            var Yv1_1 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(x), 2) + data.F2 + ((data.Fmin - data.F2) / (data.L - data.R)) * x ));
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1_1 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv1_1 * koef);

            ctx.stroke();
            var Yv2_1 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop1(x), 2) + data.F2 + ((data.Fmin - data.F2) / (data.L - data.R)) * x ));
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y2_1 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv2_1 * koef);

            ctx.stroke();
            prev.y1_1 = Yv1_1;
            prev.y2_1 = Yv2_1;
        }
        else {
            var Yv1_2 = Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(x), 2) + data.F2 + ((data.Fmin - data.F2) / (data.L - data.R)) * x )) ;
            ctx.beginPath();
            ctx.moveTo(center.width - prev.x * koef, center.height - prev.y1_2 * koef);
            ctx.lineTo(center.width - x * koef, center.height - Yv1_2 * koef);

            ctx.stroke();
            var Yv2_2 = -Math.sqrt((1 / Math.PI) * (Math.PI * Math.pow(Yop2(x), 2) + data.F2 + ((data.Fmin - data.F2) / (data.L - data.R)) * x ));
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

// Event listeners

document.getElementById('base').addEventListener("click",function() {
    $(".calculate").fadeOut(100);
    $(".base").fadeIn(100);
    ServeBlocksFromDatabase();
});

document.getElementById('calculate').addEventListener("click",function() {
    $(".calculate").fadeIn(100);
    $(".base").fadeOut(100);
});

document.getElementById("count").addEventListener("click",function(){
    data.name = $("#name_of_engine").val();
    data.Vh = parseFloat($("#vh").val())/3;
    data.H = parseFloat($("#h").val());
    data.Dv = parseFloat($("#dv").val());
    data.dv = parseFloat($("#dv2").val());
    data.Lv = parseFloat($("#lv").val());
    data.Lv2 = parseFloat($("#lv2").val());
    data.Lop = parseFloat($("#lop").val());
    data.Ddv = parseFloat($("#ddv").val());
    data.Lukl = parseFloat($("#lukl").val());
    data.DeltaL = parseFloat($("#deltal").val());
    data.Gv = parseFloat($("#gv").val());
    Calculate();
    SetDataToDatabase(data.name);
});

$(".nav-link").click(function(){
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
})
function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = 500;
    canvas.height = 300;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}
