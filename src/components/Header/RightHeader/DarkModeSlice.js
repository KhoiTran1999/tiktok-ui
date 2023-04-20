import { createSlice } from '@reduxjs/toolkit';

const DarkModeSlice = createSlice({
    name: 'darkMode',
    initialState: false,
    reducers: {
        setDarkMode: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default DarkModeSlice;
