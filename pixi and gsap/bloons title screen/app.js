const app = new PIXI.Application({background: '#FFFFFF', height:window.innerHeight, width:window.innerWidth});
document.body.appendChild(app.view);

const startTexture = PIXI.Texture.from('./images/startButton.png');
const bigMonkeyTexture = PIXI.Texture.from('./images/bigMonkey.png');
const logoTexture = PIXI.Texture.from('./images/bloonslogo.webp');
const boomerangTexture = PIXI.Texture.from('./images/boomerang.webp');
const dartTexture = PIXI.Texture.from('./images/dart.webp');
const gatlingTexture = PIXI.Texture.from('./images/gatlingMonkey.webp');
const ninjaTexture = PIXI.Texture.from('./images/ninja.webp');
const sniperTexture = PIXI.Texture.from('./images/sniper.webp');
const wizardTexture = PIXI.Texture.from('./images/wizard.webp');
const backgroundTexture = PIXI.Texture.from('./images/background.jpg');
/**
 * The position of sprites depends on what order the child objects are added
 * It is important to draw everything in the correct order.
 */
const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const bigMonkey = new PIXI.Sprite(bigMonkeyTexture);
bigMonkey.height = app.screen.height / 8;
bigMonkey.width = app.screen.width / 8;
app.stage.addChild(bigMonkey);

const startButton = new PIXI.Sprite(startTexture);
startButton.x = app.screen.width / 2;
startButton.y = app.screen.height / 1.4;
startButton.height = app.screen.height / 8;
startButton.width = app.screen.width / 8;
app.stage.addChild(startButton);

