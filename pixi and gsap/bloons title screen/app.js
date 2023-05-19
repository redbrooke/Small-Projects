const app = new PIXI.Application({background: '#FFFFFF', height:window.innerHeight, width:window.innerWidth});
document.body.appendChild(app.view);

const backgroundTexture = PIXI.Texture.from('./images/background.jpg');
const logoTexture = PIXI.Texture.from('./images/bloonslogo.webp');
const startTexture = PIXI.Texture.from('./images/startButton.png');

const bigMonkeyTexture = PIXI.Texture.from('./images/bigMonkey.png');
const boomerangTexture = PIXI.Texture.from('./images/boomerang.webp');
const dartTexture = PIXI.Texture.from('./images/dart.webp');
const gatlingTexture = PIXI.Texture.from('./images/gatlingMonkey.webp');
const ninjaTexture = PIXI.Texture.from('./images/ninja.webp');
const sniperTexture = PIXI.Texture.from('./images/sniper.webp');
const wizardTexture = PIXI.Texture.from('./images/wizard.webp');
/**
 * The position of sprites depends on what order the child objects are added
 * It is important to draw everything in the correct order.
 */
const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const logo = new PIXI.Sprite(logoTexture);
logo.width = app.screen.width / 2;
logo.height = app.screen.height / 2;
logo.x = app.screen.width / 2;
logo.y = app.screen.height / 2;
logo.anchor.set(0.5);
app.stage.addChild(logo);

const startButton = new PIXI.Sprite(startTexture);
startButton.x = app.screen.width / 2;
startButton.y = app.screen.height / 1.2;
startButton.height = app.screen.height / 8;
startButton.width = app.screen.width / 8;
startButton.anchor.set(0.5);
app.stage.addChild(startButton);

// MONKEYS:

const bigMonkey = new PIXI.Sprite(bigMonkeyTexture);
bigMonkey.height = app.screen.height / 8;
bigMonkey.width = app.screen.width / 8;
bigMonkey.anchor.set(0.5);
app.stage.addChild(bigMonkey);

const boomerang = new PIXI.Sprite(boomerangTexture);
boomerang.height = app.screen.height / 8;
boomerang.width = app.screen.width / 8;
boomerang.anchor.set(0.5);
app.stage.addChild(boomerang);

const dart = new PIXI.Sprite(dartTexture);
dart.height = app.screen.height / 8;
dart.width = app.screen.width / 8;
dart.anchor.set(0.5);
app.stage.addChild(dart);

const gatling = new PIXI.Sprite(gatlingTexture);
gatling.height = app.screen.height / 8;
gatling.width = app.screen.width / 8;
gatling.anchor.set(0.5);
app.stage.addChild(gatling);

const ninja = new PIXI.Sprite(ninjaTexture);
ninja.height = app.screen.height / 8;
ninja.width = app.screen.width / 8;
ninja.anchor.set(0.5);
app.stage.addChild(ninja);

const sniper = new PIXI.Sprite(sniperTexture);
sniper.height = app.screen.height / 8;
sniper.width = app.screen.width / 8;
sniper.anchor.set(0.5);
app.stage.addChild(sniper);

const wizard =  new PIXI.Sprite(wizardTexture);
wizard.height = app.screen.height / 8;
wizard.width = app.screen.width / 8;
wizard.anchor.set(0.5);
app.stage.addChild(wizard);