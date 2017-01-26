import createjs from 'createjs-easeljs';

class MoveableSquare {
  constructor(x, y, color, direction, type) {
    this.setupSquare(x, y, color, direction, type);
    this.moves = { 0: [this.container.x, this.container.y, this.direction] };
    this.moveNums = [0];
  }

  setupSquare(x, y, color, direction, type) {
    this.createSquare(color);
    this.createSquareText(direction, type);
    this.createContainer(x, y);
    this.changeDirection(direction);
  }

  createSquare(color) {
    this.color = color;
    this.square = new createjs.Shape();
    this.square.graphics.beginFill(color).drawRect(0, 0, 70, 70);
  }

  createSquareText(direction, type) {
    this.squareText = new createjs.Text();
    this.squareText.font = "bold 30px Aerial";
    if (type === 'redirect') {
      this.squareText.color = "black";
    } else {
      this.squareText.color = "white";
    }
    this.squareText.x = 20;
    this.squareText.y = 20;
    this.assignArrow();
  }

  createContainer(x, y) {
    this.container = new createjs.Container();
    this.container.addChild(this.square, this.squareText);
    this.container.x = (x * 80) - 80;
    this.container.y = (y * 80) - 80;
  }

  changeDirection(direction) {
    this.direction = direction;
    switch (direction) {
      case 'UP':
        this.xShift = 0;
        this.yShift = -80;
        break;
      case 'RIGHT':
      this.xShift = 80;
      this.yShift = 0;
        break;
      case 'DOWN':
      this.xShift = 0;
      this.yShift = 80;
        break;
      case 'LEFT':
      this.xShift = -80;
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
