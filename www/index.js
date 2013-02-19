var game;

$(document).ready(function () {
    game = {
        fps: 30,
        Width: window.innerWidth,
        Height : window.innerHeight,
        Context : $("#gameCanvas")[0].getContext("2d"),
        Images: null,
        ImagesFolder: 'resources/images/',
        Manifest: null,
        Queue : null,
    };

    game.Manifest =[{id:"beach",src : game.ImagesFolder + "beach.png"},
                    {id:"snake",src : game.ImagesFolder + "snake.png"},
                    {id:"snake_glow",src : game.ImagesFolder + "snake-glow.png"},
                    {id:"snake_black",src : game.ImagesFolder + "snake-black.png"},
                    {id:"lion",src : game.ImagesFolder + "lion.png"},
                    {id:"lion_glow",src : game.ImagesFolder + "lion-glow.png"},
                    {id:"lion_black",src : game.ImagesFolder + "lion-black.png"},
                    {id:"monkey",src : game.ImagesFolder + "monkey.png"},
                    {id:"monkey_glow",src : game.ImagesFolder + "monkey-glow.png"},
                    {id:"monkey_black",src : game.ImagesFolder + "monkey-black.png"},
                    {id:"giraffe",src : game.ImagesFolder + "giraffe.png"},
                    {id:"giraffe_glow",src : game.ImagesFolder + "giraffe-glow.png"},
                    {id: "giraffe_black", src: game.ImagesFolder + "giraffe-black.png" }]


    resize(game.Width,game.Height);

    game.Queue =  new createjs.LoadQueue(true);
    game.Queue.addEventListener("complete", function () {
                                                    setInterval(function () {
                                                        update();
                                                        draw(game, game.Width, game.Height);
                                                    }, 1000 / game.fps);});

    game.Queue.loadManifest(game.Manifest);
});

$(window).resize(function () {
    game.Width = window.innerWidth;
    game.Height = window.innerHeight;
    resize(game.Width, game.Height);
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
}

function update() {
    text.update();
}

function draw(game,width,height) {
    background.draw(game.Queue.getResult("beach"),game.Context, width, height);
    text.draw(game.Context);
    square.draw(game.Context);
    
}

var background = {
    draw: function (image,context,width,height) {
        context.drawImage(image, 0, 0,width,height);
    }
}

var text = {
    textX : 50,
    textY : 50,
    
    draw: function (context) {
        context.fillStyle = "green";
        context.fillText("Sup Bro!", this.textX, this.textY);
    },

    update: function () {
        this.textX += 1;
        this.textY += 1;
    }
}

var square = {
    draw: function (context) {
        context.fillStyle = 'red';
        context.fillRect(30, 30, 50, 50);
    }
}


