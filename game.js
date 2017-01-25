import createjs from 'createjs-easeljs';
import MoveableSquare from './square';

export const setupBoard = (stage, board) => {
  const red = new MoveableSquare(100, 100, "red", "DOWN");
  const yellow = new MoveableSquare(160, 100, "yellow", "RIGHT");
  const green = new MoveableSquare(160, 160, "green", "UP");
  board.addShape(stage, red, yellow, green);
  stage.addChild(red.shape(), yellow.shape(), green.shape());
  stage.update();
};
