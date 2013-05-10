var resourceManager = {
    snake: null,
    alligator: null,
    ant: null,
    bat: null,
    manifest: [{ id: "alligator", src: "resources/images/animals/alligator.png" },
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
                { id: "wolf", src: "resources/images/animals/wolf.png" },
                { id: "sound-1", src: "resources/sounds/sound-1.mp3|resources/sounds/sound-1.ogg" }],

    loadResources: function (game) {
        this.snake = new Animal("snake",10,10);
        this.alligator = new Animal("alligator", 200, 10);
        this.ant = new Animal("ant", 200, 100);
        this.bat = new Animal("bat",200,200);
        
        game.FinishedLoading = true;
    },

    createDraggableBitmap: function (imageName) {
        var result = game.Queue.getResult(imageName)
        var bmp = new createjs.Bitmap(result);
        bmp.name = "bmp_" + imageName;
        bmp.onPress = function (evt) {
            // bump the target in front of it's siblings:
            // game.Stage.addChild(bmp);
            createjs.Sound.play("sound-1", createjs.Sound.INTERRUPT_ANY);
            game.MessageText.text = "playing sound";
            game.Update = true;
            var offset = { x: bmp.x - evt.stageX, y: bmp.y - evt.stageY };

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function (ev) {
                bmp.x = ev.stageX + offset.x;
                bmp.y = ev.stageY + offset.y;
                // indicate that the stage should be updated on the next tick:
                game.Update = true;
            }
        }

        return bmp;
    }
}

var Animal = function (typename, x, y) {
    this.bmp = resourceManager.createDraggableBitmap(typename);
    this.bmp.x = x;
    this.bmp.y = y;
    game.Stage.addChild(this.bmp);
};

Animal.prototype.scaleFactorX = .5;
Animal.prototype.scaleFactorY = .5;
Animal.prototype.resize = function () {
    this.bmp.scaleX = this.scaleFactorX;
    this.bmp.scaleY = this.scaleFactorY;
}