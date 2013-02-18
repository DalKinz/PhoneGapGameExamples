$(window).resize(function () {resize();});

function resize() {
    //$("#gameArea").style.width = $(window).innerWidth;
    //$("#gameArea").style.height = $(window).innerHeight;
    var gameArea = document.getElementById("gameArea");
    gameArea.style.width = window.innerWidth;
    gameArea.style.height = window.innerHeight;

    //$("#gameArea").prop({
    //    width: $(window).innerWidth,
    //    height: $(window).innerHeight
    //});

    //var gameCanvas = document.getElementById("gameCanvas");
    //gameCanvas.width = window.innerWidth;
    //gameCanvas.height = window.innerHeight;
    $('#gameCanvas')[0].prop({
        width: $(window).innerWidth,
        height: $(window).innerHeight
    });
    //$("#gameCanvas")[0].width = $(window).innerWidth;
    //$("#gameCanvas")[0].height = $(window).innerHeight;
}

$(document).ready(function () {
    var FPS = 30;
    setInterval(function () {
        update();
        draw();
    }, 1000 / FPS);
});




var textX = 50;
var textY = 50;

function update() {
    textX += 1;
    textY += 1;
}

function draw() {
    //var context = document.getElementById("gameCanvas").getContext("2d");
    var canvas = document.getElementById("gameCanvas").hei
    var context = $("#gameCanvas")[0].getContext("2d");
    context.clearRect(0, 0, $(window).innerWidth, $(window).innerHeight);
    context.fillStyle = "#000";
    context.fillRect(0, 0, $(window).innerWidth, $(window).innerHeight);
    context.fillStyle = 'red';
    context.fillRect(30, 30, 50, 50);
    context.fillText("Sup Bro!", textX, textY);
}