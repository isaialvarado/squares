import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';
import RedirectSquare from './redirect_square';

class Board {
  constructor() {
    this.squares = {};
    this.redirects = {};
    this.goals = {};
  }

  addSquares(stage, ...squares) {
    squares.forEach(square => {
      this.squares[[square.container.x, square.container.y]] = square;
      square.container.addEventListener(
        "click",
        () =>  {
          this.handleMove(square, stage);
        }
      );
    });
  }

  addRedirects(...redirects) {
    redirects.forEach(redirect => {
      this.redirects[[redirect.container.x, redirect.container.y]] = redirect;
    });
  }

  addGoals(...goals) {
    goals.forEach(goal => {
      this.goals[[goal.container.x, goal.container.y]] = goal;
    });
  }

  handleMove(square, stage) {
    let squareToMove = square;
    const xShift = square.xShift;
    const yShift = square.yShift;
    delete this.squares[[square.container.x, square.container.y]];

    while (true) {
      let newX = squareToMove.container.x + xShift;
      let newY = squareToMove.container.y + yShift;
      let neighbor = this.squares[[newX, newY]];
      let redirect = this.redirects[[newX, newY]];

      squareToMove.move(xShift, yShift);
      this.squares[[newX, newY]] = squareToMove;

      if (redirect && squareToMove.direction !== redirect.direction) {
        squareToMove.changeDirection(redirect.direction);
      }

      if (neighbor) {
        squareToMove = neighbor;
      } else {
        break;
      }
    }
    stage.update();
  }

  undo() {
    alert("lol doesn't work yet");
  }
}

export default Board;
