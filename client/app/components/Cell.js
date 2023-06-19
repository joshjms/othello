import { socket } from "@/app/socket";
import { useEffect } from "react";

export default function Cell({ row, col, color, player }) {
    const handleClick = () => {
        console.log("Make move");
        socket.emit("move", { row, col, turn: player });
    };

    const BlackPiece = (
        <div className="w-[50px] h-[50px] rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
            <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600"></div>
        </div>
    );

    const WhitePiece = (
        <div className="w-[50px] h-[50px] rounded-full bg-gray-200 border-2 border-black flex items-center justify-center">
            <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-400"></div>
        </div>
    );

    return (
        <div
            className="w-[60px] h-[60px] border-[0.5px] border-[black] bg-green-600 flex items-center justify-center"
            onClick={handleClick}
        >
            {color === "B" ? BlackPiece : color === "W" ? WhitePiece : null}
        </div>
    );
}
