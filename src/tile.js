import * as PIXI from "pixi.js";
class Tile extends PIXI.Sprite {
  constructor(texture, col, row, cost = 1) {
    super(texture);
    this.y = col;
    this.x = row;
    this.hasPokemon = false;
    this.cost = cost;
  }
}

export default Tile;
