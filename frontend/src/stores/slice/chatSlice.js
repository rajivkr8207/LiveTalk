// chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    messages: [],
    typingUsers: {},
    onlineUsers: []
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setTyping: (state, action) => {
            state.typingUsers[action.payload] = true;
        },
        clearTyping: (state, action) => {
            delete state.typingUsers[action.payload];
        },
        setUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        clearChat: (state) => {
            state.messages = [];
            state.typingUsers = {};
        }
    }
});

export const {
    setUserName,
    addMessage,
    setTyping,
    clearTyping,
    setUsers,
    clearChat
} = chatSlice.actions;

export default chatSlice.reducer;