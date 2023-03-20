import { createSlice } from '@reduxjs/toolkit';

const RoomsSlice = createSlice({
    name: 'rooms',
    initialState: [],
    reducers: {
        setRooms: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default RoomsSlice;
