import { createSlice } from '@reduxjs/toolkit';

const VolumeSlice = createSlice({
    name: 'volume',
    initialState: 0.2,
    reducers: {
        setVolume: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default VolumeSlice;
