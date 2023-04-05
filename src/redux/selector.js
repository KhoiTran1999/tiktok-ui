import { createSelector } from '@reduxjs/toolkit';

//ChatBox State
export const ModalSignSelector = (state) => state.modalSign;
export const ModalSettingSelector = (state) => state.modalSetting;
export const ModalDiscardSelector = (state) => state.modalDiscard;
export const ModalEditProfileSelector = (state) => state.modalEditProfile;
export const ModalWelcomeSelector = (state) => state.modalWelcome;
export const UserSelector = (state) => state.userLogin;
export const CurrentRoomsSelector = (state) => state.curRoomsList;
export const UserListSelector = (state) => state.userList;
export const UserListMockSelector = (state) => state.userListMock;
export const ChoosedUserSelector = (state) => state.choosedUser;
export const MessagesOfRoomSelector = (state) => state.messagesOfRoom;
export const LoadingSelector = (state) => state.loading;
export const SelectedRoomSelector = (state) => state.selectedRoom;
export const VideoListSelector = (state) => state.videoList;

export const AllUserListSelector = createSelector(UserListSelector, UserListMockSelector, (userList, userListMock) => {
    return [...userList, ...userListMock];
});

export const UserChatListSelector = createSelector(
    AllUserListSelector,
    UserSelector,
    CurrentRoomsSelector,
    (allUserList, user, curRoomsList) => {
        let tempt = [];
        let userChatID = [];
        curRoomsList.map((valRooms) => {
            tempt = valRooms.members.filter((uid) => {
                return uid !== user.uid;
            });
            userChatID = [...userChatID, ...tempt];
        });
        const userChatList = allUserList.filter((valUser) => {
            return userChatID.includes(valUser.uid);
        });
        return userChatList;
    },
);

//For you State
export const MutedSelector = (state) => state.muted;
export const VolumeSelector = (state) => state.volume;
