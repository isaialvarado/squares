import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';
import RedirectSquare from './redirect_square';
import GoalSquare from './goal_square';

export const setupGame = (stage, board) => {
  setupLevel1(stage, board);
  setupUserButtons(stage, board);
};

export const setupLevel1 = (stage, board) => {
  const s1 = new MoveableSquare(2, 4, "forestgreen", "RIGHT");
  const s2 = new MoveableSquare(1, 5, "goldenrod", "RIGHT");
  const s3 = new MoveableSquare(3, 5, "dimgrey", "UP");

  const g1 = new GoalSquare(5, 5, "forestgreen");
  const g2 = new GoalSquare(2, 5, "goldenrod");
  const g3 = new GoalSquare(3, 2, "dimgrey");

  const r1 = new RedirectSquare(3, 3, "DOWN");
  const r2 = new RedirectSquare(3, 6, "UP");
  const r3 = new RedirectSquare(4, 5, "LEFT");

  board.addSquares(stage, s1, s2, s3);
  board.addRedirects(r1, r2, r3);
  board.addGoals(g1, g2, g3);

  stage.addChild(
    s1.container,
    s2.container,
    s3.container,
    g1.container,
    g2.container,
    g3.container,
    r1.container,
    r2.container,
    r3.container
  );

  stage.setChildIndex(r1.container, 0);
  stage.setChildIndex(r2.container, 0);
  stage.setChildIndex(r3.container, 0);
  stage.setChildIndex(g1.container, 0);
  stage.setChildIndex(g2.container, 0);
  stage.setChildIndex(g3.container, 0);
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

  undoButton.addEventListener("click", () => {
    board.undo();
    stage.update();
  });
};
