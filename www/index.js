var game;

$(window).resize(function () {  game.Width = window.innerWidth;
                                game.Height = window.innerHeight;
                                resize(game.Width,game.Height);
                                });

function resize(width,height) {
    $("#gameArea").width = width;
    $("#gameArea").height = height;
    
    //$("#gameArea").prop({
    //    width: width,
    //    height: height
    //});

    $("#gameCanvas")[0].width = width;
    $("#gameCanvas")[0].height = height;
}

$(document).ready(function () {
    game = {
        Width: window.innerWidth,
        Height : window.innerHeight,
        Context : $("#gameCanvas")[0].getContext("2d")
    }

    var FPS = 30;
    resize(game.Width,game.Height);

    setInterval(function () {
        update();
        draw(game.Context,game.Width,game.Height);
    }, 1000 / FPS);
});





function update() {
    text.update();
}

function draw(context,width,height) {
    context.clearRect(0, 0, width, height);

    background.draw(context,width,height);
    text.draw(context);
    square.draw(context);
    
}

var background = {
    draw: function (context,width,height) {
        context.fillStyle = "#000";
        context.fillRect(5, 5, width - 10, height - 10);
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

