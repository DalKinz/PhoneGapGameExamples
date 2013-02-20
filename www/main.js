var game = {
    InitialWidth: 1280,
    InitialHeight: 800,
    Width: window.innerWidth,
    Height: window.innerHeight,
    ScaleFactorX: null,
    ScaleFactorY: null,
    Context: null,
    Stage: null,
    Queue: new createjs.LoadQueue(true)
}

$(window).resize(function () {
    game.Width = window.innerWidth;
    game.Height = window.innerHeight;
    
    resize(game.Width, game.Height);
});

$(document).ready(function () {
    game.Context = $("#gameCanvas")[0].getContext("2d");
    game.Stage = new createjs.Stage($("#gameCanvas")[0]);
    createjs.Touch.enable(game.Stage);
    createjs.Touch.enable(game.Stage);
    game.Stage.enableMouseOver(10);
    game.Stage.mouseMoveOutside = true;

    game.Queue.addEventListener("complete", prepareStage);
    game.Queue.loadManifest(resourceManager.manifest);
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
}

function prepareStage() {
    resize(game.Width, game.Height);
    resourceManager.loadResources(game);
    
    resourceManager.background.draw();
    game.Stage.update();

    startGame();
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    draw(game);
}

function update() {
    text.update();
}

function draw(game) {
    resourceManager.background.draw();
    resourceManager.snake.draw();
    resourceManager.alligator.draw();
    resourceManager.ant.draw();
    resourceManager.bat.draw();

    game.Stage.update();
}

