import { createSlice } from '@reduxjs/toolkit';

const ModalWelcomeSlice = createSlice({
    name: 'modalWelcome',
    initialState: false,
    reducers: {
        setModalWelcome: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ModalWelcomeSlice;
