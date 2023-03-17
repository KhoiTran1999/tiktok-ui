import { configureStore } from '@reduxjs/toolkit';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';

const store = configureStore({
    reducer: {
        modalSign: ModalSignSlice.reducer,
    },
});

export default store;
