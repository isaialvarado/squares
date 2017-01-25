import createjs from 'createjs-easeljs';
import { setupLevel1, setupUserButtons } from './game';
import Board from './board';

document.addEventListener('DOMContentLoaded', () => {
  const stage = new createjs.Stage("canvas");
  const board = new Board();
  setupLevel1(stage, board);
  setupUserButtons(stage, board);
});
