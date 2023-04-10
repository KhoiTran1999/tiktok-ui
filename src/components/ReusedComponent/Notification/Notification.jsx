import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Notification.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDistance } from 'date-fns';
import { updateDocument } from '../../../firebase/services';
import useFireStore from '../../../hooks/useFireStore';
import {
    AmountOfNotiSelector,
    CurrentRoomsSelector,
    SelectedRoomSelector,
    UserListSelector,
    UserSelector,
    VideoListSelector,
} from '../../../redux/selector';
import AmountOfNotiSlice from '../../Header/RightHeader/AmountOfNotiSlice';
import ChoosedUserSlice from '../../Messages/ChatAccountList/AccountItem/choosedUserSlice';
import SelectedRoomSlice from '../../Messages/ChatAccountList/AccountItem/selectedRoomSlice';

const cx = classNames.bind(style);
const Notification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(UserSelector);
    const curRoomList = useSelector(CurrentRoomsSelector);
    const userList = useSelector(UserListSelector);
    const selectedRoom = useSelector(SelectedRoomSelector);
    const amountNoti = useSelector(AmountOfNotiSelector);
    const videoList = useSelector(VideoListSelector);

    const [listRoomId, setListRoomId] = useState([]);
    const amountNotiRef = useRef([]);

    //---------------Message Noti Popup----------------------
    useEffect(() => {
        //Get all id from room list
        const newListRoomId = [];
        curRoomList.map((val) => newListRoomId.push(val.id));
        setListRoomId(newListRoomId);
    }, [curRoomList]);

    // Get messages of all Room that userLogin have
    const messagesCondition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: 'in',
            compareValue: listRoomId,
        };
    }, [listRoomId]);
    const messages = useFireStore('messages', messagesCondition, 'createdAt', 'asc');

    const handleMoveToMessages = (uid, roomId) => {
        userList.map((val) => {
            if (val.uid === uid) {
                dispatch(ChoosedUserSlice.actions.setChoosedUser(val));
                dispatch(SelectedRoomSlice.actions.setSelectedRoom(roomId));
                navigate('/messages');
            }
        });
        //Remove Noti
        const newAmountNoti = amountNoti.filter((val) => val !== roomId);

        messages.map((val) => {
            if (val.roomId === roomId) {
                updateDocument('messages', val.id, {
                    notification: false,
                });
            }
        });

        dispatch(AmountOfNotiSlice.actions.setAmountOfNoti(newAmountNoti));
    };

    const MessageComp = ({ nickName, createdAt, photoURL, text, uid, roomId, toastId }) => {
        return (
            <div className={cx('messages-wrap')}>
                <div className={cx('icon')}>
                    <i className="fa-solid fa-message"></i>
                </div>
                <div className={cx('avatar')}>
                    <img src={photoURL} alt="avatar" />
                </div>
                <div className={cx('info')}>
                    <p className={cx('nickName')}>
                        <b>{nickName}</b> sent you a message:{' '}
                    </p>
                    <p>"{text}"</p>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('time')}>{formatDate(createdAt)}</span>
                        <span onClick={() => handleMoveToMessages(uid, roomId)} className={cx('reply')}>
                            Reply
                        </span>
                    </div>
                </div>
                <span className={cx('close')}>
                    <i onClick={() => toast.dismiss(toastId)} className="fa-solid fa-xmark"></i>
                </span>
            </div>
        );
    };

    useEffect(() => {
        messages.map((val) => {
            userList.map((user) => {
                if (user.uid === val.uid) {
                    curRoomList.map((room) => {
                        if (room.id === val.roomId && room.members.includes(userLogin.uid)) {
                            if (
                                val.notificationPopup &&
                                val.uid !== userLogin.uid &&
                                window.location.pathname !== '/messages'
                            ) {
                                toast(
                                    <MessageComp
                                        nickName={user.nickName}
                                        createdAt={val.createdAt.seconds}
                                        photoURL={val.photoURL}
                                        text={val.text}
                                        uid={val.uid}
                                        roomId={val.roomId}
                                        toastId={val.id}
                                    />,
                                    {
                                        className: `${cx('toast-message')}`,
                                        position: 'bottom-right',
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                        draggable: true,
                                        pauseOnHover: true,
                                        closeButton: false,
                                        toastId: val.id,
                                        containerId: 'ConfiguredToast',
                                        style: {
                                            padding: '0px 20px 0px 0px',
                                        },
                                        onOpen: () => {
                                            updateDocument('messages', val.id, {
                                                notificationPopup: false,
                                            });
                                        },
                                    },
                                );
                            } else if (
                                val.notificationPopup &&
                                val.uid !== userLogin.uid &&
                                window.location.pathname === '/messages'
                            ) {
                                updateDocument('messages', val.id, {
                                    notificationPopup: false,
                                });
                            }
                        }
                    });
                }
            });
        });
    }, [messages.length]);

    useEffect(() => {
        if (window.location.pathname !== '/messages') {
            dispatch(ChoosedUserSlice.actions.setChoosedUser(null));
            dispatch(SelectedRoomSlice.actions.setSelectedRoom(null));
        }
    }, [window.location.pathname]);

    useEffect(() => {
        messages.map((val) => {
            curRoomList.map((room) => {
                if (room.id === val.roomId && room.members.includes(userLogin.uid)) {
                    if (val.notification && val.uid !== userLogin.uid && room.id !== selectedRoom) {
                        //Count amount of noti through roomId array
                        if (!amountNotiRef.current.includes(val.roomId)) {
                            amountNotiRef.current = [...amountNotiRef.current, val.roomId];
                        }
                    } else if (val.notification && val.uid !== userLogin.uid && room.id === selectedRoom) {
                        updateDocument('messages', val.id, {
                            notification: false,
                        });
                    }
                }
            });
        });

        dispatch(AmountOfNotiSlice.actions.setAmountOfNoti(amountNotiRef.current));
        amountNotiRef.current = [];
    }, [messages]);

    //------------------Noti when video is uploaded--------------------
    const VideoNoti = ({ photoURL, nickName, caption, thumbnail, videoId, createdAt }) => {
        return (
            <div className={cx('upload-wrap')}>
                <div className={cx('icon')} onClick={() => navigate(`/profile/${nickName}/${videoId}`)}>
                    <i className="fa-solid fa-play"></i>
                </div>
                <div className={cx('avatar')} onClick={() => navigate(`/profile/${nickName}/${videoId}`)}>
                    <img src={photoURL} alt="avatar" />
                </div>
                <div className={cx('info')} onClick={() => navigate(`/profile/${nickName}/${videoId}`)}>
                    <p className={cx('nickName')}>
                        <b>{nickName}</b> has uploaded a video:{' '}
                    </p>
                    <p>"{caption}"</p>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('time')}>{formatDate(createdAt)}</span>
                    </div>
                </div>
                <div className={cx('thumbnail')} onClick={() => navigate(`/profile/${nickName}/${videoId}`)}>
                    <img src={thumbnail} alt="thumbnail" />
                </div>
                <span className={cx('close')}>
                    <i onClick={() => toast.dismiss(videoId)} className="fa-solid fa-xmark"></i>
                </span>
            </div>
        );
    };

    useEffect(() => {
        if (videoList.length > 0) {
            videoList.map((video) => {
                if (video.notification === true) {
                    userList.map((user) => {
                        if (userLogin.uid !== video.uid && user.uid === userLogin.uid) {
                            toast(
                                <VideoNoti
                                    photoURL={user.photoURL}
                                    nickName={user.nickName}
                                    caption={video.caption}
                                    thumbnail={video.thumbnail}
                                    videoId={video.id}
                                    createdAt={video.createdAt.seconds}
                                />,
                                {
                                    className: `${cx('upload')}`,
                                    position: 'bottom-right',
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    closeButton: false,
                                    toastId: video.id,
                                    containerId: 'ConfiguredToast',
                                    style: {
                                        padding: '0px 15px 0px 0px',
                                    },
                                },
                            );
                        }
                    });
                    setTimeout(() => {
                        updateDocument('videoList', video.id, {
                            notification: false,
                        });
                    }, 500);
                }
            });
        }
    }, [videoList.length]);

    //---------------Noti Comment when other user comment into your video---------
    const formatDate = (seconds) => {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatDistance(new Date(seconds * 1000), new Date());
        }
        return formattedDate;
    };

    const CommentNoti = ({ nickName, text, photoURL, createdAt, thumbnail, videoId, toastId }) => {
        return (
            <div className={cx('comment-wrap')}>
                <div className={cx('icon')}>
                    <i className="fa-regular fa-comments"></i>
                </div>
                <div className={cx('avatar')}>
                    <img src={photoURL} alt="avatar" />
                </div>
                <div className={cx('info')}>
                    <p className={cx('nickName')}>
                        <b>{nickName}</b> has commented in your post:{' '}
                    </p>
                    <p>"{text}"</p>
                    <div className={cx('footer-wrap')}>
                        <span className={cx('time')}>{formatDate(createdAt)}</span>
                        <span onClick={() => navigate(`/profile/${nickName}/${videoId}`)} className={cx('reply')}>
                            Reply
                        </span>
                    </div>
                </div>
                <div className={cx('thumbnail')} onClick={() => navigate(`/profile/${nickName}/${videoId}`)}>
                    <img src={thumbnail} alt="thumbnail" />
                </div>
                <span className={cx('close')}>
                    <i onClick={() => toast.dismiss(toastId)} className="fa-solid fa-xmark"></i>
                </span>
            </div>
        );
    };
    useEffect(() => {
        videoList.map((video) => {
            video.comments.map((comment) => {
                if (userLogin.uid === video.uid && comment.notification && comment.uid !== video.uid) {
                    toast(
                        <CommentNoti
                            nickName={comment.nickName}
                            photoURL={comment.photoURL}
                            text={comment.text}
                            createdAt={comment.createdAt.seconds}
                            thumbnail={video.thumbnail}
                            videoId={video.id}
                            toastId={comment.id}
                        />,
                        {
                            className: `${cx('toast-comment')}`,
                            position: 'bottom-right',
                            autoClose: 2000,
                            hideProgressBar: true,
                            draggable: true,
                            pauseOnHover: true,
                            closeButton: false,
                            toastId: comment.id,
                            containerId: 'ConfiguredToast',
                            style: {
                                padding: '0px 20px 0px 0px',
                            },
                        },
                    );
                }
            });

            //update comment
            const newCommentNoti = video.comments.map((comment) => {
                return {
                    ...comment,
                    notification: false,
                };
            });
            updateDocument('videoList', video.id, {
                comments: newCommentNoti,
            });
        });
    }, [videoList]);

    return <></>;
};

export default Notification;
