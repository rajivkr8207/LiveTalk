import { io } from "socket.io-client";

export function ConnectWS() {
    return io(import.meta.env.VITE_SOCKET_URL)
}