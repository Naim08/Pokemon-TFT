import * as PIXI from "pixi.js";
import {
  Application,
  Sprite,
  Texture,
  Graphics,
  AnimatedSprite,
  Spritesheet,
  Assets,
} from "pixi.js";
import { pokeData, allPokemonNames } from "../model/pokemon_helper";
import tilesetMap from "../assets/MT_BLAZE.png";
import Tileset from "../tileset";
import { PokeAnimation } from "../model/pokemon_animation";
import Board from "./board";
import Pokemon from "./pokemon";
import Player from "./player";
import loadSVG from "../assets/refresh.svg";
import loadSceneBackground from "../assets/newBackground.png";
import background1 from "../assets/back1.png";
import background2 from "../assets/back2.png";
import { Sound, sound } from "@pixi/sound";
import startingAudio from "../assets/opening.mp3";
import battle from "../assets/pokemon-battle.mp3";
import lavender from "../assets/lavender.mp3";
import logoPng from "../assets/colyseus-icon.png";

class Game {
  static TINT = 0x8ca8be;
  static POKEMON_TINT = 0xf0eae0;
  static TEXT_COLOR = 0xe5ff9e;
  constructor(app) {
    this.loadingContainer = new PIXI.Container();
    this.boardContainer = new PIXI.Container();
    this.menuContainer = new PIXI.Container();
    this.selectedPokemon = null;
    this.pokemonList = [];
    this.menuOpen = false;
    this.app = app;
    this.board = null;
    this.lastAttackTime = 0;
    this.winner = null;
    this.allPokemonNames = allPokemonNames;
    this.sound = sound;
    this.sound.add({
      startingAudio: startingAudio,
      battle: battle,
      lavender: lavender,
    });
  }

  async load() {
    await this.loadLoadingScreen();
    await this.loadMenu();
    this.toggleMenu();
    // requestAnimationFrame(this.gameLoop.bind(this));
  }

  async loadLoadingScreen() {
    this.sound.play("startingAudio");
    const newBackground = PIXI.Sprite.from(loadSceneBackground);
    newBackground.width = this.app.screen.width;
    newBackground.height = this.app.screen.height;
    this.loadingContainer.addChild(newBackground);

    const style = new PIXI.TextStyle({
      fontSize: 24,
      fill: Game.TEXT_COLOR,
    });
    const refreshSprite = PIXI.Sprite.from(loadSVG);
    // Set the position and scale of the sprite
    refreshSprite.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
    refreshSprite.anchor.set(0.5);
    refreshSprite.scale.set(0.5);

    // Add the sprite to the loading container
    this.loadingContainer.addChild(refreshSprite);
    this.app.ticker.add(() => {
      refreshSprite.rotation += 0.1;
    });
    this.app.stage.addChild(this.loadingContainer);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.app.stage.removeChild(this.loadingContainer);
  }

