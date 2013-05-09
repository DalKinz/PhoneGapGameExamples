﻿var game = {
    InitialWidth: 800,
    InitialHeight: 1280,
    Width: window.innerWidth,
    Height: window.innerHeight,
    ScaleFactorX: null,
    ScaleFactorY: null,
    Context: null,
    Stage: null,
    Queue: new createjs.LoadQueue(false),
    FinishedLoading: false,
    Update: false
}

$(window).resize(function () {
    game.Width = window.innerWidth;
    game.Height = window.innerHeight;
    
    resize(game.Width, game.Height);
});

$(document).ready(function () {
    $("body").css("background-image", "url(resources/images/backgrounds/country.svg)");
    $("body").css("background-repeat", "no-repeat");
    $("body").css("background-size", "cover");

    game.Context = $("#gameCanvas")[0].getContext("2d");
    game.Stage = new createjs.Stage($("#gameCanvas")[0]);
    createjs.Touch.enable(game.Stage);
    game.Stage.enableMouseOver(10);
    game.Stage.mouseMoveOutside = true;
    game.Stage.autoClear = true;
    //game.Queue.setUseXHR(false);
    game.Queue.loadManifest(resourceManager.manifest);

    game.Queue.addEventListener("complete", prepareStage);
});

function resize(width, height) {
    $("#gameArea").width = width;
    $("#gameArea").height = height;

    $("#gameArea").prop({
        width: width,
        height: height
    });

    $("#gameCanvas")[0].width = width;
    $("#gameCanvas")[0].height = height;

    game.ScaleFactorX = game.Width / game.InitialWidth;
    game.ScaleFactorY = game.Height / game.InitialHeight;

    if (game.FinishedLoading == true) {
        resourceManager.snake.resize();
        resourceManager.alligator.resize();
        resourceManager.ant.resize();
        resourceManager.bat.resize();
    }

    game.Update = true;
}

function prepareStage() {
    resize(game.Width, game.Height);
    resourceManager.loadResources(game);

    startGame();
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    if (game.Update == true) {
        game.Stage.update();
        game.Update = false;
    }
}

function update() {
    text.update();
}

function drawStatus(game) {
    var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
    text.x = 100;
    text.textBaseline = "alphabetic";
    game.Stage.addChild(text);
}

