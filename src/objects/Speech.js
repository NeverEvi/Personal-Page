import { ctx } from "../../main";
import { events } from "./Events";
import { GameObject } from "./GameObject";

export class Speech extends GameObject {
    constructor() {
        super({});
        this.name = "Speech"
        
        events.on("HERO_PICKS_UP_ITEM", this, data => {
            console.log(data.heroName, "got", data.name)
            
        })
    }
}