import basePokemonData from "./pokemon_helper";

class PokemonObject {
  constructor(options) {
    const {
      name,
      displayName,
      categories,
      tier,
      maxHP,
      attack,
      defense,
      specAttack,
      specDefense,
      speed,
      basicAttack,
      move,
      evolution,
      base,
      stage,
      pkmIndex,
      spritePath,
      jsonPath,
    } = options;
    this.name = name;
    this.displayName = displayName;
    this.categories = categories;
    this.tier = tier;
    this.maxHP = maxHP;
    this.attack = attack;
    this.defense = defense;
    this.specAttack = specAttack;
    this.specDefense = specDefense;
    this.speed = speed;
    this.basicAttack = basicAttack;
    this.move = move;
    this.evolution = evolution;
    this.base = base;
    this.stage = stage;
    this.pkmIndex = pkmIndex;
    this.spritePath = spritePath;
    this.jsonPath = jsonPath;
  }

  /**
   * Returns the approximate strength of a Pokemon, for AI logic
   *
   * The math uses `stage * 2.5 + tier`, which looks approximately like this:
   *
   * ```
   *       5   4    3    2   1
   *  3 | 12.| 11.| 10.| 9.| 8.|
   *  2 | 10 | 9  | 8  | 7 | 6 |
   *  1 | 7. | 6. | 5. | 4.| 3.|
   * ```
   *
   * This is pretty close to how most people rate units in a vacuum (for TFT at least)
   */
  getPokemonStrength = () => {
    const { attack, specAttack, tier, stage } = this;
    return attack + specAttack + (stage * 2.5 + tier);
  };
}

export default PokemonObject;
