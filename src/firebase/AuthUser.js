import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import { auth } from '../firebase/config';
import useFireStore from '../hooks/useFireStore';
import { UserSelector } from '../redux/selector';
import { getUserList } from '../services/ApiService';
import UserListSlice from './UserListSlice';
import UserListMockSlice from './UserListMockSlice';

const AuthUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(UserSelector);

    //Get user from Auth Firebase after login
    useEffect(() => {
        const unscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                dispatch(UserLoginSlice.actions.setUser({ displayName, email, uid, photoURL, login: true }));
                dispatch(ModalSignSlice.actions.setModalSign(false));
            } else {
                dispatch(UserLoginSlice.actions.setUser({ login: false }));
                // navigate(routes.home);
            }
        });
        return () => {
            unscribe();
        };
    }, []);

    //Get userList from FireStore and set it
    const userListFireStore = useFireStore('userList');
    useEffect(() => {
        dispatch(UserListSlice.actions.setUserList(userListFireStore));
    }, [userListFireStore]);

    //Get userList from MockAPI
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserList();
            if (data.data.length > 0) {
                dispatch(UserListMockSlice.actions.setUserListMock(data.data));
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

    //---------------------------------------------
    return <></>;
};

export default AuthUser;
