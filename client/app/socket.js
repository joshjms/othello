import { io } from 'socket.io-client'
export const socket = io('ws://server:8000')