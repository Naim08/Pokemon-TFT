import * as PIXI from "pixi.js";
import "jimp";
import { MaskCoordinate, Mask, Masker } from "./game/mask";
class Tileset {
  constructor(imageUrl, tileSize) {
    this.imageUrl = imageUrl;
    this.tileSize = tileSize;
    this.textures = new Map();
    this.tileIds = new Array(25).fill().map(() => new Array(19).fill(0));
    this.baseTexture = null;
    this.terrainContainer = [[], [], []];
  }

  async initialize() {
    const tileSize = 25;
    const mapWidth = 451;
    const mapHeight = 601;

    const image = await Jimp.read(this.imageUrl);

    for (let y = 0; y < mapHeight; y += tileSize) {
      for (let x = 0; x < mapWidth; x += tileSize) {
        const tile = image.clone().crop(x, y, tileSize, tileSize);
        const pixelData = tile.bitmap.data;

        if (this.isTileValid(pixelData)) {
          // divided into 3 terrain types

          const mask = new Masker();
          const maskId = mask.mask8bits(
            this.tileIds,
            Math.floor(x / tileSize),
            Math.floor(y / tileSize)
          );

          this.tileIds[y / tileSize][x / tileSize] = maskId;
          this.textures.set(maskId, tile);

          tile.mask = maskId;
          tile.maskCoordinate = MaskCoordinate[maskId];
          if (x < 150) {
            this.terrainContainer[0].push(maskId);
          } else if (x < 300) {
            this.terrainContainer[1].push(maskId);
          } else {
            this.terrainContainer[2].push(maskId);
          }
        } else {
          this.tileIds[y / tileSize][x / tileSize] = -1;
        }
      }
    }
  }
  getTexture(tileId) {
    return this.textures.get(tileId);
  }
  getValidTiles() {
    const validTiles = [];
    for (let i = 0; i < this.tileIds.length; i++) {
      const tileId = this.tileIds[i];
      if (tileId !== -1) {
        const tileData = this.getTexture(tileId);
        if (tileData !== undefined) {
          validTiles.push(tileId);
        }
      }
    }
    return validTiles;
  }

  isTileValid(pixelData) {
    for (let i = 0; i < pixelData.length; i += 4) {
      if (
        pixelData[i] !== 0 ||
        pixelData[i + 1] !== 0 ||
        pixelData[i + 2] !== 0
      ) {
        return true;
      }
    }
    return false;
  }

  getId(maskId) {
    let id = 0;
    for (let i = 0; i < maskId.length; i++) {
      id += Math.pow(2, i) * maskId[i];
    }
    return id;
  }
}

export default Tileset;
