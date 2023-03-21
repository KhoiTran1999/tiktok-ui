import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';
import MessagesSlice from '../components/Messages/ChatBox/BodyChatBox/messagesSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import routes from '../config/routes';
import { auth } from '../firebase/config';
import useFireStore from '../hooks/useFireStore';
import { ChoosedUserSelector, ClickedRoomSelector, UserSelector } from '../redux/selector';
import UserListSlice from './UserListSlice';

const AuthUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(UserSelector);

    //Get user from Auth Firebase after login
    useEffect(() => {
        const unscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                dispatch(UserLoginSlice.actions.setUser({ displayName, email, uid, photoURL, login: true }));
                dispatch(ModalSignSlice.actions.setModalSign(false));
            } else {
                dispatch(UserLoginSlice.actions.setUser({ login: false }));
                navigate(routes.home);
            }
        });
        return () => {
            unscribe();
        };
    }, []);

    //Get userList from FireStore and set it
    const userList = useFireStore('userList');
    useEffect(() => {
        dispatch(UserListSlice.actions.setUserList(userList));
    }, [userList]);

    //Get rooms from FireStore and set rooms
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid,
        };
    }, [user.uid]);

    const CurRoomsList = useFireStore('rooms', roomsCondition);
    useEffect(() => {
        dispatch(RoomsSlice.actions.setCurRooms(CurRoomsList));
    }, [CurRoomsList]);

    //---------------------------------------------
    return <></>;
};

export default AuthUser;
