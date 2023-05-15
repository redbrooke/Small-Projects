const app = new PIXI.Application({background: '#ffffff'});
document.body.appendChild(app.view);

const johnnyTexture = PIXI.Texture.from('./images/johnny.jpg');
const muscleTexture = PIXI.Texture.from('./images/muscle.jpg');
const score = new PIXI.Text('baddies smashed: 0');


const muscle = new PIXI.Sprite(muscleTexture);
muscle.scale.set(0.08);

score.x = app.screen.width / 16;
score.y = app.screen.height / 16 ;

const johnny = new PIXI.Sprite(johnnyTexture);
johnny.scale.set(0.2);
johnny.x = app.screen.width / 2;
johnny.y = app.screen.height / 2;

/**
 * Enabling interactive mode allows you to click and move objects
 * 
 * Cursor changes what happens to your mouse when you go over the top of a sprite.
 */
johnny.interactive = true;
johnny.cursor = 'pointer';

johnny.anchor.set(0.5);
muscle.anchor.set(0.5);

app.stage.interactive = true;
app.stage.hitArea = app.screen;

app.stage.addChild(johnny);
app.stage.addChild(score);
app.stage.addChild(muscle);

johnny.on('pointerdown', (test) => {
    gsap.to(muscle, {x:johnny.x, duraton:2, y:johnny.y});
});

app.stage.addEventListener('pointermove', (e) => {
    johnny.position.copyFrom(e.global);
});