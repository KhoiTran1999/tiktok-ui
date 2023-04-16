import { createSlice } from '@reduxjs/toolkit';

const VideoListSlice = createSlice({
    name: 'videoList',
    initialState: [],
    reducers: {
        setVideoList: (state, action) => {
            return (state = action.payload);
        },
    },
});

export default VideoListSlice;
