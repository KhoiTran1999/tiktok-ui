import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './VideoProfile.module.scss';
import VideoGrid from './VideoGrid/VideoGrid';
import useFireStore from '../../../hooks/useFireStore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoListSlice from './VideoListSlice';
import { VideoListSelector } from '../../../redux/selector';

const cx = classNames.bind(style);
const VideoProfile = ({ allUserList }) => {
    const [activeLiked, setActive] = useState(true);
    const [videoList, setVideoList] = useState([]);

    const linkName = useParams();

    //Get user in this page
    const [user, setUser] = useState({});
    useEffect(() => {
        allUserList.map((val) => {
            if (val.nickName === linkName.userName) {
                setUser(val);
            }
        });
    });

    //Get video List
    const videoListSelector = useSelector(VideoListSelector);
    useEffect(() => {
        setVideoList(videoListSelector);
    }, [videoListSelector]);

    //Hover to play video
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
                    active: !activeLiked,
                })}
            >
                <div
                    className={cx('videos', {
                        active: activeLiked,
                    })}
                    onClick={handleActiveVideos}
                >
                    Videos
                </div>
                <div
                    className={cx('liked', {
                        active: !activeLiked,
                    })}
                    onClick={handleActiveLiked}
                >
                    <i className="fa-solid fa-lock"></i>
                    Liked
                </div>
            </div>

            <VideoGrid videoList={videoList} user={user} activeLiked={activeLiked} />
        </div>
    );
};

export default VideoProfile;
