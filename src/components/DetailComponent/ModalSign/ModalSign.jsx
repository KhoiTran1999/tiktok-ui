import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalSign.module.scss';
import { Button } from '../index';
import firebase, { auth } from '../../../firebase/config';
import routes from '../../../config/routes';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../../../assets/icon/GoogleLogo';

const cx = classNames.bind(style);
const ggProvider = new firebase.auth.GoogleAuthProvider();

const ModalSign = ({ isActiveLogin, setIsActiveLogin }) => {
    const navigate = useNavigate();

    const handleEscape = () => {
        setIsActiveLogin(false);
    };

    const handleGoogleLogin = () => {
        auth.signInWithPopup(ggProvider);
    };

    useEffect(() => {
        const AuthCancle = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(routes.home);
            }
        });
        return () => {
            AuthCancle();
        };
    }, []);

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
