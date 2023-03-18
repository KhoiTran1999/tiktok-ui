import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../../../assets/icon/GoogleLogo';
import routes from '../../../config/routes';
import firebase, { auth } from '../../../firebase/config';
import { ModalSelector } from '../../../redux/selector';
import { Button } from '../index';
import style from './ModalSign.module.scss';
import ModalSignSlice from './ModalSignSlice';
import UserLoginSlice from './UserLoginSlice';

const cx = classNames.bind(style);
const ggProvider = new firebase.auth.GoogleAuthProvider();

const ModalSign = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActiveLogin = useSelector(ModalSelector);

    const handleGoogleLogin = async () => {
        await auth.signInWithPopup(ggProvider);
    };

    useEffect(() => {
        const unscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                dispatch(UserLoginSlice.actions.setUser({ displayName, email, uid, photoURL, login: true }));
                dispatch(ModalSignSlice.actions.setModalSign(false));
                navigate(routes.home);
            } else {
                dispatch(UserLoginSlice.actions.setUser({ login: false }));
            }
        });
        return () => {
            unscribe();
        };
    }, []);

    const handleEscape = () => dispatch(ModalSignSlice.actions.setModalSign(false));

    return (
        <div
            className={cx('wrapper', {
                active: isActiveLogin,
            })}
        >
            <div
                className={cx('modal-sign', {
                    active: isActiveLogin,
                })}
            >
                <div className={cx('escape')} onClick={handleEscape}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={cx('wrap-content')}>
                    <h2>Get more of what you love when you log in to TikTok</h2>
                    <ul>
                        <li onClick={handleGoogleLogin}>
                            <Button basic large>
                                <GoogleLogo className={cx('google')} />
                                Continue with Google
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={cx('sign-up')}>
                    <span>Don’t have an account?</span>
                    <a href="">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default ModalSign;
