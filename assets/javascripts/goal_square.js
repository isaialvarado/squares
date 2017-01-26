import createjs from 'createjs-easeljs';

class GoalSquare {
  constructor(x, y, color) {
    this.setupCircle(x, y, color);
  }

  setupCircle(x, y, color) {
    this.createCircle(color);
    this.createContainer(x, y);
  }

  createCircle(color) {
    this.color = color;
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill(color).drawCircle(35, 35, 35);
  }

  createContainer(x, y) {
    this.container = new createjs.Container();
    this.container.addChild(this.circle);
    this.container.x = (x * 80) - 80;
    this.container.y = (y * 80) - 80;
  }

  coordinates() {
    return [this.container.x, this.container.y];
  }
}

export default GoalSquare;
