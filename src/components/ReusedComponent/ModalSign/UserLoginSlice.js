import { createSlice } from '@reduxjs/toolkit';

const UserLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        login: false,
        displayName: '',
        nickName: '',
        email: '',
        photoURL: '',
        uid: '',
        providerID: '',
        keyword: '', //For key word searching
        bio: '',
        tick: false,
        followings: [],
        followers: [],
        likes: [],
        websiteURL: '',
    },
    reducers: {
        setUser: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default UserLoginSlice;
