import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleFollowService, updateDocument } from '../../../../firebase/services';
import { UserSelector } from '../../../../redux/selector';
import { Button } from '../../../ReusedComponent';
import ModalSignSlice from '../../../ReusedComponent/ModalSign/ModalSignSlice';
import style from './HeaderContainer.module.scss';

const cx = classNames.bind(style);
const HeaderContainer = ({ userVideo, video }) => {
    const [seeMore, setSeeMore] = useState(false);
    const captionRef = useRef({});

    const dispatch = useDispatch();
    const user = useSelector(UserSelector);

    const handleMore = () => {
        captionRef.current.style.WebkitLineClamp = '7';
        captionRef.current.style.overflowY = 'auto';
        setSeeMore(true);
    };

    const handleLess = () => {
        captionRef.current.style.WebkitLineClamp = '4';
        captionRef.current.style.overflowY = 'hidden';
        setSeeMore(false);
    };
    return (
        <div className={cx('header-container')}>
            <div className={cx('info-container')}>
                <Link to={`/profile/${userVideo.nickName}`}>
                    <span className={cx('wrap')} onClick={() => (document.title = `${userVideo.displayName} | TikTok`)}>
                        <span className={cx('nickname')}>{userVideo.nickName}</span>
                        {userVideo.tick ? (
                            <i
                                style={{ fontSize: '14px', color: 'rgb(32, 213, 236)', margin: '0 5px' }}
                                className="fa-solid fa-circle-check"
                            ></i>
                        ) : (
                            <></>
                        )}
                        <span className={cx('name')}>{userVideo.displayName}</span>
                    </span>
                </Link>
                <p ref={captionRef} className={cx('caption')}>
                    {video.caption} {/* <b className={cx('hash-tag')}>#story #tamtrang # duongthaithuyy</b> */}
                </p>
                {captionRef.current.clientHeight > 85 ? (
                    <>
                        {seeMore ? (
                            <span onClick={handleLess} style={{ color: 'black', fontWeight: '700', cursor: 'pointer' }}>
                                less
                            </span>
                        ) : (
                            <span onClick={handleMore} style={{ color: 'black', fontWeight: '700', cursor: 'pointer' }}>
                                more
                            </span>
                        )}
                    </>
                ) : (
                    <></>
                )}

                <span className={cx('music')}>
                    {/* <i className="fa-solid fa-music"></i> Flop nhất link nhạc - Hayato_shiro */}
                </span>
            </div>

            {user.login === false ? (
                <Button outline small onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}>
                    Follow
                </Button>
            ) : user.followings.includes(video.uid) ? (
                <Button
                    style={{ padding: '4px 16px' }}
                    basic
                    small
                    onClick={() => handleFollowService(user, userVideo)}
                >
                    Following
                </Button>
            ) : user.uid !== video.uid ? (
                <Button outline small onClick={() => handleFollowService(user, userVideo)}>
                    Follow
                </Button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default HeaderContainer;
