import { configureStore } from '@reduxjs/toolkit';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';
import MessagesSlice from '../components/Messages/ChatBox/BodyChatBox/messagesSlice';
import ChoosedUserSlice from '../components/Messages/ChatBox/choosedUserSlice';
import ModalSettingSlice from '../components/Messages/ModalSetting/ModalSettingSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import UserListSlice from '../firebase/UserListSlice';
import LoadingSlice from '../services/loadingSlice';

const store = configureStore({
    reducer: {
        modalSign: ModalSignSlice.reducer,
        userLogin: UserLoginSlice.reducer,
        modalSetting: ModalSettingSlice.reducer,
        curRoomsList: RoomsSlice.reducer,
        userList: UserListSlice.reducer,
        choosedUser: ChoosedUserSlice.reducer,
        messages: MessagesSlice.reducer,
        loading: LoadingSlice.reducer,
    },
});

export default store;
