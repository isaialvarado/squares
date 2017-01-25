import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';
import RedirectSquare from './redirect_square';

export const setupLevel1 = (stage, board) => {
  const red = new MoveableSquare(120, 120, "red", "RIGHT");
  const yellow = new MoveableSquare(180, 120, "yellow", "DOWN");
  const green = new MoveableSquare(180, 180, "green", "DOWN");
  const redirect1 = new RedirectSquare(180, 360, "UP");

  board.addSquares(stage, red, yellow, green);
  board.addRedirects(redirect1);

  stage.addChild(red.shape(), yellow.shape(), green.shape(), redirect1.shape());
  stage.setChildIndex(redirect1.shape(), 0);
  stage.update();
};

export const setupUserButtons = (stage, board) => {
  const restartButton = document.getElementById("restart");
  const undoButton = document.getElementById("undo");

  restartButton.addEventListener("click", () => {
    stage.removeAllChildren();
    setupLevel1(stage, board);
  });

  undoButton.addEventListener("click", () => board.undo());
};
