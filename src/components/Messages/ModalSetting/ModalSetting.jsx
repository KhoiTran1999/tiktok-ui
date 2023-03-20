import classNames from 'classnames/bind';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalSettingSelector } from '../../../redux/selector';
import Button from '../../DetailComponent/Button';
import Modal from '../../DetailComponent/Modal/Modal';
import style from './ModalSetting.module.scss';
import ModalSettingSlice from './ModalSettingSlice';

const cx = classNames.bind(style);
const ModalSetting = () => {
    const dispatch = useDispatch();
    const isSettingPopup = useSelector(ModalSettingSelector);

    const handleEscape = () => {
        dispatch(ModalSettingSlice.actions.setModalSetting(false));
    };
    return (
        <Modal>
            <div
                className={cx('wrapper', {
                    active: isSettingPopup,
                })}
            >
                <div className={cx('header')}>
                    <h2>Message settings</h2>
                    <div className={cx('escape')}>
                        <i className="fa-solid fa-xmark" onClick={handleEscape}></i>
                    </div>
                </div>
                <div className={cx('main')}>
                    <h4>Who can send you direct messages</h4>
                    <p>
                        With any option, you can receive messages from users that you've sent messages to. Friends are
                        your followers that you follow back.
                    </p>
                    <div className={cx('option')}>
                        <label>
                            <input type="radio" name="sendingOption" value="friends" />
                            <span className={cx('radio')}>
                                <span className={cx('circle')}></span>
                            </span>
                            <span className={cx('text')}>Friends</span>
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="sendingOption" value="no-one" />
                            <span className={cx('radio')}>
                                <span className={cx('circle')}></span>
                            </span>
                            <span className={cx('text')}>No one</span>
                        </label>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('cancle')} basic medium onClick={handleEscape}>
                        Cancel
                    </Button>
                    <Button className={cx('save')} primary medium>
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalSetting;
