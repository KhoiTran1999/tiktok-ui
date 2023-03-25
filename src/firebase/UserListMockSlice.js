import { createSlice } from '@reduxjs/toolkit';

const UserListMockSlice = createSlice({
    name: 'userListMock',
    initialState: [],
    reducers: {
        setUserListMock: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default UserListMockSlice;
