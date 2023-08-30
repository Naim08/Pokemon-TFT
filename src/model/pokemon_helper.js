import PokemonObject from "./pokemonObject.js";
import {
  ShadowTag as shadowTag,
  BraveBird as braveBird,
  ThunderWave as thunderWave,
  VoltTackle as voltTackle,
  RazorWind as razorWind,
  Twineedle as twineedle,
  Softboiled as softboiled,
  FuryCutter as furyCutter,
  IceShard as iceShard,
  TriAttack as triAttack,
  MagnetPull as magnetPull,
  ZapCannon as zapCannon,
  CottonGuard as cottonGuard,
  QuiverDance as quiverDance,
  DragonRush as dragonRush,
  NightDaze as nightDaze,
  Teleport as teleport,
  DarkestLariat as darkestLariat,
  Clone as clone,
  ShellTrap as shellTrap,
  MeteorMash as meteorMash,
  StoneEdge as stoneEdge,
  VenomDrench as venomDrench,
  EggBarrage as eggBarrage,
  Surf as surf,
  MagmaStorm as magmaStorm,
  TherianQuake as therianQuake,
  PowerSpot as powerSpot,
  CrushGrip as crushGrip,
  DragonDarts as dragonDarts,
  LeechLife as leechLife,
  FrenzyPlant as frenzyPlant,
  DragonDance as dragonDance,
  DarkVoid as darkVoid,
  ShadowBall as shadowBall,
  MudBomb as mudBomb,
  Rollout as rollout,
  KingsShield as kingsShield,
} from "./move.js";

function getEvolution(pokemon, stage) {
  const basePokemon = basePokemonData[pokemon];
  // maxHP and damage scale with Pokemon level
  // stage 1 =x2=> stage 2 =x2=> stage 3
  let multi = 1;
  if (stage === 2) {
    multi = 2;
  }
  if (stage === 3) {
    multi = 4;
  }

  return {
    ...basePokemon,
    base: pokemon,
    // effectively sqrt(baseHP) * 100, but rounded to nearest 50
    // most pokemon max HP will range from 700 (50 base HP) to 1000 (100 base HP)
    maxHP: Math.ceil(2 * Math.sqrt(basePokemon.maxHP) - 1) * 50 * multi,
    // just the raw base attack / specAttack stats
    // most range from 70 to 120
    attack: basePokemon.attack * multi,
    specAttack: basePokemon.specAttack * multi,
    stage,
  };
}

const basePokemonData = {
  litwick: {
    categories: ["fire", "ghost", "sweeper"],
    tier: 2,
    maxHP: 60,
    attack: 55,
    defense: 90,
    specAttack: 145,
    specDefense: 90,
    speed: 80,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "firedart",
        speed: 300,
      },
    },
    move: shadowTag,
  },
  fletchling: {
    categories: ["fire", "flying", "revenge killer"],
    tier: 1,
    maxHP: 78,
    attack: 81,
    defense: 71,
    specAttack: 74,
    specDefense: 69,
    speed: 126,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: braveBird,
  },
  rotomw: {
    categories: ["water", "electric", "utility"],
    tier: 4,
    maxHP: 50,
    attack: 65,
    defense: 107,
    specAttack: 105,
    specDefense: 107,
    speed: 86,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "electricdart",
        speed: 300,
      },
    },
    move: thunderWave,
  },
  pichu: {
    categories: ["electric", "revenge killer"],
    tier: 1,
    maxHP: 60,
    attack: 90,
    defense: 55,
    specAttack: 90,
    specDefense: 80,
    speed: 110,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: voltTackle,
  },
  seedot: {
    categories: ["grass", "dark", "disruptor"],
    tier: 1,
    maxHP: 90,
    attack: 100,
    defense: 60,
    specAttack: 90,
    specDefense: 60,
    speed: 80,
    basicAttack: {
      range: 2,
      stat: "attack",
      projectile: {
        key: "seed",
        speed: 500,
      },
    },
    move: razorWind,
  },
  weedle: {
    categories: ["bug", "poison", "sweeper"],
    tier: 1,
    maxHP: 65,
    attack: 90,
    defense: 40,
    specAttack: 45,
    specDefense: 80,
    speed: 75,
    basicAttack: {
      range: 3,
      stat: "attack",
      projectile: {
        key: "stinger",
        speed: 500,
      },
    },
    move: twineedle,
  },
  happiny: {
    categories: ["normal", "wall"],
    tier: 2,
    maxHP: 255,
    attack: 10,
    defense: 10,
    specAttack: 75,
    specDefense: 135,
    speed: 55,
    basicAttack: {
      range: 2,
      stat: "specAttack",
      projectile: {
        key: "egg",
        speed: 300,
      },
    },
    move: softboiled,
  },
  scyther: {
    categories: ["bug", "steel", "pivot"],
    tier: 4,
    maxHP: 70,
    attack: 130,
    defense: 100,
    specAttack: 65,
    specDefense: 80,
    speed: 65,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: furyCutter,
  },
  magikarp: {
    categories: ["water", "flying", "sweeper"],
    tier: 1,
    maxHP: 95,
    attack: 125,
    defense: 79,
    specAttack: 60,
    specDefense: 100,
    speed: 81,
    // NOTE: Stage 1 Magikarp's basic attack is unusable
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    // NOTE: Stage 1 and 2 Magikarp have no move - only Gyarados has this
    move: dragonDance,
  },
  sneasel: {
    categories: ["ice", "dark", "revenge killer"],
    tier: 4,
    maxHP: 70,
    attack: 120,
    defense: 65,
    specAttack: 45,
    specDefense: 85,
    speed: 125,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: iceShard,
  },
  porygon: {
    categories: ["normal", "wallbreaker"],
    tier: 3,
    maxHP: 85,
    attack: 80,
    defense: 70,
    specAttack: 135,
    specDefense: 75,
    speed: 90,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "tri-attack-projectile",
        speed: 500,
      },
    },
    move: triAttack,
  },
  magnemite: {
    categories: ["electric", "steel", "support"],
    tier: 2,
    maxHP: 70,
    attack: 70,
    defense: 115,
    specAttack: 130,
    specDefense: 90,
    speed: 60,
    basicAttack: {
      range: 1,
      stat: "specAttack",
    },
    move: magnetPull,
  },
  grubbin: {
    categories: ["electric", "bug", "wallbreaker"],
    tier: 1,
    maxHP: 77,
    attack: 70,
    defense: 90,
    specAttack: 145,
    specDefense: 75,
    speed: 43,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "electricdart",
        speed: 300,
      },
    },
    move: zapCannon,
  },
  wooloo: {
    categories: ["normal", "wall"],
    tier: 1,
    maxHP: 72,
    attack: 80,
    defense: 100,
    specAttack: 60,
    specDefense: 90,
    speed: 88,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: cottonGuard,
  },
  larvesta: {
    categories: ["fire", "bug", "sweeper"],
    tier: 3,
    maxHP: 85,
    attack: 60,
    defense: 65,
    specAttack: 135,
    specDefense: 105,
    speed: 100,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "firedart",
        speed: 500,
      },
    },
    move: quiverDance,
  },
  gible: {
    categories: ["dragon", "ground", "bulky attacker"],
    tier: 3,
    maxHP: 108,
    attack: 130,
    defense: 95,
    specAttack: 80,
    specDefense: 85,
    speed: 102,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: dragonRush,
  },
  zorua: {
    categories: ["dark", "revenge killer", "pivot"],
    tier: 3,
    maxHP: 60,
    attack: 105,
    defense: 60,
    specAttack: 120,
    specDefense: 60,
    speed: 105,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: nightDaze,
  },
  abra: {
    categories: ["psychic", "sweeper"],
    tier: 2,
    maxHP: 55,
    attack: 50,
    defense: 45,
    specAttack: 135,
    specDefense: 95,
    speed: 120,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "spoon",
        speed: 300,
      },
    },
    move: teleport,
  },
  litten: {
    categories: ["fire", "dark", "bulky attacker"],
    tier: 2,
    maxHP: 95,
    attack: 115,
    defense: 90,
    specAttack: 80,
    specDefense: 90,
    speed: 60,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: darkestLariat,
  },
  mewtwo: {
    categories: ["psychic", "utility"],
    tier: 5,
    maxHP: 106,
    attack: 110,
    defense: 90,
    specAttack: 154,
    specDefense: 90,
    speed: 130,
    basicAttack: {
      range: 3,
      stat: "specAttack",
    },
    move: clone,
  },
  turtonator: {
    categories: ["fire", "dragon", "wall"],
    tier: 4,
    maxHP: 60,
    attack: 78,
    defense: 135,
    specAttack: 91,
    specDefense: 85,
    speed: 36,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: shellTrap,
  },
  beldum: {
    categories: ["steel", "psychic", "bulky attacker"],
    tier: 3,
    maxHP: 80,
    attack: 135,
    defense: 130,
    specAttack: 95,
    specDefense: 90,
    speed: 70,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: meteorMash,
  },
  zubat: {
    categories: ["poison", "flying", "disruptor"],
    tier: 1,
    maxHP: 85,
    attack: 90,
    defense: 80,
    specAttack: 70,
    specDefense: 80,
    speed: 130,
    basicAttack: {
      range: 2,
      stat: "attack",
      projectile: {
        key: "stinger",
        speed: 700,
      },
    },
    move: leechLife,
  },
  larvitar: {
    categories: ["rock", "dark", "bulky attacker"],
    tier: 3,
    maxHP: 100,
    attack: 134,
    defense: 110,
    specAttack: 95,
    specDefense: 100,
    speed: 61,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: stoneEdge,
  },
  gastly: {
    categories: ["ghost", "poison", "utility"],
    tier: 2,
    maxHP: 60,
    attack: 65,
    defense: 60,
    specAttack: 130,
    specDefense: 75,
    speed: 110,
    basicAttack: {
      range: 1,
      stat: "specAttack",
    },
    move: shadowBall,
  },
  bulbasaur: {
    categories: ["grass", "poison", "wall"],
    tier: 2,
    maxHP: 80,
    attack: 82,
    defense: 83,
    specAttack: 100,
    specDefense: 100,
    speed: 80,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: frenzyPlant,
  },
  darkrai: {
    categories: ["dark", "disruptor"],
    tier: 5,
    maxHP: 70,
    attack: 90,
    defense: 90,
    specAttack: 135,
    specDefense: 90,
    speed: 125,
    basicAttack: {
      range: 3,
      stat: "specAttack",
      projectile: {
        key: "blackhole",
        speed: 500,
      },
    },
    move: darkVoid,
  },
  exeggcute: {
    categories: ["grass", "psychic", "wallbreaker"],
    tier: 3,
    maxHP: 95,
    attack: 95,
    defense: 85,
    specAttack: 125,
    specDefense: 75,
    speed: 55,
    basicAttack: {
      range: 3,
      stat: "attack",
      projectile: {
        key: "egg",
        speed: 300,
      },
    },
    move: eggBarrage,
  },
  lapras: {
    categories: ["water", "ice", "bulky attacker"],
    tier: 4,
    maxHP: 130,
    attack: 85,
    defense: 80,
    specAttack: 85,
    specDefense: 95,
    speed: 60,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: surf,
  },
  mudkip: {
    categories: ["water", "ground", "pivot"],
    tier: 2,
    maxHP: 100,
    attack: 110,
    defense: 90,
    specAttack: 85,
    specDefense: 90,
    speed: 60,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: mudBomb,
  },
  regigigas: {
    categories: [],
    tier: 5,
    // hp, attack, defense, specattack, specdefense also get boosted based on pivot stats
    maxHP: 100,
    attack: 160,
    defense: 110,
    specAttack: 80,
    specDefense: 110,
    speed: 100,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: crushGrip,
  },
  dreepy: {
    categories: ["dragon", "ghost", "revenge killer"],
    tier: 3,
    maxHP: 88,
    attack: 120,
    defense: 75,
    specAttack: 100,
    specDefense: 75,
    speed: 142,
    basicAttack: {
      range: 2,
      stat: "attack",
    },
    move: dragonDarts,
  },
  heatran: {
    categories: ["fire", "steel", "wallbreaker"],
    tier: 5,
    maxHP: 91,
    attack: 90,
    defense: 106,
    specAttack: 130,
    specDefense: 106,
    speed: 77,
    basicAttack: {
      range: 1,
      stat: "specAttack",
    },
    move: magmaStorm,
  },
  landorus: {
    categories: ["ground", "flying", "bulky attacker"],
    tier: 5,
    maxHP: 89,
    attack: 125,
    defense: 90,
    specAttack: 115,
    specDefense: 80,
    speed: 101,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: therianQuake,
  },
  nihilego: {
    categories: ["rock", "poison", "wall"],
    tier: 5,
    maxHP: 109,
    attack: 53,
    defense: 47,
    specAttack: 127,
    specDefense: 131,
    speed: 103,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: venomDrench,
  },
  stonjourner: {
    categories: ["rock", "support"],
    tier: 4,
    maxHP: 100,
    attack: 125,
    defense: 135,
    specAttack: 20,
    specDefense: 20,
    speed: 70,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: powerSpot,
  },
  geodude: {
    categories: ["rock", "ground", "wall"],
    tier: 1,
    maxHP: 80,
    attack: 120,
    defense: 130,
    specAttack: 55,
    specDefense: 65,
    speed: 45,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: rollout,
  },
  honedge: {
    categories: ["steel", "ghost", "sweeper"],
    tier: 3,
    maxHP: 60,
    attack: 50,
    defense: 140,
    specAttack: 50,
    specDefense: 140,
    speed: 60,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: kingsShield,
  },
  // NOT A REAL POKEMON
  // ONLY USED FOR NEUTRAL ROUNDS
  neutral_only_rattata: {
    categories: ["normal"],
    tier: 1,
    maxHP: 20,
    attack: 56,
    defense: 35,
    specAttack: 25,
    specDefense: 35,
    speed: 72,
    basicAttack: {
      range: 1,
      stat: "attack",
    },
    move: {
      displayName: "Tackle",
      type: "passive",
      description: `{{user}} tackles as a normal attack. It's not special or top percentage.`,
      flags: {},
    },
  },
};

