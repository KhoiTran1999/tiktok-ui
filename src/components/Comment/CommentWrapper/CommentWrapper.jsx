import React from 'react';
import classNames from 'classnames/bind';
import style from './CommentWrapper.module.scss';
import HeaderComment from './HeaderComment/HeaderComment';
import BodyComment from './BodyComment/BodyComment';
import FooterComment from './FooterComment/FooterComment';
import { useState } from 'react';
import { useRef } from 'react';

const cx = classNames.bind(style);
const CommentWrapper = ({ video, userVideo }) => {
    const [inputValue, setInputValue] = useState('');
    const [listMention, setListMention] = useState([]);

    const textAreaRef = useRef();

    return (
        <div className={cx('CommentWrapper')}>
            <HeaderComment video={video} userVideo={userVideo} />
            <BodyComment
                video={video}
                inputValue={inputValue}
                setInputValue={setInputValue}
                listMention={listMention}
                setListMention={setListMention}
                textAreaRef={textAreaRef}
            />
            <FooterComment
                video={video}
                inputValue={inputValue}
                setInputValue={setInputValue}
                listMention={listMention}
                setListMention={setListMention}
                textAreaRef={textAreaRef}
            />
        </div>
    );
};

export default CommentWrapper;
