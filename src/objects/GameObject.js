import { events } from "./Events";
import { Vector2 } from "./Vector2";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];
        this.parent = null;
        this.hasReadyBeenCalled = false;
        this.name = "GameObject";

    }

    stepEntry(delta, root) {
        //call updates on children
        this.children.forEach((child) => child.stepEntry(delta, root));

        //call ready
        if (!this.hasReadyBeenCalled) {
            this.hasReadyBeenCalled = true;
            this.ready(); 
        }
        //call step
        this.step(delta, root);
    }

    ready() {
        
    }

    step(_delta) {
        //..
    }
    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        this.drawImage(ctx, drawPosX, drawPosY);

        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    drawImage(ctx, drawPosX, drawPosY) {

    }

    destroy() {
        this.children.forEach(child => {
            child.destroy();
        })
        this.parent.removeChild(this);
    }


    addChild(gameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
    
    }

    removeChild(gameObject) {
        //console.log("gameObject removeChild", gameObject)
        events.unsubscribe(gameObject);
        this.children = this.children.filter(g => {
            return gameObject !== g;
        })
    }
}