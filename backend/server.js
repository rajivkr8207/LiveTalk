import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const Room = "Grouped";

let onlineUsers = new Map();

io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);

    socket.on("JoinRoom", async (username) => {
        socket.username = username;

        await socket.join(Room);

        onlineUsers.set(socket.id, username);

        io.to(Room).emit("onlineUsers", onlineUsers.size);

        socket.to(Room).emit("roomNotice", `${username} joined`);
    });

    socket.on("Chatmsg", (msg) => {
        socket.to(Room).emit("Chatmsg", msg);
    });

    socket.on("typing", (data) => {
        if (data.isTyping) {
            socket.to(Room).emit("typing", data);
        } else {
            socket.to(Room).emit("stopTyping", data);
        }
    });

    socket.on("disconnect", () => {

        onlineUsers.delete(socket.id);

        io.to(Room).emit("onlineUsers", onlineUsers.size);

        socket.to(Room).emit("roomNotice", `${socket.username} left`);

        // console.log("User disconnected:", socket.id);
    });
});

httpServer.listen(8000, () => {
    console.log("server is running on 8000 port");
});