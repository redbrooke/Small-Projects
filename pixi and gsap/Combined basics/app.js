const app = new PIXI.Application({background:'#ffffff'});
document.body.appendChild(app.view);

const texture = PIXI.Texture.from('images/sprite.jpg');

const sprite = new PIXI.Sprite(texture);
app.stage.addChild(sprite);

sprite.scale.set(0.5,0.5);
/**
 * GSAP + PIXI
 * 
 * Esentially, GSAP can be used on any given PIXI element, allow for a reactive application.
 * DOCUMENTATION: https://pixijs.io/examples/#/gsap3-interaction/gsap3-basic.js
 * 
 */
gsap.to(sprite, {x:500, duraton:2, repeat: -1, yoyo:true});

