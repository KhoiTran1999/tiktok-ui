import React from 'react';
import classNames from 'classnames/bind';
import style from './Comment.module.scss';
import VideoWrapper from './VideoWrapper/VideoWrapper';
import CommentWrapper from './CommentWrapper/CommentWrapper';
import images from '../../assets/images';

const cx = classNames.bind(style);
const Comment = () => {
    return (
        <div className={cx('body-wrapper')}>
            <div style={{ backgroundImage: `url(${images.imgGaiXinh2})` }} className={cx('background')}></div>
            <div className={cx('body-content')}>
                <VideoWrapper />
                <CommentWrapper />
            </div>
        </div>
    );
};

export default Comment;
