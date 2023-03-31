import React from 'react';
import style from './CommentLayout.module.scss';
import classNames from 'classnames/bind';
import Comment from '../../components/Comment/Comment';

const cx = classNames.bind(style);
const CommentLayout = () => {
    return <Comment />;
};

export default CommentLayout;
