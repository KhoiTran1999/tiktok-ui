import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React from 'react';
import 'animate.css';
import { formatRelative } from 'date-fns';
import Button from '../../../../components/ReusedComponent/Button';
import { SubnavWrapper, Wrapper } from '../../../ReusedComponent';
import style from './HeaderComment.module.scss';
import { updataDocument } from '../../../../firebase/services';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalSignSlice from '../../../ReusedComponent/ModalSign/ModalSignSlice';
import { UserSelector } from '../../../../redux/selector';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
const HeaderComment = ({ video, user }) => {
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

    const [heart, setHeart] = useState(false);
    const userLogin = useSelector(UserSelector);

    useEffect(() => {
        if (video.likes.includes(userLogin.uid)) setHeart(true);
        else setHeart(false);
    }, [video.likes]);

    const handleHeartActive = () => {
        if (userLogin.login === true) {
            if (video.likes.includes(userLogin.uid)) {
                setHeart(false);
                const newLikes = video.likes.filter((val) => val !== userLogin.uid);
                updataDocument('videoList', video.id, { likes: newLikes });
                return;
            } else {
                setHeart(true);
                updataDocument('videoList', video.id, { likes: [...video.likes, userLogin.uid] });
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
        alert('Copied');
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
                                <Link to={`/profile/${user.nickName}`} target="_blank">
                                    <img src={user.photoURL} alt="avatar" />
                                </Link>
                                <Button outline medium>
                                    Follow
                                </Button>
                            </div>
                            <div className={cx('body-tippy')}>
                                <Link to={`/profile/${user.nickName}`} target="_blank">
                                    <h4 className={cx('nickName')}>{user.nickName}</h4>
                                    <p className={cx('displayName')}>{user.displayName}</p>
                                </Link>
                                <p className={cx('follow')}>
                                    <strong>{user.followersCount}</strong> Followers <strong>{user.likesCount}</strong>{' '}
                                    Likes
                                </p>
                            </div>
                            <div className={cx('bio')}>
                                <p>{user.bio}</p>
                            </div>
                        </SubnavWrapper>
                    )}
                >
                    <Link to={`/profile/${user.nickName}`}>
                        <div className={cx('infor')}>
                            <div className={cx('avatar')}>
                                <img src={user.photoURL} alt="avatar" />
                            </div>
                            <div className={cx('wrapper-nickName')}>
                                <div className={cx('wrap')}>
                                    <span className={cx('nickName')}>{user.nickName}</span>
                                    <span className={cx('tick')}>
                                        <i className={cx('fa-solid fa-circle-check', 'check')}></i>
                                    </span>
                                </div>
                                <div className={cx('wrap')}>
                                    <span className={cx('displayName')}>{user.displayName}</span>
                                    <span> · </span>
                                    <span className={cx('createdAt')}>{formatDate(video.createdAt.seconds)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Tippy>

                <Button outline medium>
                    Follow
                </Button>
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
                        placement="bottom"
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
        </div>
    );
};

export default HeaderComment;
