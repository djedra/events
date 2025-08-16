/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "5c8f73a2ac04a9115cc9.png";
;// CONCATENATED MODULE: ./src/js/Scoreboard.js
class Scoreboard {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.scoreElement = document.getElementById("score");
    this.missesElement = document.getElementById("misses");
  }
  updateScore() {
    this.score += 1;
    this.scoreElement.textContent = this.score;
  }
  updateMisses(misses) {
    this.misses = misses;
    this.missesElement.textContent = this.misses;
  }
  reset() {
    this.score = 0;
    this.misses = 0;
    this.scoreElement.textContent = this.score;
    this.missesElement.textContent = this.misses;
  }
}
/* harmony default export */ const js_Scoreboard = (Scoreboard);
;// CONCATENATED MODULE: ./src/js/Cursor.js
class Cursor {
  constructor() {
    this.cursor = document.createElement("div");
    this.cursor.classList.add("custom-cursor");
    document.body.appendChild(this.cursor);
    document.body.style.cursor = "none";
    document.addEventListener("mousemove", e => this.moveCursor(e));
  }
  moveCursor(event) {
    this.cursor.style.left = `${event.clientX}px`;
    this.cursor.style.top = `${event.clientY}px`;
  }
}
/* harmony default export */ const js_Cursor = (Cursor);
;// CONCATENATED MODULE: ./src/js/GoblinGame.js



class GoblinGame {
  constructor() {
    this.gridSize = 4;
    this.cells = [];
    this.goblin = document.createElement("img");
    this.goblin.src = goblin_namespaceObject;
    this.goblin.classList.add("goblin");
    this.currentPosition = -1;
    this.misses = 0;
    this.scoreboard = new js_Scoreboard();
    this.cursor = new js_Cursor();
  }
  init() {
    const grid = document.querySelector(".game-grid");
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
      this.cells.push(cell);
    }
    this.cells.forEach(cell => {
      cell.addEventListener("click", event => this.handleClick(event));
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
/* harmony default export */ const js_GoblinGame = (GoblinGame);
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const game = new js_GoblinGame();
  game.init();
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;