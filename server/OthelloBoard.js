class OthelloBoard {
    constructor(size = 8) {
        this.size = size;
        this.board = [];
        this.turn = "B";
        this.blackCount = 2;
        this.whiteCount = 2;

        for (let row = 0; row < size; row++) {
            this.board[row] = [];
            for (let col = 0; col < size; col++) {
                this.board[row][col] = " ";
            }
        }

        const center = Math.floor(size / 2);
        this.board[center][center] = "W";
        this.board[center][center - 1] = "B";
        this.board[center - 1][center] = "B";
        this.board[center - 1][center - 1] = "W";
    }

    reset() {
        this.turn = "B";
        this.blackCount = 2;
        this.whiteCount = 2;

        for (let row = 0; row < this.size; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.size; col++) {
                this.board[row][col] = " ";
            }
        }

        const center = Math.floor(this.size / 2);
        this.board[center][center] = "W";
        this.board[center][center - 1] = "B";
        this.board[center - 1][center] = "B";
        this.board[center - 1][center - 1] = "W";
    }

    recount() {
        this.blackCount = 0;
        this.whiteCount = 0;
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {
                if(this.board[row][col] === 'B') {
                    this.blackCount++;
                } else if(this.board[row][col] === 'W') {
                    this.whiteCount++;
                }
            }
        }
    }

    getValidMoves(color) {
        const validMoves = [];

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.isValidMove(row, col, color)) {
                    validMoves.push([row, col]);
                }
            }
        }

        return validMoves;
    }

    getCell(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.board[row][col];
        }
        return null;
    }

    setCell(row, col, color) {
        if (this.isValidPosition(row, col) && this.isValidColor(color)) {
            this.board[row][col] = color;
        }
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    isValidColor(color) {
        return color === this.turn;
    }

    isValidMove(row, col, color) {
        if (!this.isValidPosition(row, col) || !this.isValidColor(color)) {
            return false;
        }

        if (this.getCell(row, col) !== " ") {
            return false;
        }

        const directions = [
            { dr: -1, dc: 0 }, // up
            { dr: 1, dc: 0 }, // down
            { dr: 0, dc: -1 }, // left
            { dr: 0, dc: 1 }, // right
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 }, // up-right
            { dr: 1, dc: -1 }, // down-left
            { dr: 1, dc: 1 }, // down-right
        ];

        for (let dir of directions) {
            const [dr, dc] = [dir.dr, dir.dc];
            let [r, c] = [row + dr, col + dc];
            let foundOpponentColor = false;

            while (this.isValidPosition(r, c)) {
                const cell = this.getCell(r, c);

                if (cell === " ") {
                    break;
                }

                if (cell === color) {
                    if (foundOpponentColor) {
                        return true;
                    }
                    break;
                }

                foundOpponentColor = true;
                r += dr;
                c += dc;
            }
        }

        return false;
    }

    makeMove(row, col, color) {
        if (this.isValidMove(row, col, color)) {
            this.setCell(row, col, color);

            const directions = [
                { dr: -1, dc: 0 }, // up
                { dr: 1, dc: 0 }, // down
                { dr: 0, dc: -1 }, // left
                { dr: 0, dc: 1 }, // right
                { dr: -1, dc: -1 }, // up-left
                { dr: -1, dc: 1 }, // up-right
                { dr: 1, dc: -1 }, // down-left
                { dr: 1, dc: 1 }, // down-right
            ];

            for (let dir of directions) {
                const [dr, dc] = [dir.dr, dir.dc];
                let [r, c] = [row + dr, col + dc];
                let foundOpponentColor = false;
                let cellsToFlip = [];

                while (this.isValidPosition(r, c)) {
                    const cell = this.getCell(r, c);

                    if (cell === " ") {
                        break;
                    }

                    if (cell === color) {
                        if (foundOpponentColor) {
                            for (let [flipRow, flipCol] of cellsToFlip) {
                                this.setCell(flipRow, flipCol, color);
                            }
                        }
                        break;
                    }

                    foundOpponentColor = true;
                    cellsToFlip.push([r, c]);
                    r += dr;
                    c += dc;
                }
            }

            if(this.isBoardFull()) {
                this.turn = " ";
            } else {
                this.turn = this.turn === "W" ? "B" : "W";
                if(!this.getValidMoves(this.turn).length) {
                    this.turn = this.turn === "W" ? "B" : "W";
                }
            }

            return true;
        }

        return false;
    }

    isBoardFull() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === " ") {
                    return false;
                }
            }
        }
        return true;
    }

    printBoard() {
        for (let row = 0; row < this.size; row++) {
            let rowString = "";
            for (let col = 0; col < this.size; col++) {
                rowString += this.board[row][col] + " ";
            }
            console.log(rowString);
        }
    }
}

module.exports = OthelloBoard;