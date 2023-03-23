import { createSlice } from '@reduxjs/toolkit';

const SelectedRoomSlice = createSlice({
    name: 'selectedRoom',
    initialState: null,
    reducers: {
        setSelectedRoom: (state, action) => {
            if (state === '') return (state = null);
            else return (state = action.payload);
        },
    },
});

export default SelectedRoomSlice;
