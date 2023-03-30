import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { ModalDiscardSelector, ModalSettingSelector, ModalSignSelector } from '../../../redux/selector';
import style from './Modal.module.scss';

const cx = classNames.bind(style);

const Modal = ({ children }) => {
    const isSettingPopup = useSelector(ModalSettingSelector);
    const isModalSignPopup = useSelector(ModalSignSelector);
    const isModalDiscardPopup = useSelector(ModalDiscardSelector);

    return (
        <div
            className={cx('wrapper', {
                active: isSettingPopup || isModalSignPopup || isModalDiscardPopup,
            })}
        >
            {children}
        </div>
    );
};

export default Modal;
