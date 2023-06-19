"use client";

import { useState, useEffect } from "react";
import { socket } from "@/app/socket";
import { Button } from "reactstrap";
import Link from "next/link";

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <main className="flex min-h-screen items-center justify-center gap-5">
            <div>
                <h1 className="text-8xl font-bold text-white">Othello.js</h1>
                <p className="text-white text-xs">
                    Server Status: {isConnected ? "Connected" : "Not Connected"}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/black">
                    <Button color="light">Play as Black</Button>
                </Link>
                <Link href="/white">
                    <Button color="light">Play as White</Button>
                </Link>
            </div>
        </main>
    );
}
