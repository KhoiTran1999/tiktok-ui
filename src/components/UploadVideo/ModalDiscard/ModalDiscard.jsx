import React from 'react';
import classNames from 'classnames/bind';
import style from './ModalDiscard.module.scss';
import Button from '../../ReusedComponent/Button';
import Modal from '../../ReusedComponent/Modal';
import { useDispatch, useSelector } from 'react-redux';
import ModalDiscardSlice from '../ModalDiscard/ModalDiscardSlice';
import { ModalDiscardSelector, UserSelector } from '../../../redux/selector';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const ModalDiscard = ({ setVideoLink, setThumbnailURL, setImgIdx, isSuccessedUpload, setIsSuccessedUpload }) => {
    const { t } = useTranslation();

    const userLogin = useSelector(UserSelector);
    const dispatch = useDispatch();
    const isModalDiscardPopup = useSelector(ModalDiscardSelector);

    const handleOnClick = () => {
        dispatch(ModalDiscardSlice.actions.setMadalDiscard(false));
        setVideoLink(null);
        setIsSuccessedUpload(false);
        setThumbnailURL('');
        setImgIdx(null);
    };
    return (
        <Modal>
            {isSuccessedUpload ? (
                <div
                    className={cx('modalDiscard', {
                        active: isModalDiscardPopup,
                    })}
                >
                    <h2>
                        {t('upload.Your videos are being')} <br />
                        {t('upload.uploaded to TikTok!')}
                    </h2>
                    <Button onClick={handleOnClick} primary large className={cx('discard')}>
                        {t('upload.Upload another Video')}
                    </Button>
                    <Link to={`/profile/${userLogin.nickName}`}>
                        <Button onClick={handleOnClick} basic large className={cx('editing')}>
                            {t('upload.ViewProfile')}
                        </Button>
                    </Link>
                </div>
            ) : (
                <div
                    className={cx('modalDiscard', {
                        active: isModalDiscardPopup,
                    })}
                >
                    <h2>{t('upload.DiscardThisPost')}</h2>
                    <p>{t('upload.The video and all edits will be discarded')}</p>
                    <Button onClick={handleOnClick} primary large className={cx('discard')}>
                        {t('upload.Discard')}
                    </Button>
                    <Button
                        onClick={() => dispatch(ModalDiscardSlice.actions.setMadalDiscard(false))}
                        basic
                        large
                        className={cx('editing')}
                    >
                        {t('upload.Continue')}
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default ModalDiscard;
