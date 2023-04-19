import Tippy from '@tippyjs/react/headless';
import 'animate.css';
import classNames from 'classnames/bind';
import { formatRelative } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../../components/ReusedComponent/Button';
import { deleteDocument, deleteFileStorage, handleFollowService, updateDocument } from '../../../../firebase/services';
import { UserListSelector, UserSelector, VideoListSelector } from '../../../../redux/selector';
import { ModalSign, SubnavWrapper, Wrapper } from '../../../ReusedComponent';
import ModalSignSlice from '../../../ReusedComponent/ModalSign/ModalSignSlice';
import style from './HeaderComment.module.scss';

const cx = classNames.bind(style);
const HeaderComment = ({ video, userVideo }) => {
    const MenuShare = [
        {
            icon: <i className="fa-brands fa-linkedin-in"></i>,
            title: 'Share to Linkedln',
        },
        {
            icon: <i className="fa-brands fa-reddit-alien"></i>,
            title: 'Share to Reddit',
        },
        {
            icon: <i className="fa-brands fa-telegram"></i>,
            title: 'Share to Telegram',
        },
        {
            icon: <i className="fa-solid fa-envelope"></i>,
            title: 'Share to Email',
        },
        {
            icon: <i className="fa-brands fa-line"></i>,
            title: 'Share to Line',
        },
        {
            icon: <i className="fa-brands fa-pinterest"></i>,
            title: 'Share to Pinterest',
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [heart, setHeart] = useState(false);
    const userLogin = useSelector(UserSelector);
    const videoList = useSelector(VideoListSelector);
    const userList = useSelector(UserListSelector);

    useEffect(() => {
        if (video.likes.includes(userLogin.uid)) setHeart(true);
        else setHeart(false);
    });

    //Count likes of userProfile
    const countLikeRef = useRef(0);
    useEffect(() => {
        let count = 0;
        videoList.map((val) => {
            if (val.uid === userVideo.uid) {
                count += val.likes.length;
            }
        });
        countLikeRef.current = count;
    });

    const handleHeartActive = () => {
        if (userLogin.login === true) {
            if (video.likes.includes(userLogin.uid)) {
                const newLikes = video.likes.filter((val) => val !== userLogin.uid);
                updateDocument('videoList', video.id, { likes: newLikes });

                const newUserLikes = userLogin.likes.filter((val) => val !== video.id);
                updateDocument('userList', userLogin.id, { ...userLogin, likes: newUserLikes });
                return;
            } else {
                updateDocument('videoList', video.id, { likes: [...video.likes, userLogin.uid] });

                updateDocument('userList', userLogin.id, {
                    ...userLogin,
                    likes: [...userLogin.likes, video.id],
                });
            }
        } else dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    const formatDate = (seconds) => {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            formattedDate = formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
    };

    const handleCopyHref = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Copied', {
            position: 'top-center',
            autoClose: 2000,
            theme: 'light',
            containerId: 'PuredToast',
        });
    };

    const handleDeleteVideo = () => {
        deleteFileStorage(video.videoURL);
        deleteFileStorage(video.thumbnail);
        deleteDocument('videoList', video.id);

        userList.map((user) => {
            if (user.likes.includes(video.id)) {
                const newLikes = user.likes.filter((val) => val !== video.id);
                updateDocument('userList', user.id, { ...user, likes: newLikes });
            }
        });

        navigate(`/profile/${userVideo.nickName}`);
    };

    return (
        <div className={cx('header-comment')}>
            <div className={cx('header-comment-avatar')}>
                <Tippy
                    delay={[500, 0]}
                    interactive
                    render={(attrs) => (
                        <SubnavWrapper className={cx('wrapper-tippy')}>
                            <div className={cx('header-tippy')}>
                                <Link to={`/profile/${userVideo.nickName}`} target="_blank">
                                    <img src={userVideo.photoURL} alt="avatar" />
                                </Link>
                                {userLogin.login === false ? (
                                    <Button
                                        outline
                                        medium
                                        onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}
                                    >
                                        Follow
                                    </Button>
                                ) : userLogin.followings.includes(userVideo.uid) ? (
                                    <Button basic medium onClick={() => handleFollowService(userLogin, userVideo)}>
                                        Following
                                    </Button>
                                ) : userLogin.uid === userVideo.uid ? (
                                    <></>
                                ) : (
                                    <Button outline medium onClick={() => handleFollowService(userLogin, userVideo)}>
                                        Follow
                                    </Button>
                                )}
                            </div>
                            <div className={cx('body-tippy')}>
                                <Link to={`/profile/${userVideo.nickName}`} target="_blank">
                                    <h4 className={cx('nickName')}>{userVideo.nickName}</h4>
                                    <p className={cx('displayName')}>{userVideo.displayName}</p>
                                </Link>
                                <p className={cx('follow')}>
                                    <strong>{userVideo.followers.length}</strong> Followers{' '}
                                    <strong>{countLikeRef.current}</strong> Likes
                                </p>
                            </div>
                            <div className={cx('bio')}>
                                <p>{userVideo.bio}</p>
                            </div>
                        </SubnavWrapper>
                    )}
                >
                    <Link to={`/profile/${userVideo.nickName}`}>
                        <div className={cx('infor')}>
                            <div className={cx('avatar')}>
                                <img src={userVideo.photoURL} alt="avatar" />
                            </div>
                            <div className={cx('wrapper-nickName')}>
                                <div className={cx('wrap')}>
                                    <span className={cx('nickName')}>{userVideo.nickName}</span>
                                    <span className={cx('tick')}>
                                        <i className={cx('fa-solid fa-circle-check', 'check')}></i>
                                    </span>
                                </div>
                                <div className={cx('wrap')}>
                                    <span className={cx('displayName')}>{userVideo.displayName}</span>
                                    <span> · </span>
                                    {video.createdAt ? (
                                        <span className={cx('createdAt')}>{formatDate(video.createdAt.seconds)}</span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </Tippy>
                {userLogin.login === false ? (
                    <Button outline medium onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}>
                        Follow
                    </Button>
                ) : userLogin.followings.includes(userVideo.uid) ? (
                    <Button basic medium onClick={() => handleFollowService(userLogin, userVideo)}>
                        Following
                    </Button>
                ) : userLogin.uid === userVideo.uid ? (
                    <Tippy
                        placement="bottom-end"
                        offset={[15, 10]}
                        interactive
                        render={(attrs) => (
                            <div className={cx('tippy-wrapper-privacy')}>
                                <p className={cx('privacy')}>Privacy settings</p>
                                <p onClick={handleDeleteVideo} className={cx('delete')}>
                                    Delete
                                </p>
                            </div>
                        )}
                    >
                        <i
                            style={{ fontSize: '20px', cursor: 'pointer', color: 'var(--text)' }}
                            className="fa-solid fa-ellipsis"
                        ></i>
                    </Tippy>
                ) : (
                    <Button outline medium onClick={() => handleFollowService(userLogin, userVideo)}>
                        Follow
                    </Button>
                )}
            </div>
            <div className={cx('title')}>{video.caption}</div>
            {/* <div className={cx('music')}>
                <i className="fa-solid fa-music"></i>
                nhạc nền - Đạt Villa
            </div> */}
            <div className={cx('like-share')}>
                <div className={cx('like-wrap')}>
                    <div onClick={handleHeartActive} className={cx('heart')}>
                        <i
                            className={cx('fa-solid fa-heart', {
                                'heart-active': heart && userLogin.login === true,
                                'animate__animated animate__bounceIn': heart && userLogin.login === true,
                            })}
                        ></i>
                    </div>
                    <span>{video.likes.length}</span>
                    <div className={cx('comment')}>
                        <i className="fa-solid fa-comment-dots"></i>
                    </div>
                    <span>{video.comments.length}</span>
                </div>
                <ul className={cx('share-wrap')}>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Embed</Wrapper>}>
                        <li className={cx('embed')}>
                            <i className="fa-solid fa-code"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Send to friends</Wrapper>}>
                        <li className={cx('send')}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Share to Facebook</Wrapper>}>
                        <li className={cx('facebook')}>
                            <i className="fa-brands fa-facebook"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Share to Whatsapp</Wrapper>}>
                        <li className={cx('whatsapp')}>
                            <i className="fa-brands fa-whatsapp"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Share to Twitter</Wrapper>}>
                        <li className={cx('twitter')}>
                            <i className="fa-brands fa-twitter"></i>
                        </li>
                    </Tippy>
                    <Tippy
                        delay={[0, 500]}
                        placement="bottom-end"
                        interactive
                        render={(attrs) => (
                            <div className={cx('menu-share')}>
                                {MenuShare.map((val, idx) => (
                                    <div key={idx}>
                                        {val.icon}
                                        <h4>{val.title}</h4>
                                    </div>
                                ))}
                            </div>
                        )}
                    >
                        <li style={{ marginRight: '0px' }} className={cx('share')}>
                            <i className="fa-solid fa-share"></i>
                        </li>
                    </Tippy>
                </ul>
            </div>
            <div className={cx('copy-link')}>
                <p className={cx('link')}>{window.location.href}</p>
                <button onClick={handleCopyHref} className={cx('button-copy')}>
                    Copy Link
                </button>
            </div>
            {createPortal(<ModalSign />, document.body)}
        </div>
    );
};

export default HeaderComment;
