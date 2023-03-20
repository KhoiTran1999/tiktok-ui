import { createSelector } from '@reduxjs/toolkit';

export const ModalSignSelector = (state) => state.modalSign;
export const ModalSettingSelector = (state) => state.modalSetting;
export const UserSelector = (state) => state.userLogin;
export const RoomsSelector = (state) => state.rooms;
export const UserListSelector = (state) => state.userList;
export const ChoosedUserSelector = (state) => state.choosedUser;

export const UserChatListSelector = createSelector(
    UserListSelector,
    UserSelector,
    RoomsSelector,
    (userList, user, rooms) => {
        let tempt = [];
        let userChatID = [];
        rooms.map((valRooms) => {
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
