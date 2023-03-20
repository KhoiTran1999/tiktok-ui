import { createSlice } from '@reduxjs/toolkit';

const UserListSlice = createSlice({
    name: 'userList',
    initialState: [],
    reducers: {
        setUserList: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default UserListSlice;
