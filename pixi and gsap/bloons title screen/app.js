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
const background    =  new PIXI.Sprite(backgroundTexture);
background.width    = app.screen.width;
background.height   = app.screen.height;
app.stage.addChild(background);

const logo      = new PIXI.Sprite(logoTexture);
logo.width      = app.screen.width / 2;
logo.height     = app.screen.height / 2;
logo.x          = app.screen.width / 2;
logo.y          = app.screen.height / 2;
logo.zOrder     = 1;
logo.anchor.set(0.5);
app.stage.addChild(logo);

const startButton   = new PIXI.Sprite(startTexture);
startButton.x       = app.screen.width / 2;
startButton.y       = app.screen.height / 1.2;
startButton.height  = app.screen.height / 8;
startButton.width   = app.screen.width / 8;
startButton.anchor.set(0.5);
app.stage.addChild(startButton);

// MONKEYS:

const bigMonkey     = new PIXI.Sprite(bigMonkeyTexture);
bigMonkey.x         = app.screen.width / 1.3;
bigMonkey.y         = app.screen.height / 1.4;
bigMonkey.height    = app.screen.height / 3;
bigMonkey.width     = app.screen.width / 4;
bigMonkey.anchor.set(0.5);
app.stage.addChild(bigMonkey);

const boomerang     = new PIXI.Sprite(boomerangTexture);
boomerang.x         = app.screen.width / 3.8;
boomerang.y         = app.screen.height / 4;
boomerang.height    = app.screen.height / 5;
boomerang.width     = app.screen.width / 6;
boomerang.anchor.set(0.5);
app.stage.addChild(boomerang);

const dart      = new PIXI.Sprite(dartTexture);
dart.x          = app.screen.width / 2;
dart.y          = app.screen.height / 4.5;
dart.height     = app.screen.height / 3;
dart.width      = app.screen.width / 6;
dart.anchor.set(0.5);
app.stage.addChild(dart);

const gatling   = new PIXI.Sprite(gatlingTexture);
gatling.x       = app.screen.width / 1.4;
gatling.y       = app.screen.height / 3.8;
gatling.height  = app.screen.height / 3.5;
gatling.width   = app.screen.width / 5;
gatling.anchor.set(0.5);
app.stage.addChild(gatling);

const ninja     = new PIXI.Sprite(ninjaTexture);
ninja.x         = app.screen.width / 3.5;
ninja.y         = app.screen.height / 1.5;
ninja.height    = app.screen.height / 3.5;
ninja.width     = app.screen.width / 5;
ninja.anchor.set(0.5);
app.stage.addChild(ninja);

const sniper    = new PIXI.Sprite(sniperTexture);
sniper.x        = app.screen.width / 3.8;
sniper.y        = app.screen.height / 2.3;
sniper.height   = app.screen.height / 3.5;
sniper.width    = app.screen.width / 5;
sniper.anchor.set(0.5);
app.stage.addChild(sniper);

const wizard     =  new PIXI.Sprite(wizardTexture);
wizard.x         = app.screen.width / 1.3;
wizard.y         = app.screen.height / 2.2;
wizard.height    = app.screen.height / 3.5;
wizard.width     = app.screen.width / 5;
wizard.anchor.set(0.5);
app.stage.addChild(wizard);

// Layers

const userInterface     = new PIXI.layers.Layer();
logo.parentLayer        = userInterface;
startButton.parentLayer = userInterface;
app.stage.addChild(userInterface);

// Tweens and timelines

var timeline = gsap.timeline();

// Logo
timeline.fromTo(logo, {opacity: 0} , {opacity: 1, duration: 2}, 1);

// Monkeys loaded

timeline.fromTo(bigMonkey, {opacity: 0} , {opacity: 1, duration: 2});

timeline.fromTo(boomerang, {opacity: 0} , {opacity: 1, duration: 2});

timeline.fromTo(dart, {opacity: 0} , {opacity: 1, duration: 2});

timeline.fromTo(gatling, {opacity: 0} , {opacity: 1, duration: 2});

timeline.fromTo(ninja, {opacity: 0} , {opacity: 1, duration: 2});

timeline.fromTo(sniper, {opacity: 0} , {opacity: 1, duration: 2});

timeline.fromTo(wizard, {opacity: 0} , {opacity: 1, duration: 2});

// Start button load

//timeline.fromTo(startButton, {opacity: 0} , {opacity: 1, duration: 2});

timeline.to(startButton, {rotation: 60 * Math.PI / 180, duration: 1}, 1);

//timeline.play();
timeline.resume();