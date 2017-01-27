import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';
import RedirectSquare from './redirect_square';

class Board {
  constructor() {
    this.squares = {};
    this.redirects = {};
    this.goals = [];
    this.moves = {};
    this.moveCount = 0;
    this.coordinatesOflastSquareMoved = [];
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
      this.goals.push(goal);
    });
  }

  handleMove(square, stage) {
    this.moveCount += 1;
    this.moves[this.moveCount] = [];
    let squareToMove = square;
    const xShift = square.xShift;
    const yShift = square.yShift;
    delete this.squares[[square.container.x, square.container.y]];

    while (true) {
      this.moves[this.moveCount].push(squareToMove);
      let newX = squareToMove.container.x + xShift;
      let newY = squareToMove.container.y + yShift;
      let neighbor = this.squares[[newX, newY]];
      let redirect = this.redirects[[newX, newY]];

      if (redirect && squareToMove.direction !== redirect.direction) {
        squareToMove.changeDirection(redirect.direction);
      }

      squareToMove.move(xShift, yShift); //move square
      this.squares[[newX, newY]] = squareToMove; //update board position

      if (neighbor) {
        squareToMove = neighbor;
      } else {
        break;
      }
    }
    this.coordinatesOflastSquareMoved.push(squareToMove.coordinates());
    stage.update();
    this.gameOver(stage);
  }

  gameOver(stage) {
    const squares = this.squares;
    const gameOver = (
      this.goals.every(goal => {
        return squares[goal.coordinates()]
          && goal.color === squares[goal.coordinates()].color;
      })
    );

    if (gameOver) {
      this.congratulatePlayer(stage);
      stage.enableDOMEvents(false);
      this.clearBoard();
    }
  }

  clearBoard() {
    this.squares = {};
    this.redirects = {};
    this.goals = [];
  }

  congratulatePlayer(stage) {
    const winningMessage = this.winningMessage(stage);
    this.moveCount = 0;
    stage.addChild(winningMessage);
    stage.update();
  }

  winningMessage(stage) {
    const msg = new createjs.Text(
      "Level Complete!",
      "bold 35px 'Allerta Stencil'",
      "black"
    );
    const msgBounds = msg.getBounds();
    const msgBox = new createjs.Shape();
    msgBox.graphics
      .beginFill("#EFFAB4")
      .drawRect(0, 0, msgBounds.width, msgBounds.height + 8);

    const msgContainer = new createjs.Container();
    msgContainer.x = (stage.canvas.width / 2) - (msgBounds.width / 2);
    msgContainer.y = (stage.canvas.height / 3) - (msgBounds.height / 2);

    msgContainer.addChild(msgBox, msg);
    return msgContainer;
  }

  undo() {
    if (this.moveCount === 0) {
      return;
    } else {
      const squares = this.moves[this.moveCount];

      squares.forEach(square => {
        square.undo(this.moveCount);
        this.squares[square.coordinates()] = square;
      });

      delete this.moves[this.moveCount];
      delete this.squares[this.coordinatesOflastSquareMoved.pop()];
      this.moveCount -= 1;
    }
  }
}

export default Board;
