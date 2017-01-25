import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';

class RedirectSquare extends MoveableSquare {
  constructor(x, y, direction) {
    super(x, y, 'white', direction);
  }
}

export default RedirectSquare;
