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
    this.circle.graphics.beginFill(color).drawCircle(25, 25, 25);
  }

  createContainer(x, y) {
    this.container = new createjs.Container();
    this.container.addChild(this.circle);
    this.container.x = (x * 60) - 60;
    this.container.y = (y * 60) - 60;
  }

  coordinates() {
    return [this.container.x, this.container.y];
  }
}

export default GoalSquare;
