import { createSlice } from '@reduxjs/toolkit';

const RoomsSlice = createSlice({
    name: 'curRoomsList',
    initialState: [],
    reducers: {
        setCurRooms: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default RoomsSlice;
