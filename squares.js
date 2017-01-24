import createjs from 'createjs-easeljs';
import moveableSquare from './shape';

document.addEventListener('DOMContentLoaded', () => {

  const stage = new createjs.Stage("canvas");
  const red = new moveableSquare(100, 100, "red", "DOWN", stage);
  const yellow = new moveableSquare(160, 100, "yellow", "RIGHT", stage);
  const green = new moveableSquare(160, 160, "green", "UP", stage);


  stage.addChild(red.shape(), yellow.shape(), green.shape());
  stage.update();
});
