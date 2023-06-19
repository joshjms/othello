import Cell from "./Cell";

export default function Board({ boardState, player }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${boardState.length}, 1fr)`,
            }}
        >
            {boardState.map((row, rowIndex) =>
                row.map((cell, columnIndex) => (
                    <Cell key={`${rowIndex}-${columnIndex}`} color={cell} row={rowIndex} col={columnIndex} player={player} />
                ))
            )}
        </div>
    );
}
