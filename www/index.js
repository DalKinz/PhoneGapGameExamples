var game = {
    InitialWidth: 578,
    InitialHeight: 530,
    Width: window.innerWidth,
    Height: window.innerHeight,
    ScaleFactorX: null,
    ScaleFactorY: null,
    Context: null,
    Stage: null,
    ImagesFolder: 'resources/images/',
    Manifest: null,
    Queue: new createjs.LoadQueue(true),
    ShouldDraw: true
}

$(window).resize(function () {
    game.Width = window.innerWidth;
    game.Height = window.innerHeight;
    game.ScaleFactorX = game.Width / game.InitialWidth;
    game.ScaleFactorY = game.Height / game.InitialHeight;
    resize(game.Width, game.Height);
});

$(document).ready(function () {
    game.Context = $("#gameCanvas")[0].getContext("2d");
    game.Stage = new createjs.Stage($("#gameCanvas")[0]);
    //game.Stage.autoClear = false;
    game.Manifest = [{ id: "beach", src: game.ImagesFolder + "beach.png" },
                    { id: "snake", src: game.ImagesFolder + "snake.png" },
                    { id: "snake_glow", src: game.ImagesFolder + "snake-glow.png" },
                    { id: "snake_black", src: game.ImagesFolder + "snake-black.png" },
                    { id: "lion", src: game.ImagesFolder + "lion.png" },
                    { id: "lion_glow", src: game.ImagesFolder + "lion-glow.png" },
                    { id: "lion_black", src: game.ImagesFolder + "lion-black.png" },
                    { id: "monkey", src: game.ImagesFolder + "monkey.png" },
                    { id: "monkey_glow", src: game.ImagesFolder + "monkey-glow.png" },
                    { id: "monkey_black", src: game.ImagesFolder + "monkey-black.png" },
                    { id: "giraffe", src: game.ImagesFolder + "giraffe.png" },
                    { id: "giraffe_glow", src: game.ImagesFolder + "giraffe-glow.png" },
                    { id: "giraffe_black", src: game.ImagesFolder + "giraffe-black.png" }];

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

    game.shouldDraw = true;
}

function prepareStage() {
    resize(game.Width, game.Height);

    background.bmp = new createjs.Bitmap(game.Queue.getResult("beach"));
    background.draw();

    startGame();
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    //update();
   // if (game.ShouldDraw == true) {
        draw(game);
        game.ShouldDraw = false;
    //}
}

function update() {
    text.update();
}

function draw(game) {
    background.draw();
    //text.draw(game.Context);
    //square.draw(game.Context);
}

var background = {
    bmp: null,
    draw: function () {
        this.bmp.scaleX = game.ScaleFactorX;
        this.bmp.scaleY = game.ScaleFactorY;
        game.Stage.addChild(this.bmp);
        game.Stage.update();
    }
}

