var game = {
    InitialWidth: 1280,
    InitialHeight: 800,
    Width: window.innerWidth,
    Height: window.innerHeight,
    ScaleFactorX: null,
    ScaleFactorY: null,
    Context: null,
    Stage: null,
    Queue: new createjs.LoadQueue(true),
    FinishedLoading: false
}

game.Context = $("#gameCanvas")[0].getContext("2d");
game.Stage = new createjs.Stage($("#gameCanvas")[0]);
game.Queue.loadManifest(resourceManager.manifest);

test('hello test', function () { ok(1 == '1', 'Should pass'); });

test('resourceManager-LoadResources', function() {
    resourceManager.loadResources(game);
    ok(resourceManager.snake.bmp.image != null);
});

test('queue-GetResult', function () {
    stop(); // Pause the test 
    //Add your wait
    setTimeout(function () {
        var result = game.Queue.getResult("resources/images/animals/snake.png");
        ok(result != null);

        var result = game.Queue.getResult("snake");
        ok(result != null);

        start();
    }, 10000);
});



