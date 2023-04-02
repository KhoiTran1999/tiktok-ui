import Tippy from '@tippyjs/react/headless';
import 'animate.css';
import classNames from 'classnames/bind';
import { createPortal } from 'react-dom';
import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDocument } from '../../../../../firebase/services';
import { UserListSelector, UserSelector } from '../../../../../redux/selector';
import ModalSignSlice from '../../../../ReusedComponent/ModalSign/ModalSignSlice';
import style from './Commenter.module.scss';
import { ModalSign, SubnavWrapper } from '../../../../ReusedComponent';
import { Link } from 'react-router-dom';
import { Button } from '../../../../ReusedComponent';

const cx = classNames.bind(style);
const Commenter = ({ comment, video }) => {
    const dispatch = useDispatch();
    const [heart, setHeart] = useState(false);
    const [userComment, setUserComment] = useState({});

    const userLogin = useSelector(UserSelector);
    const userList = useSelector(UserListSelector);

    useEffect(() => {
        userList.map((val) => {
            if (comment.uid === val.uid) setUserComment(val);
        });
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
        if (userLogin.login === false) dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    const handleFollow = () => {
        if (userLogin.login === false) dispatch(ModalSignSlice.actions.setModalSign(true));
    };

    return (
        <div className={cx('commenter')}>
            <div className={cx('infor')}>
                <div className={cx('avatar')}>
                    <Link to={`/profile/${comment.nickName}`}>
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
                                    <Button outline medium onClick={handleFollow}>
                                        Follow
                                    </Button>
                                </div>
                                <div className={cx('body-tippy')}>
                                    <Link to={`/profile/${userComment.nickName}`} target="_blank">
                                        <h4 className={cx('nickName')}>{userComment.nickName}</h4>
                                        <p className={cx('displayName')}>{userComment.displayName}</p>
                                    </Link>
                                    <p className={cx('follow')}>
                                        <strong>{userComment.followers.length}</strong> Followers{' '}
                                        <strong>{userComment.likes}</strong> Likes
                                    </p>
                                </div>
                                <div className={cx('bio')}>
                                    <p>{userComment.bio}</p>
                                </div>
                            </SubnavWrapper>
                        )}
                    >
                        <Link to={`/profile/${comment.nickName}`}>
                            <div className={cx('nickName-wrap')}>
                                <div className={cx('nickName')}>{comment.nickName}</div>
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                        </Link>
                    </Tippy>

                    <div className={cx('text')}>{comment.text}</div>
                    <div className={cx('createdAt-wrap')}>
                        <div className={cx('createdAt')}>{formatDate(comment.createdAt.seconds)}</div>
                        <div onClick={handleReply} className={cx('reply')}>
                            Reply
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
                            <span>Report</span>
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
