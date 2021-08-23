class Cell {
    // Cell properties
    static width = 5;
    static height = 5;

    constructor(ctx, gridX, gridY) {
        this.ctx = ctx;

        // This will store the cells position somewhere in the grid
        this.gridX = gridX;
        this.gridY = gridY;

        // Randomly allocate alive cells
        this.alive = Math.random() > 0.5;
    }

    draw() {
        // Draws a square
        this.ctx.fillStyle = this.alive ? '#ECEEF9' : '#2E3B87';
        this.ctx.fillRect(this.gridX * Cell.width, this.gridY * Cell.height, Cell.width, Cell.height);
    }
}

class GameBoard {

    static numColumns = 200;
    static numRows = 100;

    constructor(canvas) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.gameObjects = [];

        this.createGrid();
        window.requestAnimationFrame(() => this.gameLoop());
    }

    createGrid() {
        for (let y = 0; y < GameBoard.numRows; y++) {
            for (let x = 0; x < GameBoard.numColumns; x++) {
                this.gameObjects.push(new Cell(this.context, x, y));
            }
        }
    }

    isAlive(x, y) {
        if (x < 0 || x >= GameBoard.numColumns || y < 0 || y >= GameBoard.numRows) {
            return false;
        }

        return this.gameObjects[this.gridToIndex(x, y)].alive ? 1 : 0;
    }

    gridToIndex(x, y) {
        return x + (y * GameBoard.numColumns);
    }

    checkSurrounding() {
        // Loop over all cells
        for (let x = 0; x < GameBoard.numColumns; x++) {
            for (let y = 0; y < GameBoard.numRows; y++) {

                // Count the nearby population
                let numAlive = this.isAlive(x - 1, y - 1) + this.isAlive(x, y - 1) + this.isAlive(x + 1, y - 1) + this.isAlive(x - 1, y) + this.isAlive(x + 1, y) + this.isAlive(x - 1, y + 1) + this.isAlive(x, y + 1) + this.isAlive(x + 1, y + 1);
                let centerIndex = this.gridToIndex(x, y);

                if (numAlive == 2) {
                    // Continues to next stage of life
                    this.gameObjects[centerIndex].nextAlive = this.gameObjects[centerIndex].alive;
                } else if (numAlive == 3) {
                    // New cell is born
                    this.gameObjects[centerIndex].nextAlive = true;
                } else {
                    // Kills the cell
                    this.gameObjects[centerIndex].nextAlive = false;
                }
            }
        }

        // Apply the new state to cells
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].alive = this.gameObjects[i].nextAlive;
        }
    }

    gameLoop() {
        // Check the surrounding of each cell
        this.checkSurrounding();

        // Clear the screen
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw all the gameobjects
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // The loop function has reached it's end, keep requesting new frames
        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameLoop());
        }, 100)
    }
}

window.onload = () => {
    // The page has loaded, start the game
    let gameBoard = new GameBoard('canvas');
}