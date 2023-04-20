import Tippy from '@tippyjs/react/headless';
import 'animate.css';
import classNames from 'classnames/bind';
import { formatDistance } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleFollowService, updateDocument } from '../../../../../firebase/services';
import { UserListSelector, UserSelector, VideoListSelector } from '../../../../../redux/selector';
import { Button, ModalSign, SubnavWrapper } from '../../../../ReusedComponent';
import ModalSignSlice from '../../../../ReusedComponent/ModalSign/ModalSignSlice';
import style from './Commenter.module.scss';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const Commenter = ({ comment, video, inputValue, setInputValue, listMention, setListMention, textAreaRef }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [heart, setHeart] = useState(false);
    const [userComment, setUserComment] = useState({ followers: [] });

    const userLogin = useSelector(UserSelector);
    const userList = useSelector(UserListSelector);
    const videoList = useSelector(VideoListSelector);

    useEffect(() => {
        userList.map((val) => {
            if (comment.uid === val.uid) setUserComment(val);
        });
    });

    //Count likes of userProfile
    const countLikeRef = useRef(0);
    useEffect(() => {
        let count = 0;
        videoList.map((val) => {
            if (val.uid === userComment.uid) {
                count += val.likes.length;
            }
        });
        countLikeRef.current = count;
    });

    const formatDate = (seconds) => {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatDistance(new Date(seconds * 1000), new Date());
        }
        return formattedDate;
    };

    const handleHeartActive = () => {
        if (userLogin.login === true) {
            if (comment.likes.includes(userLogin.uid)) {
                const newComments = video.comments.map((valComment) => {
                    if (valComment.id === comment.id) {
                        const newLikes = valComment.likes.filter((val) => {
                            return val !== userLogin.uid;
                        });
                        const newComments = { ...valComment, likes: newLikes };
                        return newComments;
                    } else return valComment;
                });
                updateDocument('videoList', video.id, {
                    ...video,
                    comments: newComments,
                });
            } else {
                const newComments = video.comments.map((valComment) => {
                    if (valComment.id === comment.id) {
                        const newLikes = [...valComment.likes, userLogin.uid];
                        const newcomments = { ...valComment, likes: newLikes };
                        return newcomments;
                    } else return valComment;
                });
                updateDocument('videoList', video.id, {
                    ...video,
                    comments: newComments,
                });
            }
        } else dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    useEffect(() => {
        if (comment.likes.includes(userLogin.uid)) setHeart(true);
        else setHeart(false);
    });

    const handleReply = () => {
        if (userLogin.login === false) {
            dispatch(ModalSignSlice.actions.setModalSign(true));
            return;
        }
        if (!inputValue.includes(`"${userComment.nickName}"`) && userComment.uid !== userLogin.uid) {
            setListMention([...listMention, userComment]);
            setInputValue(inputValue + ` "${userComment.nickName}" `);
            textAreaRef.current.focus();
        } else if (!inputValue.includes(`"${userComment.nickName}"`) && userComment.uid === userLogin.uid) {
            toast.warning('Can not reply yourself', {
                toastId: comment.id,
                containerId: 'PuredToast',
            });
        } else {
            toast.warning('You can only mention one user at the same time', {
                toastId: comment.id,
                containerId: 'PuredToast',
            });
        }
    };

    return (
        <div className={cx('commenter')}>
            <div className={cx('infor')}>
                <div className={cx('avatar')}>
                    <Link to={`/profile/${userComment.nickName}`}>
                        <img src={comment.photoURL} alt="avatar" />
                    </Link>
                </div>
                <div className={cx('infor-user')}>
                    <Tippy
                        delay={[500, 0]}
                        placement="bottom"
                        interactive
                        render={(attrs) => (
                            <SubnavWrapper className={cx('wrapper-tippy')}>
                                <div className={cx('header-tippy')}>
                                    <Link to={`/profile/${userComment.nickName}`} target="_blank">
                                        <img src={userComment.photoURL} alt="avatar" />
                                    </Link>
                                    {userLogin.login === false ? (
                                        <Button
                                            style={{ padding: '7px 16px' }}
                                            outline
                                            small
                                            onClick={() => dispatch(ModalSignSlice.actions.setModalSign(true))}
                                        >
                                            {t('followStatus.Follow')}
                                        </Button>
                                    ) : userLogin.followings.includes(userComment.uid) ? (
                                        <Button
                                            style={{ padding: '7px 16px' }}
                                            basic
                                            small
                                            onClick={() => handleFollowService(userLogin, userComment)}
                                        >
                                            {t('followStatus.Following')}
                                        </Button>
                                    ) : userLogin.uid !== userComment.uid ? (
                                        <Button
                                            style={{ padding: '7px 16px' }}
                                            outline
                                            small
                                            onClick={() => handleFollowService(userLogin, userComment)}
                                        >
                                            {t('followStatus.Follow')}
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className={cx('body-tippy')}>
                                    <Link to={`/profile/${userComment.nickName}`} target="_blank">
                                        <h4 className={cx('nickName')}>{userComment.nickName}</h4>
                                        <p className={cx('displayName')}>{userComment.displayName}</p>
                                    </Link>
                                    <p className={cx('follow')}>
                                        <strong>{userComment.followers.length}</strong>
                                        {t('account.Followers')}
                                        <strong>{countLikeRef.current}</strong>
                                        {t('account.Likes')}
                                    </p>
                                </div>
                                <div className={cx('bio')}>
                                    <p>{userComment.bio}</p>
                                </div>
                            </SubnavWrapper>
                        )}
                    >
                        <Link to={`/profile/${userComment.nickName}`}>
                            <div className={cx('nickName-wrap')}>
                                <div className={cx('nickName')}>{userComment.nickName}</div>
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                        </Link>
                    </Tippy>

                    <div className={cx('text')}>{comment.text}</div>
                    <div className={cx('createdAt-wrap')}>
                        <div className={cx('createdAt')}>{formatDate(comment.createdAt.seconds)}</div>
                        <div onClick={handleReply} className={cx('reply')}>
                            {t('comment.Reply')}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('likes')}>
                <Tippy
                    delay={[0, 200]}
                    placement="bottom-end"
                    interactive
                    render={(attrs) => (
                        <div className={cx('report-wrap')}>
                            <i className="fa-regular fa-flag"></i>
                            <span>{t('message.Report')}</span>
                        </div>
                    )}
                >
                    <i className={cx('fa-solid fa-ellipsis', 'report')}></i>
                </Tippy>
                {heart && userLogin.login === true ? (
                    <i
                        className={cx(
                            'fa-solid fa-heart',
                            'heart',
                            'heart-active',
                            'animate__animated animate__bounceIn',
                        )}
                        onClick={handleHeartActive}
                    ></i>
                ) : (
                    <i className={cx('fa-regular fa-heart', 'heart')} onClick={handleHeartActive}></i>
                )}

                <span>{comment.likes.length}</span>
            </div>
            {createPortal(<ModalSign />, document.body)}
        </div>
    );
};

export default Commenter;
