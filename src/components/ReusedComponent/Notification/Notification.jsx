import React, { useEffect, useMemo, useRef, useState } from 'react';
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
                    ...val,
                    notification: false,
                });
            }
        });

        dispatch(AmountOfNotiSlice.actions.setAmountOfNoti(newAmountNoti));
    };

    const MessageComp = ({ closeToast, nickName, createdAt, photoURL, text, uid, roomId }) => {
        return (
            <div
                onClick={() => handleMoveToMessages(uid, roomId)}
                style={{ width: '100%', maxHeight: '100px', boxSizing: 'border-box', display: 'flex' }}
            >
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                    }}
                >
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                        src={photoURL}
                        alt=""
                    />
                </div>
                <div>
                    <p
                        style={{
                            fontSize: '13px',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: '4',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word',
                            paddingLeft: '10px',
                            boxSizing: 'border-box',
                        }}
                    >
                        {text}
                    </p>
                    <span style={{ fontSize: '12px', paddingLeft: '10px', marginTop: '5px' }}>
                        {formatDate(createdAt)}
                    </span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        messages.map((val) => {
            curRoomList.map((room) => {
                if (room.id === val.roomId && room.members.includes(userLogin.uid)) {
                    if (
                        val.notificationPopup &&
                        val.uid !== userLogin.uid &&
                        window.location.pathname !== '/messages'
                    ) {
                        toast(
                            <MessageComp
                                createdAt={val.createdAt.seconds}
                                photoURL={val.photoURL}
                                text={val.text}
                                uid={val.uid}
                                roomId={val.roomId}
                            />,
                            {
                                position: 'bottom-right',
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'light',
                                toastId: val.id,
                                onOpen: () => {
                                    updateDocument('messages', val.id, {
                                        ...val,
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
                            ...val,
                            notificationPopup: false,
                        });
                    }
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
                            ...val,
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
    const VideoNoti = ({ closeToast, nickName, caption, thumbnail, videoId }) => {
        return (
            <Link to={`/profile/${nickName}/${videoId}`}>
                <h4 style={{ color: 'white', wordBreak: 'break-word' }}>{nickName} has uploaded new video </h4>
                <p
                    style={{
                        color: 'white',
                        marginTop: '10px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '2',
                        overflowY: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {caption}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        style={{
                            height: '300px',
                            width: '170px',
                            borderRadius: '8px',
                        }}
                        src={thumbnail}
                        alt="thumbnail"
                    />
                </div>
            </Link>
        );
    };

    useEffect(() => {
        videoList.map((video) => {
            if (video.notification) {
                userList.map((userUpload) => {
                    if (userUpload.uid === video.uid) {
                        userList.map((user) => {
                            if (user.uid !== video.uid && user.uid === userLogin.uid) {
                                toast(
                                    <VideoNoti
                                        nickName={userUpload.nickName}
                                        caption={video.caption}
                                        thumbnail={video.thumbnail}
                                        videoId={video.id}
                                    />,
                                    {
                                        position: 'bottom-right',
                                        autoClose: 200000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: 'dark',
                                        toastId: user.uid,
                                    },
                                );
                                updateDocument('videoList', video.id, {
                                    ...video,
                                    notification: false,
                                });
                            }
                        });
                    }
                });
            }
        });
    }, [videoList.length]);

    //---------------Noti Comment when other user comment into your video---------
    const formatDate = (seconds) => {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatDistance(new Date(seconds * 1000), new Date());
        }
        return formattedDate;
    };

    const CommentNoti = ({ closeToast, nickName, text, photoURL, createdAt, videoId }) => {
        return (
            <Link to={`/profile/${nickName}/${videoId}`}>
                <div
                    style={{
                        width: '100%',
                        maxHeight: '100px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <img
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                            src={photoURL}
                            alt="avatar"
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: '13px',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '4',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                wordBreak: 'break-word',
                                paddingLeft: '10px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <b>{nickName} has commented your video: </b>"{text}"
                        </p>
                        <span style={{ fontSize: '12px', paddingLeft: '10px', marginTop: '5px' }}>
                            {formatDate(createdAt)}
                        </span>
                    </div>
                </div>
            </Link>
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
                            videoId={video.id}
                        />,
                        {
                            position: 'bottom-right',
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
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
                ...video,
                comments: newCommentNoti,
            });
        });
    }, [videoList]);

    return <></>;
};

export default Notification;
