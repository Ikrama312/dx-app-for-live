import io from "socket.io-client";
import { BASE_URL } from "./axios";

const authToken = localStorage.getItem("accessToken");

export const socket = io.connect(BASE_URL, {
    reconnection: false,
    path: "/socket",
    query: {
        token: authToken
    },
    timeout: 30000,
    reconnection: true, rejectUnauthorized: false,
    transports: ['websocket']
});

socket.on('connect', (con) => {
    // console.log('SocketServices', 'connect', socket.connected, socket.id)
    console.log("connection", con)
});
socket.on('error', (error) => {
    console.log("error", error)
});
socket.on('connect_error', (error) => {
    console.log("connection error", error)
});