import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';
import { auth, db } from '../firebase/config';
import useFireStore from '../hooks/useFireStore';
import ModalSignSlice from '../components/DetailComponent/ModalSign/ModalSignSlice';
import UserLoginSlice from '../components/DetailComponent/ModalSign/UserLoginSlice';
import RoomsSlice from '../components/Messages/RoomsSlice';
import { UserSelector } from '../redux/selector';
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
    dispatch(UserListSlice.actions.setUserList(userList));

    //Get rooms from FireStore and set rooms
    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid,
        };
    }, [user.uid]);

    const rooms = useFireStore('rooms', roomsCondition);
    dispatch(RoomsSlice.actions.setRooms(rooms));

    //---------------------------------------------
    return <></>;
};

export default AuthUser;
