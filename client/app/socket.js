import { io } from 'socket.io-client'
export const socket = io(SOCKET_URL, {
     path: SOCKET_PATH,
})

socket.on('connect_error', err => console.log(err));
socket.on('connect_failed', err => console.log(err));
socket.on('disconnect', err => console.log(err));
