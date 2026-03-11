import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../../../stores/slice/chatSlice";

function Join({ JoinChat }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(setUserName(name))
      JoinChat(name.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Join Group Chat</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;
