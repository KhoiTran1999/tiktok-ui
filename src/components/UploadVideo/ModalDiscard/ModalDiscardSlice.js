import { createSlice } from '@reduxjs/toolkit';

const ModalDiscardSlice = createSlice({
    name: 'modalDiscard',
    initialState: false,
    reducers: {
        setMadalDiscard: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ModalDiscardSlice;
