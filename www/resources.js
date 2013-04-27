var resourceManager = {
    queue: new createjs.LoadQueue(true),
    manifest: [{ id: "background", src: "resources/images/background.png" },
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
                { id: "wolf", src: "resources/images/animals/wolf.png" }],

    loadResources: function (game) {
        this.background.bmp = new createjs.Bitmap(game.Queue.getResult("background"));
        game.Stage.addChild(this.background.bmp);

        this.snake.bmp = resourceManager.createDraggableBitmap("snake");
        this.snake.bmp.x = Math.round(game.ScaleFactorX * 10);
        this.snake.bmp.y = Math.round(game.ScaleFactorY * 10);
        game.Stage.addChild(this.snake.bmp);

        this.alligator.bmp = resourceManager.createDraggableBitmap("alligator");
        this.alligator.bmp.x = Math.round(game.ScaleFactorX * 200);
        this.alligator.bmp.y = Math.round(game.ScaleFactorY * 10);
        game.Stage.addChild(this.alligator.bmp);

        this.ant.bmp = resourceManager.createDraggableBitmap("ant");
        this.ant.bmp.x = Math.round(game.ScaleFactorX * 10);
        this.ant.bmp.y = Math.round(game.ScaleFactorY * 100);
        game.Stage.addChild(this.ant.bmp);

        this.bat.bmp = resourceManager.createDraggableBitmap("bat");
        this.bat.bmp.x = Math.round(game.ScaleFactorX * 200);
        this.bat.bmp.y = Math.round(game.ScaleFactorY * 100);
        game.Stage.addChild(this.bat.bmp);
    },

    createDraggableBitmap : function(imageName){
        var bmp = new createjs.Bitmap(game.Queue.getResult(imageName));
        bmp.name = "bmp_" + imageName;
        bmp.onPress = function (evt) {// bump the target in front of it's siblings:
            game.Stage.addChild(bmp);
            var offset = { x: bmp.x - evt.stageX, y: bmp.y - evt.stageY };

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function (ev) {
                bmp.x = ev.stageX + offset.x;
                bmp.y = ev.stageY + offset.y;
                // indicate that the stage should be updated on the next tick:
                //update = true;
            }
        }

        bmp.onMouseOver = function () {
            bmp.scaleX = bmp.scaleY = bmp.scale * 1.2;
        }
        bmp.onMouseOut = function () {
            bmp.scaleX = bmp.scaleY = bmp.scale;
        }

        return bmp;
    },

    background : {
                    bmp: null,
                    draw: function () {
                        this.bmp.scaleX = game.ScaleFactorX;
                        this.bmp.scaleY = game.ScaleFactorY;
                        //game.Stage.addChild(this.bmp);
                    }
    },

    snake : {
        bmp: null,
        scaleFactorX: .5,
        scaleFactorY: .5,
        draw: function () {
            this.bmp.x = game.ScaleFactorX * this.bmp.x;
            this.bmp.y = game.ScaleFactorY * this.bmp.y;
            this.bmp.scaleX = this.scaleFactorX * game.ScaleFactorX;
            this.bmp.scaleY = this.scaleFactorY * game.ScaleFactorY;
            //game.Stage.addChild(this.bmp);
        }
    },

    alligator : {
        bmp: null,
        scaleFactorX: .5,
        scaleFactorY: .5,
        draw: function () {
            //this.bmp.x = game.ScaleFactorX * 10;
            //this.bmp.y = game.ScaleFactorY * 10;
            this.bmp.scaleX = this.scaleFactorX * game.ScaleFactorX;
            this.bmp.scaleY = this.scaleFactorY * game.ScaleFactorY;
            //game.Stage.addChild(this.bmp);
        }
    },

    ant : {
        bmp: null,
        scaleFactorX: .5,
        scaleFactorY: .5,
        draw: function () {
            //this.bmp.x = game.ScaleFactorX * 10;
            //this.bmp.y = game.ScaleFactorY * 10;
            this.bmp.scaleX = this.scaleFactorX * game.ScaleFactorX;
            this.bmp.scaleY = this.scaleFactorY * game.ScaleFactorY;
            //game.Stage.addChild(this.bmp);
        }
    },

    bat : {
        bmp: null,
        scaleFactorX: .5,
        scaleFactorY: .5,
        draw: function () {
            //this.bmp.x = game.ScaleFactorX * 10;
            //this.bmp.y = game.ScaleFactorY * 10;
            this.bmp.scaleX = this.scaleFactorX * game.ScaleFactorX;
            this.bmp.scaleY = this.scaleFactorY * game.ScaleFactorY;
            //game.Stage.addChild(this.bmp);
        }
    }
}