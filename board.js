import createjs from 'createjs-easeljs';
import MoveableSquare from './square';

class Board {
  constructor() {
    this.board = {};
  }

  addShape(stage, ...shapes) {
    shapes.forEach(shape => {
      this.board[[shape.container.x, shape.container.y]] = shape;
      shape.container.addEventListener(
        "click",
        () =>  {
          this.update(shape, stage);
        }
      );
    });
  }

  update(shape, stage) {
    delete this.board[[shape.container.x, shape.container.y]];
    shape.move();
    const neighbor = this.board[[shape.container.x, shape.container.y]];

    if (neighbor && neighbor instanceof MoveableSquare) {
      neighbor.move(shape.xShift, shape.yShift);
      this.board[[neighbor.container.x, neighbor.container.y]] = neighbor;
    }

    this.board[[shape.container.x, shape.container.y]] = shape;
    stage.update();
  }
}

export default Board;