/**
 * The raw Pokemon data for all Pokemon, including evolutions.
 * Uses the BasePokemon as a basis
 */
const rawPokemonData = {
  weedle: {
    ...getEvolution("weedle", 1),
    name: "weedle",
    displayName: "Weedle",
    evolution: "kakuna",
  },
  kakuna: {
    ...getEvolution("weedle", 2),
    name: "kakuna",
    displayName: "Kakuna",
    evolution: "beedrill",
  },
  beedrill: {
    ...getEvolution("weedle", 3),
    name: "beedrill",
    displayName: "Beedrill",
  },
  happiny: {
    ...getEvolution("happiny", 1),
    name: "happiny",
    displayName: "Happiny",
    evolution: "chansey",
  },
  chansey: {
    ...getEvolution("happiny", 2),
    name: "chansey",
    displayName: "Chansey",
    evolution: "blissey",
  },
  blissey: {
    ...getEvolution("happiny", 3),
    name: "blissey",
    displayName: "Blissey",
  },
  pichu: {
    ...getEvolution("pichu", 1),
    name: "pichu",
    displayName: "Pichu",
    evolution: "pikachu",
  },
  pikachu: {
    ...getEvolution("pichu", 2),
    name: "pikachu",
    displayName: "Pikachu",
    evolution: "raichu",
  },
  raichu: {
    ...getEvolution("pichu", 3),
    name: "raichu",
    displayName: "Raichu",
  },
  scyther: {
    ...getEvolution("scyther", 1),
    name: "scyther",
    displayName: "Scyther",
    evolution: "scizor-1",
  },
  "scizor-1": {
    ...getEvolution("scyther", 2),
    name: "scizor-1",
    displayName: "Scizor",
    evolution: "scizor-2",
  },
  "scizor-2": {
    ...getEvolution("scyther", 3),
    name: "scizor-2",
    displayName: "Scizor",
  },
  magikarp: {
    ...getEvolution("magikarp", 1),
    basicAttack: {
      range: 1,
      stat: "attack",
      unusable: true,
    },
    move: {
      displayName: "Splash",
      type: "passive",
      description: `{{user}} flops around to no effect at all. It can't attack.`,
      flags: {},
    },
    name: "magikarp",
    displayName: "Magikarp",
    evolution: "magikarp-2",
  },
  "magikarp-2": {
    ...getEvolution("magikarp", 2),
    move: {
      displayName: "Tackle",
      type: "passive",
      description: `{{user}} tackles as a normal attack. It has no move.`,
      flags: {},
    },
    name: "magikarp-2",
    displayName: "Magikarp",
    evolution: "gyarados",
  },
  gyarados: {
    ...getEvolution("magikarp", 3),
    name: "gyarados",
    displayName: "Gyarados",
  },
  porygon: {
    ...getEvolution("porygon", 1),
    name: "porygon",
    displayName: "Porygon",
    evolution: "porygon2",
  },
  porygon2: {
    ...getEvolution("porygon", 2),
    name: "porygon2",
    displayName: "Porygon2",
    evolution: "porygonz",
  },
  porygonz: {
    ...getEvolution("porygon", 3),
    name: "porygonz",
    displayName: "Porygon-Z",
  },
  sneasel: {
    ...getEvolution("sneasel", 1),
    name: "sneasel",
    displayName: "Sneasel",
    evolution: "weavile",
  },
  weavile: {
    ...getEvolution("sneasel", 2),
    name: "weavile",
    displayName: "Weavile",
    evolution: "weavile-2",
  },
  "weavile-2": {
    ...getEvolution("sneasel", 3),
    name: "weavile-2",
    displayName: "Weavile",
  },
  seedot: {
    ...getEvolution("seedot", 1),
    name: "seedot",
    displayName: "Seedot",
    evolution: "nuzleaf",
  },
  nuzleaf: {
    ...getEvolution("seedot", 2),
    name: "nuzleaf",
    displayName: "Nuzleaf",
    evolution: "shiftry",
  },
  shiftry: {
    ...getEvolution("seedot", 3),
    name: "shiftry",
    displayName: "Shiftry",
  },
  litwick: {
    ...getEvolution("litwick", 1),
    name: "litwick",
    displayName: "Litwick",
    evolution: "lampent",
  },
  lampent: {
    ...getEvolution("litwick", 2),
    name: "lampent",
    displayName: "Lampent",
    evolution: "chandelure",
  },
  chandelure: {
    ...getEvolution("litwick", 3),
    name: "chandelure",
    displayName: "Chandelure",
  },
  fletchling: {
    ...getEvolution("fletchling", 1),
    name: "fletchling",
    displayName: "Fletchling",
    evolution: "fletchinder",
  },
  fletchinder: {
    ...getEvolution("fletchling", 2),
    name: "fletchinder",
    displayName: "Fletchinder",
    evolution: "talonflame",
  },
  talonflame: {
    ...getEvolution("fletchling", 3),
    name: "talonflame",
    displayName: "Talonflame",
  },
  rotomw: {
    ...getEvolution("rotomw", 1),
    name: "rotomw",
    displayName: "Rotom Wash",
    evolution: "rotomw-2",
  },
  "rotomw-2": {
    ...getEvolution("rotomw", 2),
    name: "rotomw-2",
    displayName: "Rotom Wash",
    evolution: "rotomw-3",
  },
  "rotomw-3": {
    ...getEvolution("rotomw", 3),
    name: "rotomw-3",
    displayName: "Rotom Wash",
  },
  magnemite: {
    ...getEvolution("magnemite", 1),
    name: "magnemite",
    displayName: "Magnemite",
    evolution: "magneton",
  },
  magneton: {
    ...getEvolution("magnemite", 2),
    name: "magneton",
    displayName: "Magneton",
    evolution: "magnezone",
  },
  magnezone: {
    ...getEvolution("magnemite", 3),
    name: "magnezone",
    displayName: "Magnezone",
  },
  grubbin: {
    ...getEvolution("grubbin", 1),
    name: "grubbin",
    displayName: "Grubbin",
    evolution: "charjabug",
  },
  charjabug: {
    ...getEvolution("grubbin", 2),
    name: "charjabug",
    displayName: "Charjabug",
    evolution: "vikavolt",
  },
  vikavolt: {
    ...getEvolution("grubbin", 3),
    name: "vikavolt",
    displayName: "Vikavolt",
  },
  wooloo: {
    ...getEvolution("wooloo", 1),
    name: "wooloo",
    displayName: "Wooloo",
    evolution: "dubwool",
  },
  dubwool: {
    ...getEvolution("wooloo", 2),
    name: "dubwool",
    displayName: "Dubwool",
    evolution: "dubwool-2",
  },
  "dubwool-2": {
    ...getEvolution("wooloo", 3),
    name: "dubwool-2",
    displayName: "Dubwool",
  },
  larvesta: {
    ...getEvolution("larvesta", 1),
    name: "larvesta",
    displayName: "Larvesta",
    evolution: "volcarona",
  },
  volcarona: {
    ...getEvolution("larvesta", 2),
    name: "volcarona",
    displayName: "Volcarona",
    evolution: "volcarona-2",
  },
  "volcarona-2": {
    ...getEvolution("larvesta", 2),
    name: "volcarona-2",
    displayName: "Volcarona",
  },
  gible: {
    ...getEvolution("gible", 1),
    name: "gible",
    displayName: "Gible",
    evolution: "gabite",
  },
  gabite: {
    ...getEvolution("gible", 2),
    name: "gabite",
    displayName: "Gabite",
    evolution: "garchomp",
  },
  garchomp: {
    ...getEvolution("gible", 3),
    name: "garchomp",
    displayName: "Garchomp",
  },
  zorua: {
    ...getEvolution("zorua", 1),
    name: "zorua",
    displayName: "Zorua",
    evolution: "zorua-2",
  },
  "zorua-2": {
    ...getEvolution("zorua", 2),
    name: "zorua-2",
    displayName: "Zorua",
    evolution: "zoroark",
  },
  zoroark: {
    ...getEvolution("zorua", 3),
    name: "zoroark",
    displayName: "Zoroark",
  },
  abra: {
    ...getEvolution("abra", 1),
    name: "abra",
    displayName: "Abra",
    evolution: "kadabra",
  },
  kadabra: {
    ...getEvolution("abra", 2),
    name: "kadabra",
    displayName: "Kadabra",
    evolution: "alakazam",
  },
  alakazam: {
    ...getEvolution("abra", 3),
    name: "alakazam",
    displayName: "Alakazam",
  },
  litten: {
    ...getEvolution("litten", 1),
    name: "litten",
    displayName: "Litten",
    evolution: "torracat",
  },
  torracat: {
    ...getEvolution("litten", 2),
    name: "torracat",
    displayName: "Torracat",
    evolution: "incineroar",
  },
  incineroar: {
    ...getEvolution("litten", 3),
    name: "incineroar",
    displayName: "Incineroar",
  },
  mewtwo: {
    ...getEvolution("mewtwo", 1),
    name: "mewtwo",
    displayName: "Mewtwo",
    evolution: "mewtwo-2",
  },
  "mewtwo-2": {
    ...getEvolution("mewtwo", 2),
    name: "mewtwo-2",
    displayName: "Mewtwo",
    evolution: "mewtwo-3",
  },
  "mewtwo-3": {
    ...getEvolution("mewtwo", 3),
    name: "mewtwo-3",
    displayName: "Mewtwo",
  },
  turtonator: {
    ...getEvolution("turtonator", 1),
    name: "turtonator",
    displayName: "Turtonator",
    evolution: "turtonator-2",
  },
  "turtonator-2": {
    ...getEvolution("turtonator", 2),
    name: "turtonator-2",
    displayName: "Turtonator",
    evolution: "turtonator-3",
  },
  "turtonator-3": {
    ...getEvolution("turtonator", 3),
    name: "turtonator-3",
    displayName: "Turtonator",
  },
  beldum: {
    ...getEvolution("beldum", 1),
    name: "beldum",
    displayName: "Beldum",
    evolution: "metang",
  },
  metang: {
    ...getEvolution("beldum", 2),
    name: "metang",
    displayName: "Beldum",
    evolution: "metagross",
  },
  metagross: {
    ...getEvolution("beldum", 3),
    name: "metagross",
    displayName: "Metagross",
  },
  zubat: {
    ...getEvolution("zubat", 1),
    name: "zubat",
    displayName: "Zubat",
    evolution: "golbat",
  },
  golbat: {
    ...getEvolution("zubat", 2),
    name: "golbat",
    displayName: "Golbat",
    evolution: "crobat",
  },
  crobat: {
    ...getEvolution("zubat", 3),
    name: "crobat",
    displayName: "Crobat",
  },
  larvitar: {
    ...getEvolution("larvitar", 1),
    name: "larvitar",
    displayName: "Larvitar",
    evolution: "pupitar",
  },
  pupitar: {
    ...getEvolution("larvitar", 2),
    name: "pupitar",
    displayName: "Pupitar",
    evolution: "tyranitar",
  },
  tyranitar: {
    ...getEvolution("larvitar", 3),
    name: "tyranitar",
    displayName: "Tyranitar",
  },
  gastly: {
    ...getEvolution("gastly", 1),
    name: "gastly",
    displayName: "Gastly",
    evolution: "haunter",
  },
  haunter: {
    ...getEvolution("gastly", 2),
    name: "haunter",
    displayName: "Haunter",
    evolution: "gengar",
  },
  gengar: {
    ...getEvolution("gastly", 3),
    name: "gengar",
    displayName: "Gengar",
  },
  bulbasaur: {
    ...getEvolution("bulbasaur", 1),
    name: "bulbasaur",
    displayName: "Bulbasaur",
    evolution: "ivysaur",
  },
  ivysaur: {
    ...getEvolution("bulbasaur", 2),
    name: "ivysaur",
    displayName: "Ivysaur",
    evolution: "venusaur",
  },
  venusaur: {
    ...getEvolution("bulbasaur", 3),
    name: "venusaur",
    displayName: "Venusaur",
  },
  // the plant from bulbasaur line's move uses bulbasaur base stats
  frenzyplant: {
    ...getEvolution("bulbasaur", 1),
    name: "frenzyplant",
    displayName: "Frenzy Plant",
    move: undefined,
    basicAttack: {
      range: 2,
      stat: "specAttack",
      projectile: {
        key: "seed",
        speed: 500,
      },
    },
    // override stage so it doesn't appear in the shop
    stage: 2,
  },
  darkrai: {
    ...getEvolution("darkrai", 1),
    name: "darkrai",
    displayName: "Darkrai",
    evolution: "darkrai-2",
  },
  "darkrai-2": {
    ...getEvolution("darkrai", 2),
    name: "darkrai-2",
    displayName: "Darkrai",
    evolution: "darkrai-3",
  },
  "darkrai-3": {
    ...getEvolution("darkrai", 3),
    name: "darkrai-3",
    displayName: "Darkrai",
  },
  exeggcute: {
    ...getEvolution("exeggcute", 1),
    name: "exeggcute",
    displayName: "Exeggcute",
    evolution: "exeggutor",
  },
  exeggutor: {
    ...getEvolution("exeggcute", 2),
    name: "exeggutor",
    displayName: "Exeggutor",
    evolution: "exeggutor-2",
  },
  "exeggutor-2": {
    ...getEvolution("exeggcute", 2),
    name: "exeggutor-2",
    displayName: "Exeggutor",
  },
  lapras: {
    ...getEvolution("lapras", 1),
    name: "lapras",
    displayName: "Lapras",
    evolution: "lapras-2",
  },
  "lapras-2": {
    ...getEvolution("lapras", 2),
    name: "lapras-2",
    displayName: "Lapras",
    evolution: "lapras-3",
  },
  "lapras-3": {
    ...getEvolution("lapras", 3),
    name: "lapras-3",
    displayName: "Lapras",
  },
  mudkip: {
    ...getEvolution("mudkip", 1),
    name: "mudkip",
    displayName: "Mudkip",
    evolution: "marshtomp",
  },
  marshtomp: {
    ...getEvolution("mudkip", 2),
    name: "marshtomp",
    displayName: "Marshtomp",
    evolution: "swampert",
  },
  swampert: {
    ...getEvolution("mudkip", 3),
    name: "swampert",
    displayName: "Swampert",
  },
  // the mech from the pivot synergy
  regigigas: {
    ...getEvolution("regigigas", 1),
    name: "regigigas",
    displayName: "Regigigas",
    stage: 3,
  },
  dreepy: {
    ...getEvolution("dreepy", 1),
    name: "dreepy",
    displayName: "Dreepy",
    evolution: "drakloak",
  },
  drakloak: {
    ...getEvolution("dreepy", 2),
    name: "drakloak",
    displayName: "Drakloak",
    evolution: "dragapult",
  },
  dragapult: {
    ...getEvolution("dreepy", 3),
    name: "dragapult",
    displayName: "Dragapult",
  },
  heatran: {
    ...getEvolution("heatran", 1),
    name: "heatran",
    displayName: "Heatran",
    evolution: "heatran-2",
  },
  "heatran-2": {
    ...getEvolution("heatran", 2),
    name: "heatran-2",
    displayName: "Heatran",
    evolution: "heatran-3",
  },
  "heatran-3": {
    ...getEvolution("heatran", 3),
    name: "heatran-3",
    displayName: "Heatran",
  },
  landorus: {
    ...getEvolution("landorus", 1),
    name: "landorus",
    displayName: "Landorus",
    evolution: "landorus-2",
  },
  "landorus-2": {
    ...getEvolution("landorus", 2),
    name: "landorus-2",
    displayName: "Landorus",
    evolution: "landorus-3",
  },
  "landorus-3": {
    ...getEvolution("landorus", 3),
    name: "landorus-3",
    displayName: "Landorus",
  },
  // not actually used - just here so the landorustherian texture gets loaded properly.
  landorustherian: {
    ...getEvolution("landorus", 3),
    name: "landorustherian",
    displayName: "Landorus-Therian",
  },
  nihilego: {
    ...getEvolution("nihilego", 1),
    name: "nihilego",
    displayName: "Nihilego",
    evolution: "nihilego-2",
  },
  "nihilego-2": {
    ...getEvolution("nihilego", 2),
    name: "nihilego-2",
    displayName: "Nihilego",
    evolution: "nihilego-3",
  },
  "nihilego-3": {
    ...getEvolution("nihilego", 3),
    name: "nihilego-3",
    displayName: "Nihilego",
  },
  stonjourner: {
    ...getEvolution("stonjourner", 1),
    name: "stonjourner",
    displayName: "Stonjourner",
    evolution: "stonjourner-2",
  },
  "stonjourner-2": {
    ...getEvolution("stonjourner", 2),
    name: "stonjourner-2",
    displayName: "Stonjourner",
    evolution: "stonjourner-3",
  },
  "stonjourner-3": {
    ...getEvolution("stonjourner", 3),
    name: "stonjourner-3",
    displayName: "Stonjourner",
  },
  geodude: {
    ...getEvolution("geodude", 1),
    name: "geodude",
    displayName: "Geodude",
    evolution: "graveler",
  },
  graveler: {
    ...getEvolution("geodude", 2),
    name: "graveler",
    displayName: "Graveler",
    evolution: "golem",
  },
  golem: {
    ...getEvolution("geodude", 3),
    name: "golem",
    displayName: "Golem",
  },
  honedge: {
    ...getEvolution("honedge", 1),
    name: "honedge",
    displayName: "Honedge",
    evolution: "doublade",
  },
  doublade: {
    ...getEvolution("honedge", 2),
    name: "doublade",
    displayName: "Doublade",
    evolution: "aegislash",
  },
  aegislash: {
    ...getEvolution("honedge", 3),
    name: "aegislash",
    displayName: "Aegislash",
  },
  // not actually used - just here so the aegislashshield texture gets loaded properly.
  aegislashshield: {
    ...getEvolution("honedge", 3),
    name: "aegislashshield",
    displayName: "Aegislash-Shield",
  },
  neutral_only_rattata: {
    ...getEvolution("neutral_only_rattata", 1),
    name: "neutral_only_rattata",
    displayName: "Rattata",
    stage: 2,
  },
};

