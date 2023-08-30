"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pokemonPerSynergy = exports.buyablePokemon = exports.pokeData = exports.PkmIndex = exports.allPokemonNames = void 0;

var _pokemon = _interopRequireDefault(require("./pokemon.js"));

var _move = require("./move.js");

var _PkmIndex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getEvolution(pokemon, stage) {
  var basePokemon = basePokemonData[pokemon]; // maxHP and damage scale with Pokemon level
  // stage 1 =x2=> stage 2 =x2=> stage 3

  var multi = 1;

  if (stage === 2) {
    multi = 2;
  }

  if (stage === 3) {
    multi = 4;
  }

  return _objectSpread({}, basePokemon, {
    base: pokemon,
    // effectively sqrt(baseHP) * 100, but rounded to nearest 50
    // most pokemon max HP will range from 700 (50 base HP) to 1000 (100 base HP)
    maxHP: Math.ceil(2 * Math.sqrt(basePokemon.maxHP) - 1) * 50 * multi,
    // just the raw base attack / specAttack stats
    // most range from 70 to 120
    attack: basePokemon.attack * multi,
    specAttack: basePokemon.specAttack * multi,
    stage: stage
  });
}

var basePokemonData = {
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
        speed: 300
      }
    },
    move: _move.ShadowTag
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
      stat: "attack"
    },
    move: _move.BraveBird
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
        speed: 300
      }
    },
    move: _move.ThunderWave
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
      stat: "attack"
    },
    move: _move.VoltTackle
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
        speed: 500
      }
    },
    move: _move.RazorWind
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
        speed: 500
      }
    },
    move: _move.Twineedle
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
        speed: 300
      }
    },
    move: _move.Softboiled
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
      stat: "attack"
    },
    move: _move.FuryCutter
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
      stat: "attack"
    },
    // NOTE: Stage 1 and 2 Magikarp have no move - only Gyarados has this
    move: _move.DragonDance
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
      stat: "attack"
    },
    move: _move.IceShard
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
        speed: 500
      }
    },
    move: _move.TriAttack
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
      stat: "specAttack"
    },
    move: _move.MagnetPull
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
        speed: 300
      }
    },
    move: _move.ZapCannon
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
      stat: "attack"
    },
    move: _move.CottonGuard
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
        speed: 500
      }
    },
    move: _move.QuiverDance
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
      stat: "attack"
    },
    move: _move.DragonRush
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
      stat: "attack"
    },
    move: _move.NightDaze
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
        speed: 300
      }
    },
    move: _move.Teleport
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
      stat: "attack"
    },
    move: _move.DarkestLariat
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
      stat: "specAttack"
    },
    move: _move.Clone
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
      stat: "attack"
    },
    move: _move.ShellTrap
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
      stat: "attack"
    },
    move: _move.MeteorMash
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
        speed: 700
      }
    },
    move: _move.LeechLife
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
      stat: "attack"
    },
    move: _move.StoneEdge
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
      stat: "specAttack"
    },
    move: _move.ShadowBall
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
      stat: "attack"
    },
    move: _move.FrenzyPlant
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
        speed: 500
      }
    },
    move: _move.DarkVoid
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
        speed: 300
      }
    },
    move: _move.EggBarrage
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
      stat: "attack"
    },
    move: _move.Surf
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
      stat: "attack"
    },
    move: _move.MudBomb
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
      stat: "attack"
    },
    move: _move.CrushGrip
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
      stat: "attack"
    },
    move: _move.DragonDarts
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
      stat: "specAttack"
    },
    move: _move.MagmaStorm
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
      stat: "attack"
    },
    move: _move.TherianQuake
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
      stat: "attack"
    },
    move: _move.VenomDrench
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
      stat: "attack"
    },
    move: _move.PowerSpot
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
      stat: "attack"
    },
    move: _move.Rollout
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
      stat: "attack"
    },
    move: _move.KingsShield
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
      stat: "attack"
    },
    move: {
      displayName: "Tackle",
      type: "passive",
      description: "{{user}} tackles as a normal attack. It's not special or top percentage.",
      flags: {}
    }
  }
};
/**
 * The raw Pokemon data for all Pokemon, including evolutions.
 * Uses the BasePokemon as a basis
 */

