# Squares

[Squares][live] is a puzzle game inspired by [Jelly Squares](https://www.facebook.com/pg/JellySquares/photos/) built using JavaScript, EaselJS, and CSS.

The goal of the game is to move each colored square onto their same-colored circle. Squares are moved by clicking on them. By default, squares move one space at a time and only in one direction: left, right, up or down. The direction is indicated by an arrow on the face of the square. Squares can push other squares.

[live]: https://isaialvarado.github.io/squares/squares.html
## Motivation

Motivation was to recreate the simplicity and fun factor of a grid-based puzzle.

## Features

- Interactive game with onclick events
- Undo and restart functionality
- Instructional modal

###### Preview

![Squares Preview][squares_preview]

[squares_preview]: ./docs/images/squares_preview.png "Search Results"
## Technology

- JavaScript
- EaselJS
- CSS

###### Undo Functionality

Board class has undo method. It retrieves all squares moved during the last move from its moves object. Then, each square has its own undo method to update its own coordinates in the canvas. Finally, the board updates its own position of each square in its squares object.

```JavaScript
undo() {
  if (this.moveCount === 0) {
    return;
  } else {
    const squaresToUndo = this.moves[this.moveCount];

    squaresToUndo.forEach(square => {
      square.undo();
      this.squares[square.coordinates()] = square;
    });

    delete this.moves[this.moveCount];
    delete this.squares[this.coordinatesOfLastSquareMoved.pop()];
    this.moveCount -= 1;
  }
}
```
###### Using EaselJS

MoveableSquare class creates an instance of EaselJS Container class for the square, which contains a square and unicode triangle. For convenience, when creating a MoveableSquare, only the basic, relative grid position is necessary (e.g., 1, 1 for x, y is the first square on the top left of the board); the createContainer method automatically scales the input.

```JavaScript
createContainer(x, y) {
  this.container = new createjs.Container();
  this.container.addChild(this.square, this.squareText);
  this.container.x = (x * 80) - 80;
  this.container.y = (y * 80) - 80;
}
```
Arrows on the board that change a square's directional movement come from RedirectSquare class. The only differences between RedirectSquare and MoveableSquare are the color scheme and no event listener for redirect squares.

```JavaScript
class RedirectSquare extends MoveableSquare {
  constructor(x, y, direction) {
    super(x, y, 'white', direction, 'redirect');
  }
}
```

To prevent squares from being hid under "goal" circles or the special "redirect" arrows on the board when they overlap, indices for goals and redirects are set to 0 using EaselJS setChildIndex method for Stage class.

```JavaScript
stage.setChildIndex(r4.container, 0);
stage.setChildIndex(g1.container, 0);
```

## Future Functionality

The following is a list of functionality for future implementation:

- Allow users to select from a variety of different puzzles

## Project Design

Squares was designed and implemented in five days based on a proposal that included

* [Original Wireframes][wireframes]

[wireframes]: ./docs/wireframes

## Colors

Palette by [Skyblue2u](http://www.colourlovers.com/palette/373610/mellon_ball_surprise)
