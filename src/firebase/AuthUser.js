import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalSignSlice from '../components/ReusedComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/ReusedComponent/ModalSign/UserLoginSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import { auth } from '../firebase/config';
import useFireStore from '../hooks/useFireStore';
import { UserListSelector, UserSelector } from '../redux/selector';
import { getUserList } from '../services/ApiService';
import UserListSlice from './UserListSlice';
import UserListMockSlice from './UserListMockSlice';
import VideoListSlice from '../components/ProfileContent/VideoProfile/VideoListSlice';
import ModalWelcomeSlice from '../components/Header/ModalWelcome/ModalWelcome.Slice';

const AuthUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(UserSelector);
    const userList = useSelector(UserListSelector);
    //Get user from Auth Firebase after login
    useEffect(() => {
        const unscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid } = user;
                userList.map((val) => {
                    if (val.uid === uid) {
                        if (val.nickName === '') dispatch(ModalWelcomeSlice.actions.setModalWelcome(true));
                        dispatch(UserLoginSlice.actions.setUser({ ...val, login: true }));
                    }
                });

                dispatch(ModalSignSlice.actions.setModalSign(false));
            } else {
                dispatch(UserLoginSlice.actions.setUser({ login: false }));
            }
        });
        return () => {
            unscribe();
        };
    }, [userList]);

    //Get userList from FireStore and set it
    const userListFireStore = useFireStore('userList');
    useEffect(() => {
        dispatch(UserListSlice.actions.setUserList(userListFireStore));
    }, [userListFireStore]);

    //Get userList from MockAPI
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserList();
                if (data.data.length > 0) {
                    dispatch(UserListMockSlice.actions.setUserListMock(data.data));
                }
            } catch (error) {
                alert('Error when call Get UserList API');
                window.location.reload();
            }
        };
        fetchData();
    }, []);

    //Get rooms from FireStore and set rooms
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: userLogin.uid,
        };
    }, [userLogin.uid]);

    const CurRoomsList = useFireStore('rooms', roomsCondition);
    useEffect(() => {
        dispatch(RoomsSlice.actions.setCurRooms(CurRoomsList));
    }, [CurRoomsList]);

    //Get videoList from FireStore and set videoList to Redux
    const videoListFireStore = useFireStore('videoList', '', 'createdAt', 'desc');
    useEffect(() => {
        dispatch(VideoListSlice.actions.setVideoList(videoListFireStore));
    }, [videoListFireStore]);
    //---------------------------------------------
    return <></>;
};

export default AuthUser;
