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
    this.coordinatesOfLastSquareMoved = [];
  }

  addSquares(stage, ...squares) {
    squares.forEach(square => {
      this.squares[[square.container.x, square.container.y]] = square;
      square.container.addEventListener(
        "click", () =>  this.handleMove(square, stage)
      );
    });
  }

  addRedirects(...redirects) {
    redirects.forEach(redirect => {
      this.redirects[[redirect.container.x, redirect.container.y]] = redirect;
    });
  }

  addGoals(...goals) {
    goals.forEach(goal => this.goals.push(goal));
  }

  handleMove(square, stage) {
    stage.enableDOMEvents(false);
    if (this.validMove(square, stage)) {
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

        squareToMove.callback = squareToMove.move.bind(squareToMove, xShift, yShift);
        squareToMove.container.addEventListener(
          'tick',
          squareToMove.callback
        );

        this.squares[[newX, newY]] = squareToMove;

        if (neighbor) {
          squareToMove = neighbor;
        } else {
          break;
        }
      }

      this.coordinatesOfLastSquareMoved.push([
        squareToMove.container.x + xShift,
        squareToMove.container.y + yShift
      ]);

      this.animateSquares(stage);
      this.checkGameOver(stage);
    } else {
      stage.enableDOMEvents(true);
    }
  }

  animateSquares(stage) {
    let i = 0;
    const intervalId = setInterval(function() {
      stage.update();
      if (i >= 7) {
        clearInterval(intervalId);
        this.removeEventListeners();
        this.updateSquares();
        stage.enableDOMEvents(true);
      }
      i++;
    }.bind(this, i), 20);
  }

  removeEventListeners() {
    this.moves[this.moveCount].forEach(square => {
      square.container.removeEventListener(
        'tick',
        square.callback
      );
    });
  }

  updateSquares() {
    this.moves[this.moveCount].forEach(square => {
      square.updateMoves();
    });
  }

  validMove(square, stage) {
    let testSquare = square;
    let validMove = true;
    const width = stage.canvas.width + 10;
    const height = stage.canvas.height + 10;
    const xShift = testSquare.xShift;
    const yShift = testSquare.yShift;

    while (validMove) {
      let newX = testSquare.container.x + xShift;
      let newY = testSquare.container.y + yShift;

      if ((newX < 0 || newX >= width) || (newY < 0 || newY >= height)) {
        validMove = false;
        break;
      }

      let neighbor = this.squares[[newX, newY]];
      if (neighbor) {
        testSquare = neighbor;
      } else {
        break;
      }
    }
    return validMove;
  }

  checkGameOver(stage) {
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
    const board = this;
    if (board.moveCount > 0) {
      const squaresToUndo = board.moves[board.moveCount];

      for (let i = 0; i < squaresToUndo.length; i++) {
        let square = squaresToUndo[i];
        square.undo();
        board.squares[square.coordinates()] = square;
      }

      // squaresToUndo.forEach(square => {
      //   debugger
      //   square.undo();
      // });

      delete board.moves[board.moveCount];
      delete board.squares[board.coordinatesOfLastSquareMoved.pop()];
      board.moveCount -= 1;
    }
  }
}

export default Board;
