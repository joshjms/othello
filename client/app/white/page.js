"use client";

import { useState, useEffect } from "react";
import { socket } from "@/app/socket";
import Board from "../components/Board";
import { Button } from "reactstrap";

const myColor = "W";

export default function White() {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState("");
    const [blackCount, setBlackCount] = useState(0);
    const [whiteCount, setWhiteCount] = useState(0);

    useEffect(() => {
        socket.on("board", ({ board, turn, blackCount, whiteCount }) => {
            setBoard(board);
            setTurn(turn);
            setBlackCount(blackCount);
            setWhiteCount(whiteCount);
        });

        return () => {
            socket.off("board");
        };
    }, []);

    return (
        <main className="flex min-h-screen flex-col justify-center items-between">
            <div className="flex flex-col items-center justify-center text-white">
                <div className="text-center text-3xl font-bold">
                    <p>{turn === myColor ? "Your turn" : "Opponent's turn"}</p>
                </div>
                <div className="flex gap-5">
                    <div className="text-center">
                        <div>BLACK</div>
                        <div className="text-3xl font-bold">{blackCount}</div>
                    </div>

                    <div className="text-center">
                        <div>WHITE</div>
                        <div className="text-3xl font-bold">{whiteCount}</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center my-3">
                <div className="border border-black">
                    <Board boardState={board} player="W" />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button color="primary" onClick={() => socket.emit("reset")}> Start </Button>
            </div>
        </main>
    );
}
