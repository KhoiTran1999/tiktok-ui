import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './VideoProfile.module.scss';
import VideoGrid from './VideoGrid/VideoGrid';

const cx = classNames.bind(style);
const VideoProfile = () => {
    const [active, setActive] = useState(true);

    const handleActiveVideos = () => {
        setActive(true);
    };
    const handleActiveLiked = () => {
        setActive(false);
    };
    return (
        <div className={cx('videoProfile')}>
            <div
                className={cx('nav', {
                    active: !active,
                })}
            >
                <div
                    className={cx('videos', {
                        active: active,
                    })}
                    onClick={handleActiveVideos}
                >
                    Videos
                </div>
                <div
                    className={cx('liked', {
                        active: !active,
                    })}
                    onClick={handleActiveLiked}
                >
                    <i className="fa-solid fa-lock"></i>
                    Liked
                </div>
            </div>
            <VideoGrid />
        </div>
    );
};

export default VideoProfile;
