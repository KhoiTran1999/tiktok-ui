import React from 'react';
import classNames from 'classnames/bind';
import style from './Comment.module.scss';
import VideoWrapper from './VideoWrapper/VideoWrapper';
import CommentWrapper from './CommentWrapper/CommentWrapper';
import images from '../../assets/images';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserListSelector, VideoListSelector } from '../../redux/selector';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(style);
const Comment = () => {
    const param = useParams();

    const [video, setVideo] = useState({ likes: [], comments: [], createdAt: {} });
    const [user, setUser] = useState({});

    const videoList = useSelector(VideoListSelector);
    const userList = useSelector(UserListSelector);

    useEffect(() => {
        videoList.map((val) => {
            if (val.id === param.videoId) setVideo(val);
        });
    }, [videoList]);

    useEffect(() => {
        if (video) {
            userList.map((val) => {
                if (video.uid === val.uid) setUser(val);
            });
        }
    }, [video]);

    return (
        <div className={cx('body-wrapper')}>
            <div
                style={{ backgroundSize: 'auto', backgroundImage: `url(${video.thumbnail})` }}
                className={cx('background')}
            ></div>
            <div className={cx('body-content')}>
                <VideoWrapper video={video} />
                <CommentWrapper video={video} user={user} />
            </div>
        </div>
    );
};

export default Comment;
