import {
  Application,
  Sprite,
  Texture,
  Graphics,
  AnimatedSprite,
  Spritesheet,
  Assets,
} from "pixi.js";
import { pokeData, allPokemonNames } from "./model/pokemon_helper";
import tilesetMap from "./assets/MT_BLAZE.png";
import * as PIXI from "pixi.js";
import Tileset from "./tileset";
import { PokeAnimation } from "./model/pokemon_animation";
import Board from "./game/board";
import Pokemon from "./game/pokemon";
import Player from "./game/player";
import Game from "./game/game";
const pokemonImages = {};

function importAll(r) {
  r.keys().forEach((key) => {
    pokemonImages[key] = r(key);
  });
}

importAll(require.context("./assets/pokemon", true, /\.(png|jpe?g|svg|json)$/));
console.log(pokemonImages);
// Define the selectPokemon function

const playerA = new Player("Player A", 0);
const playerB = new Player("Player B", 1);
const app = new PIXI.Application({
  width: 1200,
  height: 1000,
  backgroundColor: 0x749bc2,
});
document.body.appendChild(app.view);

const game = new Game(app, playerA, playerB);
await game.load();
app.stage.addChild(game.boardContainer);
window.game = game;
// const boardContainer = new PIXI.Container();

// const board = new Board(6, 8, 64, 2, tilesetMap, app, boardContainer);
// await board.initialize(app);
// app.stage.addChild(boardContainer);

// // Add event listeners to each tile
// for (let row = 0; row < board.numRows; row++) {
//   for (let col = 0; col < board.numCols; col++) {
//     const tile = board.tiles[row][col];
//     const tileClass = board.tileclass[row][col];
//     tile.interactive = true;
//     tile.buttonMode = true;
//   }
// }

// async function loadPokemonAnimationsForPlayerA() {
//   const pokemonNames = ["abra", "bulbasaur", "alakazam", "darkrai", "crobat"];
//   const pokemons = [];
//   for (let i = 0; i < 5; i++) {
//     const pokemon = new Pokemon(pokemonNames[i], i, 0, playerA);
//     await pokemon.loadSprite();

//     pokemon.animate.animatedSprite.idle.x = 100 * i;
//     pokemon.animate.animatedSprite.idle.y = -100;
//     boardContainer.addChild(pokemon.animate.animatedSprite.idle);
//     pokemon.animate.animatedSprite.idle.interactive = true;
//     pokemon.animate.animatedSprite.idle.buttonMode = true;
//     pokemon.animate.animatedSprite.idle.on("click", () => {
//       board.selectedPokemon = pokemon;

//       selectPokemon(pokemon);
//     });
//   }
// }
// async function loadPokemonAnimationsForPlayerB() {
//   const pokemonNames = [
//     "garchomp",
//     "gengar",
//     "vikavolt",
//     "tyranitar",
//     "kakuna",
//   ];
//   const pokemons = [];
//   for (let i = 0; i < 5; i++) {
//     const pokemon = new Pokemon(pokemonNames[i], i, 0, playerB);
//     await pokemon.loadSprite();

//     pokemon.animate.animatedSprite.idle.x = 100 * i;
//     pokemon.animate.animatedSprite.idle.y = 450;
//     boardContainer.addChild(pokemon.animate.animatedSprite.idle);
//     pokemon.animate.animatedSprite.idle.interactive = true;
//     pokemon.animate.animatedSprite.idle.buttonMode = true;
//     pokemon.animate.animatedSprite.idle.on("click", () => {
//       board.selectedPokemon = pokemon;

//       selectPokemon(pokemon);
//     });
//   }
// }

// function selectPokemon(pokemon) {
//   console.log("selected pokemon", pokemon);
//   if (selectedPokemon) {
//     selectedPokemon.animate.animatedSprite.idle.tint = 0xffffff;
//   }
//   selectedPokemon = pokemon;
//   selectedPokemon.animate.animatedSprite.idle.tint = 0xff0000;
// }

// board.interactive = true;

// let selectedPokemon = null;
// await loadPokemonAnimationsForPlayerA();
// await loadPokemonAnimationsForPlayerB();
// window.pokemon = new Pokemon("abra", 0, 0);
// window.app = app;
// window.boardContainer = boardContainer;
// window.board = board;

// document.addEventListener("click", (event) => {
//   console.log("document clicked", event);
// });
