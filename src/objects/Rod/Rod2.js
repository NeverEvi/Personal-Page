import { events } from "../Events";
import { GameObject } from "../GameObject";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";

export class Rod2 extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x,y),
            
        });
        const sprite = new Sprite({
            resource: resources.images.rod2,
            position: new Vector2(0, -5) //nudge upward
        })

        this.addChild(sprite);
        this.name = "Health Rod";

        
    }

    ready() {
        //console.log(this.name, "IS READY!")
        events.on("HERO_POSITION", this, data => {
            //detect overlap...
            //console.log("Data:", data)
            const roundedHeroX = Math.round(data.position.x);
            const roundedHeroY = Math.round(data.position.y);
            if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
                this.onCollideWithHero(data.name);
            }
        })
    }

    onCollideWithHero(heroName) {

        //remove instance from scene
        this.destroy();

        //alert other things that we picked it up
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod2,
            position: this.position,
            name: this.name,
            heroName: heroName,
            type: "HEALTH_BUFF",
            amount: 2,
        })
    }


}