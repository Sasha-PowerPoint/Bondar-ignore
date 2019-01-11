var databased = {};

var filters_structured = {};

var filter_setting;


$(".filter-inputs").children("input").keyup(function(e){
    //console.log($(this).val());
    if(filter_setting != undefined){
        clearTimeout(filter_setting);
    }
    filter_setting = setTimeout(function(){
        FillP(e.target);
        ProposeAdding($(e.target).parents().children("ul"), e.target);
    }, 1000);

});

$(".propose_list").children().click(function(){

})


function FillP(target){
    $("p").html(
        "Бази: " + $("#filter-inputs-baza").val().split(" ") + "<p>" +
        "Типи: " + $("#filter-inputs-type").val().split(" ") + "<p>" +
        "Матеріал: " + $("#filter-inputs-material").val().split(" ") + "<p>" +
        "Пошук для: " + target.dataset.target + "<br>"
    );
    filters_structured["base"] = $("#filter-inputs-baza").val().split(" ");
    filters_structured["type"] = $("#filter-inputs-type").val().split(" ");
    filters_structured["material"] = $("#filter-inputs-material").val().split(" ");
    filters_structured["target"] = target.dataset.target;
    console.log(filters_structured);
}
function ProposeAdding(ul, input){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getFilters.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify(filters_structured));
    xhr.onreadystatechange = function(){
        if (xhr.status == 200 && xhr.readyState == 4) {
            //alert(xhr.responseText);
            databased = JSON.parse(xhr.responseText);
            console.log(databased);
            $(ul).empty();
            for(var filter in databased){
                var li = document.createElement("li");
                $(li).html(databased[filter]);
                $(ul).append(li);
            }
        }
    }
}