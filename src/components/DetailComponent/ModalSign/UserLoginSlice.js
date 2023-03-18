import { createSlice } from '@reduxjs/toolkit';

const UserLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        login: null,
    },
    reducers: {
        setUser: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default UserLoginSlice;