//  getEvolution(pokemon, stage) {
//     const basePokemon = basePokemonData[pokemon];
//     // maxHP and damage scale with Pokemon level
//     // stage 1 =x2=> stage 2 =x2=> stage 3
//     let multi = 1;
//     if (stage === 2) {
//       multi = 2;
//     }
//     if (stage === 3) {
//       multi = 4;
//     }

//     return {
//       ...basePokemon,
//       base: pokemon,
//       // effectively sqrt(baseHP) * 100, but rounded to nearest 50
//       // most pokemon max HP will range from 700 (50 base HP) to 1000 (100 base HP)
//       maxHP: Math.ceil(2 * Math.sqrt(basePokemon.maxHP) - 1) * 50 * multi,
//       // just the raw base attack / specAttack stats
//       // most range from 70 to 120
//       attack: basePokemon.attack * multi,
//       specAttack: basePokemon.specAttack * multi,
//       stage,
//     };
//   }

export const allPokemonNames = Object.keys(rawPokemonData);

// use Object.fromEntries to convert the array of entries into an object
// each rawPokemmonData is an object which should map

var Pkm;
(function (Pkm) {
  Pkm["DEFAULT"] = "DEFAULT";
  Pkm["EGG"] = "EGG";
  Pkm["DITTO"] = "DITTO";
  Pkm["BULBASAUR"] = "BULBASAUR";
  Pkm["IVYSAUR"] = "IVYSAUR";
  Pkm["VENUSAUR"] = "VENUSAUR";
  Pkm["CHARMANDER"] = "CHARMANDER";
  Pkm["CHARMELEON"] = "CHARMELEON";
  Pkm["CHARIZARD"] = "CHARIZARD";
  Pkm["SQUIRTLE"] = "SQUIRTLE";
  Pkm["WARTORTLE"] = "WARTORTLE";
  Pkm["BLASTOISE"] = "BLASTOISE";
  Pkm["GEODUDE"] = "GEODUDE";
  Pkm["GRAVELER"] = "GRAVELER";
  Pkm["GOLEM"] = "GOLEM";
  Pkm["AZURILL"] = "AZURILL";
  Pkm["MARILL"] = "MARILL";
  Pkm["AZUMARILL"] = "AZUMARILL";
  Pkm["ZUBAT"] = "ZUBAT";
  Pkm["GOLBAT"] = "GOLBAT";
  Pkm["CROBAT"] = "CROBAT";
  Pkm["MAREEP"] = "MAREEP";
  Pkm["FLAFFY"] = "FLAFFY";
  Pkm["AMPHAROS"] = "AMPHAROS";
  Pkm["CLEFFA"] = "CLEFFA";
  Pkm["CLEFAIRY"] = "CLEFAIRY";
  Pkm["CLEFABLE"] = "CLEFABLE";
  Pkm["IGGLYBUFF"] = "IGGLYBUFF";
  Pkm["WIGGLYTUFF"] = "WIGGLYTUFF";
  Pkm["JIGGLYPUFF"] = "JIGGLYPUFF";
  Pkm["CATERPIE"] = "CATERPIE";
  Pkm["METAPOD"] = "METAPOD";
  Pkm["BUTTERFREE"] = "BUTTERFREE";
  Pkm["WEEDLE"] = "WEEDLE";
  Pkm["KAKUNA"] = "KAKUNA";
  Pkm["BEEDRILL"] = "BEEDRILL";
  Pkm["PIDGEY"] = "PIDGEY";
  Pkm["PIDGEOTTO"] = "PIDGEOTTO";
  Pkm["PIDGEOT"] = "PIDGEOT";
  Pkm["HOPPIP"] = "HOPPIP";
  Pkm["SKIPLOOM"] = "SKIPLOOM";
  Pkm["JUMPLUFF"] = "JUMPLUFF";
  Pkm["SEEDOT"] = "SEEDOT";
  Pkm["NUZLEAF"] = "NUZLEAF";
  Pkm["SHIFTRY"] = "SHIFTRY";
  Pkm["STARLY"] = "STARLY";
  Pkm["STARAVIA"] = "STARAVIA";
  Pkm["STARAPTOR"] = "STARAPTOR";
  Pkm["CHIKORITA"] = "CHIKORITA";
  Pkm["BAYLEEF"] = "BAYLEEF";
  Pkm["MEGANIUM"] = "MEGANIUM";
  Pkm["CYNDAQUIL"] = "CYNDAQUIL";
  Pkm["QUILAVA"] = "QUILAVA";
  Pkm["TYPHLOSION"] = "TYPHLOSION";
  Pkm["TOTODILE"] = "TOTODILE";
  Pkm["CROCONAW"] = "CROCONAW";
  Pkm["FERALIGATR"] = "FERALIGATR";
  Pkm["TREECKO"] = "TREECKO";
  Pkm["GROVYLE"] = "GROVYLE";
  Pkm["SCEPTILE"] = "SCEPTILE";
  Pkm["TORCHIC"] = "TORCHIC";
  Pkm["COMBUSKEN"] = "COMBUSKEN";
  Pkm["BLAZIKEN"] = "BLAZIKEN";
  Pkm["MUDKIP"] = "MUDKIP";
  Pkm["MARSHTOMP"] = "MARSHTOMP";
  Pkm["SWAMPERT"] = "SWAMPERT";
  Pkm["TURTWIG"] = "TURTWIG";
  Pkm["GROTLE"] = "GROTLE";
  Pkm["TORTERRA"] = "TORTERRA";
  Pkm["CHIMCHAR"] = "CHIMCHAR";
  Pkm["MONFERNO"] = "MONFERNO";
  Pkm["INFERNAPE"] = "INFERNAPE";
  Pkm["PIPLUP"] = "PIPLUP";
  Pkm["PRINPLUP"] = "PRINPLUP";
  Pkm["EMPOLEON"] = "EMPOLEON";
  Pkm["NIDORANF"] = "NIDORANF";
  Pkm["NIDORINA"] = "NIDORINA";
  Pkm["NIDOQUEEN"] = "NIDOQUEEN";
  Pkm["NIDORANM"] = "NIDORANM";
  Pkm["NIDORINO"] = "NIDORINO";
  Pkm["NIDOKING"] = "NIDOKING";
  Pkm["PICHU"] = "PICHU";
  Pkm["PIKACHU"] = "PIKACHU";
  Pkm["RAICHU"] = "RAICHU";
  Pkm["MACHOP"] = "MACHOP";
  Pkm["MACHOKE"] = "MACHOKE";
  Pkm["MACHAMP"] = "MACHAMP";
  Pkm["HORSEA"] = "HORSEA";
  Pkm["SEADRA"] = "SEADRA";
  Pkm["KINGDRA"] = "KINGDRA";
  Pkm["TRAPINCH"] = "TRAPINCH";
  Pkm["VIBRAVA"] = "VIBRAVA";
  Pkm["FLYGON"] = "FLYGON";
  Pkm["SPHEAL"] = "SPHEAL";
  Pkm["SEALEO"] = "SEALEO";
  Pkm["WALREIN"] = "WALREIN";
  Pkm["ARON"] = "ARON";
  Pkm["LAIRON"] = "LAIRON";
  Pkm["AGGRON"] = "AGGRON";
  Pkm["MAGNEMITE"] = "MAGNEMITE";
  Pkm["MAGNETON"] = "MAGNETON";
  Pkm["MAGNEZONE"] = "MAGNEZONE";
  Pkm["RHYHORN"] = "RHYHORN";
  Pkm["RHYDON"] = "RHYDON";
  Pkm["RHYPERIOR"] = "RHYPERIOR";
  Pkm["TOGEPI"] = "TOGEPI";
  Pkm["TOGETIC"] = "TOGETIC";
  Pkm["TOGEKISS"] = "TOGEKISS";
  Pkm["DUSKULL"] = "DUSKULL";
  Pkm["DUSCLOPS"] = "DUSCLOPS";
  Pkm["DUSKNOIR"] = "DUSKNOIR";
  Pkm["LOTAD"] = "LOTAD";
  Pkm["LOMBRE"] = "LOMBRE";
  Pkm["LUDICOLO"] = "LUDICOLO";
  Pkm["SHINX"] = "SHINX";
  Pkm["LUXIO"] = "LUXIO";
  Pkm["LUXRAY"] = "LUXRAY";
  Pkm["POLIWAG"] = "POLIWAG";
  Pkm["POLIWHIRL"] = "POLIWHIRL";
  Pkm["POLITOED"] = "POLITOED";
  Pkm["POLIWRATH"] = "POLIWRATH";
  Pkm["ABRA"] = "ABRA";
  Pkm["KADABRA"] = "KADABRA";
  Pkm["ALAKAZAM"] = "ALAKAZAM";
  Pkm["GASTLY"] = "GASTLY";
  Pkm["HAUNTER"] = "HAUNTER";
  Pkm["GENGAR"] = "GENGAR";
  Pkm["DRATINI"] = "DRATINI";
  Pkm["DRAGONAIR"] = "DRAGONAIR";
  Pkm["DRAGONITE"] = "DRAGONITE";
  Pkm["LARVITAR"] = "LARVITAR";
  Pkm["PUPITAR"] = "PUPITAR";
  Pkm["TYRANITAR"] = "TYRANITAR";
  Pkm["SLAKOTH"] = "SLAKOTH";
  Pkm["VIGOROTH"] = "VIGOROTH";
  Pkm["SLAKING"] = "SLAKING";
  Pkm["RALTS"] = "RALTS";
  Pkm["KIRLIA"] = "KIRLIA";
  Pkm["GARDEVOIR"] = "GARDEVOIR";
  Pkm["BAGON"] = "BAGON";
  Pkm["SHELGON"] = "SHELGON";
  Pkm["SALAMENCE"] = "SALAMENCE";
  Pkm["BELDUM"] = "BELDUM";
  Pkm["METANG"] = "METANG";
  Pkm["METAGROSS"] = "METAGROSS";
  Pkm["GIBLE"] = "GIBLE";
  Pkm["GABITE"] = "GABITE";
  Pkm["GARCHOMP"] = "GARCHOMP";
  Pkm["ELEKID"] = "ELEKID";
  Pkm["ELECTABUZZ"] = "ELECTABUZZ";
  Pkm["ELECTIVIRE"] = "ELECTIVIRE";
  Pkm["MAGBY"] = "MAGBY";
  Pkm["MAGMAR"] = "MAGMAR";
  Pkm["MAGMORTAR"] = "MAGMORTAR";
  Pkm["MUNCHLAX"] = "MUNCHLAX";
  Pkm["SNORLAX"] = "SNORLAX";
  Pkm["GROWLITHE"] = "GROWLITHE";
  Pkm["ARCANINE"] = "ARCANINE";
  Pkm["ONIX"] = "ONIX";
  Pkm["STEELIX"] = "STEELIX";
  Pkm["MEGA_STEELIX"] = "MEGA_STEELIX";
  Pkm["SCYTHER"] = "SCYTHER";
  Pkm["SCIZOR"] = "SCIZOR";
  Pkm["MEGA_SCIZOR"] = "MEGA_SCIZOR";
  Pkm["RIOLU"] = "RIOLU";
  Pkm["LUCARIO"] = "LUCARIO";
  Pkm["MEGA_LUCARIO"] = "MEGA_LUCARIO";
  Pkm["MAGIKARP"] = "MAGIKARP";
  Pkm["RATTATA"] = "RATTATA";
  Pkm["RATICATE"] = "RATICATE";
  Pkm["SPEAROW"] = "SPEAROW";
  Pkm["FEAROW"] = "FEAROW";
  Pkm["GYARADOS"] = "GYARADOS";
  Pkm["LUGIA"] = "LUGIA";
  Pkm["GIRATINA"] = "GIRATINA";
  Pkm["ZAPDOS"] = "ZAPDOS";
  Pkm["MOLTRES"] = "MOLTRES";
  Pkm["ARTICUNO"] = "ARTICUNO";
  Pkm["DIALGA"] = "DIALGA";
  Pkm["PALKIA"] = "PALKIA";
  Pkm["SUICUNE"] = "SUICUNE";
  Pkm["RAIKOU"] = "RAIKOU";
  Pkm["ENTEI"] = "ENTEI";
  Pkm["REGICE"] = "REGICE";
  Pkm["REGIROCK"] = "REGIROCK";
  Pkm["REGISTEEL"] = "REGISTEEL";
  Pkm["KYOGRE"] = "KYOGRE";
  Pkm["GROUDON"] = "GROUDON";
  Pkm["RAYQUAZA"] = "RAYQUAZA";
  Pkm["REGIGIGAS"] = "REGIGIGAS";
  Pkm["EEVEE"] = "EEVEE";
  Pkm["VAPOREON"] = "VAPOREON";
  Pkm["JOLTEON"] = "JOLTEON";
  Pkm["FLAREON"] = "FLAREON";
  Pkm["ESPEON"] = "ESPEON";
  Pkm["UMBREON"] = "UMBREON";
  Pkm["LEAFEON"] = "LEAFEON";
  Pkm["SYLVEON"] = "SYLVEON";
  Pkm["MEDITITE"] = "MEDITITE";
  Pkm["MEDICHAM"] = "MEDICHAM";
  Pkm["MEGA_MEDICHAM"] = "MEGA_MEDICHAM";
  Pkm["NUMEL"] = "NUMEL";
  Pkm["CAMERUPT"] = "CAMERUPT";
  Pkm["MEGA_CAMERUPT"] = "MEGA_CAMERUPT";
  Pkm["DARKRAI"] = "DARKRAI";
  Pkm["LITWICK"] = "LITWICK";
  Pkm["LAMPENT"] = "LAMPENT";
  Pkm["CHANDELURE"] = "CHANDELURE";
  Pkm["SLOWPOKE"] = "SLOWPOKE";
  Pkm["SLOWBRO"] = "SLOWBRO";
  Pkm["SLOWKING"] = "SLOWKING";
  Pkm["BELLSPROUT"] = "BELLSPROUT";
  Pkm["WEEPINBELL"] = "WEEPINBELL";
  Pkm["VICTREEBEL"] = "VICTREEBEL";
  Pkm["SWINUB"] = "SWINUB";
  Pkm["PILOSWINE"] = "PILOSWINE";
  Pkm["MAMOSWINE"] = "MAMOSWINE";
  Pkm["SNORUNT"] = "SNORUNT";
  Pkm["GLALIE"] = "GLALIE";
  Pkm["FROSLASS"] = "FROSLASS";
  Pkm["SNOVER"] = "SNOVER";
  Pkm["ABOMASNOW"] = "ABOMASNOW";
  Pkm["MEGA_ABOMASNOW"] = "MEGA_ABOMASNOW";
  Pkm["VANILLITE"] = "VANILLITE";
  Pkm["VANILLISH"] = "VANILLISH";
  Pkm["VANILLUXE"] = "VANILLUXE";
  Pkm["GLACEON"] = "GLACEON";
  Pkm["VOLCARONA"] = "VOLCARONA";
  Pkm["LANDORUS"] = "LANDORUS";
  Pkm["THUNDURUS"] = "THUNDURUS";
  Pkm["TORNADUS"] = "TORNADUS";
  Pkm["KELDEO"] = "KELDEO";
  Pkm["TERRAKION"] = "TERRAKION";
  Pkm["VIRIZION"] = "VIRIZION";
  Pkm["COBALION"] = "COBALION";
  Pkm["MANAPHY"] = "MANAPHY";
  Pkm["ROTOM"] = "ROTOM";
  Pkm["SPIRITOMB"] = "SPIRITOMB";
  Pkm["ABSOL"] = "ABSOL";
  Pkm["LAPRAS"] = "LAPRAS";
  Pkm["LATIAS"] = "LATIAS";
  Pkm["LATIOS"] = "LATIOS";
  Pkm["MESPRIT"] = "MESPRIT";
  Pkm["AZELF"] = "AZELF";
  Pkm["UXIE"] = "UXIE";
  Pkm["MEWTWO"] = "MEWTWO";
  Pkm["KYUREM"] = "KYUREM";
  Pkm["RESHIRAM"] = "RESHIRAM";
  Pkm["ZEKROM"] = "ZEKROM";
  Pkm["CELEBI"] = "CELEBI";
  Pkm["VICTINI"] = "VICTINI";
  Pkm["JIRACHI"] = "JIRACHI";
  Pkm["ARCEUS"] = "ARCEUS";
  Pkm["DEOXYS"] = "DEOXYS";
  Pkm["SHAYMIN"] = "SHAYMIN";
  Pkm["CRESSELIA"] = "CRESSELIA";
  Pkm["HEATRAN"] = "HEATRAN";
  Pkm["HO_OH"] = "HO_OH";
  Pkm["AERODACTYL"] = "AERODACTYL";
  Pkm["PRIMAL_KYOGRE"] = "PRIMAL_KYOGRE";
  Pkm["PRIMAL_GROUDON"] = "PRIMAL_GROUDON";
  Pkm["MEOWTH"] = "MEOWTH";
  Pkm["PERSIAN"] = "PERSIAN";
  Pkm["DEINO"] = "DEINO";
  Pkm["ZWEILOUS"] = "ZWEILOUS";
  Pkm["HYDREIGON"] = "HYDREIGON";
  Pkm["SANDILE"] = "SANDILE";
  Pkm["KROKOROK"] = "KROKOROK";
  Pkm["KROOKODILE"] = "KROOKODILE";
  Pkm["SOLOSIS"] = "SOLOSIS";
  Pkm["DUOSION"] = "DUOSION";
  Pkm["REUNICLUS"] = "REUNICLUS";
  Pkm["MEGA_RAYQUAZA"] = "MEGA_RAYQUAZA";
  Pkm["SWABLU"] = "SWABLU";
  Pkm["ODDISH"] = "ODDISH";
  Pkm["GLOOM"] = "GLOOM";
  Pkm["VILEPLUME"] = "VILEPLUME";
  Pkm["BELLOSSOM"] = "BELLOSSOM";
  Pkm["AMAURA"] = "AMAURA";
  Pkm["AURORUS"] = "AURORUS";
  Pkm["ANORITH"] = "ANORITH";
  Pkm["ARMALDO"] = "ARMALDO";
  Pkm["ARCHEN"] = "ARCHEN";
  Pkm["ARCHEOPS"] = "ARCHEOPS";
  Pkm["SHIELDON"] = "SHIELDON";
  Pkm["BASTIODON"] = "BASTIODON";
  Pkm["TIRTOUGA"] = "TIRTOUGA";
  Pkm["CARRACOSTA"] = "CARRACOSTA";
  Pkm["LILEEP"] = "LILEEP";
  Pkm["CRADILY"] = "CRADILY";
  Pkm["CRANIDOS"] = "CRANIDOS";
  Pkm["RAMPARDOS"] = "RAMPARDOS";
  Pkm["KABUTO"] = "KABUTO";
  Pkm["KABUTOPS"] = "KABUTOPS";
  Pkm["OMANYTE"] = "OMANYTE";
  Pkm["OMASTAR"] = "OMASTAR";
  Pkm["TYRUNT"] = "TYRUNT";
  Pkm["TYRANTRUM"] = "TYRANTRUM";
  Pkm["BUDEW"] = "BUDEW";
  Pkm["ROSELIA"] = "ROSELIA";
  Pkm["ROSERADE"] = "ROSERADE";
  Pkm["BUNEARY"] = "BUNEARY";
  Pkm["LOPUNNY"] = "LOPUNNY";
  Pkm["MEGA_LOPUNNY"] = "MEGA_LOPUNNY";
  Pkm["AXEW"] = "AXEW";
  Pkm["FRAXURE"] = "FRAXURE";
  Pkm["HAXORUS"] = "HAXORUS";
  Pkm["VENIPEDE"] = "VENIPEDE";
  Pkm["WHIRLIPEDE"] = "WHIRLIPEDE";
  Pkm["SCOLIPEDE"] = "SCOLIPEDE";
  Pkm["PORYGON"] = "PORYGON";
  Pkm["PORYGON_2"] = "PORYGON_2";
  Pkm["PORYGON_Z"] = "PORYGON_Z";
  Pkm["ELECTRIKE"] = "ELECTRIKE";
  Pkm["MANECTRIC"] = "MANECTRIC";
  Pkm["MEGA_MANECTRIC"] = "MEGA_MANECTRIC";
  Pkm["SHUPPET"] = "SHUPPET";
  Pkm["BANETTE"] = "BANETTE";
  Pkm["MEGA_BANETTE"] = "MEGA_BANETTE";
  Pkm["HONEDGE"] = "HONEDGE";
  Pkm["DOUBLADE"] = "DOUBLADE";
  Pkm["AEGISLASH"] = "AEGISLASH";
  Pkm["CUBONE"] = "CUBONE";
  Pkm["MAROWAK"] = "MAROWAK";
  Pkm["ALOLAN_MAROWAK"] = "ALOLAN_MAROWAK";
  Pkm["WHISMUR"] = "WHISMUR";
  Pkm["LOUDRED"] = "LOUDRED";
  Pkm["EXPLOUD"] = "EXPLOUD";
  Pkm["TYMPOLE"] = "TYMPOLE";
  Pkm["PALPITOAD"] = "PALPITOAD";
  Pkm["SEISMITOAD"] = "SEISMITOAD";
  Pkm["SEWADDLE"] = "SEWADDLE";
  Pkm["SWADLOON"] = "SWADLOON";
  Pkm["LEAVANNY"] = "LEAVANNY";
  Pkm["PIKIPEK"] = "PIKIPEK";
  Pkm["TRUMBEAK"] = "TRUMBEAK";
  Pkm["TOUCANNON"] = "TOUCANNON";
  Pkm["FLABEBE"] = "FLABEBE";
  Pkm["FLOETTE"] = "FLOETTE";
  Pkm["FLORGES"] = "FLORGES";
  Pkm["JANGMO_O"] = "JANGMO_O";
  Pkm["HAKAMO_O"] = "HAKAMO_O";
  Pkm["KOMMO_O"] = "KOMMO_O";
  Pkm["MELOETTA"] = "MELOETTA";
  Pkm["ALTARIA"] = "ALTARIA";
  Pkm["MEGA_ALTARIA"] = "MEGA_ALTARIA";
  Pkm["CASTFORM"] = "CASTFORM";
  Pkm["CASTFORM_SUN"] = "CASTFORM_SUN";
  Pkm["CASTFORM_RAIN"] = "CASTFORM_RAIN";
  Pkm["CASTFORM_HAIL"] = "CASTFORM_HAIL";
  Pkm["CORPHISH"] = "CORPHISH";
  Pkm["CRAWDAUNT"] = "CRAWDAUNT";
  Pkm["JOLTIK"] = "JOLTIK";
  Pkm["GALVANTULA"] = "GALVANTULA";
  Pkm["GENESECT"] = "GENESECT";
  Pkm["RELICANTH"] = "RELICANTH";
  Pkm["HATENNA"] = "HATENNA";
  Pkm["HATTREM"] = "HATTREM";
  Pkm["HATTERENE"] = "HATTERENE";
  Pkm["FENNEKIN"] = "FENNEKIN";
  Pkm["BRAIXEN"] = "BRAIXEN";
  Pkm["DELPHOX"] = "DELPHOX";
  Pkm["MAKUHITA"] = "MAKUHITA";
  Pkm["HARIYAMA"] = "HARIYAMA";
  Pkm["REGIELEKI"] = "REGIELEKI";
  Pkm["REGIDRAGO"] = "REGIDRAGO";
  Pkm["GUZZLORD"] = "GUZZLORD";
  Pkm["ETERNATUS"] = "ETERNATUS";
  Pkm["PONYTA"] = "PONYTA";
  Pkm["RAPIDASH"] = "RAPIDASH";
  Pkm["NINCADA"] = "NINCADA";
  Pkm["NINJASK"] = "NINJASK";
  Pkm["SHEDNINJA"] = "SHEDNINJA";
  Pkm["NOIBAT"] = "NOIBAT";
  Pkm["NOIVERN"] = "NOIVERN";
  Pkm["PUMPKABOO"] = "PUMPKABOO";
  Pkm["GOURGEIST"] = "GOURGEIST";
  Pkm["CACNEA"] = "CACNEA";
  Pkm["CACTURNE"] = "CACTURNE";
  Pkm["TAUROS"] = "TAUROS";
  Pkm["HAPPINY"] = "HAPPINY";
  Pkm["CHANSEY"] = "CHANSEY";
  Pkm["BLISSEY"] = "BLISSEY";
  Pkm["TAPU_KOKO"] = "TAPU_KOKO";
  Pkm["TAPU_LELE"] = "TAPU_LELE";
  Pkm["STAKATAKA"] = "STAKATAKA";
  Pkm["BLACEPHALON"] = "BLACEPHALON";
  Pkm["HOUNDOUR"] = "HOUNDOUR";
  Pkm["HOUNDOOM"] = "HOUNDOOM";
  Pkm["MEGA_HOUNDOOM"] = "MEGA_HOUNDOOM";
  Pkm["CLAMPERL"] = "CLAMPERL";
  Pkm["HUNTAIL"] = "HUNTAIL";
  Pkm["GOREBYSS"] = "GOREBYSS";
  Pkm["SMOOCHUM"] = "SMOOCHUM";
  Pkm["JYNX"] = "JYNX";
  Pkm["SALANDIT"] = "SALANDIT";
  Pkm["SALAZZLE"] = "SALAZZLE";
  Pkm["VENONAT"] = "VENONAT";
  Pkm["VENOMOTH"] = "VENOMOTH";
  Pkm["VOLTORB"] = "VOLTORB";
  Pkm["ELECTRODE"] = "ELECTRODE";
  Pkm["SLUGMA"] = "SLUGMA";
  Pkm["MAGCARGO"] = "MAGCARGO";
  Pkm["SNEASEL"] = "SNEASEL";
  Pkm["WEAVILE"] = "WEAVILE";
  Pkm["CROAGUNK"] = "CROAGUNK";
  Pkm["TOXICROAK"] = "TOXICROAK";
  Pkm["CHINCHOU"] = "CHINCHOU";
  Pkm["LANTURN"] = "LANTURN";
  Pkm["POOCHYENA"] = "POOCHYENA";
  Pkm["MIGHTYENA"] = "MIGHTYENA";
  Pkm["BRONZOR"] = "BRONZOR";
  Pkm["BRONZONG"] = "BRONZONG";
  Pkm["DRIFLOON"] = "DRIFLOON";
  Pkm["DRIFBLIM"] = "DRIFBLIM";
  Pkm["SHROOMISH"] = "SHROOMISH";
  Pkm["BRELOOM"] = "BRELOOM";
  Pkm["TENTACOOL"] = "TENTACOOL";
  Pkm["TENTACRUEL"] = "TENTACRUEL";
  Pkm["SNUBULL"] = "SNUBULL";
  Pkm["GRANBULL"] = "GRANBULL";
  Pkm["SEVIPER"] = "SEVIPER";
  Pkm["VULPIX"] = "VULPIX";
  Pkm["NINETALES"] = "NINETALES";
  Pkm["ALOLAN_VULPIX"] = "ALOLAN_VULPIX";
  Pkm["ALOLAN_NINETALES"] = "ALOLAN_NINETALES";
  Pkm["BUIZEL"] = "BUIZEL";
  Pkm["FLOATZEL"] = "FLOATZEL";
  Pkm["MAWILE"] = "MAWILE";
  Pkm["KECLEON"] = "KECLEON";
  Pkm["CARBINK"] = "CARBINK";
  Pkm["DIANCIE"] = "DIANCIE";
  Pkm["CHATOT"] = "CHATOT";
  Pkm["GOOMY"] = "GOOMY";
  Pkm["SLIGOO"] = "SLIGOO";
  Pkm["GOODRA"] = "GOODRA";
  Pkm["MEW"] = "MEW";
  Pkm["BOUNSWEET"] = "BOUNSWEET";
  Pkm["STEENEE"] = "STEENEE";
  Pkm["TSAREENA"] = "TSAREENA";
  Pkm["VOLCANION"] = "VOLCANION";
  Pkm["APPLIN"] = "APPLIN";
  Pkm["APPLETUN"] = "APPLETUN";
  Pkm["OSHAWOTT"] = "OSHAWOTT";
  Pkm["DEWOTT"] = "DEWOTT";
  Pkm["SAMUROTT"] = "SAMUROTT";
  Pkm["SNOM"] = "SNOM";
  Pkm["FROSMOTH"] = "FROSMOTH";
  Pkm["WAILMER"] = "WAILMER";
  Pkm["WAILORD"] = "WAILORD";
  Pkm["DREEPY"] = "DREEPY";
  Pkm["DRAKLOAK"] = "DRAKLOAK";
  Pkm["DRAGAPULT"] = "DRAGAPULT";
  Pkm["SNIVY"] = "SNIVY";
  Pkm["SERVINE"] = "SERVINE";
  Pkm["SERPERIOR"] = "SERPERIOR";
  Pkm["SCORBUNNY"] = "SCORBUNNY";
  Pkm["RABOOT"] = "RABOOT";
  Pkm["CINDERACE"] = "CINDERACE";
  Pkm["POPPLIO"] = "POPPLIO";
  Pkm["BRIONNE"] = "BRIONNE";
  Pkm["PRIMARINA"] = "PRIMARINA";
  Pkm["GOTHITA"] = "GOTHITA";
  Pkm["GOTHORITA"] = "GOTHORITA";
  Pkm["GOTHITELLE"] = "GOTHITELLE";
  Pkm["SANDSHREW"] = "SANDSHREW";
  Pkm["SANDSLASH"] = "SANDSLASH";
  Pkm["FARFETCH_D"] = "FARFETCH_D";
  Pkm["UNOWN_A"] = "UNOWN_A";
  Pkm["UNOWN_B"] = "UNOWN_B";
  Pkm["UNOWN_C"] = "UNOWN_C";
  Pkm["UNOWN_D"] = "UNOWN_D";
  Pkm["UNOWN_E"] = "UNOWN_E";
  Pkm["UNOWN_F"] = "UNOWN_F";
  Pkm["UNOWN_G"] = "UNOWN_G";
  Pkm["UNOWN_H"] = "UNOWN_H";
  Pkm["UNOWN_I"] = "UNOWN_I";
  Pkm["UNOWN_J"] = "UNOWN_J";
  Pkm["UNOWN_K"] = "UNOWN_K";
  Pkm["UNOWN_L"] = "UNOWN_L";
  Pkm["UNOWN_M"] = "UNOWN_M";
  Pkm["UNOWN_N"] = "UNOWN_N";
  Pkm["UNOWN_O"] = "UNOWN_O";
  Pkm["UNOWN_P"] = "UNOWN_P";
  Pkm["UNOWN_Q"] = "UNOWN_Q";
  Pkm["UNOWN_R"] = "UNOWN_R";
  Pkm["UNOWN_S"] = "UNOWN_S";
  Pkm["UNOWN_T"] = "UNOWN_T";
  Pkm["UNOWN_U"] = "UNOWN_U";
  Pkm["UNOWN_V"] = "UNOWN_V";
  Pkm["UNOWN_W"] = "UNOWN_W";
  Pkm["UNOWN_X"] = "UNOWN_X";
  Pkm["UNOWN_Y"] = "UNOWN_Y";
  Pkm["UNOWN_Z"] = "UNOWN_Z";
  Pkm["UNOWN_QUESTION"] = "UNOWN_QUESTION";
  Pkm["UNOWN_EXCLAMATION"] = "UNOWN_EXCLAMATION";
  Pkm["TAPU_FINI"] = "TAPU_FINI";
  Pkm["TAPU_BULU"] = "TAPU_BULU";
  Pkm["DIGLETT"] = "DIGLETT";
  Pkm["DUGTRIO"] = "DUGTRIO";
  Pkm["ROWLET"] = "ROWLET";
  Pkm["DARTIX"] = "DARTIX";
  Pkm["DECIDUEYE"] = "DECIDUEYE";
  Pkm["ZORUA"] = "ZORUA";
  Pkm["ZOROARK"] = "ZOROARK";
  Pkm["HISUI_ZORUA"] = "HISUI_ZORUA";
  Pkm["HISUI_ZOROARK"] = "HISUI_ZOROARK";
  Pkm["FROAKIE"] = "FROAKIE";
  Pkm["FROGADIER"] = "FROGADIER";
  Pkm["GRENINJA"] = "GRENINJA";
  Pkm["TYROGUE"] = "TYROGUE";
  Pkm["HITMONLEE"] = "HITMONLEE";
  Pkm["HITMONCHAN"] = "HITMONCHAN";
  Pkm["HITMONTOP"] = "HITMONTOP";
  Pkm["MIMIKYU"] = "MIMIKYU";
  Pkm["GRIMER"] = "GRIMER";
  Pkm["MUK"] = "MUK";
  Pkm["ALOLAN_GRIMER"] = "ALOLAN_GRIMER";
  Pkm["ALOLAN_MUK"] = "ALOLAN_MUK";
  Pkm["CARVANHA"] = "CARVANHA";
  Pkm["SHARPEDO"] = "SHARPEDO";
  Pkm["PINECO"] = "PINECO";
  Pkm["FORRETRESS"] = "FORRETRESS";
  Pkm["SEEL"] = "SEEL";
  Pkm["DEWGONG"] = "DEWGONG";
  Pkm["ALOLAN_GEODUDE"] = "ALOLAN_GEODUDE";
  Pkm["ALOLAN_GRAVELER"] = "ALOLAN_GRAVELER";
  Pkm["ALOLAN_GOLEM"] = "ALOLAN_GOLEM";
  Pkm["EKANS"] = "EKANS";
  Pkm["ARBOK"] = "ARBOK";
  Pkm["MIME_JR"] = "MIME_JR";
  Pkm["MR_MIME"] = "MR_MIME";
  Pkm["ORIGIN_GIRATINA"] = "ORIGIN_GIRATINA";
  Pkm["PIROUETTE_MELOETTA"] = "PIROUETTE_MELOETTA";
  Pkm["MELMETAL"] = "MELMETAL";
  Pkm["HOOPA"] = "HOOPA";
  Pkm["HOOPA_UNBOUND"] = "HOOPA_UNBOUND";
  Pkm["SILVALLY"] = "SILVALLY";
  Pkm["TYPE_NULL"] = "TYPE_NULL";
  Pkm["ZERAORA"] = "ZERAORA";
  Pkm["XERNEAS"] = "XERNEAS";
  Pkm["YVELTAL"] = "YVELTAL";
  Pkm["MARSHADOW"] = "MARSHADOW";
  Pkm["HOOTHOOT"] = "HOOTHOOT";
  Pkm["NOCTOWL"] = "NOCTOWL";
  Pkm["BONSLEY"] = "BONSLEY";
  Pkm["SUDOWOODO"] = "SUDOWOODO";
  Pkm["PHIONE"] = "PHIONE";
  Pkm["COMBEE"] = "COMBEE";
  Pkm["VESPIQUEEN"] = "VESPIQUEEN";
  Pkm["SHUCKLE"] = "SHUCKLE";
  Pkm["TEPIG"] = "TEPIG";
  Pkm["PIGNITE"] = "PIGNITE";
  Pkm["EMBOAR"] = "EMBOAR";
  Pkm["WYNAUT"] = "WYNAUT";
  Pkm["WOBBUFFET"] = "WOBBUFFET";
  Pkm["LUNATONE"] = "LUNATONE";
  Pkm["SOLROCK"] = "SOLROCK";
  Pkm["SHAYMIN_SKY"] = "SHAYMIN_SKY";
  Pkm["WURMPLE"] = "WURMPLE";
  Pkm["SILCOON"] = "SILCOON";
  Pkm["BEAUTIFLY"] = "BEAUTIFLY";
  Pkm["CASCOON"] = "CASCOON";
  Pkm["DUSTOX"] = "DUSTOX";
  Pkm["TINKATINK"] = "TINKATINK";
  Pkm["TINKATUFF"] = "TINKATUFF";
  Pkm["TINKATON"] = "TINKATON";
  Pkm["PARAS"] = "PARAS";
  Pkm["PARASECT"] = "PARASECT";
  Pkm["MILTANK"] = "MILTANK";
  Pkm["MANKEY"] = "MANKEY";
  Pkm["PRIMEAPE"] = "PRIMEAPE";
  Pkm["SUNKERN"] = "SUNKERN";
  Pkm["SUNFLORA"] = "SUNFLORA";
  Pkm["MARACTUS"] = "MARACTUS";
  Pkm["MINUN"] = "MINUN";
  Pkm["PLUSLE"] = "PLUSLE";
  Pkm["PINSIR"] = "PINSIR";
  Pkm["NATU"] = "NATU";
  Pkm["XATU"] = "XATU";
  Pkm["GLIGAR"] = "GLIGAR";
  Pkm["GLISCOR"] = "GLISCOR";
  Pkm["SHELLDER"] = "SHELLDER";
  Pkm["CLOYSTER"] = "CLOYSTER";
  Pkm["SENTRET"] = "SENTRET";
  Pkm["FURRET"] = "FURRET";
  Pkm["SPECTRIER"] = "SPECTRIER";
})(Pkm || (Pkm = {}));

