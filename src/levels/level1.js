export const walls = new Set();

walls.add(`64,48`); //trees
walls.add(`208,64`)
walls.add(`224,32`)
//console.log("Tree collision initialized...")

walls.add(`112,80`); //water
walls.add(`128,80`);
walls.add(`144,80`);
walls.add(`160,80`);
//console.log("Water collision initialized...")

walls.add(`192,96`); //rocks
walls.add(`208,96`);
walls.add(`224,96`);
//console.log("Rock collision initialized...")

walls.add(`224,64`); //house
//console.log("House collision initialized...")

const denseSpaces = [
    //squares
    `64,64`,`64,80`,`80,64`,`80,80`,`128,48`,`144,48`,

    //bottom edges
    `48,112`,`64,112`, `80,112`,`96,112`,`112,112`,`128,112`,
    `144,112`,`160,112`,`176,112`,`192,112`,`208,112`,`224,112`,
    `240,112`,
    //right edges
    `256,96`,`256,80`,`256,64`,`256,48`,`240,32`,
    //top edges
    `208,16`,`192,16`,`176,16`,`160,16`,`144,16`,`128,16`,
    `112,16`,`96,32`,`80,32`,`48,32`,
    //left edges
    `32,48`,`32,64`,`32,80`,`32,96`
]

denseSpaces.forEach(space => walls.add(space));