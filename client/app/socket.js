import { io } from 'socket.io-client'
export const socket = io('https://othello.joshjms.com', {
     path: '/socket.io',
})

socket.on('connect_error', err => console.log(err));
socket.on('connect_failed', err => console.log(err));
socket.on('disconnect', err => console.log(err));
