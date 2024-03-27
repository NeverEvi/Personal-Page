import './style.css'
import twitchLogo from './twitch.svg'
import xLogo from './X.svg'
import facebookLogo from './facebook.svg'
import githubLogo from '/github.svg'
import pokeLogo from '/Pokeball.svg'
import linkedin from '/Linkedin.svg'
import { resources } from './src/objects/Resource.js'
import { Vector2 } from './src/objects/Vector2.js'
import { Sprite } from './src/objects/Sprite.js'
import { GameLoop } from './src/objects/GameLoop.js'
import { Input, UP, DOWN, LEFT, RIGHT } from './src/objects/Input.js'
import { gridCells, isSpaceFree } from './src/helpers/grid.js'
import { moveTowards } from './src/helpers/moveTowards.js'
import { walls } from './src/levels/level1.js'
import { Animations } from './src/objects/Animations.js'
import { FrameIndexPattern } from './src/objects/FrameIndexPattern.js'
import { WALK_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT } from './src/objects/Hero/heroAnimations.js'
import { GameObject } from './src/objects/GameObject.js'
import { Hero } from './src/objects/Hero/Hero.js'
import { events } from './src/objects/Events.js'
import { Camera } from './src/objects/Camera.js'
import { Rod } from './src/objects/Rod/Rod.js'
import { Inventory } from './src/objects/Inventory/Inventory.js'
import { Rod2 } from './src/objects/Rod/Rod2.js'

document.querySelector('#app').innerHTML = `
  <div class="head">
  <h1>NeverEvi</h1>
    <div class="links">
      <div class="pageLink">
        <a href="https://neverevi.github.io/final-project-frontend/#/" target="_blank">
          <img src="${pokeLogo}" class="logo" alt="Pokecard logo" />
        </a>
        <p>PokeCard</p>
      </div>
      <div class="pageLink">
        <a href="https://github.com/NeverEvi" target="_blank">
          <img src="${githubLogo}" class="logo" alt="Github logo" />
        </a>
        <p>GitHub</p>
      </div>
      <div class="pageLink">
        <a href="https://www.facebook.com/NeverEvi" target="_blank">
          <img src="${facebookLogo}" class="logo" alt="Facebook logo" />
        </a>
        <p>Facebook</p>
      </div>
      <div class="pageLink">
        <a href="https://twitter.com/NeverEvi" target="_blank">
          <img src="${xLogo}" class="logo" alt="X logo" />
        </a>
        <p>Twitter/X</p>
      </div>
        <div class="pageLink">
        <a href="https://www.twitch.tv/neverevi" target="_blank">
          <img src="${twitchLogo}" class="logo" alt="Twitch logo" />
        </a>
        <p>Twitch.tv</p>
      </div>
      <div class="pageLink">
        <a href="https://www.linkedin.com/in/kane-cramer-neverevi" target="_blank">
          <img src="${linkedin}" class="logo" alt="LinkedIn logo" />
        </a>
        <p>LinkedIn</p>
      </div>
    </div>
    
    <h2>Play Cerulia</h2>
    <p class="read-the-docs">
      V 0.00.005
    </p>
  </div>
`

// grab the canvas
const canvas = document.querySelector("#game-canvas");
export const ctx = canvas.getContext("2d");

// establish root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})


// add the sky, ground, and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})
//mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);

const checkStats = () => {
  events.emit("CHECK_STATS", hero.stats)
}

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);
document.addEventListener("click", checkStats)



const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const rod2 = new Rod2(gridCells(10), gridCells(4));
mainScene.addChild(rod2);

const inventory = new Inventory();



// add an input class
mainScene.input = new Input();



// update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
};
const draw = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //draw sky
  skySprite.drawImage(ctx, 0, 0);

  //save state
  ctx.save();

  //offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  //draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // restor original state
  ctx.restore();

  //draw above the game
  inventory.draw(ctx, 0, 0)

}

// start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();