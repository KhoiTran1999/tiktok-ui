import { createSlice } from '@reduxjs/toolkit';

const ModalSettingSlice = createSlice({
    name: 'modalSetting',
    initialState: false,
    reducers: {
        setModalSetting: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ModalSettingSlice;
