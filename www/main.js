var game = {
    InitialWidth: 578,
    InitialHeight: 530,
    Width: window.innerWidth,
    Height: window.innerHeight,
    ScaleFactorX: null,
    ScaleFactorY: null,
    Context: null,
    Stage: null,
    Manifest: null,
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
    game.Manifest = [{ id: "beach", src: "resources/images/beach.png" },
                    { id: "snake", src: "resources/images/snake.png" },
                    { id: "snake_glow", src: "resources/images/snake-glow.png" },
                    { id: "snake_black", src: "resources/images/snake-black.png" },
                    { id: "lion", src: "resources/images/lion.png" },
                    { id: "lion_glow", src: "resources/images/lion-glow.png" },
                    { id: "lion_black", src: "resources/images/lion-black.png" },
                    { id: "monkey", src: "resources/images/monkey.png" },
                    { id: "monkey_glow", src: "resources/images/monkey-glow.png" },
                    { id: "monkey_black", src: "resources/images/monkey-black.png" },
                    { id: "giraffe", src: "resources/images/giraffe.png" },
                    { id: "giraffe_glow", src: "resources/images/giraffe-glow.png" },
                    { id: "giraffe_black", src: "resources/images/giraffe-black.png" }];

    game.Queue.addEventListener("complete", prepareStage);
    game.Queue.loadManifest(game.Manifest);
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

    background.bmp = new createjs.Bitmap(game.Queue.getResult("beach"));
    snake.bmp = new createjs.Bitmap(game.Queue.getResult("snake"));

    background.draw();
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
    background.draw();
    snake.draw();
    game.Stage.update();
}

var background = {
    bmp: null,
    draw: function () {
        this.bmp.scaleX = game.ScaleFactorX;
        this.bmp.scaleY = game.ScaleFactorY;
        game.Stage.addChild(this.bmp);
    }
}

var snake = {
    bmp: null,
    x: 100,
    y: 100,
    draw: function () {
        this.bmp.scaleX = game.ScaleFactorX;
        this.bmp.scaleY = game.ScaleFactorY;
        game.Stage.addChild(this.bmp);
    }
}

