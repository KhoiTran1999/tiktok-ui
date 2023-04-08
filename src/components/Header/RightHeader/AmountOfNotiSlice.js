import { createSlice } from '@reduxjs/toolkit';

const AmountOfNotiSlice = createSlice({
    name: 'amountOfNoti',
    initialState: [],
    reducers: {
        setAmountOfNoti: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default AmountOfNotiSlice;