var rawPokemonData = {
  weedle: _objectSpread({}, getEvolution("weedle", 1), {
    name: "weedle",
    displayName: "Weedle",
    evolution: "kakuna"
  }),
  kakuna: _objectSpread({}, getEvolution("weedle", 2), {
    name: "kakuna",
    displayName: "Kakuna",
    evolution: "beedrill"
  }),
  beedrill: _objectSpread({}, getEvolution("weedle", 3), {
    name: "beedrill",
    displayName: "Beedrill"
  }),
  happiny: _objectSpread({}, getEvolution("happiny", 1), {
    name: "happiny",
    displayName: "Happiny",
    evolution: "chansey"
  }),
  chansey: _objectSpread({}, getEvolution("happiny", 2), {
    name: "chansey",
    displayName: "Chansey",
    evolution: "blissey"
  }),
  blissey: _objectSpread({}, getEvolution("happiny", 3), {
    name: "blissey",
    displayName: "Blissey"
  }),
  pichu: _objectSpread({}, getEvolution("pichu", 1), {
    name: "pichu",
    displayName: "Pichu",
    evolution: "pikachu"
  }),
  pikachu: _objectSpread({}, getEvolution("pichu", 2), {
    name: "pikachu",
    displayName: "Pikachu",
    evolution: "raichu"
  }),
  raichu: _objectSpread({}, getEvolution("pichu", 3), {
    name: "raichu",
    displayName: "Raichu"
  }),
  scyther: _objectSpread({}, getEvolution("scyther", 1), {
    name: "scyther",
    displayName: "Scyther",
    evolution: "scizor-1"
  }),
  "scizor-1": _objectSpread({}, getEvolution("scyther", 2), {
    name: "scizor-1",
    displayName: "Scizor",
    evolution: "scizor-2"
  }),
  "scizor-2": _objectSpread({}, getEvolution("scyther", 3), {
    name: "scizor-2",
    displayName: "Scizor"
  }),
  magikarp: _objectSpread({}, getEvolution("magikarp", 1), {
    basicAttack: {
      range: 1,
      stat: "attack",
      unusable: true
    },
    move: {
      displayName: "Splash",
      type: "passive",
      description: "{{user}} flops around to no effect at all. It can't attack.",
      flags: {}
    },
    name: "magikarp",
    displayName: "Magikarp",
    evolution: "magikarp-2"
  }),
  "magikarp-2": _objectSpread({}, getEvolution("magikarp", 2), {
    move: {
      displayName: "Tackle",
      type: "passive",
      description: "{{user}} tackles as a normal attack. It has no move.",
      flags: {}
    },
    name: "magikarp-2",
    displayName: "Magikarp",
    evolution: "gyarados"
  }),
  gyarados: _objectSpread({}, getEvolution("magikarp", 3), {
    name: "gyarados",
    displayName: "Gyarados"
  }),
  porygon: _objectSpread({}, getEvolution("porygon", 1), {
    name: "porygon",
    displayName: "Porygon",
    evolution: "porygon2"
  }),
  porygon2: _objectSpread({}, getEvolution("porygon", 2), {
    name: "porygon2",
    displayName: "Porygon2",
    evolution: "porygonz"
  }),
  porygonz: _objectSpread({}, getEvolution("porygon", 3), {
    name: "porygonz",
    displayName: "Porygon-Z"
  }),
  sneasel: _objectSpread({}, getEvolution("sneasel", 1), {
    name: "sneasel",
    displayName: "Sneasel",
    evolution: "weavile"
  }),
  weavile: _objectSpread({}, getEvolution("sneasel", 2), {
    name: "weavile",
    displayName: "Weavile",
    evolution: "weavile-2"
  }),
  "weavile-2": _objectSpread({}, getEvolution("sneasel", 3), {
    name: "weavile-2",
    displayName: "Weavile"
  }),
  seedot: _objectSpread({}, getEvolution("seedot", 1), {
    name: "seedot",
    displayName: "Seedot",
    evolution: "nuzleaf"
  }),
  nuzleaf: _objectSpread({}, getEvolution("seedot", 2), {
    name: "nuzleaf",
    displayName: "Nuzleaf",
    evolution: "shiftry"
  }),
  shiftry: _objectSpread({}, getEvolution("seedot", 3), {
    name: "shiftry",
    displayName: "Shiftry"
  }),
  litwick: _objectSpread({}, getEvolution("litwick", 1), {
    name: "litwick",
    displayName: "Litwick",
    evolution: "lampent"
  }),
  lampent: _objectSpread({}, getEvolution("litwick", 2), {
    name: "lampent",
    displayName: "Lampent",
    evolution: "chandelure"
  }),
  chandelure: _objectSpread({}, getEvolution("litwick", 3), {
    name: "chandelure",
    displayName: "Chandelure"
  }),
  fletchling: _objectSpread({}, getEvolution("fletchling", 1), {
    name: "fletchling",
    displayName: "Fletchling",
    evolution: "fletchinder"
  }),
  fletchinder: _objectSpread({}, getEvolution("fletchling", 2), {
    name: "fletchinder",
    displayName: "Fletchinder",
    evolution: "talonflame"
  }),
  talonflame: _objectSpread({}, getEvolution("fletchling", 3), {
    name: "talonflame",
    displayName: "Talonflame"
  }),
  rotomw: _objectSpread({}, getEvolution("rotomw", 1), {
    name: "rotomw",
    displayName: "Rotom Wash",
    evolution: "rotomw-2"
  }),
  "rotomw-2": _objectSpread({}, getEvolution("rotomw", 2), {
    name: "rotomw-2",
    displayName: "Rotom Wash",
    evolution: "rotomw-3"
  }),
  "rotomw-3": _objectSpread({}, getEvolution("rotomw", 3), {
    name: "rotomw-3",
    displayName: "Rotom Wash"
  }),
  magnemite: _objectSpread({}, getEvolution("magnemite", 1), {
    name: "magnemite",
    displayName: "Magnemite",
    evolution: "magneton"
  }),
  magneton: _objectSpread({}, getEvolution("magnemite", 2), {
    name: "magneton",
    displayName: "Magneton",
    evolution: "magnezone"
  }),
  magnezone: _objectSpread({}, getEvolution("magnemite", 3), {
    name: "magnezone",
    displayName: "Magnezone"
  }),
  grubbin: _objectSpread({}, getEvolution("grubbin", 1), {
    name: "grubbin",
    displayName: "Grubbin",
    evolution: "charjabug"
  }),
  charjabug: _objectSpread({}, getEvolution("grubbin", 2), {
    name: "charjabug",
    displayName: "Charjabug",
    evolution: "vikavolt"
  }),
  vikavolt: _objectSpread({}, getEvolution("grubbin", 3), {
    name: "vikavolt",
    displayName: "Vikavolt"
  }),
  wooloo: _objectSpread({}, getEvolution("wooloo", 1), {
    name: "wooloo",
    displayName: "Wooloo",
    evolution: "dubwool"
  }),
  dubwool: _objectSpread({}, getEvolution("wooloo", 2), {
    name: "dubwool",
    displayName: "Dubwool",
    evolution: "dubwool-2"
  }),
  "dubwool-2": _objectSpread({}, getEvolution("wooloo", 3), {
    name: "dubwool-2",
    displayName: "Dubwool"
  }),
  larvesta: _objectSpread({}, getEvolution("larvesta", 1), {
    name: "larvesta",
    displayName: "Larvesta",
    evolution: "volcarona"
  }),
  volcarona: _objectSpread({}, getEvolution("larvesta", 2), {
    name: "volcarona",
    displayName: "Volcarona",
    evolution: "volcarona-2"
  }),
  "volcarona-2": _objectSpread({}, getEvolution("larvesta", 2), {
    name: "volcarona-2",
    displayName: "Volcarona"
  }),
  gible: _objectSpread({}, getEvolution("gible", 1), {
    name: "gible",
    displayName: "Gible",
    evolution: "gabite"
  }),
  gabite: _objectSpread({}, getEvolution("gible", 2), {
    name: "gabite",
    displayName: "Gabite",
    evolution: "garchomp"
  }),
  garchomp: _objectSpread({}, getEvolution("gible", 3), {
    name: "garchomp",
    displayName: "Garchomp"
  }),
  zorua: _objectSpread({}, getEvolution("zorua", 1), {
    name: "zorua",
    displayName: "Zorua",
    evolution: "zorua-2"
  }),
  "zorua-2": _objectSpread({}, getEvolution("zorua", 2), {
    name: "zorua-2",
    displayName: "Zorua",
    evolution: "zoroark"
  }),
  zoroark: _objectSpread({}, getEvolution("zorua", 3), {
    name: "zoroark",
    displayName: "Zoroark"
  }),
  abra: _objectSpread({}, getEvolution("abra", 1), {
    name: "abra",
    displayName: "Abra",
    evolution: "kadabra"
  }),
  kadabra: _objectSpread({}, getEvolution("abra", 2), {
    name: "kadabra",
    displayName: "Kadabra",
    evolution: "alakazam"
  }),
  alakazam: _objectSpread({}, getEvolution("abra", 3), {
    name: "alakazam",
    displayName: "Alakazam"
  }),
  litten: _objectSpread({}, getEvolution("litten", 1), {
    name: "litten",
    displayName: "Litten",
    evolution: "torracat"
  }),
  torracat: _objectSpread({}, getEvolution("litten", 2), {
    name: "torracat",
    displayName: "Torracat",
    evolution: "incineroar"
  }),
  incineroar: _objectSpread({}, getEvolution("litten", 3), {
    name: "incineroar",
    displayName: "Incineroar"
  }),
  mewtwo: _objectSpread({}, getEvolution("mewtwo", 1), {
    name: "mewtwo",
    displayName: "Mewtwo",
    evolution: "mewtwo-2"
  }),
  "mewtwo-2": _objectSpread({}, getEvolution("mewtwo", 2), {
    name: "mewtwo-2",
    displayName: "Mewtwo",
    evolution: "mewtwo-3"
  }),
  "mewtwo-3": _objectSpread({}, getEvolution("mewtwo", 3), {
    name: "mewtwo-3",
    displayName: "Mewtwo"
  }),
  turtonator: _objectSpread({}, getEvolution("turtonator", 1), {
    name: "turtonator",
    displayName: "Turtonator",
    evolution: "turtonator-2"
  }),
  "turtonator-2": _objectSpread({}, getEvolution("turtonator", 2), {
    name: "turtonator-2",
    displayName: "Turtonator",
    evolution: "turtonator-3"
  }),
  "turtonator-3": _objectSpread({}, getEvolution("turtonator", 3), {
    name: "turtonator-3",
    displayName: "Turtonator"
  }),
  beldum: _objectSpread({}, getEvolution("beldum", 1), {
    name: "beldum",
    displayName: "Beldum",
    evolution: "metang"
  }),
  metang: _objectSpread({}, getEvolution("beldum", 2), {
    name: "metang",
    displayName: "Beldum",
    evolution: "metagross"
  }),
  metagross: _objectSpread({}, getEvolution("beldum", 3), {
    name: "metagross",
    displayName: "Metagross"
  }),
  zubat: _objectSpread({}, getEvolution("zubat", 1), {
    name: "zubat",
    displayName: "Zubat",
    evolution: "golbat"
  }),
  golbat: _objectSpread({}, getEvolution("zubat", 2), {
    name: "golbat",
    displayName: "Golbat",
    evolution: "crobat"
  }),
  crobat: _objectSpread({}, getEvolution("zubat", 3), {
    name: "crobat",
    displayName: "Crobat"
  }),
  larvitar: _objectSpread({}, getEvolution("larvitar", 1), {
    name: "larvitar",
    displayName: "Larvitar",
    evolution: "pupitar"
  }),
  pupitar: _objectSpread({}, getEvolution("larvitar", 2), {
    name: "pupitar",
    displayName: "Pupitar",
    evolution: "tyranitar"
  }),
  tyranitar: _objectSpread({}, getEvolution("larvitar", 3), {
    name: "tyranitar",
    displayName: "Tyranitar"
  }),
  gastly: _objectSpread({}, getEvolution("gastly", 1), {
    name: "gastly",
    displayName: "Gastly",
    evolution: "haunter"
  }),
  haunter: _objectSpread({}, getEvolution("gastly", 2), {
    name: "haunter",
    displayName: "Haunter",
    evolution: "gengar"
  }),
  gengar: _objectSpread({}, getEvolution("gastly", 3), {
    name: "gengar",
    displayName: "Gengar"
  }),
  bulbasaur: _objectSpread({}, getEvolution("bulbasaur", 1), {
    name: "bulbasaur",
    displayName: "Bulbasaur",
    evolution: "ivysaur"
  }),
  ivysaur: _objectSpread({}, getEvolution("bulbasaur", 2), {
    name: "ivysaur",
    displayName: "Ivysaur",
    evolution: "venusaur"
  }),
  venusaur: _objectSpread({}, getEvolution("bulbasaur", 3), {
    name: "venusaur",
    displayName: "Venusaur"
  }),
  // the plant from bulbasaur line's move uses bulbasaur base stats
  frenzyplant: _objectSpread({}, getEvolution("bulbasaur", 1), {
    name: "frenzyplant",
    displayName: "Frenzy Plant",
    move: undefined,
    basicAttack: {
      range: 2,
      stat: "specAttack",
      projectile: {
        key: "seed",
        speed: 500
      }
    },
    // override stage so it doesn't appear in the shop
    stage: 2
  }),
  darkrai: _objectSpread({}, getEvolution("darkrai", 1), {
    name: "darkrai",
    displayName: "Darkrai",
    evolution: "darkrai-2"
  }),
  "darkrai-2": _objectSpread({}, getEvolution("darkrai", 2), {
    name: "darkrai-2",
    displayName: "Darkrai",
    evolution: "darkrai-3"
  }),
  "darkrai-3": _objectSpread({}, getEvolution("darkrai", 3), {
    name: "darkrai-3",
    displayName: "Darkrai"
  }),
  exeggcute: _objectSpread({}, getEvolution("exeggcute", 1), {
    name: "exeggcute",
    displayName: "Exeggcute",
    evolution: "exeggutor"
  }),
  exeggutor: _objectSpread({}, getEvolution("exeggcute", 2), {
    name: "exeggutor",
    displayName: "Exeggutor",
    evolution: "exeggutor-2"
  }),
  "exeggutor-2": _objectSpread({}, getEvolution("exeggcute", 2), {
    name: "exeggutor-2",
    displayName: "Exeggutor"
  }),
  lapras: _objectSpread({}, getEvolution("lapras", 1), {
    name: "lapras",
    displayName: "Lapras",
    evolution: "lapras-2"
  }),
  "lapras-2": _objectSpread({}, getEvolution("lapras", 2), {
    name: "lapras-2",
    displayName: "Lapras",
    evolution: "lapras-3"
  }),
  "lapras-3": _objectSpread({}, getEvolution("lapras", 3), {
    name: "lapras-3",
    displayName: "Lapras"
  }),
  mudkip: _objectSpread({}, getEvolution("mudkip", 1), {
    name: "mudkip",
    displayName: "Mudkip",
    evolution: "marshtomp"
  }),
  marshtomp: _objectSpread({}, getEvolution("mudkip", 2), {
    name: "marshtomp",
    displayName: "Marshtomp",
    evolution: "swampert"
  }),
  swampert: _objectSpread({}, getEvolution("mudkip", 3), {
    name: "swampert",
    displayName: "Swampert"
  }),
  // the mech from the pivot synergy
  regigigas: _objectSpread({}, getEvolution("regigigas", 1), {
    name: "regigigas",
    displayName: "Regigigas",
    stage: 3
  }),
  dreepy: _objectSpread({}, getEvolution("dreepy", 1), {
    name: "dreepy",
    displayName: "Dreepy",
    evolution: "drakloak"
  }),
  drakloak: _objectSpread({}, getEvolution("dreepy", 2), {
    name: "drakloak",
    displayName: "Drakloak",
    evolution: "dragapult"
  }),
  dragapult: _objectSpread({}, getEvolution("dreepy", 3), {
    name: "dragapult",
    displayName: "Dragapult"
  }),
  heatran: _objectSpread({}, getEvolution("heatran", 1), {
    name: "heatran",
    displayName: "Heatran",
    evolution: "heatran-2"
  }),
  "heatran-2": _objectSpread({}, getEvolution("heatran", 2), {
    name: "heatran-2",
    displayName: "Heatran",
    evolution: "heatran-3"
  }),
  "heatran-3": _objectSpread({}, getEvolution("heatran", 3), {
    name: "heatran-3",
    displayName: "Heatran"
  }),
  landorus: _objectSpread({}, getEvolution("landorus", 1), {
    name: "landorus",
    displayName: "Landorus",
    evolution: "landorus-2"
  }),
  "landorus-2": _objectSpread({}, getEvolution("landorus", 2), {
    name: "landorus-2",
    displayName: "Landorus",
    evolution: "landorus-3"
  }),
  "landorus-3": _objectSpread({}, getEvolution("landorus", 3), {
    name: "landorus-3",
    displayName: "Landorus"
  }),
  // not actually used - just here so the landorustherian texture gets loaded properly.
  landorustherian: _objectSpread({}, getEvolution("landorus", 3), {
    name: "landorustherian",
    displayName: "Landorus-Therian"
  }),
  nihilego: _objectSpread({}, getEvolution("nihilego", 1), {
    name: "nihilego",
    displayName: "Nihilego",
    evolution: "nihilego-2"
  }),
  "nihilego-2": _objectSpread({}, getEvolution("nihilego", 2), {
    name: "nihilego-2",
    displayName: "Nihilego",
    evolution: "nihilego-3"
  }),
  "nihilego-3": _objectSpread({}, getEvolution("nihilego", 3), {
    name: "nihilego-3",
    displayName: "Nihilego"
  }),
  stonjourner: _objectSpread({}, getEvolution("stonjourner", 1), {
    name: "stonjourner",
    displayName: "Stonjourner",
    evolution: "stonjourner-2"
  }),
  "stonjourner-2": _objectSpread({}, getEvolution("stonjourner", 2), {
    name: "stonjourner-2",
    displayName: "Stonjourner",
    evolution: "stonjourner-3"
  }),
  "stonjourner-3": _objectSpread({}, getEvolution("stonjourner", 3), {
    name: "stonjourner-3",
    displayName: "Stonjourner"
  }),
  geodude: _objectSpread({}, getEvolution("geodude", 1), {
    name: "geodude",
    displayName: "Geodude",
    evolution: "graveler"
  }),
  graveler: _objectSpread({}, getEvolution("geodude", 2), {
    name: "graveler",
    displayName: "Graveler",
    evolution: "golem"
  }),
  golem: _objectSpread({}, getEvolution("geodude", 3), {
    name: "golem",
    displayName: "Golem"
  }),
  honedge: _objectSpread({}, getEvolution("honedge", 1), {
    name: "honedge",
    displayName: "Honedge",
    evolution: "doublade"
  }),
  doublade: _objectSpread({}, getEvolution("honedge", 2), {
    name: "doublade",
    displayName: "Doublade",
    evolution: "aegislash"
  }),
  aegislash: _objectSpread({}, getEvolution("honedge", 3), {
    name: "aegislash",
    displayName: "Aegislash"
  }),
  // not actually used - just here so the aegislashshield texture gets loaded properly.
  aegislashshield: _objectSpread({}, getEvolution("honedge", 3), {
    name: "aegislashshield",
    displayName: "Aegislash-Shield"
  }),
  neutral_only_rattata: _objectSpread({}, getEvolution("neutral_only_rattata", 1), {
    name: "neutral_only_rattata",
    displayName: "Rattata",
    stage: 2
  })
}; //  getEvolution(pokemon, stage) {
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

