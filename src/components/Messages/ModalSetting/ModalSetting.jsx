import classNames from 'classnames/bind';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalSettingSelector } from '../../../redux/selector';
import Button from '../../ReusedComponent/Button';
import Modal from '../../ReusedComponent/Modal/Modal';
import style from './ModalSetting.module.scss';
import ModalSettingSlice from './ModalSettingSlice';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const ModalSetting = () => {
    const { t } = useTranslation();
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
                    <h2>{t('message.MessageSetting')}</h2>
                    <div className={cx('escape')}>
                        <i className="fa-solid fa-xmark" onClick={handleEscape}></i>
                    </div>
                </div>
                <div className={cx('main')}>
                    <h4>{t('message.WhoCanSend')}</h4>
                    <p>{t('message.Explain')}</p>
                    <div className={cx('option')}>
                        <label>
                            <input type="radio" name="sendingOption" value="friends" />
                            <span className={cx('radio')}>
                                <span className={cx('circle')}></span>
                            </span>
                            <span className={cx('text')}>{t('message.Friends')}</span>
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="sendingOption" value="no-one" />
                            <span className={cx('radio')}>
                                <span className={cx('circle')}></span>
                            </span>
                            <span className={cx('text')}>{t('message.No one')}</span>
                        </label>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button className={cx('cancle')} basic medium onClick={handleEscape}>
                        {t('message.Cancel')}
                    </Button>
                    <Button className={cx('save')} primary medium>
                        {t('message.Save')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalSetting;
