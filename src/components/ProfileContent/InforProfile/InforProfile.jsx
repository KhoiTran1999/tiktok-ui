import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, ImageCustom } from '../../ReusedComponent';
import ChoosedUserSlice from '../../Messages/ChatAccountList/AccountItem/choosedUserSlice';
import style from './InforProfile.module.scss';
import { CurrentRoomsSelector, UserSelector } from '../../../redux/selector';
import ModalSignSlice from '../../ReusedComponent/ModalSign/ModalSignSlice';
import ModalEditProfileSlice from '../ModalEditProfile/ModalEditProfileSlice';
import { addDocument, updateDocument } from '../../../firebase/services';
import routes from '../../../config/routes';

const cx = classNames.bind(style);
const InforProfile = ({ allUserList }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const linkName = useParams();

    const userLogin = useSelector(UserSelector);
    const [user, setUser] = useState({ followings: [], followers: [], likes: [] });
    const curRoomList = useSelector(CurrentRoomsSelector);

    useEffect(() => {
        allUserList.map((val) => {
            if (val.nickName === linkName.userName) {
                setUser(val);
            }
        });
    });

    const handleFollow = () => {
        if (userLogin.followers.includes(user.uid)) {
            const newFollowers = user.followers.filter((val) => val !== user.uid);
            updateDocument('userList', userLogin.id, {
                ...userLogin,
                followers: newFollowers,
            });
        } else {
            updateDocument('userList', userLogin.id, {
                ...userLogin,
                followers: [...userLogin.followers, user.uid],
            });
        }
    };

    const sendMessage = () => {
        const existingRoom = curRoomList.filter((valRoom) => {
            return valRoom.members.includes(userLogin.uid) && valRoom.members.includes(user.uid);
        });

        if (existingRoom.length === 0) {
            addDocument('rooms', {
                members: [userLogin.uid, user.uid],
            });
        }
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
                            Follow
                        </Button>
                    ) : userLogin.followers.includes(user.uid) ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                style={{ width: '164px', height: '36px', fontWeight: '700' }}
                                outline
                                small
                                onClick={sendMessage}
                            >
                                Messages
                            </Button>
                            <div onClick={handleFollow} className={cx('unfollow')}>
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
                            Edit profile
                        </Button>
                    ) : (
                        <Button onClick={handleFollow} primary large>
                            Follow
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('footer-infor')}>
                <p className={cx('status')}>
                    <b>{user.followings.length}</b> Followings <b>{user.followers.length}</b> Followers{' '}
                    <b>{user.likes.length}</b> Likes
                </p>
                <p className={cx('bio')}>{user.bio}</p>
                <div className={cx('websiteURL')}>
                    <i className="fa-solid fa-link"></i>
                    <a href={user.websiteURL} target="_blank">
                        {user.websiteURL}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InforProfile;
