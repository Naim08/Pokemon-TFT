class Player {
  constructor(name, side) {
    this.name = name;
    this.side = side;
    this.score = 0;
    this.turn = false;
    this.boardPokemon = [];
    this.scoreUpdateEvent = new Event("scoreUpdate");
  }

  getScore = () => {
    return this.score;
  };

  setScore = (score) => {
    this.score = score;
    document.dispatchEvent(this.scoreUpdateEvent); // Dispatch the score update event
  };

  getTurn = () => {
    return this.turn;
  };

  setTurn = (turn) => {
    this.turn = turn;
  };
}

export default Player;
