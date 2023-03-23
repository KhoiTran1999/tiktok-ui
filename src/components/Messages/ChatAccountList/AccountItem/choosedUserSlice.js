import { createSlice } from '@reduxjs/toolkit';

const ChoosedUserSlice = createSlice({
    name: 'choosedUser',
    initialState: null,
    reducers: {
        setChoosedUser: (state, action) => {
            if (state === '') return (state = null);
            else return (state = action.payload);
        },
    },
});

export default ChoosedUserSlice;
