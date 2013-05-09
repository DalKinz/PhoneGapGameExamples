var game = {
    Width: window.innerWidth,
    Height: window.innerHeight,
    Context: null,
    Stage: null,
    Queue: new createjs.LoadQueue(false),
    FinishedLoading: false,
    Update: false
}

$(window).resize(function () {
    resize(window.innerWidth, window.innerHeight);
});

$(document).ready(function () {
    $("body").css("background-image", "url(resources/images/backgrounds/country.svg)");
    $("body").css("background-repeat", "no-repeat");
    $("body").css("background-size", "cover");

    game.Context = $("#gameCanvas")[0].getContext("2d");
    game.Stage = new createjs.Stage($("#gameCanvas")[0]);

    createjs.Touch.enable(game.Stage);

    game.Stage.enableMouseOver(20);
    game.Stage.mouseMoveOutside = true;
    game.Stage.autoClear = true;

    game.Queue.loadManifest(resourceManager.manifest);
    game.Queue.addEventListener("complete", prepareStage);
});

function resize(width, height) {
    game.Width = width;
    game.Height = height;

    $("#gameArea").width = width;
    $("#gameArea").height = height;

    $("#gameArea").prop({
        width: width,
        height: height
    });

    $("#gameCanvas")[0].width = width;
    $("#gameCanvas")[0].height = height;

    if (game.FinishedLoading == true) {
        resourceManager.snake.resize();
        resourceManager.alligator.resize();
        resourceManager.ant.resize();
        resourceManager.bat.resize();
    }

    game.Update = true;
}

function prepareStage() {
    resize(window.innerWidth, window.innerHeight);
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
        drawStatus();
        game.Stage.update();
        game.Update = false;
    }
}

function update() {
    
}

function drawStatus() {
    var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
    text.x = 100;
    text.y = 100;
    text.textBaseline = "alphabetic";
    game.Stage.addChild(text);
}

