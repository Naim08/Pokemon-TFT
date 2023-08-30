import spritePack from "../assets/sprite-pack.json";
import { Assets, Sprite, Spritesheet } from "pixi.js";
import * as PIXI from "pixi.js";
const images = require.context("../assets/pokemon/", false, /\.png$/);

class PokeAnimation {
  constructor(pokemonName) {
    this._pokemonName = pokemonName;
    this.pokemonSprites = [];
    this.selectedPokemon = null;
    this.onTile = false;
    this.animatedSprite = {
      idle: null,
      "walk-left": null,
      "walk-right": null,
      attack: null,
    };
    this.tooltip = null;
    this.healthBarTooltip = null;
  }

  get pokemonName() {
    return this._pokemonName;
  }
  move(delta) {
    // Move the sprite based on the delta time
    this.animatedSprite.idle.x += 10 * delta;
  }
  async load(container) {
    const pokeSprite = await Assets.load(spritePack);
    const frameUrl = `./${this.pokemonName}.png`;

    const pokemon = await Assets.load(images(frameUrl));
    console.log(pokeSprite);
    const numAnimations = 4;
    const spriteWidth = 64;
    const spriteHeight = 64;
    const numSprites = 4;
    for (let i = 0; i < numAnimations; i++) {
      const frames = [];
      for (let j = 0; j < numSprites; j++) {
        const frame = new PIXI.Rectangle(
          j * spriteWidth,
          i * spriteHeight,
          spriteWidth,
          spriteHeight
        );
        const spriteTexture = new PIXI.Texture(pokemon, frame);
        frames.push(spriteTexture);
      }
      const animatedSprite = new PIXI.AnimatedSprite(frames);
      animatedSprite.animationSpeed = 0.1;
      animatedSprite.play();
      animatedSprite.x = 0 + i * spriteWidth;
      animatedSprite.y = i * spriteHeight * 2.5 * i;
      animatedSprite.zIndex = 1;

      switch (i) {
        case 0:
          this.animatedSprite.idle = animatedSprite;
          break;
        case 1:
          this.animatedSprite["walk-left"] = animatedSprite;
          break;
        case 2:
          this.animatedSprite["walk-right"] = animatedSprite;
          break;
        case 3:
          this.animatedSprite.attack = animatedSprite;
          break;
        default:
          break;
      }
      this.pokemonSprites.push(animatedSprite);
    }
    container.addChild(this.pokemonSprites[0]);
  }
  getSprite() {
    return this.pokemonSprites[0];
  }
  getAnimatedSprite() {
    return this.animatedSprite;
  }
  async loadb() {
    const pokeSprite = await Assets.load(spritePack);
    const frameUrl = `./${this.pokemonName}.png`;

    const pokemon = await Assets.load(images(frameUrl));
    console.log(pokeSprite);
    const numAnimations = 4;
    const spriteWidth = 64;
    const spriteHeight = 64;
    const numSprites = 4;
    for (let i = 0; i < numAnimations; i++) {
      const frames = [];
      for (let j = 0; j < numSprites; j++) {
        const frame = new PIXI.Rectangle(
          j * spriteWidth,
          i * spriteHeight,
          spriteWidth,
          spriteHeight
        );
        const spriteTexture = new PIXI.Texture(pokemon, frame);
        frames.push(spriteTexture);
      }
      const animatedSprite = new PIXI.AnimatedSprite(frames);
      animatedSprite.animationSpeed = 0.1;
      animatedSprite.play();
      animatedSprite.on("mouseover", () => {
        if (this.tooltip === null) {
          this.tooltip = new PIXI.Container();
          const background = new PIXI.Graphics();
          background.beginFill(0xffffff);
          background.drawRect(0, 0, 100, 50);
          background.endFill();
          this.tooltip.addChild(background);

          const style = new PIXI.TextStyle({
            fontSize: 12,
            fill: "black",
          });

          const stats = new PIXI.Text(
            `Name: ${this.name}\nType: ${this.type}\nHP: ${this.hp}\nAttack: ${this.attack}\nDefense: ${this.defense}`,
            style
          );
          stats.x = 5;
          stats.y = 5;
          this.tooltip.addChild(stats);

          this.tooltip.x = this.animatedSprite.x;
          this.tooltip.y = this.animatedSprite.y - this.tooltip.height;
          this.tooltip.addChild(background);
        }
      });
      animatedSprite.on("mouseout", () => {
        if (this.tooltip !== null) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      });

      animatedSprite.zIndex = 1;

      switch (i) {
        case 0:
          this.animatedSprite.idle = animatedSprite;
          break;
        case 1:
          this.animatedSprite["walk-left"] = animatedSprite;
          break;
        case 2:
          this.animatedSprite["walk-right"] = animatedSprite;
          break;
        case 3:
          this.animatedSprite.attack = animatedSprite;
          break;
        default:
          break;
      }
      this.pokemonSprites.push(animatedSprite);
    }
  }
}

export { PokeAnimation };
