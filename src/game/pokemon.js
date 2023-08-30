import { pokeData } from "../model/pokemon_helper";
import { PokeAnimation } from "../model/pokemon_animation";
import * as PIXI from "pixi.js";
import Player from "./player";

class Pokemon extends PIXI.Container {
  constructor(name, side, pos, player = null) {
    super();
    this.name = name;
    this.pokemon = pokeData[name];
    this.side = side;
    this.coords = pos;
    this.maxHP = this.pokemon.maxHP;
    this.attack = this.pokemon.attack;
    this.defense = this.pokemon.defense;
    this.currentHP = this.maxHP;
    this.animate = new PokeAnimation(name);
    this.player = player;
    this.tile = null;
    this.isAlive = true;
    this.lastAttackTime = 0;
    this.emit = new PIXI.utils.EventEmitter();
  }

  takeDamage(damage) {
    this.currentHP -= damage;
    if (this.currentHP <= 0) {
      this.currentHP = 0;
      this.isAlive = false;
      this.emit("Dead");
    }
  }
  attackPokemon(target) {
    const damage = this.attack;

    console.log("can attacks");
    target.currentHP -= damage;
    console.log(target.currentHP);
    if (target.currentHP <= 0) {
      target.currentHP = 0;
      if (!target.isAlive) return damage; // If the target is already dead, return the damage dealt
      target.isAlive = false;
      const index = target.player.boardPokemon.indexOf(target);
      if (index !== -1) {
        target.player.boardPokemon.splice(index, 1);
      }
      this.player.score += 1;
      target.animate.animatedSprite.idle.emit("Dead", this.player);
      target.animate.animatedSprite.idle.destroy();
      target.x = null;
      target.y = null;

      console.log(damage);
    }

    return damage;
  }

  setCurrentHP(hp) {
    this.currentHP = hp;
    this.updateHealthBar();
  }
  updateHealthBar() {
    const healthBarWidth = (this.currentHP / this.maxHP) * 50;
    const healthBarX = this.animate.healthBarTooltip.x; // Store the x position of the health bar
    const healthBarY = this.animate.healthBarTooltip.y; // Store the y position of the health bar
    console.log(healthBarWidth);
    this.animate.healthBarTooltip.clear();
    this.animate.healthBarTooltip.beginFill(0x191d88);
    this.animate.healthBarTooltip.drawRect(0, 0, healthBarWidth, 5);
    this.animate.healthBarTooltip.endFill();
    this.animate.healthBarTooltip.x = healthBarX; // Set the x position of the health bar to the stored value
    this.animate.healthBarTooltip.y = healthBarY; // Set the y position of the health bar to the stored value
    console.log(this.animate.healthBarTooltip);
    console.log("x, y ", healthBarX, healthBarY);
  }
  async loadSprite() {
    await this.animate.loadb();
  }
}

export default Pokemon;
