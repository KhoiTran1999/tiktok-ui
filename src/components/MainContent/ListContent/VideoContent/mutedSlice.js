import { createSlice } from '@reduxjs/toolkit';

const MutedSlice = createSlice({
    name: 'muted',
    initialState: true,
    reducers: {
        setMuted: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default MutedSlice;
