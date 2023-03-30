import { createSlice } from '@reduxjs/toolkit';

const ModalSignSlice = createSlice({
    name: 'modalSign',
    initialState: false,
    reducers: {
        setModalSign: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ModalSignSlice;