var allPokemonNames = Object.keys(rawPokemonData); // use Object.fromEntries to convert the array of entries into an object
// each rawPokemmonData is an object which should map

exports.allPokemonNames = allPokemonNames;
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

var PkmIndex = (_PkmIndex = {}, _defineProperty(_PkmIndex, Pkm.EGG, "0000-0004"), _defineProperty(_PkmIndex, Pkm.DEFAULT, "0000"), _defineProperty(_PkmIndex, Pkm.DITTO, "0132"), _defineProperty(_PkmIndex, Pkm.BULBASAUR, "0001"), _defineProperty(_PkmIndex, Pkm.IVYSAUR, "0002"), _defineProperty(_PkmIndex, Pkm.VENUSAUR, "0003"), _defineProperty(_PkmIndex, Pkm.CHARMANDER, "0004"), _defineProperty(_PkmIndex, Pkm.CHARMELEON, "0005"), _defineProperty(_PkmIndex, Pkm.CHARIZARD, "0006"), _defineProperty(_PkmIndex, Pkm.SQUIRTLE, "0007"), _defineProperty(_PkmIndex, Pkm.WARTORTLE, "0008"), _defineProperty(_PkmIndex, Pkm.BLASTOISE, "0009"), _defineProperty(_PkmIndex, Pkm.GEODUDE, "0074"), _defineProperty(_PkmIndex, Pkm.GRAVELER, "0075"), _defineProperty(_PkmIndex, Pkm.GOLEM, "0076"), _defineProperty(_PkmIndex, Pkm.AZURILL, "0298"), _defineProperty(_PkmIndex, Pkm.MARILL, "0183"), _defineProperty(_PkmIndex, Pkm.AZUMARILL, "0184"), _defineProperty(_PkmIndex, Pkm.ZUBAT, "0041"), _defineProperty(_PkmIndex, Pkm.GOLBAT, "0042"), _defineProperty(_PkmIndex, Pkm.CROBAT, "0169"), _defineProperty(_PkmIndex, Pkm.MAREEP, "0179"), _defineProperty(_PkmIndex, Pkm.FLAFFY, "0180"), _defineProperty(_PkmIndex, Pkm.AMPHAROS, "0181"), _defineProperty(_PkmIndex, Pkm.CLEFFA, "0173"), _defineProperty(_PkmIndex, Pkm.CLEFAIRY, "0035"), _defineProperty(_PkmIndex, Pkm.CLEFABLE, "0036"), _defineProperty(_PkmIndex, Pkm.IGGLYBUFF, "0174"), _defineProperty(_PkmIndex, Pkm.WIGGLYTUFF, "0040"), _defineProperty(_PkmIndex, Pkm.JIGGLYPUFF, "0039"), _defineProperty(_PkmIndex, Pkm.CATERPIE, "0010"), _defineProperty(_PkmIndex, Pkm.METAPOD, "0011"), _defineProperty(_PkmIndex, Pkm.BUTTERFREE, "0012"), _defineProperty(_PkmIndex, Pkm.WEEDLE, "0013"), _defineProperty(_PkmIndex, Pkm.KAKUNA, "0014"), _defineProperty(_PkmIndex, Pkm.BEEDRILL, "0015"), _defineProperty(_PkmIndex, Pkm.PIDGEY, "0016"), _defineProperty(_PkmIndex, Pkm.PIDGEOTTO, "0017"), _defineProperty(_PkmIndex, Pkm.PIDGEOT, "0018"), _defineProperty(_PkmIndex, Pkm.HOPPIP, "0187"), _defineProperty(_PkmIndex, Pkm.SKIPLOOM, "0188"), _defineProperty(_PkmIndex, Pkm.JUMPLUFF, "0189"), _defineProperty(_PkmIndex, Pkm.SEEDOT, "0273"), _defineProperty(_PkmIndex, Pkm.NUZLEAF, "0274"), _defineProperty(_PkmIndex, Pkm.SHIFTRY, "0275"), _defineProperty(_PkmIndex, Pkm.STARLY, "0396"), _defineProperty(_PkmIndex, Pkm.STARAVIA, "0397"), _defineProperty(_PkmIndex, Pkm.STARAPTOR, "0398"), _defineProperty(_PkmIndex, Pkm.CHIKORITA, "0152"), _defineProperty(_PkmIndex, Pkm.BAYLEEF, "0153"), _defineProperty(_PkmIndex, Pkm.MEGANIUM, "0154"), _defineProperty(_PkmIndex, Pkm.CYNDAQUIL, "0155"), _defineProperty(_PkmIndex, Pkm.QUILAVA, "0156"), _defineProperty(_PkmIndex, Pkm.TYPHLOSION, "0157"), _defineProperty(_PkmIndex, Pkm.TOTODILE, "0158"), _defineProperty(_PkmIndex, Pkm.CROCONAW, "0159"), _defineProperty(_PkmIndex, Pkm.FERALIGATR, "0160"), _defineProperty(_PkmIndex, Pkm.TREECKO, "0252"), _defineProperty(_PkmIndex, Pkm.GROVYLE, "0253"), _defineProperty(_PkmIndex, Pkm.SCEPTILE, "0254"), _defineProperty(_PkmIndex, Pkm.TORCHIC, "0255"), _defineProperty(_PkmIndex, Pkm.COMBUSKEN, "0256"), _defineProperty(_PkmIndex, Pkm.BLAZIKEN, "0257"), _defineProperty(_PkmIndex, Pkm.MUDKIP, "0258"), _defineProperty(_PkmIndex, Pkm.MARSHTOMP, "0259"), _defineProperty(_PkmIndex, Pkm.SWAMPERT, "0260"), _defineProperty(_PkmIndex, Pkm.TURTWIG, "0387"), _defineProperty(_PkmIndex, Pkm.GROTLE, "0388"), _defineProperty(_PkmIndex, Pkm.TORTERRA, "0389"), _defineProperty(_PkmIndex, Pkm.CHIMCHAR, "0390"), _defineProperty(_PkmIndex, Pkm.MONFERNO, "0391"), _defineProperty(_PkmIndex, Pkm.INFERNAPE, "0392"), _defineProperty(_PkmIndex, Pkm.PIPLUP, "0393"), _defineProperty(_PkmIndex, Pkm.PRINPLUP, "0394"), _defineProperty(_PkmIndex, Pkm.EMPOLEON, "0395"), _defineProperty(_PkmIndex, Pkm.NIDORANF, "0029"), _defineProperty(_PkmIndex, Pkm.NIDORINA, "0030"), _defineProperty(_PkmIndex, Pkm.NIDOQUEEN, "0031"), _defineProperty(_PkmIndex, Pkm.NIDORANM, "0032"), _defineProperty(_PkmIndex, Pkm.NIDORINO, "0033"), _defineProperty(_PkmIndex, Pkm.NIDOKING, "0034"), _defineProperty(_PkmIndex, Pkm.PICHU, "0172"), _defineProperty(_PkmIndex, Pkm.PIKACHU, "0025"), _defineProperty(_PkmIndex, Pkm.RAICHU, "0026"), _defineProperty(_PkmIndex, Pkm.SANDSHREW, "0027"), _defineProperty(_PkmIndex, Pkm.SANDSLASH, "0028"), _defineProperty(_PkmIndex, Pkm.MACHOP, "0066"), _defineProperty(_PkmIndex, Pkm.MACHOKE, "0067"), _defineProperty(_PkmIndex, Pkm.MACHAMP, "0068"), _defineProperty(_PkmIndex, Pkm.HORSEA, "0116"), _defineProperty(_PkmIndex, Pkm.SEADRA, "0117"), _defineProperty(_PkmIndex, Pkm.KINGDRA, "0230"), _defineProperty(_PkmIndex, Pkm.TRAPINCH, "0328"), _defineProperty(_PkmIndex, Pkm.VIBRAVA, "0329"), _defineProperty(_PkmIndex, Pkm.FLYGON, "0330"), _defineProperty(_PkmIndex, Pkm.SPHEAL, "0363"), _defineProperty(_PkmIndex, Pkm.SEALEO, "0364"), _defineProperty(_PkmIndex, Pkm.WALREIN, "0365"), _defineProperty(_PkmIndex, Pkm.ARON, "0304"), _defineProperty(_PkmIndex, Pkm.LAIRON, "0305"), _defineProperty(_PkmIndex, Pkm.AGGRON, "0306"), _defineProperty(_PkmIndex, Pkm.MAGNEMITE, "0081"), _defineProperty(_PkmIndex, Pkm.MAGNETON, "0082"), _defineProperty(_PkmIndex, Pkm.MAGNEZONE, "0462"), _defineProperty(_PkmIndex, Pkm.RHYHORN, "0111"), _defineProperty(_PkmIndex, Pkm.RHYDON, "0112"), _defineProperty(_PkmIndex, Pkm.RHYPERIOR, "0464"), _defineProperty(_PkmIndex, Pkm.TOGEPI, "0175"), _defineProperty(_PkmIndex, Pkm.TOGETIC, "0176"), _defineProperty(_PkmIndex, Pkm.TOGEKISS, "0468"), _defineProperty(_PkmIndex, Pkm.DUSKULL, "0355"), _defineProperty(_PkmIndex, Pkm.DUSCLOPS, "0356"), _defineProperty(_PkmIndex, Pkm.DUSKNOIR, "0477"), _defineProperty(_PkmIndex, Pkm.LOTAD, "0270"), _defineProperty(_PkmIndex, Pkm.LOMBRE, "0271"), _defineProperty(_PkmIndex, Pkm.LUDICOLO, "0272"), _defineProperty(_PkmIndex, Pkm.SHINX, "0403"), _defineProperty(_PkmIndex, Pkm.LUXIO, "0404"), _defineProperty(_PkmIndex, Pkm.LUXRAY, "0405"), _defineProperty(_PkmIndex, Pkm.POLIWAG, "0060"), _defineProperty(_PkmIndex, Pkm.POLIWHIRL, "0061"), _defineProperty(_PkmIndex, Pkm.POLITOED, "0186"), _defineProperty(_PkmIndex, Pkm.ABRA, "0063"), _defineProperty(_PkmIndex, Pkm.KADABRA, "0064"), _defineProperty(_PkmIndex, Pkm.ALAKAZAM, "0065"), _defineProperty(_PkmIndex, Pkm.GASTLY, "0092"), _defineProperty(_PkmIndex, Pkm.HAUNTER, "0093"), _defineProperty(_PkmIndex, Pkm.GENGAR, "0094"), _defineProperty(_PkmIndex, Pkm.DRATINI, "0147"), _defineProperty(_PkmIndex, Pkm.DRAGONAIR, "0148"), _defineProperty(_PkmIndex, Pkm.DRAGONITE, "0149"), _defineProperty(_PkmIndex, Pkm.LARVITAR, "0246"), _defineProperty(_PkmIndex, Pkm.PUPITAR, "0247"), _defineProperty(_PkmIndex, Pkm.TYRANITAR, "0248"), _defineProperty(_PkmIndex, Pkm.SLAKOTH, "0287"), _defineProperty(_PkmIndex, Pkm.VIGOROTH, "0288"), _defineProperty(_PkmIndex, Pkm.SLAKING, "0289"), _defineProperty(_PkmIndex, Pkm.RALTS, "0280"), _defineProperty(_PkmIndex, Pkm.KIRLIA, "0281"), _defineProperty(_PkmIndex, Pkm.GARDEVOIR, "0282"), _defineProperty(_PkmIndex, Pkm.BAGON, "0371"), _defineProperty(_PkmIndex, Pkm.SHELGON, "0372"), _defineProperty(_PkmIndex, Pkm.SALAMENCE, "0373"), _defineProperty(_PkmIndex, Pkm.BELDUM, "0374"), _defineProperty(_PkmIndex, Pkm.METANG, "0375"), _defineProperty(_PkmIndex, Pkm.METAGROSS, "0376"), _defineProperty(_PkmIndex, Pkm.GIBLE, "0443"), _defineProperty(_PkmIndex, Pkm.GABITE, "0444"), _defineProperty(_PkmIndex, Pkm.GARCHOMP, "0445"), _defineProperty(_PkmIndex, Pkm.ELEKID, "0239"), _defineProperty(_PkmIndex, Pkm.ELECTABUZZ, "0125"), _defineProperty(_PkmIndex, Pkm.ELECTIVIRE, "0466"), _defineProperty(_PkmIndex, Pkm.MAGBY, "0240"), _defineProperty(_PkmIndex, Pkm.MAGMAR, "0126"), _defineProperty(_PkmIndex, Pkm.MAGMORTAR, "0467"), _defineProperty(_PkmIndex, Pkm.MUNCHLAX, "0446"), _defineProperty(_PkmIndex, Pkm.SNORLAX, "0143"), _defineProperty(_PkmIndex, Pkm.GROWLITHE, "0058"), _defineProperty(_PkmIndex, Pkm.ARCANINE, "0059"), _defineProperty(_PkmIndex, Pkm.ONIX, "0095"), _defineProperty(_PkmIndex, Pkm.STEELIX, "0208"), _defineProperty(_PkmIndex, Pkm.MEGA_STEELIX, "0208-0001"), _defineProperty(_PkmIndex, Pkm.SCYTHER, "0123"), _defineProperty(_PkmIndex, Pkm.SCIZOR, "0212"), _defineProperty(_PkmIndex, Pkm.MEGA_SCIZOR, "0212-0001"), _defineProperty(_PkmIndex, Pkm.RIOLU, "0447"), _defineProperty(_PkmIndex, Pkm.LUCARIO, "0448"), _defineProperty(_PkmIndex, Pkm.MEGA_LUCARIO, "0448-0001"), _defineProperty(_PkmIndex, Pkm.MAGIKARP, "0129"), _defineProperty(_PkmIndex, Pkm.RATTATA, "0019"), _defineProperty(_PkmIndex, Pkm.RATICATE, "0020"), _defineProperty(_PkmIndex, Pkm.SPEAROW, "0021"), _defineProperty(_PkmIndex, Pkm.FEAROW, "0022"), _defineProperty(_PkmIndex, Pkm.GYARADOS, "0130"), _defineProperty(_PkmIndex, Pkm.LUGIA, "0249"), _defineProperty(_PkmIndex, Pkm.GIRATINA, "0487"), _defineProperty(_PkmIndex, Pkm.ZAPDOS, "0145"), _defineProperty(_PkmIndex, Pkm.MOLTRES, "0146"), _defineProperty(_PkmIndex, Pkm.ARTICUNO, "0144"), _defineProperty(_PkmIndex, Pkm.DIALGA, "0483"), _defineProperty(_PkmIndex, Pkm.PALKIA, "0484"), _defineProperty(_PkmIndex, Pkm.SUICUNE, "0245"), _defineProperty(_PkmIndex, Pkm.RAIKOU, "0243"), _defineProperty(_PkmIndex, Pkm.ENTEI, "0244"), _defineProperty(_PkmIndex, Pkm.REGICE, "0378"), _defineProperty(_PkmIndex, Pkm.REGIROCK, "0377"), _defineProperty(_PkmIndex, Pkm.REGISTEEL, "0379"), _defineProperty(_PkmIndex, Pkm.KYOGRE, "0382"), _defineProperty(_PkmIndex, Pkm.GROUDON, "0383"), _defineProperty(_PkmIndex, Pkm.RAYQUAZA, "0384"), _defineProperty(_PkmIndex, Pkm.REGIGIGAS, "0486"), _defineProperty(_PkmIndex, Pkm.EEVEE, "0133"), _defineProperty(_PkmIndex, Pkm.VAPOREON, "0134"), _defineProperty(_PkmIndex, Pkm.JOLTEON, "0135"), _defineProperty(_PkmIndex, Pkm.FLAREON, "0136"), _defineProperty(_PkmIndex, Pkm.ESPEON, "0196"), _defineProperty(_PkmIndex, Pkm.UMBREON, "0197"), _defineProperty(_PkmIndex, Pkm.LEAFEON, "0470"), _defineProperty(_PkmIndex, Pkm.SYLVEON, "0700"), _defineProperty(_PkmIndex, Pkm.MEDITITE, "0307"), _defineProperty(_PkmIndex, Pkm.MEDICHAM, "0308"), _defineProperty(_PkmIndex, Pkm.MEGA_MEDICHAM, "0308-0001"), _defineProperty(_PkmIndex, Pkm.NUMEL, "0322"), _defineProperty(_PkmIndex, Pkm.CAMERUPT, "0323"), _defineProperty(_PkmIndex, Pkm.MEGA_CAMERUPT, "0323-0001"), _defineProperty(_PkmIndex, Pkm.DARKRAI, "0491"), _defineProperty(_PkmIndex, Pkm.LITWICK, "0607"), _defineProperty(_PkmIndex, Pkm.LAMPENT, "0608"), _defineProperty(_PkmIndex, Pkm.CHANDELURE, "0609"), _defineProperty(_PkmIndex, Pkm.SLOWPOKE, "0079"), _defineProperty(_PkmIndex, Pkm.SLOWBRO, "0080"), _defineProperty(_PkmIndex, Pkm.SLOWKING, "0199"), _defineProperty(_PkmIndex, Pkm.BELLSPROUT, "0069"), _defineProperty(_PkmIndex, Pkm.WEEPINBELL, "0070"), _defineProperty(_PkmIndex, Pkm.VICTREEBEL, "0071"), _defineProperty(_PkmIndex, Pkm.CARVANHA, "0318"), _defineProperty(_PkmIndex, Pkm.SWINUB, "0220"), _defineProperty(_PkmIndex, Pkm.PILOSWINE, "0221"), _defineProperty(_PkmIndex, Pkm.MAMOSWINE, "0473"), _defineProperty(_PkmIndex, Pkm.SNORUNT, "0361"), _defineProperty(_PkmIndex, Pkm.GLALIE, "0362"), _defineProperty(_PkmIndex, Pkm.FROSLASS, "0478"), _defineProperty(_PkmIndex, Pkm.SNOVER, "0459"), _defineProperty(_PkmIndex, Pkm.ABOMASNOW, "0460"), _defineProperty(_PkmIndex, Pkm.MEGA_ABOMASNOW, "0460-0001"), _defineProperty(_PkmIndex, Pkm.VANILLITE, "0582"), _defineProperty(_PkmIndex, Pkm.VANILLISH, "0583"), _defineProperty(_PkmIndex, Pkm.VANILLUXE, "0584"), _defineProperty(_PkmIndex, Pkm.GLACEON, "0471"), _defineProperty(_PkmIndex, Pkm.VOLCARONA, "0637"), _defineProperty(_PkmIndex, Pkm.LANDORUS, "0645"), _defineProperty(_PkmIndex, Pkm.THUNDURUS, "0642"), _defineProperty(_PkmIndex, Pkm.TORNADUS, "0641"), _defineProperty(_PkmIndex, Pkm.KELDEO, "0647"), _defineProperty(_PkmIndex, Pkm.TERRAKION, "0639"), _defineProperty(_PkmIndex, Pkm.VIRIZION, "0640"), _defineProperty(_PkmIndex, Pkm.COBALION, "0638"), _defineProperty(_PkmIndex, Pkm.MANAPHY, "0490"), _defineProperty(_PkmIndex, Pkm.ROTOM, "0479"), _defineProperty(_PkmIndex, Pkm.SPIRITOMB, "0442"), _defineProperty(_PkmIndex, Pkm.ABSOL, "0359"), _defineProperty(_PkmIndex, Pkm.LAPRAS, "0131"), _defineProperty(_PkmIndex, Pkm.LATIAS, "0380"), _defineProperty(_PkmIndex, Pkm.LATIOS, "0381"), _defineProperty(_PkmIndex, Pkm.MESPRIT, "0481"), _defineProperty(_PkmIndex, Pkm.AZELF, "0482"), _defineProperty(_PkmIndex, Pkm.UXIE, "0480"), _defineProperty(_PkmIndex, Pkm.MEWTWO, "0150"), _defineProperty(_PkmIndex, Pkm.KYUREM, "0646"), _defineProperty(_PkmIndex, Pkm.RESHIRAM, "0643"), _defineProperty(_PkmIndex, Pkm.ZEKROM, "0644"), _defineProperty(_PkmIndex, Pkm.CELEBI, "0251"), _defineProperty(_PkmIndex, Pkm.VICTINI, "0494"), _defineProperty(_PkmIndex, Pkm.JIRACHI, "0385"), _defineProperty(_PkmIndex, Pkm.ARCEUS, "0493"), _defineProperty(_PkmIndex, Pkm.DEOXYS, "0386"), _defineProperty(_PkmIndex, Pkm.SHAYMIN, "0492"), _defineProperty(_PkmIndex, Pkm.CRESSELIA, "0488"), _defineProperty(_PkmIndex, Pkm.HEATRAN, "0485"), _defineProperty(_PkmIndex, Pkm.HO_OH, "0250"), _defineProperty(_PkmIndex, Pkm.AERODACTYL, "0142"), _defineProperty(_PkmIndex, Pkm.PRIMAL_KYOGRE, "0382-0001"), _defineProperty(_PkmIndex, Pkm.PRIMAL_GROUDON, "0383-0001"), _defineProperty(_PkmIndex, Pkm.MEOWTH, "0052"), _defineProperty(_PkmIndex, Pkm.PERSIAN, "0053"), _defineProperty(_PkmIndex, Pkm.DEINO, "0633"), _defineProperty(_PkmIndex, Pkm.ZWEILOUS, "0634"), _defineProperty(_PkmIndex, Pkm.HYDREIGON, "0635"), _defineProperty(_PkmIndex, Pkm.SANDILE, "0551"), _defineProperty(_PkmIndex, Pkm.KROKOROK, "0552"), _defineProperty(_PkmIndex, Pkm.KROOKODILE, "0553"), _defineProperty(_PkmIndex, Pkm.SOLOSIS, "0577"), _defineProperty(_PkmIndex, Pkm.DUOSION, "0578"), _defineProperty(_PkmIndex, Pkm.REUNICLUS, "0579"), _defineProperty(_PkmIndex, Pkm.MEGA_RAYQUAZA, "0384-0001"), _defineProperty(_PkmIndex, Pkm.SWABLU, "0333"), _defineProperty(_PkmIndex, Pkm.ODDISH, "0043"), _defineProperty(_PkmIndex, Pkm.GLOOM, "0044"), _defineProperty(_PkmIndex, Pkm.VILEPLUME, "0045"), _defineProperty(_PkmIndex, Pkm.BELLOSSOM, "0182"), _defineProperty(_PkmIndex, Pkm.AMAURA, "0698"), _defineProperty(_PkmIndex, Pkm.AURORUS, "0699"), _defineProperty(_PkmIndex, Pkm.ANORITH, "0347"), _defineProperty(_PkmIndex, Pkm.ARMALDO, "0348"), _defineProperty(_PkmIndex, Pkm.ARCHEN, "0566"), _defineProperty(_PkmIndex, Pkm.ARCHEOPS, "0567"), _defineProperty(_PkmIndex, Pkm.SHIELDON, "0410"), _defineProperty(_PkmIndex, Pkm.BASTIODON, "0411"), _defineProperty(_PkmIndex, Pkm.TIRTOUGA, "0564"), _defineProperty(_PkmIndex, Pkm.CARRACOSTA, "0565"), _defineProperty(_PkmIndex, Pkm.LILEEP, "0345"), _defineProperty(_PkmIndex, Pkm.CRADILY, "0346"), _defineProperty(_PkmIndex, Pkm.CRANIDOS, "0408"), _defineProperty(_PkmIndex, Pkm.RAMPARDOS, "0409"), _defineProperty(_PkmIndex, Pkm.KABUTO, "0140"), _defineProperty(_PkmIndex, Pkm.KABUTOPS, "0141"), _defineProperty(_PkmIndex, Pkm.OMANYTE, "0138"), _defineProperty(_PkmIndex, Pkm.OMASTAR, "0139"), _defineProperty(_PkmIndex, Pkm.TYRUNT, "0696"), _defineProperty(_PkmIndex, Pkm.TYRANTRUM, "0697"), _defineProperty(_PkmIndex, Pkm.BUDEW, "0406"), _defineProperty(_PkmIndex, Pkm.ROSELIA, "0315"), _defineProperty(_PkmIndex, Pkm.ROSERADE, "0407"), _defineProperty(_PkmIndex, Pkm.BUNEARY, "0427"), _defineProperty(_PkmIndex, Pkm.LOPUNNY, "0428"), _defineProperty(_PkmIndex, Pkm.MEGA_LOPUNNY, "0428-0001"), _defineProperty(_PkmIndex, Pkm.AXEW, "0610"), _defineProperty(_PkmIndex, Pkm.FRAXURE, "0611"), _defineProperty(_PkmIndex, Pkm.HAXORUS, "0612"), _defineProperty(_PkmIndex, Pkm.VENIPEDE, "0543"), _defineProperty(_PkmIndex, Pkm.WHIRLIPEDE, "0544"), _defineProperty(_PkmIndex, Pkm.SCOLIPEDE, "0545"), _defineProperty(_PkmIndex, Pkm.PORYGON, "0137"), _defineProperty(_PkmIndex, Pkm.PORYGON_2, "0233"), _defineProperty(_PkmIndex, Pkm.PORYGON_Z, "0474"), _defineProperty(_PkmIndex, Pkm.ELECTRIKE, "0309"), _defineProperty(_PkmIndex, Pkm.MANECTRIC, "0310"), _defineProperty(_PkmIndex, Pkm.MEGA_MANECTRIC, "0310-0001"), _defineProperty(_PkmIndex, Pkm.SHUPPET, "0353"), _defineProperty(_PkmIndex, Pkm.BANETTE, "0354"), _defineProperty(_PkmIndex, Pkm.MEGA_BANETTE, "0354-0001"), _defineProperty(_PkmIndex, Pkm.HONEDGE, "0679"), _defineProperty(_PkmIndex, Pkm.DOUBLADE, "0680"), _defineProperty(_PkmIndex, Pkm.AEGISLASH, "0681"), _defineProperty(_PkmIndex, Pkm.CUBONE, "0104"), _defineProperty(_PkmIndex, Pkm.MAROWAK, "0105"), _defineProperty(_PkmIndex, Pkm.ALOLAN_MAROWAK, "0105-0001"), _defineProperty(_PkmIndex, Pkm.WHISMUR, "0293"), _defineProperty(_PkmIndex, Pkm.LOUDRED, "0294"), _defineProperty(_PkmIndex, Pkm.EXPLOUD, "0295"), _defineProperty(_PkmIndex, Pkm.TYMPOLE, "0535"), _defineProperty(_PkmIndex, Pkm.PALPITOAD, "0536"), _defineProperty(_PkmIndex, Pkm.SEISMITOAD, "0537"), _defineProperty(_PkmIndex, Pkm.SEWADDLE, "0540"), _defineProperty(_PkmIndex, Pkm.SWADLOON, "0541"), _defineProperty(_PkmIndex, Pkm.LEAVANNY, "0542"), _defineProperty(_PkmIndex, Pkm.PIKIPEK, "0731"), _defineProperty(_PkmIndex, Pkm.TRUMBEAK, "0732"), _defineProperty(_PkmIndex, Pkm.TOUCANNON, "0733"), _defineProperty(_PkmIndex, Pkm.FLABEBE, "0669"), _defineProperty(_PkmIndex, Pkm.FLOETTE, "0670"), _defineProperty(_PkmIndex, Pkm.FLORGES, "0671"), _defineProperty(_PkmIndex, Pkm.JANGMO_O, "0782"), _defineProperty(_PkmIndex, Pkm.HAKAMO_O, "0783"), _defineProperty(_PkmIndex, Pkm.KOMMO_O, "0784"), _defineProperty(_PkmIndex, Pkm.MELOETTA, "0648"), _defineProperty(_PkmIndex, Pkm.ALTARIA, "0334"), _defineProperty(_PkmIndex, Pkm.MEGA_ALTARIA, "0334-0001"), _defineProperty(_PkmIndex, Pkm.CASTFORM, "0351"), _defineProperty(_PkmIndex, Pkm.CASTFORM_SUN, "0351-0001"), _defineProperty(_PkmIndex, Pkm.CASTFORM_RAIN, "0351-0002"), _defineProperty(_PkmIndex, Pkm.CASTFORM_HAIL, "0351-0003"), _defineProperty(_PkmIndex, Pkm.CORPHISH, "0341"), _defineProperty(_PkmIndex, Pkm.CRAWDAUNT, "0342"), _defineProperty(_PkmIndex, Pkm.JOLTIK, "0595"), _defineProperty(_PkmIndex, Pkm.GALVANTULA, "0596"), _defineProperty(_PkmIndex, Pkm.GENESECT, "0649"), _defineProperty(_PkmIndex, Pkm.RELICANTH, "0369"), _defineProperty(_PkmIndex, Pkm.DIANCIE, "0719"), _defineProperty(_PkmIndex, Pkm.HATENNA, "0856"), _defineProperty(_PkmIndex, Pkm.HATTREM, "0857"), _defineProperty(_PkmIndex, Pkm.HATTERENE, "0858"), _defineProperty(_PkmIndex, Pkm.FENNEKIN, "0653"), _defineProperty(_PkmIndex, Pkm.BRAIXEN, "0654"), _defineProperty(_PkmIndex, Pkm.DELPHOX, "0655"), _defineProperty(_PkmIndex, Pkm.MAKUHITA, "0296"), _defineProperty(_PkmIndex, Pkm.HARIYAMA, "0297"), _defineProperty(_PkmIndex, Pkm.REGIELEKI, "0894"), _defineProperty(_PkmIndex, Pkm.REGIDRAGO, "0895"), _defineProperty(_PkmIndex, Pkm.GUZZLORD, "0799"), _defineProperty(_PkmIndex, Pkm.ETERNATUS, "0890"), _defineProperty(_PkmIndex, Pkm.NOIBAT, "0714"), _defineProperty(_PkmIndex, Pkm.NOIVERN, "0715"), _defineProperty(_PkmIndex, Pkm.PUMPKABOO, "0710"), _defineProperty(_PkmIndex, Pkm.GOURGEIST, "0711"), _defineProperty(_PkmIndex, Pkm.NINCADA, "0290"), _defineProperty(_PkmIndex, Pkm.NINJASK, "0291"), _defineProperty(_PkmIndex, Pkm.SHEDNINJA, "0292"), _defineProperty(_PkmIndex, Pkm.PONYTA, "0077"), _defineProperty(_PkmIndex, Pkm.RAPIDASH, "0078"), _defineProperty(_PkmIndex, Pkm.CACNEA, "0331"), _defineProperty(_PkmIndex, Pkm.CACTURNE, "0332"), _defineProperty(_PkmIndex, Pkm.TAUROS, "0128"), _defineProperty(_PkmIndex, Pkm.HAPPINY, "0440"), _defineProperty(_PkmIndex, Pkm.CHANSEY, "0113"), _defineProperty(_PkmIndex, Pkm.BLISSEY, "0242"), _defineProperty(_PkmIndex, Pkm.TAPU_KOKO, "0785"), _defineProperty(_PkmIndex, Pkm.TAPU_LELE, "0786"), _defineProperty(_PkmIndex, Pkm.STAKATAKA, "0805"), _defineProperty(_PkmIndex, Pkm.BLACEPHALON, "0806"), _defineProperty(_PkmIndex, Pkm.HOUNDOUR, "0228"), _defineProperty(_PkmIndex, Pkm.HOUNDOOM, "0229"), _defineProperty(_PkmIndex, Pkm.MEGA_HOUNDOOM, "0229-0001"), _defineProperty(_PkmIndex, Pkm.CLAMPERL, "0366"), _defineProperty(_PkmIndex, Pkm.HUNTAIL, "0367"), _defineProperty(_PkmIndex, Pkm.GOREBYSS, "0368"), _defineProperty(_PkmIndex, Pkm.SMOOCHUM, "0238"), _defineProperty(_PkmIndex, Pkm.JYNX, "0124"), _defineProperty(_PkmIndex, Pkm.SALANDIT, "0757"), _defineProperty(_PkmIndex, Pkm.SALAZZLE, "0758"), _defineProperty(_PkmIndex, Pkm.VENONAT, "0048"), _defineProperty(_PkmIndex, Pkm.VENOMOTH, "0049"), _defineProperty(_PkmIndex, Pkm.VOLTORB, "0100"), _defineProperty(_PkmIndex, Pkm.ELECTRODE, "0101"), _defineProperty(_PkmIndex, Pkm.SLUGMA, "0218"), _defineProperty(_PkmIndex, Pkm.MAGCARGO, "0219"), _defineProperty(_PkmIndex, Pkm.SNEASEL, "0215"), _defineProperty(_PkmIndex, Pkm.WEAVILE, "0461"), _defineProperty(_PkmIndex, Pkm.CROAGUNK, "0453"), _defineProperty(_PkmIndex, Pkm.TOXICROAK, "0454"), _defineProperty(_PkmIndex, Pkm.CHINCHOU, "0170"), _defineProperty(_PkmIndex, Pkm.LANTURN, "0171"), _defineProperty(_PkmIndex, Pkm.POOCHYENA, "0261"), _defineProperty(_PkmIndex, Pkm.MIGHTYENA, "0262"), _defineProperty(_PkmIndex, Pkm.BRONZOR, "0436"), _defineProperty(_PkmIndex, Pkm.BRONZONG, "0437"), _defineProperty(_PkmIndex, Pkm.DRIFLOON, "0425"), _defineProperty(_PkmIndex, Pkm.DRIFBLIM, "0426"), _defineProperty(_PkmIndex, Pkm.SHROOMISH, "0285"), _defineProperty(_PkmIndex, Pkm.BRELOOM, "0286"), _defineProperty(_PkmIndex, Pkm.TENTACOOL, "0072"), _defineProperty(_PkmIndex, Pkm.TENTACRUEL, "0073"), _defineProperty(_PkmIndex, Pkm.SNUBULL, "0209"), _defineProperty(_PkmIndex, Pkm.GRANBULL, "0210"), _defineProperty(_PkmIndex, Pkm.SEVIPER, "0336"), _defineProperty(_PkmIndex, Pkm.VULPIX, "0037"), _defineProperty(_PkmIndex, Pkm.NINETALES, "0038"), _defineProperty(_PkmIndex, Pkm.ALOLAN_VULPIX, "0037-0001"), _defineProperty(_PkmIndex, Pkm.ALOLAN_NINETALES, "0038-0001"), _defineProperty(_PkmIndex, Pkm.BUIZEL, "0418"), _defineProperty(_PkmIndex, Pkm.FLOATZEL, "0419"), _defineProperty(_PkmIndex, Pkm.KECLEON, "0352"), _defineProperty(_PkmIndex, Pkm.MAWILE, "0303"), _defineProperty(_PkmIndex, Pkm.CARBINK, "0703"), _defineProperty(_PkmIndex, Pkm.CHATOT, "0441"), _defineProperty(_PkmIndex, Pkm.GOOMY, "0704"), _defineProperty(_PkmIndex, Pkm.SLIGOO, "0705"), _defineProperty(_PkmIndex, Pkm.GOODRA, "0706"), _defineProperty(_PkmIndex, Pkm.MEW, "0151"), _defineProperty(_PkmIndex, Pkm.BOUNSWEET, "0761"), _defineProperty(_PkmIndex, Pkm.STEENEE, "0762"), _defineProperty(_PkmIndex, Pkm.TSAREENA, "0763"), _defineProperty(_PkmIndex, Pkm.VOLCANION, "0721"), _defineProperty(_PkmIndex, Pkm.APPLIN, "0840"), _defineProperty(_PkmIndex, Pkm.APPLETUN, "0842"), _defineProperty(_PkmIndex, Pkm.OSHAWOTT, "0501"), _defineProperty(_PkmIndex, Pkm.DEWOTT, "0502"), _defineProperty(_PkmIndex, Pkm.SAMUROTT, "0503"), _defineProperty(_PkmIndex, Pkm.SNOM, "0872"), _defineProperty(_PkmIndex, Pkm.FROSMOTH, "0873"), _defineProperty(_PkmIndex, Pkm.WAILMER, "0320"), _defineProperty(_PkmIndex, Pkm.WAILORD, "0321"), _defineProperty(_PkmIndex, Pkm.DREEPY, "0885"), _defineProperty(_PkmIndex, Pkm.DRAKLOAK, "0886"), _defineProperty(_PkmIndex, Pkm.DRAGAPULT, "0887"), _defineProperty(_PkmIndex, Pkm.SNIVY, "0495"), _defineProperty(_PkmIndex, Pkm.SERVINE, "0496"), _defineProperty(_PkmIndex, Pkm.SERPERIOR, "0497"), _defineProperty(_PkmIndex, Pkm.SCORBUNNY, "0813"), _defineProperty(_PkmIndex, Pkm.RABOOT, "0814"), _defineProperty(_PkmIndex, Pkm.CINDERACE, "0815"), _defineProperty(_PkmIndex, Pkm.POPPLIO, "0728"), _defineProperty(_PkmIndex, Pkm.BRIONNE, "0729"), _defineProperty(_PkmIndex, Pkm.PRIMARINA, "0730"), _defineProperty(_PkmIndex, Pkm.GOTHITA, "0574"), _defineProperty(_PkmIndex, Pkm.GOTHORITA, "0575"), _defineProperty(_PkmIndex, Pkm.GOTHITELLE, "0576"), _defineProperty(_PkmIndex, Pkm.FARFETCH_D, "0083"), _defineProperty(_PkmIndex, Pkm.UNOWN_A, "0201"), _defineProperty(_PkmIndex, Pkm.UNOWN_B, "0201-0001"), _defineProperty(_PkmIndex, Pkm.UNOWN_C, "0201-0002"), _defineProperty(_PkmIndex, Pkm.UNOWN_D, "0201-0003"), _defineProperty(_PkmIndex, Pkm.UNOWN_E, "0201-0004"), _defineProperty(_PkmIndex, Pkm.UNOWN_F, "0201-0005"), _defineProperty(_PkmIndex, Pkm.UNOWN_G, "0201-0006"), _defineProperty(_PkmIndex, Pkm.UNOWN_H, "0201-0007"), _defineProperty(_PkmIndex, Pkm.UNOWN_I, "0201-0008"), _defineProperty(_PkmIndex, Pkm.UNOWN_J, "0201-0009"), _defineProperty(_PkmIndex, Pkm.UNOWN_K, "0201-0010"), _defineProperty(_PkmIndex, Pkm.UNOWN_L, "0201-0011"), _defineProperty(_PkmIndex, Pkm.UNOWN_M, "0201-0012"), _defineProperty(_PkmIndex, Pkm.UNOWN_N, "0201-0013"), _defineProperty(_PkmIndex, Pkm.UNOWN_O, "0201-0014"), _defineProperty(_PkmIndex, Pkm.UNOWN_P, "0201-0015"), _defineProperty(_PkmIndex, Pkm.UNOWN_Q, "0201-0016"), _defineProperty(_PkmIndex, Pkm.UNOWN_R, "0201-0017"), _defineProperty(_PkmIndex, Pkm.UNOWN_S, "0201-0018"), _defineProperty(_PkmIndex, Pkm.UNOWN_T, "0201-0019"), _defineProperty(_PkmIndex, Pkm.UNOWN_U, "0201-0020"), _defineProperty(_PkmIndex, Pkm.UNOWN_V, "0201-0021"), _defineProperty(_PkmIndex, Pkm.UNOWN_W, "0201-0022"), _defineProperty(_PkmIndex, Pkm.UNOWN_X, "0201-0023"), _defineProperty(_PkmIndex, Pkm.UNOWN_Y, "0201-0024"), _defineProperty(_PkmIndex, Pkm.UNOWN_Z, "0201-0025"), _defineProperty(_PkmIndex, Pkm.UNOWN_QUESTION, "0201-0027"), _defineProperty(_PkmIndex, Pkm.UNOWN_EXCLAMATION, "0201-0026"), _defineProperty(_PkmIndex, Pkm.TAPU_FINI, "0788"), _defineProperty(_PkmIndex, Pkm.TAPU_BULU, "0787"), _defineProperty(_PkmIndex, Pkm.DIGLETT, "0050"), _defineProperty(_PkmIndex, Pkm.DUGTRIO, "0051"), _defineProperty(_PkmIndex, Pkm.ROWLET, "0722"), _defineProperty(_PkmIndex, Pkm.DARTIX, "0723"), _defineProperty(_PkmIndex, Pkm.DECIDUEYE, "0724"), _defineProperty(_PkmIndex, Pkm.ZORUA, "0570"), _defineProperty(_PkmIndex, Pkm.ZOROARK, "0571"), _defineProperty(_PkmIndex, Pkm.FROAKIE, "0656"), _defineProperty(_PkmIndex, Pkm.FROGADIER, "0657"), _defineProperty(_PkmIndex, Pkm.GRENINJA, "0658"), _defineProperty(_PkmIndex, Pkm.TYROGUE, "0236"), _defineProperty(_PkmIndex, Pkm.HITMONLEE, "0106"), _defineProperty(_PkmIndex, Pkm.HITMONCHAN, "0107"), _defineProperty(_PkmIndex, Pkm.HITMONTOP, "0237"), _defineProperty(_PkmIndex, Pkm.MIMIKYU, "0778"), _defineProperty(_PkmIndex, Pkm.GRIMER, "0088"), _defineProperty(_PkmIndex, Pkm.MUK, "0089"), _defineProperty(_PkmIndex, Pkm.SHARPEDO, "0319"), _defineProperty(_PkmIndex, Pkm.HISUI_ZORUA, "0570-0002"), _defineProperty(_PkmIndex, Pkm.HISUI_ZOROARK, "0571-0001"), _defineProperty(_PkmIndex, Pkm.ALOLAN_GRIMER, "0088-0001"), _defineProperty(_PkmIndex, Pkm.ALOLAN_MUK, "0089-0001"), _defineProperty(_PkmIndex, Pkm.PINECO, "0204"), _defineProperty(_PkmIndex, Pkm.FORRETRESS, "0205"), _defineProperty(_PkmIndex, Pkm.SEEL, "0086"), _defineProperty(_PkmIndex, Pkm.DEWGONG, "0087"), _defineProperty(_PkmIndex, Pkm.ALOLAN_GEODUDE, "0074-0001"), _defineProperty(_PkmIndex, Pkm.ALOLAN_GRAVELER, "0075-0001"), _defineProperty(_PkmIndex, Pkm.ALOLAN_GOLEM, "0076-0001"), _defineProperty(_PkmIndex, Pkm.EKANS, "0023"), _defineProperty(_PkmIndex, Pkm.ARBOK, "0024"), _defineProperty(_PkmIndex, Pkm.MIME_JR, "0439"), _defineProperty(_PkmIndex, Pkm.MR_MIME, "0122"), _defineProperty(_PkmIndex, Pkm.ORIGIN_GIRATINA, "0487-0001"), _defineProperty(_PkmIndex, Pkm.PIROUETTE_MELOETTA, "0648-0001"), _defineProperty(_PkmIndex, Pkm.MELMETAL, "0809"), _defineProperty(_PkmIndex, Pkm.HOOPA, "0720"), _defineProperty(_PkmIndex, Pkm.HOOPA_UNBOUND, "0720-0001"), _defineProperty(_PkmIndex, Pkm.SILVALLY, "0773"), _defineProperty(_PkmIndex, Pkm.ZERAORA, "0807"), _defineProperty(_PkmIndex, Pkm.XERNEAS, "0716"), _defineProperty(_PkmIndex, Pkm.YVELTAL, "0717"), _defineProperty(_PkmIndex, Pkm.TYPE_NULL, "0772"), _defineProperty(_PkmIndex, Pkm.MARSHADOW, "0802"), _defineProperty(_PkmIndex, Pkm.HOOTHOOT, "0163"), _defineProperty(_PkmIndex, Pkm.NOCTOWL, "0164"), _defineProperty(_PkmIndex, Pkm.BONSLEY, "0438"), _defineProperty(_PkmIndex, Pkm.SUDOWOODO, "0185"), _defineProperty(_PkmIndex, Pkm.PHIONE, "0489"), _defineProperty(_PkmIndex, Pkm.COMBEE, "0415"), _defineProperty(_PkmIndex, Pkm.VESPIQUEEN, "0416"), _defineProperty(_PkmIndex, Pkm.SHUCKLE, "0213"), _defineProperty(_PkmIndex, Pkm.TEPIG, "0498"), _defineProperty(_PkmIndex, Pkm.PIGNITE, "0499"), _defineProperty(_PkmIndex, Pkm.EMBOAR, "0500"), _defineProperty(_PkmIndex, Pkm.WYNAUT, "0360"), _defineProperty(_PkmIndex, Pkm.WOBBUFFET, "0202"), _defineProperty(_PkmIndex, Pkm.LUNATONE, "0337"), _defineProperty(_PkmIndex, Pkm.SOLROCK, "0338"), _defineProperty(_PkmIndex, Pkm.POLIWRATH, "0062"), _defineProperty(_PkmIndex, Pkm.SHAYMIN_SKY, "0492-0001"), _defineProperty(_PkmIndex, Pkm.WURMPLE, "0265"), _defineProperty(_PkmIndex, Pkm.SILCOON, "0266"), _defineProperty(_PkmIndex, Pkm.BEAUTIFLY, "0267"), _defineProperty(_PkmIndex, Pkm.CASCOON, "0268"), _defineProperty(_PkmIndex, Pkm.DUSTOX, "0269"), _defineProperty(_PkmIndex, Pkm.TINKATINK, "0957"), _defineProperty(_PkmIndex, Pkm.TINKATUFF, "0958"), _defineProperty(_PkmIndex, Pkm.TINKATON, "0959"), _defineProperty(_PkmIndex, Pkm.PARAS, "0046"), _defineProperty(_PkmIndex, Pkm.PARASECT, "0047"), _defineProperty(_PkmIndex, Pkm.MILTANK, "0241"), _defineProperty(_PkmIndex, Pkm.MANKEY, "0056"), _defineProperty(_PkmIndex, Pkm.PRIMEAPE, "0057"), _defineProperty(_PkmIndex, Pkm.SUNKERN, "0191"), _defineProperty(_PkmIndex, Pkm.SUNFLORA, "0192"), _defineProperty(_PkmIndex, Pkm.MARACTUS, "0556"), _defineProperty(_PkmIndex, Pkm.PLUSLE, "0311"), _defineProperty(_PkmIndex, Pkm.MINUN, "0312"), _defineProperty(_PkmIndex, Pkm.PINSIR, "0127"), _defineProperty(_PkmIndex, Pkm.NATU, "0177"), _defineProperty(_PkmIndex, Pkm.XATU, "0178"), _defineProperty(_PkmIndex, Pkm.GLIGAR, "0207"), _defineProperty(_PkmIndex, Pkm.GLISCOR, "0472"), _defineProperty(_PkmIndex, Pkm.SHELLDER, "0090"), _defineProperty(_PkmIndex, Pkm.CLOYSTER, "0091"), _defineProperty(_PkmIndex, Pkm.SENTRET, "0161"), _defineProperty(_PkmIndex, Pkm.FURRET, "0162"), _defineProperty(_PkmIndex, Pkm.SPECTRIER, "0897"), _PkmIndex); //for each pokeData, add the pokedex number from PkmIndex
//and the name from Pkm
//also add json and png file pathway for each pokemon

