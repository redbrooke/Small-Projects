const app = new PIXI.Application({background: '#FFFFFF', height:window.innerHeight, width:window.innerWidth});
document.body.appendChild(app.view);

const backgroundTexture = PIXI.Texture.from('./images/static.gif');

/**
 * The position of sprites depends on what order the child objects are added
 * It is important to draw everything in the correct order.
 */
const background    =  new PIXI.Sprite(backgroundTexture);
background.width    = app.screen.width;
background.height   = app.screen.height;
app.stage.addChild(background);