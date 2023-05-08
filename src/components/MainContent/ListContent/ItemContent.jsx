import classNames from 'classnames/bind';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';
import { UserListSelector } from '../../../redux/selector';
import { ImageCustom } from '../../ReusedComponent';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import style from './ListContent.module.scss';
import VideoContent from './VideoContent/VideoContent';

const cx = classNames.bind(style);
const ItemContent = ({ video }) => {
    const [userVideo, setUserVideo] = useState({});
    const userList = useSelector(UserListSelector);

    useEffect(() => {
        userList.map((val) => {
            if (val.uid === video.uid) {
                setUserVideo(val);
            }
        });
    }, [video]);

    return (
        <li>
            <div className={cx('avatar')}>
                <Link
                    to={`/profile/${userVideo.nickName}`}
                    onClick={() => (document.title = `${userVideo.displayName} | TikTok`)}
                >
                    <img src={userVideo.photoURL} alt="avatar" />
                </Link>
            </div>
            <div className={cx('content-container')}>
                <HeaderContainer userVideo={userVideo} video={video} />
                <VideoContent video={video} userVideo={userVideo} />
            </div>
        </li>
    );
};

export default ItemContent;
