import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Othello.js",
    description: "Othello using Websockets",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-emerald-950">
                {children}
            </body>
        </html>
    );
}
