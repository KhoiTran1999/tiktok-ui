import { configureStore } from '@reduxjs/toolkit';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';

const store = configureStore({
    reducer: {
        modalSign: ModalSignSlice.reducer,
        userLogin: UserLoginSlice.reducer,
    },
});

export default store;
