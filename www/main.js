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
    createjs.Touch.enable(game.Stage);
    createjs.Touch.enable(game.Stage);
    game.Stage.enableMouseOver(10);
    game.Stage.mouseMoveOutside = true;

    game.Manifest = [{ id: "beach", src: "resources/images/beach.png" },
                    { id: "alligator", src: "resources/images/animals/alligator.png" },
                    { id: "ant", src: "resources/images/animals/ant.png" },
                    { id: "bat", src: "resources/images/animals/bat.png" },
                    { id: "bear", src: "resources/images/animals/bear.png" },
                    { id: "bee", src: "resources/images/animals/bee.png" },
                    { id: "bird", src: "resources/images/animals/bird.png" },
                    { id: "bull", src: "resources/images/animals/bull.png" },
                    { id: "bulldog", src: "resources/images/animals/bulldog.png" },
                    { id: "butterfly", src: "resources/images/animals/butterfly.png" },
                    { id: "cat", src: "resources/images/animals/cat.png" },
                    { id: "chicken", src: "resources/images/animals/chicken.png" },
                    { id: "cow", src: "resources/images/animals/cow.png" },
                    { id: "crab", src: "resources/images/animals/crab.png" },
                    { id: "crocodile", src: "resources/images/animals/crocodile.png" },
                    { id: "deer", src: "resources/images/animals/deer.png" },
                    { id: "dog", src: "resources/images/animals/dog.png" },
                    { id: "donkey", src: "resources/images/animals/donkey.png" },
                    { id: "duck", src: "resources/images/animals/duck.png" },
                    { id: "eagle", src: "resources/images/animals/eagle.png" },
                    { id: "elephant", src: "resources/images/animals/elephant.png" },
                    { id: "fish", src: "resources/images/animals/fish.png" },
                    { id: "fox", src: "resources/images/animals/fox.png" },
                    { id: "frog", src: "resources/images/animals/frog.png" },
                    { id: "giraffe", src: "resources/images/animals/giraffe.png" },
                    { id: "gorilla", src: "resources/images/animals/gorilla.png" },
                    { id: "hippo", src: "resources/images/animals/hippo.png" },
                    { id: "horse", src: "resources/images/animals/horse.png" },
                    { id: "insect", src: "resources/images/animals/insect.png" },
                    { id: "lion", src: "resources/images/animals/lion.png" },
                    { id: "monkey", src: "resources/images/animals/monkey.png" },
                    { id: "moose", src: "resources/images/animals/moose.png" },
                    { id: "mouse", src: "resources/images/animals/mouse.png" },
                    { id: "owl", src: "resources/images/animals/owl.png" },
                    { id: "panda", src: "resources/images/animals/panda.png" },
                    { id: "penguin", src: "resources/images/animals/penguin.png" },
                    { id: "pig", src: "resources/images/animals/pig.png" },
                    { id: "rabbit", src: "resources/images/animals/rabbit.png" },
                    { id: "rhino", src: "resources/images/animals/rhino.png" },
                    { id: "rooster", src: "resources/images/animals/rooster.png" },
                    { id: "shark", src: "resources/images/animals/shark.png" },
                    { id: "sheep", src: "resources/images/animals/sheep.png" },
                    { id: "snake", src: "resources/images/animals/snake.png" },
                    { id: "tiger", src: "resources/images/animals/tiger.png" },
                    { id: "turkey", src: "resources/images/animals/turkey.png" },
                    { id: "turtle", src: "resources/images/animals/turtle.png" },
                    { id: "wolf", src: "resources/images/animals/wolf.png" }
                    //{ id: "snake", src: "resources/images/snake.png" },
                    //{ id: "snake_glow", src: "resources/images/snake-glow.png" },
                    //{ id: "snake_black", src: "resources/images/snake-black.png" },
                    //{ id: "lion", src: "resources/images/lion.png" },
                    //{ id: "lion_glow", src: "resources/images/lion-glow.png" },
                    //{ id: "lion_black", src: "resources/images/lion-black.png" },
                    //{ id: "monkey", src: "resources/images/monkey.png" },
                    //{ id: "monkey_glow", src: "resources/images/monkey-glow.png" },
                    //{ id: "monkey_black", src: "resources/images/monkey-black.png" },
                    //{ id: "giraffe", src: "resources/images/giraffe.png" },
                    //{ id: "giraffe_glow", src: "resources/images/giraffe-glow.png" },
                    //{ id: "giraffe_black", src: "resources/images/giraffe-black.png" }
        ];

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
    game.Stage.update();
}

