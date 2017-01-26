import createjs from 'createjs-easeljs';
import { setupGame } from './game';
import Board from './board';

document.addEventListener('DOMContentLoaded', () => {
  const stage = new createjs.Stage("canvas");
  const board = new Board();
  setupGame(stage, board);
});
