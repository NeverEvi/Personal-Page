export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, x, y) => {
    //convert x,y to string
    const str = `${x},${y}`;
    //check if walls has this position
    const isWallPresent = walls.has(str);

    return !isWallPresent;
}