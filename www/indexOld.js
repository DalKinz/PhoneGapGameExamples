﻿window.onload = function () {
    var sources = {
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
    };

    var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
    });
    var background = new Kinetic.Layer();

    loadImages(sources, initStage,stage,background);
};

function loadImages(sources, callback,stage,background) {
    var assetDir = 'resources/images/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images,stage,background);
            }
        };
        images[src].src = assetDir + sources[src];
    }
}

function initStage(images,stage,background) {
    var animalLayer = new Kinetic.Layer();
    var animalShapes = [];
    var score = 0;

    // image positions
    var animals = {
        snake: {
            x: 10,
            y: 70
        },
        giraffe: {
            x: 90,
            y: 70
        },
        monkey: {
            x: 275,
            y: 70
        },
        lion: {
            x: 400,
            y: 70
        },
    };

    var outlines = {
        snake_black: {
            x: 275,
            y: 350
        },
        giraffe_black: {
            x: 390,
            y: 250
        },
        monkey_black: {
            x: 300,
            y: 420
        },
        lion_black: {
            x: 100,
            y: 390
        },
    };

    // create draggable animals
    for (var key in animals) {
        // anonymous function to induce scope
        (function () {
            var privKey = key;
            var anim = animals[key];

            var animal = new Kinetic.Image({
                image: images[key],
                x: anim.x,
                y: anim.y,
                draggable: true
            });

            animal.createImageHitRegion();

            animal.on('dragstart', function () {
                animalLayer.draw();
            });
            /*
             * check if animal is in the right spot and
             * snap into place if it is
             */
            animal.on('dragend', function () {
                var outline = outlines[privKey + '_black'];
                if (!animal.inRightPlace && isNearOutline(animal, outline)) {
                    animal.setPosition(outline.x, outline.y);
                    animalLayer.draw();
                    animal.inRightPlace = true;

                    if (++score >= 4) {
                        var text = 'You win! Enjoy your booty!'
                        drawBackground(background, images.beach, text);
                    }

                    // disable drag and drop
                    setTimeout(function () {
                        animal.setDraggable(false);
                    }, 50);
                }
            });
            // make animal glow on mouseover
            animal.on('mouseover', function () {
                animal.setImage(images[privKey + '_glow']);
                animalLayer.draw();
                document.body.style.cursor = 'pointer';
            });
            // return animal on mouseout
            animal.on('mouseout', function () {
                animal.setImage(images[privKey]);
                animalLayer.draw();
                document.body.style.cursor = 'default';
            });

            animal.on('dragmove', function () {
                document.body.style.cursor = 'pointer';
            });

            animalLayer.add(animal);
            animalShapes.push(animal);
        })();
    }

    // create animal outlines
    for (var key in outlines) {
        // anonymous function to induce scope
        (function () {
            var imageObj = images[key];
            var out = outlines[key];

            var outline = new Kinetic.Image({
                image: imageObj,
                x: out.x,
                y: out.y
            });

            animalLayer.add(outline);
        })();
    }

    stage.add(background);
    stage.add(animalLayer);

    drawBackground(background, images.beach, 'Ahoy! Put the animals on the beach!');

    window.addEventListener("orientationchange", resize(stage, background, images.beach), false);
    window.addEventListener("resize", resize(stage,background,images.beach), false);
}

function resize(stage,background,image) {
    stage.width = window.innerWidth;
    stage.height = window.innerHeight;
    drawBackground(background, image, 'Resize! Put the animals on the beach!');
}

function isNearOutline(animal, outline) {
    var a = animal;
    var o = outline;
    if (a.attrs.x > o.x - 20 && a.attrs.x < o.x + 20 && a.attrs.y > o.y - 20 && a.attrs.y < o.y + 20) {
        return true;
    }
    else {
        return false;
    }
}

function drawBackground(background, beachImg, text) {
    var canvas = background.getCanvas();
    var context = background.getContext();

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.drawImage(beachImg, 0, 0,window.innerWidth,window.innerHeight);
    context.font = '20pt Calibri';
    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.fillText(text, background.getStage().getWidth() / 2, 40);
}
