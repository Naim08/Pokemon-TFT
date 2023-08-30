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

class Game {
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
    this.startFightButton();
    this.allPokemonNames = allPokemonNames;
  }

  async load() {
    await this.loadLoadingScreen();
    await this.loadMenu();
    this.toggleMenu();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  async loadLoadingScreen() {
    const background = new PIXI.Graphics();
    background.beginFill(0x4682a9);
    background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    background.endFill();
    this.loadingContainer.addChild(background);

    const style = new PIXI.TextStyle({
      fontSize: 24,
      fill: "white",
    });

    const loadingText = new PIXI.Text("Loading...", style);
    loadingText.x = this.app.screen.width / 2 - loadingText.width / 2;
    loadingText.y = this.app.screen.height / 2 - loadingText.height / 2;
    this.loadingContainer.addChild(loadingText);

    this.app.stage.addChild(this.loadingContainer);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.app.stage.removeChild(this.loadingContainer);
  }

  async loadMenu() {
    const background = new PIXI.Graphics();
    background.beginFill(0xc7004d);
    background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    background.endFill();
    this.menuContainer.addChild(background);

    const style = new PIXI.TextStyle({
      fontSize: 24,
      fill: "white",
    });

    const title = new PIXI.Text("Pokemon Menu", style);
    title.x = this.app.screen.width / 2 - title.width / 2;
    title.y = 50;
    this.menuContainer.addChild(title);

    let closeButton = new PIXI.Graphics();
    closeButton.beginFill(0xf94c10);
    closeButton.drawRect(0, 0, 50, 50);
    closeButton.endFill();
    closeButton.interactive = true;
    closeButton.buttonMode = true;
    closeButton.x = this.app.screen.width - 60;
    closeButton.y = 10;
    closeButton = new PIXI.Sprite(closeButton.texture);

    closeButton.on("click", () => {
      this.toggleMenu();
    });
    this.menuContainer.addChild(closeButton);

    const closeButtonText = new PIXI.Text("X", style);
    closeButtonText.x =
      closeButton.x + closeButton.width / 2 - closeButtonText.width / 2;
    closeButtonText.y =
      closeButton.y + closeButton.height / 2 - closeButtonText.height / 2;
    this.menuContainer.addChild(closeButtonText);

    const pokemonListButton = new PIXI.Graphics();
    pokemonListButton.beginFill(0x749bc2);
    pokemonListButton.drawRect(0, 0, 200, 50);
    pokemonListButton.endFill();
    pokemonListButton.interactive = true;
    pokemonListButton.buttonMode = true;
    pokemonListButton.x =
      this.app.screen.width / 2 - pokemonListButton.width / 2;
    pokemonListButton.y = 150;
    pokemonListButton.on("click", () => {
      this.startGame();
    });
    this.menuContainer.addChild(pokemonListButton);

    const pokemonListButtonText = new PIXI.Text("Start Game", style);
    pokemonListButtonText.x =
      pokemonListButton.x +
      pokemonListButton.width / 2 -
      pokemonListButtonText.width / 2;
    pokemonListButtonText.y =
      pokemonListButton.y +
      pokemonListButton.height / 2 -
      pokemonListButtonText.height / 2;
    this.menuContainer.addChild(pokemonListButtonText);

    this.menuContainer.visible = false;
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

    const playerA = new Player("John Wick", 0);
    const playerB = new Player("Hillary", 1);

    const box = new PIXI.Graphics();
    const rect = new PIXI.Rectangle(0, 0, 300, 100);

    box.lineStyle(2, 0x000000, 1); // Add a black border with a thickness of 2 pixels
    box.beginFill(0xff0000);
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
        this.selectedPokemon = pokemon;

        this.selectPokemon(pokemon);
      });
      pokemon.animate.animatedSprite.idle.on("Dead", (player) => {
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
        this.selectedPokemon = pokemon;

        this.selectPokemon(pokemon);
      });
      pokemon.animate.animatedSprite.idle.on("Dead", (player) => {
        console.log(player, pokemon.player);
        player.player1ScoreText.text = `Score: ${player.score}`;
        const remainingPokemons = pokemon.player.boardPokemon;
        if (remainingPokemons.length === 0) {
          // End the game if the player has no remaining boardPokemons
          this.game.winnner = player;
          this.endGame();
        }
        console.log("dead", player);
      });
    }
  }
  selectPokemon(pokemon) {
    if (pokemon) {
      pokemon.animate.animatedSprite.idle.tint = 0xffffff;
      // Remove the health bar tooltip from the previously selected Pokemon
    }

    pokemon.animate.animatedSprite.idle.tint = 0xff0000;
    if (!pokemon.animate.healthBarTooltip) {
      const width = (pokemon.currentHP / pokemon.maxHP) * 50;
      const healthBarTooltip = new PIXI.Graphics();
      healthBarTooltip.beginFill(0x191d88);
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
    const button = new PIXI.Text("Start Fight", { fill: "white" });
    button.x = this.app.screen.width - 100;
    button.y = this.app.screen.height - 50;
    button.anchor.set(0.5);
    button.interactive = true;
    button.buttonMode = true;

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
    });

    // Add the button to the stage
    this.app.stage.addChild(button);
  }

  fight() {
    // Update the game state and animate the Pokemon objects
    const animate = () => {
      // Iterate over each Pokemon on the board
      for (let row = 0; row < this.board.length; row++) {
        for (let col = 0; col < this.board[row].length; col++) {
          const pokemon = this.board[row][col];

          // Check if the Pokemon is from the current player
          if (pokemon.player !== this.turn) {
            continue;
          }

          // Check if the Pokemon is adjacent to any Pokemon from the opposing player
          const adjacentPokemon = this.getAdjacentPokemon(row, col);
          for (let i = 0; i < adjacentPokemon.length; i++) {
            const adjacent = adjacentPokemon[i];

            if (adjacent.player !== this.turn) {
              // Attack the adjacent Pokemon
              pokemon.attack(adjacent);

              // Check if the adjacent Pokemon fainted
              if (adjacent.hp <= 0) {
                // Remove the adjacent Pokemon from the board
                this.removePokemon(adjacent);

                // Check if the current player won
                if (this.checkWin()) {
                  // Show the winner message
                  const message = new PIXI.Text(`Player ${this.turn} wins!`, {
                    fill: "white",
                    fontSize: 48,
                  });
                  message.anchor.set(0.5);
                  message.x = this.app.screen.width / 2;
                  message.y = this.app.screen.height / 2;
                  this.menuContainer.addChild(message);

                  // Show the start again button
                  const startAgainButton = new PIXI.Text("Start Again", {
                    fill: "white",
                  });
                  startAgainButton.anchor.set(0.5);
                  startAgainButton.interactive = true;
                  startAgainButton.buttonMode = true;
                  startAgainButton.on("click", async () => {
                    // Restart the game
                    await this.restartGame();

                    // Hide the menu scene
                    this.menuContainer.visible = false;
                  });
                  startAgainButton.y = 100;
                  this.menuContainer.addChild(startAgainButton);

                  // Show the end game button
                  const endGameButton = new PIXI.Text("End Game", {
                    fill: "white",
                  });
                  endGameButton.anchor.set(0.5);
                  endGameButton.interactive = true;
                  endGameButton.buttonMode = true;
                  endGameButton.on("click", () => {
                    // End the game
                    this.quitGame();
                  });
                  endGameButton.y = 50;
                  this.menuContainer.addChild(endGameButton);

                  // Show the menu scene
                  this.menuContainer.visible = true;

                  return;
                }
              }
            }
          }
        }
      }

      // Switch the turn to the opponent
      this.turn = this.turn === "player" ? "opponent" : "player";

      // Request the next animation frame
      requestAnimationFrame(animate);
    };

    // Request the first animation frame
    requestAnimationFrame(animate);
  }
  getRandomPokemonNames(allPokemonNames, numPokemon) {
    const pokemonNames = [];

    // Generate 6 random Pokemon names
    while (pokemonNames.length < numPokemon) {
      const randomIndex = Math.floor(Math.random() * allPokemonNames.length);
      const randomName = allPokemonNames[randomIndex];

      // Add the Pokemon name to the array if it doesn't already exist
      if (!pokemonNames.includes(randomName)) {
        pokemonNames.push(randomName);
      }
    }

    return pokemonNames;
  }
}

export default Game;
