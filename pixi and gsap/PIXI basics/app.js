/** 
* PIXI.Application

* Constructor that sets up some basic stuff needed for a project, mainly the renderer, ticker and root container.
* This is normally appended to the HTML document as a canvas. 
* 
* DOCUMENTATION: https://pixijs.download/v6.1.1/docs/PIXI.Application.html
*/
const app = new PIXI.Application({ background: '#FFFFFF' });
document.body.appendChild(app.view);

/**
 * PIXI.container
 * 
 * Basically designed to have things added to it with .addChild() method.
 * 
 * DOCUMENTATION: https://pixijs.download/v6.1.1/docs/PIXI.Container.html
 */
const container = new PIXI.Container();
app.stage.addChild(container);

/**
 * PIXI.Texture
 * 
 * Stores information about an image (or part of an image) that can be used to draw on a sprite. 
 * Basically, a chunk of graphical info.
 * 
 * DOCUMENTATION: https://pixijs.download/v6.1.1/docs/PIXI.Texture.html
 */
const fireTexture = PIXI.Texture.from('./images/fire.png');


/**
 * PIXI.sprite
 * 
 * Basically used to put some kind of texture onto the screen. 
 * 
 * DOCUMENTATION: https://pixijs.download/v6.1.1/docs/PIXI.Sprite.html
 */
const fire = new PIXI.Sprite(fireTexture);
container.addChild(fire);