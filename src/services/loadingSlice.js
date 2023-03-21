import { createSlice } from '@reduxjs/toolkit';

const LoadingSlice = createSlice({
    name: 'loading',
    initialState: 'false',
    reducers: {
        setLoading: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default LoadingSlice;
