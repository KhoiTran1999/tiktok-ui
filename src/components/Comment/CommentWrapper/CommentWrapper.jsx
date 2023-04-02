import React from 'react';
import classNames from 'classnames/bind';
import style from './CommentWrapper.module.scss';
import HeaderComment from './HeaderComment/HeaderComment';
import BodyComment from './BodyComment/BodyComment';
import FooterComment from './FooterComment/FooterComment';

const cx = classNames.bind(style);
const CommentWrapper = ({ video, userVideo }) => {
    return (
        <div className={cx('CommentWrapper')}>
            <HeaderComment video={video} userVideo={userVideo} />
            <BodyComment video={video} />
            <FooterComment video={video} userVideo={userVideo} />
        </div>
    );
};

export default CommentWrapper;
