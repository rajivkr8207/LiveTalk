import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ConnectWS } from "../socket/socket";
import Join from "./Join";
import {
  addMessage,
  setTyping,
  clearTyping,
  setUsers,
} from "../../../stores/slice/chatSlice";
import TypingIndicator from "../components/TypingIndicator";
import ChatMessage from "../components/ChatMessage";

function Chat() {
  const socket = useRef();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const userName = useSelector((state) => state.chat.userName);
  const messages = useSelector((state) => state.chat.messages);
  const typingUsers = useSelector((state) => state.chat.typingUsers);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);

  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.current = ConnectWS();

    socket.current.on("connect", () => {
      if (userName) {
        socket.current.emit("JoinRoom", userName);
      }
    });

    socket.current.on("Chatmsg", (msg) => {
      dispatch(addMessage(msg));
    });

    socket.current.on("roomNotice", (data) => {
      const joinMessage = {
        user: "System",
        text: `${data} the group`,
        type: "system",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(joinMessage));
    });

    socket.current.on("typing", (data) => {
      if (data.user !== userName) {
        dispatch(setTyping(data.user));
        setTimeout(() => {
          dispatch(clearTyping(data.user));
        }, 1000);
      }
    });

    socket.current.on("onlineUsers", (users) => {
      dispatch(setUsers(users));
    });

    return () => {
      socket.current.disconnect();
    };
  }, [dispatch]);

  const handleTyping = (value) => {
    setText(value);

    if (!isTyping) {
      setIsTyping(true);
      socket.current.emit("typing", { user: userName, isTyping: true });
    }
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.current.emit("typing", { user: userName, isTyping: false });
    }, 1000);
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    const message = {
      user: userName,
      text: text,
      timestamp: new Date().toISOString(),
      type: "user",
    };

    socket.current.emit("Chatmsg", message);
    dispatch(addMessage(message));

    socket.current.emit("typing", { user: userName, isTyping: false });

    setIsTyping(false);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  function handleSubmit(name) {
    socket.current.emit("JoinRoom", name);
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold">LiveTalk</h1>
            {onlineUsers != 0
              && <>
                <span className="bg-green-500 px-2 py-1 rounded-full text-sm">
                  {onlineUsers} online
                </span>
              </>}
          </div>
          <div className="flex items-center space-x-3">
            {userName && <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
              {userName}
            </span>}
          </div>
        </div>
      </div>

      {!userName && <Join JoinChat={handleSubmit} />}

      {userName && (
        <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <ChatMessage
                key={i}
                message={m}
                isOwnMessage={m.user === userName}
                formatTime={formatTime}
              />
            ))}

            {Object.keys(typingUsers).length > 0 && (
              <TypingIndicator users={Object.keys(typingUsers)} />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {userName && (
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto flex space-x-3">
            <input
              type="text"
              value={text}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
