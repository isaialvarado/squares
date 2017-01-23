## Squares

### Background

Squares is based off of an iOS game named [Jelly Squares](https://itunes.apple.com/us/app/jelly-squares/id1178130126?mt=8).

The goal of the game is to move each colored square onto their correct destination, a circle on the screen/board that is the same color as the square. Squares are moved by clicking on them. By default, squares move one space at a time and only in one direction: left, right, up or down. The direction is indicated by an arrow on the face of the square. Squares can push other squares.

### Minimum Viable Product

By the end of week, this app will, at a minimum, have the following functionality:

- [ ] Move squares across the board by clicking on them
- [ ] Squares can be pushed by other squares
- [ ] Undo moves and reset game board
- [ ] Leverage special arrows on the board to change a square's default direction

In addition, this project will include:
- [ ] A production Readme

### Wireframes

This app will consist of a single white board area in the middle of the window that is 7x9 squares. Buttons at the bottom of the screen will be for resetting and restarting the game. Finally, links to the Github and LinkedIn will be at the top.

[Wireframes](./wireframes)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`square.js`: A Square object will hold a `direction` (up, down, left, or right) and a `color`.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of both scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API. First, build out the `Square` object to connect to the `Board` object. Goals for the day:

- Complete the `square.js` module
- Render a square grid to the `Canvas` using `Easel.js`
- Make each square in the grid clickable, changing the position of the square on the grid

**Day 3**: Make it so squares can push other squares and board recognizes when puzzle has been complete.


**Day 4**: Install the controls for the user to interact with the game. Style the frontend, making it polished and professional. Goals for the day:

- Create controls for game undo and restart.
- Have a styled `Canvas`, nice looking controls and title
- If time: include modal to select different levels.


### Bonus features
- [ ] Add ability for user to create own puzzles by allowing them to place the elements onto the board.
