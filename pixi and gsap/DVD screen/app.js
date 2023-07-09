const app = new PIXI.Application({background: '#FFFFFF', height:window.innerHeight, width:window.innerWidth});
document.body.appendChild(app.view);

originX = 0;
originY = 0;
targetX = app.screen.height;
targetY = app.screen.width + 1;


const backgroundTexture = PIXI.Texture.from('./images/static.gif');
const dvdLogo = PIXI.Texture.from('./images/DVD.png');

/**
 * The position of sprites depends on what order the child objects are added
 * It is important to draw everything in the correct order.
 */
const background    =  new PIXI.Sprite(backgroundTexture);
background.width    = app.screen.width;
background.height   = app.screen.height;
app.stage.addChild(background);

const DVD           = new PIXI.Sprite(dvdLogo);
DVD.width           = app.screen.width / 6;
DVD.height          = app.screen.width / 6;
app.stage.addChild(DVD);

while (true){
    adjustTragectory();
}

function adjustTragectory(){

    originX = targetX;
    originY = targetY;

    if(targetX == app.screen.height){};
    if(targetY == app.screen.width){};


    gsap.fromTo(DVD, {duration:1, y:originY, x:originX}, {duration:1, y:targetY, x:targetX});
};