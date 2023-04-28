$(document).ready(function () {

    let alredyExisFavs = localStorage.getItem("favoritesStored");
    if (alredyExisFavs) {
        alredyExisFavs = JSON.parse(alredyExisFavs);
    } else {
        alredyExisFavs = [];
    }

    for (let i = 0; i < alredyExisFavs.length; i++) {
        $('ul').append('<li class="liElement">' + alredyExisFavs[i] + '</li>');
    }



    $("#favouriteButton").click(function () {


        let inputvalueentered = $("#inputEquity").val();

        let alredyExisFavs = localStorage.getItem("favoritesStored");
        if (alredyExisFavs) {
            alredyExisFavs = JSON.parse(alredyExisFavs);
        } else {
            alredyExisFavs = [];
        }


        alredyExisFavs.push(inputvalueentered);

        localStorage.setItem("favoritesStored", JSON.stringify(alredyExisFavs));


        $('ul').append('<li class="liElement">' + inputvalueentered + '</li>');
        $("#inputEquity").val('');

    });







});