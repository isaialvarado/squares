import createjs from 'createjs-easeljs';

class MoveableSquare {
  constructor(x, y, color, direction) {
    this.setupSquare(x, y, color, direction);
  }

  setupSquare(x, y, color, direction) {
    this.createSquare(x, y, color);
    this.createSquareText(direction);
    this.createContainer(x, y);
    this.assignDirection(direction);
  }

  createSquare(x, y, color) {
    this.square = new createjs.Shape();
    this.square.graphics.beginFill(color).drawRect(0, 0, 50, 50);
  }

  createSquareText(direction) {
    this.squareText = new createjs.Text();
    this.squareText.font = "bold 25px 'Press Start 2P'";
    this.squareText.color = "black";
    this.squareText.x = 13;
    this.squareText.y = 14;
    this.assignArrow();
  }

  createContainer(x, y) {
    this.container = new createjs.Container();
    this.container.addChild(this.square, this.squareText);
    this.container.x = x;
    this.container.y = y;
  }

  assignDirection(direction) {
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

  shape() {
    return this.container;
  }

  move(x = this.xShift, y = this.yShift) {
    this.container.x += x;
    this.container.y += y;
  }
}

export default MoveableSquare;
