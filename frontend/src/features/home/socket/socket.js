import { io } from "socket.io-client";



export function ConnectWS(){
    return io('http://localhost:8000')
}