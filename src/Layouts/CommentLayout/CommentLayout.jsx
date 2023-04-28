import React, { useEffect, useState } from 'react';
import style from './CommentLayout.module.scss';
import classNames from 'classnames/bind';
import Comment from '../../components/Comment/Comment';
import { useSelector } from 'react-redux';
import { AllUserListSelector, VideoListSelector } from '../../redux/selector';
import NotFound from '../../components/NotFound/NotFound';

const cx = classNames.bind(style);
const CommentLayout = () => {
    const videoList = useSelector(VideoListSelector);

    return <>{videoList.some((val) => window.location.pathname.endsWith(val.id)) ? <Comment /> : <NotFound />}</>;
};

export default CommentLayout;
