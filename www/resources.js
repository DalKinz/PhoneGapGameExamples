var resourceManager = {
    loadResources: function (game) {
        this.background.bmp = new createjs.Bitmap(game.Queue.getResult("beach"));

        this.snake.bmp = new createjs.Bitmap(game.Queue.getResult("snake"));
        this.snake.bmp.name = "bmp_snake";
        this.snake.bmp.onPress = function (evt) {// bump the target in front of it's siblings:
            game.Stage.addChild(resourceManager.snake.bmp);
            var offset = { x: resourceManager.snake.bmp.x - evt.stageX, y: resourceManager.snake.bmp.y - evt.stageY };

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function (ev) {
                resourceManager.snake.bmp.x = ev.stageX + offset.x;
                resourceManager.snake.bmp.y = ev.stageY + offset.y;
                // indicate that the stage should be updated on the next tick:
                //update = true;
            }
        }

        this.snake.bmp.onMouseOver = function () {
            resourceManager.snake.bmp.scaleX = resourceManager.snake.bmp.scaleY = resourceManager.snake.bmp.scale * 1.2;
            //update = true;
        }
        this.snake.bmp.onMouseOut = function () {
            resourceManager.snake.bmp.scaleX = resourceManager.snake.bmp.scaleY = resourceManager.snake.bmp.scale;
            //update = true;
        }
    },

    background : {
                    bmp: null,
                    draw: function () {
                        this.bmp.scaleX = game.ScaleFactorX;
                        this.bmp.scaleY = game.ScaleFactorY;
                        game.Stage.addChild(this.bmp);
                    }
    },

    snake : {
        bmp: null,
        x: 100,
        y: 100,
        draw: function () {
            this.bmp.scaleX = game.ScaleFactorX;
            this.bmp.scaleY = game.ScaleFactorY;
            game.Stage.addChild(this.bmp);
        }
    }


}