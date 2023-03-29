import { configureStore } from '@reduxjs/toolkit';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';
import ChoosedUserSlice from '../components/Messages/ChatAccountList/AccountItem/choosedUserSlice';
import ModalSettingSlice from '../components/Messages/ModalSetting/ModalSettingSlice';
import ModalDiscardSlice from '../components/UploadVideo/ModalDiscard/ModalDiscardSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import UserListSlice from '../firebase/UserListSlice';
import LoadingSlice from '../services/loadingSlice';
import SelectedRoomSlice from '../components/Messages/ChatAccountList/AccountItem/selectedRoomSlice';
import MessagesOfRoomSlice from '../components/Messages/ChatBox/BodyChatBox/MessagesOfRoomSlice';
import MutedSlice from '../components/MainContent/ListContent/VideoContent/mutedSlice';
import VolumeSlice from '../components/MainContent/ListContent/VideoContent/volumeSlice';
import UserListMockSlice from '../firebase/UserListMockSlice';
import VideoListSlice from '../components/ProfileContent/VideoProfile/VideoListSlice';

const store = configureStore({
    reducer: {
        modalSign: ModalSignSlice.reducer,
        modalSetting: ModalSettingSlice.reducer,
        modalDiscard: ModalDiscardSlice.reducer,
        userLogin: UserLoginSlice.reducer,
        curRoomsList: RoomsSlice.reducer,
        userList: UserListSlice.reducer,
        userListMock: UserListMockSlice.reducer,
        choosedUser: ChoosedUserSlice.reducer,
        messagesOfRoom: MessagesOfRoomSlice.reducer,
        loading: LoadingSlice.reducer,
        selectedRoom: SelectedRoomSlice.reducer,
        muted: MutedSlice.reducer,
        volume: VolumeSlice.reducer,
        videoList: VideoListSlice.reducer,
    },
});

export default store;
