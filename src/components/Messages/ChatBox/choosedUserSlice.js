import { createSlice } from '@reduxjs/toolkit';

const ChoosedUserSlice = createSlice({
    name: 'choosedUser',
    initialState: null,
    reducers: {
        setChoosedUser: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ChoosedUserSlice;