export const PkmIndex = {
  [Pkm.EGG]: "0000-0004",
  [Pkm.DEFAULT]: "0000",
  [Pkm.DITTO]: "0132",
  [Pkm.BULBASAUR]: "0001",
  [Pkm.IVYSAUR]: "0002",
  [Pkm.VENUSAUR]: "0003",
  [Pkm.CHARMANDER]: "0004",
  [Pkm.CHARMELEON]: "0005",
  [Pkm.CHARIZARD]: "0006",
  [Pkm.SQUIRTLE]: "0007",
  [Pkm.WARTORTLE]: "0008",
  [Pkm.BLASTOISE]: "0009",
  [Pkm.GEODUDE]: "0074",
  [Pkm.GRAVELER]: "0075",
  [Pkm.GOLEM]: "0076",
  [Pkm.AZURILL]: "0298",
  [Pkm.MARILL]: "0183",
  [Pkm.AZUMARILL]: "0184",
  [Pkm.ZUBAT]: "0041",
  [Pkm.GOLBAT]: "0042",
  [Pkm.CROBAT]: "0169",
  [Pkm.MAREEP]: "0179",
  [Pkm.FLAFFY]: "0180",
  [Pkm.AMPHAROS]: "0181",
  [Pkm.CLEFFA]: "0173",
  [Pkm.CLEFAIRY]: "0035",
  [Pkm.CLEFABLE]: "0036",
  [Pkm.IGGLYBUFF]: "0174",
  [Pkm.WIGGLYTUFF]: "0040",
  [Pkm.JIGGLYPUFF]: "0039",
  [Pkm.CATERPIE]: "0010",
  [Pkm.METAPOD]: "0011",
  [Pkm.BUTTERFREE]: "0012",
  [Pkm.WEEDLE]: "0013",
  [Pkm.KAKUNA]: "0014",
  [Pkm.BEEDRILL]: "0015",
  [Pkm.PIDGEY]: "0016",
  [Pkm.PIDGEOTTO]: "0017",
  [Pkm.PIDGEOT]: "0018",
  [Pkm.HOPPIP]: "0187",
  [Pkm.SKIPLOOM]: "0188",
  [Pkm.JUMPLUFF]: "0189",
  [Pkm.SEEDOT]: "0273",
  [Pkm.NUZLEAF]: "0274",
  [Pkm.SHIFTRY]: "0275",
  [Pkm.STARLY]: "0396",
  [Pkm.STARAVIA]: "0397",
  [Pkm.STARAPTOR]: "0398",
  [Pkm.CHIKORITA]: "0152",
  [Pkm.BAYLEEF]: "0153",
  [Pkm.MEGANIUM]: "0154",
  [Pkm.CYNDAQUIL]: "0155",
  [Pkm.QUILAVA]: "0156",
  [Pkm.TYPHLOSION]: "0157",
  [Pkm.TOTODILE]: "0158",
  [Pkm.CROCONAW]: "0159",
  [Pkm.FERALIGATR]: "0160",
  [Pkm.TREECKO]: "0252",
  [Pkm.GROVYLE]: "0253",
  [Pkm.SCEPTILE]: "0254",
  [Pkm.TORCHIC]: "0255",
  [Pkm.COMBUSKEN]: "0256",
  [Pkm.BLAZIKEN]: "0257",
  [Pkm.MUDKIP]: "0258",
  [Pkm.MARSHTOMP]: "0259",
  [Pkm.SWAMPERT]: "0260",
  [Pkm.TURTWIG]: "0387",
  [Pkm.GROTLE]: "0388",
  [Pkm.TORTERRA]: "0389",
  [Pkm.CHIMCHAR]: "0390",
  [Pkm.MONFERNO]: "0391",
  [Pkm.INFERNAPE]: "0392",
  [Pkm.PIPLUP]: "0393",
  [Pkm.PRINPLUP]: "0394",
  [Pkm.EMPOLEON]: "0395",
  [Pkm.NIDORANF]: "0029",
  [Pkm.NIDORINA]: "0030",
  [Pkm.NIDOQUEEN]: "0031",
  [Pkm.NIDORANM]: "0032",
  [Pkm.NIDORINO]: "0033",
  [Pkm.NIDOKING]: "0034",
  [Pkm.PICHU]: "0172",
  [Pkm.PIKACHU]: "0025",
  [Pkm.RAICHU]: "0026",
  [Pkm.SANDSHREW]: "0027",
  [Pkm.SANDSLASH]: "0028",
  [Pkm.MACHOP]: "0066",
  [Pkm.MACHOKE]: "0067",
  [Pkm.MACHAMP]: "0068",
  [Pkm.HORSEA]: "0116",
  [Pkm.SEADRA]: "0117",
  [Pkm.KINGDRA]: "0230",
  [Pkm.TRAPINCH]: "0328",
  [Pkm.VIBRAVA]: "0329",
  [Pkm.FLYGON]: "0330",
  [Pkm.SPHEAL]: "0363",
  [Pkm.SEALEO]: "0364",
  [Pkm.WALREIN]: "0365",
  [Pkm.ARON]: "0304",
  [Pkm.LAIRON]: "0305",
  [Pkm.AGGRON]: "0306",
  [Pkm.MAGNEMITE]: "0081",
  [Pkm.MAGNETON]: "0082",
  [Pkm.MAGNEZONE]: "0462",
  [Pkm.RHYHORN]: "0111",
  [Pkm.RHYDON]: "0112",
  [Pkm.RHYPERIOR]: "0464",
  [Pkm.TOGEPI]: "0175",
  [Pkm.TOGETIC]: "0176",
  [Pkm.TOGEKISS]: "0468",
  [Pkm.DUSKULL]: "0355",
  [Pkm.DUSCLOPS]: "0356",
  [Pkm.DUSKNOIR]: "0477",
  [Pkm.LOTAD]: "0270",
  [Pkm.LOMBRE]: "0271",
  [Pkm.LUDICOLO]: "0272",
  [Pkm.SHINX]: "0403",
  [Pkm.LUXIO]: "0404",
  [Pkm.LUXRAY]: "0405",
  [Pkm.POLIWAG]: "0060",
  [Pkm.POLIWHIRL]: "0061",
  [Pkm.POLITOED]: "0186",
  [Pkm.ABRA]: "0063",
  [Pkm.KADABRA]: "0064",
  [Pkm.ALAKAZAM]: "0065",
  [Pkm.GASTLY]: "0092",
  [Pkm.HAUNTER]: "0093",
  [Pkm.GENGAR]: "0094",
  [Pkm.DRATINI]: "0147",
  [Pkm.DRAGONAIR]: "0148",
  [Pkm.DRAGONITE]: "0149",
  [Pkm.LARVITAR]: "0246",
  [Pkm.PUPITAR]: "0247",
  [Pkm.TYRANITAR]: "0248",
  [Pkm.SLAKOTH]: "0287",
  [Pkm.VIGOROTH]: "0288",
  [Pkm.SLAKING]: "0289",
  [Pkm.RALTS]: "0280",
  [Pkm.KIRLIA]: "0281",
  [Pkm.GARDEVOIR]: "0282",
  [Pkm.BAGON]: "0371",
  [Pkm.SHELGON]: "0372",
  [Pkm.SALAMENCE]: "0373",
  [Pkm.BELDUM]: "0374",
  [Pkm.METANG]: "0375",
  [Pkm.METAGROSS]: "0376",
  [Pkm.GIBLE]: "0443",
  [Pkm.GABITE]: "0444",
  [Pkm.GARCHOMP]: "0445",
  [Pkm.ELEKID]: "0239",
  [Pkm.ELECTABUZZ]: "0125",
  [Pkm.ELECTIVIRE]: "0466",
  [Pkm.MAGBY]: "0240",
  [Pkm.MAGMAR]: "0126",
  [Pkm.MAGMORTAR]: "0467",
  [Pkm.MUNCHLAX]: "0446",
  [Pkm.SNORLAX]: "0143",
  [Pkm.GROWLITHE]: "0058",
  [Pkm.ARCANINE]: "0059",
  [Pkm.ONIX]: "0095",
  [Pkm.STEELIX]: "0208",
  [Pkm.MEGA_STEELIX]: "0208-0001",
  [Pkm.SCYTHER]: "0123",
  [Pkm.SCIZOR]: "0212",
  [Pkm.MEGA_SCIZOR]: "0212-0001",
  [Pkm.RIOLU]: "0447",
  [Pkm.LUCARIO]: "0448",
  [Pkm.MEGA_LUCARIO]: "0448-0001",
  [Pkm.MAGIKARP]: "0129",
  [Pkm.RATTATA]: "0019",
  [Pkm.RATICATE]: "0020",
  [Pkm.SPEAROW]: "0021",
  [Pkm.FEAROW]: "0022",
  [Pkm.GYARADOS]: "0130",
  [Pkm.LUGIA]: "0249",
  [Pkm.GIRATINA]: "0487",
  [Pkm.ZAPDOS]: "0145",
  [Pkm.MOLTRES]: "0146",
  [Pkm.ARTICUNO]: "0144",
  [Pkm.DIALGA]: "0483",
  [Pkm.PALKIA]: "0484",
  [Pkm.SUICUNE]: "0245",
  [Pkm.RAIKOU]: "0243",
  [Pkm.ENTEI]: "0244",
  [Pkm.REGICE]: "0378",
  [Pkm.REGIROCK]: "0377",
  [Pkm.REGISTEEL]: "0379",
  [Pkm.KYOGRE]: "0382",
  [Pkm.GROUDON]: "0383",
  [Pkm.RAYQUAZA]: "0384",
  [Pkm.REGIGIGAS]: "0486",
  [Pkm.EEVEE]: "0133",
  [Pkm.VAPOREON]: "0134",
  [Pkm.JOLTEON]: "0135",
  [Pkm.FLAREON]: "0136",
  [Pkm.ESPEON]: "0196",
  [Pkm.UMBREON]: "0197",
  [Pkm.LEAFEON]: "0470",
  [Pkm.SYLVEON]: "0700",
  [Pkm.MEDITITE]: "0307",
  [Pkm.MEDICHAM]: "0308",
  [Pkm.MEGA_MEDICHAM]: "0308-0001",
  [Pkm.NUMEL]: "0322",
  [Pkm.CAMERUPT]: "0323",
  [Pkm.MEGA_CAMERUPT]: "0323-0001",
  [Pkm.DARKRAI]: "0491",
  [Pkm.LITWICK]: "0607",
  [Pkm.LAMPENT]: "0608",
  [Pkm.CHANDELURE]: "0609",
  [Pkm.SLOWPOKE]: "0079",
  [Pkm.SLOWBRO]: "0080",
  [Pkm.SLOWKING]: "0199",
  [Pkm.BELLSPROUT]: "0069",
  [Pkm.WEEPINBELL]: "0070",
  [Pkm.VICTREEBEL]: "0071",
  [Pkm.CARVANHA]: "0318",
  [Pkm.SWINUB]: "0220",
  [Pkm.PILOSWINE]: "0221",
  [Pkm.MAMOSWINE]: "0473",
  [Pkm.SNORUNT]: "0361",
  [Pkm.GLALIE]: "0362",
  [Pkm.FROSLASS]: "0478",
  [Pkm.SNOVER]: "0459",
  [Pkm.ABOMASNOW]: "0460",
  [Pkm.MEGA_ABOMASNOW]: "0460-0001",
  [Pkm.VANILLITE]: "0582",
  [Pkm.VANILLISH]: "0583",
  [Pkm.VANILLUXE]: "0584",
  [Pkm.GLACEON]: "0471",
  [Pkm.VOLCARONA]: "0637",
  [Pkm.LANDORUS]: "0645",
  [Pkm.THUNDURUS]: "0642",
  [Pkm.TORNADUS]: "0641",
  [Pkm.KELDEO]: "0647",
  [Pkm.TERRAKION]: "0639",
  [Pkm.VIRIZION]: "0640",
  [Pkm.COBALION]: "0638",
  [Pkm.MANAPHY]: "0490",
  [Pkm.ROTOM]: "0479",
  [Pkm.SPIRITOMB]: "0442",
  [Pkm.ABSOL]: "0359",
  [Pkm.LAPRAS]: "0131",
  [Pkm.LATIAS]: "0380",
  [Pkm.LATIOS]: "0381",
  [Pkm.MESPRIT]: "0481",
  [Pkm.AZELF]: "0482",
  [Pkm.UXIE]: "0480",
  [Pkm.MEWTWO]: "0150",
  [Pkm.KYUREM]: "0646",
  [Pkm.RESHIRAM]: "0643",
  [Pkm.ZEKROM]: "0644",
  [Pkm.CELEBI]: "0251",
  [Pkm.VICTINI]: "0494",
  [Pkm.JIRACHI]: "0385",
  [Pkm.ARCEUS]: "0493",
  [Pkm.DEOXYS]: "0386",
  [Pkm.SHAYMIN]: "0492",
  [Pkm.CRESSELIA]: "0488",
  [Pkm.HEATRAN]: "0485",
  [Pkm.HO_OH]: "0250",
  [Pkm.AERODACTYL]: "0142",
  [Pkm.PRIMAL_KYOGRE]: "0382-0001",
  [Pkm.PRIMAL_GROUDON]: "0383-0001",
  [Pkm.MEOWTH]: "0052",
  [Pkm.PERSIAN]: "0053",
  [Pkm.DEINO]: "0633",
  [Pkm.ZWEILOUS]: "0634",
  [Pkm.HYDREIGON]: "0635",
  [Pkm.SANDILE]: "0551",
  [Pkm.KROKOROK]: "0552",
  [Pkm.KROOKODILE]: "0553",
  [Pkm.SOLOSIS]: "0577",
  [Pkm.DUOSION]: "0578",
  [Pkm.REUNICLUS]: "0579",
  [Pkm.MEGA_RAYQUAZA]: "0384-0001",
  [Pkm.SWABLU]: "0333",
  [Pkm.ODDISH]: "0043",
  [Pkm.GLOOM]: "0044",
  [Pkm.VILEPLUME]: "0045",
  [Pkm.BELLOSSOM]: "0182",
  [Pkm.AMAURA]: "0698",
  [Pkm.AURORUS]: "0699",
  [Pkm.ANORITH]: "0347",
  [Pkm.ARMALDO]: "0348",
  [Pkm.ARCHEN]: "0566",
  [Pkm.ARCHEOPS]: "0567",
  [Pkm.SHIELDON]: "0410",
  [Pkm.BASTIODON]: "0411",
  [Pkm.TIRTOUGA]: "0564",
  [Pkm.CARRACOSTA]: "0565",
  [Pkm.LILEEP]: "0345",
  [Pkm.CRADILY]: "0346",
  [Pkm.CRANIDOS]: "0408",
  [Pkm.RAMPARDOS]: "0409",
  [Pkm.KABUTO]: "0140",
  [Pkm.KABUTOPS]: "0141",
  [Pkm.OMANYTE]: "0138",
  [Pkm.OMASTAR]: "0139",
  [Pkm.TYRUNT]: "0696",
  [Pkm.TYRANTRUM]: "0697",
  [Pkm.BUDEW]: "0406",
  [Pkm.ROSELIA]: "0315",
  [Pkm.ROSERADE]: "0407",
  [Pkm.BUNEARY]: "0427",
  [Pkm.LOPUNNY]: "0428",
  [Pkm.MEGA_LOPUNNY]: "0428-0001",
  [Pkm.AXEW]: "0610",
  [Pkm.FRAXURE]: "0611",
  [Pkm.HAXORUS]: "0612",
  [Pkm.VENIPEDE]: "0543",
  [Pkm.WHIRLIPEDE]: "0544",
  [Pkm.SCOLIPEDE]: "0545",
  [Pkm.PORYGON]: "0137",
  [Pkm.PORYGON_2]: "0233",
  [Pkm.PORYGON_Z]: "0474",
  [Pkm.ELECTRIKE]: "0309",
  [Pkm.MANECTRIC]: "0310",
  [Pkm.MEGA_MANECTRIC]: "0310-0001",
  [Pkm.SHUPPET]: "0353",
  [Pkm.BANETTE]: "0354",
  [Pkm.MEGA_BANETTE]: "0354-0001",
  [Pkm.HONEDGE]: "0679",
  [Pkm.DOUBLADE]: "0680",
  [Pkm.AEGISLASH]: "0681",
  [Pkm.CUBONE]: "0104",
  [Pkm.MAROWAK]: "0105",
  [Pkm.ALOLAN_MAROWAK]: "0105-0001",
  [Pkm.WHISMUR]: "0293",
  [Pkm.LOUDRED]: "0294",
  [Pkm.EXPLOUD]: "0295",
  [Pkm.TYMPOLE]: "0535",
  [Pkm.PALPITOAD]: "0536",
  [Pkm.SEISMITOAD]: "0537",
  [Pkm.SEWADDLE]: "0540",
  [Pkm.SWADLOON]: "0541",
  [Pkm.LEAVANNY]: "0542",
  [Pkm.PIKIPEK]: "0731",
  [Pkm.TRUMBEAK]: "0732",
  [Pkm.TOUCANNON]: "0733",
  [Pkm.FLABEBE]: "0669",
  [Pkm.FLOETTE]: "0670",
  [Pkm.FLORGES]: "0671",
  [Pkm.JANGMO_O]: "0782",
  [Pkm.HAKAMO_O]: "0783",
  [Pkm.KOMMO_O]: "0784",
  [Pkm.MELOETTA]: "0648",
  [Pkm.ALTARIA]: "0334",
  [Pkm.MEGA_ALTARIA]: "0334-0001",
  [Pkm.CASTFORM]: "0351",
  [Pkm.CASTFORM_SUN]: "0351-0001",
  [Pkm.CASTFORM_RAIN]: "0351-0002",
  [Pkm.CASTFORM_HAIL]: "0351-0003",
  [Pkm.CORPHISH]: "0341",
  [Pkm.CRAWDAUNT]: "0342",
  [Pkm.JOLTIK]: "0595",
  [Pkm.GALVANTULA]: "0596",
  [Pkm.GENESECT]: "0649",
  [Pkm.RELICANTH]: "0369",
  [Pkm.DIANCIE]: "0719",
  [Pkm.HATENNA]: "0856",
  [Pkm.HATTREM]: "0857",
  [Pkm.HATTERENE]: "0858",
  [Pkm.FENNEKIN]: "0653",
  [Pkm.BRAIXEN]: "0654",
  [Pkm.DELPHOX]: "0655",
  [Pkm.MAKUHITA]: "0296",
  [Pkm.HARIYAMA]: "0297",
  [Pkm.REGIELEKI]: "0894",
  [Pkm.REGIDRAGO]: "0895",
  [Pkm.GUZZLORD]: "0799",
  [Pkm.ETERNATUS]: "0890",
  [Pkm.NOIBAT]: "0714",
  [Pkm.NOIVERN]: "0715",
  [Pkm.PUMPKABOO]: "0710",
  [Pkm.GOURGEIST]: "0711",
  [Pkm.NINCADA]: "0290",
  [Pkm.NINJASK]: "0291",
  [Pkm.SHEDNINJA]: "0292",
  [Pkm.PONYTA]: "0077",
  [Pkm.RAPIDASH]: "0078",
  [Pkm.CACNEA]: "0331",
  [Pkm.CACTURNE]: "0332",
  [Pkm.TAUROS]: "0128",
  [Pkm.HAPPINY]: "0440",
  [Pkm.CHANSEY]: "0113",
  [Pkm.BLISSEY]: "0242",
  [Pkm.TAPU_KOKO]: "0785",
  [Pkm.TAPU_LELE]: "0786",
  [Pkm.STAKATAKA]: "0805",
  [Pkm.BLACEPHALON]: "0806",
  [Pkm.HOUNDOUR]: "0228",
  [Pkm.HOUNDOOM]: "0229",
  [Pkm.MEGA_HOUNDOOM]: "0229-0001",
  [Pkm.CLAMPERL]: "0366",
  [Pkm.HUNTAIL]: "0367",
  [Pkm.GOREBYSS]: "0368",
  [Pkm.SMOOCHUM]: "0238",
  [Pkm.JYNX]: "0124",
  [Pkm.SALANDIT]: "0757",
  [Pkm.SALAZZLE]: "0758",
  [Pkm.VENONAT]: "0048",
  [Pkm.VENOMOTH]: "0049",
  [Pkm.VOLTORB]: "0100",
  [Pkm.ELECTRODE]: "0101",
  [Pkm.SLUGMA]: "0218",
  [Pkm.MAGCARGO]: "0219",
  [Pkm.SNEASEL]: "0215",
  [Pkm.WEAVILE]: "0461",
  [Pkm.CROAGUNK]: "0453",
  [Pkm.TOXICROAK]: "0454",
  [Pkm.CHINCHOU]: "0170",
  [Pkm.LANTURN]: "0171",
  [Pkm.POOCHYENA]: "0261",
  [Pkm.MIGHTYENA]: "0262",
  [Pkm.BRONZOR]: "0436",
  [Pkm.BRONZONG]: "0437",
  [Pkm.DRIFLOON]: "0425",
  [Pkm.DRIFBLIM]: "0426",
  [Pkm.SHROOMISH]: "0285",
  [Pkm.BRELOOM]: "0286",
  [Pkm.TENTACOOL]: "0072",
  [Pkm.TENTACRUEL]: "0073",
  [Pkm.SNUBULL]: "0209",
  [Pkm.GRANBULL]: "0210",
  [Pkm.SEVIPER]: "0336",
  [Pkm.VULPIX]: "0037",
  [Pkm.NINETALES]: "0038",
  [Pkm.ALOLAN_VULPIX]: "0037-0001",
  [Pkm.ALOLAN_NINETALES]: "0038-0001",
  [Pkm.BUIZEL]: "0418",
  [Pkm.FLOATZEL]: "0419",
  [Pkm.KECLEON]: "0352",
  [Pkm.MAWILE]: "0303",
  [Pkm.CARBINK]: "0703",
  [Pkm.CHATOT]: "0441",
  [Pkm.GOOMY]: "0704",
  [Pkm.SLIGOO]: "0705",
  [Pkm.GOODRA]: "0706",
  [Pkm.MEW]: "0151",
  [Pkm.BOUNSWEET]: "0761",
  [Pkm.STEENEE]: "0762",
  [Pkm.TSAREENA]: "0763",
  [Pkm.VOLCANION]: "0721",
  [Pkm.APPLIN]: "0840",
  [Pkm.APPLETUN]: "0842",
  [Pkm.OSHAWOTT]: "0501",
  [Pkm.DEWOTT]: "0502",
  [Pkm.SAMUROTT]: "0503",
  [Pkm.SNOM]: "0872",
  [Pkm.FROSMOTH]: "0873",
  [Pkm.WAILMER]: "0320",
  [Pkm.WAILORD]: "0321",
  [Pkm.DREEPY]: "0885",
  [Pkm.DRAKLOAK]: "0886",
  [Pkm.DRAGAPULT]: "0887",
  [Pkm.SNIVY]: "0495",
  [Pkm.SERVINE]: "0496",
  [Pkm.SERPERIOR]: "0497",
  [Pkm.SCORBUNNY]: "0813",
  [Pkm.RABOOT]: "0814",
  [Pkm.CINDERACE]: "0815",
  [Pkm.POPPLIO]: "0728",
  [Pkm.BRIONNE]: "0729",
  [Pkm.PRIMARINA]: "0730",
  [Pkm.GOTHITA]: "0574",
  [Pkm.GOTHORITA]: "0575",
  [Pkm.GOTHITELLE]: "0576",
  [Pkm.FARFETCH_D]: "0083",
  [Pkm.UNOWN_A]: "0201",
  [Pkm.UNOWN_B]: "0201-0001",
  [Pkm.UNOWN_C]: "0201-0002",
  [Pkm.UNOWN_D]: "0201-0003",
  [Pkm.UNOWN_E]: "0201-0004",
  [Pkm.UNOWN_F]: "0201-0005",
  [Pkm.UNOWN_G]: "0201-0006",
  [Pkm.UNOWN_H]: "0201-0007",
  [Pkm.UNOWN_I]: "0201-0008",
  [Pkm.UNOWN_J]: "0201-0009",
  [Pkm.UNOWN_K]: "0201-0010",
  [Pkm.UNOWN_L]: "0201-0011",
  [Pkm.UNOWN_M]: "0201-0012",
  [Pkm.UNOWN_N]: "0201-0013",
  [Pkm.UNOWN_O]: "0201-0014",
  [Pkm.UNOWN_P]: "0201-0015",
  [Pkm.UNOWN_Q]: "0201-0016",
  [Pkm.UNOWN_R]: "0201-0017",
  [Pkm.UNOWN_S]: "0201-0018",
  [Pkm.UNOWN_T]: "0201-0019",
  [Pkm.UNOWN_U]: "0201-0020",
  [Pkm.UNOWN_V]: "0201-0021",
  [Pkm.UNOWN_W]: "0201-0022",
  [Pkm.UNOWN_X]: "0201-0023",
  [Pkm.UNOWN_Y]: "0201-0024",
  [Pkm.UNOWN_Z]: "0201-0025",
  [Pkm.UNOWN_QUESTION]: "0201-0027",
  [Pkm.UNOWN_EXCLAMATION]: "0201-0026",
  [Pkm.TAPU_FINI]: "0788",
  [Pkm.TAPU_BULU]: "0787",
  [Pkm.DIGLETT]: "0050",
  [Pkm.DUGTRIO]: "0051",
  [Pkm.ROWLET]: "0722",
  [Pkm.DARTIX]: "0723",
  [Pkm.DECIDUEYE]: "0724",
  [Pkm.ZORUA]: "0570",
  [Pkm.ZOROARK]: "0571",
  [Pkm.FROAKIE]: "0656",
  [Pkm.FROGADIER]: "0657",
  [Pkm.GRENINJA]: "0658",
  [Pkm.TYROGUE]: "0236",
  [Pkm.HITMONLEE]: "0106",
  [Pkm.HITMONCHAN]: "0107",
  [Pkm.HITMONTOP]: "0237",
  [Pkm.MIMIKYU]: "0778",
  [Pkm.GRIMER]: "0088",
  [Pkm.MUK]: "0089",
  [Pkm.SHARPEDO]: "0319",
  [Pkm.HISUI_ZORUA]: "0570-0002",
  [Pkm.HISUI_ZOROARK]: "0571-0001",
  [Pkm.ALOLAN_GRIMER]: "0088-0001",
  [Pkm.ALOLAN_MUK]: "0089-0001",
  [Pkm.PINECO]: "0204",
  [Pkm.FORRETRESS]: "0205",
  [Pkm.SEEL]: "0086",
  [Pkm.DEWGONG]: "0087",
  [Pkm.ALOLAN_GEODUDE]: "0074-0001",
  [Pkm.ALOLAN_GRAVELER]: "0075-0001",
  [Pkm.ALOLAN_GOLEM]: "0076-0001",
  [Pkm.EKANS]: "0023",
  [Pkm.ARBOK]: "0024",
  [Pkm.MIME_JR]: "0439",
  [Pkm.MR_MIME]: "0122",
  [Pkm.ORIGIN_GIRATINA]: "0487-0001",
  [Pkm.PIROUETTE_MELOETTA]: "0648-0001",
  [Pkm.MELMETAL]: "0809",
  [Pkm.HOOPA]: "0720",
  [Pkm.HOOPA_UNBOUND]: "0720-0001",
  [Pkm.SILVALLY]: "0773",
  [Pkm.ZERAORA]: "0807",
  [Pkm.XERNEAS]: "0716",
  [Pkm.YVELTAL]: "0717",
  [Pkm.TYPE_NULL]: "0772",
  [Pkm.MARSHADOW]: "0802",
  [Pkm.HOOTHOOT]: "0163",
  [Pkm.NOCTOWL]: "0164",
  [Pkm.BONSLEY]: "0438",
  [Pkm.SUDOWOODO]: "0185",
  [Pkm.PHIONE]: "0489",
  [Pkm.COMBEE]: "0415",
  [Pkm.VESPIQUEEN]: "0416",
  [Pkm.SHUCKLE]: "0213",
  [Pkm.TEPIG]: "0498",
  [Pkm.PIGNITE]: "0499",
  [Pkm.EMBOAR]: "0500",
  [Pkm.WYNAUT]: "0360",
  [Pkm.WOBBUFFET]: "0202",
  [Pkm.LUNATONE]: "0337",
  [Pkm.SOLROCK]: "0338",
  [Pkm.POLIWRATH]: "0062",
  [Pkm.SHAYMIN_SKY]: "0492-0001",
  [Pkm.WURMPLE]: "0265",
  [Pkm.SILCOON]: "0266",
  [Pkm.BEAUTIFLY]: "0267",
  [Pkm.CASCOON]: "0268",
  [Pkm.DUSTOX]: "0269",
  [Pkm.TINKATINK]: "0957",
  [Pkm.TINKATUFF]: "0958",
  [Pkm.TINKATON]: "0959",
  [Pkm.PARAS]: "0046",
  [Pkm.PARASECT]: "0047",
  [Pkm.MILTANK]: "0241",
  [Pkm.MANKEY]: "0056",
  [Pkm.PRIMEAPE]: "0057",
  [Pkm.SUNKERN]: "0191",
  [Pkm.SUNFLORA]: "0192",
  [Pkm.MARACTUS]: "0556",
  [Pkm.PLUSLE]: "0311",
  [Pkm.MINUN]: "0312",
  [Pkm.PINSIR]: "0127",
  [Pkm.NATU]: "0177",
  [Pkm.XATU]: "0178",
  [Pkm.GLIGAR]: "0207",
  [Pkm.GLISCOR]: "0472",
  [Pkm.SHELLDER]: "0090",
  [Pkm.CLOYSTER]: "0091",
  [Pkm.SENTRET]: "0161",
  [Pkm.FURRET]: "0162",
  [Pkm.SPECTRIER]: "0897",
};

