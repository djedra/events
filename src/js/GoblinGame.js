import goblinImage from "../img/goblin.png";
import Scoreboard from "./Scoreboard";
import Cursor from "./Cursor";

class GoblinGame {
  constructor() {
    this.gridSize = 4;
    this.cells = [];
    this.goblin = document.createElement("img");
    this.goblin.src = goblinImage;
    this.goblin.classList.add("goblin");
    this.currentPosition = -1;
    this.misses = 0;
    this.scoreboard = new Scoreboard();
    this.cursor = new Cursor();
  }

  init() {
    const grid = document.querySelector(".game-grid");
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
      this.cells.push(cell);
    }
    this.cells.forEach((cell) => {
      cell.addEventListener("click", (event) => this.handleClick(event));
    });
    this.startNewGame();
  }

  startNewGame() {
    this.scoreboard.reset();
    this.misses = 0;
    this.scoreboard.updateMisses(this.misses);
    this.moveGoblin();
    this.interval = setInterval(() => this.moveGoblin(), 1000);
  }

  moveGoblin() {
    if (this.isGoblinMoving) return;
    if (this.currentPosition !== -1) {
      this.misses += 1;
      this.scoreboard.updateMisses(this.misses);
      if (this.misses >= 5) {
        this.endGame();
        return;
      }
    }

    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.cells.length);
    } while (newPosition === this.currentPosition);

    const currentCell = this.cells[this.currentPosition];
    if (currentCell && currentCell.querySelector(".goblin")) {
      currentCell.removeChild(this.goblin);
    }

    const newCell = this.cells[newPosition];
    if (newCell) {
      newCell.appendChild(this.goblin);
    }

    this.currentPosition = newPosition;
    this.isGoblinMoving = true;
    setTimeout(() => {
      this.isGoblinMoving = false;
    }, 500);
  }

  handleClick(event) {
    if (event.target && event.target.classList.contains("goblin")) {
      this.scoreboard.updateScore();
      this.goblin.remove();
      this.currentPosition = -1;
      setTimeout(() => this.moveGoblin(), 500);
    }
  }

  endGame() {
    clearInterval(this.interval);
    alert(`Игра окончена! Ваш результат: ${this.scoreboard.score}`);
    if (confirm("Хотите сыграть снова?")) {
      this.startNewGame();
    }
  }
}

export default GoblinGame;
