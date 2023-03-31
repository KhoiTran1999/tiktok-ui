import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './VideoGrid.module.scss';
import VideoItem from './VideoItem';

const cx = classNames.bind(style);
const VideoGrid = ({ videoList, user }) => {
    const [idVideoPlay, setIdVideoPlay] = useState();

    return (
        <div className={cx('videoGrid')}>
            <ul className={'row'}>
                {videoList.map((val, idx) => {
                    if (val.uid === user.uid) {
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
        </div>
    );
};

export default VideoGrid;
