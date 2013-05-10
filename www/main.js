var game = {
    Width: window.innerWidth,
    Height: window.innerHeight,
    Context: null,
    Stage: null,
    Queue: new createjs.LoadQueue(false),
    FinishedLoading: false,
    Update: false,
    MessageText: null
}

$(window).resize(function () {
    resize(window.innerWidth, window.innerHeight);
});

$(document).ready(function () {
    $("#gameCanvas").css("background-image", "url(resources/images/backgrounds/house-with-snow.svg)");
    $("#gameCanvas").css("background-repeat", "no-repeat");
    $("#gameCanvas").css("background-size", "cover");

    game.Context = $("#gameCanvas")[0].getContext("2d");
    game.Stage = new createjs.Stage($("#gameCanvas")[0]);

    createjs.Touch.enable(game.Stage);

    game.Stage.enableMouseOver(40);
    game.Stage.mouseMoveOutside = true;
    game.Stage.autoClear = true;

    game.MessageText = new createjs.Text("Loading", "20px Arial", "#ff7700");
    game.MessageText.x = 5
    game.MessageText.y = game.Height - 20;
    game.MessageText.textBaseline = "alphabetic";
    game.Stage.addChild(game.MessageText);

    game.Queue.installPlugin(createjs.Sound);
    game.Queue.addEventListener("progress", updateLoading);
    game.Queue.addEventListener("complete", prepareStage);

    game.Queue.loadManifest(resourceManager.manifest);
});

function resize(width, height) {
    game.Width = width;
    game.Height = height;

    //$("#gameArea").width = width;
    //$("#gameArea").height = height;

    //$("#gameArea").prop({
    //    width: width,
    //    height: height
    //});

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
        game.Stage.update();
        game.Update = false;
    }
}

function updateLoading(event) {
    var progress = event ? event.progress + 0.5 | 0 : 0;
    game.MessageText.text = " " + progress + "%";
    game.Update = true;
}