PIXI.utils.sayHello(); // Confrims PIXI is working

var renderer = PIXI.autoDetectRenderer(512, 512, {
    transparent: true,
    resolution: 1
}); 

document.getElementById('display').appendChild(renderer.view);