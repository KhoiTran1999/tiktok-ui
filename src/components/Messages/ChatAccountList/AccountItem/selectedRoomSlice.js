import { createSlice } from '@reduxjs/toolkit';

const SelectedRoomSlice = createSlice({
    name: 'selectedRoom',
    initialState: '',
    reducers: {
        setSelectedRoom: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export default SelectedRoomSlice;
