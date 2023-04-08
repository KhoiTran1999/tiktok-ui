import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    ModalDiscardSelector,
    ModalEditProfileSelector,
    ModalSettingSelector,
    ModalSignSelector,
    ModalWelcomeSelector,
} from '../../../redux/selector';
import style from './Modal.module.scss';

const cx = classNames.bind(style);

const Modal = ({ children, overflow }) => {
    const isSettingPopup = useSelector(ModalSettingSelector);
    const isModalSignPopup = useSelector(ModalSignSelector);
    const isModalDiscardPopup = useSelector(ModalDiscardSelector);
    const isModalEditProfile = useSelector(ModalEditProfileSelector);
    const isModalWelcome = useSelector(ModalWelcomeSelector);

    return (
        <div
            style={{ overflow: overflow }}
            className={cx('wrapper', {
                active:
                    isSettingPopup || isModalSignPopup || isModalDiscardPopup || isModalEditProfile || isModalWelcome,
            })}
        >
            {children}
        </div>
    );
};

export default Modal;
