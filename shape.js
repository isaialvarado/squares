import createjs from 'createjs-easeljs';

class moveableSquare {
  constructor(x, y, color, direction, stage) {
    this.createSquare(x, y, color);
    this.assignDirection(direction);
    this.square.addEventListener("click", () => this.move(stage));
  }

  createSquare(x, y, color) {
    this.square = new createjs.Shape();
    this.square.graphics.beginFill(color).drawRect(0, 0, 50, 50);
    this.square.x = x;
    this.square.y = y;
  }

  assignDirection(direction) {
    switch (direction) {
      case 'UP':
        this.xDirection = 0;
        this.yDirection = -60;
        break;
      case 'RIGHT':
      this.xDirection = 60;
      this.yDirection = 0;
        break;
      case 'DOWN':
      this.xDirection = 0;
      this.yDirection = 60;
        break;
      case 'LEFT':
      this.xDirection = -60;
      this.yDirection = 0;
        break;
      default:
        return;
    }
  }

  shape() {
    return this.square;
  }

  move(stage) {
    this.square.x += this.xDirection;
    this.square.y += this.yDirection;
    stage.update();
  }
}

export default moveableSquare;
