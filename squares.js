import createjs from 'createjs-easeljs';
import { setupBoard } from './game';
import Board from './board';

document.addEventListener('DOMContentLoaded', () => {
  const stage = new createjs.Stage("canvas");
  const game = new Board();
  setupBoard(stage, game);
  window.game = game;
});
