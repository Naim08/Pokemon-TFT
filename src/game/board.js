import * as PIXI from "pixi.js";
import Tileset from "../tileset";
import tilesetMap from "../assets/MT_BLAZE.png";
import Tile from "../tile";
import Pokemon from "./pokemon";
import { PriorityQueue } from "@datastructures-js/priority-queue";

class Board {
  constructor(
    numRows,
    numCols,
    tileSize,
    selectedTerrain,
    tileset,
    app,
    boardContainer
  ) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.tileSize = tileSize;
    this.selectedTerrain = selectedTerrain;
    this.tileset = tileset;
    this.tiles = [];
    this.boardContainer = boardContainer;
    this.tileclass = [];
    this.app = app;
    this.board = Array.from(Array(numCols), () => new Array(numRows));
    this.selectedPokemon = null;
    this.ticker = new PIXI.Ticker();
    this.player1Pokemon = [];
    this.player2Pokemon = [];
  }

  async initialize(app) {
    const preLoadContainer = new PIXI.Container();
    const preLoadText = new PIXI.Text("Loading...", {
      fontSize: 24,
      fill: 0xffffff,
    });
    preLoadText.anchor.set(0.5);
    preLoadText.x = app.view.width / 2;
    preLoadText.y = app.view.height / 2;
    preLoadContainer.addChild(preLoadText);
    const preLoadAnimation = new PIXI.Graphics();
    preLoadAnimation.lineStyle(4, 0xffffff);
    preLoadAnimation.arc(
      app.view.width / 2,
      app.view.height / 2,
      20,
      0,
      Math.PI / 2
    );
    preLoadAnimation.endFill();
    preLoadContainer.addChild(preLoadAnimation);

    app.stage.addChild(preLoadContainer);

    const tileset = new Tileset(tilesetMap, 25);
    let angle = 0;
    app.ticker.add(() => {
      angle += 0.4;
      preLoadAnimation.clear();
      preLoadAnimation.lineStyle(4, 0xffffff);
      preLoadAnimation.arc(
        app.view.width / 2,
        app.view.height / 2,
        20,
        0,
        angle
      );
      preLoadAnimation.endFill();
    });

    await tileset.initialize().then(async () => {
      preLoadContainer.visible = false;

      const numRows = this.numRows;
      const numCols = this.numCols;
      const tileSize = this.tileSize;
      const selectedTerrain = 2; // Select the first terrain type
      const validTiles = tileset.getValidTiles();
      for (let i = 0; i < numRows; i++) {
        this.tileclass.push([]);
        this.tiles.push([]);
        for (let j = 0; j < numCols; j++) {
          const maskIds = tileset.terrainContainer[selectedTerrain];
          const randomMaskId =
            maskIds[Math.floor(Math.random() * maskIds.length)];
          const terrainTile = tileset.getTexture(randomMaskId);

          const texture = PIXI.Texture.fromBuffer(
            terrainTile.bitmap.data,
            terrainTile.bitmap.width,
            terrainTile.bitmap.height
          );
          const sprite = new PIXI.Sprite(texture);
          const newTile = new Tile(texture, i, j);
          this.tileclass[i].push(newTile);
          sprite.x = j * tileSize;
          sprite.y = i * tileSize;
          sprite.scale.set(2.5);
          sprite.interactive = true;
          sprite.buttonMode = true;

          sprite.on("click", (e) => {
            console.log("clicked", e);
            this.selectedTile = { x: j, y: i };

            if (this.selectedPokemon !== null) {
              const playerSide = this.checkPlayerSide();

              if (this.selectedPokemon.player.side !== playerSide) {
                console.log("Invalid move");
                return;
              }

              const coords = this.getTileCoordinates(
                this.selectedTile.x,
                this.selectedTile.y
              );
              if (
                this.board[this.selectedTile.x][this.selectedTile.y] ===
                undefined
              ) {
                const healthBarTooltip =
                  this.selectedPokemon.animate.healthBarTooltip;
                healthBarTooltip.x = coords.x;
                healthBarTooltip.y = coords.y;
                // healthBarTooltip.visible = false;
              }
              this.selectedPokemon.animate.animatedSprite.idle.x = coords.x;
              this.selectedPokemon.animate.animatedSprite.idle.y = coords.y;
              this.board[this.selectedTile.x][this.selectedTile.y] =
                this.selectedPokemon;

              // this.tileclass[this.selectedTile.x][
              //   this.selectedTile.y
              // ].hasPokemon = true;

              if (this.selectedPokemon.tile) {
                const tileX = this.selectedPokemon.tile.x;
                const tileY = this.selectedPokemon.tile.y;
                this.board[tileX][tileY] = undefined;
                const healthBarTooltip =
                  this.selectedPokemon.animate.healthBarTooltip;
                healthBarTooltip.visible = true;

                // this.boardContainer.removeChild(healthBarTooltip);
              }
              this.selectedPokemon.tile =
                this.tileclass[this.selectedTile.x][this.selectedTile.y];

              this.selectedPokemon.coords = this.getCoordinatesForMainboard(
                coords.x,
                coords.y
              );
              this.selectedPokemon.animate.animatedSprite.idle.tint = 0xffffff;

              this.selectedPokemon = null;
            }
          });

          sprite.zIndex = 0;
          const graphics = new PIXI.Graphics();
          graphics.lineStyle(2, 0xff0000, 1);
          console.log(sprite.x, sprite.y);
          graphics.drawRect(sprite.x, sprite.y, tileSize, tileSize);
          this.boardContainer.addChild(graphics);
          this.tiles[i].push(sprite);
          this.boardContainer.addChild(sprite);
        }
      }

      this.boardContainer.width = 800;
      this.boardContainer.height = 480;
      this.boardContainer.x = (app.view.width - this.boardContainer.width) / 2;
      this.boardContainer.y =
        (app.view.height - this.boardContainer.height) / 2;
      this.width = this.boardContainer.x;
      this.height = this.boardContainer.y;
    });
  }
  getCoordinatesForMainboard(x, y) {
    const boardX = this.boardContainer.x;
    const boardY = this.boardContainer.y;
    const mainboardWidth = this.boardContainer.width;
    const mainboardHeight = this.boardContainer.height;
    const tileWidth = mainboardWidth / 6;
    const tileHeight = mainboardHeight / 8;
    const offsetX = tileWidth * x;
    const offsetY = tileHeight * y;
    const pixelX = boardX + offsetX;
    const pixelY = boardY + offsetY;
    return { x: pixelX, y: pixelY };
  }
  async addPokemon(side, coords, name, startingAnimation) {
    const pokemon = new Pokemon(name, side, coords);
    const { x, y } = this.getCoordinatesForMainboard(coords.x, coords.y);
    await pokemon.loadSprite();
    pokemon.animate.animatedSprite.idle.x = x;
    pokemon.animate.animatedSprite.idle.y = y;
    this.board[coords.x][coords.y] = pokemon;
    this.boardContainer.addChild(pokemon.animate.animatedSprite.idle);
  }

  getTileCoordinates(x, y) {
    return { x: x * 64, y: y * 64 };
  }
  isOccupied(coords) {
    const { x, y } = coords;
    return this.board[x][y] !== undefined;
  }

  isWithinBounds(coords) {
    const { x, y } = coords;
    return x >= 0 && x < this.numRows && y >= 0 && y < this.numCols;
  }
  getPokemonAt(coords) {
    const { x, y } = coords;
    return this.board[x][y];
  }
  // rows 0-2 belong to player A
  // rows 3-5 belong to player B
  checkPlayerSide() {
    const { x, y } = this.selectedTile;
    console.log(x, y);
    if (y >= 0 && y <= 2) {
      return 0;
    } else if (y >= 3 && y <= 5) {
      return 1;
    } else {
      return -1;
    }
  }

  findShortestPath(start, end) {
    const rows = this.board.length;
    const cols = this.board[0].length;
    const visited = new Set();
    end = [end.x, end.y];
    start = [start.x, start.y];
    const queue = [[start, []]]; // Queue contains [current cell, path so far]

    while (queue.length > 0) {
      const [currentCell, path] = queue.shift();
      const [row, col] = currentCell;

      if (row === end[0] && col === end[1]) {
        return path.concat([end]);
      }

      if (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        !visited.has(`${row}-${col}`)
      ) {
        visited.add(`${row}-${col}`);
        queue.push([[row + 1, col], path.concat([currentCell])]); // Move down
        queue.push([[row - 1, col], path.concat([currentCell])]); // Move up
        queue.push([[row, col + 1], path.concat([currentCell])]); // Move right
        queue.push([[row, col - 1], path.concat([currentCell])]); // Move left
      }
    }

    return null; // No path found
  }
  moveSprite(sprite, startX, startY, endX, endY, speed) {
    sprite = sprite.animate.animatedSprite.idle;
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const frames = distance / speed;
    let currentFrame = 0;

    const animate = () => {
      currentFrame++;
      if (currentFrame <= frames) {
        const x = startX + dx * (currentFrame / frames);
        const y = startY + dy * (currentFrame / frames);
        sprite.x = x;
        sprite.y = y;
        this.ticker.add(animate);
      } else {
        sprite.x = endX;
        sprite.y = endY;
        this.ticker.stop();
      }
    };

    this.ticker.start();
    animate();
  }
  getAdjacentTiles(x, y) {
    console.log(x, y);
    const adjacentTiles = [];
    if (x > 0) {
      adjacentTiles.push({ x: x - 1, y: y });
    }
    if (x < this.numRows - 1) {
      adjacentTiles.push({ x: x + 1, y: y });
    }
    if (y > 0) {
      adjacentTiles.push({ x: x, y: y - 1 });
    }
    if (y < this.numCols - 1) {
      adjacentTiles.push({ x: x, y: y + 1 });
    }
    return adjacentTiles;
  }
  getAdjacentPokemon(pokemon) {
    if (!pokemon) {
      return null;
    }
    if (!pokemon.tile) {
      return null;
    }

    const adjacentTiles = this.getAdjacentTiles(pokemon.tile.x, pokemon.tile.y);

    for (const tile of adjacentTiles) {
      const tilePokemon = this.getPokemonAt({ x: tile.x, y: tile.y });
      if (tilePokemon && tilePokemon.player !== pokemon.player) {
        return tilePokemon;
      }
    }
    return null;
  }
  getSelectedPokemon() {
    return this.selectedPokemon;
  }
  placePokemon(pokemon, row, col) {
    console.log(pokemon);
    const tile = this.tileclass[row][col];
    if (tile.hasPokemon) {
      return false;
    }
    if (pokemon.player.name === "John Wick") {
      this.player1Pokemon.push(pokemon);
    } else if (pokemon.player.name === "Hillary") {
      this.player2Pokemon.push(pokemon);
    }
    pokemon.player.boardPokemon.push(pokemon);
    tile.hasPokemon = true;
  }
}

export default Board;
