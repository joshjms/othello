const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*' },
});

const OthelloBoard = require('./OthelloBoard.js');

const board = new OthelloBoard();

io.on('connection', (socket) => {
    console.log('Connected');
    socket.emit('board', {
        board: board.board,
        turn: board.turn,
        blackCount: board.blackCount,
        whiteCount: board.whiteCount,
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('reset', () => {
        board.reset();
        board.recount();
        io.emit('board', {
            board: board.board,
            turn: board.turn,
            blackCount: board.blackCount,
            whiteCount: board.whiteCount,
        });
    })

    socket.on('move', ({ row, col, turn }) => {
        if (board.turn === turn) {
            if (board.makeMove(row, col, turn)) {
		console.log(`${turn} makes a move`};
                board.recount();
                io.emit('board', {
                    board: board.board,
                    turn: board.turn,
                    blackCount: board.blackCount,
                    whiteCount: board.whiteCount,
                });
            }
        }
    });
});

http.listen(8000, () => {
    console.log('listening on http://localhost:8000');
});
