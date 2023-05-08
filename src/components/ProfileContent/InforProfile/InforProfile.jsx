import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, ImageCustom } from '../../ReusedComponent';
import ChoosedUserSlice from '../../Messages/ChatAccountList/AccountItem/choosedUserSlice';
import style from './InforProfile.module.scss';
import { CurrentRoomsSelector, UserSelector, VideoListSelector } from '../../../redux/selector';
import ModalSignSlice from '../../ReusedComponent/ModalSign/ModalSignSlice';
import ModalEditProfileSlice from '../ModalEditProfile/ModalEditProfileSlice';
import { addDocument, handleFollowService, updateDocument } from '../../../firebase/services';
import routes from '../../../config/routes';
import DarkModeSlice from '../../Header/RightHeader/DarkModeSlice';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const InforProfile = ({ allUserList }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const linkName = useParams();

    const [user, setUser] = useState({
        login: false,
        displayName: '',
        nickName: '',
        email: '',
        photoURL: '',
        uid: '',
        providerID: '',
        keyword: '', //For key word searching
        bio: '',
        tick: false,
        followings: [],
        followers: [],
        likes: [],
        websiteURL: '',
    });

    const userLogin = useSelector(UserSelector);
    const videoList = useSelector(VideoListSelector);
    const curRoomList = useSelector(CurrentRoomsSelector);

    useEffect(() => {
        allUserList.map((val) => {
            if (val.nickName === linkName.userName) {
                setUser(val);
            }
        });
    });

    //Count likes of userProfile
    const countLikeRef = useRef(0);
    useEffect(() => {
        let count = 0;
        videoList.map((val) => {
            if (val.uid === user.uid) {
                count += val.likes.length;
            }
        });
        countLikeRef.current = count;
    });

    const sendMessage = () => {
        const existingRoom = curRoomList.filter((valRoom) => {
            return valRoom.members.includes(userLogin.uid) && valRoom.members.includes(user.uid);
        });

        if (existingRoom.length === 0) {
            addDocument('rooms', {
                members: [userLogin.uid, user.uid],
            });
        }
        document.title = `Messages | TikTok`;
        navigate(routes.messages);
    };

    const handleEditProfile = () => {
        dispatch(ModalEditProfileSlice.actions.setModalEditProfile(true));
    };

    return (
        <div className={cx('infor')}>
            <div className={cx('header-infor')}>
                <div className={cx('avatar')}>
                    <img src={user.photoURL} />
                </div>
                <div className={cx('left-headerInfor')}>
                    <div className={cx('wrapper')}>
                        <h2 className={cx('nickName')}>{user.nickName}</h2>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h1 className={cx('displayName')}>{user.displayName}</h1>
                    {userLogin.login === false ? (
                        <Button primary large onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}>
                            {t('followStatus.Follow')}
                        </Button>
                    ) : userLogin.followings.includes(user.uid) ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                style={{ width: '164px', height: '36px', fontWeight: '700' }}
                                outline
                                small
                                onClick={sendMessage}
                            >
                                {t('message.messageTitle')}
                            </Button>
                            <div onClick={() => handleFollowService(userLogin, user)} className={cx('unfollow')}>
                                <i className="fa-solid fa-user-check"></i>
                            </div>
                        </div>
                    ) : userLogin.uid === user.uid ? (
                        <Button
                            onClick={handleEditProfile}
                            style={{ width: '141px', height: '36px', fontWeight: '600' }}
                            basic
                            medium
                        >
                            <i style={{ marginRight: '7px' }} className="fa-regular fa-pen-to-square"></i>
                            {t('followStatus.EditProfile')}
                        </Button>
                    ) : (
                        <Button onClick={() => handleFollowService(userLogin, user)} primary large>
                            {t('followStatus.Follow')}
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('footer-infor')}>
                <p className={cx('status')}>
                    <b>{user.followings.length}</b>
                    {t('account.Followings')}
                    <b>{user.followers.length}</b>
                    {t('account.Followers')}
                    <b>{countLikeRef.current}</b>
                    {t('account.Likes')}
                </p>
                <p className={cx('bio')}>{user.bio}</p>
                <div className={cx('websiteURL')}>
                    <i className="fa-solid fa-link"></i>
                    <a target="_blank">{user.websiteURL}</a>
                </div>
            </div>
        </div>
    );
};

export default InforProfile;
