import createjs from 'createjs-easeljs';
import MoveableSquare from './square';

class Board {
  constructor() {
    this.board = {};
  }

  addShape(shape, stage) {
    this.board[[shape.x, shape.y]] = shape;
    shape.container.addEventListener(
      "click",
      () =>  {
        this.update(shape, stage);
      }
    );
  }

  update(shape, stage) {
    shape.move();
    const x = shape.container.x;
    const y = shape.container.y;

    const neighbor = this.board[[x, y]];
    if (neighbor && neighbor instanceof MoveableSquare) {
      neighbor.move(x, y);
      this.board[[x + x, y + y]] = neighbor;
    }
    this.board[[x , y]] = shape;
    stage.update();
  }
}

export default Board;
