import { configureStore } from '@reduxjs/toolkit';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';
import ChoosedUserSlice from '../components/Messages/ChatAccountList/AccountItem/choosedUserSlice';
import ModalSettingSlice from '../components/Messages/ModalSetting/ModalSettingSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import UserListSlice from '../firebase/UserListSlice';
import LoadingSlice from '../services/loadingSlice';
import SelectedRoomSlice from '../components/Messages/ChatAccountList/AccountItem/selectedRoomSlice';
import MessagesOfRoomSlice from '../components/Messages/ChatBox/BodyChatBox/MessagesOfRoomSlice';
import MutedSlice from '../components/MainContent/ListContent/VideoContent/mutedSlice';
import VolumeSlice from '../components/MainContent/ListContent/VideoContent/volumeSlice';
import UserListMockSlice from '../firebase/UserListMockSlice';

const store = configureStore({
    reducer: {
        modalSign: ModalSignSlice.reducer,
        userLogin: UserLoginSlice.reducer,
        modalSetting: ModalSettingSlice.reducer,
        curRoomsList: RoomsSlice.reducer,
        userList: UserListSlice.reducer,
        userListMock: UserListMockSlice.reducer,
        choosedUser: ChoosedUserSlice.reducer,
        messagesOfRoom: MessagesOfRoomSlice.reducer,
        loading: LoadingSlice.reducer,
        selectedRoom: SelectedRoomSlice.reducer,
        muted: MutedSlice.reducer,
        volume: VolumeSlice.reducer,
    },
});

export default store;
