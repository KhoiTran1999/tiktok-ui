import { createSelector } from '@reduxjs/toolkit';

export const ModalSignSelector = (state) => state.modalSign;
export const ModalSettingSelector = (state) => state.modalSetting;
export const UserSelector = (state) => state.userLogin;
export const CurrentRoomsSelector = (state) => state.curRoomsList;
export const UserListSelector = (state) => state.userList;
export const ChoosedUserSelector = (state) => state.choosedUser;
export const MessagesSelector = (state) => state.messages;
export const LoadingSelector = (state) => state.loading;

export const UserChatListSelector = createSelector(
    UserListSelector,
    UserSelector,
    CurrentRoomsSelector,
    (userList, user, curRoomsList) => {
        let tempt = [];
        let userChatID = [];
        curRoomsList.map((valRooms) => {
            tempt = valRooms.members.filter((uid) => {
                return uid !== user.uid;
            });
            userChatID = [...userChatID, ...tempt];
        });
        const userChatList = userList.filter((valUser) => {
            return userChatID.includes(valUser.uid);
        });
        return userChatList;
    },
);

export const ClickedRoomSelector = createSelector(
    CurrentRoomsSelector,
    UserSelector,
    ChoosedUserSelector,
    (curRoomsList, userLogin, choosedUser) => {
        const clickedRoom = curRoomsList.filter((room) => {
            return room.members.includes(userLogin.uid) && room.members.includes(choosedUser.uid);
        });
        return clickedRoom[0];
    },
);
