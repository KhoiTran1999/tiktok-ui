import classNames from 'classnames/bind';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleLogo from '../../../assets/icon/GoogleLogo';
import firebase, { auth } from '../../../firebase/config';
import { addDocument } from '../../../firebase/services';
import { ModalSignSelector } from '../../../redux/selector';
import { Button } from '../index';
import style from './ModalSign.module.scss';
import ModalSignSlice from './ModalSignSlice';
import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import generateKey from '../../../services/generaterKey';

const cx = classNames.bind(style);
const ggProvider = new firebase.auth.GoogleAuthProvider();

const ModalSign = () => {
    const dispatch = useDispatch();
    const isActiveLogin = useSelector(ModalSignSelector);

    const handleGoogleLogin = async () => {
        //Popup UI to sign up
        const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider);

        //Add infor if this user is new
        if (additionalUserInfo.isNewUser) {
            addDocument('userList', {
                displayName: user.displayName,
                nickName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerID: additionalUserInfo.providerId,
                keyword: generateKey(user.displayName), //For key word searching
                bio: '',
                tick: true,
                followings: [],
                followers: [],
                likes: [],
                websiteURL: user.email,
            });
        }
    };

    const handleEscape = () => dispatch(ModalSignSlice.actions.setModalSign(false));

    return (
        <Modal>
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
        </Modal>
    );
};

export default ModalSign;
