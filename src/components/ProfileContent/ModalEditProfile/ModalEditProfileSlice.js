import { createSlice } from '@reduxjs/toolkit';

const ModalEditProfileSlice = createSlice({
    name: 'modalEditProfile',
    initialState: false,
    reducers: {
        setModalEditProfile: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ModalEditProfileSlice;
