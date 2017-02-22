import createjs from 'createjs-easeljs';
import { setupGame } from './game';
import Board from './board';

document.addEventListener('DOMContentLoaded', () => {
  const width = "390";
  const height = "550";
  const stage = new createjs.Stage("canvas");

  stage.canvas.width = width;
  stage.canvas.height = height;

  const board = new Board();
  setupGame(stage, board);
});
