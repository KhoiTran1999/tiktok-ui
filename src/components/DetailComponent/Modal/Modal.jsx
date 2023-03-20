import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { ModalSettingSelector, ModalSignSelector } from '../../../redux/selector';
import style from './Modal.module.scss';

const cx = classNames.bind(style);

const Modal = ({ children }) => {
    const isSettingPopup = useSelector(ModalSettingSelector);
    const isModalSignPopup = useSelector(ModalSignSelector);

    return (
        <div
            className={cx('wrapper', {
                active: isSettingPopup || isModalSignPopup,
            })}
        >
            {children}
        </div>
    );
};

export default Modal;
