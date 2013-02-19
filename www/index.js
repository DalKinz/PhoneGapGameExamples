var game;

function loadImages(game, callback) {
    var assetDir = 'resources/images/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in game.Sources) {
        numImages++;
    }
    for (var src in game.Sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = assetDir + game.Sources[src];
    }
}


$(document).ready(function () {
    game = {
        fps: 30,
        Width: window.innerWidth,
        Height : window.innerHeight,
        Context : $("#gameCanvas")[0].getContext("2d"),
        Sources : {
            beach: 'beach.png',
            snake: 'snake.png',
            snake_glow: 'snake-glow.png',
            snake_black: 'snake-black.png',
            lion: 'lion.png',
            lion_glow: 'lion-glow.png',
            lion_black: 'lion-black.png',
            monkey: 'monkey.png',
            monkey_glow: 'monkey-glow.png',
            monkey_black: 'monkey-black.png',
            giraffe: 'giraffe.png',
            giraffe_glow: 'giraffe-glow.png',
            giraffe_black: 'giraffe-black.png',
        },
        Images : null
    };


    resize(game.Width,game.Height);

    loadImages(game, function (images) {
        game.Images = images;
        setInterval(function () {
            update();
            draw(game.Context, game.Width, game.Height);
        }, 1000 / game.fps);
    })
});

$(window).resize(function () {
    game.Width = window.innerWidth;
    game.Height = window.innerHeight;
    resize(game.Width, game.Height);
});

function resize(width, height) {
    $("#gameArea").width = width;
    $("#gameArea").height = height;

    //$("#gameArea").prop({
    //    width: width,
    //    height: height
    //});

    $("#gameCanvas")[0].width = width;
    $("#gameCanvas")[0].height = height;
}



function update() {
    text.update();
}

function draw(context,width,height) {
    //context.clearRect(0, 0, width, height);
    
    background.draw(game.Images.beach,context, width, height);
    text.draw(context);
    square.draw(context);
    
}

var background = {
    draw: function (image,context,width,height) {
        //context.fillStyle = "#000";
        //context.fillRect(5, 5, width - 10, height - 10);
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

