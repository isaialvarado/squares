import createjs from 'createjs-easeljs';

class MoveableSquare {
  constructor(x, y, color, direction) {
    this.setupSquare(x, y, color, direction);
    this.moves = { 0: [this.container.x, this.container.y, this.direction] };
    this.moveNums = [0];
  }

  setupSquare(x, y, color, direction) {
    this.createSquare(color);
    this.createSquareText(direction);
    this.createContainer(x, y);
    this.changeDirection(direction);
  }

  createSquare(color) {
    this.color = color;
    this.square = new createjs.Shape();
    this.square.graphics.beginFill(color).drawRect(0, 0, 50, 50);
  }

  createSquareText(direction) {
    this.squareText = new createjs.Text();
    this.squareText.font = "bold 25px Aerial";
    this.squareText.color = "black";
    this.squareText.x = 13;
    this.squareText.y = 14;
    this.assignArrow();
  }

  createContainer(x, y) {
    this.container = new createjs.Container();
    this.container.addChild(this.square, this.squareText);
    this.container.x = (x * 60) - 60;
    this.container.y = (y * 60) - 60;
  }

  changeDirection(direction) {
    this.direction = direction;
    switch (direction) {
      case 'UP':
        this.xShift = 0;
        this.yShift = -60;
        break;
      case 'RIGHT':
      this.xShift = 60;
      this.yShift = 0;
        break;
      case 'DOWN':
      this.xShift = 0;
      this.yShift = 60;
        break;
      case 'LEFT':
      this.xShift = -60;
      this.yShift = 0;
        break;
      default:
        return;
    }

    this.assignArrow(direction);
  }

  assignArrow(direction) {
    const arrows = { 'UP': "▲",'RIGHT': "▶", 'DOWN': "▼",'LEFT': "◀" };
    this.squareText.text = arrows[direction];
  }

  coordinates() {
    return [this.container.x, this.container.y];
  }

  move(x = this.xShift, y = this.yShift, moveNum) {
    this.container.x += x;
    this.container.y += y;
    this.moveNums.push(moveNum);
    this.moves[moveNum] =
      [this.container.x, this.container.y, this.direction];
  }

  undo(moveNum) {
    const currentMoves = this.moves[moveNum];

    if (currentMoves === undefined) {
      return false;
    }

    this.moveNums.pop();
    const lastMoves = this.moves[this.moveNums[this.moveNums.length - 1]];

    this.container.x = lastMoves[0];
    this.container.y = lastMoves[1];

    if (lastMoves[2] !== this.direction) {
      this.changeDirection(lastMoves[2]);
    }

    delete this.moves[moveNum];
    return true;
  }
}

export default MoveableSquare;
