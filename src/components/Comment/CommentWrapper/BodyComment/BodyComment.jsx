import classNames from 'classnames/bind';
import React from 'react';
import style from './BodyComment.module.scss';
import Commenter from './Commenter/Commenter';

const cx = classNames.bind(style);
const BodyComment = ({ video, user }) => {
    return (
        <div className={cx('bodyComment')}>
            <Commenter />
            <Commenter />
            <Commenter />
            <Commenter />
            <Commenter />
        </div>
    );
};

export default BodyComment;