  async loadMenu() {
    const background = PIXI.Sprite.from(background2);
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;

    this.menuContainer.addChild(background);

    const titleStyle = new PIXI.TextStyle({
      fontSize: 48,
      fill: Game.TEXT_COLOR,
    });
    const logo = PIXI.Sprite.from(logoPng);
    logo.anchor.set(0.5);
    logo.x = this.app.screen.width / 2 - logo.width / 2;
    logo.y = 100;
    logo.scale.set(0.5);
    this.menuContainer.addChild(logo);

    const title = new PIXI.Text("Pokemon AutoBattle", titleStyle);
    title.x = logo.x + logo.width / 2 - title.width / 2;
    title.y = logo.y + logo.height + 100;

    this.menuContainer.addChild(title);

    const startButton = new PIXI.Graphics();
    startButton.beginFill(0x2d82b7);
    startButton.drawRect(0, 0, 300, 100);
    startButton.endFill();
    startButton.x = logo.x + logo.width - 120;
    startButton.y = logo.y + logo.height + 300;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerdown", () => {
      this.startGame();
    });
    this.menuContainer.addChild(startButton);

    const startButtonText = new PIXI.Text("Start Game", titleStyle);
    startButtonText.x =
      startButton.x + startButton.width / 2 - startButtonText.width / 2;
    startButtonText.y =
      startButton.y + startButton.height / 2 - startButtonText.height / 2;
    this.menuContainer.addChild(startButtonText);

    this.boardContainer.addChild(this.menuContainer);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuContainer.visible = this.menuOpen;
  }

  startGame() {
    this.toggleMenu();
    this.loadGame();
  }

  async loadGame() {
    this.board = new Board(
      6,
      8,
      64,
      2,
      tilesetMap,
      this.app,
      this.boardContainer
    );
    await this.board.initialize(this.app);
    // \
    // Add event listeners to each tile
    for (let row = 0; row < this.board.numRows; row++) {
      for (let col = 0; col < this.board.numCols; col++) {
        const tile = this.board.tiles[row][col];
        const tileClass = this.board.tileclass[row][col];
        tile.interactive = true;
        tile.buttonMode = true;
        tile.on("click", () => {
          if (this.selectedPokemon) {
            this.board.placePokemon(this.selectedPokemon, col, row);
          }
        });
      }
    }
    this.sound.pause("startingAudio");
    this.sound.play("lavender");

    const playerA = new Player("John Wick", 0);
    const playerB = new Player("Hillary", 1);

    const box = new PIXI.Graphics();
    const rect = new PIXI.Rectangle(0, 0, 300, 100);
    this.startFightButton();
    box.lineStyle(2, 0x000000, 1); // Add a black border with a thickness of 2 pixels
    box.beginFill(0x8ca8be);
    box.drawRect(rect.x, rect.y, rect.width, rect.height);
    box.endFill();
    let selectedPokemon = null;
    const player1NameText = new PIXI.Text(`Player 1: ${playerA.name}`, {
      fill: 0xffffff,
    });
    player1NameText.position.set(10, 10);

    const player2NameText = new PIXI.Text(`Player 2: ${playerB.name}`, {
      fill: 0xffffff,
    });
    player2NameText.position.set(10, 30);

    playerA.player1ScoreText = new PIXI.Text(`Score: ${playerA.score}`, {
      fill: 0xffffff,
    });
    playerA.player1ScoreText.position.set(10, 50);

    playerB.player2ScoreText = new PIXI.Text(`Score: ${playerB.score}`, {
      fill: 0xffffff,
    });
    playerB.player2ScoreText.position.set(10, 70);

    await this.loadPokemonAnimationsForPlayerA(selectedPokemon, playerA);
    await this.loadPokemonAnimationsForPlayerB(selectedPokemon, playerB);
    this.app.stage.addChild(this.boardContainer);
    // Add styling to the box container

    box.interactive = true;
    box.buttonMode = true;
    box.alpha = 0.8;
    box.tint = 0x0000ff;

    box.addChild(player1NameText);
    box.addChild(player2NameText);
    box.addChild(playerA.player1ScoreText);
    box.addChild(playerB.player2ScoreText);
    this.app.stage.addChild(box);
  }

  async loadPokemonAnimationsForPlayerA(selectedPokemon, player) {
    //const pokemonNames = ["abra", "bulbasaur", "alakazam", "darkrai", "crobat"];
    const pokemonNames = this.getRandomPokemonNames(this.allPokemonNames, 6);
    const pokemons = [];
    for (let i = 0; i < pokemonNames.length; i++) {
      const pokemon = new Pokemon(pokemonNames[i], i, 0, player);
      await pokemon.loadSprite();

      pokemon.animate.animatedSprite.idle.x = 100 * i;
      pokemon.animate.animatedSprite.idle.y = -100;
      this.boardContainer.addChild(pokemon.animate.animatedSprite.idle);
      pokemon.animate.animatedSprite.idle.interactive = true;
      pokemon.animate.animatedSprite.idle.buttonMode = true;
      pokemon.animate.animatedSprite.idle.on("click", () => {
        this.board.selectedPokemon = pokemon;

        this.selectPokemon(pokemon);
      });
      pokemon.animate.animatedSprite.idle.on("Dead", (player) => {
        clearInterval(pokemon.attackInterval);
        console.log(player, pokemon.player);
        player.player2ScoreText.text = `Score: ${player.score}`;
        const remainingPokemons = pokemon.player.boardPokemon;
        if (remainingPokemons.length === 0) {
          // End the game if the player has no remaining boardPokemons
          this.winner = player;
          this.endGame();
        }
        console.log("dead", player);
      });
    }
  }
  async loadPokemonAnimationsForPlayerB(selectedPokemon, player) {
    // const pokemonNames = [
    //   "garchomp",
    //   "gengar",
    //   "vikavolt",
    //   "tyranitar",
    //   "kakuna",
    // ];
    const pokemonNames = this.getRandomPokemonNames(this.allPokemonNames, 6);
    const pokemons = [];
    for (let i = 0; i < pokemonNames.length; i++) {
      const pokemon = new Pokemon(pokemonNames[i], i, 0, player);
      await pokemon.loadSprite();

      pokemon.animate.animatedSprite.idle.x = 100 * i;
      pokemon.animate.animatedSprite.idle.y = 450;
      this.boardContainer.addChild(pokemon.animate.animatedSprite.idle);

      pokemon.animate.animatedSprite.idle.interactive = true;
      pokemon.animate.animatedSprite.idle.buttonMode = true;
      pokemon.animate.animatedSprite.idle.on("click", () => {
        this.board.selectedPokemon = pokemon;

        this.selectPokemon(pokemon);
      });
      pokemon.animate.animatedSprite.idle.on("Dead", (player) => {
        clearInterval(pokemon.attackInterval);
        console.log(player, pokemon.player);
        player.player1ScoreText.text = `Score: ${player.score}`;
        const remainingPokemons = pokemon.player.boardPokemon;
        if (remainingPokemons.length === 0) {
          // End the game if the player has no remaining boardPokemons
          this.winner = player;
          this.endGame();
        }
        console.log("dead", player);
      });
    }
  }
  selectPokemon(pokemon) {
    console.log("selectedPokemon", this.selectedPokemon);
    if (this.selectedPokemon) {
      if (this.selectedPokemon === pokemon) {
        this.selectedPokemon.animate.animatedSprite.idle.tint = 0xffffff;
        if (this.selectedPokemon.animate.healthBarTooltip) {
          this.selectedPokemon.animate.healthBarTooltip.visible = false;
        }
        this.selectedPokemon = null;
        return;
      }

      // Remove the health bar tooltip from the previously selected Pokemon
    }

    pokemon.animate.animatedSprite.idle.tint = Game.POKEMON_TINT;
    if (!pokemon.animate.healthBarTooltip) {
      const width = (pokemon.currentHP / pokemon.maxHP) * 50;
      const healthBarTooltip = new PIXI.Graphics();
      healthBarTooltip.beginFill(0x9b2226);
      healthBarTooltip.drawRect(0, 0, width, 5);
      healthBarTooltip.endFill();

      healthBarTooltip.x = pokemon.animate.animatedSprite.idle.x;
      healthBarTooltip.y = pokemon.animate.animatedSprite.idle.y - 10;
      pokemon.animate.healthBarTooltip = healthBarTooltip;
      this.boardContainer.addChild(healthBarTooltip); // Add the health bar tooltip to the stage
      // Set a reference to the health bar tooltip on the selected Pokemon object
      pokemon.animate.healthBarTooltip = healthBarTooltip;
    } else {
      return !pokemon.animate.healthBarTooltip.visible;
    }
    this.selectedPokemon = pokemon;
  }
  gameLoop(delta) {
    // Create a container for the health bars
    this.healthBarContainer = new PIXI.Container();
    this.boardContainer.addChild(this.healthBarContainer);
    // Update the game state
    this.update(delta);

    // Render the game graphics
    this.app.renderer.render(this.app.stage);

    // Request the next frame of the game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  update(delta) {
    // Other game update code goes here

    // Update the position of the health bar tooltip
    const selectedPokemon =
      this.selectedPokemon || (this.board ? this.board.selectedPokemon : null);

    const adjacentPokemon = this.board
      ? this.board.getAdjacentPokemon(selectedPokemon)
      : null;

    if (adjacentPokemon && selectedPokemon.player !== adjacentPokemon.player) {
      // Trigger an attack between the two Pokemon
      const currentTime = Date.now();
      if (currentTime - this.lastAttackTime >= 3000) {
        console.log("can attack");
        console.log(
          "current health",
          selectedPokemon.currentHP,
          adjacentPokemon.currentHP
        );
        selectedPokemon.attackPokemon(adjacentPokemon);
        adjacentPokemon.attackPokemon(selectedPokemon);
        // change size of health bar
        selectedPokemon.updateHealthBar();
        adjacentPokemon.updateHealthBar();
        if (!selectedPokemon.isAlive || !adjacentPokemon.isAlive) {
          clearInterval(selectedPokemon.attackInterval);
          clearInterval(adjacentPokemon.attackInterval);
          return;
        }
        this.lastAttackTime = currentTime;
      }
    }
    // if (selectedPokemon) {
    //   if (selectedPokemon.animate.healthBarTooltip) {
    //     const healthBarTooltip = selectedPokemon.animate.healthBarTooltip;
    //     healthBarTooltip.x = selectedPokemon.animate.animatedSprite.idle.x;
    //     healthBarTooltip.y = selectedPokemon.animate.animatedSprite.idle.y - 10;
    //     // Add the health bar tooltip to the health bar container
    //     this.healthBarContainer.addChild(healthBarTooltip);
    //   }
    // }
    if (selectedPokemon && selectedPokemon.isAlive === false) {
      console.log("dead");
      this.boardContainer.removeChild(
        selectedPokemon.animate.animatedSprite.idle
      );
      this.boardContainer.removeChild(selectedPokemon.animate.healthBarTooltip);
      this.board.selectedPokemon = null;
      this.selectedPokemon = null;
    }
  }

  endGame() {
    // Stop the game loop
    this.app.ticker.stop();

    // Remove all game objects from the stage
    this.boardContainer.removeChildren();

    // Display a message or score to indicate that the game has ended
    const message = new PIXI.Text("Game Over!", { fill: "white" });
    message.x = this.app.screen.width / 2;
    message.y = this.app.screen.height / 2;
    message.anchor.set(0.5);
    this.app.stage.addChild(message);
    const winnerText = new PIXI.Text(
      `${this.winner.name} wins with a score of ${this.winner.score}!`,
      { fill: "white" }
    );
    winnerText.x = this.app.screen.width / 2;
    winnerText.y = this.app.screen.height / 2 + 50;
    winnerText.anchor.set(0.5);
    this.app.stage.addChild(winnerText);

    // Display a menu with two buttons: "Start Again" and "End Game"
    const menu = new PIXI.Container();
    menu.x = this.app.screen.width / 2;
    menu.y = this.app.screen.height / 2 + 100;
    this.app.stage.addChild(menu);

    const startAgainButton = new PIXI.Text("Start Again", { fill: "white" });
    startAgainButton.anchor.set(0.5);
    startAgainButton.interactive = true;
    startAgainButton.buttonMode = true;
    startAgainButton.on("click", () => {
      // Restart the game
      this.restartGame();
      menu.visible = false;
      message.visible = false;
      winnerText.visible = false;
      startAgainButton.visible = false;
    });
    menu.addChild(startAgainButton);

    const endGameButton = new PIXI.Text("End Game", { fill: "white" });
    endGameButton.anchor.set(0.5);
    endGameButton.interactive = true;
    endGameButton.buttonMode = true;
    endGameButton.on("click", () => {
      // End the game
      this.quitGame();
    });

    endGameButton.y = 50;
    menu.addChild(endGameButton);
  }
  async restartGame() {
    // Restart the game
    // ...

    // Hide the menu scene
    await this.loadGame();
  }

  quitGame() {
    // Quit the game
    // ...

    // Hide the menu scene
    this.menuContainer.visible = false;
    //const confirm = window.confirm(
    //  "Do you want to visit https://www.appacademy.io/?"
    // );
    window.location.href = "https://www.appacademy.io/";
  }
  endTurnButton() {
    // Create a new button object
    const button = new PIXI.Text("End Turn", { fill: "white" });
    button.x = this.app.screen.width - 100;
    button.y = this.app.screen.height - 50;
    button.anchor.set(0.5);
    button.interactive = true;
    button.buttonMode = true;

    // Add an event listener to the button
    button.on("click", () => {
      // End the turn
      this.endTurn();

      // Start the fight
      this.fight();
    });

    // Add the button to the stage
    this.app.stage.addChild(button);
  }
  endTurn() {
    // Disable interactivity of Pokemon objects on the board
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        this.board[row][col].interactive = false;
      }
    }

    // Switch the turn to the opponent
    this.turn = this.turn === "player" ? "opponent" : "player";
  }

  startFightButton() {
    // Create a new button object
    const button = new PIXI.Text("Start Fight", { fill: "0x03045e" });
    button.x = this.app.screen.width - 100;
    button.y = this.app.screen.height - 50;
    button.anchor.set(0.5);
    button.interactive = true;
    button.buttonMode = true;

    const buttonBox = new PIXI.Graphics();
    buttonBox.beginFill(Game.POKEMON_TINT);
    buttonBox.drawRect(
      button.x - button.width / 2 - 10,
      button.y - button.height / 2 - 5,
      button.width + 20,
      button.height + 10
    );
    buttonBox.endFill();
    // Add an event listener to the button
    button.on("click", () => {
      // Disable interactivity of Pokemon objects on the board
      for (let row = 0; row < this.board.length; row++) {
        for (let col = 0; col < this.board[row].length; col++) {
          this.board[row][col].interactive = false;
        }
      }

      // Start the fight
      this.fight();
      button.visible = false;
    });
    this.app.stage.addChild(buttonBox);
    // Add the button to the stage
    this.app.stage.addChild(button);
  }

  fight() {
    console.log("fight");
    // Update the game state and animate the Pokemon objects
    const animate = () => {
      // Iterate over each Pokemon on the board
      const boardArr = this.board.board;
      for (let row = 0; row < boardArr[0].length; row++) {
        for (let col = 0; col < boardArr.length; col++) {
          const pokemon = boardArr[col][row];

          // check if pokemon is undefined
          if (pokemon === null) {
            continue;
          }
          if (pokemon.isFight === true) {
            continue;
          }

          // Check if the Pokemon is adjacent to any Pokemon from the opposing player
          const adjacentPokemon = this.board.getAdjacentPokemons(pokemon);
          if (!adjacentPokemon) {
            continue;
          }
          if (adjacentPokemon.isFight) {
            continue;
          }
          if (!pokemon.isAlive || !adjacentPokemon.isAlive) {
            clearInterval(pokemon.attackInterval);
            clearInterval(adjacentPokemon.attackInterval);
            return;
          }

          pokemon.attackPokemon(adjacentPokemon);

          adjacentPokemon.attackPokemon(pokemon);

          console.log("adjacentPokemon", adjacentPokemon);
          console.log("pokemon", pokemon);
        }
      }
      // Request the next animation frame
      requestAnimationFrame(animate);
    };

    // Request the first animation frame
    requestAnimationFrame(animate);
  }

  getRandomPokemonNames(allPokemonNames, numPokemon) {
    const pokemonNames = [];
    const allPokemonNamesOnlyLetters = allPokemonNames.filter((name) =>
      /^[a-zA-Z]+$/.test(name)
    );

    // Generate 6 random Pokemon names
    while (pokemonNames.length < numPokemon) {
      const randomIndex = Math.floor(
        Math.random() * allPokemonNamesOnlyLetters.length
      );
      const randomName = allPokemonNamesOnlyLetters[randomIndex];

      // Add the Pokemon name to the array if it doesn't already exist
      if (!pokemonNames.includes(randomName)) {
        pokemonNames.push(randomName);
      }
    }

    return pokemonNames;
  }
  stopFights() {
    // Iterate over the fight intervals and clear them
    for (const fight of this.fightIntervals) {
      clearInterval(fight.intervalId);
    }

    // Clear the fight intervals array
    this.fightIntervals = [];
  }
}

export default Game;
