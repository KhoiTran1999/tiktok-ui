import { createSlice } from '@reduxjs/toolkit';

const ChoosedUserSlice = createSlice({
    name: 'choosedUser',
    initialState: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
        providerID: '',
        keyword: '', //For key word searching
        createdAt: 0,
    },
    reducers: {
        setChoosedUser: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default ChoosedUserSlice;
