import React from 'react';
import classNames from 'classnames/bind';
import style from './CommentWrapper.module.scss';
import HeaderComment from './HeaderComment/HeaderComment';
import BodyComment from './BodyComment/BodyComment';
import FooterComment from './FooterComment/FooterComment';

const cx = classNames.bind(style);
const CommentWrapper = ({ video, user }) => {
    return (
        <div className={cx('CommentWrapper')}>
            <HeaderComment video={video} user={user} />
            <BodyComment video={video} user={user} />
            <FooterComment video={video} user={user} />
        </div>
    );
};

export default CommentWrapper;
