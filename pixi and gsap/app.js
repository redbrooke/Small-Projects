PIXI.utils.sayHello(); // Confrims PIXI is working

// Creates something on the canvas for Pixi to add stuff to, called a renderer.
var renderer = PIXI.autoDetectRenderer(512, 512, { 
    transparent: true,
    resolution: 1
}); 

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container(); // Sets up a stage for pixi to put stuff on

var loader = new PIXI.loader
    .add("images/FileReader.png")
    .load(setup);

var fire;

function setup(){
    fire = new PIXI.sprite(
        PIXI.loader.resource("fire").texture
    );
    stage.addChild(fire);
    renderer.render(stage); // Adds it to the rendeer cavas element
}


