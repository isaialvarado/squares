import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';
import RedirectSquare from './redirect_square';
import GoalSquare from './goal_square';

export const setupGame = (stage, board) => {
  setupLevel1(stage, board);
  setupUserButtons(stage, board);
};

export const setupLevel1 = (stage, board) => {
  const red = new MoveableSquare(5, 3, "red", "RIGHT");
  const yellow = new MoveableSquare(4, 3, "yellow", "UP");
  const green = new MoveableSquare(4, 4, "green", "RIGHT");

  const redGoal = new GoalSquare(6, 3, "red");
  const yellowGoal = new GoalSquare(4, 2, "yellow");
  const greenGoal = new GoalSquare(5, 4, "green");

  const redirect1 = new RedirectSquare(4, 5, "UP");

  board.addSquares(stage, red, yellow, green);
  board.addRedirects(redirect1);
  board.addGoals(redGoal, yellowGoal, greenGoal);

  stage.addChild(
    red.container,
    yellow.container,
    green.container,
    redGoal.container,
    yellowGoal.container,
    greenGoal.container,
    redirect1.container
  );

  stage.setChildIndex(redirect1.container, 0);
  stage.setChildIndex(redGoal.container, 0);
  stage.setChildIndex(yellowGoal.container, 0);
  stage.setChildIndex(greenGoal.container, 0);
  stage.update();
};

export const setupUserButtons = (stage, board) => {
  const restartButton = document.getElementById("restart");
  const undoButton = document.getElementById("undo");

  restartButton.addEventListener("click", () => {
    stage.removeAllChildren();
    stage.enableDOMEvents(true);
    board.clearBoard();
    setupLevel1(stage, board);
  });

  undoButton.addEventListener("click", () => board.undo());
};
