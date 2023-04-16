import { createSlice } from '@reduxjs/toolkit';

const MessagesOfRoomSlice = createSlice({
    name: 'messagesOfRoom',
    initialState: [],
    reducers: {
        setMessages: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default MessagesOfRoomSlice;