exports.PkmIndex = PkmIndex;
var pokeData = Object.fromEntries(allPokemonNames.map(function (name) {
  return [[name], new _pokemon["default"](rawPokemonData[name], pkmIndex[name.toUpperCase()])];
})); //   return {
//     ...poke,
//     pkmIndex: PkmIndex[poke.name.uppercase()],
//     pkmName: Pkm[poke.name.uppercase()],
//     spritePath: `./assets/${Pkm[poke.name.uppercase()]}.png`,
//     jsonPath: `./assets/${Pkm[poke.name.uppercase()]}.json`,
//   };
// });

exports.pokeData = pokeData;
var buyablePokemon = allPokemonNames.filter(function (name) {
  return rawPokemonData[name].stage === 1;
});
exports.buyablePokemon = buyablePokemon;
var pokemonPerSynergy = {
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
  utility: []
}; // add all buyable pokemon of the appropriate synergy

exports.pokemonPerSynergy = pokemonPerSynergy;
buyablePokemon.forEach(function (pokemon) {
  pokeData[pokemon].categories.forEach(function (category) {
    pokemonPerSynergy[category].push(pokemon);
  });
}); // and sort by tier (ascending)

Object.values(pokemonPerSynergy).forEach(function (list) {
  list.sort(function (a, b) {
    return pokeData[a].tier - pokeData[b].tier;
  });
});