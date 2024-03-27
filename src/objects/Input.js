export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class Input {
    constructor() {
        
        this.heldDirections = [];

        

        document.addEventListener("keydown", (e) => {
            if (e.code === "KeyW") {
                this.onArrowPressed(UP);
            }
            if (e.code === "KeyS") {
                this.onArrowPressed(DOWN);
            }
            if (e.code === "KeyA") {
                this.onArrowPressed(LEFT);
            }
            if (e.code === "KeyD") {
                this.onArrowPressed(RIGHT);
            }
        })

        document.addEventListener("keyup", (e) => {
            if (e.code === "KeyW") {
                this.onArrowReleased(UP);
            }
            if (e.code === "KeyS") {
                this.onArrowReleased(DOWN);
            }
            if (e.code === "KeyA") {
                this.onArrowReleased(LEFT);
            }
            if (e.code === "KeyD") {
                this.onArrowReleased(RIGHT);
            }
        })
    }

    get direction() {
        return this.heldDirections[0];
    }

    onArrowPressed(direction) {
        //add to queue if new
        if (this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }
    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if (index === -1) {
            return;
        }
        //remove from list
        this.heldDirections.splice(index, 1);
    }

}