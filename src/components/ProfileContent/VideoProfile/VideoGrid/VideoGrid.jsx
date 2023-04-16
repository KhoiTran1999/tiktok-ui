import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './VideoGrid.module.scss';
import VideoItem from './VideoItem';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../../redux/selector';

const cx = classNames.bind(style);
const VideoGrid = ({ videoList, user, activeLiked }) => {
    const [idVideoPlay, setIdVideoPlay] = useState();
    const userLogin = useSelector(UserSelector);
    const linkName = useParams();

    return (
        <div className={cx('videoGrid')}>
            {(!userLogin.login && !activeLiked) || (userLogin.nickName !== linkName.userName && !activeLiked) ? (
                <div className={cx('privateVideo')}>
                    <i className="fa-solid fa-lock"></i>
                    <h3>This user's liked videos are private</h3>
                    <p>Videos liked by {linkName.userName} are currently hidden</p>
                </div>
            ) : (
                <>
                    <ul className={'row'}>
                        {videoList.map((val, idx) => {
                            if (val.uid === user.uid && activeLiked) {
                                return (
                                    <VideoItem
                                        idVideoPlay={idVideoPlay}
                                        setIdVideoPlay={setIdVideoPlay}
                                        idVideo={val.id}
                                        linkVideo={val.videoURL}
                                        poster={val.thumbnail}
                                        views={val.views}
                                        caption={val.caption}
                                        user={user}
                                    />
                                );
                            } else if (
                                activeLiked === false &&
                                userLogin.likes.includes(val.id) &&
                                userLogin.nickName === linkName.userName
                            ) {
                                return (
                                    <VideoItem
                                        idVideoPlay={idVideoPlay}
                                        setIdVideoPlay={setIdVideoPlay}
                                        idVideo={val.id}
                                        linkVideo={val.videoURL}
                                        poster={val.thumbnail}
                                        views={val.views}
                                        caption={val.caption}
                                        user={user}
                                    />
                                );
                            }
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default VideoGrid;