export const pokeData = Object.fromEntries(
  allPokemonNames.map((name) => {
    rawPokemonData[name].pkmIndex = PkmIndex[Pkm[name.toUpperCase()]];
    rawPokemonData[name].spritePath = `./assets/pokemons/${
      PkmIndex[Pkm[name.toUpperCase()]]
    }.png`;
    rawPokemonData[name].jsonPath = `./assets/pokemons/${
      PkmIndex[Pkm[name.toUpperCase()]]
    }.json`;
    return [[name], new PokemonObject(rawPokemonData[name])];
  })
);

export const buyablePokemon = allPokemonNames.filter(
  (name) => rawPokemonData[name].stage === 1
);

export const pokemonPerSynergy = {
  normal: [],
  fire: [],
  fighting: [],
  water: [],
  flying: [],
  grass: [],
  poison: [],
  electric: [],
  ground: [],
  psychic: [],
  rock: [],
  ice: [],
  bug: [],
  dragon: [],
  ghost: [],
  dark: [],
  steel: [],
  fairy: [],
  sweeper: [],
  "revenge killer": [],
  "bulky attacker": [],
  wallbreaker: [],
  "hazard setter": [],
  wall: [],
  disruptor: [],
  support: [],
  pivot: [],
  utility: [],
};

// add all buyable pokemon of the appropriate synergy
buyablePokemon.forEach((pokemon) => {
  pokeData[pokemon].categories.forEach((category) => {
    pokemonPerSynergy[category].push(pokemon);
  });
});

// and sort by tier (ascending)
Object.values(pokemonPerSynergy).forEach((list) => {
  list.sort((a, b) => pokeData[a].tier - pokeData[b].tier);
});
