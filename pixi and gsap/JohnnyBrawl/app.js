// https://pixijs.io/examples/#/events/click.js 

const app = new PIXI.Application({background: '#ffffff'});
document.body.appendChild(app.view);

const adoringFanTexture = PIXI.Texture.from('./images/adoringFan.jpeg');
const fansTexture = PIXI.Texture.from('./images/fans.jpeg');
const paparazziTexture = PIXI.Texture.from('./images/paparazzi.jpg');
const johnnyTexture = PIXI.Texture.from('./images/johnny.jpg');
const muscleTexture = PIXI.Texture.from('./images/muscle.jpg');
const possibleFans = [fansTexture, paparazziTexture, adoringFanTexture];

let hitCount = 0;
let allowHit = true;
const score = new PIXI.Text('baddies smashed: ' + hitCount);
score.x = app.screen.width / 16;
score.y = app.screen.height / 16 ;


const muscle = new PIXI.Sprite(muscleTexture);
muscle.scale.set(0.08);

const johnny = new PIXI.Sprite(johnnyTexture);
johnny.scale.set(0.2);
johnny.x = app.screen.width / 2;
johnny.y = app.screen.height / 2;

const fan = new PIXI.Sprite(fansTexture);
fan.scale.set(0.2);
fan.y = app.screen.height / 2;

/**
 * Enabling interactive mode allows you to click and move objects
 * 
 * Cursor changes what happens to your mouse when you go over the top of a sprite.
 */
johnny.interactive = true;
johnny.cursor = 'pointer';

johnny.anchor.set(0.5);
muscle.anchor.set(0.5);

// needed to make the stage aware
app.stage.interactive = true;
app.stage.hitArea = app.screen;

app.stage.addChild(johnny);
app.stage.addChild(score);
app.stage.addChild(muscle);
app.stage.addChild(fan);
gsap.to(fan, { x: app.screen.width / 2});


/**
 * When Johnny is click a muscle shoots out.
 */
johnny.on('pointerdown', (test) => {
    app.stage.addChild(muscle);
    muscle.x = johnny.x;
    muscle.y = johnny.y;
    allowHit = true;
    gsap.to(muscle, {x:(johnny.x - 600), duraton:4, y:(johnny.y)});
});


/**
 * Creates a listener that makes Johnny move whenever the mouse is moved.
 */
app.stage.addEventListener('pointermove', (e) => {
    johnny.position.copyFrom(e.global);
});

/**
 * Stolen directly from the docs.
 * Checks if the bounds of two rectangles are touching.
 * 
 */
function collideCheck(object1, object2){
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
};

/**
 * Resets the fan and gives them a random texture.
 */
function fanReset(){
    var nextFan = Math.floor(Math.random() * 3);
    fan.texture = possibleFans[nextFan];
    fan.x = app.screen.width / 16;
    fan.y = app.screen.height / (1.5 + Math.floor(Math.random() * 3));
 
}

/**
 * Ticker allows for stuff to be run every time thre is a frame update. This is risky.
 * 
 */
app.ticker.add (() => {

    if(collideCheck(muscle, fan) && allowHit){
        allowHit = false;
        muscle.x = johnny.x;
        muscle.y = johnny.y;
        app.stage.removeChild(muscle);
        fanReset();
        hitCount++
    }

    score.text = ('baddies smashed: ' + hitCount);
});