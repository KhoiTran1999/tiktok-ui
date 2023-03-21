import { createSlice } from '@reduxjs/toolkit';

const MessagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        setMessages: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default MessagesSlice;
