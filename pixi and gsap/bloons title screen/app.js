const app = new PIXI.Application({background: '#FFFFFF', height:window.innerHeight, width:window.innerWidth});
document.body.appendChild(app.view);

const startTexture = PIXI.Texture.from('./images/start.jpeg');

const startButton = new PIXI.Sprite(startTexture);
startButton.x = app.screen.width / 2;
startButton.y = app.screen.height / 2;


app.stage.addChild(startButton);

