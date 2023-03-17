import { createSlice } from '@reduxjs/toolkit';

const UserLoginSlice = createSlice({
    name: 'userLogin',
    initialState: false,
    reducers: {
        getUser: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default UserLoginSlice;
