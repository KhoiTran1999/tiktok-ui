import classNames from 'classnames/bind';
import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoSetting from '../../assets/icon/LogoSetting';
import routes from '../../config/routes';
import { ChoosedUserSelector } from '../../redux/selector';
import ChatAccountList from './ChatAccountList/ChatAccountList';
import ChatBox from './ChatBox/ChatBox';
import style from './Messages.module.scss';
import ModalSetting from './ModalSetting/ModalSetting';
import ModalSettingSlice from './ModalSetting/ModalSettingSlice';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const Messages = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const choosedUser = useSelector(ChoosedUserSelector);

    const handleSetting = () => {
        dispatch(ModalSettingSlice.actions.setModalSetting(true));
    };

    return (
        <div className={cx('MessagesContainer')}>
            <div className={cx('conversationContainer')}>
                <div className={cx('conversationWrapper')}>
                    <div className={cx('headerCoversation')}>
                        <h1>{t('message.messageTitle')}</h1>
                        <div className={cx('LogoSetting')} onClick={handleSetting}>
                            <LogoSetting />
                        </div>
                    </div>
                    <div className={cx('listConversation')}>
                        <ChatAccountList />
                    </div>
                </div>
            </div>
            <div className={cx('chatBoxContainer')}>
                <div className={cx('chatBoxWrapper')}>
                    {choosedUser ? (
                        <ChatBox />
                    ) : (
                        <div
                            style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <i style={{ fontSize: '90px', color: '#c5c5c5' }} className="fa-solid fa-comment-dots"></i>
                        </div>
                    )}
                </div>
            </div>
            <Link to={routes.home}>
                <div className={cx('backButton')} onClick={() => (document.title = 'TikTok - Make Your Day')}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
            </Link>
            {createPortal(<ModalSetting />, document.body)}
        </div>
    );
};

export default Messages;
