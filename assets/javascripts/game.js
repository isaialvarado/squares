import createjs from 'createjs-easeljs';
import MoveableSquare from './moveable_square';
import RedirectSquare from './redirect_square';
import GoalSquare from './goal_square';

export const setupGame = (stage, board) => {
  setupLevel1(stage, board);
  setupUserButtons(stage, board);
  setupModal();
};

export const setupLevel1 = (stage, board) => {
  const s1 = new MoveableSquare(2, 3, "#B5D8EB", "DOWN");
  const s2 = new MoveableSquare(4, 3, "#D1F2A5", "DOWN");
  const s3 = new MoveableSquare(2, 5, "#F56991", "UP");
  const s4 = new MoveableSquare(4, 5, "#FDAE84", "UP");

  const g1 = new GoalSquare(3, 4, "#B5D8EB");
  const g2 = new GoalSquare(3, 5, "#D1F2A5");
  const g3 = new GoalSquare(5, 5, "#F56991");
  const g4 = new GoalSquare(3, 6, "#FDAE84");

  const r1 = new RedirectSquare(2, 4, "RIGHT");
  const r2 = new RedirectSquare(3, 3, "DOWN");
  const r3 = new RedirectSquare(4, 4, "LEFT");
  const r4 = new RedirectSquare(5, 4, "DOWN");

  board.addSquares(stage, s1, s2, s3, s4);
  board.addRedirects(r1, r2, r3, r4);
  board.addGoals(g1, g2, g3, g4);

  stage.addChild(
    s1.container,
    s2.container,
    s3.container,
    s4.container,
    g1.container,
    g2.container,
    g3.container,
    g4.container,
    r1.container,
    r2.container,
    r3.container,
    r4.container
  );

  stage.setChildIndex(r1.container, 0);
  stage.setChildIndex(r2.container, 0);
  stage.setChildIndex(r3.container, 0);
  stage.setChildIndex(r4.container, 0);
  stage.setChildIndex(g1.container, 0);
  stage.setChildIndex(g2.container, 0);
  stage.setChildIndex(g3.container, 0);
  stage.setChildIndex(g4.container, 0);
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

export const setupModal = () => {
  const instructionButton = document.getElementById("instructions-button");
  const modal = document.getElementById("instructions-modal");

  instructionButton.addEventListener("click", () => (
    modal.style.display = "flex"
  ));

  window.addEventListener("click", event => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
