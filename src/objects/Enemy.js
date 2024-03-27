import { Animations } from "./Animations";
import { FrameIndexPattern } from "./FrameIndexPattern";
import { GameObject } from "./GameObject";
import { DOWN, LEFT, RIGHT, UP } from "./Input";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { gridCells, isSpaceFree } from "../helpers/grid";
import { moveTowards } from "../helpers/moveTowards";
import { walls } from "../levels/level1";
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./Hero/heroAnimations";
import { events } from "./Events";
import { Speech } from "./Speech";

export class Enemy extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y),
        });
        this.name = "Enemy";
        this.hp = 4;
        this.mhp = 4;
        this.mp = 2;
        this.mmp = 2;
        this.str = 2;
        this.def = 1;

        this.stats = {
            name: this.name, 
            hp: `${this.hp}/${this.mhp}`,
            mp: `${this.mp}/${this.mmp}`,
            str: this.str,
            def: this.def,
        }
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -20),
        })
        this.addChild(shadow);

        const speech = new Speech({})
        this.addChild(speech);

        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -20),
            animations: new Animations({
              walkDown: new FrameIndexPattern(WALK_DOWN),
              walkUp: new FrameIndexPattern(WALK_UP),
              walkLeft: new FrameIndexPattern(WALK_LEFT),
              walkRight: new FrameIndexPattern(WALK_RIGHT),
              standDown: new FrameIndexPattern(STAND_DOWN),
              standUp: new FrameIndexPattern(STAND_UP),
              standLeft: new FrameIndexPattern(STAND_LEFT),
              standRight: new FrameIndexPattern(STAND_RIGHT),
              pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
            })
          
          })
        this.addChild(this.body);

        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPickupTime = 0;
        this.itemPickupShell = null;

        //events.on("HERO_PICKS_UP_ITEM", this, data => {
        //   this.onPickUpItem(data)
        //})
        //events.on("CHECK_STATS", this, data => {
        //    console.log(data.name)
        //    console.log("HP: ",`${data.hp}`)
        //    console.log("MP: ",`${data.mp}`)
        //    console.log("STR: ",`${data.str}`," DEF: ",`${data.def}`)
        //})
    }

    step(delta, root) {
        
        // lock movement to celebrate
        if (this.itemPickupTime > 0) {
            this.workOnItemPickup(delta);
            return;
        }
        
        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;
  
        if (hasArrived) {
            this.tryMove(root)
           
        }

        this.tryEmitPosition()

    }

    /*tryEmitPosition() {

        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }

        this.lastX = this.position.x;
        this.lastY = this.position.y;
        this.info = {name: this.name, position: this.position}
        events.emit("HERO_POSITION", this.info)
    }*/


    tryMove(root) {
        const {input} = root;

        if (!input.direction) {
      
          if (this.facingDirection === LEFT) { this.body.animations.play("standLeft")}
          if (this.facingDirection === RIGHT) { this.body.animations.play("standRight")}
          if (this.facingDirection === UP) { this.body.animations.play("standUp")}
          if (this.facingDirection === DOWN) { this.body.animations.play("standDown")}
      
          return;
        }
      
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;
      
        if (input.direction === DOWN) {
          nextY += gridSize;
          this.body.animations.play("walkDown");
          
        }
        if (input.direction === UP) {
          nextY -= gridSize;
          this.body.animations.play("walkUp");
        }
        if (input.direction === LEFT) {
          nextX -= gridSize;
          this.body.animations.play("walkLeft");
          
        }
        if (input.direction === RIGHT) {
          nextX += gridSize;
          this.body.animations.play("walkRight");
          
        }
        this.facingDirection = input.direction ?? this.facingDirection;
      
        //check if space is free
        if (isSpaceFree(walls, nextX, nextY)) {
          this.destinationPosition.x = nextX;
          this.destinationPosition.y = nextY;
        } //else {console.log("Path blocked...")}
      }
    
    onPickUpItem({ image, position, type, amount }) {
        
        // land directly on item
        this.destinationPosition = position.duplicate();
        
        // start pickup anim
        this.itemPickupTime = 500; //ms
        if(type==="HEALTH_BUFF") {
            this.hp += amount;
            this.mhp += amount;
            console.log(`Maximum HP increased by ${amount}!`)
        }
        if(type==="MANA_BUFF") {
            this.mp += amount;
            this.mmp += amount;
            console.log(`Maximum MP increased by ${amount}!`)
        }
        this.updateStats()
        
        this.itemPickupShell = new GameObject({});
        this.itemPickupShell.addChild(new Sprite({
            resource: image,
            position: new Vector2(0, -18)
        }))
        this.addChild(this.itemPickupShell);
    }

    workOnItemPickup(delta) {
        this.itemPickupTime -= delta;
        this.body.animations.play("pickUpDown")

        if (this.itemPickupTime <= 0) {
            this.itemPickupShell.destroy();
        }
    }
    updateStats() {
        this.stats = {
            name: this.name, 
            hp: `${this.hp}/${this.mhp}`,
            mp: `${this.mp}/${this.mmp}`,
            str: this.str,
            def: this.def,
        }
    }
}