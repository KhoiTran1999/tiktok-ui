import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import ImageCustom from '../../ReusedComponent/ImageCustom';
import style from './TippyAccountItem.module.scss';
import SubnavWrapper from '../../ReusedComponent/SubnavWrapper';
import Button from '../../ReusedComponent/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector, VideoListSelector } from '../../../redux/selector';
import ModalSignSlice from '../../ReusedComponent/ModalSign/ModalSignSlice';
import { updateDocument } from '../../../firebase/services';
import { useRef } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(style);
const AccountItem = ({ accountUser }) => {
    const dispatch = useDispatch();
    const user = useSelector(UserSelector);
    const videoList = useSelector(VideoListSelector);

    //Count likes of userProfile
    const countLikeRef = useRef(0);
    useEffect(() => {
        let count = 0;
        videoList.map((val) => {
            if (val.uid === accountUser.uid) {
                count += val.likes.length;
            }
        });
        countLikeRef.current = count;
    });

    const handleFollow = () => {
        if (user.followings.includes(accountUser.uid)) {
            //remove uid into followings of userLogin
            const newFollowings = user.followings.filter((val) => val !== accountUser.uid);
            updateDocument('userList', user.id, {
                ...user,
                followings: newFollowings,
            });

            //remove uid into followers of Guest
            const newFollowers = accountUser.followers.filter((val) => val !== user.uid);
            updateDocument('userList', accountUser.id, {
                ...accountUser,
                followers: newFollowers,
            });
        } else {
            //add uid into followings of userLogin
            updateDocument('userList', user.id, {
                ...user,
                followings: [...user.followings, accountUser.uid],
            });

            //add uid into followers of Guest
            updateDocument('userList', accountUser.id, {
                ...accountUser,
                followers: [...accountUser.followers, user.uid],
            });
        }
    };
    return (
        <li>
            <Tippy
                delay={[700, 0]}
                offset={[0, 0]}
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <SubnavWrapper scrollAction="visible">
                        <div className={cx('wrapper')}>
                            <div className={cx('header')}>
                                <img src={accountUser.photoURL} alt="avatar" />
                                {user.login === false ? (
                                    <Button
                                        outline
                                        small
                                        onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}
                                    >
                                        Follow
                                    </Button>
                                ) : user.followings.includes(accountUser.uid) ? (
                                    <Button style={{ padding: '7px 16px' }} basic small onClick={handleFollow}>
                                        Following
                                    </Button>
                                ) : user.uid !== accountUser.uid ? (
                                    <Button outline small onClick={handleFollow}>
                                        Follow
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('wrap')}>
                                    <h4>{accountUser.nickName}</h4>
                                    {accountUser.tick && <i className={cx('fa-solid fa-circle-check', 'check')}></i>}
                                </div>
                                <p className={cx('name')}>{accountUser.displayName}</p>
                                <p className={cx('status')}>
                                    <b>{accountUser.followings.length}</b> followings <b> {countLikeRef.current}</b>{' '}
                                    Likes
                                </p>
                            </div>
                        </div>
                    </SubnavWrapper>
                )}
            >
                <Link to={`/profile/${accountUser.nickName}`}>
                    <div
                        className={cx('avatar', {
                            skeletonLoading: user.login === null,
                        })}
                    >
                        <ImageCustom src={accountUser.photoURL} alt="avatar" />
                    </div>
                    <div className={cx('information')}>
                        <div className={cx('wrap')}>
                            <div
                                className={cx('nickname', {
                                    skeletonLoading: user.login === null,
                                })}
                            >
                                {accountUser.nickName}
                            </div>
                            {accountUser.tick && <i className={cx('fa-solid fa-circle-check', 'check')}></i>}
                        </div>
                        <div
                            className={cx('name', {
                                skeletonLoading: user.login === null,
                            })}
                        >
                            {accountUser.displayName}
                        </div>
                    </div>
                </Link>
            </Tippy>
        </li>
    );
};

export default AccountItem;
